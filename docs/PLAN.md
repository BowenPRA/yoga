# Yoga English: the plan

Draft for Bowen's approval, 6 October 2026. Nothing in the app is built yet; the
listening and coaching tests are in `research/comparison.html`.

## 0. Decisions already made

From Bowen on 6 October 2026:

- **The app must be free to run.** Gemini is the only paid API, and only because
  Bowen is already paying for it. No Claude API. No ElevenLabs, OpenAI or Azure.
- **Full version from the start**, AI features included. No XP or gamification.
- **Vietnamese is the main language**, English a toggle, with a support level
  that shows less Vietnamese as she improves.
- **It is a surprise.** She cannot be asked anything. Bowen answers for her.

What the tests showed (details and audio on the comparison page):

- **Gemini 3.8 Flash TTS is clearly better than edge-tts** for pace, softness and
  the savasana register, and it can be directed ("slow, almost a whisper"). It
  speaks Vietnamese convincingly. Fixed content for the whole app costs about
  $3.60 to generate once, half that on the Lite tier. Prices double on
  1 January 2027, so the audio is generated this year.
- **The 3.8 models use a new request format** (the Interactions API, with a
  separate `style` field). The old prompt-in-text approach makes 3.8 read the
  instructions aloud. The pipeline uses the new format.
- **Gemini 3.8 Flash gives the best Cue Coach output**: natural teacher English,
  Vietnamese explanations that read as if a Vietnamese colleague wrote them,
  sensible pronunciation warnings. It takes 15 to 20 seconds because it thinks
  first. 3.5 Flash-Lite answers in 3 seconds and is nearly as good on the
  English, but its Vietnamese slips in register (it called her "em" and "cậu",
  which is too familiar). The plan is 3.8 Flash with a low thinking level, which
  I will time; Flash-Lite is the fallback if the wait feels long on the phone.

## 1. What we reuse, what we build new

**Reused from the reference projects (read-only; copied, never linked):**

- From `lessons`: the app skeleton. Vite + React 19 + Tailwind, ESLint config,
  the `gh-pages` deploy script, the `app-screen` dvh trick for phones, the dark
  mode hook, the `pick(en, vn)` bilingual pattern (generalised into a support
  level), and the discipline of content as data files with a registry.
- From `Dashboard`: the leader-line label layout from `LabelIt` and
  `utils/labelIt.js` (strip labels from an SVG, place boxes in the margin) for
  the Body Map; the hotspot, sort and order ideas from `ActivityBlock` for review
  exercises; the shape of `generate_all_audio.py` (manifest of expected files,
  generate only what is missing) and a slimmed `speechify()`.
- From `Y8Science-Backend`: `api/_lib/gemini.js` as the pattern for every AI
  endpoint: CORS prelude, JSON response schema, the `asData()` injection guard,
  `fail()` that hides internals. Rewritten against the current Gemini SDK.

**Built new:** everything else. The content schema and all content, the Gemini
TTS pipeline, the body figures, spaced repetition, the Vietnamese-first UI, Cue
Coach, Class Builder, Teacher Talk, Listen & Flow, the phrasebook, "Suggest a
fix", offline support, and the backend project.

Nothing is brought over from the Dashboard's XP, phase gates, arcade, admin,
gradebook, lockdown or login.

## 2. Architecture

### Frontend

- **React 19 + Vite + Tailwind**, hash routing, deployed to **GitHub Pages**
  from a public repo with an innocuous name (see open questions).
- **Installable PWA.** A manifest and a service worker so it opens full screen
  from her home screen and keeps working on the mat with poor signal. Audio is
  cached as she plays it; a "download for offline" button on each pose and
  sequence precaches its clips.
- **State lives on the phone** in IndexedDB (via the small `idb` library):
  review schedule, words she knows, phrasebook, saved classes, settings.
- **No login.** The app is unlisted; she is the only user.

### Backend (AI features only)

A separate Vercel project, Node serverless functions, following the Y8Science
pattern. The Gemini key lives only there.

| Endpoint | Does | Model |
|---|---|---|
| `POST /api/coach` | Cue Coach: natural version, changes explained in Vietnamese, pronunciation warnings | gemini-3.8-flash, low thinking |
| `POST /api/talk` | Teacher Talk: one turn of a student role-play, with a Vietnamese aside | gemini-3.8-flash |
| `POST /api/class` | Class Builder: full script with transitions and breath cues from chosen poses or a style | gemini-3.8-flash |
| `POST /api/speak` | Live speech for AI-written text (corrected cues, generated scripts) | gemini-3.8-flash-lite-tts |
| `POST /api/pronounce` | Optional: her recording of a cue, returns which words to fix, in Vietnamese | gemini-3.8-flash (audio in) |
| `POST /api/suggest` | "Suggest a fix" from any card | no model; stores the suggestion |

Protection without a login: CORS locked to the app's origin, a per-IP rate
limit, and a daily spend cap counted in Vercel KV so a leaked URL cannot run up
a bill. A Gemini budget alert as the backstop.

### Audio

- Fixed content (every term, cue, pose name, script line) is generated once by
  a Python script, like the Dashboard's, but on Gemini TTS. It keeps a manifest
  and only generates missing or changed lines.
- Gemini returns 24 kHz WAV, which is far too big to host (the full set would be
  about 760 MB). The script encodes to **mono MP3 at 48 kbps** (about 95 MB for
  the full set), which every phone plays. That needs `ffmpeg`, not yet
  installed on this machine (see open questions).
- Each clip is one speakable unit: a word, a cue, a script sentence. Sequences
  for Listen & Flow are played clip by clip with configurable pauses, not as one
  long file, so the same clips serve the Pose Library, Review and Flow.
- Sanskrit and Pali audio use the anglicised studio pronunciation, directed
  through the style field with a respelling, as in the test.

### Storage and sync (decision needed)

Local-first is enough for the app to work. The question is what happens if she
loses the phone. Options, cheapest first:

1. **Backup file.** A "Save a backup" button exports her progress as a file she
   can keep in Google Drive or send to herself. Free, no account, no server.
2. **Supabase free tier** with a magic-link login to her email. Progress syncs
   automatically across devices. Free at this scale, but it adds a login step
   and Bowen needs to create the project.

Recommendation: build 1 now, add 2 later if she starts using a second device.

## 3. Content format

Content is JavaScript data under `content/`, one folder per domain, each file
default-exporting an array. Every user-facing string has `en` and `vi`; Sanskrit
and Pali are added where they apply. IDs are stable slugs and double as audio
file names.

### Term (body, movement, breath, safety, philosophy, meditation)

```js
{
  id: 'hamstrings',
  domain: 'body', group: 'muscles',
  en: 'hamstrings',
  plain: 'the back of your thighs',            // the teaching phrase, body domain only
  vi: 'cơ gân kheo',                           // standard Vietnamese anatomy term
  viPlain: 'mặt sau đùi',
  sa: null, pi: null,                           // IAST; set for philosophy / meditation
  say: 'HAM-strings',                           // stress and respelling for her, not the voice
  stress: [1, 0],                               // syllable stress for the display
  traps: ['cluster:str', 'final:ngz'],          // pronunciation targets to drill
  bridge: null,                                 // Sino-Vietnamese bridge, e.g. { term: 'vô thường', note: '...' }
  example: { en: 'Soften your knees to protect your hamstrings.', vi: '...' },
  related: ['forward-fold', 'knee-flexion'],
  bodyMap: { figure: 'back', region: 'hamstrings' },
  audio: ['hamstrings', 'hamstrings__plain', 'hamstrings__example'],
}
```

### Pose

```js
{
  id: 'warrior-2',
  styles: ['vinyasa', 'ashtanga'],              // 'yin' poses use Yin names and cue style
  en: 'Warrior II', sa: 'Vīrabhadrāsana II', say: 'vee-rah-bah-DRAH-sah-nah',
  vi: 'Tư thế Chiến binh II',
  family: 'standing', ashtanga: { series: 'primary', position: 7, vinyasas: 5 },  // optional
  yin: { holdMinutes: 3, target: ['hips'] },                                   // optional
  cues: [ { id: 'warrior-2__cue-1', en: 'Bend your front knee so it stacks over your ankle.', vi: '...', kind: 'alignment' }, ... ],
  breath: { enter: 'exhale', hold: '5 breaths' },
  modifications: [ { en: 'Shorten your stance if your front knee complains.', vi: '...', props: ['block'] } ],
  safety: [ { en: 'Keep the front knee tracking over the second toe.', vi: '...' } ],
  muscles: { working: ['quadriceps', 'gluteus-medius'], lengthening: ['hip-adductors'] },  // term ids
  transitionsTo: ['reverse-warrior', 'extended-side-angle'],
  image: 'poses/warrior-2.svg',
}
```

### Cue and script line

Cues inside poses, and lines inside scripts, share one shape: `{ id, en, vi,
kind, audio }`, where `kind` is one of `alignment`, `breath`, `transition`,
`soften`, `safety`, `welcome`, `closing`, `meditation`. The Cue Coach returns the
same shape so a corrected cue can be saved straight into her phrasebook.

### Script (savasana, meditation, welcome, closing, philosophy talk)

```js
{ id: 'savasana-short', kind: 'savasana', minutes: 5,
  title: { en: 'A short savasana', vi: 'Savasana ngắn' },
  lines: [ { id: 'savasana-short__1', en: 'Let your whole body become heavy.', vi: '...', pauseAfter: 6 }, ... ],
  adaptable: ['minutes', 'theme'] }
```

### Sequence (Listen & Flow)

```js
{ id: 'sun-a', style: 'vinyasa', title: {...},
  steps: [ { pose: 'mountain', cue: 'mountain__cue-1', breath: 'inhale', seconds: 4 }, ... ] }
```

### Situation (Teacher Talk)

```js
{ id: 'lower-back-pain', title: {...}, student: { en: 'My lower back hurts in this pose.', vi: '...' },
  goodAnswers: [...], phrases: ['if-this-is-too-much', 'bend-your-knees'], }
```

### Review cards

Not authored. Derived at build time from every term, pose name, cue and script
line she has met: say-it (hear Vietnamese, say the English, then compare), hear-it
(hear English, pick or type the meaning), and name-the-pose (picture to three
names). Scheduling uses a simple FSRS-style algorithm stored per card in
IndexedDB. "Met" means she opened the card or it appeared in a class she built.

## 4. Screens

Phone first; the layout also works on a laptop. Five tabs along the bottom:

1. **Home (Hôm nay).** Review due today, "before class" quick links (the
   sequence or script she used last), and one gentle line, not a streak.
2. **Learn (Học).** Body Map, Pose Library, Philosophy & Meditation. The Body
   Map is a front and back figure; tapping a region plays the word and opens
   its term card with the plain phrase, the Vietnamese, an example cue and the
   poses that use it. The Pose Library filters by style and family; a pose card
   has the three names with audio, cues (each tappable), modifications and
   props, muscles (linked to the Body Map), and "add to class".
3. **Practice (Luyện).** Cue Coach (type or dictate, get the natural version
   with Vietnamese explanations, hear it, save it), Teacher Talk (role-play with
   a Vietnamese aside), Listen & Flow (a native voice cues a sequence while she
   follows, with a big pause button), Class Builder (pick poses or a style, get a
   script, rehearse from a teleprompter).
4. **Review (Ôn).** Today's cards, a few minutes at a time. Quiet progress:
   "words you know", nothing else.
5. **Mine (Của tôi).** Phrasebook, saved classes, settings: language and support
   level, voice choice, offline downloads, backup.

Every card has a small "Suggest a fix" link. Every English word or phrase plays
on tap. The look: warm off-white, sage and clay accents, a serif for headings
and a system sans for text, generous spacing, one primary action per screen.
No confetti.

**Support level** (in settings, changeable any time): *Full* shows Vietnamese
first with English beneath; *Balanced* shows English first with Vietnamese
beneath; *Light* shows English with Vietnamese on tap. The interface language
itself is Vietnamese or English, separately.

## 5. Build order

1. **Foundation.** Repo and Vercel project, Vite app with the design tokens,
   bottom navigation, the content loader and registry, the audio player with
   caching, the IndexedDB store, support level and language, the PWA shell, the
   backend skeleton with `/api/coach` live, deploys of both.
2. **Vertical slice.** Three poses in full, one per style: Warrior II (Vinyasa),
   Downward-Facing Dog (Ashtanga, with its place in the primary series) and
   Sleeping Swan (Yin). Each with cues, modifications, audio, muscles linked to a
   first body figure, and review cards. Cue Coach working end to end, including
   speaking the corrected cue. Bowen judges look and feel here.
3. **Content, in this order.** Body (bones, joints, muscles, actions, both
   registers). Movement and direction language. Breath and rhythm. Poses:
   Vinyasa core (about 40), Ashtanga primary series (in order, with vinyasa
   counts), Yin (about 25). Safety. Talking to students. Philosophy. Pali for
   vipassana, with the Sino-Vietnamese bridges.
4. **Listen & Flow, Class Builder, Teacher Talk.**
5. **Review polish, phrasebook, Suggest a fix, offline downloads, backup.**
6. **Vietnamese and anatomy review pass** (section 6), then full audio
   generation and the final deploy.

Each step ends deployed. Audio is generated per step so a half-built app is
never silent.

## 6. Checking the Vietnamese and the anatomy

The risk is confident, wrong content that she, being a professional, will spot.

- **A controlled vocabulary for anatomy.** Before writing any body content, build
  `content/glossary/anatomy-vi.js`: the standard Vietnamese medical term for
  every bone, joint, muscle and action we use (quadriceps = cơ tứ đầu đùi,
  hamstrings = cơ gân kheo, sacrum = xương cùng, psoas = cơ thắt lưng chậu, and
  so on), each with its source. Content may only use terms from the glossary.
  Sources: Vietnamese anatomy textbooks and the Vietnamese medical dictionary,
  checked via web search; where sources disagree, both forms are recorded and
  the commoner one shown.
- **Two-pass generation.** Gemini writes the Vietnamese with the glossary in its
  prompt and an explicit register ("as a Vietnamese yoga teacher speaks to a
  colleague, polite and neutral, never 'em'"). A second, independent Gemini call
  reviews each batch as a Vietnamese yoga teacher and flags anything unnatural
  or wrong; flagged items are rewritten and re-reviewed. The review notes are
  kept in `content/review/`.
- **Anatomy claims are conservative.** Muscles per pose come from standard
  references (Kaminoff and Matthews, *Yoga Anatomy*; Long, *The Key Muscles of
  Yoga*), cross-checked by a second model pass. Where references differ we list
  fewer muscles rather than more.
- **Sanskrit and Pali** use IAST spellings checked against the standard
  dictionaries (Monier-Williams; the Pali Text Society dictionary). The
  anglicised respelling is what her students will say.
- **The bridges.** My own check of the list in CLAUDE.md: karma = nghiệp,
  dharma/dhamma = pháp, dhyāna = thiền, chakra = luân xa, anicca = vô thường,
  anattā = vô ngã, mettā = từ (as in từ bi), dukkha = khổ, sīla = giới,
  samādhi = định, paññā = tuệ (also bát-nhã), vedanā = thọ, saṅkhāra = hành,
  ānāpāna(sati) = niệm hơi thở (an-ban thủ ý). All are standard Sino-Vietnamese
  Buddhist terms and I am confident in them, but each will be re-checked
  against a Vietnamese Buddhist dictionary during step 3 and the source noted.
- **Her own corrections.** "Suggest a fix" on every card is the last line.
  Suggestions arrive to Bowen (see open questions) and are folded back into the
  content files, so the app improves after the reveal.
- **A human reader, if possible.** If Bowen knows any Vietnamese speaker who can
  keep a secret, a one-hour read of the body glossary and the Cue Coach's
  Vietnamese would be worth more than any model pass. Not required.

## 7. Open questions for Bowen

Answer in any order; defaults are in brackets.

1. **Which phone does she have, iPhone or Android?** It decides how speech input
   works (the browser's dictation on iPhone is Siri's; Android Chrome's is
   Google's and better behaved), whether the PWA installs from Safari or Chrome,
   and how audio autoplay is handled.
2. **Which voice?** From the comparison page. [Gemini 3.8 Flash TTS, Sulafat
   for most content, Charon as a second voice for Teacher Talk students.]
3. **Which Cue Coach model?** 3.8 Flash (best Vietnamese, 15 to 20 seconds in
   the test, likely under 10 with low thinking) or Flash-Lite (3 seconds, less
   careful Vietnamese). [3.8 Flash with low thinking; I will measure and fall
   back if it feels slow.]
4. **Sync:** backup file only, or Supabase login to her email? [Backup file
   now, Supabase later if needed.]
5. **Repo name** for GitHub Pages. It is public and appears in the URL.
   Suggestions: `studio-notes`, `asana-notes`, `mat-notes`. [`studio-notes`]
6. **Vercel project name** for the backend, also visible in a URL.
   [`studio-notes-api`]
7. **Her name as the app should greet her**, and the pronoun register the
   Vietnamese should use when the app speaks to her (bạn / chị / cô). [bạn]
8. **Her students:** mostly Vietnamese, mostly foreigners, or mixed? It shapes
   Teacher Talk and the welcome scripts. [mixed]
9. **Speech input:** the browser's free dictation only, or also "check my
   pronunciation", which sends a short recording to Gemini? [both; the recording
   is a few cents a month]
10. **Where should "Suggest a fix" go?** Email to Bowen, a GitHub issue on the
    repo, or a Supabase table? [email to Bowen via a Vercel function]
11. **When is the reveal?** It sets the pace and confirms the audio is
    generated before the January price change.
12. **May I install ffmpeg** (via winget) to compress the audio? [yes]
13. **Does she already teach in English sometimes**, or would this be her first
    English class? It sets the default support level. [Balanced]

## 8. Running costs, for the record

| Item | One-off | Per month |
|---|---|---|
| Hosting (GitHub Pages, Vercel hobby) | $0 | $0 |
| Fixed audio, Gemini 3.8 Flash TTS, about 4.4 hours | about $3.60 | — |
| Cue Coach, Teacher Talk, Class Builder at a few uses a day | — | $1 to $4, often within the free tier |
| Live speech for AI text | — | under $1.50 |

Everything else is free. Gemini's standard prices double on 1 January 2027, so
the monthly figures roughly double then; the one-off audio should be done
before.
