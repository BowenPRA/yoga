/* Offline support.
   - The app shell (html, js, css, fonts) is cached as it is fetched and served
     stale-while-revalidate, so the app opens without signal.
   - Audio clips are cached the first time they play and served cache-first,
     because a clip never changes once generated (its id is its content).
   Bump VERSION to drop old caches. */
const VERSION = 'v1'
const SHELL = `shell-${VERSION}`
const AUDIO = `audio-${VERSION}`

self.addEventListener('install', (e) => { self.skipWaiting() })

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => ![SHELL, AUDIO].includes(k)).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)

  // Never cache the AI backend.
  if (url.pathname.startsWith('/api/')) return

  if (url.pathname.includes('/audio/')) {
    e.respondWith(
      caches.open(AUDIO).then(async (c) => {
        const hit = await c.match(req)
        if (hit) return hit
        const res = await fetch(req)
        if (res.ok) c.put(req, res.clone())
        return res
      }),
    )
    return
  }

  if (url.origin === location.origin || url.hostname.endsWith('gstatic.com') || url.hostname.endsWith('googleapis.com')) {
    e.respondWith(
      caches.open(SHELL).then(async (c) => {
        const hit = await c.match(req)
        const net = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res }).catch(() => hit)
        return hit || net
      }),
    )
  }
})
