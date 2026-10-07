import { Check, X } from 'lucide-react'
import { useLang } from '../../lib/i18n.jsx'
import { Button } from '../ui.jsx'

/** The activity's question, above the board. */
export function Prompt({ children }) {
  return <p className="mb-3 font-serif text-[19px] leading-snug text-ink">{children}</p>
}

/** Right or not yet, in the studio's two accents rather than green and red. */
export function Verdict({ ok, children }) {
  const { t } = useLang()
  return (
    <div className={`mt-3 rounded-2xl px-4 py-3 ${ok ? 'bg-sage-soft' : 'bg-clay-soft/70'}`}>
      <div className={`mb-1 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider ${ok ? 'text-sage-deep' : 'text-clay'}`}>
        {ok ? <Check size={14} /> : <X size={14} />} {ok ? t.learn.correct : t.learn.notQuite}
      </div>
      <div className="text-[15px] leading-relaxed text-ink">{children}</div>
    </div>
  )
}

export function CheckButton({ onClick, disabled, label }) {
  const { t } = useLang()
  return (
    <div className="mt-3 flex justify-end">
      <Button onClick={onClick} disabled={disabled}>{label || t.learn.check}</Button>
    </div>
  )
}

/** A tappable chip for a term or a piece of a cue. `look`: idle | picked | good | bad | muted */
export function Piece({ children, look = 'idle', onClick, disabled, sub, className = '' }) {
  const looks = {
    idle: 'bg-paper border-line text-ink',
    picked: 'bg-sage-deep border-sage-deep text-paper',
    good: 'bg-sage-soft border-sage text-sage-deep',
    bad: 'bg-clay-soft border-clay/60 text-clay',
    muted: 'bg-sand border-line text-muted',
  }
  const Tag = onClick && !disabled ? 'button' : 'span'
  return (
    <Tag onClick={onClick} className={`inline-flex flex-col items-start rounded-xl border px-3 py-1.5 text-left text-[15px] leading-snug transition ${Tag === 'button' ? 'active:scale-[0.98]' : ''} ${looks[look]} ${className}`}>
      <span>{children}</span>
      {sub && <span className="text-[11px] opacity-70">{sub}</span>}
    </Tag>
  )
}
