# Yoga English

A phone-first app that helps a Vietnamese yoga teacher **teach yoga in English**. It covers anatomy, cueing language, class talk, Sanskrit pose names and philosophy, and the Pali vocabulary of vipassana meditation. Bowen is building it. The planning conversation happened on 2026-10-06 in the Dashboard project.

## The learner

- Vietnamese is her first language. Her English is intermediate: she can follow an English YouTube yoga class, but she is much stronger in Vietnamese.
- She teaches **Vinyasa, Yin and Ashtanga**. She also teaches **vipassana meditation** and probably some philosophy.
- She uses **her phone**. Treat every screen as a phone screen first.

## Product principles

1. **She needs to teach in English, not just study it.** The skill is saying a cue aloud at the right moment, e.g. "Root down through your back heel, lengthen through the crown of your head". Build around listening and speaking. Vocabulary is the raw material.
2. **Vietnamese is the main language, not a translation layer.** The interface is Vietnamese by default, with an English toggle. Every term shows **English, Vietnamese and Sanskrit or Pali** where they apply. Aim for a "support level" that shows less Vietnamese as she improves.
3. **No gamification.** No XP, levels, points, phase gates or unlocks. Motivation comes from usefulness: she opens the app before class because it helps her work. Spaced-repetition review shows what's due today. Quiet progress ("words you know") is fine.
4. **Calm design.** It should feel like a yoga studio, not a classroom app.
5. **Two registers for the body.** Teach both the technical word ("hamstrings", "sacrum", "psoas") and the plain teaching phrase ("the back of your thighs").

## Content domains

- **Body:** bones, joints, muscles, and actions (flexion, extension, rotation, etc.), each with a technical and a plain-English form.
- **Movement and direction language:** action verbs (lengthen, root, draw in, soften, hug, stack, spiral) and position words (toward, away from, in line with, over your ankle). This is where Vietnamese speakers' cues usually go wrong.
- **Breath and rhythm:** "Inhale, reach up… exhale, fold"; "on your next exhale"; "stay for five breaths".
- **Poses:** cover Vinyasa flows, Ashtanga primary series and Yin poses. Each pose has English, Sanskrit and Vietnamese names, its standard cues, modifications and props, and the muscles involved. Yin uses its own pose names and cue style (long holds, "find your edge", passive), and the Ashtanga primary series has a fixed order and vinyasa count.
- **Safety:** modifications, injuries, pregnancy, "if this is too much, you can…", asking before a hands-on adjustment.
- **Talking to students:** welcoming people, asking about injuries, savasana and meditation scripts, closing the class, chatting after class.
- **Philosophy (Sanskrit):** the eight limbs, the yamas and niyamas, pranayama, bandhas, drishti, chakras, mudras, chants.
- **Meditation (Pali, for vipassana):** e.g. anicca, dukkha, anattā, sīla, samādhi, paññā, mettā, vedanā, saṅkhāra, ānāpāna.
- **Bridges from Vietnamese Buddhism:** she already knows many of these ideas through Sino-Vietnamese terms, e.g. karma = nghiệp, dharma/dhamma = pháp, dhyāna = thiền, chakra = luân xa, anicca = vô thường, anattā = vô ngã, mettā = từ. Start from what she knows. **Verify every one of these; don't trust the list above blindly.**

## Pronunciation targets for Vietnamese speakers

- **Dropped final consonants and endings:** hip**s**, knee**s**, re**st**, plural -s, past -ed.
- **Consonant clusters** (Vietnamese has none): **str**etch, **sp**ine, **str**ength, **tw**ist, shoul**ders**.
- **"th":** brea**th**e, **th**igh, **th**umb.
- **Word stress**, because a tonal first language gives every syllable equal weight: HAM-string, QUAD-ri-ceps, ab-DOM-i-nal.
- **Long vs short vowels** as minimal pairs: heel/hill, hip/heap, thigh/tie, breath/breathe, feet/fit.
- **Sanskrit:** show the IAST spelling plus a simple respelling. For audio, use the anglicised studio pronunciation her students will actually say.

## Features: full scope, not a reduced first version

- **Body Map:** tap a figure (bones, muscles, joints, movements) to hear the word, see the Vietnamese and get an example cue.
- **Pose Library:** a card per pose with three names, pronunciation audio, key cues, modifications, and the muscles involved (linked to the Body Map).
- **Listen & Flow:** a native voice cues a full sequence while she follows on the mat.
- **Cue Coach:** she types or says a cue; AI returns a natural teacher version and explains the changes in Vietnamese; the mic checks the hard words.
- **Class Builder:** she picks poses or a style and gets a full script with transitions and breath cues, then rehearses it from a teleprompter.
- **Teacher Talk:** role-play situations with students ("my lower back hurts in this pose").
- **Philosophy & Meditation:** Sanskrit and Pali concepts, chants, and short talk scripts she can adapt.
- **Review:** spaced-repetition review across everything she has met.
- **My Phrasebook:** she saves words and adds her own.
- **"Suggest a fix" on every card:** she can correct content, especially the Vietnamese.

## Reference projects: READ-ONLY

These are readable from here. **Never edit them.** Edits are denied in `.claude/settings.local.json`.

- `C:\Users\bowen\lessons`: the `classroom` app (React + Vite + Tailwind on GitHub Pages). This is the closest template for a standalone app. `src/components/Deck.jsx` and `src/components/layouts/` are the slide renderer, already separated from the Dashboard's login, XP and grading. Its `CLAUDE.md` explains the conventions.
- `C:\Users\bowen\Dashboard`: the big student app. Pieces worth adapting:
  - `src/tasks/LabelIt.jsx`: labelling a diagram (blank boxes on leader lines), a good fit for the Body Map.
  - `src/components/notes/ActivityBlock.jsx`, `ChainActivity.jsx`, `CycleActivity.jsx`: sort, order, hotspot, predict and chain activities.
  - `src/tasks/Notes.jsx` and `src/components/notes/layouts/`: slide decks with checks.
  - `generate_all_audio.py`: the audio pipeline. It uses **edge-tts**, the free Microsoft voices (Aria/Roger). It works but sounds flat, and we want better (see below). Its `speechify()` text clean-up is worth borrowing.
  - Don't bring over: XP, phase gates, unit-complete rules, the arcade, teacher admin, the gradebook, integrity lockdown or student login.
- `C:\Users\bowen\Documents\Y8Science-Backend`: the Vercel serverless backend that calls Gemini (`api/_lib/gemini.js`, model `gemini-3.6-flash`). Use it as the pattern for this app's AI endpoints. The plan is a **separate** backend for this app; if that changes, lift the deny rule first.
- `C:\Users\bowen\.claude\projects\C--Users-bowen-Dashboard\memory\`: notes from the Dashboard sessions, explaining why things were built the way they were. `yoga-english-app.md` holds this app's planning notes.

## Decisions still open

Settle these with Bowen; don't assume them:

- **Text-to-speech provider.** Run a listening test: produce the same samples (a pose cue, a savasana line, a Sanskrit pose name, a Vietnamese explanation) with several current providers and let Bowen choose by ear. Candidates include Gemini TTS (uses the existing Gemini key and can be told how to speak), ElevenLabs, OpenAI and Google Cloud's HD voices, but check what is current. Fixed content is generated once, so even a premium voice is cheap. Only live AI feedback needs live speech.
- **LLM for Cue Coach and Teacher Talk.** Gemini, which already has a key and backend pattern, or Claude? Compare the quality of the Vietnamese explanations on real samples.
- **Speech input.** The browser's Web Speech API, or sending her recording to a model for pronunciation feedback. Behaviour differs between iPhone and Android, so ask Bowen which phone she has.
- **Storage and sync.** Is local-only storage enough, or is cloud sync needed so a lost phone doesn't lose her progress?
- **Hosting and keeping it secret.** GitHub Pages needs a public repo on the free plan. Pick a repo name that won't give the surprise away.
- **Translation review.** AI-written Vietnamese anatomy terms need a human check. Vietnamese medical vocabulary has standard terms, e.g. quadriceps = cơ tứ đầu đùi. Plan a review step.

## Machine notes (Windows)

- **git push and gh-pages deploys fail on authentication** in Claude's shell. Prefix the command with `$env:GCM_INTERACTIVE="auto"; $env:GIT_TERMINAL_PROMPT="1";` and run it with the sandbox disabled. Always push with an explicit path: `git -C C:\Users\bowen\yoga-english push origin main`.
- **The Bash tool halves backslashes,** even inside quoted heredocs. Write any file containing regex, LaTeX or `\n` with the Write or Edit tools, never through Bash.
- **Python scripts that print emoji need UTF-8 output** when piped: `PYTHONIOENCODING=utf-8 PYTHONUTF8=1`.
- **Vercel CLI** is already logged in as `bowenpra`. The GitHub account is `BowenPRA`.
- For dev servers, add a config to `.claude/launch.json` and use `preview_start`. If several checkouts share a `node_modules`, give each its own Vite `cacheDir`.
