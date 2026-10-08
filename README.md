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

`.env.local` holds `GEMINI_API_KEY` and, optionally, `VITE_FEEDBACK_EMAIL`
(see `.env.example`). It is gitignored.

## Content and the checker

```bash
node scripts/check-content.mjs            # 0 errors before any commit
node scripts/check-content.mjs --strict   # warnings count as errors
```

It checks ids, clip id patterns (`<pose>__cue-N`, `__mod-N`, `__safe-N`),
that every muscle, joint and lesson term exists in `content/anatomy`,
required fields in both languages, the Vietnamese register (never em / cậu /
chị / anh), Ashtanga positions, and that every clip a lesson plays exists.
Warnings list pose slugs that are referred to but not written yet.

Poses live one per file, in a folder per style; `content/poses/README.md` is
the schema every file follows:

```
content/poses/
  index.js            POSES = ashtanga + vinyasa + yin
  ashtanga/           the primary series in order (Surya A and B, standing, finishing)
    seated/           the seated sequence
  vinyasa/            Vinyasa poses outside the primary series, by family
  yin/                Yin poses under their Yin names
```

`src/lib/content.js` regroups them for the Poses tab: `posesByStyle`,
`familiesOf`, `ashtangaSeries` (by position, grouped by section),
`yinByTarget`, `nextInSeries` / `prevInSeries`, `searchPoses` (English, aka,
Sanskrit and Vietnamese, with or without diacritics), `poseClipIds`.

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

## Offline

`public/sw.js` keeps the app working with no signal. At install it fetches
the page, every same-origin file the built `index.html` names, the figures
and `audio/manifest.json`; the page is network-first and the rest
stale-while-revalidate. Audio is cache-first and answers byte-range requests
from the kept file (Safari needs that to play a clip from a worker). Bump
`VERSION` in `sw.js` when its logic changes or clips are regenerated.

"Keep this pose offline" (bottom of a pose) and "Keep this lesson offline"
(a lesson's first slide) fetch every clip that page plays, through the worker,
with a ring while it downloads and a check when done (`src/lib/offline.js`:
`precache`, `cached`, `useOffline`; it asks once for persistent storage).
Only clips listed in `audio/manifest.json` are fetched, so a pose whose audio
is not generated yet shows no button.

## Suggested fixes

"Suggest a fix" on every card keeps the note on the phone (IndexedDB
`suggestions`, included in the backup). Settings shows how many are waiting
and a "Send to Bowen" button that composes one plain-text message (what each
note is on, the note, its date, the app version) and opens the phone's share
sheet, or, with no share sheet, an email to `VITE_FEEDBACK_EMAIL`. Sent notes
are marked `sentAt` and kept, so nothing is sent twice.

`VITE_FEEDBACK_EMAIL` is read at build time from the environment or
`.env.local`; `scripts/build-pages.mjs` passes it through and also sets
`VITE_APP_VERSION` (package version, commit, date). It ends up in the
published JavaScript, which is public on GitHub Pages, so use an address you
do not mind being readable. With it unset the email opens with no recipient.

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
src/lib/           i18n + support level, store (IndexedDB, progress, suggestions), audio, offline, content registry, figures, tints (a colour per place), api, recorder
src/components/    ui primitives, bottom nav, figure viewer and crops, term sheet, suggest-a-fix, lesson/ (slides, activities)
src/pages/         Poses, Pose, Anatomy (with the lesson row), Lesson, Speech, Phrases
api/               Vercel functions: coach, speak, pronounce; _lib/gemini.js; dev-server.mjs
scripts/           export-clips, gen_audio, build-pages, check-content
public/audio/      generated mp3 clips + manifest
```
