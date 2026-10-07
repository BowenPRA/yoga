/**
 * Colour as atmosphere. Every place in the app has a tint, so a screen is
 * recognisable before it is read: a body region, a kind of activity, a yoga
 * style, a moment of the class. A tint is one of five names; `tintClass`
 * turns it into the CSS class that sets --tint for everything below.
 */
export const TINTS = ['sage', 'clay', 'gold', 'mist', 'dusk']

export const tintClass = (tint) => `tint-${TINTS.includes(tint) ? tint : 'sage'}`

/** Body regions, as the lessons and the anatomy index name them. */
const REGION = {
  hip: 'clay',
  pelvis: 'clay',
  thigh: 'clay',
  leg: 'mist',
  'lower-leg': 'mist',
  knee: 'mist',
  spine: 'sage',
  back: 'sage',
  trunk: 'gold',
  chest: 'gold',
  'shoulder-girdle': 'dusk',
  shoulder: 'dusk',
  neck: 'dusk',
  head: 'dusk',
  arm: 'gold',
  foot: 'clay',
  breath: 'mist',
}
export const regionTint = (region) => REGION[region] || 'sage'

/** Lessons: by their own id first, then by region. */
const LESSON = { hip: 'clay', knee: 'mist', spine: 'sage', shoulder: 'dusk', arm: 'gold', foot: 'clay', breath: 'mist' }
export const lessonTint = (lesson) => LESSON[lesson?.id] || regionTint(lesson?.region)

/** Activities: the same kind of task always arrives in the same colour. */
const ACTIVITY = { label: 'sage', hotspot: 'clay', sort: 'gold', order: 'mist', predict: 'dusk', chain: 'sage', dictation: 'mist', sayit: 'clay' }
export const activityTint = (type) => ACTIVITY[type] || 'sage'

/** Yoga styles. */
const STYLE = { vinyasa: 'sage', ashtanga: 'gold', yin: 'dusk' }
export const styleTint = (style) => STYLE[style] || 'sage'
export const poseTint = (pose) => styleTint(pose?.styles?.[0])

/** Moments of the class, as the Phrases tab groups them. */
const MOMENT = { welcome: 'gold', breath: 'mist', transitions: 'sage', safety: 'clay', yin: 'dusk', savasana: 'dusk', closing: 'gold' }
export const momentTint = (groupId) => MOMENT[groupId] || 'sage'

/** Kinds of term on the anatomy tab. */
export const termTint = (term) => (term?.kind === 'movement' ? 'mist' : term?.isBone ? 'gold' : regionTint(term?.region))

/**
 * A small window onto a figure for each lesson, used as its picture on the
 * lesson row and the home card: [kind, [x, y, w, h]] in figure units.
 */
const ART = {
  hip: ['skeleton', [120, 300, 196, 150]],
  knee: ['skeleton', [150, 470, 140, 150]],
  spine: ['back', [160, 180, 220, 300]],
  shoulder: ['back', [120, 150, 300, 200]],
  arm: ['front', [430, 230, 180, 330]],
  foot: ['skeleton', [120, 700, 200, 130]],
  breath: ['front', [220, 330, 240, 200]],
}
export const lessonArt = (lesson) => {
  const a = ART[lesson?.id]
  return a ? { kind: a[0], window: a[1] } : null
}

/** The greeting for this hour: morning, afternoon, evening, night. */
export function dayPart(date = new Date()) {
  const h = date.getHours()
  if (h < 5) return 'night'
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  if (h < 22) return 'evening'
  return 'night'
}
