import { store } from './store.js'

/** What she saves: corrected cues from Speech and lines from poses or phrases. */
export const learn = {
  async savePhrase(entry) {
    await store.put('phrasebook', { ...entry, at: Date.now() })
  },
  async removePhrase(id) {
    await store.del('phrasebook', id)
  },
  async phrases() {
    const rows = await store.all('phrasebook')
    return rows.sort((a, b) => b.at - a.at)
  },
}
