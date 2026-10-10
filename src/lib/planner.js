import { POSES, PHRASE_GROUPS, LESSONS, getPose, getTerm, fold, lessonLines } from './content.js'
import { GOALS, CAUTIONS, TWO_SIDED, BRIDGES, MOMENTS, POSTURES } from '../../content/planning.js'

/**
 * The Class Builder's brain, and it lives on the phone. A request in
 * Vietnamese or English becomes a spec (style, minutes, level, goals,
 * cautions); a spec becomes a plan (sections of steps); a plan becomes a
 * script the voice can read from the clips that already exist. Gemini is
 * asked only to tailor what is already built (api/plan.js), never to invent
 * the class, so one call does the work and every pose line still has audio.
 *
 * A plan:
 *   { id, at, mode: 'class' | 'student', style, minutes, level, goals, cautions,
 *     request, seed, title: { en, vi }, sections: [{ key, steps }], careful?, ai? }
 * A step:
 *   { kind: 'lines', id, lines: [phraseId], scale? }          a spoken moment
 *   { kind: 'pose', id, pose, sides, breaths? | minutes?, notes, counter? }
 *   { kind: 'flow', id, poses: [poseId], sides: 2 }           standing poses, right then left
 *   { kind: 'sun', id, a, b }                                 rounds of Surya Namaskara
 */
export const STYLES = ['vinyasa', 'yin', 'ashtanga']
export const MINUTES = [30, 45, 60, 75, 90]
export const LEVELS = ['gentle', 'moderate', 'strong']
const RANK = { gentle: 0, moderate: 1, strong: 2 }

const goalById = new Map(GOALS.map((g) => [g.id, g]))
const cautionById = new Map(CAUTIONS.map((c) => [c.id, c]))
export const getGoal = (id) => goalById.get(id)
export const getCaution = (id) => cautionById.get(id)

const phraseById = new Map(PHRASE_GROUPS.flatMap((g) => g.lines.map((l) => [l.id, { ...l, group: g.id }])))
/** A phrase line by id, with its group; its clip is `phrase__<id>`. */
export const phraseLine = (id) => phraseById.get(id)

const careByTerm = new Map()
for (const L of LESSONS) for (const s of L.slides || []) if (s.care && s.term) careByTerm.set(s.term, { ...s.care, term: s.term })
/** The lesson's "when a student hurts" line for an anatomy term, or null. */
export const careLine = (termId) => careByTerm.get(termId) || null

// ── Reading her request ─────────────────────────────────────────────────
const hasMarks = (s) => /[̀-ͯđĐ]/.test(s.normalize('NFD'))
const tokens = (text) =>
  text
    .normalize('NFC')
    .toLowerCase()
    .split(/[\s,.;:!?()"“”'’/]+/)
    .filter(Boolean)
    .map((w) => ({ w, f: fold(w) }))

const KEYS = [
  ...GOALS.flatMap((g) => g.keywords.map((k) => ({ kind: 'goal', id: g.id, k }))),
  ...CAUTIONS.flatMap((c) => c.keywords.map((k) => ({ kind: 'caution', id: c.id, k }))),
]
  .map((x) => ({ ...x, parts: x.k.normalize('NFC').toLowerCase().split(/\s+/), exact: hasMarks(x.k) }))
  .sort((a, b) => b.parts.length - a.parts.length || b.k.length - a.k.length)

/**
 * Which goals and cautions a request names. Longer keywords are matched
 * first and their words are used up, so "cổ tay" is the wrist and "đau lưng"
 * is a caution rather than the spine theme. Keywords with diacritics must
 * match exactly; the others match the folded words.
 */
export function matchKeywords(text) {
  const toks = tokens(text)
  const used = new Array(toks.length).fill(false)
  const hits = []
  for (const key of KEYS) {
    const parts = key.exact ? key.parts : key.parts.map(fold)
    for (let i = 0; i + parts.length <= toks.length; i++) {
      let ok = true
      for (let j = 0; j < parts.length; j++) {
        const t = toks[i + j]
        if (used[i + j] || (key.exact ? t.w !== parts[j] : t.f !== parts[j])) { ok = false; break }
      }
      if (!ok) continue
      for (let j = 0; j < parts.length; j++) used[i + j] = true
      hits.push({ kind: key.kind, id: key.id, word: toks.slice(i, i + parts.length).map((t) => t.w).join(' ') })
    }
  }
  return hits
}

const uniq = (list) => [...new Set(list)]

/** A spec from her words: style, minutes, level, goals and cautions. Anything not said is null. */
export function parseRequest(text) {
  const raw = String(text || '')
  const f = ` ${fold(raw)} `
  const hits = matchKeywords(raw)
  const goals = uniq(hits.filter((h) => h.kind === 'goal').map((h) => h.id))
  const cautions = uniq(hits.filter((h) => h.kind === 'caution').map((h) => h.id))

  let style = null
  if (/\byin\b/.test(f)) style = 'yin'
  else if (/ashtanga|primary series|mysore|chuoi so cap|so cap/.test(f)) style = 'ashtanga'
  else if (/vinyasa|\bflow\b|hatha|power/.test(f)) style = 'vinyasa'

  let minutes = null
  const m1 = f.match(/(\d{1,3})\s*(?:min\b|mins\b|minutes?\b|phut\b|p\b|')/)
  const h1 = f.match(/(\d)\s*(?:h\b|hr\b|hours?\b|tieng\b|gio\b)/)
  if (m1) minutes = Number(m1[1])
  else if (h1) minutes = Number(h1[1]) * 60 + (/ruoi|half|:30|1h30|\b30\b/.test(f) ? 30 : 0)
  else if (/an hour|one hour|mot tieng|mot gio|1 tieng/.test(f)) minutes = /ruoi|and a half/.test(f) ? 90 : 60
  else if (/nua tieng|half an hour/.test(f)) minutes = 30
  if (minutes) minutes = Math.max(15, Math.min(120, minutes))

  let level = null
  if (/beginner|beginners|\bnew\b|nguoi moi|moi tap|co ban|basic|\beasy\b|gentle|nhe nhang|\bnhe\b/.test(f)) level = 'gentle'
  else if (/advanced|nang cao|\bstrong\b|\bhard\b|\bkho\b|intense|manh me/.test(f)) level = 'strong'
  else if (/intermediate|trung cap|moderate|\bvua\b/.test(f)) level = 'moderate'
  if (!level) for (const g of goals) if (goalById.get(g).level) level = goalById.get(g).level

  return { goals, cautions, style, minutes, level, hits }
}

// ── Poses, scored and screened ──────────────────────────────────────────
const safetyText = (p) => [...(p.safety || []), ...(p.cues || []).filter((c) => c.kind === 'safety')].map((l) => l.en).join(' ')
const allowed = (p, level) => RANK[p.level || 'moderate'] <= RANK[level || 'strong']

function goalScore(p, goals) {
  let s = 0
  for (const g of goals) {
    if (g.families.includes(p.family)) s += 3
    if (g.peak.includes(p.id)) s += 4
    for (const t of p.yin?.target || []) if (g.targets.includes(t)) s += 2
    for (const m of p.muscles?.lengthening || []) if (g.lengthening.includes(m)) s += 2
    for (const m of p.muscles?.working || []) if (g.working.includes(m)) s += 1
  }
  return s
}

/** Named outright as a pose this student should not be given. */
const hardFlagged = (p, c) => c.avoid.includes(p.id) || c.avoidFamilies.includes(p.family)
/** True when a student with this caution should not be given this pose: named, or strong and warned about. */
export function flagged(p, c) {
  if (hardFlagged(p, c)) return true
  return (p.level === 'strong' || p.level === undefined) && c.match.test(safetyText(p))
}

/** The pose's own safety and modification lines that speak to a caution. */
export function cautionNotes(p, cautions) {
  const out = []
  for (const c of cautions) {
    for (const l of [...(p.safety || []), ...(p.cues || []).filter((x) => x.kind === 'safety'), ...(p.modifications || [])]) {
      // A pregnancy line that happens to mention the knee is not a knee note.
      if (c.id !== 'pregnancy' && /pregnan/i.test(l.en)) continue
      if (c.match.test(l.en) && !out.some((x) => x.id === l.id)) { out.push({ id: l.id, en: l.en, vi: l.vi, caution: c.id }); break }
    }
  }
  return out
}

const postureById = new Map(Object.entries(POSTURES).flatMap(([k, ids]) => ids.map((id) => [id, k])))
const FAMILY_POSTURE = { supine: 'supine', prone: 'prone', standing: 'standing', balance: 'standing', 'sun-salutation': 'standing', seated: 'seated', 'hip-opener': 'seated', 'forward-fold': 'seated', twist: 'seated', backbend: 'prone', inversion: 'kneeling', 'arm-balance': 'kneeling', core: 'kneeling', restorative: 'kneeling' }
/** Where a pose is done: standing, kneeling, seated, prone or supine (content/planning.js, then its family). */
export const postureOf = (p) => postureById.get(p.id) || FAMILY_POSTURE[p.family] || 'seated'
/** Down to the floor: how a section is ordered so no one climbs back up. */
const DOWN = { standing: 0, kneeling: 1, seated: 2, prone: 3, supine: 4 }
/** A warm-up: on the floor first, standing last, ready for the sun salutations. */
const UP = { kneeling: 0, seated: 1, prone: 2, supine: 3, standing: 4 }

/** A small seeded random, so "another version" gives a new class and the same seed the same one. */
function rng(seed) {
  let a = (seed >>> 0) || 1
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const sidesOf = (p) => (TWO_SIDED.has(p.id) ? 2 : 1)

/**
 * Seconds a step takes in class, cueing included: a breath is five seconds,
 * getting in and out about half a minute, a vinyasa between the sides of a
 * seated Ashtanga pose a little more. A moment of talk is about ten seconds
 * a line plus any settling it asks for.
 */
export function stepSeconds(step, style) {
  if (step.kind === 'lines') {
    const lines = step.lines.map(phraseLine).filter(Boolean)
    return (step.settle || 0) + lines.reduce((s, l) => s + 4 + Math.max(6, (l.pauseAfter || 2) * (step.scale || 1)), 0)
  }
  if (step.kind === 'sun') return step.a * 60 + step.b * 95
  if (step.kind === 'flow') return step.poses.reduce((s, id) => s + (getPose(id) ? 5 * 5 + 25 : 0), 0) * 2 + 30
  const p = getPose(step.pose)
  if (!p) return 0
  if (step.minutes) return step.minutes * 60 * step.sides + 45
  const breaths = step.breaths || (style === 'ashtanga' ? p.ashtanga?.breaths || 5 : 5)
  return (breaths * 5 + 30 + (style === 'ashtanga' && p.ashtanga?.section === 'seated' ? 25 : 0)) * step.sides
}
export const sectionSeconds = (section, style) => section.steps.reduce((s, st) => s + stepSeconds(st, style), 0)
export const planMinutes = (plan) => Math.round(plan.sections.reduce((s, sec) => s + sectionSeconds(sec, plan.style), 0) / 60)

let counter = 0
const sid = () => `s${Date.now().toString(36)}${(counter++).toString(36)}`

/** A pose step. Notes are the pose's own lines for the cautions in play. */
export function poseStep(p, { cautions = [], style, breaths, minutes } = {}) {
  const step = { kind: 'pose', id: sid(), pose: p.id, sides: sidesOf(p), notes: cautionNotes(p, cautions) }
  if (style === 'yin') step.minutes = minutes || p.yin?.holdMinutes || 3
  else step.breaths = breaths || (style === 'ashtanga' ? p.ashtanga?.breaths || 5 : 5)
  return step
}
const linesStep = (lines, scale, settle) => ({ kind: 'lines', id: sid(), lines: lines.filter((id) => phraseById.has(id)), ...(scale && scale !== 1 ? { scale } : {}), ...(settle ? { settle } : {}) })
const bridge = (key) => linesStep([BRIDGES[key]])

// ── Building a class ────────────────────────────────────────────────────
const WARMERS = ['cat-pose', 'cow-pose', 'child-pose', 'thread-the-needle', 'puppy-pose', 'low-lunge', 'downward-dog', 'side-bend', 'sphinx', 'happy-baby', 'reclined-hand-to-toe', 'bridge-pose', 'supine-twist', 'mountain-pose']
const STANDING_EXTRA = new Set(['revolved-triangle', 'revolved-side-angle', 'wide-legged-fold', 'pyramid-pose', 'standing-forward-fold'])
const FLOOR_FAMILIES = new Set(['hip-opener', 'seated', 'forward-fold', 'backbend', 'supine', 'twist', 'restorative', 'prone'])
const SURYA_A = ['mountain-pose', 'upward-salute', 'standing-forward-fold', 'half-lift', 'chaturanga', 'upward-dog', 'downward-dog']
const SURYA_B = ['chair-pose', 'warrior-1']

/**
 * Build a plan. `spec`: { mode, style, minutes, level, goals, cautions, seed, request }.
 * Missing fields take sensible defaults; `goals` and `cautions` are ids.
 */
export function buildPlan(spec = {}) {
  const mode = spec.mode === 'student' ? 'student' : 'class'
  const style = STYLES.includes(spec.style) ? spec.style : 'vinyasa'
  const goals = uniq(spec.goals || []).map((id) => goalById.get(id)).filter(Boolean)
  const cautions = uniq(spec.cautions || []).map((id) => cautionById.get(id)).filter(Boolean)
  const seed = spec.seed ?? Math.floor(Math.random() * 1e9)
  const level = LEVELS.includes(spec.level) ? spec.level : mode === 'student' ? 'gentle' : goals.find((g) => g.level)?.level || 'moderate'
  const minutes = spec.minutes || (mode === 'student' ? 15 : 60)
  const base = { id: spec.id || `plan:${Date.now()}`, at: Date.now(), mode, style, minutes, level, goals: goals.map((g) => g.id), cautions: cautions.map((c) => c.id), request: spec.request || '', seed, ai: null }
  const ctx = { goals, cautions, level, style, rnd: rng(seed), used: new Set() }

  if (mode === 'student') return finish({ ...base, ...buildStudent(ctx, minutes) }, ctx)
  const built = style === 'yin' ? buildYin(ctx, minutes) : style === 'ashtanga' ? buildAshtanga(ctx, minutes) : buildVinyasa(ctx, minutes)
  return finish({ ...base, ...built }, ctx)
}

function finish(plan, ctx) {
  plan.sections = plan.sections.filter((s) => s.steps.length)
  plan.title = plan.title || titleFor(plan, ctx)
  return plan
}

function titleFor(plan, { goals, cautions }) {
  const styleName = { vinyasa: 'Vinyasa', yin: 'Yin', ashtanga: 'Ashtanga' }[plan.style]
  if (plan.mode === 'student') {
    const what = [...goals.map((g) => g.label), ...cautions.map((c) => c.label)]
    return { en: `For a student: ${what.map((l) => l.en.toLowerCase()).join(', ') || 'a gentle practice'}`, vi: `Cho học viên: ${what.map((l) => l.vi.toLowerCase()).join(', ') || 'bài tập nhẹ'}` }
  }
  const theme = goals.slice(0, 2).map((g) => g.label)
  return {
    en: `${theme.length ? `${theme.map((l) => l.en).join(', ')} · ` : ''}${styleName} · ${plan.minutes} min`,
    vi: `${theme.length ? `${theme.map((l) => l.vi).join(', ')} · ` : ''}${styleName} · ${plan.minutes} phút`,
  }
}

/** The poses of one style that this student may do, scored for the goals. */
function pool(ctx, filter = () => true) {
  const list = POSES.filter((p) => {
    if (ctx.style === 'yin' ? !p.yin : !p.styles.includes(ctx.style)) return false
    if (p.id === 'savasana') return false
    if (!allowed(p, ctx.level)) return false
    if (ctx.cautions.some((c) => flagged(p, c))) return false
    return filter(p)
  })
  return list
    .map((p) => ({ p, score: goalScore(p, ctx.goals) + ctx.rnd() * 0.9 }))
    .sort((a, b) => b.score - a.score)
}

/** Take poses from a scored list while `budget` seconds last: at least `min`, at most `max`. */
function take(ctx, scored, budget, min, mk, max = 6) {
  const steps = []
  let left = budget
  for (const { p } of scored) {
    if (steps.length >= max) break
    if (ctx.used.has(p.id)) continue
    const step = mk(p)
    const secs = stepSeconds(step, ctx.style)
    if (steps.length >= min && secs > left) continue
    if (steps.length >= min && left <= 0) break
    steps.push(step)
    ctx.used.add(p.id)
    left -= secs
  }
  return steps
}

/** Order steps by posture (down to the floor, or up to standing for a warm-up); a transition edge keeps neighbours together. */
function arrange(steps, order = DOWN) {
  const byPosture = [...steps].sort((a, b) => order[postureOf(getPose(a.pose))] - order[postureOf(getPose(b.pose))])
  const out = []
  const rest = byPosture.slice()
  while (rest.length) {
    const last = out[out.length - 1]
    const next = (last && rest.find((s) => (getPose(last.pose).transitionsTo || []).includes(s.pose) && postureOf(getPose(s.pose)) === postureOf(getPose(last.pose)))) || rest[0]
    rest.splice(rest.indexOf(next), 1)
    out.push(next)
  }
  return out
}

/** Steps with the floor bridges in between: "lower onto your belly", "roll onto your back". */
function withFloorBridges(steps) {
  const out = []
  let posture = null
  for (const s of steps) {
    const now = postureOf(getPose(s.pose))
    if (posture && now !== posture) {
      if (now === 'prone') out.push(bridge('toBelly'))
      else if (now === 'supine') out.push(bridge('toBack'))
      else if (now === 'kneeling' && posture === 'standing') out.push(bridge('toAllFours'))
    }
    out.push(s)
    posture = now
  }
  return out
}

function buildVinyasa(ctx, T) {
  const { goals, level } = ctx
  const breathy = goals.some((g) => g.pranayama)
  const meditate = goals.some((g) => g.meditation)
  const arriveLines = [...MOMENTS.arrive, ...(goals[0]?.welcome ? [goals[0].welcome] : []), ...(breathy ? MOMENTS.pranayama : [])]
  const sav = Math.max(4, Math.min(9, Math.round(T * 0.12)))
  const R = Math.max(10, T - 3 - sav - 1.5 - (meditate ? 6 : 0)) * 60
  const sections = []
  sections.push({ key: 'arrive', steps: [linesStep(arriveLines, 1, 90)] })

  // Warm-up: cat and cow, then a few gentle shapes that already serve the theme, ending on the feet.
  const warmBudget = R * 0.15
  const warmers = pool(ctx, (p) => WARMERS.includes(p.id)).map((x) => ({ ...x, score: x.score + (x.p.id === 'cat-pose' || x.p.id === 'cow-pose' ? 10 : 0) })).sort((a, b) => b.score - a.score)
  const warm = take(ctx, warmers, warmBudget, 2, (p) => poseStep(p, { ...ctx, breaths: 4 }), 5)
  sections.push({ key: 'warm', steps: [bridge('toAllFours'), ...arrange(warm, UP)] })

  // Sun salutations: rounds by time and level; B joins once there are three rounds and the level allows it.
  const cap = { gentle: 2, moderate: 4, strong: 5 }[level]
  const rounds = Math.max(1, Math.min(cap, Math.round((R * 0.15) / 70) + (goals.some((g) => g.sunRounds) ? 1 : 0)))
  const b = level === 'gentle' || rounds < 3 ? 0 : Math.floor(rounds / 2)
  const sunOk = !ctx.cautions.some((c) => SURYA_A.some((id) => hardFlagged(getPose(id), c)))
  if (sunOk) {
    for (const id of [...SURYA_A, ...(b ? SURYA_B : [])]) ctx.used.add(id)
    sections.push({ key: 'sun', steps: [bridge('toStanding'), { kind: 'sun', id: sid(), a: rounds - b, b }] })
  }

  // Standing: flows of standing poses done right then left, then the balances and the one-sided poses.
  const standBudget = R * 0.3
  const standing = pool(ctx, (p) => (p.family === 'standing' || p.family === 'balance' || STANDING_EXTRA.has(p.id)) && !SURYA_A.includes(p.id))
  const standSteps = take(ctx, standing, standBudget, 2, (p) => poseStep(p, ctx), 8)
  const flowable = standSteps.filter((s) => s.sides === 2 && getPose(s.pose).family !== 'balance')
  const rest = standSteps.filter((s) => !flowable.includes(s))
  const flows = []
  for (let i = 0; i < flowable.length; i += 3) flows.push({ kind: 'flow', id: sid(), poses: chain(flowable.slice(i, i + 3).map((s) => s.pose)), sides: 2, notes: flowable.slice(i, i + 3).flatMap((s) => s.notes) })
  const standOut = []
  if (!sunOk) standOut.push(bridge('toStanding'))
  flows.forEach((f, i) => { standOut.push(f); if (i < flows.length - 1 || rest.length) standOut.push(bridge(level === 'gentle' ? 'vinyasaOrRest' : 'vinyasa')) })
  standOut.push(...arrange(rest))
  sections.push({ key: 'standing', steps: standOut })

  // The heart of the class: the poses that score highest for the theme.
  const peakBudget = R * 0.2
  const peakPool = pool(ctx, (p) => !['restorative', 'supine', 'sun-salutation'].includes(p.family))
  const peak = take(ctx, peakPool.filter((x) => x.score >= 2), peakBudget, 1, (p) => poseStep(p, { ...ctx, breaths: 6 }), 5)
  const peakSteps = withFloorBridges(arrange(peak))
  sections.push({ key: 'peak', steps: peakSteps })

  // The floor: what the theme still asks for, the counterposes, and a twist to finish; winding down, not up.
  const floorBudget = R * 0.2
  const counters = uniq(peak.flatMap((s) => [...(getPose(s.pose).counterPoses || []), getPose(s.pose).yin?.counter].filter(Boolean)))
  const bending = goals.some((g) => g.families.includes('backbend'))
  const floorPool = pool(ctx, (p) => FLOOR_FAMILIES.has(p.family) && p.family !== 'prone' && p.level !== 'strong' && postureOf(p) !== 'standing')
    .map((x) => ({ ...x, score: x.score + (counters.includes(x.p.id) ? 3 : 0) + (x.p.id === 'supine-twist' || x.p.id === 'happy-baby' ? 2 : 0) + ({ supine: 2, restorative: 2, seated: 1 }[x.p.family] || 0) - (x.p.family === 'backbend' && !bending ? 2 : 0) }))
  floorPool.sort((a, b) => b.score - a.score)
  const floor = take(ctx, floorPool, floorBudget, 2, (p) => poseStep(p, { ...ctx, breaths: 8 }), 5)
  sections.push({ key: 'floor', steps: withFloorBridges(arrange(floor)) })

  if (meditate) sections.push({ key: 'meditation', steps: [scriptStep('meditation', 6)] })
  sections.push({ key: 'rest', steps: [scriptStep('savasana', sav)] })
  sections.push({ key: 'close', steps: [linesStep(MOMENTS.close)] })
  return { sections }
}

/** Order a few poses so each one is in the previous one's `transitionsTo` where possible. */
function chain(ids) {
  const rest = ids.slice()
  const out = [rest.shift()]
  while (rest.length) {
    const last = getPose(out[out.length - 1])
    const next = rest.find((id) => (last.transitionsTo || []).includes(id)) || rest[0]
    rest.splice(rest.indexOf(next), 1)
    out.push(next)
  }
  return out
}

/** A phrase script (savasana, the sit) stretched or squeezed to `minutes`. */
function scriptStep(groupId, minutes) {
  const g = PHRASE_GROUPS.find((x) => x.id === groupId)
  if (!g) return linesStep([])
  const natural = g.lines.reduce((s, l) => s + 4 + (l.pauseAfter || 2), 0) / 60
  return linesStep(g.lines.map((l) => l.id), Math.round((minutes / natural) * 100) / 100)
}

function buildYin(ctx, T) {
  const { goals } = ctx
  const sav = Math.max(5, Math.min(10, Math.round(T * 0.12)))
  const meditate = goals.some((g) => g.meditation)
  const R = Math.max(10, T - 3 - sav - 1.5 - (meditate ? 6 : 0)) * 60
  const sections = [{ key: 'arrive', steps: [linesStep([...MOMENTS.arriveYin, ...(goals[0]?.welcome ? [goals[0].welcome] : [])], 1, 90)] }]
  // Long holds, each followed by its rebound; the counterpose when the hold asks for one.
  const holds = take(ctx, pool(ctx), R, 2, (p) => poseStep(p, ctx), 12)
  const steps = []
  for (const s of arrange(holds)) {
    steps.push(s)
    const p = getPose(s.pose)
    const counter = p.yin?.counter || p.counterPoses?.[0]
    if (counter && counter !== 'savasana' && getPose(counter) && p.family === 'backbend') {
      s.counter = counter
    }
  }
  sections.push({ key: 'holds', steps: withFloorBridges(steps) })
  if (meditate) sections.push({ key: 'meditation', steps: [scriptStep('meditation', 6)] })
  sections.push({ key: 'rest', steps: [scriptStep('savasana', sav)] })
  sections.push({ key: 'close', steps: [linesStep(MOMENTS.close)] })
  return { sections }
}

function buildAshtanga(ctx, T) {
  const series = POSES.filter((p) => p.ashtanga).sort((a, b) => a.ashtanga.position - b.ashtanga.position)
  const ok = (p) => !ctx.cautions.some((c) => flagged(p, c))
  const sav = Math.max(4, Math.min(8, Math.round(T * 0.1)))
  const sections = [{ key: 'arrive', steps: [linesStep(MOMENTS.arriveAshtanga, 1, 60)] }]
  // Fixed costs first, then as much of the seated sequence as the time allows.
  const long = T >= 75
  const a = T >= 60 ? 5 : 3
  const b = T >= 60 ? 5 : T >= 45 ? 3 : 2
  sections.push({ key: 'sun', steps: [{ kind: 'sun', id: sid(), a, b }] })
  const standing = series.filter((p) => p.ashtanga.section === 'standing' && ok(p)).map((p) => poseStep(p, ctx))
  sections.push({ key: 'standing', steps: standing })
  const finishingIds = long ? series.filter((p) => p.ashtanga.section === 'finishing').map((p) => p.id) : ['shoulderstand', 'plow-pose', 'fish-pose', 'lotus']
  const finishing = finishingIds.map(getPose).filter((p) => p && ok(p) && p.id !== 'savasana' && (ctx.level === 'strong' || !['wheel-pose', 'headstand'].includes(p.id))).map((p) => poseStep(p, ctx))
  const fixed = 3 * 60 + a * 60 + b * 95 + standing.reduce((s, st) => s + stepSeconds(st, 'ashtanga'), 0) + finishing.reduce((s, st) => s + stepSeconds(st, 'ashtanga'), 0) + sav * 60 + 90
  let left = T * 60 - fixed
  const seated = []
  for (const p of series.filter((x) => x.ashtanga.section === 'seated' && ok(x))) {
    const step = poseStep(p, ctx)
    const secs = stepSeconds(step, 'ashtanga')
    if (secs > left) break
    seated.push(step)
    left -= secs
  }
  sections.push({ key: 'seated', steps: seated })
  sections.push({ key: 'finishing', steps: finishing })
  sections.push({ key: 'rest', steps: [scriptStep('savasana', sav)] })
  sections.push({ key: 'close', steps: [linesStep(MOMENTS.closeAshtanga)] })
  for (const s of [...standing, ...seated, ...finishing]) ctx.used.add(s.pose)
  return { sections }
}

/**
 * For a student who said something: what to say to them now, a short gentle
 * practice for what they asked about, and the poses in class to watch with
 * them. Goals are what they want to open; cautions are what hurts.
 */
function buildStudent(ctx, T) {
  const { goals, cautions } = ctx
  const say = uniq([
    ...MOMENTS.student.slice(0, 2),
    ...cautions.flatMap((c) => c.lines),
    ...(cautions.length ? [] : ['props-8']),
  ])
  const care = uniq([...cautions.flatMap((c) => c.terms), ...goals.flatMap((g) => [...g.lengthening, ...g.working])]).map(careLine).filter(Boolean).slice(0, 4)
  const sections = [{ key: 'say', steps: [linesStep(say)] }]
  // A short practice: gentle first, moderate allowed, the caution's own poses ahead.
  const prefer = uniq(cautions.flatMap((c) => c.prefer))
  const scored = pool({ ...ctx, level: 'moderate' }, (p) => p.level !== 'strong').map((x) => ({ ...x, score: x.score + (prefer.includes(x.p.id) ? 3 : 0) + (x.p.level === 'gentle' ? 2 : 0) })).sort((a, b) => b.score - a.score)
  const steps = take(ctx, scored.filter((x) => x.score >= 2), T * 60, 4, (p) => poseStep(p, { ...ctx, breaths: 8 }), 7)
  sections.push({ key: 'practice', steps: withFloorBridges(arrange(steps)) })
  // In class: the poses this student should take care in, each with the line to say. Everyday poses first.
  const careful = []
  const everyday = [...POSES].sort((a, b) => (b.styles.includes('vinyasa') - a.styles.includes('vinyasa')) || RANK[a.level] - RANK[b.level])
  for (const c of cautions) {
    for (const p of everyday) {
      if (p.id === 'savasana' || p.level === 'strong' || careful.length >= 8 || careful.some((x) => x.pose === p.id)) continue
      const notes = cautionNotes(p, [c])
      if (notes.length) careful.push({ pose: p.id, line: notes[0] })
    }
  }
  return { sections, care, careful }
}

// ── Editing a plan ──────────────────────────────────────────────────────
const used = (plan) => new Set(plan.sections.flatMap((s) => s.steps.flatMap((st) => (st.kind === 'pose' ? [st.pose] : st.kind === 'flow' ? st.poses : []))))

/** Up to `n` poses that could stand in for a step: same family first, then the theme's next best. */
export function alternatives(plan, step, n = 4) {
  const p = getPose(step.pose)
  if (!p) return []
  const ctx = ctxOf(plan)
  const have = used(plan)
  const list = pool(ctx, (x) => !have.has(x.id) && x.id !== p.id)
  const same = list.filter((x) => x.p.family === p.family || (x.p.yin?.target || []).some((t) => (p.yin?.target || []).includes(t)))
  const rest = list.filter((x) => !same.includes(x))
  return [...same, ...rest].slice(0, n).map((x) => x.p)
}

/** Poses she can add anywhere: the whole style, screened for the cautions, best for the theme first. */
export function addable(plan) {
  const ctx = { ...ctxOf(plan), level: 'strong' }
  const have = used(plan)
  return pool(ctx, (x) => !have.has(x.id)).map((x) => x.p)
}

function ctxOf(plan) {
  return {
    goals: plan.goals.map((id) => goalById.get(id)).filter(Boolean),
    cautions: plan.cautions.map((id) => cautionById.get(id)).filter(Boolean),
    level: plan.level, style: plan.style, rnd: rng(plan.seed + 1), used: used(plan),
  }
}

/** A fresh pose step for this plan (its cautions applied). */
export function stepFor(plan, poseId) {
  const p = getPose(poseId)
  return p ? poseStep(p, ctxOf(plan)) : null
}

/** Cycle a hold: breaths 3, 5, 8, 10; Yin minutes 2, 3, 4, 5. */
export function nextHold(step) {
  if (step.minutes) { const m = [2, 3, 4, 5]; return { ...step, minutes: m[(m.indexOf(step.minutes) + 1) % m.length] || 3 } }
  const b = [3, 5, 8, 10]
  return { ...step, breaths: b[(b.indexOf(step.breaths) + 1) % b.length] || 5 }
}

// ── Gemini's tailoring, applied ─────────────────────────────────────────
/** The compact view of a plan that api/plan.js is given. */
export function planForAI(plan) {
  return {
    mode: plan.mode, style: plan.style, minutes: plan.minutes, level: plan.level, goals: plan.goals, cautions: plan.cautions,
    sections: plan.sections.map((s) => ({ key: s.key, poses: s.steps.flatMap((st) => (st.kind === 'pose' ? [st.pose] : st.kind === 'flow' ? st.poses : st.kind === 'sun' ? ['sun-salutations'] : [])) })),
  }
}
export const catalogForAI = () => POSES.map((p) => ({ id: p.id, en: p.en, family: p.family, level: p.level, styles: p.styles }))
export const goalsForAI = () => ({ goals: GOALS.map((g) => ({ id: g.id, en: g.label.en })), cautions: CAUTIONS.map((c) => ({ id: c.id, en: c.label.en })) })

/**
 * Fold Gemini's answer into the plan: title and theme, swaps (only ids the
 * catalog has, only poses the plan has), a cue per pose, and what to say to
 * the student. Returns a new plan; the old one is untouched.
 */
export function applyAI(plan, out) {
  const next = { ...plan, sections: plan.sections.map((s) => ({ ...s, steps: s.steps.map((st) => ({ ...st })) })) }
  const have = used(plan)
  const swaps = []
  for (const sw of out.swaps || []) {
    const from = getPose(sw.out), to = getPose(sw.in)
    if (!from || !to || !have.has(from.id) || have.has(to.id)) continue
    if (plan.cautions.some((id) => flagged(to, cautionById.get(id)))) continue
    for (const s of next.sections) {
      s.steps = s.steps.map((st) => {
        if (st.kind === 'pose' && st.pose === from.id) return { ...stepFor(next, to.id), id: st.id, breaths: st.breaths, minutes: st.minutes && (to.yin?.holdMinutes || st.minutes), swapped: { from: from.id, why_vi: sw.why_vi || '' } }
        if (st.kind === 'flow' && st.poses.includes(from.id)) return { ...st, poses: st.poses.map((id) => (id === from.id ? to.id : id)), swapped: { from: from.id, why_vi: sw.why_vi || '' } }
        return st
      })
    }
    have.delete(from.id); have.add(to.id)
    swaps.push({ from: from.id, to: to.id, why_vi: sw.why_vi || '' })
  }
  const cues = (out.cues || []).filter((c) => c.en && getPose(c.pose) && have.has(c.pose)).slice(0, 6).map((c) => ({ pose: c.pose, en: String(c.en).trim(), vi: String(c.vi || '').trim() }))
  for (const s of next.sections) for (const st of s.steps) {
    const mine = cues.filter((c) => (st.kind === 'pose' && c.pose === st.pose) || (st.kind === 'flow' && st.poses.includes(c.pose)))
    if (mine.length) st.cues = mine
  }
  const bi = (o) => (o && o.en ? { en: String(o.en).trim(), vi: String(o.vi || '').trim() } : null)
  next.ai = {
    at: Date.now(),
    title: bi(out.title), theme: bi(out.theme), toStudent: bi(out.toStudent),
    watch: (out.watch || []).map(bi).filter(Boolean).slice(0, 3),
    swaps, cues, note_vi: String(out.note_vi || '').trim(),
  }
  if (next.ai.title) next.title = next.ai.title
  return next
}

// ── The script ──────────────────────────────────────────────────────────
/**
 * The plan as the voice would read it: one item per spoken line, with the
 * silence that follows it, in order. An item is { clip?, text?, en, vi,
 * pauseAfter, head: { en, vi }, step, kind }. `clip` is a generated clip id;
 * `text` is an AI-written line the live voice speaks. Pose steps take the
 * cues a teacher would say on the first side, fewer on the second.
 */
export function scriptOf(plan) {
  const items = []
  const push = (it) => items.push({ pauseAfter: 2, ...it })
  const say = (step, l, head, pauseAfter = 2) => push({ clip: l.id, en: l.en, vi: l.vi, head, step: step.id, pauseAfter })
  const sideWord = (i) => (i === 0 ? { en: 'Right side', vi: 'Bên phải' } : { en: 'Left side', vi: 'Bên trái' })

  const poseLines = (step, p, side, hold) => {
    const head = { en: p.en, vi: p.vi, sa: p.sa }
    const cues = p.cues || []
    const first = side === 0
    if (first) push({ clip: `${p.id}__en`, en: p.en, vi: p.vi, head, step: step.id, kind: 'name', pauseAfter: 1.5 })
    else { const o = phraseLine(BRIDGES.otherSide); if (o) say(step, { id: `phrase__${o.id}`, en: o.en, vi: o.vi }, head, 2) }
    const kinds = (k) => cues.filter((c) => c.kind === k)
    const lastT = kinds('transition').slice(-1)[0]
    const ins = kinds('transition').filter((c) => c !== lastT || kinds('transition').length === 1)
    const align = kinds('alignment')
    const chosen = first
      ? [...ins.slice(0, 2), ...align.slice(0, 3), ...kinds('soften').slice(0, 1)]
      : [...ins.slice(0, 1), ...align.slice(0, 1)]
    for (const c of chosen) say(step, c, head, 2.5)
    for (const c of (step.cues || []).filter((x) => x.pose === p.id)) if (first) push({ text: c.en, en: c.en, vi: c.vi, head, step: step.id, kind: 'ai', pauseAfter: 2.5 })
    const breath = kinds('breath')[0]
    if (breath) say(step, breath, head, hold)
    else push({ clip: `${p.id}__en`, en: p.en, vi: p.vi, head, step: step.id, kind: 'hold', pauseAfter: hold })
    if (first) for (const n of step.notes || []) say(step, n, head, 2.5)
    if (first && kinds('safety')[0] && !(step.notes || []).length && plan.style === 'yin') say(step, kinds('safety')[0], head, 2)
    if (lastT && kinds('transition').length > 1 && (!first || step.sides === 1)) say(step, lastT, head, 2)
  }

  for (const sec of plan.sections) {
    for (const step of sec.steps) {
      if (step.kind === 'lines') {
        for (const id of step.lines) {
          const l = phraseLine(id)
          if (l) push({ clip: `phrase__${l.id}`, en: l.en, vi: l.vi, head: null, step: step.id, pauseAfter: Math.round((l.pauseAfter || 2) * (step.scale || 1)) })
        }
      } else if (step.kind === 'sun') {
        const round = (ids, label, i) => {
          for (const id of ids) {
            const p = getPose(id)
            if (!p) continue
            const t = (p.cues || []).find((c) => c.kind === 'transition')
            push({ clip: `${p.id}__en`, en: p.en, vi: p.vi, head: { en: `${label} · round ${i + 1}`, vi: `${label} · vòng ${i + 1}` }, step: step.id, kind: 'name', pauseAfter: 0.6 })
            if (t) push({ clip: t.id, en: t.en, vi: t.vi, head: { en: `${label} · round ${i + 1}`, vi: `${label} · vòng ${i + 1}` }, step: step.id, pauseAfter: p.id === 'downward-dog' ? 20 : 1.5 })
          }
        }
        for (let i = 0; i < step.a; i++) round(SURYA_A, 'Sun Salutation A', i)
        for (let i = 0; i < step.b; i++) round([...SURYA_A.slice(0, 1), 'chair-pose', ...SURYA_A.slice(2), 'warrior-1', ...SURYA_A.slice(4)], 'Sun Salutation B', i)
      } else if (step.kind === 'flow') {
        for (let side = 0; side < 2; side++) {
          if (side === 1) { const o = phraseLine(BRIDGES.otherSide); if (o) push({ clip: `phrase__${o.id}`, en: o.en, vi: o.vi, head: sideWord(1), step: step.id, pauseAfter: 2 }) }
          step.poses.forEach((id, i) => {
            const p = getPose(id)
            if (!p) return
            const head = { en: p.en, vi: p.vi, sa: p.sa, side: sideWord(side) }
            const cues = p.cues || []
            const t = cues.find((c) => c.kind === 'transition')
            push({ clip: `${p.id}__en`, en: p.en, vi: p.vi, head, step: step.id, kind: 'name', pauseAfter: 1 })
            if (t && (side === 0 || i === 0)) push({ clip: t.id, en: t.en, vi: t.vi, head, step: step.id, pauseAfter: 2 })
            const align = cues.filter((c) => c.kind === 'alignment').slice(0, side === 0 ? 2 : 1)
            for (const c of align) push({ clip: c.id, en: c.en, vi: c.vi, head, step: step.id, pauseAfter: 2.5 })
            for (const c of (step.cues || []).filter((x) => x.pose === p.id)) if (side === 0) push({ text: c.en, en: c.en, vi: c.vi, head, step: step.id, kind: 'ai', pauseAfter: 2.5 })
            const breath = cues.find((c) => c.kind === 'breath')
            if (breath) push({ clip: breath.id, en: breath.en, vi: breath.vi, head, step: step.id, pauseAfter: 5 * 4 })
            else push({ clip: `${p.id}__en`, en: p.en, vi: p.vi, head, step: step.id, kind: 'hold', pauseAfter: 5 * 4 })
          })
          if (side === 0) for (const n of step.notes || []) push({ clip: n.id, en: n.en, vi: n.vi, head: null, step: step.id, pauseAfter: 2 })
        }
      } else if (step.kind === 'pose') {
        const p = getPose(step.pose)
        if (!p) continue
        const hold = step.minutes ? step.minutes * 60 : (step.breaths || 5) * 4.5
        for (let side = 0; side < step.sides; side++) poseLines(step, p, side, hold)
        if (plan.style === 'yin') {
          const out = phraseLine('yin-6')
          if (out) push({ clip: `phrase__${out.id}`, en: out.en, vi: out.vi, head: { en: p.en, vi: p.vi }, step: step.id, pauseAfter: 45 })
          if (step.counter && getPose(step.counter)) {
            const c = getPose(step.counter)
            push({ clip: `${c.id}__en`, en: c.en, vi: c.vi, head: { en: c.en, vi: c.vi }, step: step.id, kind: 'name', pauseAfter: 60 })
          }
        }
      }
    }
  }
  return items
}

/** Every generated clip the script plays, for keeping a class offline. */
export const planClipIds = (plan) => uniq(scriptOf(plan).map((it) => it.clip).filter(Boolean))

/** The plan as plain text, to share or print: English with the Vietnamese under it. */
export function planText(plan, titles = {}) {
  const lines = [`${plan.title.en} / ${plan.title.vi}`]
  if (plan.ai?.theme) lines.push('', plan.ai.theme.en, plan.ai.theme.vi)
  for (const sec of plan.sections) {
    const t = titles[sec.key]
    lines.push('', `## ${t ? `${t.en} / ${t.vi}` : sec.key}`)
    for (const st of sec.steps) {
      if (st.kind === 'lines') for (const id of st.lines) { const l = phraseLine(id); if (l) lines.push(`  “${l.en}”`, `    ${l.vi}`) }
      else if (st.kind === 'sun') lines.push(`- Sun Salutation A × ${st.a}${st.b ? `, B × ${st.b}` : ''}`)
      else if (st.kind === 'flow') lines.push(`- Flow, right then left: ${st.poses.map((id) => getPose(id)?.en).filter(Boolean).join(' → ')}`)
      else {
        const p = getPose(st.pose)
        if (!p) continue
        const hold = st.minutes ? `${st.minutes} min` : `${st.breaths} breaths`
        lines.push(`- ${p.en} (${p.vi}${p.sa ? `, ${p.sa}` : ''}) · ${hold}${st.sides === 2 ? ' each side' : ''}`)
        for (const c of st.cues || []) lines.push(`    ★ ${c.en}`, `      ${c.vi}`)
        for (const n of st.notes || []) lines.push(`    ! ${n.en}`, `      ${n.vi}`)
      }
    }
  }
  if (plan.ai?.toStudent) lines.push('', `To the student: ${plan.ai.toStudent.en}`, plan.ai.toStudent.vi)
  return lines.join('\n')
}

/** Goals and cautions for the chips, in catalog order. */
export { GOALS, CAUTIONS }
export const termName = (id) => getTerm(id)?.en || id
export const lessonCareLines = () => LESSONS.flatMap(lessonLines)
