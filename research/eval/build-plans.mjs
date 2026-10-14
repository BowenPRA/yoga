/**
 * Builds the /api/plan eval requests with the app's own planner, exactly as
 * ClassNew.jsx and ClassPlan.jsx do: parseRequest(text) -> buildPlan(spec)
 * -> { request, plan: planForAI(plan), catalog: catalogForAI(), tags: goalsForAI() }
 * (the catalogue and the tags are stored once at the top of plan.json).
 * A fixed seed keeps the plans the same from run to run.
 *
 *   node research/eval/build-plans.mjs      writes research/eval/plan.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseRequest, buildPlan, planForAI, catalogForAI, goalsForAI } from '../../src/lib/planner.js'

const here = path.dirname(fileURLToPath(import.meta.url))

const REQUESTS = [
  { id: 'p01-vinyasa-hips', mode: 'class', text: 'Lớp vinyasa 60 phút mở hông cho người mới', covers: 'Vinyasa, a theme in Vietnamese, beginners' },
  { id: 'p02-yin-lower-back', mode: 'class', text: 'Yin 75 phút cho lưng dưới, thư giãn trước khi ngủ', covers: 'Yin, a caution read from the theme (lower back), an evening class' },
  { id: 'p03-ashtanga-upto-boat', mode: 'class', text: 'Ashtanga primary series, 90 minutes, Mysore style, up to Navasana', upTo: 'boat-pose', covers: 'Ashtanga, the series cut the Mysore way' },
  { id: 'p04-vinyasa-peak-crow', mode: 'class', text: 'A strong 75 minute class building toward Crow', style: 'vinyasa', peak: 'crow-pose', covers: 'a peak pose ladder' },
  { id: 'p05-student-knee-back', mode: 'student', text: 'Học viên nói: tôi bị đau gối khi ngồi xếp bằng, và lưng dưới hay mỏi khi gập người về trước', covers: "a student's words in Vietnamese, two cautions" },
  { id: 'p06-desk-unparsed', mode: 'class', text: 'Something for people who sit at a desk all day', covers: 'a theme the phone cannot read: Gemini must name the goals' },
  { id: 'p07-student-pregnant', mode: 'student', text: 'A student told me she is five months pregnant and her hips feel tight; she wants to keep practising', covers: "a student's words in English, pregnancy" },
]

const cases = REQUESTS.map((r, i) => {
  const parsed = parseRequest(r.text)
  const style = r.style || parsed.style || 'vinyasa'
  const minutes = parsed.minutes || (r.mode === 'student' ? 15 : 60)
  const plan = buildPlan({
    mode: r.mode, style, minutes, level: parsed.level || undefined, goals: parsed.goals, cautions: parsed.cautions,
    request: r.text, peak: r.peak, upTo: r.upTo, seed: 1000 + i,
  })
  return {
    id: r.id,
    covers: r.covers,
    // The runner adds the catalogue and the tags, the same for every case.
    body: { request: plan.request, plan: planForAI(plan) },
  }
})

const out = path.join(here, 'plan.json')
const about = 'Built by build-plans.mjs with the real planner (fixed seeds). Each request body is { ...case.body, catalog, tags }.'
fs.writeFileSync(out, JSON.stringify({ endpoint: '/api/plan', about, catalog: catalogForAI(), tags: goalsForAI(), cases }, null, 1) + '\n')
for (const c of cases) {
  const p = c.body.plan
  console.log(c.id, p.mode, p.style, p.minutes, p.level, `goals[${p.goals}] cautions[${p.cautions}] peak ${p.peak}`, '|', p.sections.map((s) => `${s.key}:${s.poses.length}`).join(' '))
}
console.log('wrote', path.relative(process.cwd(), out))
