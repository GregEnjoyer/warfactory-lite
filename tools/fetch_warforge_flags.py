#!/usr/bin/env python3
"""
Streamlined WarForge flag pipeline.

Downloads ALL country flags from flagcdn.com using the proportional w### endpoint
(FLAT rectangular flags, not the waving emoji-style WxH preset), normalises each
to WarForge's custom-flag rules (<=256px per side, aspect ratio <=2.0, readable
PNG), losslessly re-compresses, and keeps whichever of {original, re-encoded} is
smaller so quality never drops and size never bloats.

The country list is pulled live from flagcdn's own code table
(https://flagcdn.com/en/codes.json): every ISO 3166-1 alpha-2 code (2-letter),
which is the full set of country flags. The English name is slugified into a
readable id (Cote d'Ivoire -> cote_divoire); WarForge shows the id with
'_' -> ' '. Output id = filename without extension.

Usage: fetch_warforge_flags.py [out_dir]
"""
import io
import json
import re
import sys
import time
import unicodedata
import urllib.request
from pathlib import Path
from PIL import Image

# --- WarForge ServerFlagRegistry constraints ---------------------------------
MAX_DIMENSION = 256          # task cap (mod allows 512; we stay well under)
MIN_DIMENSION = 8
MAX_ASPECT_RATIO = 2.0
MAX_FILE_SIZE = 2 * 1024 * 1024

SIZE = "w320"                # flagcdn proportional preset: FLAT flag, 320px wide,
                             # native aspect ratio (downscaled to <=256 below).
FLAG_URL = "https://flagcdn.com/{size}/{code}.png"
CODES_URL = "https://flagcdn.com/en/codes.json"

OUT_DIR = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("resources/warforge/flags")


def slugify(name: str) -> str:
    name = name.split("(")[0]                                  # drop "(Ivory Coast)" etc.
    name = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode()
    name = name.lower().replace("'", "").replace("’", "")
    name = re.sub(r"[^a-z0-9]+", "_", name).strip("_")
    return name


def fetch_country_list():
    """[(readable_name, iso_alpha2_code)] for every 2-letter flagcdn code."""
    req = urllib.request.Request(CODES_URL, headers={"User-Agent": "wf-flags/1.0"})
    with urllib.request.urlopen(req, timeout=25) as r:
        codes = json.load(r)
    seen, out = {}, []
    for code, name in sorted(codes.items()):
        if len(code) != 2 or not code.isalpha():              # skip gb-eng, us-ca, ...
            continue
        slug = slugify(name) or code
        if slug in seen:                                      # collision -> disambiguate
            slug = f"{slug}_{code}"
        seen[slug] = code
        out.append((slug, code))
    out.sort()
    return out


def normalize(raw: bytes):
    """Return (png_bytes, w, h) meeting all constraints, losslessly, or raise."""
    img = Image.open(io.BytesIO(raw))
    img.load()
    if img.format not in ("PNG", "JPEG", "GIF", "BMP"):
        raise ValueError(f"unsupported format {img.format}")

    transformed = False

    # Downscale (quality-preserving LANCZOS) only if oversized.
    if img.width > MAX_DIMENSION or img.height > MAX_DIMENSION:
        img.thumbnail((MAX_DIMENSION, MAX_DIMENSION), Image.LANCZOS)
        transformed = True

    # Aspect ratio: pad the rare >2:1 flag (e.g. Qatar) onto a centred 2:1 canvas.
    w, h = img.width, img.height
    if max(w, h) / min(w, h) > MAX_ASPECT_RATIO:
        rgba = img.convert("RGBA")
        if w >= h:
            cw, ch = w, max(MIN_DIMENSION, (w + 1) // 2)
        else:
            cw, ch = max(MIN_DIMENSION, (h + 1) // 2), h
        canvas = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
        canvas.paste(rgba, ((cw - w) // 2, (ch - h) // 2))
        img = canvas
        w, h = cw, ch
        transformed = True

    if not (MIN_DIMENSION <= w <= MAX_DIMENSION and MIN_DIMENSION <= h <= MAX_DIMENSION):
        raise ValueError(f"dimensions {w}x{h} out of range")

    # Lossless re-compress candidate. Prefer palette mode (flags are flat colour ->
    # palette is lossless AND small); keep RGBA if it has real alpha or too many
    # colours to palettise without loss.
    candidate = img
    if img.mode != "P":
        rgba = img.convert("RGBA")
        colours = rgba.getcolors(maxcolors=256)
        has_alpha = rgba.getextrema()[3][0] < 255
        if colours is not None and not has_alpha:
            candidate = rgba.convert("RGB").convert(
                "P", palette=Image.ADAPTIVE, colors=len(colours))
        else:
            candidate = rgba
    out = io.BytesIO()
    candidate.save(out, format="PNG", optimize=True, compress_level=9)
    enc = out.getvalue()

    # Keep the smaller of {re-encoded, original} unless we transformed the image.
    best = enc if transformed else (enc if len(enc) <= len(raw) else raw)
    if len(best) > MAX_FILE_SIZE:
        raise ValueError(f"too large ({len(best)} bytes)")
    return best, w, h


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    countries = fetch_country_list()
    print(f"flagcdn country codes: {len(countries)}\n")
    ok, failed, raw_total, out_total = 0, [], 0, 0
    for i, (name, code) in enumerate(countries, 1):
        url = FLAG_URL.format(size=SIZE, code=code)
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "wf-flags/1.0"})
            with urllib.request.urlopen(req, timeout=25) as r:
                raw = r.read()
            png, w, h = normalize(raw)
            (OUT_DIR / f"{name}.png").write_bytes(png)
            raw_total += len(raw)
            out_total += len(png)
            ok += 1
            if i % 25 == 0 or i == len(countries):
                print(f"  ... {i}/{len(countries)} done")
        except Exception as e:
            print(f"  ERR {name:<28} {code}: {e}")
            failed.append(name)
        time.sleep(0.02)

    print("\n----------------------------------------")
    print(f"flags written : {ok}/{len(countries)}  ->  {OUT_DIR}")
    print(f"bytes: downloaded {raw_total} -> stored {out_total} "
          f"(saved {raw_total - out_total}B)")
    if failed:
        print(f"FAILED: {', '.join(failed)}")
    return 0 if not failed else 1


if __name__ == "__main__":
    sys.exit(main())
