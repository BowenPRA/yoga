# Where the content comes from

The app says, on every pose and on the Sources page (`#/sources`, also
reachable from Settings), where its poses, philosophy and anatomy come from,
and what was written here. The registry is `content/sources.js`; this file
is the same list for people reading the repo, with notes on how each source
is used and what its licence allows.

**The honest line first.** Every cue, modification, safety line, Vietnamese
translation, class plan, and the "say it in class" sentence under each
thought was written for this app (Bowen with AI help) in the voice of a
native teacher, then checked against the references below. Nothing is copied
from a book or a website. Corrections arrive through "Suggest a fix".

## Poses

| Source | What we take from it | Licence |
| --- | --- | --- |
| [List of asanas](https://en.wikipedia.org/wiki/List_of_asanas), Wikipedia | Names, Sanskrit spellings, pose types, the earliest text each pose appears in; its Yin Yoga column maps Yin names to hatha equivalents | CC BY-SA 4.0 |
| One Wikipedia article per pose, named in each pose file's `wiki` field | What the name means, where the pose comes from, usual variations | CC BY-SA 4.0 |
| [Surya Namaskar](https://en.wikipedia.org/wiki/Surya_Namaskar), Wikipedia | The order of Sun Salutation A and B as Ashtanga teaches them, and the sequence's origin | CC BY-SA 4.0 |

`scripts/check-content.mjs` warns about any pose without a `wiki` title.
The matching was done with the Wikipedia search API on the Sanskrit name,
then each match was read by hand before it was written into the pose file.

## Ashtanga

| Source | What we take from it | Licence |
| --- | --- | --- |
| [Ashtanga vinyasa yoga](https://en.wikipedia.org/wiki/Ashtanga_vinyasa_yoga), Wikipedia | The shape of the practice (five A, five B, standing, seated, finishing; five breaths a pose; Mysore style); Krishnamacharya to K. Pattabhi Jois | CC BY-SA 4.0 |
| [Primary Series: Yoga Chikitsa](https://www.ashtangayoga.info/ashtanga-yoga/primary-series-yoga-chikitsa/), AshtangaYoga.info | The pose-by-pose order and the vinyasa counts behind `ashtanga.position` and `ashtanga.vinyasas` | Free to read, copyrighted (cited, not copied) |

## Yin

| Source | What we take from it | Licence |
| --- | --- | --- |
| [Yin Yoga](https://en.wikipedia.org/wiki/Yin_Yoga), Wikipedia | Origin (Paulie Zink, Paul Grilley, Sarah Powers), long passive holds, which hatha poses the Yin names correspond to | CC BY-SA 4.0 |
| [Yin Yoga asanas](https://yinyoga.com/yinsights/yin-yoga-asanas/) and [Counter poses](https://yinyoga.com/yinsights/counter-poses/), Bernie Clark | The Yin pose names, target areas, holds, counterpose and rebound principles | Free to read, copyrighted (cited, not copied) |

## Sequencing

The Class Builder's arc (arrive, warm, build, peak, undo, rest) and its
"reading the plan" notes follow the prepare / peak / compensate teaching of
the Krishnamacharya tradition as Olga Kabel describes it on
[sequencewiz.org](https://sequencewiz.org/2015/04/08/compensation-postures/),
and Bernie Clark's counterpose rules for Yin. The rules themselves are in
`content/planning.js` (`COUNTERS`) and `src/lib/planner.js` (`checkPlan`,
`prepScore`, `compensationFor`).

## Philosophy: the thoughts for a class

`content/themes.js` quotes, word for word, translations that are public
domain or CC0. The Vietnamese under each quote is this app's own rendering
and is labelled so on screen.

| Text | Translation used | Where | Licence |
| --- | --- | --- | --- |
| Patañjali, Yoga Sutras 1.2, 1.14, 1.33, 1.34, 2.35, 2.42, 2.46, 2.47 | Charles Johnston, *The Yoga Sutras of Patanjali*, 1912 | [sacred-texts.com/hin/ysp](https://sacred-texts.com/hin/ysp/) | Public domain |
| Svātmārāma, Hatha Yoga Pradipika 1.66 (Sinh's numbering), 2.2 | Pancham Sinh, 1914 | [sacred-texts.com/hin/hyp](https://sacred-texts.com/hin/hyp/) | Public domain |
| Bhagavad Gita 2.47, 2.48 | K. T. Telang, *Sacred Books of the East* vol. 8, 1882 | [sacred-texts.com/hin/sbe08](https://sacred-texts.com/hin/sbe08/) | Public domain |
| Satipaṭṭhāna Sutta (MN 10), Mettā Sutta (Snp 1.8) | Bhikkhu Sujato | [suttacentral.net](https://suttacentral.net/) | CC0 |

Telang renders *yoga* as "devotion"; the Vietnamese keeps *yoga*. Johnston's
English is heavier than the Sanskrit (1.2 is the stilling of the movements
of the mind); the on-screen meaning says so where it matters.

## Meditation and the Vietnamese bridges

The Sanskrit and Pali concept cards in `content/phrases.js` each carry a
`source` for the Sino-Vietnamese term they bridge to, nearly all on
[Vietnamese Wikipedia](https://vi.wikipedia.org/) (CC BY-SA 4.0).
SuttaCentral also carries Thích Minh Châu's Vietnamese translations of the
suttas quoted above.

## Anatomy

| Source | What we take from it | Licence |
| --- | --- | --- |
| [Anatomy and Physiology 2e](https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction), OpenStax, 2022 | Muscle and bone names, their actions, figure 11.5 | CC BY-NC-SA 4.0. Required line: "Access for free at https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction" |
| [1105 Anterior and Posterior Views of Muscles](https://commons.wikimedia.org/wiki/File:1105_Anterior_and_Posterior_Views_of_Muscles_enko_png.svg), Pk0001 after OpenStax, Wikimedia Commons | The muscle figure, cleaned of its leader lines by `scripts/clean_openstax.py` | CC BY-SA 4.0 |
| [Human skeleton front](https://commons.wikimedia.org/wiki/File:Human_skeleton_front_en.svg) and back, LadyofHats, Wikimedia Commons | The skeleton on the Bones tab | Public domain |

OpenStax moved its textbooks to CC BY-NC-SA in 2025 or 2026 (the 1e preface
still says CC BY 4.0). The app is non-commercial; a redrawn figure stays
under the same licence. `research/anatomy/sources.json` records every figure
that was considered, with its licence and author.

## Adding a source

1. Add an entry to `content/sources.js` (id, `covers`, title, by, year, url,
   licence, bilingual note). The checker rejects unknown licences and areas.
2. Point at it: a pose's `wiki` title, a theme's `source`, a concept card's
   `source`.
3. Add it to this file.
