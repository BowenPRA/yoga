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

/** The term under a point on a figure, or null. Landmarks win over bones. */
export function regionAt(kind, point, ids = idsOn(kind)) {
  const [px, py] = point
  let hit = null
  for (const id of ids) {
    const s = shapesFor(kind, id)
    if (s.circles.some(([cx, cy, r]) => Math.hypot(px - cx, py - cy) <= Math.max(r, 10) + 6)) return id
    if (s.polys.some((p) => inPoly(point, p))) hit = hit || id
    if (s.boxes.some(([x0, y0, x1, y1]) => px >= x0 && px <= x1 && py >= y0 && py <= y1)) hit = hit || id
  }
  return hit
}
