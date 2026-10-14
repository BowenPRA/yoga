import { STRINGS } from '../../lib/strings.js'
import { POSES, getPose, getTerm } from '../../lib/content.js'

/**
 * "Practise this pose", built from the pose's own data and nothing else:
 *
 *   names      hear the English, Sanskrit and Vietnamese names; say the
 *              English and the Sanskrit (and one word of the pose with a
 *              pronunciation trap) into the mic
 *   order      put four or five of its cues in teaching order
 *   sort       its muscles into working and lengthening
 *   dictation  hear one cue and type it, only a cue whose clip exists
 *   predict    Yin only: the counterpose, against poses that load the same area
 *
 * A step the pose cannot support is left out, so a deck has three to five
 * steps. `have` is the set of generated clips (public/audio/manifest.json),
 * or null when it cannot be read; `seed` varies the shuffles and the
 * dictation cue from one practice to the next.
 *
 * Every activity is shaped as the lessons shape theirs (content/lessons/*.js),
 * so the lesson components play it unchanged.
 */

const fill = (s, vars) => Object.entries(vars).reduce((out, [k, v]) => out.replaceAll(`{${k}}`, v), s)

/** One `practice` string in both languages, filled per language. */
const both = (key, vi = {}, en = vi) => ({
  vi: fill(STRINGS.vi.practice[key], vi),
  en: fill(STRINGS.en.practice[key], en),
})

/** A stable number for a string, so a choice is the same for the same seed. */
function hash(s) {
  let h = 2166136261
  for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0 }
  return h
}
const byHash = (list, seed, key = (x) => x) => [...list].sort((a, b) => hash(`${seed}:${key(a)}`) - hash(`${seed}:${key(b)}`))

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const plainWords = (s) => s.toLowerCase().replace(/[’']/g, "'").replace(/^(your|the|a)\s+/, '')

/** The ways a cue can name a term: its English name, its short name, its plain phrase. */
function namesOf(term) {
  return [term.en, term.shortEn, term.plain && plainWords(term.plain)].filter((x) => x && x.length > 2).map((x) => x.toLowerCase())
}

/** The pose's own terms that a line names, as the lessons credit `cued`. */
export function namedTerms(text, termIds) {
  const line = String(text || '').toLowerCase().replace(/[’']/g, "'")
  return termIds.filter((id) => {
    const term = getTerm(id)
    return term && namesOf(term).some((n) => new RegExp(`(^|[^a-z])${escape(n)}(e?s)?([^a-z]|$)`).test(line))
  })
}

/** The anatomy terms a pose links to: working, lengthening, joints. */
export function poseTerms(pose) {
  const m = pose.muscles || {}
  return [...new Set([...(m.working || []), ...(m.lengthening || []), ...(pose.joints || [])])].filter((id) => getTerm(id))
}

const words = (s) => String(s || '').trim().split(/\s+/).length

/**
 * Four or five cues whose order a teacher would not argue about. A pose's
 * cues follow the schema's teaching order (getting in, alignment, softening,
 * breath, safety, coming out), so take the first cue, then the first
 * alignment, softening and breath cue in turn, then the cue that brings them
 * out: each of a different kind, in the order the kinds are taught. Never a
 * safety line (those can be said at any moment), never a variation that
 * comes back to alignment late in the hold.
 */
function orderCues(cues) {
  if (cues.length < 4) return null
  let last = -1
  for (let i = cues.length - 1; i > 0 && i >= cues.length - 3; i -= 1) if (cues[i].kind === 'transition') { last = i; break }
  if (last < 0) for (let i = cues.length - 1; i > 0; i -= 1) if (cues[i].kind !== 'safety') { last = i; break }
  if (last < 2) return null
  const middle = cues.slice(1, last).map((c, k) => ({ c, i: k + 1 })).filter(({ c }) => c.kind !== 'safety')
  const pick = []
  let after = 0
  for (const kind of ['alignment', 'soften', 'breath']) {
    const hit = middle.find(({ c, i }) => c.kind === kind && i > after)
    if (hit) { pick.push(hit); after = hit.i }
  }
  // A pose that skips a kind: fill from what is left, spread out, keeping the order.
  if (pick.length < 2) {
    const rest = middle.filter((x) => !pick.includes(x))
    const spread = rest.length <= 3 - pick.length ? rest : [0, rest.length - 1].map((k) => rest[k])
    pick.push(...spread.slice(0, 3 - pick.length))
    pick.sort((a, b) => a.i - b.i)
  }
  const chosen = [cues[0], ...pick.map(({ c }) => c), cues[last]]
  return chosen.length >= 3 ? chosen : null
}

/** "getting in, alignment, softening, coming out", from the kinds of the chosen cues. */
function orderParts(chosen, lang) {
  const P = STRINGS[lang].practice.parts
  const keys = chosen.map((c, i) => {
    if (c.kind === 'transition') return i === 0 ? 'in' : i === chosen.length - 1 ? 'out' : 'deeper'
    return c.kind
  })
  return keys.filter((k, i) => P[k] && k !== keys[i - 1]).map((k) => P[k]).join(', ')
}

function namesStep(pose, have) {
  const playable = (id) => (have ? have.has(id) : false)
  const items = [{ key: 'en', kind: 'name', clip: `${pose.id}__en`, text: pose.en, playable: have ? have.has(`${pose.id}__en`) : true }]
  if (pose.sa) items.push({ key: 'sa', kind: 'name', clip: `${pose.id}__sa`, text: pose.sa, say: pose.say, playable: playable(`${pose.id}__sa`) })
  // One word of the pose worth saying aloud: a muscle (else a joint) with a known pronunciation trap.
  const m = pose.muscles || {}
  const wordId = [...(m.working || []), ...(m.lengthening || []), ...(pose.joints || [])].find((id) => getTerm(id)?.say && getTerm(id)?.traps?.length)
  if (wordId) {
    const term = getTerm(wordId)
    items.push({ key: 'word', kind: 'term', clip: term.id, text: term.en, say: term.say, vi: term.vi, credit: term.id, playable: have ? have.has(term.id) : true })
  }
  return { type: 'names', id: `${pose.id}-names`, items }
}

function orderStep(pose, terms, seed) {
  const chosen = orderCues(pose.cues || [])
  if (!chosen) return null
  return {
    type: 'order',
    activity: {
      type: 'order', id: `${pose.id}-order-${seed}`, pose: pose.id,
      prompt: both('orderPrompt', { pose: pose.vi }, { pose: pose.en }),
      steps: chosen.map((c) => c.id),
      explain: both('orderExplain', { parts: orderParts(chosen, 'vi') }, { parts: orderParts(chosen, 'en') }),
    },
    // Credited when the order is right, as a lesson's `credits` are.
    credits: { cued: namedTerms(chosen.map((c) => c.en).join(' | '), terms) },
  }
}

function sortStep(pose, seed) {
  const m = pose.muscles || {}
  const working = (m.working || []).filter((id) => getTerm(id)).slice(0, 3)
  const lengthening = (m.lengthening || []).filter((id) => getTerm(id) && !working.includes(id)).slice(0, 3)
  if (!working.length || !lengthening.length || working.length + lengthening.length < 3) return null
  const cards = [...working.map((term) => ({ term, bin: 'working' })), ...lengthening.map((term) => ({ term, bin: 'lengthening' }))]
  // The verdict teaches the second register: the plain phrase a teacher says for each technical word.
  const plain = cards.map((c) => getTerm(c.term)).filter((t) => t.plain && plainWords(t.plain) !== t.en.toLowerCase())
  const lines = (lang) => plain.map((t) => fill(STRINGS[lang].practice.sortLine, { plain: t.plain, en: t.en, vi: t.vi })).join('; ')
  const B = (lang) => STRINGS[lang].practice.bins
  return {
    type: 'sort',
    activity: {
      type: 'sort', id: `${pose.id}-sort-${seed}`, pose: pose.id,
      prompt: both('sortPrompt', { pose: pose.vi }, { pose: pose.en }),
      bins: [
        { id: 'working', vi: B('vi').working, en: B('en').working },
        { id: 'lengthening', vi: B('vi').lengthening, en: B('en').lengthening },
      ],
      cards,
      explain: plain.length ? both('sortExplain', { lines: lines('vi') }, { lines: lines('en') }) : both('sortGeneral'),
    },
  }
}

function dictationStep(pose, have, terms, seed, ordered) {
  if (!have) return null
  const cues = (pose.cues || []).filter((c) => have.has(c.id))
  if (!cues.length) return null
  const fits = (c, max) => words(c.en) >= 5 && words(c.en) <= max
  const tiers = [cues.filter((c) => !ordered.includes(c.id) && fits(c, 14)), cues.filter((c) => fits(c, 16)), cues]
  const pool = tiers.find((x) => x.length)
  const cue = pool[hash(seed) % pool.length]
  return {
    type: 'dictation',
    activity: {
      type: 'dictation', id: `${pose.id}-dictation-${seed}`, clip: cue.id,
      prompt: both('dictationPrompt', { pose: pose.vi }, { pose: pose.en }),
      credits: { cued: namedTerms(cue.en, terms) },
    },
  }
}

// Poses that are themselves the rest after a hold (Child's Pose, Savasana,
// Reclined Twist...) are never offered as a wrong answer.
const RESTS = new Set(POSES.map((p) => p.yin?.counter).filter(Boolean))
const fold = (s) => String(s || '').toLowerCase().replace(/[’']/g, "'")

/** Yin: the counterpose when the data names one and there are wrong answers to set beside it, else the hold. */
function predictStep(pose, seed) {
  return counterStep(pose, seed) || holdStep(pose, seed)
}

function counterStep(pose, seed) {
  const counter = pose.yin?.counter ? getPose(pose.yin.counter) : null
  if (!counter) return null
  const targets = new Set(pose.yin.target || [])
  const skip = new Set([pose.id, counter.id, ...(pose.counterPoses || []), ...(pose.transitionsTo || [])])
  // Wrong answers ask more of the same area: other Yin holds that share a target.
  const pool = POSES.filter((p) => p.yin && !skip.has(p.id) && !RESTS.has(p.id) && p.yin.target?.some((x) => targets.has(x)))
  if (!pool.length) return null
  const wrong = byHash(pool, `${pose.id}:${seed}`, (p) => p.id).slice(0, 3)
  const options = byHash([counter, ...wrong], `${pose.id}:${seed}:options`, (p) => p.id).map((p) => ({ id: p.id, en: p.en, vi: p.vi }))
  // The pose's own line that sends them there, when it has one ("Rest in Child's Pose...").
  const names = [counter.en, ...(counter.aka || [])].map(fold)
  const then = (pose.cues || []).find((c) => names.some((n) => fold(c.en).includes(n)))
  return {
    type: 'predict',
    activity: {
      type: 'predict', id: `${pose.id}-predict-${seed}`,
      prompt: both('predictPrompt', { pose: pose.vi }, { pose: pose.en }),
      options, correct: counter.id,
      explain: both('predictExplain', { counter: counter.vi }, { counter: counter.en }),
      ...(then ? { then: { clip: then.id } } : {}),
    },
  }
}

// Holds to set beside the real one, in minutes; five breaths is about half a minute.
const HOLDS = [['breaths', 0.6], ['one', 1], ['ten', 10], ['twenty', 20]]

/**
 * How long the hold is. The wrong answers are at least two and a half times
 * shorter or longer than the real one, so a hold of "one to five minutes"
 * never has a near miss marked wrong: the nearest one below and above.
 */
function holdStep(pose, seed) {
  const n = pose.yin?.holdMinutes
  // A rest (Savasana) has no edge to find; its length is the teacher's choice.
  if (!n || pose.family === 'restorative') return null
  const far = HOLDS.filter(([, m]) => m * 2.5 <= n || m >= n * 2.5)
  const below = far.filter(([, m]) => m < n).pop()
  const above = far.find(([, m]) => m > n)
  const wrong = [below, above].filter(Boolean)
  if (!wrong.length) return null
  const H = (lang) => STRINGS[lang].practice.holds
  const right = { id: 'hold', vi: n === 1 ? H('vi').aboutOne : fill(H('vi').about, { n }), en: n === 1 ? H('en').aboutOne : fill(H('en').about, { n }) }
  const options = byHash([right, ...wrong.map(([k]) => ({ id: k, vi: H('vi')[k], en: H('en')[k] }))], `${pose.id}:${seed}:hold`, (o) => o.id)
  return {
    type: 'predict',
    activity: {
      type: 'predict', id: `${pose.id}-hold-${seed}`,
      prompt: both('holdPrompt', { pose: pose.vi }, { pose: pose.en }),
      options, correct: 'hold',
      explain: both('holdExplain', { pose: pose.vi, hold: right.vi.toLowerCase() }, { pose: pose.en, hold: right.en.toLowerCase() }),
    },
  }
}

/** The steps of one practice: { steps, terms } where `terms` are the anatomy words it touches. */
export function buildPractice(pose, have = null, seed = 0) {
  if (!pose) return { steps: [], terms: [] }
  const terms = poseTerms(pose)
  const names = namesStep(pose, have)
  const order = orderStep(pose, terms, seed)
  const sort = sortStep(pose, seed)
  const dictation = dictationStep(pose, have, terms, seed, order?.activity.steps || [])
  const predict = pose.yin ? predictStep(pose, seed) : null
  const steps = [names, order, sort, dictation, predict].filter(Boolean)
  const touched = new Set([
    ...names.items.filter((it) => it.credit).map((it) => it.credit),
    ...(sort?.activity.cards.map((c) => c.term) || []),
    ...(order?.credits.cued || []),
    ...(dictation?.activity.credits.cued || []),
  ])
  return { steps, terms: terms.filter((id) => touched.has(id)) }
}
