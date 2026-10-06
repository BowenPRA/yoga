import { BODY } from '../../content/terms/body.js'
import { MOVEMENT } from '../../content/terms/movement.js'
import { BREATH } from '../../content/terms/breath.js'
import { POSES } from '../../content/poses/index.js'

/**
 * The content registry. Content files are plain data; this is the only place
 * that knows where they live. Everything is looked up by stable id, and ids
 * double as audio clip names.
 */
export const TERMS = [...BODY, ...MOVEMENT, ...BREATH]
const termById = new Map(TERMS.map((t) => [t.id, t]))
const poseById = new Map(POSES.map((p) => [p.id, p]))

export const getTerm = (id) => termById.get(id)
export const getPose = (id) => poseById.get(id)
export { POSES }

/** Poses that involve a given term (muscle or joint). */
export function posesUsing(termId) {
  return POSES.filter((p) => {
    const m = p.muscles || {}
    return [...(m.working || []), ...(m.lengthening || []), ...(p.joints || [])].includes(termId)
  })
}

/**
 * Every speakable unit, for the audio generator and for review. A clip is
 * { id, text, lang, kind }. Ids: term id, `${id}__plain`, `${id}__example`,
 * pose name ids, cue ids, modification ids.
 */
export function allClips() {
  const clips = []
  for (const t of TERMS) {
    clips.push({ id: t.id, text: t.en, lang: 'en', kind: 'term' })
    if (t.plain && t.plain !== t.en) clips.push({ id: `${t.id}__plain`, text: t.plain, lang: 'en', kind: 'plain' })
    if (t.example?.en) clips.push({ id: `${t.id}__example`, text: t.example.en, lang: 'en', kind: 'example' })
  }
  for (const p of POSES) {
    clips.push({ id: `${p.id}__en`, text: p.en, lang: 'en', kind: 'pose-name' })
    if (p.sa) clips.push({ id: `${p.id}__sa`, text: p.sa, say: p.say, lang: 'sa', kind: 'pose-name' })
    for (const c of p.cues || []) clips.push({ id: c.id, text: c.en, lang: 'en', kind: `cue-${c.kind || 'alignment'}` })
    for (const m of p.modifications || []) clips.push({ id: m.id, text: m.en, lang: 'en', kind: 'modification' })
    for (const s of p.safety || []) clips.push({ id: s.id, text: s.en, lang: 'en', kind: 'safety' })
  }
  return clips
}
