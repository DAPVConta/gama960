"""Inline every icon in assets/icons/ into index.html as an SVG sprite.

Each file becomes <symbol id="i-<file name>">. Root stroke-width is dropped so
CSS (.icon { stroke-width }) controls line weight. Run after adding or changing icons:

    python tools/build-sprite.py
"""
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ICONS = ROOT / "assets" / "icons"
INDEX = ROOT / "index.html"
SVG_NS = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVG_NS)


def symbol_for(path: Path) -> str:
    svg = ET.parse(path).getroot()
    inner = "".join(ET.tostring(child, encoding="unicode") for child in svg)
    inner = inner.replace(f' xmlns="{SVG_NS}"', "")
    view_box = svg.get("viewBox", "0 0 24 24")
    return f'<symbol id="i-{path.stem}" viewBox="{view_box}">{inner}</symbol>'


def main() -> int:
    symbols = "\n".join(symbol_for(p) for p in sorted(ICONS.glob("*.svg")))
    sprite = (
        "<!-- sprite:start -->\n"
        '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">\n'
        f"{symbols}\n</svg>\n"
        "<!-- sprite:end -->"
    )
    html = INDEX.read_text(encoding="utf-8")
    updated, count = re.subn(r"<!-- sprite:start -->.*?<!-- sprite:end -->", lambda _: sprite, html, flags=re.S)
    if count != 1:
        print("sprite markers not found in index.html", file=sys.stderr)
        return 1
    INDEX.write_text(updated, encoding="utf-8")
    print(f"inlined {len(list(ICONS.glob('*.svg')))} icons")
    return 0


if __name__ == "__main__":
    sys.exit(main())
