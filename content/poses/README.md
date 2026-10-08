# Poses: the schema every pose file follows

One pose per file, default-exporting nothing: each file exports a named
const, and the folder's `index.js` lists them in display order. A pose lives
in exactly one folder:

- `ashtanga/`: every pose of the Ashtanga primary series, in sequence order
  (Surya Namaskara A and B, standing, seated, finishing). A pose that every
  Vinyasa class also uses lists both styles: `styles: ['vinyasa', 'ashtanga']`.
- `vinyasa/`: poses common in Vinyasa classes that are not in the primary
  series.
- `yin/`: Yin poses under their Yin names.

Ids are stable kebab-case slugs and double as audio clip names. Where the
anatomy content already refers to a pose (`works`, `stretches`, `poses` in
`content/anatomy/*.js`), use that exact slug: `bridge-pose`, `child-pose`,
`tree-pose`, `camel-pose`, `boat-pose`, `chair-pose`, `cobra`, `plank`,
`chaturanga`, `pigeon`, `shoelace`, `caterpillar`, `saddle`, `dragon`,
`dragonfly`, `frog`, `bananasana`, `supported-fish`, `toe-squat`,
`ankle-stretch`, `happy-baby`, `supine-twist`, `figure-four`, `low-lunge`,
`half-splits`, `wide-legged-fold`, `triangle`, `revolved-triangle`,
`half-moon`, `warrior-1`, `warrior-3`, `eagle-pose`, `dancer-pose`,
`crow-pose`, `side-plank`, `locust-pose`, `bow-pose`, `wheel-pose`,
`fish-pose`, `hero-pose`, `reclined-hero`, `bound-angle`,
`reclined-bound-angle`, `seated-forward-fold`, `seated-twist`, `staff-pose`,
`sphinx`, `puppy-pose`, `cat-pose`, `gate-pose`, `malasana`, `lotus`,
`mountain-pose`, `standing-forward-fold`, `handstand`, `thread-the-needle`,
`reverse-tabletop`, `side-bend`, `squat`.
(`navasana` and `boat-pose` are the same pose: the id is `boat-pose`.)

```js
export const warrior2 = {
  id: 'warrior-2',
  styles: ['vinyasa', 'ashtanga'],         // any of 'vinyasa' | 'ashtanga' | 'yin'
  family: 'standing',                      // see families below
  level: 'moderate',                       // 'gentle' | 'moderate' | 'strong'
  en: 'Warrior II',                        // the name a teacher says in class
  aka: ['Warrior 2'],                      // optional other English names
  sa: 'Vīrabhadrāsana II',                 // IAST, or null (most Yin poses)
  say: 'vee-rah-bah-DRAH-sah-nah TWO',     // studio respelling, stressed syllable in capitals
  vi: 'Chiến binh II',                     // the standard Vietnamese class name
  saNote: { en: '...', vi: '...' },        // optional: when the Sanskrit needs a note

  // One or both of these, by style. Omit for a plain Vinyasa pose.
  ashtanga: {
    series: 'primary',
    section: 'standing',                   // 'surya-a' | 'surya-b' | 'standing' | 'seated' | 'finishing'
    position: 14,                          // order within the whole series, 1-based
    vinyasas: 5,                           // the vinyasa count where it applies, else omit
    breaths: 5,                            // breaths held
    drishti: 'hand',                       // 'nose' | 'third-eye' | 'navel' | 'thumbs' | 'up' | 'hand' | 'toes' | 'right' | 'left'
    note: { en: '...', vi: '...' },        // its place in the sequence, one or two sentences
  },
  yin: {
    holdMinutes: 3,                        // typical hold
    target: ['hips', 'spine'],             // 'hips' | 'spine' | 'hamstrings' | 'quads' | 'shoulders' | 'feet' | 'inner-thighs' | 'chest' | 'neck'
    counter: 'child-pose',                 // optional: the usual counterpose id
    note: { en: '...', vi: '...' },        // what the hold is for and what should NOT be felt
  },

  breath: { en: '...', vi: '...' },        // how to breathe in and out of it, one to three sentences

  // 6 to 9 cues in teaching order: how to get in, alignment, softening,
  // breath, safety, how to come out. Each is one speakable sentence a native
  // teacher would actually say. kind: 'transition' | 'alignment' | 'soften' | 'breath' | 'safety'
  cues: [
    { id: 'warrior-2__cue-1', kind: 'transition', en: 'Step your feet wide apart.', vi: 'Bước hai chân rộng ra.' },
  ],
  // 2 or 3 easier options, props named in `props` ('block' | 'blocks' | 'strap' | 'bolster' | 'blanket' | 'wall' | 'chair')
  modifications: [
    { id: 'warrior-2__mod-1', en: '...', vi: '...', props: ['block'] },
  ],
  // 1 to 3 safety lines: injuries, pregnancy, what should not hurt
  safety: [
    { id: 'warrior-2__safe-1', en: '...', vi: '...' },
  ],
  // Only ids that exist in content/anatomy (muscles, bones, joints). Be
  // conservative: list fewer muscles rather than more; a muscle is "working"
  // when it contracts to hold the shape and "lengthening" when it is stretched.
  muscles: { working: ['quadriceps', 'gluteus-medius'], lengthening: ['hip-adductors', 'iliopsoas'] },
  joints: ['knee', 'hip-joint'],
  transitionsTo: ['reverse-warrior', 'extended-side-angle'],   // pose ids; may name poses not yet written
  counterPoses: ['child-pose'],                                  // optional
  figure: 'warrior-2',
}
```

Families: `sun-salutation`, `standing`, `balance`, `forward-fold`, `backbend`,
`twist`, `hip-opener`, `inversion`, `arm-balance`, `seated`, `supine`,
`prone`, `core`, `restorative`.

Variants of one pose (Janu Sirsasana A, B, C; Marichyasana A to D; Prasarita
Padottanasana A to D) are one entry with the variants described in the cues
and the note; the id is the family name (`janu-sirsasana`, `marichyasana`,
`wide-legged-fold`). Right and left sides are never separate poses.

## Language

- English cues are what a calm native teacher says: short, plain, present
  tense, "your" not "the" for body parts, numbers as words. No textbook
  anatomy in a cue unless a teacher would really say it ("hamstrings" yes,
  "biceps femoris" no).
- Vietnamese is what the line means, in the register of a yoga teacher
  speaking to a class, polite and neutral. Address students as "bạn". Never
  "em", "cậu", "chị", "anh". Use the standard Vietnamese anatomy terms that
  `content/anatomy/*.js` already uses (`vi` and `viPlain` fields): the pose
  files may only name body parts with those words.
- Pose names in Vietnamese are the names Vietnamese studios use (Chó úp mặt,
  Chiến binh II, Tam giác, Cái cây, Em bé, Rắn hổ mang, Cây cầu, Lạc đà, Bồ
  câu, Con thuyền, Thiên nga ngủ). When a name is not established, write a
  short descriptive name rather than a word-for-word gloss of the Sanskrit.
- Sanskrit is IAST (ā, ī, ū, ṣ, ś, ṭ, ṇ, ṃ). `say` is the anglicised studio
  pronunciation her students will recognise.

Run `node scripts/check-content.mjs` after editing: it checks ids, clip id
patterns, term references, required fields and the Vietnamese register.
