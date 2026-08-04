#!/usr/bin/env python3
"""
build_whitelist.py — turn big comma-separated player-name lists into a
Minecraft server whitelist.json (default) or a WarForge Flag Whitelist entry.

Both formats gate on player UUID, so every UUID emitted MUST equal the UUID the
server assigns that player at login. Pick the --source that matches your server;
getting it wrong = the whitelist silently never matches.

  --source usercache   read usercache.json (+ ops/whitelist)   << RECOMMENDED
                       Already the exact UUID the server uses, online OR offline.
                       No network, no rate limits. Only covers players who have
                       joined at least once.
  --source mojang      Mojang name->UUID API                    ONLINE-mode servers
  --source offline     compute the OfflinePlayer: UUID          OFFLINE/cracked servers

Formats
  --format whitelist   (default) vanilla whitelist.json: [{ "uuid", "name" }, ...]
  --format flag        WarForge Flag Whitelist TOML: flagId=uuid1,uuid2,...

Examples
  # Server whitelist.json from the server's own cache (mode-agnostic, preferred)
  build_whitelist.py --source usercache --cache usercache.json \
      --names-file allowed.txt --out whitelist.json

  # ...merge a fresh batch into an existing whitelist.json without duplicates
  build_whitelist.py --source mojang --names-file newcomers.txt \
      --merge whitelist.json --out whitelist.json

  # WarForge flag whitelist (restrict a flag to specific players)
  build_whitelist.py --format flag --source usercache --cache usercache.json \
      --flag custom:elite --names-file elite.txt

  # Many flags at once — spec file, one `flagId = name1, name2, ...` per line
  build_whitelist.py --format flag --source usercache --cache usercache.json \
      --spec flags.txt

Names may be separated by commas, whitespace, or newlines, in any mix. Names are
deduped case-insensitively. Unresolved names are reported to stderr and skipped.
Each resolver returns  requested_name -> (uuid, canonical_name).
"""

import argparse
import hashlib
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
from collections import OrderedDict


# ----------------------------------------------------------------------------- parsing

_SPLIT = re.compile(r"[,\s]+")


def parse_names(text):
    """Split a blob on commas/whitespace/newlines; dedupe case-insensitively,
    keeping the first spelling seen."""
    seen = OrderedDict()
    for tok in _SPLIT.split(text):
        tok = tok.strip()
        if tok:
            seen.setdefault(tok.lower(), tok)
    return list(seen.values())


def dash(uid):
    """Normalise a UUID (dashed or dashless) to canonical 8-4-4-4-12 form.
    Raises ValueError on garbage so bad cache/API data can't slip through."""
    return str(uuid.UUID(str(uid)))


# ------------------------------------------------------------------- source: usercache

def load_cache(paths):
    """name(lower) -> (canonical_name, dashed_uuid), merged from usercache.json /
    ops.json / whitelist.json (all share the {name, uuid} shape)."""
    table = {}
    for path in paths:
        try:
            with open(path, encoding="utf-8") as fh:
                data = json.load(fh)
        except FileNotFoundError:
            print(f"[warn] cache file not found: {path}", file=sys.stderr)
            continue
        for entry in data:
            name = entry.get("name")
            uid = entry.get("uuid") or entry.get("uid")
            if name and uid:
                try:
                    table[name.lower()] = (name, dash(uid))
                except ValueError:
                    print(f"[warn] bad uuid in {path} for {name}: {uid}", file=sys.stderr)
    return table


def resolve_usercache(names, cache_paths):
    table = load_cache(cache_paths)
    out = OrderedDict()
    for name in names:
        hit = table.get(name.lower())
        if hit:
            out[name] = (hit[1], hit[0])
    return out


# ---------------------------------------------------------------------- source: offline

def offline_uuid(name):
    """Replicate Java's UUID.nameUUIDFromBytes("OfflinePlayer:"+name):
    MD5 of the UTF-8 bytes, then force version 3 + IETF variant bits.
    NOT the same as Python's uuid.uuid3 (that mixes in a namespace)."""
    md5 = bytearray(hashlib.md5(("OfflinePlayer:" + name).encode("utf-8")).digest())
    md5[6] = (md5[6] & 0x0F) | 0x30  # version 3
    md5[8] = (md5[8] & 0x3F) | 0x80  # IETF variant
    return str(uuid.UUID(bytes=bytes(md5)))


def resolve_offline(names, _cache_paths):
    out = OrderedDict()
    for name in names:
        out[name] = (offline_uuid(name), name)
    return out


# ----------------------------------------------------------------------- source: mojang

_MOJANG_BULK = "https://api.mojang.com/profiles/minecraft"
_MOJANG_ONE = "https://api.mojang.com/users/profiles/minecraft/"


def _http(req, retries=6):
    delay = 1.0
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                if resp.status == 204:
                    return None
                body = resp.read().decode("utf-8")
                return json.loads(body) if body else None
        except urllib.error.HTTPError as err:
            if err.code == 429 and attempt < retries - 1:
                retry_after = err.headers.get("Retry-After")
                wait = float(retry_after) if retry_after else delay
                print(f"[info] rate limited, sleeping {wait:.0f}s", file=sys.stderr)
                time.sleep(wait)
                delay *= 2
                continue
            if err.code in (204, 404):
                return None
            raise
        except urllib.error.URLError:
            if attempt < retries - 1:
                time.sleep(delay)
                delay *= 2
                continue
            raise
    return None


def _mojang_single(name):
    req = urllib.request.Request(_MOJANG_ONE + urllib.parse.quote(name))
    data = _http(req)
    if data and "id" in data:
        return data["name"], dash(data["id"])
    return None


def resolve_mojang(names, _cache_paths, delay=0.2):
    out = OrderedDict()
    by_lower = {n.lower(): n for n in names}  # map API's canonical name back to caller's
    for i in range(0, len(names), 10):
        batch = names[i:i + 10]
        body = json.dumps(batch).encode("utf-8")
        req = urllib.request.Request(
            _MOJANG_BULK, data=body,
            headers={"Content-Type": "application/json"}, method="POST",
        )
        try:
            data = _http(req)
        except urllib.error.HTTPError as err:
            # One bad name 400s the whole batch — fall back to per-name.
            print(f"[info] batch failed ({err.code}); retrying names individually",
                  file=sys.stderr)
            for name in batch:
                try:
                    got = _mojang_single(name)
                except urllib.error.HTTPError:
                    got = None
                if got:
                    out[by_lower.get(got[0].lower(), got[0])] = (got[1], got[0])
                time.sleep(delay)
            continue
        if data:
            for entry in data:
                orig = by_lower.get(entry["name"].lower(), entry["name"])
                out[orig] = (dash(entry["id"]), entry["name"])
        time.sleep(delay)
    return out


RESOLVERS = {
    "usercache": resolve_usercache,
    "offline": resolve_offline,
    "mojang": resolve_mojang,
}


# ------------------------------------------------------------------------------- output

def report_unresolved(label, names, resolved):
    for name in names:
        if name not in resolved:
            print(f"[unresolved] {label}: {name}", file=sys.stderr)


def build_flag_entry(flag_id, resolved):
    uuids, seen = [], set()
    for uid, _name in resolved.values():
        if uid not in seen:            # a rename can map two names to one uuid
            seen.add(uid)
            uuids.append(uid)
    # flagId is lowercased by WarForge's whitelist parser; match that here.
    return f"{flag_id.lower()}={','.join(uuids)}", len(uuids)


def build_whitelist(resolved, merge_path=None):
    """Ordered {uuid: name}, existing merge entries first, deduped by uuid."""
    table = OrderedDict()
    if merge_path:
        with open(merge_path, encoding="utf-8") as fh:
            for entry in json.load(fh):
                uid, name = entry.get("uuid"), entry.get("name")
                if uid and name:
                    table[dash(uid)] = name
    for uid, name in resolved.values():
        table.setdefault(uid, name)    # keep existing name on collision
    return [{"uuid": uid, "name": name} for uid, name in table.items()]


def gather_names(args):
    blob = args.names or ""
    if args.names_file:
        with open(args.names_file, encoding="utf-8") as fh:
            blob += "\n" + fh.read()
    return parse_names(blob)


def main(argv=None):
    ap = argparse.ArgumentParser(
        description="Build a Minecraft whitelist.json or WarForge flag whitelist "
                    "from player-name lists.",
        formatter_class=argparse.RawDescriptionHelpFormatter, epilog=__doc__)
    ap.add_argument("--format", choices=("whitelist", "flag"), default="whitelist",
                    help="output artifact (default: whitelist)")
    ap.add_argument("--source", required=True, choices=list(RESOLVERS),
                    help="how to turn names into UUIDs")
    ap.add_argument("--cache", action="append", default=[], metavar="FILE",
                    help="usercache/ops/whitelist json (repeatable); for --source usercache")
    ap.add_argument("--names", help="comma/space separated names")
    ap.add_argument("--names-file", help="file of comma/space/newline separated names")
    ap.add_argument("--merge", metavar="FILE",
                    help="[whitelist] union into an existing whitelist.json, no dupes")
    ap.add_argument("--out", metavar="FILE", help="write output here instead of stdout")
    ap.add_argument("--flag", help="[flag] flag id, e.g. custom:elite or default:gold")
    ap.add_argument("--spec", metavar="FILE",
                    help="[flag] file of `flagId = name1, name2, ...` lines (many flags)")
    args = ap.parse_args(argv)

    resolver = RESOLVERS[args.source]
    if args.source == "usercache" and not args.cache:
        ap.error("--source usercache needs at least one --cache FILE")

    # --- WarForge flag whitelist -------------------------------------------------
    if args.format == "flag":
        jobs = OrderedDict()
        if args.spec:
            with open(args.spec, encoding="utf-8") as fh:
                for line in fh:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        flag, blob = line.split("=", 1)
                        jobs[flag.strip()] = blob
        else:
            if not args.flag:
                ap.error("--format flag needs --flag (or --spec)")
            blob = args.names or ""
            if args.names_file:
                with open(args.names_file, encoding="utf-8") as fh:
                    blob += "\n" + fh.read()
            if not blob.strip():
                ap.error("no names given (use --names or --names-file)")
            jobs[args.flag] = blob

        entries = []
        for flag_id, blob in jobs.items():
            names = parse_names(blob)
            resolved = resolver(names, args.cache)
            report_unresolved(flag_id.lower(), names, resolved)
            entry, count = build_flag_entry(flag_id, resolved)
            print(f"[done] {flag_id.lower()}: {count}/{len(names)} resolved", file=sys.stderr)
            if count:
                entries.append(entry)
        text = "Flag Whitelist = [\n" + ",\n".join(f'    "{e}"' for e in entries) + "\n]\n"
        _write(text, args.out)
        return 0 if entries else 1

    # --- vanilla server whitelist.json ------------------------------------------
    if args.flag or args.spec:
        ap.error("--flag/--spec only apply to --format flag")
    names = gather_names(args)
    if not names:
        ap.error("no names given (use --names or --names-file)")
    resolved = resolver(names, args.cache)
    report_unresolved("whitelist", names, resolved)
    entries = build_whitelist(resolved, args.merge)
    print(f"[done] whitelist: {len(resolved)}/{len(names)} resolved, "
          f"{len(entries)} total entries", file=sys.stderr)
    _write(json.dumps(entries, indent=2) + "\n", args.out)
    return 0 if entries else 1


def _write(text, out_path):
    if out_path:
        with open(out_path, "w", encoding="utf-8") as fh:
            fh.write(text)
        print(f"[wrote] {out_path}", file=sys.stderr)
    else:
        sys.stdout.write(text)


if __name__ == "__main__":
    sys.exit(main())
