import { useLang } from './i18n.jsx'
import { getTerm } from './content.js'

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
