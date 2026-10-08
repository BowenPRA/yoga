/**
 * Production build for GitHub Pages. Sets the repo base path, the API URL and
 * the app version, then runs vite build. Override with env vars if the names
 * ever change:
 *   PAGES_BASE=/studio-notes/  API_BASE=https://studio-notes-api.vercel.app
 *
 * VITE_FEEDBACK_EMAIL (from the environment or .env.local) is where "Send to
 * Bowen" addresses its email when the phone has no share sheet. It is passed
 * through as it is; nothing here supplies a default.
 */
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { loadEnv } from 'vite'

const base = process.env.PAGES_BASE || '/studio-notes/'
const api = process.env.API_BASE || 'https://studio-notes-api.vercel.app'
const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
let commit = ''
try { commit = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim() } catch { /* not a checkout */ }
const appVersion = `${version}${commit ? ` (${commit})` : ''} ${new Date().toISOString().slice(0, 10)}`

const feedback = process.env.VITE_FEEDBACK_EMAIL || loadEnv('production', process.cwd(), 'VITE_').VITE_FEEDBACK_EMAIL
console.log(`building ${appVersion} for ${base} with API ${api}`)
if (!feedback) console.log('note: VITE_FEEDBACK_EMAIL is not set, so "Send to Bowen" opens an email with no recipient when there is no share sheet')

execSync('npx vite build', {
  stdio: 'inherit',
  // process.env carries VITE_FEEDBACK_EMAIL through when it is set there;
  // otherwise vite reads it from .env.local itself.
  env: { ...process.env, BASE_PATH: base, VITE_API_BASE: api, VITE_APP_VERSION: appVersion },
})
