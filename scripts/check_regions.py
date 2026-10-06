"""Paint the traced muscle regions onto the figures so the tracing can be
checked by eye. Writes research/anatomy/regions-front.png and regions-back.png.
Reads content/anatomy/regions.js by stripping it down to JSON."""
import json
import os
import re

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = open(os.path.join(ROOT, "content", "anatomy", "regions.js"), encoding="utf-8").read()


def grab(name):
    m = re.search(r"export const " + name + r" = (\{.*?\n\})\n", src, flags=re.S)
    body = m.group(1)
    body = re.sub(r"//.*", "", body)
    body = re.sub(r"'([^']*)'", r'"\1"', body)
    body = re.sub(r"(\w+):", r'"\1":', body)
    body = re.sub(r",(\s*[}\]])", r"\1", body)
    return json.loads(body)


regions = grab("MUSCLE_REGIONS")
colors = [(79, 110, 91), (185, 112, 79), (60, 90, 160), (150, 80, 150), (40, 130, 130), (170, 120, 30)]
try:
    font = ImageFont.truetype("arial.ttf", 13)
except OSError:
    font = None

for view in ["front", "back"]:
    im = Image.open(os.path.join(ROOT, "public", "anatomy", f"muscles-{view}.jpg")).convert("RGBA")
    over = Image.new("RGBA", im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(over)
    for i, (mid, polys) in enumerate(regions[view].items()):
        c = colors[i % len(colors)]
        for p in polys:
            pts = [tuple(q) for q in p]
            d.polygon(pts, fill=c + (90,), outline=c + (255,))
            cx = sum(q[0] for q in p) / len(p)
            cy = sum(q[1] for q in p) / len(p)
            d.text((cx - 20, cy - 7), mid[:14], fill=(0, 0, 0, 255), font=font)
    out = Image.alpha_composite(im, over).convert("RGB")
    path = os.path.join(ROOT, "research", "anatomy", f"regions-{view}.png")
    out.save(path)
    half = im.height // 2
    out.crop((0, 0, im.width, half + 40)).save(path.replace(".png", "-top.png"))
    out.crop((0, half - 40, im.width, im.height)).save(path.replace(".png", "-bottom.png"))
    print(view, len(regions[view]), "regions ->", path)
