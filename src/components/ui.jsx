import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Volume2, Square } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { audio } from '../lib/audio.js'
import { useSpeaking } from '../lib/useSpeaking.js'

/** Page header: optional back arrow, serif title, optional subtitle. */
export function Header({ title, subtitle, back, right }) {
  const navigate = useNavigate()
  return (
    <header className="mb-4 flex items-start gap-2">
      {back && (
        <button
          onClick={() => (typeof back === 'string' ? navigate(back) : navigate(-1))}
          className="-ml-2 mt-0.5 rounded-full p-1.5 text-muted hover:bg-paper"
          aria-label="Back"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="font-serif text-[26px] leading-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {right}
    </header>
  )
}

export function Card({ children, className = '', onClick, to }) {
  const cls = `block min-w-0 rounded-2xl bg-paper border border-line shadow-card p-4 ${onClick || to ? 'active:scale-[0.99] transition-transform' : ''} ${className}`
  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (onClick) return <button onClick={onClick} className={`${cls} w-full text-left`}>{children}</button>
  return <div className={cls}>{children}</div>
}

/** A navigation row: title, subtitle, chevron. */
export function NavCard({ to, title, sub, icon, soon }) {
  const { t } = useLang()
  const inner = (
    <div className="flex items-center gap-3">
      {icon && <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sage-soft text-sage-deep">{icon}</span>}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-ink">{title}</span>
          {soon && <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[11px] text-muted">{t.learn.soon}</span>}
        </div>
        {sub && <div className="text-sm text-muted leading-snug">{sub}</div>}
      </div>
      {!soon && <ChevronRight size={18} className="text-muted shrink-0" />}
    </div>
  )
  return soon ? <Card className="opacity-70">{inner}</Card> : <Card to={to}>{inner}</Card>
}

export function Section({ title, children, action }) {
  return (
    <section className="mt-6">
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-[13px] font-semibold uppercase tracking-wider text-muted">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

export function Chip({ children, active, onClick, to, tone = 'sage' }) {
  const base = 'inline-flex items-center rounded-full px-3 py-1 text-sm transition-colors'
  const look = active
    ? 'bg-sage-deep text-paper'
    : tone === 'clay'
      ? 'bg-clay-soft text-ink'
      : 'bg-sage-soft text-sage-deep'
  if (to) return <Link to={to} className={`${base} ${look}`}>{children}</Link>
  return (
    <button onClick={onClick} className={`${base} ${look}`}>
      {children}
    </button>
  )
}

export function Button({ children, onClick, kind = 'primary', disabled, className = '', type = 'button' }) {
  const look = {
    primary: 'bg-sage-deep text-paper hover:brightness-110',
    secondary: 'bg-paper border border-line text-ink hover:bg-sand',
    quiet: 'text-sage-deep hover:bg-sage-soft',
  }[kind]
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[15px] font-medium transition disabled:opacity-50 ${look} ${className}`}
    >
      {children}
    </button>
  )
}

/**
 * Bilingual text that respects the support level.
 *   full      Vietnamese above, English below
 *   balanced  English above, Vietnamese below
 *   light     English only; tap "Xem tiếng Việt" to reveal
 */
export function Bi({ en, vi, size = 'base', enClass = '', viClass = '' }) {
  const { support, t } = useLang()
  const [shown, setShown] = useState(false)
  const enEl = <span className={`block text-ink ${size === 'lg' ? 'text-lg' : ''} ${enClass}`}>{en}</span>
  const viEl = vi ? <span className={`block text-sm text-muted ${viClass}`}>{vi}</span> : null
  if (support === 'full') return <span className="block">{viEl}{enEl}</span>
  if (support === 'light')
    return (
      <span className="block">
        {enEl}
        {vi && !shown && (
          <button onClick={(e) => { e.stopPropagation(); setShown(true) }} className="text-xs text-sage-deep">{t.common.showVi}</button>
        )}
        {shown && viEl}
      </span>
    )
  return <span className="block">{enEl}{viEl}</span>
}

/** A speaker button for one clip id. Pulses while that clip plays. */
export function PlayButton({ id, size = 36, className = '' }) {
  const speaking = useSpeaking()
  const on = speaking === id
  return (
    <button
      onClick={(e) => { e.stopPropagation(); on ? audio.stop() : audio.play(id) }}
      className={`grid shrink-0 place-items-center rounded-full transition-colors ${on ? 'bg-sage-deep text-paper speaking' : 'bg-sage-soft text-sage-deep'} ${className}`}
      style={{ width: size, height: size }}
      aria-label="Play"
    >
      {on ? <Square size={size * 0.4} /> : <Volume2 size={size * 0.5} />}
    </button>
  )
}

/** A spoken line: play button + bilingual text. Tapping the text plays too. */
export function Say({ id, en, vi, size }) {
  const speaking = useSpeaking()
  return (
    <div
      onClick={() => audio.play(id)}
      className={`flex items-start gap-3 rounded-xl px-2 py-2 -mx-2 cursor-pointer transition-colors ${speaking === id ? 'bg-sage-soft/60' : 'hover:bg-sand'}`}
    >
      <PlayButton id={id} />
      <div className="flex-1 min-w-0 pt-1.5">
        <Bi en={en} vi={vi} size={size} />
      </div>
    </div>
  )
}

/** Stress respelling, in a quiet monospace-free style. */
export function SayHint({ say }) {
  if (!say) return null
  return <span className="text-xs text-clay">{say}</span>
}
