import { prelude, generateJSON, asData, fail } from './_lib/gemini.js'

export const maxDuration = 60

/**
 * The Class Builder's one call. The app has already built the class on the
 * phone from her request (src/lib/planner.js); Gemini is handed that plan,
 * her words and the catalogue of pose ids, and tailors it: a name, the line
 * that opens the class, a few cues in the theme, up to three swaps (ids from
 * the catalogue only, so every pose still has its audio), and, for a
 * student, what to say to them. If the app could not read her request at
 * all, Gemini also names the goals and cautions so the app can rebuild.
 */
const SYSTEM = `You help a Vietnamese yoga teacher plan a class she will teach in English. Her English is intermediate; Vietnamese is her first language. She teaches Vinyasa, Yin and Ashtanga, and vipassana meditation.

You are given her request (Vietnamese, English or a mix), the class the app has already planned from it (sections of pose ids, in order), the catalogue of pose ids the app has audio for, and the goal and caution tags the app knows. Return JSON:

- "title": {"en", "vi"}: a short, warm name for the class (four to seven words), in English and in Vietnamese.
- "theme": {"en", "vi"}: one to three sentences she says at the start, as a native teacher would, naming what the class is for and how to approach it. Plain, speakable English; natural Vietnamese that means the same.
- "goals": the tags from GOALS that fit her request, best first, up to three. Empty if none fit.
- "cautions": the tags from CAUTIONS that fit her request (a student's knee, back, pregnancy and so on). Empty if none.
- "swaps": up to three {"out": pose id in the plan, "in": pose id from the catalogue not in the plan, "why_vi": one short Vietnamese sentence} where a different pose would serve the theme or the student better, or where the plan has a pose that does not belong. Keep the style (a Yin class takes Yin poses). Never swap in a pose a stated caution would forbid. Empty when the plan is fine.
- "cues": three to six {"pose": pose id in the plan, "en", "vi"}: one cue each for poses in the plan that carry the theme, as a native teacher would say it in class. Short, imperative, "your" not "the", numbers as words. The Vietnamese is what it means, addressing students as "bạn".
- "toStudent": {"en", "vi"}: only when the request is what a student said or asked (a problem, a goal, a question): two or three sentences she can say to that student in English, kind and honest, with what to do and what to avoid, and the same in Vietnamese. Otherwise both empty strings.
- "watch": up to three {"en", "vi"}: for a student request, what to watch for in class (where the sensation belongs, what should never hurt). Otherwise empty.
- "note_vi": an empty string, or one short Vietnamese sentence when her request could mean two things and you chose one. Address her as "bạn", never "em", "cậu" or "chị".

Use only pose ids that appear in the catalogue. Do not add poses that need equipment the studio may not have. Do not write medical advice beyond what a careful yoga teacher would say; if an injury sounds serious, say in toStudent that they should check with a doctor or physio.`

const bi = { type: 'OBJECT', properties: { en: { type: 'STRING' }, vi: { type: 'STRING' } }, required: ['en', 'vi'] }
const schema = {
  type: 'OBJECT',
  properties: {
    title: bi,
    theme: bi,
    goals: { type: 'ARRAY', items: { type: 'STRING' } },
    cautions: { type: 'ARRAY', items: { type: 'STRING' } },
    swaps: { type: 'ARRAY', items: { type: 'OBJECT', properties: { out: { type: 'STRING' }, in: { type: 'STRING' }, why_vi: { type: 'STRING' } }, required: ['out', 'in', 'why_vi'] } },
    cues: { type: 'ARRAY', items: { type: 'OBJECT', properties: { pose: { type: 'STRING' }, en: { type: 'STRING' }, vi: { type: 'STRING' } }, required: ['pose', 'en', 'vi'] } },
    toStudent: bi,
    watch: { type: 'ARRAY', items: bi },
    note_vi: { type: 'STRING' },
  },
  required: ['title', 'theme', 'goals', 'cautions', 'swaps', 'cues', 'toStudent', 'watch', 'note_vi'],
}

const slug = (s) => String(s || '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '')

export default async function handler(req, res) {
  const body = prelude(req, res)
  if (!body) return
  const request = String(body.request || '').trim().slice(0, 500)
  const plan = body.plan && typeof body.plan === 'object' ? body.plan : null
  const catalog = Array.isArray(body.catalog) ? body.catalog.slice(0, 400) : []
  const tags = body.tags && typeof body.tags === 'object' ? body.tags : { goals: [], cautions: [] }
  if (!plan || !catalog.length) return res.status(400).json({ error: 'No plan' })

  const ids = new Set(catalog.map((p) => slug(p.id)).filter(Boolean))
  const inPlan = new Set((plan.sections || []).flatMap((s) => s.poses || []).map(slug))
  const goalIds = new Set((tags.goals || []).map((g) => slug(g.id)))
  const cautionIds = new Set((tags.cautions || []).map((c) => slug(c.id)))

  const catalogText = catalog.map((p) => `${slug(p.id)} (${String(p.en || '').slice(0, 40)}; ${slug(p.family)}; ${slug(p.level)}; ${(p.styles || []).map(slug).join('/')})`).join('\n')
  const planText = (plan.sections || []).map((s) => `${slug(s.key)}: ${(s.poses || []).map(slug).join(', ') || '(talk)'}`).join('\n')
  const prompt = [
    `Mode: ${plan.mode === 'student' ? 'a student said this; the plan is a short practice for them' : 'planning a class'}.`,
    `Her request:\n${asData('REQUEST', request || '(none: she chose the options by hand)', 500)}`,
    `The plan: style ${slug(plan.style)}, ${Number(plan.minutes) || 60} minutes, level ${slug(plan.level)}, goals [${(plan.goals || []).map(slug).join(', ')}], cautions [${(plan.cautions || []).map(slug).join(', ')}].\n${planText}`,
    `GOALS: ${(tags.goals || []).map((g) => `${slug(g.id)} (${String(g.en || '').slice(0, 40)})`).join(', ')}`,
    `CAUTIONS: ${(tags.cautions || []).map((c) => `${slug(c.id)} (${String(c.en || '').slice(0, 40)})`).join(', ')}`,
    `Catalogue (id (name; family; level; styles)):\n${catalogText}`,
  ].join('\n\n')

  try {
    const out = await generateJSON({ system: SYSTEM, prompt, schema, temperature: 0.4 })
    out.goals = (out.goals || []).map(slug).filter((g) => goalIds.has(g)).slice(0, 3)
    out.cautions = (out.cautions || []).map(slug).filter((c) => cautionIds.has(c)).slice(0, 3)
    out.swaps = (out.swaps || []).map((s) => ({ out: slug(s.out), in: slug(s.in), why_vi: String(s.why_vi || '').trim() })).filter((s) => inPlan.has(s.out) && ids.has(s.in) && !inPlan.has(s.in)).slice(0, 3)
    out.cues = (out.cues || []).map((c) => ({ pose: slug(c.pose), en: String(c.en || '').trim(), vi: String(c.vi || '').trim() })).filter((c) => c.en && (inPlan.has(c.pose) || out.swaps.some((s) => s.in === c.pose))).slice(0, 6)
    out.watch = (out.watch || []).filter((w) => w?.en).slice(0, 3)
    if (plan.mode !== 'student') { out.toStudent = { en: '', vi: '' }; out.watch = [] }
    return res.status(200).json(out)
  } catch (err) {
    return fail(res, err, 'plan')
  }
}
