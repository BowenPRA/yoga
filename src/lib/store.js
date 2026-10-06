import { openDB } from 'idb'

/**
 * Everything she accumulates lives on the phone, in IndexedDB:
 *   cards       review scheduling state, keyed by card id
 *   met         when she first met a term / pose / cue (card creation)
 *   phrasebook  saved cues and words, her own included
 *   classes     saved Class Builder scripts
 *   suggestions "suggest a fix" notes, until they are sent
 * localStorage holds only device preferences (see i18n.jsx).
 */
const DB = 'yoga-english'
const VERSION = 1

let dbp
function db() {
  if (!dbp) {
    dbp = openDB(DB, VERSION, {
      upgrade(d) {
        d.createObjectStore('cards', { keyPath: 'id' }).createIndex('due', 'due')
        d.createObjectStore('met', { keyPath: 'id' })
        d.createObjectStore('phrasebook', { keyPath: 'id' }).createIndex('at', 'at')
        d.createObjectStore('classes', { keyPath: 'id' })
        d.createObjectStore('suggestions', { keyPath: 'id' })
      },
    })
  }
  return dbp
}

export const store = {
  async get(name, id) { return (await db()).get(name, id) },
  async all(name) { return (await db()).getAll(name) },
  async put(name, value) { return (await db()).put(name, value) },
  async del(name, id) { return (await db()).delete(name, id) },
  async count(name) { return (await db()).count(name) },

  /** Mark content as met (idempotent). Returns true the first time. */
  async meet(id, kind) {
    const d = await db()
    if (await d.get('met', id)) return false
    await d.put('met', { id, kind, at: Date.now() })
    return true
  },

  async dueCards(now = Date.now()) {
    const d = await db()
    return d.getAllFromIndex('cards', 'due', IDBKeyRange.upperBound(now))
  },

  /** Export everything as one JSON blob (the backup file). */
  async exportAll() {
    const d = await db()
    const out = { version: VERSION, exportedAt: new Date().toISOString() }
    for (const name of ['cards', 'met', 'phrasebook', 'classes']) out[name] = await d.getAll(name)
    return out
  },

  async importAll(data) {
    const d = await db()
    for (const name of ['cards', 'met', 'phrasebook', 'classes']) {
      for (const row of data[name] || []) await d.put(name, row)
    }
  },
}
