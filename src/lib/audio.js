/**
 * One shared audio element, so tapping a new word stops the previous one.
 * Fixed content is an mp3 per clip id under public/audio/. AI speech arrives
 * as a blob from the backend and plays the same way.
 */
const BASE = import.meta.env.BASE_URL
let el = null
let listeners = new Set()
let current = null

function ensure() {
  if (!el) {
    el = new Audio()
    el.preload = 'auto'
    el.addEventListener('ended', () => setCurrent(null))
    el.addEventListener('error', () => setCurrent(null))
  }
  return el
}

function setCurrent(id) {
  current = id
  listeners.forEach((fn) => fn(id))
}

export const audio = {
  url: (id) => `${BASE}audio/${id}.mp3`,

  /** Play a clip by id. Resolves when it ends (or fails). */
  play(id) {
    const a = ensure()
    a.pause()
    a.src = this.url(id)
    setCurrent(id)
    return new Promise((resolve) => {
      const done = () => { a.removeEventListener('ended', done); a.removeEventListener('error', done); resolve() }
      a.addEventListener('ended', done)
      a.addEventListener('error', done)
      a.play().catch(done)
    })
  },

  playBlob(blob, id = 'blob') {
    const a = ensure()
    a.pause()
    const url = URL.createObjectURL(blob)
    a.src = url
    setCurrent(id)
    return new Promise((resolve) => {
      const done = () => { URL.revokeObjectURL(url); a.removeEventListener('ended', done); a.removeEventListener('error', done); resolve() }
      a.addEventListener('ended', done)
      a.addEventListener('error', done)
      a.play().catch(done)
    })
  },

  /** Play clips one after another with a pause between (ms). */
  async sequence(ids, gap = 700, shouldStop = () => false) {
    for (const id of ids) {
      if (shouldStop()) break
      await this.play(id)
      if (shouldStop()) break
      await new Promise((r) => setTimeout(r, gap))
    }
    setCurrent(null)
  },

  stop() {
    if (el) el.pause()
    setCurrent(null)
  },

  subscribe(fn) {
    listeners.add(fn)
    fn(current)
    return () => listeners.delete(fn)
  },
}
