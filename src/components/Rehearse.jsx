import { useEffect, useState } from 'react'
import { ChevronLeft, SkipForward, Square, Waves, X } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { useWakeLock } from '../lib/useRunner.js'
import { Bi, Button, Dots, Eyebrow } from './ui.jsx'
import { tintClass } from '../lib/tints.js'

const fill = (s, vars) => Object.entries(vars).reduce((out, [k, v]) => out.replace(`{${k}}`, v), s)

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

/** What is left of a long hold, as m:ss, so a three-minute Yin hold is not a mystery. */
function Countdown({ at, secs }) {
  const [left, setLeft] = useState(secs)
  useEffect(() => {
    const tick = () => setLeft(Math.max(0, Math.round(secs - (Date.now() - at) / 1000)))
    const id = setInterval(tick, 500)
    return () => clearInterval(id)
  }, [at, secs])
  if (secs < 10) return null
  return <span className="font-serif text-heading tabular-nums text-ink">{Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}</span>
}

/**
 * Leading a class: the whole screen, one line at a time, the pause held.
 * The pose being taught sits above the line, so she always knows where the
 * class is; the next line waits underneath.
 */
export default function Rehearse({ runner }) {
  const { t, ui } = useLang()
  const C = t.classes
  const { run } = runner
  useWakeLock(!!run && run.phase !== 'done')
  if (!run) return null
  const it = run.items[run.index]
  const next = run.items[run.index + 1]
  const done = run.phase === 'done'
  const again = () => runner.start(run.key, run.items, { title: run.title, tint: run.tint })
  const back = () => runner.start(run.key, run.items, { title: run.title, tint: run.tint, from: run.index - 1 })
  const head = it?.head
  const L = (o) => (o ? (ui === 'vi' ? o.vi : o.en) : '')
  return (
    <div className={`screen-wash fade-in fixed inset-0 z-40 flex flex-col ${tintClass(run.tint)}`}>
      <header className="flex items-center gap-3 px-4 pb-2 pt-safe">
        <button onClick={runner.stop} className="press grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper/70 text-muted" aria-label={t.common.close}>
          <X size={20} />
        </button>
        <div className="min-w-0 flex-1 text-center"><Eyebrow tone="tint" className="truncate">{run.title}</Eyebrow></div>
        <span className="shrink-0 text-[11px] tabular-nums text-muted" aria-label={fill(C.lineOf, { i: run.index + 1, n: run.items.length })}>{run.index + 1}/{run.items.length}</span>
      </header>
      <Dots count={run.items.length} index={run.index} className="px-8 pt-1" />
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-6">
        <div key={done ? 'done' : run.index} className="slide-in mx-auto my-auto w-full max-w-xl">
          {done ? (
            <div className="text-center">
              <p className="font-serif text-title text-ink">{C.doneTitle}</p>
              <p className="mt-2 text-body text-muted">{C.doneLead}</p>
            </div>
          ) : (
            <>
              {head && (
                <div className="mb-3">
                  <div className="font-serif text-heading text-tint-deep">{head.en}{head.side ? <span className="text-muted"> · {L(head.side)}</span> : null}</div>
                  <div className="text-caption text-muted">{head.vi}{head.sa ? ` · ${head.sa}` : ''}</div>
                </div>
              )}
              <Bi en={it.en} vi={it.vi} size="lg" enClass="font-serif !text-[25px] !leading-snug" viClass="mt-2 !text-body" />
              <div className="mt-8 flex h-10 items-center gap-3 text-caption text-muted">
                {run.phase === 'pause' ? (
                  <><PauseRing key={run.at} secs={run.pause} /> {t.phrases.stillness} <Countdown at={run.at} secs={run.pause} /></>
                ) : (
                  <><span className="speaking ml-3 mr-3 h-3 w-3 rounded-full bg-tint" /> {it.text ? t.speech.voicing : t.phrases.listen}</>
                )}
              </div>
              {next && (
                <div className="mt-8">
                  <Eyebrow className="mb-1">{t.phrases.then}</Eyebrow>
                  {next.head && next.head.en !== head?.en && <div className="text-caption font-medium text-tint-deep">{next.head.en}</div>}
                  <p className="text-body text-muted">{next.en}</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <footer className="flex items-center gap-2.5 px-5 pt-3 pb-safe">
        {done ? (
          <>
            <Button kind="secondary" size="lg" onClick={runner.stop}>{t.common.close}</Button>
            <Button size="lg" onClick={again} className="flex-1"><Waves size={18} /> {t.phrases.again}</Button>
          </>
        ) : (
          <>
            <Button kind="secondary" size="lg" onClick={back} disabled={run.index === 0} className="!px-3" aria-label={C.back}><ChevronLeft size={20} /></Button>
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
