# Yoga English

A phone-first app that helps a Vietnamese yoga teacher teach yoga in English.
The brief is `CLAUDE.md`; the plan is `docs/PLAN.md`; the voice and coaching
tests are `research/comparison.html`.

## Run it

```bash
npm install
npm run dev          # the app on http://localhost:5178
npm run api          # the AI endpoints on http://localhost:8787 (needs .env.local)
npm run lint
npm run build
```

`.env.local` holds `GEMINI_API_KEY` (see `.env.example`). It is gitignored.

## Audio

Fixed audio is generated once with Gemini 3.8 Flash TTS, voice Sulafat, and
encoded to mono MP3 with ffmpeg:

```bash
node scripts/export-clips.mjs                  # content -> scripts/clips.json (+ priority.json: what the lessons play)
python scripts/gen_audio.py [--dry] [--only id]  # only missing or changed clips
python scripts/gen_audio.py --priority scripts/priority.json   # lesson clips first
```

`public/audio/manifest.json` records what each clip says and which model made
it, so a changed line is regenerated and an unchanged one is not, and clips
made on a fallback model are redone the next time the Flash model runs.

Each Gemini TTS model allows 100 requests a day (reset about 07:30 Vietnam
time). On a capped day: `--model gemini-3.8-flash-lite-tts`, and failing that
`--model gemini-2.5-flash-preview-tts --priority-only --single` (slow, one
clip per request, but a separate cap).

## Lessons

`content/lessons/<region>.js` is a deck: term slides (which term, which crop
of the figure, which cues, the "when a student hurts" line) and activity
slides. Activity types, each a Dashboard idea on the anatomy content:
`label` (leader lines to boxes on a figure crop), `sort` (a pose's working
and stretching muscles), `order` (a pose's cues), `hotspot` (hear it, tap
where you feel it), `predict`, `chain` (build a cue from pieces),
`dictation`, `sayit` (record, Gemini answers in Vietnamese via
`/api/pronounce`). Progress is in IndexedDB (`progress` store): a lesson is
done or not; a term is known once labelled, said and used in a cue.

## Deploy

- **App:** GitHub Pages from the `gh-pages` branch of `BowenPRA/studio-notes`,
  served at `https://bowenpra.github.io/studio-notes/`.
  `npm run deploy` builds with the right base path and API URL and pushes.
- **API:** Vercel project `studio-notes-api` (functions in `api/`),
  `https://studio-notes-api.vercel.app`. `npx vercel --prod` deploys. Env vars
  live in Vercel: `GEMINI_API_KEY`, `ALLOWED_ORIGINS`.

## Layout

```
content/           data: anatomy (muscles, bones, movements, figure regions), poses, phrases, lessons
src/lib/           i18n + support level, store (IndexedDB, progress), audio, content registry, figures, tints (a colour per place), api, recorder
src/components/    ui primitives, bottom nav, figure viewer and crops, term sheet, suggest-a-fix, lesson/ (slides, activities)
src/pages/         Poses, Pose, Anatomy (with the lesson row), Lesson, Speech, Phrases
api/               Vercel functions: coach, speak, pronounce; _lib/gemini.js; dev-server.mjs
scripts/           export-clips, gen_audio, build-pages
public/audio/      generated mp3 clips + manifest
```
