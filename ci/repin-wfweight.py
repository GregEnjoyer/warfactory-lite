#!/usr/bin/env python3
"""Re-pin the wfweight (Ultimate-Weight) GitHub asset in pakku-lock.json.

Ultimate-Weight publishes many loader/MC jars in a single rolling `snapshots`
release, so `pakku add/update --gh` cannot reliably auto-select the one we want
(it grabbed the 1.21.1-NeoForge jar). We therefore keep the project frozen
(update_strategy: NONE in pakku.json) and hand-pin the exact 1.20.1-Forge asset
here. Run this in CI to refresh the pin (url/sha256/size) to the current
snapshot. No-op if nothing changed.
"""
import hashlib
import json
import os
import sys
import urllib.request

REPO = "Warfactory-Official/Ultimate-Weight"
TAG = "snapshots"
ASSET = "wfweight-1.20.1-Forge-1.0.0-SNAPSHOT.jar"
LOCK = "pakku-lock.json"


def gh(path):
    req = urllib.request.Request(
        "https://api.github.com/" + path,
        headers={"Accept": "application/vnd.github+json"},
    )
    tok = os.environ.get("GITHUB_TOKEN")
    if tok:
        req.add_header("Authorization", f"Bearer {tok}")
    return json.load(urllib.request.urlopen(req, timeout=60))


def main():
    repo = gh(f"repos/{REPO}")
    rel = gh(f"repos/{REPO}/releases/tags/{TAG}")
    asset = next((a for a in rel["assets"] if a["name"] == ASSET), None)
    if asset is None:
        print(f"::error::asset {ASSET} not found in {REPO}@{TAG}")
        sys.exit(1)

    with urllib.request.urlopen(asset["browser_download_url"], timeout=180) as r:
        data = r.read()
    sha = hashlib.sha256(data).hexdigest()

    lock = json.load(open(LOCK))
    for p in lock["projects"]:
        if p.get("slug", {}).get("github") == REPO:
            f = p["files"][0]
            if f.get("url") == asset["browser_download_url"] and f.get("hashes", {}).get("sha256") == sha:
                print("wfweight pin already current; no change.")
                return
            f.update(
                {
                    "type": "github",
                    "file_name": asset["name"],
                    "release_type": "beta",
                    "url": asset["browser_download_url"],
                    "id": str(asset["id"]),
                    "parent_id": str(repo["id"]),
                    "hashes": {"sha256": sha},
                    "size": asset["size"],
                    "date_published": asset["created_at"],
                }
            )
            json.dump(lock, open(LOCK, "w"), indent=4)
            print(f"re-pinned wfweight -> {asset['name']} ({sha[:12]}, {asset['size']} bytes)")
            return

    print("::error::wfweight (Warfactory-Official/Ultimate-Weight) not present in lock")
    sys.exit(1)


if __name__ == "__main__":
    main()
