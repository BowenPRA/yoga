import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, ExternalLink, Play, SkipForward, Square, Waves, X } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { PHRASE_GROUPS } from '../lib/content.js'
import { audio } from '../lib/audio.js'
import { useSpeaking } from '../lib/useSpeaking.js'
import { Bi, Button, Chip, Dots, Eyebrow, Header, PlayButton, Say, SayHint, Tag } from '../components/ui.jsx'
import { SettingsButton } from '../components/SettingsSheet.jsx'
import SuggestFix from '../components/SuggestFix.jsx'
import { momentTint, tintClass } from '../lib/tints.js'

/**
 * Class talk by moment, then meditation, philosophy and the Sanskrit and
 * Pali words. Sixteen groups is a lot for a phone, so each one rests folded
 * to its title and a play button; a sticky row of moment chips jumps to any
 * of them. Scripts (savasana, the vipassana sit, Sūrya Namaskāra A) can be
 * led: the voice reads a line, the screen holds the silence that follows.
 */

const clip = (l) => `phrase__${l.id}`
const leadable = (lines) => lines.length > 1 && lines.every((l) => typeof l.pauseAfter === 'number')
const plain = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const AREAS = ['class', 'mind']

/**
 * One sequence at a time: "play all" with a short gap, or "lead it" with each
 * line's own pause. A run is cancelled by a token, so a stopped or replaced
 * run never carries on when a stale clip ends; tapping a single line while a
 * sequence plays makes the sequence yield.
 */
function useRunner() {
  const [run, setRun] = useState(null)
  const token = useRef(0)
  const skipRef = useRef(null)
  const expected = useRef(null)

  const halt = useCallback(() => {
    token.current += 1
    expected.current = null
    const skip = skipRef.current
    skipRef.current = null
    if (skip) skip()
  }, [])

  const stop = useCallback(() => {
    halt()
    audio.stop()
    setRun(null)
  }, [halt])

  useEffect(
    () =>
      audio.subscribe((id) => {
        if (id && expected.current && id !== expected.current) {
          halt()
          setRun(null)
        }
      }),
    [halt],
  )
  useEffect(() => () => { halt(); audio.stop() }, [halt])

  const start = useCallback(async (key, lines, { lead = false, title = '', tint = 'sage' } = {}) => {
    halt()
    const mine = token.current
    const alive = () => token.current === mine
    const hold = (ms) =>
      new Promise((resolve) => {
        const timer = setTimeout(() => { skipRef.current = null; resolve('ended') }, Math.max(0, ms))
        skipRef.current = () => { clearTimeout(timer); resolve('skipped') }
      })
    const base = { key, lines, lead, title, tint }
    for (let i = 0; i < lines.length; i++) {
      if (!alive()) return
      const l = lines[i]
      setRun({ ...base, index: i, phase: 'speak' })
      expected.current = clip(l)
      const began = Date.now()
      // "Next line" while a line is being read moves straight on to the next.
      const how = await new Promise((resolve) => {
        skipRef.current = () => { audio.stop(); resolve('skipped') }
        audio.play(clip(l)).then(() => resolve('ended'))
      })
      skipRef.current = null
      if (!alive()) return
      if (how === 'skipped') continue
      // A clip that is not generated yet ends at once; when leading, the line
      // still stays on screen for about as long as it takes to say it.
      const spoken = Date.now() - began
      if (lead && spoken < 700) {
        const words = l.en.split(/\s+/).length
        const read = await hold(Math.min(7000, Math.max(1800, words * 420)) - spoken)
        if (!alive()) return
        if (read === 'skipped') continue
      }
      const pause = lead ? l.pauseAfter ?? 1.5 : 1.2
      if (pause > 0 && i < lines.length - 1) {
        setRun({ ...base, index: i, phase: 'pause', pause, at: Date.now() })
        await hold(pause * 1000)
        if (!alive()) return
      }
    }
    expected.current = null
    setRun(lead ? { ...base, index: lines.length - 1, phase: 'done' } : null)
  }, [halt])

  const skip = useCallback(() => { if (skipRef.current) skipRef.current() }, [])
  return { run, start, stop, skip }
}

/** Keep the screen awake while she leads a script on the mat. */
function useWakeLock(on) {
  useEffect(() => {
    if (!on || !navigator.wakeLock) return
    let lock = null
    let gone = false
    navigator.wakeLock.request('screen').then((l) => { if (gone) l.release(); else lock = l }).catch(() => {})
    return () => { gone = true; lock?.release().catch(() => {}) }
  }, [on])
}

export default function Phrases() {
  const { t, ui } = useLang()
  const [open, setOpen] = useState(null)
  const runner = useRunner()
  const barRef = useRef(null)
  const L = (o) => (ui === 'vi' ? o.vi : o.en)

  const reveal = (id, always) => {
    // After React has drawn the opened group (and folded the last one).
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const el = document.getElementById(`moment-${id}`)
        if (!el) return
        const top = el.getBoundingClientRect().top
        if (always || top < 80 || top > window.innerHeight * 0.55) el.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' })
      }),
    )
  }
  const jump = (id) => { setOpen(id); reveal(id, true) }
  const toggle = (id) => {
    if (open === id) { setOpen(null); return }
    setOpen(id)
    reveal(id, false)
  }

  // Keep the open moment's chip in view in the sticky row.
  useEffect(() => {
    const bar = barRef.current
    const chip = bar?.querySelector(`[data-moment="${open}"]`)
    if (!bar || !chip) return
    bar.scrollTo({ left: chip.offsetLeft - bar.clientWidth / 2 + chip.offsetWidth / 2, behavior: reduceMotion() ? 'auto' : 'smooth' })
  }, [open])

  return (
    <>
      <Header title={t.phrases.title} subtitle={t.phrases.intro} right={<SettingsButton />} />

      <nav aria-label={t.phrases.moments} className="sticky top-0 z-10 -mx-5 mb-4 bg-sand/90 py-2 backdrop-blur-md">
        <div ref={barRef} className="no-scrollbar flex gap-2 overflow-x-auto px-5">
          {PHRASE_GROUPS.map((g, i) => (
            <span key={g.id} data-moment={g.id} className="flex shrink-0 items-center gap-2">
              {i > 0 && g.area !== PHRASE_GROUPS[i - 1].area && <span className="h-5 w-px bg-line" aria-hidden />}
              <Chip tone={momentTint(g.id)} active={open === g.id} onClick={() => jump(g.id)} className="whitespace-nowrap">
                {L(g.short || g.title)}
              </Chip>
            </span>
          ))}
        </div>
      </nav>

      {PHRASE_GROUPS.map((g, i) => (
        <div key={g.id}>
          {(i === 0 || g.area !== PHRASE_GROUPS[i - 1].area) && AREAS.includes(g.area) && (
            <Eyebrow className={`mb-2.5 px-1 ${i === 0 ? '' : 'mt-8'}`}>{t.phrases.areas[g.area]}</Eyebrow>
          )}
          <GroupCard g={g} open={open === g.id} onToggle={() => toggle(g.id)} runner={runner} />
        </div>
      ))}

      <LeadScreen runner={runner} />
    </>
  )
}

function GroupCard({ g, open, onToggle, runner }) {
  const { t, ui } = useLang()
  const L = (o) => (ui === 'vi' ? o.vi : o.en)
  const tint = momentTint(g.id)
  const playing = runner.run?.key === g.id && !runner.run.lead
  const lead = (key, lines, title) => runner.start(key, lines, { lead: true, title, tint })

  // Folded, a group is its title and one round button: play all, or for a
  // script, lead it. The title keeps the width of the card.
  const isScript = g.kind === 'script'
  const action = isScript ? (
    <button
      onClick={() => lead(g.id, g.lines, L(g.title))} aria-label={t.phrases.leadIt}
      className="press grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper/80 text-tint-deep shadow-sm"
    >
      <Waves size={18} />
    </button>
  ) : (
    <button
      onClick={() => (playing ? runner.stop() : runner.start(g.id, g.lines))} aria-label={playing ? t.common.stop : t.common.playAll}
      className={`press grid h-10 w-10 shrink-0 place-items-center rounded-full ${playing ? 'speaking bg-tint-deep text-paper' : 'bg-paper/80 text-tint-deep shadow-sm'}`}
    >
      {playing ? <Square size={14} /> : <Play size={17} className="ml-0.5" />}
    </button>
  )

  return (
    <section id={`moment-${g.id}`} className={`${tintClass(tint)} mb-3 scroll-mt-16`}>
      <div className="wash rounded-3xl border border-line/60 shadow-card">
        <div className="flex items-start gap-1.5 py-3 pl-4 pr-2.5">
          <button onClick={onToggle} aria-expanded={open} className="press min-w-0 flex-1 py-1 text-left">
            <h2 className="font-serif text-heading text-ink">{L(g.title)}</h2>
            {g.lead && <p className="mt-0.5 text-caption leading-snug text-muted">{L(g.lead)}</p>}
          </button>
          <div className="flex shrink-0 items-center gap-0.5 pt-0.5">
            {action}
            <button
              onClick={onToggle} aria-label={open ? t.phrases.collapse : t.phrases.open}
              className="press grid h-10 w-9 place-items-center rounded-full text-muted"
            >
              <ChevronDown size={19} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        {open && (
          <div className="slide-in px-2 pb-3">
            {g.kind === 'concepts' ? (
              <div className="space-y-2 px-1 pt-1">{g.lines.map((c) => <ConceptCard key={c.id} c={c} />)}</div>
            ) : g.kind === 'count' ? (
              (g.parts || []).map((p) => (
                <Part key={p.id} g={g} part={p} runner={runner} onLead={lead} />
              ))
            ) : isScript ? (
              <>
                <div className="flex items-center gap-3 px-2 pb-3">
                  <p className="min-w-0 flex-1 text-caption text-muted">{t.phrases.leadHelp}</p>
                  <Button size="sm" onClick={() => lead(g.id, g.lines, L(g.title))} className="shrink-0"><Waves size={15} /> {t.phrases.leadIt}</Button>
                </div>
                {g.lines.map((l, i) => (
                  <div key={l.id}>
                    <LineRow l={l} />
                    {i < g.lines.length - 1 && <PauseMark secs={l.pauseAfter} />}
                  </div>
                ))}
              </>
            ) : (
              g.lines.map((l) => <LineRow key={l.id} l={l} />)
            )}
            <div className="mt-2 px-2"><SuggestFix target={`phrases:${g.id}`} /></div>
          </div>
        )}
      </div>
    </section>
  )
}

/** One part of a counted group: its title, a note, and play or lead. */
function Part({ g, part, runner, onLead }) {
  const { t, ui } = useLang()
  const L = (o) => (ui === 'vi' ? o.vi : o.en)
  const lines = g.lines.filter((l) => l.part === part.id)
  const key = `${g.id}:${part.id}`
  const playing = runner.run?.key === key && !runner.run.lead
  const canLead = leadable(lines)
  return (
    <div className="mt-3 first:mt-1">
      <div className="flex items-center justify-between gap-3 px-2 pt-1">
        <Eyebrow tone="tint">{L(part.title)}</Eyebrow>
        {canLead ? (
          <Button kind="quiet" size="sm" onClick={() => onLead(key, lines, L(part.title))}><Waves size={15} /> {t.phrases.leadIt}</Button>
        ) : (
          <Button kind="quiet" size="sm" onClick={() => (playing ? runner.stop() : runner.start(key, lines))}>
            {playing ? <Square size={13} /> : <Play size={13} />} {playing ? t.common.stop : t.common.playAll}
          </Button>
        )}
      </div>
      {part.note && <p className="px-2 pb-1 text-caption text-muted">{L(part.note)}</p>}
      {lines.map((l) => <LineRow key={l.id} l={l} />)}
    </div>
  )
}

/**
 * A spoken line. Like `Say`, but a line can lead with its Sanskrit (a count,
 * a gaze, a mantra in IAST) and carry a respelling; a mantra shows its
 * meaning rather than the romanised text the voice reads.
 */
function LineRow({ l }) {
  const speaking = useSpeaking()
  const id = clip(l)
  const text = l.meaning ? <Bi en={l.meaning.en} vi={l.meaning.vi} /> : <Bi en={l.en} vi={l.vi} />
  return (
    <div
      onClick={() => audio.play(id)}
      className={`press -mx-1 flex cursor-pointer items-start gap-3 rounded-2xl px-2 py-2 transition-colors ${speaking === id ? 'bg-tint-soft/70' : 'hover:bg-sand/70'}`}
    >
      <PlayButton id={id} />
      <div className="min-w-0 flex-1 pt-2">
        {l.term ? (
          <>
            <div className="whitespace-pre-line font-serif text-body-lg italic leading-snug text-ink">{l.term}</div>
            {l.say && <SayHint say={l.say} className="mb-1 block" />}
            {text}
          </>
        ) : (
          <>
            {text}
            {l.say && <SayHint say={l.say} className="mt-0.5 block" />}
          </>
        )}
      </div>
    </div>
  )
}

/** The silence after a script line, as a quiet rule. */
function PauseMark({ secs }) {
  const { t } = useLang()
  if (!secs) return null
  const label = secs >= 60 && secs % 60 === 0 ? `${secs / 60} ${t.phrases.min}` : `${secs} ${t.phrases.sec}`
  return (
    <div className="flex items-center gap-3 px-4 py-0.5 text-[11px] text-muted">
      <span className="h-px flex-1 bg-line/80" />
      <span>{t.phrases.pause} · {label}</span>
      <span className="h-px flex-1 bg-line/80" />
    </div>
  )
}

/**
 * A Sanskrit or Pali word: the IAST in the serif, its studio spelling and
 * respelling, and the Vietnamese Buddhist word she already knows as a tag.
 * Opened, it gives the meaning, the bridge and a sentence for class.
 */
function ConceptCard({ c }) {
  const { t, support } = useLang()
  const [open, setOpen] = useState(false)
  const studio = plain(c.term) !== plain(c.en)
  // The Vietnamese name, unless the bridge tag already says it.
  const viName = support !== 'light' && c.vi.toLowerCase() !== c.bridge?.term.toLowerCase()
  return (
    <div className={`rounded-3xl border border-line/60 bg-paper/85 shadow-card ${open ? 'pb-1' : ''}`}>
      <div className="flex items-start gap-3 p-3">
        <PlayButton id={clip(c)} size={42} />
        <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="min-w-0 flex-1 pt-0.5 text-left">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-serif text-heading text-ink">{c.term}</span>
            {studio && <span className="text-caption text-muted">{c.en}</span>}
          </div>
          <SayHint say={c.say} className="block" />
          {viName && <div className="text-caption text-muted">{c.vi}</div>}
        </button>
        <div className="flex shrink-0 flex-col items-end gap-1.5 pt-1">
          {c.bridge && <Tag tone="tint">{c.bridge.near ? '≈ ' : ''}{c.bridge.term}</Tag>}
          <button onClick={() => setOpen((o) => !o)} aria-label={open ? t.phrases.collapse : t.phrases.showMore} className="press grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-sand">
            <ChevronDown size={17} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="slide-in space-y-4 px-4 pb-3">
          <div>
            <Eyebrow className="mb-1">{t.phrases.meaning}</Eyebrow>
            <Bi en={c.meaning.en} vi={c.meaning.vi} />
            {c.alt && (
              <p className="mt-1 text-caption text-muted">
                {t.phrases.sanskritForm}: <span className="font-serif italic text-ink">{c.alt}</span>
              </p>
            )}
          </div>
          {c.bridge && (
            <div className="rounded-2xl bg-tint-soft/60 p-3.5">
              <Eyebrow tone="tint" className="mb-0.5">{c.bridge.near ? t.phrases.near : t.phrases.bridge}</Eyebrow>
              <div className="font-serif text-heading text-ink">{c.bridge.term}</div>
              <div className="mt-1"><Bi en={c.bridge.note.en} vi={c.bridge.note.vi} size="sm" /></div>
              {c.source && (
                <a href={c.source} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-[12px] text-muted hover:text-tint-deep">
                  <ExternalLink size={12} /> {t.phrases.source}
                </a>
              )}
            </div>
          )}
          <div>
            <Eyebrow className="mb-0.5">{t.phrases.inClass}</Eyebrow>
            <Say id={`${clip(c)}__inclass`} en={c.inClass.en} vi={c.inClass.vi} />
          </div>
        </div>
      )}
    </div>
  )
}

/** The silence after a line, as an arc that closes over the pause. */
function PauseRing({ secs, size = 40 }) {
  const [go, setGo] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setGo(true), 40)
    return () => clearTimeout(id)
  }, [])
  const stroke = 3
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(var(--line))" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(var(--tint-deep))" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={go ? 0 : c} style={{ transition: `stroke-dashoffset ${secs}s linear` }}
      />
    </svg>
  )
}

/** "Lead it": the whole screen, one line at a time, the pause held. */
function LeadScreen({ runner }) {
  const { t } = useLang()
  const { run } = runner
  useWakeLock(!!run?.lead && run.phase !== 'done')
  if (!run?.lead) return null
  const line = run.lines[run.index]
  const next = run.lines[run.index + 1]
  const done = run.phase === 'done'
  const again = () => runner.start(run.key, run.lines, { lead: true, title: run.title, tint: run.tint })
  return (
    <div className={`screen-wash fade-in fixed inset-0 z-40 flex flex-col ${tintClass(run.tint)}`}>
      <header className="flex items-center gap-3 px-4 pb-2 pt-safe">
        <button onClick={runner.stop} className="press grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper/70 text-muted" aria-label={t.common.close}>
          <X size={20} />
        </button>
        <div className="min-w-0 flex-1 text-center"><Eyebrow tone="tint" className="truncate">{run.title}</Eyebrow></div>
        <span className="w-10 shrink-0" />
      </header>
      <Dots count={run.lines.length} index={run.index} className="px-8 pt-1" />
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6">
        <div key={done ? 'done' : run.index} className="slide-in mx-auto my-auto w-full max-w-xl">
          {done ? (
            <div className="text-center">
              <p className="font-serif text-title text-ink">{t.phrases.doneTitle}</p>
              <p className="mt-2 text-body text-muted">{t.phrases.doneLead}</p>
            </div>
          ) : (
            <>
              {line.term && <div className="mb-2 whitespace-pre-line font-serif text-heading italic text-tint-deep">{line.term}</div>}
              <Bi
                en={line.meaning ? line.meaning.en : line.en} vi={line.meaning ? line.meaning.vi : line.vi}
                size="lg" enClass="font-serif !text-[25px] !leading-snug" viClass="mt-2 !text-body"
              />
              <div className="mt-8 flex h-10 items-center gap-3 text-caption text-muted">
                {run.phase === 'pause' ? (
                  <><PauseRing key={run.at} secs={run.pause} /> {t.phrases.stillness}</>
                ) : (
                  <><span className="speaking ml-3 mr-3 h-3 w-3 rounded-full bg-tint" /> {t.phrases.listen}</>
                )}
              </div>
              {next && (
                <div className="mt-8">
                  <Eyebrow className="mb-1">{t.phrases.then}</Eyebrow>
                  <p className="text-body text-muted">{next.meaning ? next.meaning.en : next.en}</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <footer className="flex items-center gap-3 px-5 pt-3 pb-safe">
        {done ? (
          <>
            <Button kind="secondary" size="lg" onClick={runner.stop}>{t.common.close}</Button>
            <Button size="lg" onClick={again} className="flex-1"><Waves size={18} /> {t.phrases.again}</Button>
          </>
        ) : (
          <>
            <Button kind="secondary" size="lg" onClick={runner.skip} className="flex-1 !px-3">
              <SkipForward size={18} /> {run.phase === 'pause' ? t.phrases.skipPause : t.phrases.skipLine}
            </Button>
            <Button size="lg" onClick={runner.stop} className="flex-1"><Square size={16} /> {t.common.stop}</Button>
          </>
        )}
      </footer>
    </div>
  )
}
