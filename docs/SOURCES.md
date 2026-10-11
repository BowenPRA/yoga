# Where the content comes from

The app says, on every pose and on the Sources page (`#/sources`, also
reachable from Settings), where its poses, philosophy and anatomy come from,
and what was written here. The registry is `content/sources.js`; this file
is the same list for people reading the repo, with notes on how each source
is used and what its licence allows. Not everything needs a source: the
point is that the names, the traditions, the philosophy and the anatomy can
each be traced to a text a teacher would recognise.

**The honest line first.** Every cue, modification, safety line, Vietnamese
translation, class plan, and the "say it in class" sentence under each
thought was written for this app (Bowen with AI help) in the voice of a
native teacher, then checked against the references below. Nothing is copied
from a book or a website. Corrections arrive through "Suggest a fix".

## Poses

| Source | What we take from it | Licence |
| --- | --- | --- |
| *Haṭha Yoga Pradīpikā*, Svātmārāma, tr. Pancham Sinh (1914), [sacred-texts.com/hin/hyp](https://sacred-texts.com/hin/hyp/) | Chapter 1 describes fifteen āsanas. Nine of ours are named there and carry the verse in `refs` (Gomukhāsana, Vīrāsana, Kūrmāsana, Kukkuṭāsana, Dhanurāsana, Matsyendrāsana, Paścimottānāsana, Śavāsana, Padmāsana). Verse numbers follow Sinh's edition, which runs two ahead of most modern editions. | Public domain |
| *Gheraṇḍa Saṃhitā*, tr. Rai Bahadur Srisa Chandra Vasu (1914–15), [archive.org](https://archive.org/details/in.ernet.dli.2015.36514) | The second lesson describes thirty-two āsanas. Sixteen of ours carry a verse in `refs`, among them Bhujaṅgāsana 2.42–43, Śalabhāsana 2.39, Uṣṭrāsana 2.41, Vṛkṣāsana 2.36, Garuḍāsana 2.37, Matsyāsana 2.21, Utkaṭāsana 2.27, Paścimottānāsana 2.24. Verse numbers follow Vasu's edition. The classical forms differ from the modern ones for several of these; the citation is for the name and its age, not the shape. | Public domain |
| *Light on Yoga*, B. K. S. Iyengar (1966) | The modern reference for Sanskrit names and the standard form of the modern poses (Warrior, Triangle, Downward Dog, Pigeon). Cited by title; any library has it. | Book |
| [Yoga Journal pose library](https://www.yogajournal.com/poses/) | One page per pose: Sanskrit name, how to get in, variations, cautions. Used to check that our cues and modifications match what teachers commonly say. | Free to read, copyrighted (cited, not copied) |

## Ashtanga

| Source | What we take from it | Licence |
| --- | --- | --- |
| [Sharath Yoga Centre, Mysuru](https://sharathyogacentre.com/about-us/), the official site of Paramaguru Sharath Jois, lineage holder | The home of the method: how the series are learned one pose at a time in the Mysore style; the authorised-teacher directory. | Free to read |
| [Primary Series: Yoga Chikitsa](https://www.ashtangayoga.info/ashtanga-yoga/primary-series-yoga-chikitsa/), AshtangaYoga.info (Dr Ronald Steiner) | The pose-by-pose order and the vinyasa counts behind `ashtanga.position` and `ashtanga.vinyasas`. | Free to read, copyrighted (cited, not copied) |

## Yin

| Source | What we take from it | Licence |
| --- | --- | --- |
| [Yin Yoga asanas](https://yinyoga.com/yinsights/yin-yoga-asanas/) and [Counter poses](https://yinyoga.com/yinsights/counter-poses/), Bernie Clark | Every Yin pose in the app links to Clark's page for it in `refs` (26 pages, each checked to load). The Yin pose names, target areas, holds, counterpose and rebound principles. | Free to read, copyrighted (cited, not copied) |

## Sequencing

The Class Builder's arc (arrive, warm, build, peak, undo, rest) and its
"reading the plan" notes follow the prepare / peak / compensate teaching of
the Krishnamacharya tradition as Olga Kabel describes it on
[sequencewiz.org](https://sequencewiz.org/2015/04/08/compensation-postures/),
Mark Stephens' *Yoga Sequencing* (2012, cited by title), and Bernie Clark's
counterpose rules for Yin. The rules themselves are in
`content/planning.js` (`COUNTERS`) and `src/lib/planner.js` (`checkPlan`,
`prepScore`, `compensationFor`).

## Safety

| Source | What we take from it | Licence |
| --- | --- | --- |
| [Yoga: Effectiveness and Safety](https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety), National Center for Complementary and Integrative Health, US NIH (2023) | Who needs modifications: knee and hip injuries, lumbar spine disease, severe high blood pressure, balance problems, glaucoma, pregnancy. The safety lines and the cautions in the Class Builder follow it. The page states it "is not copyrighted and is in the public domain". | Public domain |

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
| Sanskrit terms | Monier-Williams, *A Sanskrit-English Dictionary* (1899) | [Cologne Digital Sanskrit Dictionaries](https://www.sanskrit-lexicon.uni-koeln.de/scans/MWScan/2020/web/index.php) | Free to read |
| Pali terms | Rhys Davids and Stede, *PTS Pali-English Dictionary* (1921–25) | [Digital South Asia Library, Chicago](https://dsal.uchicago.edu/dictionaries/pali/) | Free to read |

Telang renders *yoga* as "devotion"; the Vietnamese keeps *yoga*. Johnston's
English is heavier than the Sanskrit (1.2 is the stilling of the movements
of the mind); the on-screen meaning says so where it matters.

## Meditation and the Vietnamese bridges

SuttaCentral also carries HT Thích Minh Châu's Vietnamese translations of
the Nikāyas, the translation Vietnamese Buddhists read.

| Source | What we take from it | Licence |
| --- | --- | --- |
| [Từ điển Phật học online](https://phatgiao.org.vn/tu-dien-phat-hoc-online.html), Cổng thông tin Phật giáo, Giáo hội Phật giáo Việt Nam (the Vietnam Buddhist Sangha), 2019 | Every Sanskrit and Pali concept card that bridges to a Sino-Vietnamese term (36 cards) links to its entry here in `source`, each page checked to load and to be the right entry. Compiled from the Phật Quang and Đạo Uyển dictionaries among others. The site's footer welcomes copying without citation. Four terms have no exact headword and point at the nearest entry: tứ niệm xứ → chánh niệm, khổ → khổ đế, từ → bốn phạm trú, luân xa → trung khu. | Free to read |

## Anatomy

| Source | What we take from it | Licence |
| --- | --- | --- |
| [Anatomy and Physiology 2e](https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction), OpenStax, 2022 | Muscle and bone names, their actions, figure 11.5 | CC BY-NC-SA 4.0. Required line: "Access for free at https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction" |
| [Anatomy of the Human Body](https://www.bartleby.com/lit-hub/anatomy-of-the-human-body/), Henry Gray, 20th ed. 1918, Bartleby | Where each muscle attaches and what it does; the "does" line of every muscle was checked against it | Public domain |
| Figure credit: [1105 Anterior and Posterior Views of Muscles](https://commons.wikimedia.org/wiki/File:1105_Anterior_and_Posterior_Views_of_Muscles_enko_png.svg), Pk0001 after OpenStax | The muscle figure, cleaned of its leader lines by `scripts/clean_openstax.py`. The licence requires this credit, so it stays on the Sources page as a credit line, not a source. | CC BY-SA 4.0 |
| Human skeleton front and back, Mariana Ruiz Villarreal (LadyofHats) | The skeleton on the Bones tab | Public domain |

OpenStax moved its textbooks to CC BY-NC-SA in 2025 or 2026 (the 1e preface
still says CC BY 4.0). The app is non-commercial; a redrawn figure stays
under the same licence. `research/anatomy/sources.json` records every figure
that was considered, with its licence and author.

## Adding a source

1. Add an entry to `content/sources.js` (id, `covers`, title, by, year, url,
   licence, bilingual note). The checker rejects unknown licences and areas.
2. Point at it: a pose's `refs` (`{ source, ref, url? }`), a theme's
   `source`, a concept card's `source`.
3. Add it to this file.
