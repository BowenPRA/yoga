import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowDown, ArrowUp, Bookmark, BookmarkCheck, CalendarCheck, ChevronDown, Copy, LayoutList, Plus, Repeat, Share2, Shuffle, Sparkles, Trash2, Waves, X } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { STRINGS } from '../lib/strings.js'
import { api } from '../lib/api.js'
import { audio } from '../lib/audio.js'
import { store } from '../lib/store.js'
import { getPose } from '../lib/content.js'
import { useRunner } from '../lib/useRunner.js'
import {
  addable, alternatives, applyAI, buildPlan, catalogForAI, duplicatePlan, followers, getCaution, getGoal, goalsForAI, nextHold, nextThought,
  phraseLine, planClipIds, planForAI, planText, scriptOf, sectionSeconds, specOf, stepFor, timeBalance,
} from '../lib/planner.js'
import { Bi, Button, Chip, Eyebrow, Header, KeepOffline, PlayButton, PoseArt, Say, ScrollTop, Section, Tag } from '../components/ui.jsx'
import { ArcBar, MatView, MusclesCard, NotesCard, PropsCard, SeqNotes, SourcesLink, TaughtLine, ThoughtStep, VoiceLine, WordsCard } from '../components/plan.jsx'
import PoseSheet from '../components/PoseSheet.jsx'
import Rehearse from '../components/Rehearse.jsx'
import { poseTint, styleTint, tintClass } from '../lib/tints.js'
import { DRAFT } from './ClassNew.jsx'

const fill = (s, vars) => Object.entries(vars).reduce((out, [k, v]) => out.replace(`{${k}}`, v), s)
const SECTION_TITLES = Object.fromEntries(Object.keys(STRINGS.en.classes.sections).map((k) => [k, { en: STRINGS.en.classes.sections[k], vi: STRINGS.vi.classes.sections[k] }]))
const EDITABLE = new Set(['warm', 'standing', 'peak', 'floor', 'holds', 'seated', 'finishing', 'practice'])

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
    <div className={`${tintClass(step.peak ? 'clay' : poseTint(p))} rounded-3xl border ${step.peak ? 'border-tint/60 wash' : 'border-line/70 bg-paper'} p-3 shadow-card`}>
      {step.peak && <Eyebrow tone="tint" className="mb-1.5 px-1">★ {C.isPeak}</Eyebrow>}
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
 * A class she built: what it is for, the arc, what to set out and practise
 * before it, Gemini's help if she asked, what a teacher would notice, the
 * sections with their poses and talk, each editable, her notes; lead it,
 * glance at it from the mat, save it, share it, copy it, note that she
 * taught it, keep it offline.
 */
export default function ClassPlan() {
  const { id } = useParams()
  // Keyed by id, so every state below starts fresh when she opens another class.
  return <PlanView key={id} id={id} />
}

const readDraft = () => {
  try { const d = sessionStorage.getItem(DRAFT); return d ? JSON.parse(d) : null } catch { return null }
}

/** The last pose of a section, for "what follows naturally" when she adds to it. */
const lastPoseOf = (sec) => {
  for (let i = sec.steps.length - 1; i >= 0; i--) {
    const st = sec.steps[i]
    if (st.kind === 'pose') return st.pose
    if (st.kind === 'flow') return st.poses[st.poses.length - 1]
    if (st.kind === 'sun') return 'downward-dog'
  }
  return null
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
  const [sheet, setSheet] = useState(null) // { section, replace?, alts?, after? }
  const [confirm, setConfirm] = useState(false)
  const [flash, setFlash] = useState(null)
  const [mat, setMat] = useState(false)
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
  const sheetList = useMemo(() => {
    if (!plan || !sheet) return []
    const lead = sheet.alts?.length ? sheet.alts : sheet.after !== undefined ? followers(plan, sheet.after) : []
    return [...lead, ...suggested.filter((p) => !lead.includes(p))]
  }, [plan, sheet, suggested])

  if (plan === undefined) return null
  if (!plan)
    return (
      <div className="tint-sage">
        <Header title={C.title} back="/classes" />
        <p className="rounded-3xl border border-dashed border-line bg-paper/60 p-5 text-center text-caption text-muted">{C.draftLost}</p>
        <div className="mt-5"><Button size="lg" onClick={() => navigate('/classes/new')} className="w-full">{C.backToBuilder}</Button></div>
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
          return { ...s, steps: s.steps.map((st) => (st.id === replace ? { ...step, id: st.id, ...(st.peak ? { peak: true } : {}), ...(st.minutes ? { minutes: getPose(poseId)?.yin?.holdMinutes || st.minutes } : { breaths: st.breaths }) } : st)) }
        }),
      }
    })
  }

  const another = () => { audio.stop(); update((p) => buildPlan({ ...specOf(p), seed: p.seed + 1 })) }

  const ask = async () => {
    if (busy) return
    setBusy(true); setError(null)
    try {
      const out = await api.plan(plan.request, planForAI(plan), catalogForAI(), goalsForAI())
      let next = plan
      // The app could not read her words: Gemini did, so the class is rebuilt for what she meant.
      if (!plan.goals.length && !plan.cautions.length && !plan.peak && (out.goals?.length || out.cautions?.length)) next = buildPlan({ ...specOf(plan), goals: out.goals, cautions: out.cautions })
      update(() => applyAI(next, out))
    } catch (err) {
      setError(`${C.error} (${err.message})`)
    } finally {
      setBusy(false)
    }
  }

  const say = (msg) => { setFlash(msg); setTimeout(() => setFlash(null), 1800) }
  const persist = async (p) => { await store.put('classes', { ...p, savedAt: p.savedAt || Date.now() }); setDirty(false) }
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
  // Taught today: one date a day, saved at once so the shelf remembers even if she never taps Save.
  const today = (plan.taught || []).some((ms) => new Date(ms).toDateString() === new Date().toDateString())
  const taughtToday = async () => {
    if (today) return
    const next = { ...plan, taught: [...(plan.taught || []), Date.now()] }
    setPlan(next)
    if (!draft) await persist(next)
    else setDirty(true)
    say(C.taughtDone)
  }
  const duplicate = async () => {
    const copy = duplicatePlan(plan)
    await store.put('classes', { ...copy, savedAt: Date.now() })
    navigate(`/classes/${copy.id}`)
  }
  const jump = (key) => {
    const el = document.querySelector(`[data-sec="${CSS.escape(key)}"], [data-step="${CSS.escape(key)}"]`)
    const calm = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    el?.scrollIntoView({ block: 'start', behavior: calm ? 'auto' : 'smooth' })
  }

  const poseCount = plan.sections.reduce((n, s) => n + s.steps.reduce((m, st) => m + (st.kind === 'pose' ? 1 : st.kind === 'flow' ? st.poses.length : 0), 0), 0)
  const ai = plan.ai
  const peak = plan.peak ? getPose(plan.peak) : null
  const time = timeBalance(plan)
  const timeLine = Math.abs(time.diff) <= Math.max(3, time.target * 0.1)
    ? fill(C.time.ok, { a: time.actual, m: time.target })
    : time.diff > 0 ? fill(C.time.over, { n: time.diff, m: time.target }) : fill(C.time.under, { n: -time.diff, m: time.target })
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
        subtitle={`${timeLine} · ${fill(C.posesCount, { n: poseCount })}`}
      />

      <div className="wash rounded-4xl border border-line/60 p-5 shadow-card">
        {plan.request && <p className="font-serif text-body-lg italic text-ink">“{plan.request}”</p>}
        <div className={`${plan.request ? 'mt-3' : ''} flex flex-wrap gap-1.5`}>
          {peak && <Tag tone="tint">★ {C.toward} {peak.en}</Tag>}
          {!student && <Tag tone="tint">{t.poses[plan.style]}</Tag>}
          {plan.level && <Tag>{t.poses.levels[plan.level]}</Tag>}
          {plan.goals.map((g) => { const x = getGoal(g); return x ? <Tag key={g} tone="tint">{L(x.label)}</Tag> : null })}
          {plan.cautions.map((c) => { const x = getCaution(c); return x ? <Tag key={c} tone="gold">{L(x.label)}</Tag> : null })}
        </div>
        {!student && <div className="mt-4"><ArcBar plan={plan} titles={SECTION_TITLES} onJump={jump} /></div>}
        <div className="mt-5 flex items-center gap-2.5">
          <Button size="lg" onClick={lead} className="flex-1"><Waves size={18} /> {C.rehearse}</Button>
          <Button size="lg" kind="secondary" onClick={() => setMat(true)} aria-label={C.mat} className="!px-4"><LayoutList size={19} /></Button>
          <Button size="lg" kind={dirty || draft ? 'secondary' : 'soft'} onClick={save} disabled={!dirty && !draft} aria-label={C.save} className="!px-4">
            {dirty || draft ? <Bookmark size={19} /> : <BookmarkCheck size={19} />}
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="min-w-0 text-caption text-muted">{flash || C.rehearseHelp}</p>
          <span className="shrink-0"><TaughtLine plan={plan} /></span>
        </div>
      </div>

      {student && (plan.care?.length > 0) && (
        <Section title={C.careLines}>
          <div className="tint-clay rounded-3xl border border-line/70 bg-paper p-2 shadow-card">
            {plan.care.map((l) => <Say key={l.id} id={l.id} en={l.en} vi={l.vi} />)}
          </div>
        </Section>
      )}

      <Section title={C.before}>
        <div className="space-y-2.5">
          <PropsCard plan={plan} />
          <WordsCard plan={plan} />
          <MusclesCard plan={plan} />
        </div>
      </Section>

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

      {!student && (
        <Section title={C.check}>
          <SeqNotes plan={plan} onJump={jump} />
        </Section>
      )}

      {plan.sections.map((sec) => (
        <div key={sec.key} data-sec={sec.key} className="scroll-mt-4">
          <Section
            title={L(SECTION_TITLES[sec.key] || { en: sec.key, vi: sec.key })}
            action={
              <span className="text-caption text-muted">
                {sec.key === 'peak' && peak ? <span className="mr-2 text-tint-deep">★ {peak.en}</span> : null}
                {Math.max(1, Math.round(sectionSeconds(sec, plan.style) / 60))} {C.min}
              </span>
            }
          >
            <div className="space-y-2.5">
              {sec.steps.map((step, i) => (
                <div key={step.id} data-step={step.id} className="scroll-mt-4">
                  {step.kind === 'lines' ? <LinesStep step={step} />
                    : step.kind === 'thought' ? <ThoughtStep step={step} onAnother={() => update((p) => nextThought(p))} onRemove={() => remove(sec.key, step.id)} />
                    : step.kind === 'sun' ? <SunStep step={step} controls={controlsFor(sec, i, step)} />
                    : step.kind === 'flow' ? <FlowStep step={step} controls={controlsFor(sec, i, step)} />
                    : <PoseStep step={step} onCycle={() => cycle(sec.key, step.id)} controls={controlsFor(sec, i, step)} />}
                </div>
              ))}
            </div>
            {EDITABLE.has(sec.key) && (
              <div className="mt-2 flex justify-end">
                <Button kind="quiet" size="sm" onClick={() => setSheet({ section: sec.key, after: lastPoseOf(sec) })}><Plus size={15} /> {C.add}</Button>
              </div>
            )}
          </Section>
        </div>
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

      <Section title={C.notes}>
        <NotesCard value={plan.notes} onChange={(v) => update((p) => ({ ...p, notes: v }))} />
      </Section>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <Button kind="secondary" onClick={taughtToday} disabled={today} className={today ? 'tint-sage !border-tint/60 !text-tint-deep' : ''}><CalendarCheck size={17} /> {today ? C.taughtDone : C.taughtToday}</Button>
        <Button kind="secondary" onClick={share}><Share2 size={17} /> {C.share}</Button>
        {!student && <Button kind="secondary" onClick={another}><Shuffle size={17} /> {C.another}</Button>}
        {!draft && <Button kind="secondary" onClick={duplicate}><Copy size={17} /> {C.duplicate}</Button>}
        {!draft && (
          <Button kind="quiet" onClick={del} className={confirm ? 'tint-clay' : ''}><Trash2 size={17} /> {confirm ? C.confirmDelete : C.delete}</Button>
        )}
      </div>
      <div className="mt-3 flex flex-col items-start gap-1">
        <KeepOffline key={plan.id} ids={planClipIds(plan)} label={C.keepOffline} />
        <SourcesLink className="mt-1 px-1" />
      </div>

      <PoseSheet open={!!sheet} onClose={() => setSheet(null)} onPick={pick} suggested={sheetList} suggestedTitle={sheet?.after !== undefined && !sheet?.alts ? C.follows : null} tint={tint} />
      <Rehearse runner={runner} />
      {mat && <MatView plan={plan} titles={SECTION_TITLES} onClose={() => setMat(false)} />}
    </div>
  )
}
