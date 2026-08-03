#!/usr/bin/env python3
"""Regenerate config/wfcore-modmanifest.json — the soft client-mod audit manifest.

wfcore's ModAuditService asks each joining client to SHA-256 the jars it loaded from mods/ and
compares them to this manifest (fileName -> sha256). Jars the client reports that are absent here
are flagged "UNKNOWN"; the audit is soft (log + operator notice + optional webhook), never a kick.

Scans two directories on the server:
  mods/        — server-side jars (shared with clients)
  client_mods/ — client-only jars (delivered by Pack Launcher; Pack Launcher populates this
                 automatically for dynamic mods; place static client-only jars here manually)

Both directories contribute to one flat manifest keyed by jar filename. If a filename appears in
both directories the client_mods/ copy wins (last write wins in sorted order isn't a concern since
you shouldn't have the same filename in both places).

Usage:
    tools/gen_modmanifest.py [SERVER_DIR] [OUT] [DATE]

Defaults: SERVER_DIR = . (cwd), OUT = ./config/wfcore-modmanifest.json, DATE = today (UTC).

Run this on the server (or point SERVER_DIR at your server root) after adding or updating any jar
in mods/ or client_mods/. Pack Launcher regenerates this automatically for dynamic mods; re-run
manually for static changes.
"""
import datetime
import hashlib
import json
import os
import sys

NOTE = (
    "fileName -> sha256 of every jar a client loads from mods/. Soft-checked by wfcore on join "
    "(see clientModAudit in wfcore.toml). Sources: server mods/ (shared) + client_mods/ (client-only, "
    "managed by Pack Launcher for dynamic mods). Regenerate after any jar change with tools/gen_modmanifest.py."
)


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def scan_dir(directory, mods, label):
    if not os.path.isdir(directory):
        print(f"  {label}: not found, skipping")
        return 0
    count = 0
    for name in sorted(os.listdir(directory), key=str.lower):
        if not name.lower().endswith(".jar"):
            continue
        full = os.path.join(directory, name)
        if os.path.isfile(full):
            mods[name] = sha256(full)
            count += 1
    print(f"  {label}: {count} jar(s)")
    return count


def main():
    server_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(server_dir, "config", "wfcore-modmanifest.json")
    date = sys.argv[3] if len(sys.argv) > 3 else datetime.date.today().isoformat()

    mods = {}
    print("Scanning:")
    scan_dir(os.path.join(server_dir, "mods"), mods, "mods/")
    scan_dir(os.path.join(server_dir, "client_mods"), mods, "client_mods/")

    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        json.dump({"generated": date, "note": NOTE, "mods": mods}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"Wrote {len(mods)} total entries -> {out}")


if __name__ == "__main__":
    main()
