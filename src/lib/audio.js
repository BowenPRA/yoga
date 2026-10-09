/**
 * One shared audio element, so tapping a new word stops the previous one.
 * Fixed content is an mp3 per clip id under public/audio/. AI speech arrives
 * as a blob from the backend and plays the same way.
 */
const BASE = import.meta.env.BASE_URL
let el = null
let listeners = new Set()
let current = null
let unlocked = false

/** A twentieth of a second of silence, as a WAV URL, for unlock(). */
let silenceUrl = null
function silence() {
  if (!silenceUrl) {
    const n = 400
    const b = new Uint8Array(44 + n).fill(0x80)
    const v = new DataView(b.buffer)
    const str = (o, s) => { for (let i = 0; i < s.length; i++) b[o + i] = s.charCodeAt(i) }
    str(0, 'RIFF'); v.setUint32(4, 36 + n, true); str(8, 'WAVE')
    str(12, 'fmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true)
    v.setUint32(24, 8000, true); v.setUint32(28, 8000, true); v.setUint16(32, 1, true); v.setUint16(34, 8, true)
    str(36, 'data'); v.setUint32(40, n, true)
    silenceUrl = URL.createObjectURL(new Blob([b], { type: 'audio/wav' }))
  }
  return silenceUrl
}

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

  /**
   * iPhone only lets an audio element play after a tap has started it once.
   * Speech that arrives seconds after the tap (a translation, a coached
   * line) would be refused, so the tap that asks for it calls this first.
   */
  unlock() {
    if (unlocked) return
    const a = ensure()
    if (!a.paused) { unlocked = true; return }
    a.src = silence()
    a.play().then(() => { unlocked = true }).catch(() => {})
  },

  /** Play a clip by id. Resolves when it ends (or fails). */
  play(id) {
    const a = ensure()
    a.pause()
    a.src = this.url(id)
    a.defaultPlaybackRate = a.playbackRate = 1
    setCurrent(id)
    return new Promise((resolve) => {
      const done = () => { a.removeEventListener('ended', done); a.removeEventListener('error', done); resolve() }
      a.addEventListener('ended', done)
      a.addEventListener('error', done)
      // A blocked autoplay rejects without an error event; clear the state.
      a.play().catch(() => { if (current === id) setCurrent(null); done() })
    })
  },

  /** Play a blob (AI speech, a saved line). `rate` below 1 slows it, keeping the pitch. */
  playBlob(blob, id = 'blob', { rate = 1 } = {}) {
    const a = ensure()
    a.pause()
    const url = URL.createObjectURL(blob)
    a.src = url
    a.defaultPlaybackRate = a.playbackRate = rate
    setCurrent(id)
    return new Promise((resolve) => {
      const done = () => { URL.revokeObjectURL(url); a.removeEventListener('ended', done); a.removeEventListener('error', done); resolve() }
      a.addEventListener('ended', done)
      a.addEventListener('error', done)
      a.play().catch(() => { if (current === id) setCurrent(null); done() })
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
