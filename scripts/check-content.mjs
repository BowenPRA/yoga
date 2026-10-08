/**
 * Content checks, so a content file cannot break the app quietly.
 *   node scripts/check-content.mjs            every check
 *   node scripts/check-content.mjs --strict   warnings count as errors
 *
 * Checks: unique ids; clip ids follow `<pose>__cue-N` / `__mod-N` / `__safe-N`
 * in order; every muscle, joint and lesson term exists in the anatomy
 * content; required fields and both languages are present; the Vietnamese
 * never addresses anyone as em / cậu / chị / anh; every clip a lesson plays
 * is produced by some content; lesson figure windows and label pins are sane.
 */
import { POSES, TERMS, PHRASE_GROUPS, LESSONS, getTerm, allClips, lessonClipIds } from '../src/lib/content.js'
import { MUSCLE_REGIONS, SKELETON_LANDMARKS } from '../content/anatomy/regions.js'

const strict = process.argv.includes('--strict')
const errors = []
const warnings = []
const err = (m) => errors.push(m)
const warn = (m) => warnings.push(m)

const STYLES = new Set(['vinyasa', 'ashtanga', 'yin'])
const FAMILIES = new Set(['sun-salutation', 'standing', 'balance', 'forward-fold', 'backbend', 'twist', 'hip-opener', 'inversion', 'arm-balance', 'seated', 'supine', 'prone', 'core', 'restorative'])
const KINDS = new Set(['transition', 'alignment', 'soften', 'breath', 'safety'])
const SECTIONS = new Set(['surya-a', 'surya-b', 'standing', 'seated', 'finishing'])
// "tiếng Anh" (English) and "Em bé" (Child's Pose) are not forms of address.
const REGISTER = /(^|[\s,.;:!?"“(])(em|cậu|chị|anh)([\s,.;:!?"”)]|$)/iu
const familiar = (text) => REGISTER.test(text.replace(/tiếng Anh/giu, '').replace(/em bé/giu, ''))

const termIds = new Set(TERMS.map((t) => t.id))
const poseIds = new Set()

function checkVi(where, text) {
  if (typeof text !== 'string' || !text.trim()) { err(`${where}: Vietnamese missing`); return }
  if (familiar(text)) warn(`${where}: Vietnamese uses a familiar address (em/cậu/chị/anh): "${text}"`)
}
function checkEn(where, text) {
  if (typeof text !== 'string' || !text.trim()) err(`${where}: English missing`)
}
function checkBi(where, obj) {
  if (!obj) { err(`${where}: missing`); return }
  checkEn(`${where}.en`, obj.en)
  checkVi(`${where}.vi`, obj.vi)
}

// ── poses ────────────────────────────────────────────────────────────────
for (const p of POSES) {
  const w = `pose ${p.id}`
  if (!p.id || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id)) err(`${w}: bad id`)
  if (poseIds.has(p.id)) err(`${w}: duplicate id`)
  poseIds.add(p.id)
  if (!Array.isArray(p.styles) || !p.styles.length || !p.styles.every((s) => STYLES.has(s))) err(`${w}: styles must be a non-empty list of vinyasa|ashtanga|yin`)
  if (!FAMILIES.has(p.family)) err(`${w}: family "${p.family}" is not one of ${[...FAMILIES].join(', ')}`)
  checkEn(`${w}.en`, p.en)
  checkVi(`${w}.vi`, p.vi)
  if (p.sa && !p.say) warn(`${w}: has Sanskrit but no \`say\` respelling`)
  if (p.styles.includes('ashtanga') && !p.ashtanga) warn(`${w}: ashtanga style without an \`ashtanga\` block`)
  if (p.ashtanga) {
    if (!SECTIONS.has(p.ashtanga.section)) err(`${w}: ashtanga.section "${p.ashtanga.section}"`)
    if (typeof p.ashtanga.position !== 'number') err(`${w}: ashtanga.position missing`)
    checkBi(`${w}.ashtanga.note`, p.ashtanga.note)
  }
  if (p.styles.includes('yin') && !p.yin) warn(`${w}: yin style without a \`yin\` block`)
  if (p.yin) {
    if (typeof p.yin.holdMinutes !== 'number') err(`${w}: yin.holdMinutes missing`)
    if (!Array.isArray(p.yin.target) || !p.yin.target.length) err(`${w}: yin.target missing`)
    checkBi(`${w}.yin.note`, p.yin.note)
  }
  checkBi(`${w}.breath`, p.breath)
  const lines = [['cues', 'cue', 5, 10], ['modifications', 'mod', 1, 4], ['safety', 'safe', 1, 4]]
  for (const [field, tag, min, max] of lines) {
    const list = p[field]
    if (!Array.isArray(list)) { err(`${w}: ${field} missing`); continue }
    if (list.length < min || list.length > max) warn(`${w}: ${list.length} ${field} (expected ${min} to ${max})`)
    list.forEach((l, i) => {
      const want = `${p.id}__${tag}-${i + 1}`
      if (l.id !== want) err(`${w}: ${field}[${i}].id is "${l.id}", expected "${want}"`)
      checkEn(`${w}.${l.id}.en`, l.en)
      checkVi(`${w}.${l.id}.vi`, l.vi)
      if (field === 'cues' && l.kind && !KINDS.has(l.kind)) err(`${w}: ${l.id} kind "${l.kind}"`)
      if (field === 'modifications' && !Array.isArray(l.props)) err(`${w}: ${l.id} needs a props list (may be empty)`)
    })
  }
  if (!p.muscles) err(`${w}: muscles missing`)
  for (const side of ['working', 'lengthening']) {
    for (const id of p.muscles?.[side] || []) if (!termIds.has(id)) err(`${w}: muscles.${side} names "${id}", which is not in content/anatomy`)
  }
  for (const id of p.joints || []) if (!termIds.has(id)) err(`${w}: joints names "${id}", which is not in content/anatomy`)
  if (p.muscles && !(p.muscles.working?.length || p.muscles.lengthening?.length)) warn(`${w}: no muscles listed at all`)
}
for (const p of POSES) {
  for (const id of [...(p.transitionsTo || []), ...(p.counterPoses || []), ...(p.yin?.counter ? [p.yin.counter] : [])]) {
    if (!poseIds.has(id)) warn(`pose ${p.id}: refers to pose "${id}", which has no content yet`)
  }
}
// Ashtanga order: positions unique within the series.
const positions = new Map()
for (const p of POSES.filter((x) => x.ashtanga)) {
  const k = `${p.ashtanga.series}:${p.ashtanga.position}`
  if (positions.has(k)) err(`pose ${p.id}: ashtanga position ${p.ashtanga.position} is also used by ${positions.get(k)}`)
  positions.set(k, p.id)
}

// ── anatomy references to poses ─────────────────────────────────────────
const unresolved = new Map()
for (const t of TERMS) {
  for (const id of [...(t.works || []), ...(t.stretches || []), ...(t.poses || [])]) {
    if (!poseIds.has(id)) unresolved.set(id, (unresolved.get(id) || 0) + 1)
  }
}
if (unresolved.size) warn(`anatomy refers to ${unresolved.size} pose slugs with no content: ${[...unresolved.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k}(${n})`).join(' ')}`)

// ── phrases ─────────────────────────────────────────────────────────────
const phraseIds = new Set()
for (const g of PHRASE_GROUPS) {
  const w = `phrases ${g.id}`
  checkBi(`${w}.title`, g.title)
  if (!Array.isArray(g.lines) || !g.lines.length) { err(`${w}: no lines`); continue }
  for (const l of g.lines) {
    if (phraseIds.has(l.id)) err(`${w}: duplicate line id ${l.id}`)
    phraseIds.add(l.id)
    checkEn(`${w}.${l.id}.en`, l.en)
    checkVi(`${w}.${l.id}.vi`, l.vi)
  }
}

// ── lessons ─────────────────────────────────────────────────────────────
const clipIds = new Set(allClips().map((c) => c.id))
const dupClips = allClips().map((c) => c.id).filter((id, i, a) => a.indexOf(id) !== i)
if (dupClips.length) err(`duplicate clip ids: ${[...new Set(dupClips)].join(', ')}`)
const ACTIVITIES = new Set(['label', 'sort', 'order', 'hotspot', 'predict', 'chain', 'dictation', 'sayit'])
const FIG = { front: [670, 1269], back: [537, 1226], skeleton: [435.687, 841.89] }
function checkWindow(w, fig) {
  if (!fig || !FIG[fig.kind]) { err(`${w}: figure.kind "${fig?.kind}"`); return }
  const [x, y, ww, hh] = fig.window || []
  const [W, H] = FIG[fig.kind]
  if (![x, y, ww, hh].every((n) => typeof n === 'number')) { err(`${w}: figure.window must be [x, y, w, h]`); return }
  if (x < -ww || y < -hh || x + ww > W * 1.5 || y + hh > H * 1.5 || ww <= 0 || hh <= 0) err(`${w}: window ${JSON.stringify(fig.window)} is off the ${fig.kind} figure (${W}×${H})`)
  for (const id of fig.highlight || []) {
    const on = fig.kind === 'skeleton' ? (getTerm(id)?.skeleton || SKELETON_LANDMARKS[id]) : MUSCLE_REGIONS[fig.kind]?.[id]
    if (!on) warn(`${w}: highlight "${id}" is not drawn on the ${fig.kind} figure`)
  }
}
for (const L of LESSONS) {
  const w = `lesson ${L.id}`
  checkBi(`${w}.title`, L.title)
  if (!L.slides) continue
  checkBi(`${w}.lead`, L.lead); checkBi(`${w}.how`, L.how)
  if (typeof L.minutes !== 'number') err(`${w}: minutes missing`)
  for (const id of L.terms || []) if (!termIds.has(id)) err(`${w}: term "${id}" is not in content/anatomy`)
  if (L.pose && !poseIds.has(L.pose)) err(`${w}: pose "${L.pose}" has no content`)
  const ids = new Set()
  const met = new Set()
  L.slides.forEach((s, i) => {
    const sw = `${w} slide ${i} (${s.type}${s.term ? ' ' + s.term : s.activity ? ' ' + s.activity.type : ''})`
    if (s.type === 'term') {
      if (!termIds.has(s.term)) err(`${sw}: unknown term`)
      if (!(L.terms || []).includes(s.term)) warn(`${sw}: term is not in lesson.terms`)
      met.add(s.term)
      checkWindow(sw, s.figure)
      for (const c of s.cues || []) if (!clipIds.has(c)) err(`${sw}: cue clip "${c}" does not exist`)
      if (s.care) { if (!s.care.id?.startsWith(`${L.id}__care-`)) err(`${sw}: care.id should start with ${L.id}__care-`); checkBi(`${sw}.care`, s.care) }
    } else if (s.type === 'pose') {
      if (!poseIds.has(s.pose)) err(`${sw}: pose "${s.pose}" has no content`)
    } else if (s.type === 'activity') {
      const a = s.activity
      if (!a || !ACTIVITIES.has(a.type)) { err(`${sw}: unknown activity`); return }
      if (!a.id) err(`${sw}: activity needs an id`)
      else if (ids.has(a.id)) err(`${sw}: duplicate activity id ${a.id}`)
      ids.add(a.id)
      if (a.prompt) checkBi(`${sw}.prompt`, a.prompt)
      if (a.explain) checkBi(`${sw}.explain`, a.explain)
      if (a.figure) checkWindow(sw, a.figure)
      if (a.pose && !poseIds.has(a.pose)) err(`${sw}: pose "${a.pose}" has no content`)
      for (const id of [...(a.bank || []), ...(a.accept || []), ...(a.reveal || []), ...(a.cards || []).map((c) => c.term)]) if (!termIds.has(id)) err(`${sw}: term "${id}" is not in content/anatomy`)
      for (const c of [a.clip, a.then?.clip, ...(a.steps || []), ...(a.items || []).map((it) => it.clip)].filter(Boolean)) if (!clipIds.has(c)) err(`${sw}: clip "${c}" does not exist`)
      if (a.type === 'label') {
        for (const p of a.pins || []) {
          if (!(a.bank || []).includes(p.id)) err(`${sw}: pin "${p.id}" is not in the bank`)
          if (!Array.isArray(p.to) || p.to.length !== 2) err(`${sw}: pin "${p.id}" needs to: [x, y]`)
          if (!['above', 'below', 'left', 'right'].includes(p.side || 'below')) err(`${sw}: pin "${p.id}" side`)
          const on = a.figure?.kind === 'skeleton' ? (getTerm(p.id)?.skeleton || SKELETON_LANDMARKS[p.id]) : MUSCLE_REGIONS[a.figure?.kind]?.[p.id]
          if (!on) warn(`${sw}: pin "${p.id}" is not drawn on the ${a.figure?.kind} figure`)
        }
        if ((a.bank || []).length <= (a.pins || []).length) warn(`${sw}: the bank has no distractor`)
      }
      if (a.type === 'sort') {
        const bins = new Set((a.bins || []).map((b) => b.id))
        for (const c of a.cards || []) if (!bins.has(c.bin)) err(`${sw}: card ${c.term} bin "${c.bin}"`)
        if (a.bins) for (const b of a.bins) checkBi(`${sw}.bin ${b.id}`, b)
      }
      if (a.type === 'predict') {
        if (!(a.options || []).some((o) => o.id === a.correct)) err(`${sw}: correct "${a.correct}" is not an option`)
        for (const o of a.options || []) checkBi(`${sw}.option ${o.id}`, o)
      }
      if (a.type === 'chain') {
        if (!Array.isArray(a.pieces) || a.pieces.length < 3) err(`${sw}: pieces`)
        const text = (a.pieces || []).join(' ').replace(/\s+/g, ' ').trim()
        const cue = [...POSES.flatMap((p) => [...p.cues, ...p.modifications, ...p.safety]), ...TERMS.flatMap((t) => (t.cues || []).map((c, i) => ({ id: `${t.id}__cue-${i + 1}`, en: c.en })))].find((x) => x.id === a.clip)
        if (cue && cue.en.replace(/\s+/g, ' ').trim() !== text) warn(`${sw}: pieces join to "${text}" but the clip says "${cue.en}"`)
      }
      if (a.type === 'sayit') for (const it of a.items || []) { if (!it.text) err(`${sw}: item ${it.clip} needs text`); if (it.credit && !termIds.has(it.credit)) err(`${sw}: credit "${it.credit}"`) }
      for (const [facet, list] of Object.entries(a.credits || {})) {
        if (!['labelled', 'said', 'cued'].includes(facet)) err(`${sw}: credits facet "${facet}"`)
        for (const id of list || []) if (!termIds.has(id)) err(`${sw}: credits "${id}"`)
      }
    } else if (!['intro', 'done'].includes(s.type)) err(`${sw}: unknown slide type`)
  })
  for (const id of L.terms || []) if (!met.has(id)) warn(`${w}: term "${id}" has no term slide`)
  for (const id of lessonClipIds(L)) if (!clipIds.has(id)) err(`${w}: plays clip "${id}" that no content produces`)
  const first = L.slides[0]?.type, lastT = L.slides[L.slides.length - 1]?.type
  if (first !== 'intro' || lastT !== 'done') warn(`${w}: slides should start with intro and end with done`)
}

// ── report ───────────────────────────────────────────────────────────────
const clips = allClips()
console.log(`${POSES.length} poses, ${TERMS.length} terms, ${PHRASE_GROUPS.reduce((n, g) => n + g.lines.length, 0)} phrase lines in ${PHRASE_GROUPS.length} groups, ${LESSONS.filter((l) => l.slides).length}/${LESSONS.length} lessons, ${clips.length} clips`)
for (const m of warnings) console.log(`warn  ${m}`)
for (const m of errors) console.log(`ERROR ${m}`)
console.log(`${errors.length} errors, ${warnings.length} warnings`)
process.exit(errors.length || (strict && warnings.length) ? 1 : 0)
