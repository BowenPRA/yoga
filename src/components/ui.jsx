import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, ChevronLeft, ChevronRight, Volume2, Square } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { audio } from '../lib/audio.js'
import { useSpeaking } from '../lib/useSpeaking.js'
import { tintClass } from '../lib/tints.js'
import FigureCrop from './FigureCrop.jsx'

/**
 * The primitives. Rules they share:
 *   - headings in the serif, everything she reads at length in the sans
 *   - surfaces are rounded (22 to 28px), layered paper on sand, with a
 *     breath of tint where a place has one
 *   - one primary action per screen, a full pill, in the thumb zone
 *   - a playing word breathes; a pressed thing yields a little; nothing bounces
 */

/** Page header: optional back arrow, serif title, optional lead. */
export function Header({ title, subtitle, back, right, eyebrow, className = '' }) {
  const navigate = useNavigate()
  return (
    <header className={`mb-5 flex items-start gap-2 ${className}`}>
      {back && (
        <button
          onClick={() => (typeof back === 'string' ? navigate(back) : navigate(-1))}
          className="press -ml-2 mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted hover:bg-paper"
          aria-label="Back"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      <div className="min-w-0 flex-1">
        {eyebrow && <Eyebrow className="mb-1">{eyebrow}</Eyebrow>}
        <h1 className="font-serif text-title text-ink">{title}</h1>
        {subtitle && <p className="mt-1.5 text-body text-muted">{subtitle}</p>}
      </div>
      {right}
    </header>
  )
}

/** A small uppercase label above a group. */
export function Eyebrow({ children, tone = 'muted', className = '' }) {
  const look = tone === 'tint' ? 'text-tint-deep' : 'text-muted'
  return <div className={`text-eyebrow font-semibold uppercase ${look} ${className}`}>{children}</div>
}

/**
 * A surface. `wash` gives it a breath of the current tint; `tint` sets which
 * tint that is for everything inside. Tappable cards yield when pressed.
 */
export function Card({ children, className = '', onClick, to, wash = false, tint, pad = 'p-5' }) {
  const cls = `block min-w-0 rounded-3xl border border-line/70 shadow-card ${wash ? 'wash' : 'bg-paper'} ${pad} ${tint ? tintClass(tint) : ''} ${onClick || to ? 'press' : ''} ${className}`
  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (onClick) return <button onClick={onClick} className={`${cls} w-full text-left`}>{children}</button>
  return <div className={cls}>{children}</div>
}

/** A navigation row: title, subtitle, chevron. */
export function NavCard({ to, title, sub, icon, soon }) {
  const { t } = useLang()
  const inner = (
    <div className="flex items-center gap-3">
      {icon && <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-tint-soft text-tint-deep">{icon}</span>}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-ink">{title}</span>
          {soon && <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[11px] text-muted">{t.learn.soon}</span>}
        </div>
        {sub && <div className="text-caption leading-snug text-muted">{sub}</div>}
      </div>
      {!soon && <ChevronRight size={18} className="shrink-0 text-muted" />}
    </div>
  )
  return soon ? <Card className="opacity-70">{inner}</Card> : <Card to={to}>{inner}</Card>
}

export function Section({ title, children, action, className = '' }) {
  return (
    <section className={`mt-7 ${className}`}>
      <div className="mb-2.5 flex items-baseline justify-between px-1">
        <Eyebrow>{title}</Eyebrow>
        {action}
      </div>
      {children}
    </section>
  )
}

/** A pill. `tone` picks a tint for just this chip; active chips go deep. */
export function Chip({ children, active, onClick, to, tone, className = '' }) {
  const base = `press inline-flex min-h-[36px] items-center rounded-full px-3.5 py-1.5 text-left text-[14px] font-medium ${tone ? tintClass(tone) : ''}`
  const look = active ? 'bg-tint-deep text-paper shadow-sm' : 'bg-tint-soft text-tint-deep'
  if (to) return <Link to={to} className={`${base} ${look} ${className}`}>{children}</Link>
  return (
    <button onClick={onClick} className={`${base} ${look} ${className}`}>
      {children}
    </button>
  )
}

/** A quiet tag: a small rounded label with no action. */
export function Tag({ children, tone = 'sand', className = '' }) {
  const look = {
    sand: 'bg-sand text-muted',
    tint: 'bg-tint-soft text-tint-deep',
    gold: 'bg-gold-soft text-gold-deep',
    paper: 'bg-paper text-muted border border-line/70',
  }[tone]
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${look} ${className}`}>{children}</span>
}

/**
 * Buttons are pills. `primary` is the one thing to do on a screen, in the
 * current tint; `secondary` is paper; `quiet` is text.
 */
export function Button({ children, onClick, kind = 'primary', size = 'md', disabled, className = '', type = 'button', ...rest }) {
  const look = {
    primary: 'bg-tint-deep text-paper shadow-float hover:brightness-105',
    secondary: 'bg-paper border border-line text-ink hover:bg-sand',
    soft: 'bg-tint-soft text-tint-deep',
    quiet: 'text-tint-deep hover:bg-tint-soft/60',
    ink: 'bg-ink text-sand',
  }[kind]
  const dims = { sm: 'min-h-[38px] px-3.5 text-[14px]', md: 'min-h-[46px] px-5 text-[15px]', lg: 'min-h-[54px] px-6 text-[16px]' }[size]
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`press inline-flex items-center justify-center gap-2 rounded-full font-medium disabled:opacity-40 disabled:shadow-none ${dims} ${look} ${className}`}
      {...rest}
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
  const enEl = <span className={`block text-ink ${size === 'lg' ? 'text-body-lg' : size === 'sm' ? 'text-caption' : 'text-body'} ${enClass}`}>{en}</span>
  const viEl = vi ? <span className={`block text-caption text-muted ${viClass}`}>{vi}</span> : null
  if (support === 'full') return <span className="block">{viEl}{enEl}</span>
  if (support === 'light')
    return (
      <span className="block">
        {enEl}
        {vi && !shown && (
          <button onClick={(e) => { e.stopPropagation(); setShown(true) }} className="text-[12px] text-tint-deep">{t.common.showVi}</button>
        )}
        {shown && viEl}
      </span>
    )
  return <span className="block">{enEl}{viEl}</span>
}

/** A speaker button for one clip id. Breathes while that clip plays. */
export function PlayButton({ id, size = 40, className = '' }) {
  const speaking = useSpeaking()
  const on = speaking === id
  return (
    <button
      onClick={(e) => { e.stopPropagation(); on ? audio.stop() : audio.play(id) }}
      className={`press grid shrink-0 place-items-center rounded-full ${on ? 'bg-tint-deep text-paper speaking' : 'bg-tint-soft text-tint-deep'} ${className}`}
      style={{ width: size, height: size }}
      aria-label="Play"
    >
      {on ? <Square size={Math.round(size * 0.36)} /> : <Volume2 size={Math.round(size * 0.48)} />}
    </button>
  )
}

/** A spoken line: play button + bilingual text. Tapping the text plays too. */
export function Say({ id, en, vi, size, className = '' }) {
  const speaking = useSpeaking()
  return (
    <div
      onClick={() => audio.play(id)}
      className={`press -mx-1 flex cursor-pointer items-start gap-3 rounded-2xl px-2 py-2 transition-colors ${speaking === id ? 'bg-tint-soft/70' : 'hover:bg-sand/70'} ${className}`}
    >
      <PlayButton id={id} />
      <div className="min-w-0 flex-1 pt-2">
        <Bi en={en} vi={vi} size={size} />
      </div>
    </div>
  )
}

/** Stress respelling, in clay so it reads as a note, not as the word. */
export function SayHint({ say, className = '' }) {
  if (!say) return null
  return <span className={`text-caption text-clay-deep ${className}`}>{say}</span>
}

/**
 * A quiet ring for progress through a lesson: an arc, no number. Full and
 * done, it closes and shows a check.
 */
export function Ring({ value = 0, done = false, size = 32, stroke = 3, className = '' }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const v = done ? 1 : Math.max(0, Math.min(1, value))
  return (
    <span className={`relative inline-grid shrink-0 place-items-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(var(--line))" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={done ? 'rgb(var(--tint))' : 'rgb(var(--tint-deep))'} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - v)} className="ring-arc"
        />
      </svg>
      {done && <Check size={Math.round(size * 0.44)} strokeWidth={2.6} className="absolute text-tint-deep" />}
    </span>
  )
}

/** A round window onto a figure, washed in the current tint. */
export function Porthole({ kind, window: win, highlight = [], size = 72, className = '' }) {
  return (
    <span className={`porthole block shrink-0 overflow-hidden rounded-full ${className}`} style={{ width: size, height: size }}>
      <FigureCrop kind={kind} window={win} highlight={highlight} frame="none" fill />
    </span>
  )
}

/** Soft dots for where she is in a deck: the current one stretches into a pill. */
export function Dots({ count, index, className = '' }) {
  // A very long deck would not fit as dots on a phone; a thin arc of a bar stands in.
  if (count > 28)
    return (
      <div className={`flex items-center ${className}`}>
        <span className="relative h-[5px] w-full max-w-[220px] overflow-hidden rounded-full bg-line">
          <span className="ring-arc absolute inset-y-0 left-0 rounded-full bg-tint-deep" style={{ width: `${((index + 1) / count) * 100}%`, transition: 'width 400ms cubic-bezier(0.22, 1, 0.36, 1)' }} />
        </span>
      </div>
    )
  return (
    <div className={`flex items-center justify-center gap-[5px] ${className}`}>
      {Array.from({ length: count }, (_, k) => (
        <span
          key={k}
          className={`h-[6px] rounded-full transition-all duration-300 ${k === index ? 'w-[18px] bg-tint-deep' : k < index ? 'w-[6px] bg-tint' : 'w-[6px] bg-line'}`}
        />
      ))}
    </div>
  )
}
