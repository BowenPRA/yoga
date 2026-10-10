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

## Speech

Two modes, switched at the top of the tab (the choice is kept on the phone):

- **Say it in English**: she types or records what she wants to say, in
  Vietnamese, English or a mix. `/api/translate` returns the line a native
  teacher would say, its meaning back in Vietnamese and up to three chunks
  worth keeping; the voice reads it aloud as soon as it arrives
  (`/api/speak`), and again slower at 0.75. A recording goes to Gemini as
  audio, so either language works on any phone.
- **Coach my English**: her own English cue through `/api/coach`.

Both end with "Now you say it" (`/api/pronounce`). A saved line keeps its
audio in IndexedDB (`voices`, not in the backup), so it plays offline and
spends no TTS request. `audio.unlock()` runs on the tap that asks for
speech, because an iPhone refuses audio that starts seconds after a tap.

## Class Builder

Behind the Poses tab (`#/classes`). She writes what the class is for, or
what a student said, in Vietnamese or English; the class is built on the
phone, with no network:

- `content/planning.js` is what the planner knows that the pose files do
  not: **goals** (hips, hamstrings, backbends, shoulders, spine, core,
  balance, legs, calm, energy, flexibility, inversions, feet, breath,
  meditation), each with bilingual keywords, the families, Yin targets and
  muscles it picks poses by, and its peak poses; **cautions** (knee, lower
  back, wrist, neck, shoulder, pregnancy, hip, hamstring injury, blood
  pressure, ankle), each with the poses and families it removes, a regex
  matched against a pose's own safety lines, a gentle `prefer` sequence,
  the anatomy terms whose lesson "care" lines apply, and phrase lines worth
  saying; which poses are two-sided; each pose's posture (so a class goes
  down to the floor and not back up); and the phrase lines used as bridges
  and class moments.
- `src/lib/planner.js` reads a request (`parseRequest`: longest keyword
  wins, so "cổ tay" is the wrist before "cổ" is the neck; style, minutes
  and level too), scores and screens poses, and builds a plan
  (`buildPlan`): Vinyasa as arrive, warm-up, sun salutations, standing flows
  (right side then left), the heart of the class, the floor, savasana,
  closing; Yin as long holds with rebounds and counterposes; Ashtanga as the
  series itself, cut to the time; and a **student** mode (what to say now,
  a short practice, the poses in class to watch with them). A step keeps the
  pose's own safety line for each caution in play. `scriptOf` turns a plan
  into the lines the voice reads, with the hold after each breath cue;
  `planText` is the share text; `alternatives`, `addable`, `stepFor`,
  `nextHold` serve the editor.
- `/api/plan` is the one Gemini call, made only when she taps it: given her
  words, the built plan and the catalogue of pose ids, it returns a title,
  the opening line, a few cues in the theme, up to three swaps restricted to
  the catalogue, and for a student what to say to them. `applyAI` folds that
  into the plan; when the app could not read the request at all, Gemini's
  goal and caution tags rebuild it. AI-written lines are spoken live
  (`/api/speak`) and kept in `voices` under a hash of the text
  (`src/lib/voice.js`), so each is fetched once.
- Pages: `Classes` (the request, what was understood as chips she can
  correct, style, length, level, goals, cautions, saved classes) and
  `ClassPlan` (the plan by section, each step movable, swappable, removable,
  its hold tappable; add a pose from a sheet; Gemini; share; keep offline;
  **Lead it**, a full-screen teleprompter on `src/lib/useRunner.js`). Drafts
  live in the tab session until saved to IndexedDB `classes`.
- `scripts/check-content.mjs` checks every id the planner names and builds
  a class for every goal, caution and style.

## Deploy

- **App:** GitHub Pages from the `gh-pages` branch of `BowenPRA/yoga`,
  served at `https://bowenpra.github.io/yoga/`.
  `npm run deploy` builds with the right base path and API URL and pushes.
  The repo was called `studio-notes` until 2026-10-09; a separate repo of
  that name now holds only a page that forwards the old address (and its
  `#/route`) to `/yoga/` and unregisters the old service worker. Same
  origin, so her IndexedDB and settings carried over.
- **API:** Vercel project `studio-notes-api` (functions in `api/`),
  `https://studio-notes-api.vercel.app`. `npx vercel --prod` deploys. Env vars
  live in Vercel: `GEMINI_API_KEY`, `ALLOWED_ORIGINS`.

## Layout

```
content/           data: anatomy (muscles, bones, movements, figure regions), poses, phrases, lessons, planning (goals, cautions, postures)
src/lib/           i18n + support level, store (IndexedDB, progress, suggestions), audio, offline, content registry, figures, tints (a colour per place), api, recorder
src/components/    ui primitives, bottom nav, figure viewer and crops, term sheet, suggest-a-fix, lesson/ (slides, activities)
src/pages/         Poses, Pose, Classes + ClassPlan (the Class Builder), Anatomy (with the lesson row), Lesson, Speech, Phrases
api/               Vercel functions: coach, translate, speak, pronounce, plan; _lib/gemini.js; dev-server.mjs
scripts/           export-clips, gen_audio, build-pages, check-content
public/audio/      generated mp3 clips + manifest
```
