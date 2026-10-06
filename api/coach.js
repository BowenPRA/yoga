import { prelude, generateJSON, asData, fail } from './_lib/gemini.js'

export const maxDuration = 60

const SYSTEM = `You are Cue Coach inside an app that helps a Vietnamese yoga teacher teach yoga in English. Her English is intermediate. She teaches Vinyasa, Yin and Ashtanga, and vipassana meditation.

She gives you a cue she wants to say in class, written in her own English. Return JSON with these fields:

- "natural": the cue as a native English-speaking yoga teacher would actually say it in class. Keep her meaning and her order of ideas. Keep it short and speakable. Do not add instructions she did not give. Use plain teaching language, not textbook anatomy, unless she used the technical word herself. Write numbers as words.
- "meaning_vi": the natural version translated into natural Vietnamese, one line, so she is sure what it says.
- "changes": an array of 2 to 4 objects, each {"from": "...", "to": "...", "why_vi": "..."}. "why_vi" explains the change in natural Vietnamese, one or two short sentences, as a kind colleague would. Address her as "bạn", never "em", "cậu" or "chị". Focus on the patterns Vietnamese speakers repeat: word order (adjective before noun), missing plural -s and articles, breath/breathe, missing subjects and verbs, "for" with durations, and the stock phrases native teachers use ("come into", "fold forward", "that's okay").
- "pronunciation": an array of up to 3 words from the natural version that a Vietnamese speaker is likely to say wrong, each {"word": "...", "say": "...", "tip_vi": "..."}. "say" is a simple respelling with the stressed syllable in capitals (e.g. "PAR-uh-lel"). "tip_vi" is one sentence in Vietnamese about the specific trap: final consonants, clusters like str/sp, th, word stress, long vs short vowels.
- "praise_vi": one short, honest sentence in Vietnamese about what was already good about her cue.

If the text is not a yoga cue at all, still answer gently: make "natural" the closest useful teaching sentence and say so in praise_vi.`

const schema = {
  type: 'OBJECT',
  properties: {
    natural: { type: 'STRING' },
    meaning_vi: { type: 'STRING' },
    changes: {
      type: 'ARRAY',
      items: { type: 'OBJECT', properties: { from: { type: 'STRING' }, to: { type: 'STRING' }, why_vi: { type: 'STRING' } }, required: ['from', 'to', 'why_vi'] },
    },
    pronunciation: {
      type: 'ARRAY',
      items: { type: 'OBJECT', properties: { word: { type: 'STRING' }, say: { type: 'STRING' }, tip_vi: { type: 'STRING' } }, required: ['word', 'say', 'tip_vi'] },
    },
    praise_vi: { type: 'STRING' },
  },
  required: ['natural', 'meaning_vi', 'changes', 'pronunciation', 'praise_vi'],
}

export default async function handler(req, res) {
  const body = prelude(req, res)
  if (!body) return
  const cue = String(body.cue || '').trim()
  if (!cue) return res.status(400).json({ error: 'No cue' })
  const context = String(body.context || '').trim()

  const prompt = `${context ? `Context: ${asData('CONTEXT', context, 200)}\n\n` : ''}Her cue:\n${asData('CUE', cue)}`
  try {
    const out = await generateJSON({ system: SYSTEM, prompt, schema })
    out.changes = (out.changes || []).slice(0, 4)
    out.pronunciation = (out.pronunciation || []).slice(0, 3)
    return res.status(200).json(out)
  } catch (err) {
    return fail(res, err, 'coach')
  }
}
