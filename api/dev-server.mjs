/**
 * Runs the Vercel-style handlers locally on :8787 so the app can be developed
 * without deploying. Loads GEMINI_API_KEY from .env.local. Mirrors just enough
 * of Vercel's req/res: req.body (parsed JSON), res.status().json()/.send().
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const envFile = path.join(here, '..', '.env.local')
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

const routes = {
  '/api/coach': () => import('./coach.js'),
  '/api/speak': () => import('./speak.js'),
  '/api/pronounce': () => import('./pronounce.js'),
  '/api/translate': () => import('./translate.js'),
  '/api/plan': () => import('./plan.js'),
}

function wrap(res) {
  let code = 200
  res.status = (c) => { code = c; return res }
  res.json = (o) => { res.writeHead(code, { 'Content-Type': 'application/json', ...res.getHeaders() }); res.end(JSON.stringify(o)) }
  res.send = (b) => { res.writeHead(code, res.getHeaders()); res.end(b) }
  return res
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  const load = routes[url.pathname]
  wrap(res)
  if (!load) return res.status(404).json({ error: 'Not found' })
  let body = ''
  for await (const chunk of req) body += chunk
  req.body = body
  try {
    const mod = await load()
    await mod.default(req, res)
  } catch (err) {
    console.error(err)
    if (!res.headersSent) res.status(500).json({ error: 'Server error' })
  }
})

const port = Number(process.env.PORT || 8787)
server.listen(port, () => console.log(`api dev server on http://localhost:${port}  key: ${process.env.GEMINI_API_KEY ? 'yes' : 'MISSING'}`))
