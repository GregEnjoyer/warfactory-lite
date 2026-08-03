#!/usr/bin/env python3
"""Regenerate config/wfcore-modmanifest.json — the soft client-mod audit manifest.

wfcore's ModAuditService asks each joining client to SHA-256 the jars it loaded from mods/ and
compares them to this manifest (fileName -> sha256). Jars the client reports that are absent here
are flagged "UNKNOWN"; the audit is soft (log + operator notice + optional webhook), never a kick.

The client only reports *loaded mod-folder jars* (see ModAuditClient#collect). Hashing every
top-level mods/*.jar is a safe superset of that set: no client jar can be UNKNOWN, and MISSING is
only reported when clientModAudit.flagMissing is enabled.

Usage:
    tools/gen_modmanifest.py [MODS_DIR] [OUT] [DATE]

Defaults: MODS_DIR = ./mods, OUT = ./config/wfcore-modmanifest.json, DATE = today (UTC).
Point MODS_DIR at the client's realized mods/ (e.g. the PrismLauncher instance) so ModDirector-
delivered short names (wfcore.jar, wfweight.jar, ...) and their current hashes are captured.
"""
import datetime
import hashlib
import json
import os
import sys

NOTE = ("fileName -> sha256 of every jar a client loads from mods/. Soft-checked by wfcore on join "
        "(see clientModAudit in wfcore.toml). Regenerate after any mods/ change with tools/gen_modmanifest.py.")


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def main():
    mods_dir = sys.argv[1] if len(sys.argv) > 1 else "mods"
    out = sys.argv[2] if len(sys.argv) > 2 else os.path.join("config", "wfcore-modmanifest.json")
    date = sys.argv[3] if len(sys.argv) > 3 else datetime.date.today().isoformat()

    mods = {}
    for name in sorted(os.listdir(mods_dir), key=str.lower):
        if not name.lower().endswith(".jar"):
            continue
        full = os.path.join(mods_dir, name)
        if os.path.isfile(full):
            mods[name] = sha256(full)

    with open(out, "w", encoding="utf-8") as f:
        json.dump({"generated": date, "note": NOTE, "mods": mods}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"wrote {len(mods)} entries to {out} (from {mods_dir})")


if __name__ == "__main__":
    main()
