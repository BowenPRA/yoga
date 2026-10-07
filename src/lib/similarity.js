/**
 * Dictation marking, after the Dashboard's Dictation task: a Levenshtein
 * ratio over the cleaned text, plus a word-by-word diff so the wrong words
 * can be shown rather than just a percentage.
 */
const clean = (s) => String(s || '').toLowerCase().replace(/[’']/g, "'").replace(/[.,/#!$%^&*;:{}=\-_`~()?"“”]/g, '').replace(/\s+/g, ' ').trim()

export function similarity(a, b) {
  const x = clean(a), y = clean(b)
  if (!x.length) return 0
  if (x === y) return 1
  const m = []
  for (let i = 0; i <= y.length; i++) m[i] = [i]
  for (let j = 0; j <= x.length; j++) m[0][j] = j
  for (let i = 1; i <= y.length; i++) {
    for (let j = 1; j <= x.length; j++) {
      m[i][j] = y[i - 1] === x[j - 1] ? m[i - 1][j - 1] : Math.min(m[i - 1][j - 1], m[i][j - 1], m[i - 1][j]) + 1
    }
  }
  return Math.max(0, 1 - m[y.length][x.length] / Math.max(x.length, y.length))
}

/**
 * Align her words to the target's (LCS on cleaned words). Returns the target
 * words each tagged ok / missed, and her extra words tagged extra, in order.
 */
export function wordDiff(typed, target) {
  const a = clean(typed).split(' ').filter(Boolean)
  const b = clean(target).split(' ').filter(Boolean)
  const shown = String(target || '').split(/\s+/).filter(Boolean)
  const L = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))
  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1])
    }
  }
  const out = []
  let i = 0, j = 0
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) { out.push({ word: shown[j] || b[j], state: 'ok' }); i++; j++ }
    else if (j < b.length && (i >= a.length || L[i][j + 1] >= L[i + 1][j])) { out.push({ word: shown[j] || b[j], state: 'missed' }); j++ }
    else { out.push({ word: a[i], state: 'extra' }); i++ }
  }
  return out
}
