/**
 * Runs the eval set against the API dev server and saves every answer.
 *
 *   PORT=8798 EVAL_META=1 node api/dev-server.mjs          (in another shell)
 *   node research/eval/run.mjs --out before                 every case
 *   node research/eval/run.mjs --out after --only coach --ids c01-hand-floor,c14-good-warrior1
 *
 * Writes research/eval/<out>/<endpoint>/<id>.json ({ id, input, status, ms,
 * response }) and research/eval/<out>/summary.json (latency and tokens per
 * endpoint). With EVAL_META=1 the server adds `_meta` (model, Gemini ms,
 * usageMetadata) to each answer; the runner moves it out of the response.
 * Never calls /api/speak: the TTS quota belongs to the audio clips.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`)
  return i > -1 ? process.argv[i + 1] : fallback
}
const OUT = arg('out', 'scratch')
const BASE = arg('base', 'http://localhost:8798')
const ONLY = (arg('only', 'coach,translate,plan') || '').split(',').filter(Boolean)
const IDS = (arg('ids', '') || '').split(',').filter(Boolean)
const CONCURRENCY = Number(arg('concurrency', 3))

const load = (f) => JSON.parse(fs.readFileSync(path.join(here, f), 'utf8'))

function jobsFor(endpoint) {
  if (endpoint === 'coach') return load('coach.json').cases.map((c) => ({ id: c.id, body: { cue: c.cue, context: c.context } }))
  if (endpoint === 'translate') return load('translate.json').cases.map((c) => ({ id: c.id, body: { text: c.text } }))
  if (endpoint === 'plan') {
    const d = load('plan.json')
    return d.cases.map((c) => ({ id: c.id, body: { ...c.body, catalog: d.catalog, tags: d.tags } }))
  }
  throw new Error(`unknown endpoint ${endpoint}`)
}

async function call(endpoint, job) {
  const t0 = Date.now()
  let status = 0, response = null
  try {
    const r = await fetch(`${BASE}/api/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(job.body) })
    status = r.status
    response = await r.json().catch(() => null)
  } catch (err) {
    response = { error: String(err.message || err) }
  }
  const ms = Date.now() - t0
  const meta = response?._meta || null
  if (response) delete response._meta
  // The plan's catalogue is the same for every case; keep the saved input readable.
  const input = endpoint === 'plan' ? { request: job.body.request, plan: job.body.plan } : job.body
  return { id: job.id, endpoint, input, status, ms, meta, response }
}

async function pool(items, n, fn) {
  const out = []
  let i = 0
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) { const k = i++; out[k] = await fn(items[k]) }
  }))
  return out
}

const pct = (xs, p) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.floor(p * s.length))] : null }

const summaryFile = path.join(here, OUT, 'summary.json')
const summary = fs.existsSync(summaryFile) ? JSON.parse(fs.readFileSync(summaryFile, 'utf8')) : {}
for (const endpoint of ONLY) {
  const jobs = jobsFor(endpoint).filter((j) => !IDS.length || IDS.includes(j.id))
  if (!jobs.length) continue
  const dir = path.join(here, OUT, endpoint)
  fs.mkdirSync(dir, { recursive: true })
  const results = await pool(jobs, CONCURRENCY, async (job) => {
    const res = await call(endpoint, job)
    fs.writeFileSync(path.join(dir, `${job.id}.json`), JSON.stringify(res, null, 1) + '\n')
    const u = res.meta?.usage || {}
    console.log(`${endpoint} ${job.id} ${res.status} ${(res.ms / 1000).toFixed(1)}s in ${u.promptTokenCount ?? '?'} out ${u.candidatesTokenCount ?? '?'} think ${u.thoughtsTokenCount ?? 0}${res.status !== 200 ? ` ${JSON.stringify(res.response)}` : ''}`)
    return res
  })
  // Re-read every saved case so a partial re-run (--ids) still summarises the whole endpoint.
  const all = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')))
  const ok = all.filter((r) => r.status === 200)
  const ms = ok.map((r) => r.ms)
  const tok = (k) => ok.reduce((s, r) => s + (r.meta?.usage?.[k] || 0), 0)
  summary[endpoint] = {
    cases: all.length, ok: ok.length,
    ms: { mean: Math.round(ms.reduce((a, b) => a + b, 0) / (ms.length || 1)), median: pct(ms, 0.5), p90: pct(ms, 0.9), max: Math.max(...ms) },
    tokensPerCall: ok.length ? {
      prompt: Math.round(tok('promptTokenCount') / ok.length),
      output: Math.round(tok('candidatesTokenCount') / ok.length),
      thinking: Math.round(tok('thoughtsTokenCount') / ok.length),
      total: Math.round(tok('totalTokenCount') / ok.length),
    } : null,
    model: ok[0]?.meta?.model || null,
    ranThisTime: results.length,
  }
}
fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 1) + '\n')
console.log(JSON.stringify(summary, null, 1))
