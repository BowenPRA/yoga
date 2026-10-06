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
node scripts/export-clips.mjs                  # content -> scripts/clips.json
python scripts/gen_audio.py [--dry] [--only id]  # only missing or changed clips
```

`public/audio/manifest.json` records what each clip says, so a changed line is
regenerated and an unchanged one is not.

## Deploy

- **App:** GitHub Pages from the `gh-pages` branch of `BowenPRA/studio-notes`,
  served at `https://bowenpra.github.io/studio-notes/`.
  `npm run deploy` builds with the right base path and API URL and pushes.
- **API:** Vercel project `studio-notes-api` (functions in `api/`),
  `https://studio-notes-api.vercel.app`. `npx vercel --prod` deploys. Env vars
  live in Vercel: `GEMINI_API_KEY`, `ALLOWED_ORIGINS`.

## Layout

```
content/           data: terms (body, movement, breath) and poses
src/lib/           i18n + support level, store (IndexedDB), srs, audio, content registry, api
src/components/    ui primitives, bottom nav, body figure, term sheet, suggest-a-fix
src/pages/         Home, Learn, Poses, Pose, Body, Practice, Coach, Review, Mine
api/               Vercel functions: coach, speak; _lib/gemini.js; dev-server.mjs
scripts/           export-clips, gen_audio, build-pages
public/audio/      generated mp3 clips + manifest
```
