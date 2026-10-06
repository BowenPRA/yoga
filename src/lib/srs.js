/**
 * Spaced repetition, kept deliberately simple (an SM-2 variant with a short
 * learning ladder). A card is { id, kind, ref, due, interval, ease, reps,
 * lapses, step }. Grades: 0 again, 1 hard, 2 good, 3 easy.
 *
 * New cards climb a ladder of 10 minutes then 1 day before graduating to
 * interval scheduling. "Known" means interval >= 21 days, which is the only
 * progress number the app shows.
 */
const DAY = 86_400_000
const LADDER = [10 * 60_000, DAY]

export function newCard(id, kind, ref, now = Date.now()) {
  return { id, kind, ref, due: now, interval: 0, ease: 2.5, reps: 0, lapses: 0, step: 0 }
}

export function grade(card, g, now = Date.now()) {
  const c = { ...card, reps: card.reps + 1 }
  if (c.interval === 0) {
    // learning
    if (g === 0) { c.step = 0; c.due = now + LADDER[0]; return c }
    if (g === 3) { c.interval = 4; c.step = LADDER.length; c.due = now + 4 * DAY; return c }
    const next = c.step + (g === 1 ? 0 : 1)
    if (next >= LADDER.length) { c.interval = 1; c.step = LADDER.length; c.due = now + DAY; return c }
    c.step = next
    c.due = now + LADDER[next]
    return c
  }
  // review
  if (g === 0) {
    c.lapses += 1
    c.ease = Math.max(1.3, c.ease - 0.2)
    c.interval = 0
    c.step = 0
    c.due = now + LADDER[0]
    return c
  }
  const mult = g === 1 ? 1.2 : g === 2 ? c.ease : c.ease * 1.3
  c.ease = Math.max(1.3, c.ease + (g === 1 ? -0.15 : g === 3 ? 0.15 : 0))
  c.interval = Math.max(1, Math.round(c.interval * mult))
  c.due = now + c.interval * DAY
  return c
}

export const isKnown = (card) => card.interval >= 21
