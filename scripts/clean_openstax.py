"""Make label-free muscle figures from the OpenStax figure 11.5 (CC BY 4.0).

The source has black leader lines drawn across the body. They are pure black
on a salmon-and-cream drawing whose own outlines are dark red, so a colour
threshold finds them; a dilated mask is then inpainted (Telea) so the muscle
texture flows back over the gap. The figure is split into anterior and
posterior halves and cropped to the body.

Output: public/anatomy/muscles-front.jpg, muscles-back.jpg, plus
research/anatomy/mask-*.png for inspection.
"""
import os

import cv2
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "research", "anatomy", "openstax-1105-original.jpg")
OUT = os.path.join(ROOT, "public", "anatomy")
DBG = os.path.join(ROOT, "research", "anatomy")

img = cv2.imread(SRC)
h, w = img.shape[:2]
print("source", w, h)

# Black leader lines: all channels dark and nearly equal (grey/black), unlike
# the dark-red muscle outlines where R clearly exceeds G and B.
b, g, r = cv2.split(img.astype(np.int16))
dark = (r < 90) & (g < 90) & (b < 90)
neutral = (np.abs(r - g) < 30) & (np.abs(r - b) < 30)
mask = (dark & neutral).astype(np.uint8) * 255
# The drawing itself has no neutral-black pixels (its darks are reddish), so
# every match is a leader line or a label stroke. Dilate so the anti-aliased
# edge goes too.
lines = cv2.dilate(mask, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7)))
cv2.imwrite(os.path.join(DBG, "mask-lines.png"), lines)

clean = cv2.inpaint(img, lines, 4, cv2.INPAINT_TELEA)

# Split anterior / posterior. The two figures stack vertically; find the
# horizontal band of near-white between them.
grey = cv2.cvtColor(clean, cv2.COLOR_BGR2GRAY)
rows_ink = (grey < 235).sum(axis=1)
mid = h // 2
band = np.where(rows_ink[mid - 400: mid + 400] < 5)[0]
split = mid - 400 + (int(band.mean()) if len(band) else 400)
print("split at", split)


def crop_body(part, name):
    gp = cv2.cvtColor(part, cv2.COLOR_BGR2GRAY)
    # The body is the big salmon shape; find columns/rows with saturated colour.
    hsv = cv2.cvtColor(part, cv2.COLOR_BGR2HSV)
    sat = hsv[:, :, 1] > 60
    cols = np.where(sat.sum(axis=0) > 20)[0]
    rows = np.where(sat.sum(axis=1) > 20)[0]
    x0, x1 = max(0, cols.min() - 20), min(part.shape[1], cols.max() + 20)
    y0, y1 = max(0, rows.min() - 20), min(part.shape[0], rows.max() + 20)
    body = part[y0:y1, x0:x1]
    os.makedirs(OUT, exist_ok=True)
    cv2.imwrite(os.path.join(OUT, f"muscles-{name}.jpg"), body, [cv2.IMWRITE_JPEG_QUALITY, 88])
    print(name, "crop", x0, y0, x1, y1, "->", body.shape[1], "x", body.shape[0])
    return (x0, y0, x1, y1)


front = crop_body(clean[:split], "front")
back = crop_body(clean[split:], "back")
with open(os.path.join(DBG, "crops.txt"), "w") as f:
    f.write(f"split {split}\nfront {front}\nback {back}\n")
