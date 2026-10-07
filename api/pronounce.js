import { prelude, generateJSON, asData, fail } from './_lib/gemini.js'

export const maxDuration = 60

/**
 * "Say it": she records a word or a cue; Gemini listens and says, in
 * Vietnamese, what to fix. The targets are the ones Vietnamese speakers
 * trip on: final consonants, clusters, th, word stress, long vs short vowels.
 */
const SYSTEM = `You are a kind pronunciation coach inside an app for a Vietnamese yoga teacher who is learning to teach yoga in English. Her English is intermediate. You will hear a short recording of her saying an English word, phrase or teaching cue, and you are told what she meant to say.

Judge only the pronunciation of what she meant to say, as a native listener in a yoga studio would. Be honest but warm; she is a professional practising, not a student being tested.

Return JSON:
- "heard": what you actually heard, written in English (if it was not close to the target, write what it sounded like).
- "verdict": "good" (a student would understand it easily and it sounds natural), "almost" (understandable, one or two things to polish), or "again" (a student might not catch it; try again).
- "fixes": an array of 0 to 3 objects, most important first, each {"word": the word to fix, "issue": one of "final" (a dropped final consonant or ending, e.g. -s, -z, -ed, -nt), "cluster" (a consonant cluster like str, sp, gl, nts), "th" (the th sound), "stress" (the stressed syllable), "vowel" (long vs short vowel, e.g. heel/hill, hip/heap), "other"; "say": a simple respelling of the word with the stressed syllable in capitals, e.g. "pir-i-FOR-mis"; "tip_vi": one or two short sentences in natural Vietnamese telling her exactly what to do with her mouth or voice, as a colleague would. Address her as "bạn", never "em", "cậu" or "chị".}
- "praise_vi": one short sentence in Vietnamese about what was good. If the verdict is "good", say so plainly.

If the recording is silent or inaudible, use verdict "again", an empty "fixes" array and say so in praise_vi.`

const schema = {
  type: 'OBJECT',
  properties: {
    heard: { type: 'STRING' },
    verdict: { type: 'STRING', enum: ['good', 'almost', 'again'] },
    fixes: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          word: { type: 'STRING' },
          issue: { type: 'STRING', enum: ['final', 'cluster', 'th', 'stress', 'vowel', 'other'] },
          say: { type: 'STRING' },
          tip_vi: { type: 'STRING' },
        },
        required: ['word', 'issue', 'say', 'tip_vi'],
      },
    },
    praise_vi: { type: 'STRING' },
  },
  required: ['heard', 'verdict', 'fixes', 'praise_vi'],
}

export default async function handler(req, res) {
  const body = prelude(req, res)
  if (!body) return
  const target = String(body.target || '').trim().slice(0, 300)
  const audio = String(body.audio || '')
  if (!target) return res.status(400).json({ error: 'No target' })
  // 16 kHz mono WAV: 15 s is about 480 KB, 640 KB in base64.
  if (audio.length < 1000 || audio.length > 900_000) return res.status(400).json({ error: 'Bad recording' })
  const say = String(body.say || '').trim().slice(0, 120)

  const prompt = `She meant to say:\n${asData('TARGET', target, 300)}${say ? `\nThe app shows the stress as: ${asData('SAY', say, 120)}` : ''}\n\nListen to the recording and answer.`
  try {
    const out = await generateJSON({
      system: SYSTEM,
      parts: [{ inlineData: { mimeType: 'audio/wav', data: audio } }, { text: prompt }],
      schema,
      temperature: 0.2,
    })
    out.fixes = (out.fixes || []).slice(0, 3)
    return res.status(200).json(out)
  } catch (err) {
    return fail(res, err, 'pronounce')
  }
}
