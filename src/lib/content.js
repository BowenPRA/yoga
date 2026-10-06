import { POSES } from '../../content/poses/index.js'
import { MUSCLES_UPPER } from '../../content/anatomy/muscles-upper.js'
import { MUSCLES_CORE } from '../../content/anatomy/muscles-core.js'
import { MUSCLES_LOWER } from '../../content/anatomy/muscles-lower.js'
import { BONES } from '../../content/anatomy/bones.js'
import { MOVEMENTS } from '../../content/anatomy/movements.js'
import { PHRASE_GROUPS } from '../../content/phrases.js'

/**
 * The content registry. Content files are plain data; this is the only place
 * that knows where they live. Ids are stable slugs and double as audio clip
 * names.
 */
export const MUSCLES = [...MUSCLES_UPPER, ...MUSCLES_CORE, ...MUSCLES_LOWER].map((m) => ({ ...m, kind: 'muscle' }))
export const BONES_ALL = BONES.map((b) => ({ ...b, kind: b.kind || 'bone', isBone: true }))
export const MOVEMENTS_ALL = MOVEMENTS.map((m) => ({ ...m, kind: 'movement' }))
export const TERMS = [...MUSCLES, ...BONES_ALL, ...MOVEMENTS_ALL]
export { POSES, PHRASE_GROUPS }

const termById = new Map(TERMS.map((t) => [t.id, t]))
const poseById = new Map(POSES.map((p) => [p.id, p]))

export const getTerm = (id) => termById.get(id)
export const getPose = (id) => poseById.get(id)

/** A readable name for a pose slug that has no content yet. */
export function poseName(id) {
  const p = poseById.get(id)
  if (p) return p.en
  return id.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ').replace(/ Pose$/, ' Pose')
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
  return clips
}
