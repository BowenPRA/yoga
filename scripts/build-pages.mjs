/**
 * Production build for GitHub Pages. Sets the repo base path and the API URL,
 * then runs vite build. Override with env vars if the names ever change:
 *   PAGES_BASE=/studio-notes/  API_BASE=https://studio-notes-api.vercel.app
 */
import { execSync } from 'node:child_process'

const base = process.env.PAGES_BASE || '/studio-notes/'
const api = process.env.API_BASE || 'https://studio-notes-api.vercel.app'

console.log(`building for ${base} with API ${api}`)
execSync('npx vite build', {
  stdio: 'inherit',
  env: { ...process.env, BASE_PATH: base, VITE_API_BASE: api },
})
