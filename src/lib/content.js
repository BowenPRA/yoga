import { POSES } from '../../content/poses/index.js'
import { MUSCLES_UPPER } from '../../content/anatomy/muscles-upper.js'
import { MUSCLES_CORE } from '../../content/anatomy/muscles-core.js'
import { MUSCLES_LOWER } from '../../content/anatomy/muscles-lower.js'
import { BONES } from '../../content/anatomy/bones.js'
import { MOVEMENTS } from '../../content/anatomy/movements.js'
import { PHRASE_GROUPS } from '../../content/phrases.js'
import { LESSONS } from '../../content/lessons/index.js'

/**
 * The content registry. Content files are plain data; this is the only place
 * that knows where they live. Ids are stable slugs and double as audio clip
 * names.
 */
export const MUSCLES = [...MUSCLES_UPPER, ...MUSCLES_CORE, ...MUSCLES_LOWER].map((m) => ({ ...m, kind: 'muscle' }))
export const BONES_ALL = BONES.map((b) => ({ ...b, kind: b.kind || 'bone', isBone: true }))
export const MOVEMENTS_ALL = MOVEMENTS.map((m) => ({ ...m, kind: 'movement' }))
export const TERMS = [...MUSCLES, ...BONES_ALL, ...MOVEMENTS_ALL]
export { POSES, PHRASE_GROUPS, LESSONS }

const termById = new Map(TERMS.map((t) => [t.id, t]))
const poseById = new Map(POSES.map((p) => [p.id, p]))
const lessonById = new Map(LESSONS.map((l) => [l.id, l]))

export const getTerm = (id) => termById.get(id)
export const getPose = (id) => poseById.get(id)
export const getLesson = (id) => lessonById.get(id)

/** The text of any cue clip id: a term cue (`term__cue-N`) or a pose line. */
export function cueText(clipId) {
  const m = clipId.match(/^(.+)__cue-(\d+)$/)
  if (m && termById.has(m[1])) {
    const c = termById.get(m[1]).cues?.[Number(m[2]) - 1]
    if (c) return { en: c.en, vi: c.vi }
  }
  for (const p of POSES) {
    const line = [...(p.cues || []), ...(p.modifications || []), ...(p.safety || [])].find((x) => x.id === clipId)
    if (line) return { en: line.en, vi: line.vi }
  }
  for (const L of LESSONS) {
    const line = lessonLines(L).find((x) => x.id === clipId)
    if (line) return { en: line.en, vi: line.vi }
  }
  return null
}

/** The lesson's own spoken lines (the "when a student hurts" line per term). */
export function lessonLines(lesson) {
  const out = []
  for (const s of lesson.slides || []) {
    if (s.care) out.push({ ...s.care, kind: 'cue-safety' })
    for (const l of s.lines || []) out.push(l)
  }
  return out
}

/** Every clip id a lesson plays, so the audio generator can do them first. */
export function lessonClipIds(lesson) {
  const ids = new Set()
  const term = (id) => {
    const t = termById.get(id)
    if (!t) return
    ids.add(t.id)
    if (t.plain && t.plain.toLowerCase() !== t.en.toLowerCase()) ids.add(`${t.id}__plain`)
    ;(t.cues || []).forEach((_, i) => ids.add(`${t.id}__cue-${i + 1}`))
  }
  for (const id of lesson.terms || []) term(id)
  for (const s of lesson.slides || []) {
    if (s.care) ids.add(s.care.id)
    for (const l of s.lines || []) ids.add(l.id)
    const a = s.activity
    if (!a) continue
    for (const id of a.bank || []) term(id)
    for (const c of a.cards || []) term(c.term)
    for (const id of a.steps || []) ids.add(id)
    for (const it of a.items || []) ids.add(it.clip)
    if (a.clip) ids.add(a.clip)
    if (a.then?.clip) ids.add(a.then.clip)
  }
  const poseIds = new Set([lesson.pose, ...(lesson.slides || []).map((s) => s.pose || s.activity?.pose)].filter(Boolean))
  for (const pid of poseIds) {
    const p = poseById.get(pid)
    if (!p) continue
    ids.add(`${p.id}__en`)
    if (p.sa) ids.add(`${p.id}__sa`)
    for (const l of [...(p.cues || []), ...(p.modifications || []), ...(p.safety || [])]) ids.add(l.id)
    for (const id of [...(p.muscles?.working || []), ...(p.muscles?.lengthening || []), ...(p.joints || [])]) term(id)
  }
  return [...ids]
}

/** A readable name for a pose slug that has no content yet. */
export function poseName(id) {
  const p = poseById.get(id)
  if (p) return p.en
  return id.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ').replace(/ Pose$/, ' Pose')
}

// ── The pose library ─────────────────────────────────────────────────────
// The Poses tab regroups the one list several ways: by family, the Ashtanga
// primary series in order, Yin by the area a hold targets. These orders are
// the display orders; content/poses/README.md holds the allowed values.

/** Families, in the arc of a class: warm up, stand, balance, open, fold, rest. */
export const FAMILIES = [
  'sun-salutation', 'standing', 'balance', 'arm-balance', 'core', 'backbend', 'prone',
  'twist', 'forward-fold', 'hip-opener', 'seated', 'inversion', 'supine', 'restorative',
]
/** The sections of the primary series, in the order they are practised. */
export const SECTIONS = ['surya-a', 'surya-b', 'standing', 'seated', 'finishing']
/** Yin target areas, from the hips outward. */
export const TARGETS = ['hips', 'inner-thighs', 'hamstrings', 'quads', 'spine', 'chest', 'shoulders', 'neck', 'feet']
export const LEVELS = ['gentle', 'moderate', 'strong']

/** Group a list under keys in a fixed order; unknown keys go last, under 'other'. */
function groupBy(list, keysOf, order) {
  const m = new Map(order.map((k) => [k, []]))
  for (const p of list) {
    for (const k of keysOf(p)) {
      const key = m.has(k) ? k : 'other'
      if (!m.has(key)) m.set(key, [])
      m.get(key).push(p)
    }
  }
  return [...m.entries()].filter(([, poses]) => poses.length).map(([key, poses]) => ({ key, poses }))
}

/** The poses of one style ('vinyasa' | 'ashtanga' | 'yin'), or every pose for 'all'. */
export function posesByStyle(style, list = POSES) {
  return !style || style === 'all' ? list : list.filter((p) => p.styles?.includes(style))
}

/** A list grouped by family, in FAMILIES order: [{ key: family, poses }]. */
export function familiesOf(list = POSES) {
  return groupBy(list, (p) => [p.family], FAMILIES)
}

const SERIES = POSES.filter((p) => p.ashtanga).sort((a, b) => a.ashtanga.position - b.ashtanga.position)

/**
 * The primary series in order, grouped by section: [{ key: section, poses }].
 * Given a list (a search result), only those poses; an Ashtanga pose with no
 * `ashtanga` block yet comes last, under 'other'.
 */
export function ashtangaSeries(list = POSES) {
  const inList = new Set(list)
  const ordered = [...SERIES.filter((p) => inList.has(p)), ...list.filter((p) => !p.ashtanga && p.styles?.includes('ashtanga'))]
  return groupBy(ordered, (p) => [p.ashtanga?.section || 'other'], SECTIONS)
}

/** How many poses the series has: the last position written. */
export const seriesLength = () => (SERIES.length ? SERIES[SERIES.length - 1].ashtanga.position : 0)
export function nextInSeries(pose) {
  const i = SERIES.indexOf(pose)
  return i < 0 ? null : SERIES[i + 1] || null
}
export function prevInSeries(pose) {
  const i = SERIES.indexOf(pose)
  return i < 1 ? null : SERIES[i - 1]
}

/**
 * Yin poses grouped by target area, in TARGETS order: [{ key: target, poses }].
 * A pose that targets two areas is listed under both, because a teacher
 * planning "a class for the spine" wants every pose that reaches it.
 */
export function yinByTarget(list = POSES) {
  const yin = list.filter((p) => p.yin || p.styles?.includes('yin'))
  return groupBy(yin, (p) => (p.yin?.target?.length ? p.yin.target : ['other']), TARGETS)
}

/**
 * Fold text for searching: no diacritics (NFD, then drop the combining
 * marks, so Śvānāsana is svanasana and Chó úp mặt is cho up mat), đ as d,
 * punctuation as space, lower case.
 */
export function fold(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const haystack = new Map(POSES.map((p) => [p, fold([p.en, ...(p.aka || []), p.sa, p.vi, p.id].filter(Boolean).join(' '))]))

/**
 * Search poses by English name, other names, Sanskrit (with or without
 * diacritics) or Vietnamese (with or without tones). Every word of the query
 * must appear; order is kept.
 */
export function searchPoses(q, list = POSES) {
  const words = fold(q).split(' ').filter(Boolean)
  if (!words.length) return list
  return list.filter((p) => {
    const h = haystack.get(p) ?? fold([p.en, ...(p.aka || []), p.sa, p.vi, p.id].filter(Boolean).join(' '))
    return words.every((w) => h.includes(w))
  })
}

/**
 * Every clip a pose page plays: its names, cues, modifications and safety
 * lines, and the names of the muscles and joints it links to. For keeping a
 * pose offline.
 */
export function poseClipIds(pose) {
  if (!pose) return []
  const ids = [`${pose.id}__en`]
  if (pose.sa) ids.push(`${pose.id}__sa`)
  for (const l of [...(pose.cues || []), ...(pose.modifications || []), ...(pose.safety || [])]) ids.push(l.id)
  for (const id of [...(pose.muscles?.working || []), ...(pose.muscles?.lengthening || []), ...(pose.joints || [])]) if (termById.has(id)) ids.push(id)
  return [...new Set(ids)]
}

/** A readable name for whatever a "suggest a fix" note was written on. */
export function targetLabel(target) {
  if (!target) return ''
  const p = poseById.get(target)
  if (p) return p.en
  const t = termById.get(target)
  if (t) return t.en
  const l = lessonById.get(target)
  if (l) return l.title?.en || target
  const g = target.startsWith('phrases:') && PHRASE_GROUPS.find((x) => `phrases:${x.id}` === target)
  if (g) return `Phrases: ${g.title?.en || g.id}`
  return target
}

/** Poses that involve a given term (muscle or joint). */
export function posesUsing(termId) {
  return POSES.filter((p) => {
    const m = p.muscles || {}
    return [...(m.working || []), ...(m.lengthening || []), ...(p.joints || [])].includes(termId)
  })
}

/** Search terms by English, Latin, plain phrase or Vietnamese. */
export function searchTerms(q, list = TERMS) {
  const s = q.trim().toLowerCase()
  if (!s) return list
  return list.filter((t) =>
    [t.en, t.latin, t.plain, t.shortEn, t.vi, t.viPlain].filter(Boolean).some((v) => v.toLowerCase().includes(s)),
  )
}

/**
 * Every speakable unit, for the audio generator. A clip is { id, text, lang,
 * kind }. Ids: term id (the English name), `${id}__plain`, `${id}__cue-N`,
 * pose names and lines, `phrase__${lineId}`.
 */
export function allClips() {
  const clips = []
  for (const t of TERMS) {
    clips.push({ id: t.id, text: t.en, lang: 'en', kind: 'term' })
    if (t.plain && t.plain.toLowerCase() !== t.en.toLowerCase()) clips.push({ id: `${t.id}__plain`, text: t.plain, lang: 'en', kind: 'plain' })
    ;(t.cues || []).forEach((c, i) => clips.push({ id: `${t.id}__cue-${i + 1}`, text: c.en, lang: 'en', kind: `cue-${c.style || 'vinyasa'}` }))
  }
  for (const p of POSES) {
    clips.push({ id: `${p.id}__en`, text: p.en, lang: 'en', kind: 'pose-name' })
    if (p.sa) clips.push({ id: `${p.id}__sa`, text: p.sa, say: p.say, lang: 'sa', kind: 'pose-name' })
    for (const c of p.cues || []) clips.push({ id: c.id, text: c.en, lang: 'en', kind: `cue-${c.kind || 'alignment'}` })
    for (const m of p.modifications || []) clips.push({ id: m.id, text: m.en, lang: 'en', kind: 'modification' })
    for (const s of p.safety || []) clips.push({ id: s.id, text: s.en, lang: 'en', kind: 'safety' })
  }
  for (const g of PHRASE_GROUPS) {
    for (const l of g.lines) clips.push({ id: `phrase__${l.id}`, text: l.en, lang: 'en', kind: `phrase-${g.id}` })
  }
  for (const L of LESSONS) {
    for (const l of lessonLines(L)) clips.push({ id: l.id, text: l.en, lang: 'en', kind: l.kind || 'cue-safety' })
  }
  return clips
}
