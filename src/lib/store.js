import { openDB } from 'idb'

/**
 * Everything she accumulates lives on the phone, in IndexedDB:
 *   cards       review scheduling state, keyed by card id (unused since the four-tab pivot)
 *   met         when she first met a term / pose / cue
 *   phrasebook  saved cues and words, her own included
 *   classes     saved Class Builder scripts
 *   suggestions "suggest a fix" notes: { id, target, text, at, sentAt? };
 *               kept after sending, so a sent note is never sent twice
 *   progress    lessons (done or not, where she stopped, her answers) and
 *               terms (when she labelled it, said it, used it in a cue)
 * localStorage holds only device preferences (see i18n.jsx).
 */
const DB = 'yoga-english'
const VERSION = 2
const BACKED_UP = ['cards', 'met', 'phrasebook', 'classes', 'progress', 'suggestions']

let dbp
function db() {
  if (!dbp) {
    dbp = openDB(DB, VERSION, {
      upgrade(d, oldVersion) {
        if (oldVersion < 1) {
          d.createObjectStore('cards', { keyPath: 'id' }).createIndex('due', 'due')
          d.createObjectStore('met', { keyPath: 'id' })
          d.createObjectStore('phrasebook', { keyPath: 'id' }).createIndex('at', 'at')
          d.createObjectStore('classes', { keyPath: 'id' })
          d.createObjectStore('suggestions', { keyPath: 'id' })
        }
        if (oldVersion < 2) d.createObjectStore('progress', { keyPath: 'id' })
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
    for (const name of BACKED_UP) out[name] = await d.getAll(name)
    return out
  },

  async importAll(data) {
    const d = await db()
    for (const name of BACKED_UP) {
      for (const row of data[name] || []) await d.put(name, row)
    }
  },
}

/**
 * Quiet progress. A lesson is done or not; a term is known once she has
 * labelled it, said it and used it in a cue. Timestamps, never scores.
 */
export const FACETS = ['labelled', 'said', 'cued']

export const progress = {
  lesson: (id) => store.get('progress', `lesson:${id}`),
  async saveLesson(id, patch) {
    const row = (await store.get('progress', `lesson:${id}`)) || { id: `lesson:${id}` }
    const next = { ...row, ...patch, at: Date.now() }
    await store.put('progress', next)
    return next
  },
  async lessons() {
    const rows = await store.all('progress')
    return Object.fromEntries(rows.filter((r) => r.id.startsWith('lesson:')).map((r) => [r.id.slice(7), r]))
  },

  term: (id) => store.get('progress', `term:${id}`),
  /** Record a facet for several terms at once; a facet is only ever set once. */
  async mark(facet, termIds) {
    for (const tid of termIds || []) {
      const row = (await store.get('progress', `term:${tid}`)) || { id: `term:${tid}` }
      if (!row[facet]) {
        row[facet] = Date.now()
        await store.put('progress', row)
      }
    }
  },
  async terms() {
    const rows = await store.all('progress')
    return Object.fromEntries(rows.filter((r) => r.id.startsWith('term:')).map((r) => [r.id.slice(5), r]))
  },
}

export const isKnown = (row) => !!row && FACETS.every((f) => row[f])

/**
 * The "suggest a fix" outbox. A note waits on the phone until she sends it
 * to Bowen from Settings; sending marks it `sentAt` and keeps it.
 */
export const suggestions = {
  async add(target, text) {
    const at = Date.now()
    await store.put('suggestions', { id: `${target}:${at}`, target, text, at })
  },
  /** Every note, oldest first. */
  async all() {
    return (await store.all('suggestions')).sort((a, b) => a.at - b.at)
  },
  async markSent(ids, at = Date.now()) {
    for (const id of ids) {
      const row = await store.get('suggestions', id)
      if (row && !row.sentAt) await store.put('suggestions', { ...row, sentAt: at })
    }
  },
}
