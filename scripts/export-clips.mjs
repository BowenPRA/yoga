/**
 * Writes every speakable unit in the content to scripts/clips.json so the
 * Python audio generator (which talks to Gemini and ffmpeg) can read it.
 * Run: node scripts/export-clips.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { allClips } from '../src/lib/content.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const clips = allClips()
fs.writeFileSync(path.join(here, 'clips.json'), JSON.stringify(clips, null, 1))
console.log(`${clips.length} clips -> scripts/clips.json`)
