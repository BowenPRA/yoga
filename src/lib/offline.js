import { useCallback, useEffect, useState } from 'react'
import { audio } from './audio.js'

/**
 * Keeping clips on the phone, for a studio with no signal.
 *
 * The service worker (public/sw.js) keeps every mp3 it fetches in its audio
 * cache, `audio-<VERSION>`, and serves it from there ever after. Keeping a
 * pose or a lesson offline is therefore just fetching its clips ahead of
 * time. `cached` looks in that cache by its prefix, so the version lives in
 * sw.js alone.
 *
 * Only clips that exist are fetched: public/audio/manifest.json lists every
 * generated clip, and a pose whose audio is not made yet has nothing to keep.
 */
const BASE = import.meta.env.BASE_URL
const PREFIX = 'audio-'
// Used only when no service worker is in control (the dev server, a first
// visit): the clip is kept here so the state is honest, and the worker drops
// this cache when it activates.
const LOCAL = `${PREFIX}local`

export const offlineSupported = () => typeof window !== 'undefined' && 'caches' in window

let manifest = null
/** The ids of every generated clip, or null when the manifest cannot be read. */
export function availableClips() {
  if (!manifest) {
    manifest = fetch(`${BASE}audio/manifest.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((m) => (m ? new Set(Object.keys(m)) : null))
      .catch(() => null)
  }
  return manifest
}

async function audioCache() {
  const names = (await caches.keys()).filter((k) => k.startsWith(PREFIX))
  // The worker's own cache wins over the local stand-in.
  const name = names.filter((k) => k !== LOCAL).sort().pop() || names[0]
  return name ? caches.open(name) : null
}

/** Which of these clip ids are already kept on the phone. */
export async function cached(ids) {
  const out = new Set()
  if (!offlineSupported() || !ids.length) return out
  const c = await audioCache()
  if (!c) return out
  await Promise.all(ids.map(async (id) => { if (await c.match(audio.url(id))) out.add(id) }))
  return out
}

let persisted = false
/** Ask once that the browser never evict what she keeps. */
function persistOnce() {
  if (persisted) return
  persisted = true
  try {
    navigator.storage?.persisted?.().then((yes) => { if (!yes) navigator.storage.persist?.() }).catch(() => {})
  } catch { /* not offered on this browser */ }
}

/**
 * Fetch each clip so the service worker keeps it. Reports progress as
 * onProgress(done, total) and resolves to { total, failed }. Four at a time,
 * so poor signal is not flooded.
 */
export async function precache(ids, onProgress = () => {}) {
  persistOnce()
  const have = await availableClips()
  const want = have ? ids.filter((id) => have.has(id)) : ids
  const kept = await cached(want)
  const todo = want.filter((id) => !kept.has(id))
  let done = want.length - todo.length
  let failed = 0
  onProgress(done, want.length)
  const controlled = !!navigator.serviceWorker?.controller
  const local = controlled ? null : await caches.open(LOCAL)
  const queue = [...todo]
  const worker = async () => {
    while (queue.length) {
      const id = queue.shift()
      try {
        const res = await fetch(audio.url(id))
        if (!res.ok) failed++
        else if (local) await local.put(audio.url(id), res)
      } catch {
        failed++
      }
      done++
      onProgress(done, want.length)
    }
  }
  await Promise.all([worker(), worker(), worker(), worker()])
  return { total: want.length, failed }
}

/**
 * The state of one "keep offline" button:
 *   state  'checking' | 'none' (nothing to keep) | 'idle' | 'saving' | 'done' | 'partial'
 *   value  0 to 1 while saving
 *   keep() starts the download
 */
export function useOffline(ids) {
  const key = ids.join('|')
  const [state, setState] = useState(offlineSupported() ? 'checking' : 'none')
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!offlineSupported()) return
    let live = true
    const list = key ? key.split('|') : []
    availableClips()
      .then((have) => {
        const want = have ? list.filter((id) => have.has(id)) : list
        if (!want.length) return 'none'
        return cached(want).then((kept) => (kept.size >= want.length ? 'done' : 'idle'))
      })
      .then((s) => { if (live) setState(s) })
      .catch(() => { if (live) setState('idle') })
    return () => { live = false }
  }, [key])

  const keep = useCallback(async () => {
    setState('saving')
    setValue(0)
    try {
      const r = await precache(key ? key.split('|') : [], (n, total) => setValue(total ? n / total : 1))
      setState(r.failed ? 'partial' : 'done')
    } catch {
      setState('partial')
    }
  }, [key])

  return { state, value, keep }
}
