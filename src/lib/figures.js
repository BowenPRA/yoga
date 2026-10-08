import { FIGURES, MUSCLE_REGIONS, SKELETON_LANDMARKS, SKELETON_BOXES } from '../../content/anatomy/regions.js'
import skeletonBoxes from '../../content/anatomy/skeleton-boxes.json'
import { BONES_ALL } from './content.js'

/**
 * The three figures and the shapes that stand for each term on them, in one
 * place so the Anatomy tab, the lesson slides and the activities draw the
 * same regions.
 *
 *   kind   'front' | 'back' (OpenStax muscle figures, pixels)
 *          'skeleton' (LadyofHats front skeleton, viewBox units)
 */
const [, , SK_W, SK_H] = skeletonBoxes.viewBox.split(' ').map(Number)

export const FIGURE_SRC = {
  front: { src: FIGURES.front.src, w: FIGURES.front.w, h: FIGURES.front.h },
  back: { src: FIGURES.back.src, w: FIGURES.back.w, h: FIGURES.back.h },
  skeleton: { src: 'anatomy/skeleton-front.svg', w: SK_W, h: SK_H },
}

/** Bone id -> boxes [x0, y0, x1, y1] on the skeleton. */
export const BONE_BOXES = {}
for (const b of BONES_ALL) {
  const boxes = (b.skeleton || []).map((g) => skeletonBoxes.groups[g]).filter(Boolean)
  const extra = SKELETON_BOXES[b.id] || []
  if (boxes.length || extra.length) BONE_BOXES[b.id] = [...boxes, ...extra]
}

/** The shapes for a term on a figure: { polys, boxes, circles }, each possibly empty. */
export function shapesFor(kind, id) {
  if (kind === 'skeleton') return { polys: [], boxes: BONE_BOXES[id] || [], circles: SKELETON_LANDMARKS[id] || [] }
  return { polys: MUSCLE_REGIONS[kind]?.[id] || [], boxes: [], circles: [] }
}

/** The figure a term is drawn on ('front' | 'back' | 'skeleton'), or null. */
export function figureOf(id) {
  if (MUSCLE_REGIONS.front?.[id]) return 'front'
  if (MUSCLE_REGIONS.back?.[id]) return 'back'
  if (BONE_BOXES[id] || SKELETON_LANDMARKS[id]) return 'skeleton'
  return null
}

/**
 * A window [x, y, w, h] around a term's shapes on a figure, padded by a
 * fraction of its size and squared off, so a porthole can show it.
 */
export function windowFor(kind, id, pad = 0.6, min = 120) {
  const s = shapesFor(kind, id)
  const xs = [], ys = []
  for (const poly of s.polys) for (const [x, y] of poly) { xs.push(x); ys.push(y) }
  for (const [x0, y0, x1, y1] of s.boxes) { xs.push(x0, x1); ys.push(y0, y1) }
  for (const [cx, cy, r] of s.circles) { xs.push(cx - r, cx + r); ys.push(cy - r, cy + r) }
  if (!xs.length) return null
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys)
  const size = Math.max(min, (Math.max(x1 - x0, y1 - y0)) * (1 + pad))
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2
  return [cx - size / 2, cy - size / 2, size, size]
}

/** Every term id drawn on a figure. */
export function idsOn(kind) {
  if (kind === 'skeleton') return [...new Set([...Object.keys(BONE_BOXES), ...Object.keys(SKELETON_LANDMARKS)])]
  return Object.keys(MUSCLE_REGIONS[kind] || {})
}

function inPoly([px, py], poly) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

function polyArea(poly) {
  let a = 0
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) a += (poly[j][0] + poly[i][0]) * (poly[j][1] - poly[i][1])
  return Math.abs(a / 2)
}

/**
 * The term under a point on a figure, or null. Landmarks win over bones;
 * otherwise the smallest shape containing the point wins, so a muscle traced
 * inside another (the transversus inside the internal oblique) can be tapped.
 */
export function regionAt(kind, point, ids = idsOn(kind)) {
  const [px, py] = point
  let hit = null
  let best = Infinity
  for (const id of ids) {
    const s = shapesFor(kind, id)
    if (s.circles.some(([cx, cy, r]) => Math.hypot(px - cx, py - cy) <= Math.max(r, 10) + 6)) return id
    for (const p of s.polys) {
      if (inPoly(point, p)) { const a = polyArea(p); if (a < best) { best = a; hit = id } }
    }
    for (const [x0, y0, x1, y1] of s.boxes) {
      if (px >= x0 && px <= x1 && py >= y0 && py <= y1) { const a = (x1 - x0) * (y1 - y0); if (a < best) { best = a; hit = id } }
    }
  }
  return hit
}
