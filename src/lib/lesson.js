import { useLang } from './i18n.jsx'
import { getTerm, getPose, cueText, lessonClipIds, PHRASE_GROUPS } from './content.js'

/** Deterministic shuffle so a slide shows the same order every visit (from the Dashboard). */
export function seededShuffle(list, seed) {
  let h = 2166136261
  for (const ch of String(seed)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0 }
  const rand = () => { h ^= h << 13; h >>>= 0; h ^= h >> 17; h ^= h << 5; h >>>= 0; return h / 4294967296 }
  const out = [...list]
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  if (out.length > 2 && out.every((x, i) => x === list[i])) out.push(out.shift())
  return out
}

/** The bilingual field of an activity in the interface language. */
export function useText() {
  const { ui } = useLang()
  return (obj) => (obj ? (ui === 'vi' ? obj.vi || obj.en : obj.en || obj.vi) : '')
}

/** The name a lesson shows for a term (its own label, else the term's English). */
export function labelOf(lesson, id) {
  return lesson?.labels?.[id] || getTerm(id)?.en || id
}

// ── Any line a lesson plays ──────────────────────────────────────────────
// A lesson's activities and slides name clips by id. Most are term cues,
// pose lines or the lesson's own lines (`cueText` knows those); a lesson on
// class talk also plays the Phrases tab's lines, `phrase__<line id>`.

const phraseById = new Map(PHRASE_GROUPS.flatMap((g) => g.lines.map((l) => [l.id, l])))

/**
 * The words of any clip id a lesson can play, { en, vi }, or null: a term
 * cue, a pose line, a lesson's own line, a Phrases line (or its `__inclass`
 * sentence), or a term's name or plain phrase.
 */
export function lineOf(clipId) {
  if (!clipId) return null
  const cue = cueText(clipId)
  if (cue) return cue
  const ph = clipId.match(/^phrase__(.+?)(__inclass)?$/)
  if (ph) {
    const l = phraseById.get(ph[1])
    if (!l) return null
    if (!ph[2]) return { en: l.en, vi: l.vi }
    return l.inClass ? { en: l.inClass.en, vi: l.inClass.vi } : null
  }
  const plain = clipId.match(/^(.+)__plain$/)
  const term = getTerm(plain ? plain[1] : clipId)
  if (!term) return null
  return plain ? { en: term.plain, vi: term.viPlain } : { en: term.en, vi: term.vi }
}

/** The pose a pose line belongs to (`<pose>__cue-N`, `__mod-N`, `__safe-N`), or null. */
export function poseOfClip(clipId) {
  const m = String(clipId || '').match(/^(.+)__(cue|mod|safe)-\d+$/)
  return m ? getPose(m[1]) || null : null
}

// ── Parts ────────────────────────────────────────────────────────────────
// A lesson on language rather than a body region opens each of its parts
// with an intro slide that carries a `part`: the words of one moment, heard
// in real cues, and the trap a Vietnamese speaker falls into. The lines the
// lesson wrote itself sit on the slide's `lines` (so the audio exporter
// finds them); `part.cues` names every clip the slide plays, in order,
// whatever content it comes from.
//
//   part: { kicker, title, lead?, tint?, words?: [{ en, vi, say? }],
//           cues: [clip id], mark?: [text to underline], note? }

/** The parts of a lesson, in order. */
export const partsOf = (lesson) => (lesson?.slides || []).filter((s) => s.type === 'intro' && s.part).map((s) => s.part)

/** Every clip a lesson plays, its parts' lines included: what "keep offline" fetches. */
export function lessonPlays(lesson) {
  return [...new Set([...lessonClipIds(lesson), ...partsOf(lesson).flatMap((p) => p.cues || [])])]
}

/**
 * How much a lesson holds, for its card and its first slide: the words she
 * meets (its terms and its parts' words), or, for a lesson of class talk
 * (`count: 'lines'`), the lines she hears.
 */
export function lessonSize(lesson) {
  const parts = partsOf(lesson)
  if (lesson?.count === 'lines') return { n: new Set(parts.flatMap((p) => p.cues || [])).size, unit: 'lines' }
  return { n: (lesson?.terms?.length || 0) + parts.reduce((k, p) => k + (p.words?.length || 0), 0), unit: 'words' }
}

/** "9 words · 15 min", or "30 lines · 15 min", in the interface language. */
export function sizeText(lesson, t) {
  const { n, unit } = lessonSize(lesson)
  const word = unit === 'lines' ? t.lessonsLanguage.lines : t.learn.words
  return `${n} ${word} · ${lesson.minutes} ${t.learn.minutes}`
}
