/**
 * The backend: Vercel functions in /api. In dev the local server from
 * `npm run api` answers on 8787. The production URL is set at build time.
 */
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787'

async function post(path, body, as = 'json') {
  const r = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!r.ok) {
    let msg = `HTTP ${r.status}`
    try { msg = (await r.json()).error || msg } catch { /* keep */ }
    throw new Error(msg)
  }
  return as === 'blob' ? r.blob() : r.json()
}

export const api = {
  coach: (cue, context) => post('/api/coach', { cue, context }),
  speak: (text) => post('/api/speak', { text }, 'blob'),
  /** Her recording (base64 WAV) against the text she meant to say. */
  pronounce: (audio, target, say) => post('/api/pronounce', { audio, target, say }),
}
