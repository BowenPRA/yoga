/* Offline support.
   - Install: the app shell is fetched and kept at once: the page, every
     same-origin file the built index.html names (the hashed js and css, the
     manifest, the icons), the figures and the audio manifest. Without this a
     first visit keeps nothing, because the page loads before the worker
     exists.
   - The page is network-first, so a new deploy shows on the first open;
     other shell files are stale-while-revalidate.
   - Audio (*.mp3) is cache-first, because a clip id is a line of content:
     the first fetch keeps the whole file and later requests are answered from
     it, including the byte ranges an <audio> element asks for (Safari will not
     play a clip from a worker without them). src/lib/offline.js fetches a
     pose's or a lesson's clips ahead of time through this route, and finds
     this cache by its `audio-` prefix.
   Bump VERSION to drop old caches (a regenerated clip keeps its id). */
const VERSION = 'v3'
const SHELL = `shell-${VERSION}`
const AUDIO = `audio-${VERSION}`
const SCOPE = self.registration.scope
const EXTRA = ['anatomy/muscles-front.jpg', 'anatomy/muscles-back.jpg', 'anatomy/skeleton-front.svg', 'audio/manifest.json']

async function precacheShell() {
  const c = await caches.open(SHELL)
  const page = await fetch(SCOPE, { cache: 'no-cache' })
  if (!page.ok) return
  const html = await page.clone().text()
  await c.put(SCOPE, page)
  const urls = new Set(EXTRA.map((p) => new URL(p, SCOPE).href))
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const u = new URL(m[1], SCOPE)
    if (u.origin === location.origin) urls.add(u.href)
  }
  await Promise.all([...urls].map(async (u) => {
    try {
      const res = await fetch(u, { cache: 'no-cache' })
      if (res.ok) await c.put(u, res)
    } catch { /* kept on first use instead */ }
  }))
}

self.addEventListener('install', (e) => {
  e.waitUntil(
    Promise.all([precacheShell().catch(() => {}), caches.open(AUDIO)]).then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => ![SHELL, AUDIO].includes(k)).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  )
})

/** A 206 slice of a whole cached response, for a Range request. */
async function slice(res, header) {
  const buf = await res.arrayBuffer()
  const size = buf.byteLength
  const m = /bytes=(\d*)-(\d*)/.exec(header || '')
  let start = 0
  let end = size - 1
  if (m && m[1]) {
    start = Number(m[1])
    if (m[2]) end = Math.min(Number(m[2]), size - 1)
  } else if (m && m[2]) {
    start = Math.max(0, size - Number(m[2]))
  }
  if (start >= size || start > end) {
    return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } })
  }
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'audio/mpeg',
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes',
    },
  })
}

async function audioResponse(req) {
  const c = await caches.open(AUDIO)
  const range = req.headers.get('range')
  let whole = await c.match(req.url)
  if (!whole) {
    // Fetch the whole file (never a range) so it can be kept.
    const res = await fetch(req.url)
    if (res.status !== 200) return res
    await c.put(req.url, res.clone())
    whole = res
  }
  return range ? slice(whole, range) : whole
}

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)

  // Never cache the AI backend.
  if (url.pathname.startsWith('/api/')) return

  if (url.origin === location.origin && url.pathname.endsWith('.mp3')) {
    e.respondWith(audioResponse(req).catch(() => Response.error()))
    return
  }

  // The page itself is network-first, so a new deploy shows on the first
  // open and the cached copy only serves when there is no signal.
  if (req.mode === 'navigate') {
    e.respondWith(
      caches.open(SHELL).then(async (c) => {
        try {
          const res = await fetch(req)
          if (res.ok) c.put(req, res.clone())
          return res
        } catch {
          return (await c.match(req)) || (await c.match(SCOPE)) || Response.error()
        }
      }),
    )
    return
  }

  if (url.origin === location.origin || url.hostname.endsWith('gstatic.com') || url.hostname.endsWith('googleapis.com')) {
    e.respondWith(
      caches.open(SHELL).then(async (c) => {
        const hit = await c.match(req)
        const net = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res }).catch(() => hit || Response.error())
        return hit || net
      }),
    )
  }
})
