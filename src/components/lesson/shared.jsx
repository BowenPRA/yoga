import { Check, X } from 'lucide-react'
import { useLang } from '../../lib/i18n.jsx'
import { Button } from '../ui.jsx'

/**
 * What every activity shares, so the eight of them read as one family: the
 * question in the serif, a paper board, a soft well for the bank, pills for
 * the pieces, one verdict card, and the Check pill on the right.
 */

/** The activity's question, above the board. */
export function Prompt({ children }) {
  return <p className="mb-4 font-serif text-heading text-ink">{children}</p>
}

/** The surface she works on. */
export function Board({ children, className = '' }) {
  return <div className={`rounded-3xl border border-line/70 bg-paper p-3 shadow-card ${className}`}>{children}</div>
}

/** The bank of pieces still to place: a soft well in the current tint. */
export function Bank({ children, empty, className = '' }) {
  return (
    <div className={`flex min-h-[56px] flex-wrap items-center gap-2 rounded-3xl border border-dashed border-tint/40 bg-tint-soft/40 p-2.5 ${className}`}>
      {empty ? <span className="px-1.5 text-caption text-muted">{empty}</span> : children}
    </div>
  )
}

/** A quiet line of guidance under a board. */
export function Hint({ children, className = '' }) {
  return <p className={`mt-2 px-1 text-caption text-muted ${className}`}>{children}</p>
}

/** Right or not yet, in the studio's two accents rather than green and red. */
export function Verdict({ ok, children }) {
  const { t } = useLang()
  return (
    <div className={`wash slide-in mt-4 rounded-3xl border border-line/60 px-4 py-3.5 ${ok ? 'tint-sage' : 'tint-clay'}`}>
      <div className="mb-1.5 flex items-center gap-2 text-eyebrow font-semibold uppercase text-tint-deep">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-tint-deep text-paper">{ok ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}</span>
        {ok ? t.learn.correct : t.learn.notQuite}
      </div>
      <div className="text-body text-ink">{children}</div>
    </div>
  )
}

export function CheckButton({ onClick, disabled, label }) {
  const { t } = useLang()
  return (
    <div className="mt-4 flex justify-end">
      <Button onClick={onClick} disabled={disabled}>{label || t.learn.check}</Button>
    </div>
  )
}

/** A tappable pill for a term or a piece of a cue. `look`: idle | picked | good | bad | muted */
export function Piece({ children, look = 'idle', onClick, disabled, sub, className = '' }) {
  const looks = {
    idle: 'bg-paper border-line text-ink shadow-sm',
    picked: 'bg-tint-deep border-tint-deep text-paper shadow-float',
    good: 'bg-sage-soft border-sage/50 text-sage-deep',
    bad: 'bg-clay-soft border-clay/50 text-clay-deep',
    muted: 'bg-sand border-line text-muted',
  }
  const Tag = onClick && !disabled ? 'button' : 'span'
  return (
    <Tag onClick={onClick} className={`press inline-flex min-h-[40px] flex-col items-start justify-center rounded-2xl border px-3.5 py-1.5 text-left text-[15px] leading-snug ${looks[look]} ${className}`}>
      <span>{children}</span>
      {sub && <span className="text-[11px] opacity-70">{sub}</span>}
    </Tag>
  )
}
