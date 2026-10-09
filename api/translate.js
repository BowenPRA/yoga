import { prelude, generateJSON, asData, fail } from './_lib/gemini.js'

export const maxDuration = 60

/**
 * "Say it in English": she types or records what she wants to say, in
 * Vietnamese, English or a mix; Gemini gives the line a native teacher would
 * say, its meaning back in Vietnamese and a few chunks worth keeping. The
 * app then reads the English aloud through /api/speak.
 */
const SYSTEM = `You help a Vietnamese yoga teacher say things in English. Vietnamese is her first language and her English is intermediate. She teaches Vinyasa, Yin and Ashtanga, and vipassana meditation, and she is about to say this line aloud to her class or to a student.

She gives you what she wants to say, typed or recorded, in Vietnamese, in English, or a mix of both (Vietnamese with English or Sanskrit yoga words is common). Return JSON:

- "heard": exactly what she wrote or said, in the language she used. For a recording, transcribe it faithfully, with Vietnamese diacritics. For typed text, copy it.
- "lang": "vi", "en" or "mixed": the language she used.
- "english": what she means, as a native English-speaking yoga teacher would actually say it aloud. Keep her meaning, her tone and her order of ideas, and add nothing she did not say. A cue stays a short, speakable cue in the imperative ("Root down through your back heel."). Anything else (welcoming people, asking about injuries, explaining an idea, chatting after class) becomes natural spoken English in that register. Use plain teaching language unless she used a technical word herself. Keep Sanskrit and Pali names as she gave them, and give a Vietnamese pose name its usual English studio name. Write numbers as words. If her English was already natural, keep it as it is.
- "meaning_vi": the English line translated back into natural Vietnamese, so she can check it says what she meant.
- "phrases": 1 to 3 short chunks of the English line worth learning, each {"en": the chunk exactly as it appears in "english", "vi": its meaning as one natural Vietnamese phrase, without alternatives or slashes}. Prefer teaching phrases she can reuse in other cues ("come into", "root down", "on your next exhale") over single easy words.
- "note_vi": an empty string, unless one short Vietnamese sentence is needed: her words could mean two different things and you chose one, or part of the recording was unclear. Address her as "bạn", never "em", "cậu" or "chị".

If the recording is silent or you cannot make out the words, set "english" to an empty string and say so in note_vi.`

const schema = {
  type: 'OBJECT',
  properties: {
    heard: { type: 'STRING' },
    lang: { type: 'STRING', enum: ['vi', 'en', 'mixed'] },
    english: { type: 'STRING' },
    meaning_vi: { type: 'STRING' },
    phrases: {
      type: 'ARRAY',
      items: { type: 'OBJECT', properties: { en: { type: 'STRING' }, vi: { type: 'STRING' } }, required: ['en', 'vi'] },
    },
    note_vi: { type: 'STRING' },
  },
  required: ['heard', 'lang', 'english', 'meaning_vi', 'phrases', 'note_vi'],
}

export default async function handler(req, res) {
  const body = prelude(req, res)
  if (!body) return
  const text = String(body.text || '').trim().slice(0, 600)
  const audio = String(body.audio || '')
  if (!text && !audio) return res.status(400).json({ error: 'Nothing to translate' })
  // 16 kHz mono WAV: 30 s is about 960 KB, 1.28 MB in base64.
  if (audio && (audio.length < 1000 || audio.length > 1_400_000)) return res.status(400).json({ error: 'Bad recording' })

  const parts = audio
    ? [{ inlineData: { mimeType: 'audio/wav', data: audio } }, { text: 'Her recording is above. Answer for what she said.' }]
    : [{ text: `What she wants to say:\n${asData('LINE', text, 600)}` }]
  try {
    const out = await generateJSON({ system: SYSTEM, parts, schema, temperature: 0.3 })
    out.english = String(out.english || '').trim()
    out.phrases = (out.phrases || []).filter((p) => p.en && out.english.toLowerCase().includes(p.en.toLowerCase())).slice(0, 3)
    return res.status(200).json(out)
  } catch (err) {
    return fail(res, err, 'translate')
  }
}
