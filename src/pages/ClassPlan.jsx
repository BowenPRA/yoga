import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowDown, ArrowUp, Bookmark, BookmarkCheck, ChevronDown, Plus, Repeat, Share2, Shuffle, Sparkles, Square, Trash2, Volume2, Waves, X } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { STRINGS } from '../lib/strings.js'
import { api } from '../lib/api.js'
import { audio } from '../lib/audio.js'
import { store } from '../lib/store.js'
import { getPose } from '../lib/content.js'
import { useSpeaking } from '../lib/useSpeaking.js'
import { useRunner } from '../lib/useRunner.js'
import { voiceFor, voiceKey } from '../lib/voice.js'
import {
  addable, alternatives, applyAI, buildPlan, catalogForAI, getCaution, getGoal, goalsForAI, nextHold, phraseLine,
  planClipIds, planForAI, planMinutes, planText, scriptOf, sectionSeconds, stepFor,
} from '../lib/planner.js'
import { Bi, Button, Chip, Eyebrow, Header, KeepOffline, PlayButton, PoseArt, Say, ScrollTop, Section, Tag } from '../components/ui.jsx'
import PoseSheet from '../components/PoseSheet.jsx'
import Rehearse from '../components/Rehearse.jsx'
import { poseTint, styleTint, tintClass } from '../lib/tints.js'
import { DRAFT } from './Classes.jsx'

const fill = (s, vars) => Object.entries(vars).reduce((out, [k, v]) => out.replace(`{${k}}`, v), s)
const SECTION_TITLES = Object.fromEntries(Object.keys(STRINGS.en.classes.sections).map((k) => [k, { en: STRINGS.en.classes.sections[k], vi: STRINGS.vi.classes.sections[k] }]))
const EDITABLE = new Set(['warm', 'standing', 'peak', 'floor', 'holds', 'seated', 'finishing', 'practice'])

/** A line Gemini wrote, read by the live voice: fetched once, kept on the phone. */
function VoiceLine({ text, vi, size, className = '' }) {
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

/** The small round controls on a step: up, down, swap, remove. */
function Controls({ onUp, onDown, onSwap, onRemove }) {
  const { t } = useLang()
  const C = t.classes
  const b = 'press grid h-8 w-8 place-items-center rounded-full text-muted/70 hover:bg-sand hover:text-ink disabled:opacity-30'
  return (
    <div className="flex items-center gap-0.5">
      <button onClick={onUp} disabled={!onUp} className={b} aria-label={C.up}><ArrowUp size={15} /></button>
      <button onClick={onDown} disabled={!onDown} className={b} aria-label={C.down}><ArrowDown size={15} /></button>
      {onSwap && <button onClick={onSwap} className={b} aria-label={C.swap}><Repeat size={15} /></button>}
      <button onClick={onRemove} className={`${b} hover:text-clay-deep`} aria-label={C.remove}><X size={16} /></button>
    </div>
  )
}

/** A moment of talk: its lines, folded to a few when it is a long script. */
function LinesStep({ step }) {
  const { t } = useLang()
  const C = t.classes
  const [all, setAll] = useState(false)
  const lines = step.lines.map(phraseLine).filter(Boolean)
  const shown = all || lines.length <= 5 ? lines : lines.slice(0, 3)
  return (
    <div className="rounded-3xl border border-line/70 bg-paper p-2 shadow-card">
      {shown.map((l) => <Say key={l.id} id={`phrase__${l.id}`} en={l.en} vi={l.vi} />)}
      {lines.length > 5 && (
        <button onClick={() => setAll((a) => !a)} className="press flex w-full items-center justify-center gap-1 py-2 text-caption text-tint-deep">
          <ChevronDown size={15} className={`transition-transform ${all ? 'rotate-180' : ''}`} /> {all ? C.fewerLines : fill(C.moreLines, { n: lines.length })}
        </button>
      )}
    </div>
  )
}

const holdLabel = (step, C) => (step.minutes ? `${step.minutes} ${C.min}` : `${step.breaths} ${C.breaths}`) + (step.sides === 2 ? ` · ${C.eachSide}` : '')

/** One pose in the plan: picture, names, the hold (tap to change), its notes and cues, and the controls. */
function PoseStep({ step, onCycle, controls }) {
  const { t } = useLang()
  const C = t.classes
  const p = getPose(step.pose)
  if (!p) return null
  return (
    <div className={`${tintClass(poseTint(p))} rounded-3xl border border-line/70 bg-paper p-3 shadow-card`}>
      <div className="flex items-center gap-3">
        <PoseArt pose={p} size={50} />
        <div className="min-w-0 flex-1">
          <Link to={`/poses/${p.id}`} className="block truncate font-serif text-[18px] leading-snug text-ink">{p.en}</Link>
          <div className="truncate text-caption text-muted">{p.vi}{p.sa ? ` · ${p.sa}` : ''}</div>
          <button onClick={onCycle} className="press mt-1 rounded-full bg-tint-soft px-2.5 py-0.5 text-[12px] font-medium text-tint-deep" title={C.tapHold}>{holdLabel(step, C)}</button>
        </div>
        <PlayButton id={`${p.id}__en`} size={38} />
      </div>
      {step.swapped && <p className="mt-2 px-1 text-[12px] text-muted">{C.swappedFrom} {getPose(step.swapped.from)?.en || step.swapped.from}. {step.swapped.why_vi}</p>}
      {(step.cues || []).length > 0 && (
        <div className="mt-2 border-t border-line/60 pt-1">
          <Eyebrow tone="tint" className="px-1 pt-1">{C.aiCue}</Eyebrow>
          {step.cues.map((c, i) => <VoiceLine key={i} text={c.en} vi={c.vi} size="sm" />)}
        </div>
      )}
      {(step.notes || []).length > 0 && (
        <div className="tint-clay mt-2 rounded-2xl bg-tint-soft/60 p-1">
          <Eyebrow tone="tint" className="px-2 pt-1.5">{C.note}</Eyebrow>
          {step.notes.map((n) => <Say key={n.id} id={n.id} en={n.en} vi={n.vi} size="sm" />)}
        </div>
      )}
      <div className="mt-1 flex justify-end">{controls}</div>
    </div>
  )
}

/** A standing flow: the poses done on the right, then the left. */
function FlowStep({ step, controls }) {
  const { t } = useLang()
  const C = t.classes
  const poses = step.poses.map(getPose).filter(Boolean)
  return (
    <div className="rounded-3xl border border-line/70 bg-paper p-3 shadow-card">
      <Eyebrow tone="tint" className="px-1">{C.flow}</Eyebrow>
      <div className="mt-1.5 space-y-1">
        {poses.map((p) => (
          <div key={p.id} className={`${tintClass(poseTint(p))} flex items-center gap-3 rounded-2xl px-1 py-1`}>
            <PoseArt pose={p} size={40} className="" />
            <div className="min-w-0 flex-1">
              <Link to={`/poses/${p.id}`} className="block truncate text-body text-ink">{p.en}</Link>
              <div className="truncate text-[12px] text-muted">{p.vi}</div>
            </div>
            <PlayButton id={`${p.id}__en`} size={34} />
          </div>
        ))}
      </div>
      {(step.cues || []).length > 0 && (
        <div className="mt-2 border-t border-line/60 pt-1">
          <Eyebrow tone="tint" className="px-1 pt-1">{C.aiCue}</Eyebrow>
          {step.cues.map((c, i) => <VoiceLine key={i} text={c.en} vi={c.vi} size="sm" />)}
        </div>
      )}
      {(step.notes || []).length > 0 && (
        <div className="tint-clay mt-2 rounded-2xl bg-tint-soft/60 p-1">
          <Eyebrow tone="tint" className="px-2 pt-1.5">{C.note}</Eyebrow>
          {step.notes.map((n) => <Say key={n.id} id={n.id} en={n.en} vi={n.vi} size="sm" />)}
        </div>
      )}
      <div className="mt-1 flex justify-end">{controls}</div>
    </div>
  )
}

/** Rounds of Surya Namaskara. */
function SunStep({ step, controls }) {
  const { t } = useLang()
  const C = t.classes
  return (
    <div className="tint-gold wash rounded-3xl border border-line/60 p-4 shadow-card">
      <div className="font-serif text-heading text-ink">{C.sunA} × {step.a}{step.b ? <span className="text-muted"> · {C.sunB} × {step.b}</span> : null}</div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {['mountain-pose', 'upward-salute', 'standing-forward-fold', 'half-lift', 'chaturanga', 'upward-dog', 'downward-dog', ...(step.b ? ['chair-pose', 'warrior-1'] : [])].map((id) => {
          const p = getPose(id)
          return p ? <Chip key={id} to={`/poses/${id}`} className="!min-h-[32px] !text-[13px]">{p.en}</Chip> : null
        })}
      </div>
      <div className="mt-1 flex justify-end">{controls}</div>
    </div>
  )
}

/**
 * A class she built: what it is for, Gemini's help if she asked, the
 * sections with their poses and talk, each editable; lead it, save it,
 * share it, keep it offline.
 */
export default function ClassPlan() {
  const { id } = useParams()
  // Keyed by id, so every state below starts fresh when she opens another class.
  return <PlanView key={id} id={id} />
}

const readDraft = () => {
  try { const d = sessionStorage.getItem(DRAFT); return d ? JSON.parse(d) : null } catch { return null }
}

function PlanView({ id }) {
  const { t, ui } = useLang()
  const C = t.classes
  const navigate = useNavigate()
  const draft = id === 'draft'
  // undefined while a saved class loads; null when there is nothing to show.
  const [plan, setPlan] = useState(() => (draft ? readDraft() : undefined))
  const [dirty, setDirty] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [sheet, setSheet] = useState(null) // { section, replace?, alts? }
  const [confirm, setConfirm] = useState(false)
  const [flash, setFlash] = useState(null)
  const runner = useRunner()
  const L = (o) => (o ? (ui === 'vi' ? o.vi : o.en) : '')

  useEffect(() => {
    if (draft) return
    let live = true
    store.get('classes', id).then((p) => { if (live) setPlan(p || null) })
    return () => { live = false }
  }, [id, draft])

  // A draft lives in the tab session until she saves it.
  useEffect(() => {
    if (draft && plan) try { sessionStorage.setItem(DRAFT, JSON.stringify(plan)) } catch { /* fine */ }
  }, [draft, plan])

  const script = useMemo(() => (plan ? scriptOf(plan) : []), [plan])
  const suggested = useMemo(() => (plan ? addable(plan) : []), [plan])

  if (plan === undefined) return null
  if (!plan)
    return (
      <div className="tint-sage">
        <Header title={C.title} back="/classes" />
        <p className="rounded-3xl border border-dashed border-line bg-paper/60 p-5 text-center text-caption text-muted">{C.draftLost}</p>
        <div className="mt-5"><Button size="lg" onClick={() => navigate('/classes')} className="w-full">{C.backToBuilder}</Button></div>
      </div>
    )

  const student = plan.mode === 'student'
  const tint = student ? 'clay' : styleTint(plan.style)
  const update = (fn) => { setPlan((p) => fn(p)); setDirty(true) }
  const mapSteps = (key, fn) => update((p) => ({ ...p, sections: p.sections.map((s) => (s.key === key ? { ...s, steps: fn(s.steps) } : s)) }))
  const move = (key, stepId, dir) => mapSteps(key, (steps) => {
    const i = steps.findIndex((s) => s.id === stepId)
    const j = i + dir
    if (i < 0 || j < 0 || j >= steps.length) return steps
    const out = steps.slice()
    ;[out[i], out[j]] = [out[j], out[i]]
    return out
  })
  const remove = (key, stepId) => mapSteps(key, (steps) => steps.filter((s) => s.id !== stepId))
  const cycle = (key, stepId) => mapSteps(key, (steps) => steps.map((s) => (s.id === stepId ? nextHold(s) : s)))
  const pick = (poseId) => {
    const { section, replace } = sheet
    setSheet(null)
    update((p) => {
      const step = stepFor(p, poseId)
      if (!step) return p
      return {
        ...p,
        sections: p.sections.map((s) => {
          if (s.key !== section) return s
          if (!replace) return { ...s, steps: [...s.steps, step] }
          return { ...s, steps: s.steps.map((st) => (st.id === replace ? { ...step, id: st.id, ...(st.minutes ? { minutes: getPose(poseId)?.yin?.holdMinutes || st.minutes } : { breaths: st.breaths }) } : st)) }
        }),
      }
    })
  }

  const specOf = (p) => ({ id: p.id, mode: p.mode, style: p.style, minutes: p.minutes, level: p.level, goals: p.goals, cautions: p.cautions, request: p.request, seed: p.seed })
  const another = () => { audio.stop(); update((p) => buildPlan({ ...specOf(p), seed: p.seed + 1 })) }

  const ask = async () => {
    if (busy) return
    setBusy(true); setError(null)
    try {
      const out = await api.plan(plan.request, planForAI(plan), catalogForAI(), goalsForAI())
      let next = plan
      // The app could not read her words: Gemini did, so the class is rebuilt for what she meant.
      if (!plan.goals.length && !plan.cautions.length && (out.goals?.length || out.cautions?.length)) next = buildPlan({ ...specOf(plan), goals: out.goals, cautions: out.cautions })
      update(() => applyAI(next, out))
    } catch (err) {
      setError(`${C.error} (${err.message})`)
    } finally {
      setBusy(false)
    }
  }

  const say = (msg) => { setFlash(msg); setTimeout(() => setFlash(null), 1600) }
  const save = async () => {
    await store.put('classes', { ...plan, savedAt: Date.now() })
    setDirty(false)
    say(C.savedOk)
    if (draft) { try { sessionStorage.removeItem(DRAFT) } catch { /* fine */ } navigate(`/classes/${plan.id}`, { replace: true }) }
  }
  const del = async () => {
    if (!confirm) { setConfirm(true); setTimeout(() => setConfirm(false), 3000); return }
    await store.del('classes', plan.id)
    navigate('/classes', { replace: true })
  }
  const share = async () => {
    const text = planText(plan, SECTION_TITLES)
    if (navigator.share) { await navigator.share({ title: L(plan.title), text }).catch(() => {}); return }
    try { await navigator.clipboard.writeText(text); say(C.copied) } catch { /* nothing to say */ }
  }
  const lead = () => { audio.unlock(); runner.start(plan.id, script, { title: L(plan.title), tint }) }

  const poseCount = plan.sections.reduce((n, s) => n + s.steps.reduce((m, st) => m + (st.kind === 'pose' ? 1 : st.kind === 'flow' ? st.poses.length : 0), 0), 0)
  const ai = plan.ai
  const alts = (step) => alternatives(plan, step)
  const controlsFor = (sec, i, step) => (
    <Controls
      onUp={i > 0 ? () => move(sec.key, step.id, -1) : null}
      onDown={i < sec.steps.length - 1 ? () => move(sec.key, step.id, 1) : null}
      onSwap={step.kind === 'pose' ? () => setSheet({ section: sec.key, replace: step.id, alts: alts(step) }) : null}
      onRemove={() => remove(sec.key, step.id)}
    />
  )

  return (
    <div className={tintClass(tint)}>
      <ScrollTop on={id} />
      <Header
        title={L(plan.title)} back="/classes" eyebrow={student ? C.modeStudent : t.poses[plan.style]}
        subtitle={`${fill(C.about, { n: planMinutes(plan) })} · ${fill(C.posesCount, { n: poseCount })}`}
      />

      <div className="wash rounded-4xl border border-line/60 p-5 shadow-card">
        {plan.request && <p className="font-serif text-body-lg italic text-ink">“{plan.request}”</p>}
        <div className={`${plan.request ? 'mt-3' : ''} flex flex-wrap gap-1.5`}>
          {!student && <Tag tone="tint">{t.poses[plan.style]}</Tag>}
          {plan.level && <Tag>{t.poses.levels[plan.level]}</Tag>}
          {plan.goals.map((g) => { const x = getGoal(g); return x ? <Tag key={g} tone="tint">{L(x.label)}</Tag> : null })}
          {plan.cautions.map((c) => { const x = getCaution(c); return x ? <Tag key={c} tone="gold">{L(x.label)}</Tag> : null })}
        </div>
        <div className="mt-5 flex items-center gap-2.5">
          <Button size="lg" onClick={lead} className="flex-1"><Waves size={18} /> {C.rehearse}</Button>
          <Button size="lg" kind={dirty || draft ? 'secondary' : 'soft'} onClick={save} disabled={!dirty && !draft} aria-label={C.save} className="!px-4">
            {dirty || draft ? <Bookmark size={19} /> : <BookmarkCheck size={19} />}
          </Button>
        </div>
        <p className="mt-3 text-caption text-muted">{flash || C.rehearseHelp}</p>
      </div>

      {student && (plan.care?.length > 0) && (
        <Section title={C.careLines}>
          <div className="tint-clay rounded-3xl border border-line/70 bg-paper p-2 shadow-card">
            {plan.care.map((l) => <Say key={l.id} id={l.id} en={l.en} vi={l.vi} />)}
          </div>
        </Section>
      )}

      <Section title={ai ? C.asked : C.ask}>
        {!ai && (
          <div className="rounded-3xl border border-line/70 bg-paper p-4 shadow-card">
            <p className="text-caption text-muted">{C.askHelp}</p>
            <Button kind="secondary" onClick={ask} disabled={busy} className={`mt-3 w-full ${busy ? 'speaking' : ''}`}><Sparkles size={18} /> {busy ? C.asking : C.ask}</Button>
            {error && <p className="mt-3 text-caption text-clay-deep">{error}</p>}
          </div>
        )}
        {ai && (
          <div className="rounded-3xl border border-line/70 bg-paper p-3 shadow-card">
            {ai.theme && (
              <div>
                <Eyebrow tone="tint" className="px-2 pt-1">{C.theme}</Eyebrow>
                <VoiceLine text={ai.theme.en} vi={ai.theme.vi} />
              </div>
            )}
            {ai.toStudent && (
              <div className="tint-clay mt-2 rounded-2xl bg-tint-soft/60 p-1">
                <Eyebrow tone="tint" className="px-2 pt-1.5">{C.toStudent}</Eyebrow>
                <VoiceLine text={ai.toStudent.en} vi={ai.toStudent.vi} />
              </div>
            )}
            {ai.watch?.length > 0 && (
              <div className="mt-2 px-2">
                <Eyebrow className="mb-1">{C.watch}</Eyebrow>
                {ai.watch.map((w, i) => <div key={i} className="py-1"><Bi en={w.en} vi={w.vi} size="sm" /></div>)}
              </div>
            )}
            {ai.swaps?.length > 0 && (
              <div className="mt-2 px-2">
                <Eyebrow className="mb-1">{C.swaps}</Eyebrow>
                {ai.swaps.map((s, i) => (
                  <p key={i} className="py-1 text-caption text-ink">
                    <span className="text-muted line-through">{getPose(s.from)?.en}</span> → <span className="font-medium">{getPose(s.to)?.en}</span>
                    {s.why_vi && <span className="block text-muted">{s.why_vi}</span>}
                  </p>
                ))}
              </div>
            )}
            {ai.note_vi && <p className="mt-2 px-2 text-caption text-muted">{ai.note_vi}</p>}
            <div className="mt-2 flex justify-end">
              <Button kind="quiet" size="sm" onClick={ask} disabled={busy}><Sparkles size={15} /> {busy ? C.asking : C.ask}</Button>
            </div>
            {error && <p className="mt-2 px-2 text-caption text-clay-deep">{error}</p>}
          </div>
        )}
      </Section>

      {plan.sections.map((sec) => (
        <Section key={sec.key} title={L(SECTION_TITLES[sec.key] || { en: sec.key, vi: sec.key })} action={<span className="text-caption text-muted">{Math.max(1, Math.round(sectionSeconds(sec, plan.style) / 60))} {C.min}</span>}>
          <div className="space-y-2.5">
            {sec.steps.map((step, i) => {
              if (step.kind === 'lines') return <LinesStep key={step.id} step={step} />
              if (step.kind === 'sun') return <SunStep key={step.id} step={step} controls={controlsFor(sec, i, step)} />
              if (step.kind === 'flow') return <FlowStep key={step.id} step={step} controls={controlsFor(sec, i, step)} />
              return <PoseStep key={step.id} step={step} onCycle={() => cycle(sec.key, step.id)} controls={controlsFor(sec, i, step)} />
            })}
          </div>
          {EDITABLE.has(sec.key) && (
            <div className="mt-2 flex justify-end">
              <Button kind="quiet" size="sm" onClick={() => setSheet({ section: sec.key })}><Plus size={15} /> {C.add}</Button>
            </div>
          )}
        </Section>
      ))}

      {student && plan.careful?.length > 0 && (
        <Section title={C.careful}>
          <div className="tint-clay space-y-2">
            {plan.careful.map((c) => {
              const p = getPose(c.pose)
              return p ? (
                <div key={c.pose} className="rounded-3xl border border-line/70 bg-paper p-2 shadow-card">
                  <Chip to={`/poses/${p.id}`} className="ml-1 mt-1 !min-h-[32px] !text-[13px]">{p.en}<span className="ml-1 font-normal opacity-70">· {p.vi}</span></Chip>
                  <Say id={c.line.id} en={c.line.en} vi={c.line.vi} size="sm" />
                </div>
              ) : null
            })}
          </div>
        </Section>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <Button kind="secondary" onClick={share}><Share2 size={17} /> {C.share}</Button>
        {!student && <Button kind="secondary" onClick={another}><Shuffle size={17} /> {C.another}</Button>}
        {!draft && (
          <Button kind="quiet" onClick={del} className={confirm ? 'tint-clay' : ''}><Trash2 size={17} /> {confirm ? C.confirmDelete : C.delete}</Button>
        )}
      </div>
      <div className="mt-3"><KeepOffline key={plan.id} ids={planClipIds(plan)} label={C.keepOffline} /></div>

      <PoseSheet open={!!sheet} onClose={() => setSheet(null)} onPick={pick} suggested={sheet?.alts?.length ? [...sheet.alts, ...suggested.filter((p) => !sheet.alts.includes(p))] : suggested} tint={tint} />
      <Rehearse runner={runner} />
    </div>
  )
}
