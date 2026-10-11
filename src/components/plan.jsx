import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ExternalLink, RefreshCw, Square, Volume2, X } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { audio } from '../lib/audio.js'
import { getPose, getTerm } from '../lib/content.js'
import { useSpeaking } from '../lib/useSpeaking.js'
import { useWakeLock } from '../lib/useRunner.js'
import { voiceFor, voiceKey } from '../lib/voice.js'
import { getTheme } from '../../content/themes.js'
import { getSource } from '../../content/sources.js'
import { checkPlan, getCaution, musclesOf, propsFor, sectionSeconds, wordsFor } from '../lib/planner.js'
import { Bi, Button, Chip, Eyebrow, PlayButton, Say, SayHint, Tag } from './ui.jsx'
import { sectionTint, tintClass } from '../lib/tints.js'

/**
 * The pieces of a class plan that are not the poses: the arc, the thought
 * for the class, what to set out and what to practise before it, what the
 * class works, what a teacher would notice, her notes, and the mat view.
 */
const fill = (s, vars) => Object.entries(vars).reduce((out, [k, v]) => out.replace(`{${k}}`, v), s)

/** A line the live voice reads (an AI line, a thought): fetched once, kept on the phone. */
export function VoiceLine({ text, vi, size, className = '' }) {
  const { t } = useLang()
  const speaking = useSpeaking()
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState(false)
  const key = voiceKey(text)
  const on = speaking === key
  const play = async () => {
    if (on) { audio.stop(); return }
    audio.unlock()
    setBusy(true); setErr(false)
    try { await audio.playBlob(await voiceFor(text), key) } catch { setErr(true) } finally { setBusy(false) }
  }
  return (
    <div onClick={play} className={`press -mx-1 flex cursor-pointer items-start gap-3 rounded-2xl px-2 py-2 transition-colors ${on ? 'bg-tint-soft/70' : 'hover:bg-sand/70'} ${className}`}>
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${on ? 'bg-tint-deep text-paper speaking' : 'bg-tint-soft text-tint-deep'} ${busy ? 'speaking opacity-70' : ''}`}>
        {on ? <Square size={14} /> : <Volume2 size={19} />}
      </span>
      <div className="min-w-0 flex-1 pt-2">
        <Bi en={text} vi={vi} size={size} />
        {err && <span className="block text-[12px] text-clay-deep">{t.classes.voiceError}</span>}
      </div>
    </div>
  )
}

/** The arc of the class as a bar: one segment per section, as wide as its minutes; tap one to jump to it. */
export function ArcBar({ plan, titles, onJump }) {
  const { t, ui } = useLang()
  const C = t.classes
  const secs = plan.sections.map((sec) => sectionSeconds(sec, plan.style))
  const total = secs.reduce((a, b) => a + b, 0) || 1
  const L = (o) => (o ? (ui === 'vi' ? o.vi : o.en) : '')
  return (
    <div>
      <div className="flex h-[10px] w-full gap-[3px]">
        {plan.sections.map((sec, i) => (
          <button
            key={sec.key} onClick={() => onJump(sec.key)} aria-label={L(titles[sec.key])}
            className={`${tintClass(sectionTint(sec.key))} press h-full rounded-full bg-tint`}
            style={{ width: `${Math.max(2, (secs[i] / total) * 100)}%` }}
          />
        ))}
      </div>
      <div className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1">
        {plan.sections.map((sec, i) => (
          <button key={sec.key} onClick={() => onJump(sec.key)} className={`${tintClass(sectionTint(sec.key))} press flex items-center gap-1.5 text-[12px] text-muted`}>
            <span className="h-2 w-2 shrink-0 rounded-full bg-tint" />
            {L(titles[sec.key])} <span className="tabular-nums text-muted/70">{Math.max(1, Math.round(secs[i] / 60))} {C.min}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/** The thought for the class: the quote, where it is from, what it means, and the sentence she says. */
export function ThoughtStep({ step, onAnother, onRemove }) {
  const { t } = useLang()
  const C = t.classes
  const th = getTheme(step.theme)
  if (!th) return null
  const src = getSource(th.source)
  const b = 'press grid h-8 w-8 place-items-center rounded-full text-muted/70 hover:bg-sand hover:text-ink'
  return (
    <div className="tint-gold wash rounded-3xl border border-line/60 p-4 shadow-card">
      <div className="flex items-start justify-between gap-2">
        <Eyebrow tone="tint" className="pt-1">{C.thought}</Eyebrow>
        <div className="flex items-center gap-0.5">
          {onAnother && <button onClick={onAnother} className={b} aria-label={C.anotherThought}><RefreshCw size={15} /></button>}
          {onRemove && <button onClick={onRemove} className={`${b} hover:text-clay-deep`} aria-label={C.removeThought}><X size={16} /></button>}
        </div>
      </div>
      <div className="mt-1 font-serif text-heading italic text-ink">{th.term}</div>
      <SayHint say={th.say} className="block" />
      <blockquote className="mt-3 font-serif text-body-lg leading-snug text-ink">“{th.quote.en}”</blockquote>
      <p className="mt-1 text-caption text-muted">{th.ref}{src ? ` · ${src.by}${src.year ? `, ${src.year}` : ''}` : ''}</p>
      <p className="mt-2.5 text-caption text-ink/80"><span className="text-eyebrow font-semibold uppercase text-muted">{C.thoughtVi}</span><br />{th.quote.vi}</p>
      {th.meaning && <div className="mt-2"><Bi en={th.meaning.en} vi={th.meaning.vi} size="sm" /></div>}
      <div className="mt-3 border-t border-line/60 pt-2">
        <Eyebrow className="px-1 pb-1">{C.thoughtSay}</Eyebrow>
        {th.line ? <Say id={`phrase__${th.line}`} en={th.inClass.en} vi={th.inClass.vi} /> : <VoiceLine text={th.inClass.en} vi={th.inClass.vi} />}
      </div>
      {src?.url && (
        <a href={src.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-[12px] text-muted hover:text-tint-deep">
          <ExternalLink size={12} /> {C.source}: {src.title}
        </a>
      )}
    </div>
  )
}

/** What to set out before class, read off the modifications of every pose in the plan. */
export function PropsCard({ plan }) {
  const { t } = useLang()
  const C = t.classes
  const props = propsFor(plan)
  return (
    <div className="rounded-3xl border border-line/70 bg-paper p-4 shadow-card">
      <Eyebrow className="mb-2">{C.props}</Eyebrow>
      {props.length === 0 ? (
        <p className="text-caption text-muted">{C.propsNone}</p>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {props.map((x) => (
            <Tag key={x.prop} tone="tint" className="!text-[13px]">{t.poses.props[x.prop] || x.prop} <span className="ml-1 font-normal opacity-70">· {fill(C.propsFor, { n: x.poses.length })}</span></Tag>
          ))}
        </div>
      )}
    </div>
  )
}

/** The words in this class worth saying aloud before it: the Sanskrit, the muscle terms with a trap, the English with a cluster. */
export function WordsCard({ plan }) {
  const { t } = useLang()
  const C = t.classes
  const [all, setAll] = useState(false)
  const words = wordsFor(plan)
  if (!words.length) return null
  const shown = all ? words : words.slice(0, 3)
  return (
    <div className="rounded-3xl border border-line/70 bg-paper p-4 pb-2 shadow-card">
      <Eyebrow className="mb-0.5">{C.words}</Eyebrow>
      <p className="mb-1 text-caption text-muted">{C.wordsLead}</p>
      {shown.map((w) => (
        <div key={w.clip} onClick={() => audio.play(w.clip)} className="press -mx-1 flex cursor-pointer items-center gap-3 rounded-2xl px-2 py-1.5 hover:bg-sand/70">
          <PlayButton id={w.clip} size={38} />
          <div className="min-w-0 flex-1">
            <div className={`text-ink ${w.kind === 'sa' ? 'font-serif italic text-body-lg' : 'text-body font-medium'}`}>{w.text}</div>
            {w.say && <SayHint say={w.say} className="block" />}
            <div className="text-[12px] text-muted">{w.sub}</div>
            {w.trap && <div className="mt-0.5 text-[12px] text-clay-deep">{w.trap}</div>}
          </div>
        </div>
      ))}
      {words.length > 3 && (
        <button onClick={() => setAll((a) => !a)} className="press flex w-full items-center justify-center gap-1 py-1.5 text-caption text-tint-deep">
          <ChevronDown size={15} className={`transition-transform ${all ? 'rotate-180' : ''}`} /> {all ? C.fewerLines : fill(C.moreLines, { n: words.length })}
        </button>
      )}
    </div>
  )
}

/** What the class works and stretches, as chips into the Anatomy tab. */
export function MusclesCard({ plan }) {
  const { t } = useLang()
  const C = t.classes
  const m = musclesOf(plan, 5)
  if (!m.working.length && !m.lengthening.length) return null
  const row = (label, list) => list.length > 0 && (
    <div className="mt-2 first:mt-0">
      <Eyebrow className="mb-1.5 px-1">{label}</Eyebrow>
      <div className="flex flex-wrap gap-1.5">
        {list.map(({ id }) => { const term = getTerm(id); return term ? <Chip key={id} to={`/anatomy/muscles/${id}`} className="!min-h-[32px] !text-[13px]">{term.en}<span className="ml-1 font-normal opacity-70">· {term.vi}</span></Chip> : null })}
      </div>
    </div>
  )
  return (
    <div className="rounded-3xl border border-line/70 bg-paper p-4 shadow-card">
      <Eyebrow className="mb-2">{C.works}</Eyebrow>
      {row(C.lengthening, m.lengthening)}
      {row(C.working, m.working)}
    </div>
  )
}

/** What a teacher would notice reading the plan; each note scrolls to its step. */
export function SeqNotes({ plan, onJump }) {
  const { t, ui } = useLang()
  const C = t.classes
  const notes = checkPlan(plan)
  if (!notes.length) return <p className="px-1 text-caption text-muted">{C.checkOk}</p>
  return (
    <div className="tint-clay wash rounded-3xl border border-line/60 p-2 shadow-card">
      {notes.map((n, i) => {
        const p = getPose(n.pose)
        const c = n.caution ? getCaution(n.caution) : null
        const text = fill(C.noteKinds[n.kind] || n.kind, { pose: p?.en || n.pose, caution: c ? (ui === 'vi' ? c.label.vi : c.label.en).toLowerCase() : '' })
        return (
          <button key={i} onClick={() => onJump(n.step)} className="press flex w-full items-start gap-2.5 rounded-2xl px-2 py-2 text-left hover:bg-paper/70">
            <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-tint" />
            <span className="text-caption text-ink">{text}</span>
          </button>
        )
      })}
    </div>
  )
}

/** Her own notes on the class, kept with it. */
export function NotesCard({ value, onChange }) {
  const { t } = useLang()
  const C = t.classes
  return (
    <textarea
      value={value || ''} onChange={(e) => onChange(e.target.value)} rows={3} placeholder={C.notesPlaceholder}
      className="w-full resize-none rounded-3xl border border-line/70 bg-paper p-4 text-body text-ink shadow-card outline-none placeholder:text-muted/60 focus:border-tint"
    />
  )
}

/** When she taught this class, as short dates. */
export function TaughtLine({ plan }) {
  const { t, ui } = useLang()
  const C = t.classes
  const dates = [...(plan.taught || [])].sort((a, b) => b - a).slice(0, 4)
  if (!dates.length) return <span className="text-[12px] text-muted">{C.neverTaught}</span>
  const fmt = (ms) => new Date(ms).toLocaleDateString(ui === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'short' })
  return <span className="text-[12px] text-tint-deep">{C.taught}: {dates.map(fmt).join(' · ')}{(plan.taught || []).length > 4 ? ' …' : ''}</span>
}

/**
 * The mat view: the whole class as a short list in large type, to glance at
 * between cues. The screen stays awake. Nothing to tap but close.
 */
export function MatView({ plan, titles, onClose }) {
  const { t, ui } = useLang()
  const C = t.classes
  useWakeLock(true)
  const L = (o) => (o ? (ui === 'vi' ? o.vi : o.en) : '')
  const props = propsFor(plan)
  const hold = (st) => (st.minutes ? `${st.minutes} ${C.min}` : `${st.breaths}`) + (st.sides === 2 ? ' ×2' : '')
  return (
    <div className={`screen-wash fade-in fixed inset-0 z-40 flex flex-col ${tintClass(sectionTint("peak"))}`}>
      <header className="flex items-center gap-3 px-4 pb-2 pt-safe">
        <button onClick={onClose} className="press grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper/70 text-muted" aria-label={t.common.close}><X size={20} /></button>
        <div className="min-w-0 flex-1"><Eyebrow tone="tint" className="truncate">{L(plan.title)}</Eyebrow></div>
      </header>
      <main className="min-h-0 flex-1 overflow-y-auto px-5 pb-10">
        {props.length > 0 && <p className="mb-3 text-caption text-muted">{C.props}: {props.map((x) => t.poses.props[x.prop] || x.prop).join(', ')}</p>}
        {plan.sections.map((sec) => {
          const rows = sec.steps.filter((st) => st.kind !== 'lines' && st.kind !== 'thought')
          const mins = Math.max(1, Math.round(sectionSeconds(sec, plan.style) / 60))
          return (
            <section key={sec.key} className={`${tintClass(sectionTint(sec.key))} mb-4`}>
              <div className="mb-1 flex items-baseline justify-between">
                <Eyebrow tone="tint">{L(titles[sec.key])}</Eyebrow>
                <span className="text-[12px] tabular-nums text-muted">{mins} {C.min}</span>
              </div>
              {rows.length === 0 && <div className="font-serif text-heading text-ink/70">{sec.key === 'rest' ? 'Savasana' : '…'}</div>}
              {rows.map((st) => {
                if (st.kind === 'sun') return <div key={st.id} className="font-serif text-heading text-ink">{C.sunA} ×{st.a}{st.b ? ` · ${C.sunB} ×${st.b}` : ''}</div>
                if (st.kind === 'flow') return <div key={st.id} className="font-serif text-heading leading-snug text-ink">{st.poses.map((id) => getPose(id)?.en).filter(Boolean).join(' → ')} <span className="text-caption text-muted">×2</span></div>
                const p = getPose(st.pose)
                return p ? (
                  <div key={st.id} className="flex items-baseline justify-between gap-3 py-0.5">
                    <div className="min-w-0 font-serif text-heading leading-snug text-ink">{st.peak ? '★ ' : ''}{p.en}<span className="ml-2 text-caption text-muted">{p.vi}</span></div>
                    <span className="shrink-0 text-caption tabular-nums text-muted">{hold(st)}</span>
                  </div>
                ) : null
              })}
            </section>
          )
        })}
      </main>
      <footer className="px-5 pt-2 pb-safe">
        <Button kind="secondary" size="lg" onClick={onClose} className="w-full">{t.common.close}</Button>
      </footer>
    </div>
  )
}

/** A small link to the Sources page, for the foot of a plan or a pose. */
export function SourcesLink({ className = '' }) {
  const { t } = useLang()
  return (
    <Link to="/sources" className={`inline-flex items-center gap-1.5 text-caption text-muted hover:text-tint-deep ${className}`}>
      <ExternalLink size={13} /> {t.classes.sourcesLink}
    </Link>
  )
}
