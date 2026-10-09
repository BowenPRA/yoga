import { store } from './store.js'

/** What she saves: corrected cues from Speech and lines from poses or phrases. */
export const learn = {
  /** `voice` (a Blob) keeps the line's audio on the phone, so it plays offline. */
  async savePhrase(entry, voice) {
    await store.put('phrasebook', { ...entry, at: Date.now() })
    // An ArrayBuffer, not the Blob: older iPhones cannot keep a Blob in IndexedDB.
    if (voice) await store.put('voices', { id: entry.id, mime: voice.type || 'audio/wav', data: await voice.arrayBuffer() })
  },
  async removePhrase(id) {
    await store.del('phrasebook', id)
    await store.del('voices', id)
  },
  async phrases() {
    const rows = await store.all('phrasebook')
    return rows.sort((a, b) => b.at - a.at)
  },
  /** The ids of lines whose audio is kept on this phone (a backup restores words, not audio). */
  async voiced() {
    return new Set(await store.keys('voices'))
  },
  /** The saved audio of a line, as a Blob, or null. */
  async voice(id) {
    const row = await store.get('voices', id)
    return row ? new Blob([row.data], { type: row.mime }) : null
  },
}
