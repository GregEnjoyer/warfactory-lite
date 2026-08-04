#!/usr/bin/env python3
"""Stage every client-side mod jar into client_mods/ so it rides into the server zip.

The dedicated server runs the pakku serverpack, whose mods/ holds only server + shared
jars — pakku excludes client-only mods. But wfcore's soft mod audit (ModAuditService)
hashes the server's mods/ AND client_mods/ folders at *runtime* and compares them to what
each joining client reports; any client jar the server doesn't physically have is flagged
UNKNOWN. So the server needs the actual client-only jars present in client_mods/.

This tool gathers them there. pakku then packs client_mods/ into the server zip only, via
the `server_overrides` entry in pakku.json (server_overrides go to the serverpack, never to
the CurseForge/Modrinth client packs — clients still get those mods the normal way).

It replaces the old wfcore-modmanifest.json generator: nothing ever read that JSON (the
audit hashes the folders directly), so no manifest file is produced anymore.

"Client-side" comes from the build config's side tags — the single source of truth:
  * pakku-lock.json  — projects with side == CLIENT (has direct download url per file)
  * pakku.json       — projects with side == CLIENT (in case a tag hasn't re-locked yet)
  * config/mod-director/*.json  — entries with metadata.side == CLIENT
                                  (ModDirector / Pack-Launcher-delivered, e.g. mcgltf, komodo)

Each client jar is sourced, in order:
  1. --source (default mods/) — a `pakku fetch`-populated folder; copied by filename
  2. the project's pakku-lock download url (fallback if it isn't in --source)
  3. `gh` release-asset download, for ModDirector github entries (saved under their fileName —
     that is the name the client loads, and what the audit matches on)

CI flow: `pakku fetch` (materialises the pakku jars in mods/), then this tool, then `pakku export`.

Usage:
    tools/stage_client_mods.py [--source mods] [--out client_mods]
                               [--lock pakku-lock.json] [--pakku pakku.json]
                               [--mod-director config/mod-director] [--allow-missing]
"""
import argparse
import fnmatch
import glob
import json
import os
import shutil
import subprocess
import sys
import urllib.parse
import urllib.request


def load_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def pick_file(project, loaders, mc_versions):
    """Choose the lock file entry matching our loader + mc version (fallback: first)."""
    files = project.get("files") or []
    for f in files:
        fl = set(f.get("loaders") or [])
        fm = set(f.get("mc_versions") or [])
        if (not loaders or fl & loaders) and (not mc_versions or fm & mc_versions):
            return f
    return files[0] if files else None


def collect_pakku_clients(lock, pakku, loaders, mc_versions):
    """file_name -> download url for every pakku-managed client-side mod.

    A project is client-side if the lock says side==CLIENT, or pakku.json tags its slug
    CLIENT (covers a freshly-edited tag that hasn't been re-locked yet)."""
    tagged = {
        slug
        for slug, cfg in (pakku.get("projects") or {}).items()
        if (cfg or {}).get("side") == "CLIENT"
    }
    seen_slugs = set()
    out = {}
    for p in lock.get("projects") or []:
        slugs = set((p.get("slug") or {}).values())
        seen_slugs |= slugs
        if p.get("side") != "CLIENT" and not (slugs & tagged):
            continue
        f = pick_file(p, loaders, mc_versions)
        if not f or not f.get("file_name"):
            name = next(iter((p.get("name") or {}).values()), p.get("pakku_id"))
            print(f"  ! {name}: client-side but no downloadable file in lock — skipping")
            continue
        out[f["file_name"]] = f.get("url")
    # pakku.json tagged a slug CLIENT that the lock doesn't know about yet
    for slug in sorted(tagged - seen_slugs):
        print(f"  ! pakku.json tags '{slug}' side:CLIENT but it's absent from the lock — re-run `pakku update`")
    return out


def collect_moddirector_clients(md_dir):
    """List of (kind, entry) for every ModDirector entry marked metadata.side == CLIENT."""
    entries = []
    if not os.path.isdir(md_dir):
        return entries
    kinds = ("github", "url", "curse", "modrinth")
    for path in sorted(glob.glob(os.path.join(md_dir, "*.json"))):
        try:
            data = load_json(path)
        except (OSError, ValueError) as e:
            print(f"  ! {path}: unreadable ({e}) — skipping")
            continue
        # bundle form: {"github":[...], "url":[...], ...}; single-entry form: one object
        buckets = data if isinstance(data, dict) and any(k in data for k in kinds) else None
        if buckets:
            for kind in kinds:
                for e in buckets.get(kind) or []:
                    if (e.get("metadata") or {}).get("side") == "CLIENT":
                        entries.append((kind, e))
        elif isinstance(data, dict) and (e := data).get("metadata", {}).get("side") == "CLIENT":
            # infer kind from the *.<kind>.json suffix
            stem = os.path.basename(path).lower()
            kind = next((k for k in kinds if f".{k}." in stem), "url")
            entries.append((kind, e))
    return entries


def download(url, dest):
    # Lock/CDN urls can carry raw spaces (e.g. forgecdn "taczsoundoverhaul 0.2.jar");
    # urllib rejects unencoded control chars, so percent-encode the path (and query).
    parts = urllib.parse.urlsplit(url)
    url = urllib.parse.urlunsplit(parts._replace(
        path=urllib.parse.quote(parts.path, safe="/%:@"),
        query=urllib.parse.quote(parts.query, safe="=&%:@/?"),
    ))
    req = urllib.request.Request(url, headers={"User-Agent": "stage-client-mods"})
    with urllib.request.urlopen(req) as r, open(dest, "wb") as f:  # noqa: S310 (trusted lock urls)
        shutil.copyfileobj(r, f)


def gh_asset_url(repo, asset_pattern):
    """Newest release asset (prereleases included) whose name matches asset_pattern."""
    proc = subprocess.run(
        ["gh", "api", f"repos/{repo}/releases", "--paginate"],
        capture_output=True, text=True, check=True,
    )
    for rel in json.loads(proc.stdout):  # API returns newest-first
        for a in rel.get("assets") or []:
            if a["name"] == asset_pattern or fnmatch.fnmatch(a["name"], asset_pattern):
                return a["browser_download_url"]
    return None


def stage(name, url, source, out, gh=None):
    """Put `name` into out/, preferring source/ then url then a gh resolver. True on success."""
    dest = os.path.join(out, name)
    src = os.path.join(source, name)
    if os.path.isfile(src):
        shutil.copy2(src, dest)
        print(f"  + {name}  (from {source}/)")
        return True
    if url:
        try:
            download(url, dest)
            print(f"  + {name}  (downloaded)")
            return True
        except Exception as e:  # noqa: BLE001
            print(f"  ! {name}: download failed ({e})")
    if gh:
        try:
            resolved = gh()
            if resolved:
                download(resolved, dest)
                print(f"  + {name}  (gh release)")
                return True
            print(f"  ! {name}: no matching release asset")
        except (subprocess.CalledProcessError, FileNotFoundError) as e:
            print(f"  ! {name}: gh unavailable/failed ({e}) — is GH_TOKEN set and gh installed?")
        except Exception as e:  # noqa: BLE001
            print(f"  ! {name}: gh download failed ({e})")
    return False


def main():
    ap = argparse.ArgumentParser(description="Stage client-side mods into client_mods/.")
    ap.add_argument("--source", default="mods", help="folder of already-fetched jars (default: mods)")
    ap.add_argument("--out", default="client_mods", help="output folder (default: client_mods)")
    ap.add_argument("--lock", default="pakku-lock.json")
    ap.add_argument("--pakku", default="pakku.json")
    ap.add_argument("--mod-director", default=os.path.join("config", "mod-director"))
    ap.add_argument("--allow-missing", action="store_true",
                    help="warn instead of failing when a client jar can't be staged")
    args = ap.parse_args()

    lock = load_json(args.lock)
    pakku = load_json(args.pakku) if os.path.isfile(args.pakku) else {}
    loaders = set(lock.get("loaders") or [])
    mc_versions = set(lock.get("mc_versions") or [])

    pakku_clients = collect_pakku_clients(lock, pakku, loaders, mc_versions)
    md_clients = collect_moddirector_clients(args.mod_director)

    os.makedirs(args.out, exist_ok=True)
    for stale in glob.glob(os.path.join(args.out, "*.jar")):
        os.remove(stale)

    print(f"Staging client-side mods -> {args.out}/")
    print(f"  pakku side:CLIENT: {len(pakku_clients)} | mod-director side:CLIENT: {len(md_clients)}")

    staged = 0
    missing_required, missing_optional = [], []  # pakku (reliable CDN) vs mod-director (best-effort gh)
    for name, url in sorted(pakku_clients.items(), key=lambda kv: kv[0].lower()):
        if stage(name, url, args.source, args.out):
            staged += 1
        else:
            missing_required.append(name)

    for kind, e in md_clients:
        name = e.get("fileName")
        if not name:
            print(f"  ! mod-director {kind} entry with no fileName — skipping")
            continue
        url = e.get("url") if kind == "url" else None
        gh = None
        if kind == "github":
            repo, asset = e.get("repository"), e.get("assetName", name)
            gh = (lambda r=repo, a=asset: gh_asset_url(r, a)) if repo else None
        if stage(name, url, args.source, args.out, gh=gh):
            staged += 1
        else:
            missing_optional.append(name)

    print(f"\nStaged {staged} client jar(s) into {args.out}/")
    if missing_optional:
        # Soft-audit only flags these as UNKNOWN (never a kick), so don't fail the build over them.
        print(f"WARN — mod-director client mods not staged ({len(missing_optional)}): "
              + ", ".join(missing_optional) + "  (need `gh` + GH_TOKEN)")
    if missing_required:
        print(f"MISSING pakku client jars ({len(missing_required)}): " + ", ".join(missing_required))
        if not args.allow_missing:
            print("  (these come straight from the lock urls and should always resolve; "
                  "pass --allow-missing to make this non-fatal)")
            sys.exit(1)


if __name__ == "__main__":
    main()
