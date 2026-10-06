import { prelude, speak, fail } from './_lib/gemini.js'

export const maxDuration = 60

const STYLE = 'A calm, warm yoga teacher cueing a class: unhurried, gentle, clear, with a small pause between sentences.'

/** Live speech for text the AI wrote (corrected cues, scripts). Returns WAV. */
export default async function handler(req, res) {
  const body = prelude(req, res)
  if (!body) return
  const text = String(body.text || '').trim().slice(0, 600)
  if (!text) return res.status(400).json({ error: 'No text' })
  try {
    const { bytes, mime } = await speak({ text, style: STYLE })
    res.setHeader('Content-Type', mime)
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).send(bytes)
  } catch (err) {
    return fail(res, err, 'speak')
  }
}
