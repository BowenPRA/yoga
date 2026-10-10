import { api } from './api.js'
import { store } from './store.js'

/**
 * The live voice for a line the AI wrote (a theme, a cue, what to say to a
 * student). Each line is fetched once: the Blob is kept in memory for the
 * session and in IndexedDB (`voices`, keyed by a hash of the text) for
 * ever after, so a saved class never spends a second TTS request on the
 * same words.
 */
const mem = new Map()

/** A small stable hash of the text, as the row key. */
export function voiceKey(text) {
  let h = 5381
  const s = String(text || '').trim()
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0
  return `ai:${(h >>> 0).toString(36)}:${s.length}`
}

/** The audio for a line, as a Blob. Throws when the voice cannot be reached. */
export async function voiceFor(text) {
  const key = voiceKey(text)
  if (mem.has(key)) return mem.get(key)
  const row = await store.get('voices', key).catch(() => null)
  if (row) {
    const blob = new Blob([row.data], { type: row.mime })
    mem.set(key, blob)
    return blob
  }
  const blob = await api.speak(String(text).trim())
  mem.set(key, blob)
  // An ArrayBuffer, not the Blob: older iPhones cannot keep a Blob in IndexedDB.
  store.put('voices', { id: key, mime: blob.type || 'audio/wav', data: await blob.arrayBuffer() }).catch(() => {})
  return blob
}

/** Whether the voice for a line is already on the phone. */
export async function hasVoice(text) {
  const key = voiceKey(text)
  if (mem.has(key)) return true
  return !!(await store.get('voices', key).catch(() => null))
}
