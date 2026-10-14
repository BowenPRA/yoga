# Yoga English

A phone-first app that helps a Vietnamese yoga teacher **teach yoga in English**. It covers anatomy, cueing language, class talk, Sanskrit pose names and philosophy, and the Pali vocabulary of vipassana meditation. Bowen is building it as a gift; it is a surprise, so she cannot be asked anything. The planning conversation happened on 2026-10-06 in the Dashboard project. Live at https://bowenpra.github.io/yoga/.

## The learner

- Vietnamese is her first language. Her English is intermediate: she can follow an English YouTube yoga class, but she is much stronger in Vietnamese.
- She teaches **Vinyasa, Yin and Ashtanga**. She also teaches **vipassana meditation** and probably some philosophy.
- She uses **her phone**. Treat every screen as a phone screen first.

## Product principles

1. **She needs to teach in English, not just study it.** The skill is saying a cue aloud at the right moment, e.g. "Root down through your back heel, lengthen through the crown of your head". Build around listening and speaking. Vocabulary is the raw material.
2. **Vietnamese is the main language, not a translation layer.** The interface is Vietnamese by default, with an English toggle. Every term shows **English, Vietnamese and Sanskrit or Pali** where they apply. A "support level" (full / balanced / light) shows less Vietnamese as she improves.
3. **No gamification.** No XP, levels, points, streaks, due counts, phase gates or unlocks. Motivation comes from usefulness: she opens the app before class because it helps her work. Quiet progress ("known", "done") is fine. Spaced-repetition review was tried and removed.
4. **Calm design.** It should feel like a yoga studio, not a classroom app. One tint per place (sage, clay, gold, mist, dusk), Lora headings, Be Vietnam Pro body, nothing bounces, no numbers in progress.
5. **Two registers for the body.** Teach both the technical word ("hamstrings", "sacrum", "psoas") and the plain teaching phrase ("the back of your thighs").
6. **Teach, don't just reference.** Every content area gets an active layer (label, sort, order, hotspot, predict, chain, dictation, say-it with the mic), adapted from the Dashboard app's activities.
7. **Everything is for her.** Nothing student-facing, no accounts, no sharing.

## Content domains

- **Body:** bones, joints, muscles, and actions (flexion, extension, rotation, etc.), each with a technical and a plain-English form.
- **Movement and direction language:** action verbs (lengthen, root, draw in, soften, hug, stack, spiral) and position words (toward, away from, in line with, over your ankle). This is where Vietnamese speakers' cues usually go wrong.
- **Breath and rhythm:** "Inhale, reach up… exhale, fold"; "on your next exhale"; "stay for five breaths".
- **Poses:** Vinyasa flows, the Ashtanga primary series and Yin poses. Each pose has English, Sanskrit and Vietnamese names, its standard cues, modifications and props, and the muscles involved. Yin uses its own pose names and cue style (long holds, "find your edge", passive), and the Ashtanga primary series has a fixed order and vinyasa count.
- **Safety:** modifications, injuries, pregnancy, "if this is too much, you can…", asking before a hands-on adjustment.
- **Talking to students:** welcoming people, asking about injuries, savasana and meditation scripts, closing the class, chatting after class.
- **Philosophy (Sanskrit):** the eight limbs, the yamas and niyamas, pranayama, bandhas, drishti, chakras, mudras, chants.
- **Meditation (Pali, for vipassana):** e.g. anicca, dukkha, anattā, sīla, samādhi, paññā, mettā, vedanā, saṅkhāra, ānāpāna.
- **Bridges from Vietnamese Buddhism:** she already knows many of these ideas through Sino-Vietnamese terms, e.g. karma = nghiệp, dharma/dhamma = pháp, dhyāna = thiền, chakra = luân xa, anicca = vô thường, anattā = vô ngã, mettā = từ. Start from what she knows. Every bridge is checked against the Vietnam Buddhist Sangha's dictionary (links in `content/sources.js`).

## Pronunciation targets for Vietnamese speakers

- **Dropped final consonants and endings:** hip**s**, knee**s**, re**st**, plural -s, past -ed.
- **Consonant clusters** (Vietnamese has none): **str**etch, **sp**ine, **str**ength, **tw**ist, shoul**ders**.
- **"th":** brea**th**e, **th**igh, **th**umb.
- **Word stress**, because a tonal first language gives every syllable equal weight: HAM-string, QUAD-ri-ceps, ab-DOM-i-nal.
- **Long vs short vowels** as minimal pairs: heel/hill, hip/heap, thigh/tie, breath/breathe, feet/fit.
- **Sanskrit:** show the IAST spelling plus a simple respelling. For audio, use the anglicised studio pronunciation her students will actually say.

## What the app is now (2026-10-14)

Five tabs, routes in `src/App.jsx`:

- **Anatomy** (`/anatomy`, the home): greeting, a hero card, the lesson row, the OpenStax figure with traced regions (`content/anatomy/`, 85 terms; figure pipeline `scripts/clean_openstax.py` and `scripts/check_regions.py`). Lessons (`/learn/:id`, `content/lessons/`, one file each) are slide decks with activities, built on `src/lib/lesson.js` and `src/components/lesson/`.
- **Poses** (`/poses`, `/poses/:id`): 118 poses, one file each under `content/poses/<style>/` (schema in `content/poses/README.md`), with search, the Ashtanga series in order and Yin by target.
- **Classes** (`/classes`, `/classes/new`, `/classes/:id`): a local-first planner (`src/lib/planner.js`, `content/planning.js`, `content/themes.js`) that builds a class from a style, a theme, a peak or a student's words, with one Gemini call to tailor it, a rehearsal teleprompter, a taught log and a mat view.
- **Speech** (`/speech`): say it in English from Vietnamese or English, the Cue Coach, and mic feedback on pronunciation, all through the Gemini API.
- **Phrases** (`/phrases`): 236 lines in 16 groups (class talk, breath, safety, the savasana script, a vipassana sit, the Ashtanga count and chants) plus Sanskrit and Pali concept cards with bridges, each playable and leadable.
- Settings sheet: language, support level, theme, the "suggest a fix" outbox (sent by share sheet or mailto), backup and restore of her data, and the Sources page (`content/sources.js`, `docs/SOURCES.md`; no Wikipedia links, by Bowen's rule).

Cut on purpose: Teacher Talk role-play, Listen & Flow as a separate feature (the class rehearsal covers it), spaced-repetition review, anything student-facing.

## Decisions taken

- **Free app, Gemini only.** Bowen pays for Gemini already and wants no second bill: no Claude API, no ElevenLabs, OpenAI or Azure voices. GitHub Pages, Vercel hobby, Gemini free tiers.
- **Text-to-speech:** Gemini 3.8 Flash TTS, voice **Sulafat**, through the Interactions API (the delivery style goes in a `speech_metadata` annotation, never in the text). Fixed content is generated once by `scripts/gen_audio.py` and committed under `public/audio/` with a manifest; 100 requests a day per TTS model, Lite as a fallback, see README "Audio". Live speech only for AI answers (`/api/speak`).
- **LLM:** `gemini-3.8-flash` through the Vercel project `studio-notes-api` (`api/`), the pattern of Y8Science-Backend. One call per feature; the planner never lets Gemini invent poses outside the catalogue.
- **Speech input:** her recording goes to `/api/pronounce`; Vietnamese input uses the phone keyboard's dictation.
- **Storage:** local only (IndexedDB and localStorage) with backup and restore in Settings. No accounts, no sync.
- **Hosting:** public repo `BowenPRA/yoga`, GitHub Pages from `gh-pages` at `/yoga/`; the old `studio-notes` repo only forwards. Deploy commands are in the README and the memory notes.
- **Translation review:** the content is AI-written and reviewed in passes recorded under `content/review/`; the Vietnamese still deserves a native speaker's ear, and each review file lists the lines to show one.

## Reference projects: READ-ONLY

These are readable from here. **Never edit them.** Edits are denied in `.claude/settings.local.json`.

- `C:\Users\bowen\lessons`: the `classroom` app (React + Vite + Tailwind on GitHub Pages), the template this app's shell followed.
- `C:\Users\bowen\Dashboard`: the big student app. Its activities (`src/tasks/LabelIt.jsx`, `src/components/notes/ActivityBlock.jsx`, `ChainActivity.jsx`, `CycleActivity.jsx`, `src/tasks/Notes.jsx`) are the models for this app's lesson activities. Don't bring over XP, phase gates, the arcade, admin, grading, lockdown or login.
- `C:\Users\bowen\Documents\Y8Science-Backend`: the Vercel serverless pattern for Gemini (`api/_lib/gemini.js`).
- `C:\Users\bowen\.claude\projects\C--Users-bowen-Dashboard\memory\`: notes from the Dashboard sessions; `yoga-english-app.md` holds this app's planning notes.

## Working on the content

- `node scripts/check-content.mjs` must report 0 errors before any commit (`--strict` makes warnings errors). It checks ids, clip id patterns, term references, required fields in both languages, the Vietnamese register (never em / cậu / chị / anh; the student is "bạn"), Ashtanga positions, and that every clip a lesson plays exists.
- Never change an existing id: audio clips and her progress hang off them. Changing a line's text is fine; its clip is regenerated from a text hash.
- New poses go in the folder of the style that owns them; new lessons are one file in `content/lessons/`; new sources go in `content/sources.js` and `docs/SOURCES.md`; a quoted thought must be verbatim from a free translation and name its source.

## Machine notes (Windows)

- **git push and gh-pages deploys fail on authentication** in Claude's shell. Prefix the command with `$env:GCM_INTERACTIVE="auto"; $env:GIT_TERMINAL_PROMPT="1";` and run it with the sandbox disabled. Always push with an explicit path: `git -C C:\Users\bowen\yoga-english push origin main`. Vercel: `npx vercel deploy --prod --yes --scope bowenpras-projects` (the explicit `deploy` subcommand; without `--scope` it says "Not authorized").
- **The Bash tool halves backslashes,** even inside quoted heredocs. Write any file containing regex, LaTeX or `\n` with the Write or Edit tools, never through Bash.
- **Python scripts that print emoji need UTF-8 output** when piped: `PYTHONIOENCODING=utf-8 PYTHONUTF8=1`.
- **Vercel CLI** is logged in as `bowenpra` (team `bowenpras-projects`). The GitHub account is `BowenPRA`.
- For dev servers, `.claude/launch.json` has `yoga-english` (vite, autoPort) and `yoga-api` (port 8787); use `preview_start`. Vite's `cacheDir` is `node_modules/.vite-yoga`, so checkouts must not share a `node_modules`.
- **Agent waves:** create the worktrees first, one at a time (`git worktree add -q -b wave<N>-<name> .claude/worktrees/wave<N>-<name> main`), then launch the agents without the harness's worktree isolation and tell each its path and branch: nine concurrent isolated launches raced on the repo lock on 2026-10-14 and eight were refused. Give each agent disjoint files, its own vite port, its own browser tab and its own `npm ci`; shared files get agent-named blocks appended so merges stay clean.
