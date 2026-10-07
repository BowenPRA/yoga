/**
 * Writes every speakable unit in the content to scripts/clips.json so the
 * Python audio generator (which talks to Gemini and ffmpeg) can read it, and
 * the clip ids the lessons play to scripts/priority.json so they are
 * generated first on a day the daily cap may cut the run short.
 * Run: node scripts/export-clips.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { allClips, lessonClipIds, LESSONS } from '../src/lib/content.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const clips = allClips()
fs.writeFileSync(path.join(here, 'clips.json'), JSON.stringify(clips, null, 1))
console.log(`${clips.length} clips -> scripts/clips.json`)

const known = new Set(clips.map((c) => c.id))
const priority = []
for (const L of LESSONS) {
  if (!L.slides) continue
  for (const id of lessonClipIds(L)) {
    if (!known.has(id)) console.warn(`lesson ${L.id} plays a clip that no content produces: ${id}`)
    else if (!priority.includes(id)) priority.push(id)
  }
}
fs.writeFileSync(path.join(here, 'priority.json'), JSON.stringify(priority, null, 1))
console.log(`${priority.length} lesson clips -> scripts/priority.json`)
