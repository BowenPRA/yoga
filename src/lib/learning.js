import { store } from './store.js'
import { newCard } from './srs.js'

/**
 * Turns "she met this" into review cards. Called from the content screens.
 * Card ids are `${kind}:${ref}` so the same content never makes two cards.
 */
async function ensureCard(id, kind, ref) {
  if (await store.get('cards', id)) return
  await store.put('cards', newCard(id, kind, ref))
}

export const learn = {
  async meetTerm(term) {
    if (!(await store.meet(term.id, 'term'))) return
    await ensureCard(`term:${term.id}`, 'term', term.id)
  },

  async meetPose(pose) {
    if (!(await store.meet(pose.id, 'pose'))) return
    await ensureCard(`pose:${pose.id}`, 'pose', pose.id)
    for (const c of pose.cues || []) await ensureCard(`cue:${c.id}`, 'cue', c.id)
  },

  async savePhrase(entry) {
    await store.put('phrasebook', { ...entry, at: Date.now() })
    if (entry.id) await ensureCard(`phrase:${entry.id}`, 'phrase', entry.id)
  },
}
