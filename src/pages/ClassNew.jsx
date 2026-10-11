import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { getPose, POSES } from '../lib/content.js'
import { buildPlan, parseRequest, peaksFor, GOALS, CAUTIONS, STYLES, MINUTES, LEVELS } from '../lib/planner.js'
import { Button, Chip, Eyebrow, Header, Section, Tag } from '../components/ui.jsx'
import { SettingsButton } from '../components/SettingsSheet.jsx'
import PoseSheet from '../components/PoseSheet.jsx'
import { styleTint, tintClass } from '../lib/tints.js'

const MODES = ['class', 'student']
const STUDENT_MINUTES = [10, 15, 20]
/** Where a built class waits until she saves it. */
export const DRAFT = 'ye.class.draft'
/** The landmarks of the primary series she might practise up to, in order. */
const LANDMARKS = ['janu-sirsasana', 'marichyasana', 'boat-pose', 'bound-angle', 'setu-bandhasana']

// What she typed and which mode, kept for the tab session so coming back
// from a plan does not lose her words.
const recall = (k, fallback) => { try { return sessionStorage.getItem(`ye.classes.${k}`) ?? fallback } catch { return fallback } }
const remember = (k, v) => { try { sessionStorage.setItem(`ye.classes.${k}`, v) } catch { /* private mode: fine */ } }

/** Does this pose belong to the style the class is in? */
const inStyle = (p, style) => !!p && (style === 'yin' ? !!p.yin : p.styles.includes(style))
const styleOfPose = (p) => (p?.yin && !p.styles.includes('vinyasa') ? 'yin' : p?.styles.includes('vinyasa') ? 'vinyasa' : p?.styles[0] || 'vinyasa')

/**
 * The builder. She writes what the class is for, or what a student said,
 * in Vietnamese or English; the app reads it on the phone (theme, cautions,
 * style, length, level), shows what it understood as chips she can
 * correct, and builds the class with no network at all. A peak pose turns
 * the class into a ladder toward it; for Ashtanga, "practise up to" cuts
 * the series the Mysore way. Gemini is a button on the plan, not a step in
 * the way.
 */
export default function ClassNew() {
  const { t, ui } = useLang()
  const C = t.classes
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const fromPeak = getPose(params.get('peak') || '')
  const fromUpTo = getPose(params.get('upTo') || '')
  const [mode, setModeState] = useState(() => (fromPeak || fromUpTo ? 'class' : MODES.includes(recall('mode', 'class')) ? recall('mode', 'class') : 'class'))
  const [text, setTextState] = useState(() => recall('text', ''))
  const [picks, setPicks] = useState({ style: fromUpTo?.ashtanga ? 'ashtanga' : fromPeak ? styleOfPose(fromPeak) : null, minutes: null, level: null, on: [], off: [], peak: fromPeak?.id || null, upTo: fromUpTo?.ashtanga ? fromUpTo.id : null })
  const [sheet, setSheet] = useState(null) // 'peak' | 'upTo'
  const L = (o) => (ui === 'vi' ? o.vi : o.en)

  const setMode = (m) => { remember('mode', m); setModeState(m) }
  const setText = (v) => { remember('text', v); setTextState(v) }

  const parsed = useMemo(() => parseRequest(text), [text])
  const student = mode === 'student'
  const style = picks.style || parsed.style || 'vinyasa'
  const minutes = picks.minutes || parsed.minutes || (student ? 15 : 60)
  const peak = !student && style !== 'ashtanga' && inStyle(getPose(picks.peak), style) ? getPose(picks.peak) : null
  const upTo = !student && style === 'ashtanga' ? getPose(picks.upTo) : null
  const level = picks.level !== null ? picks.level : parsed.level || (peak ? peak.level : null)
  const active = (kind, id) => {
    const key = `${kind}:${id}`
    if (picks.on.includes(key)) return true
    if (picks.off.includes(key)) return false
    return (kind === 'goal' ? parsed.goals : parsed.cautions).includes(id)
  }
  const toggle = (kind, id) => {
    const key = `${kind}:${id}`
    const isOn = active(kind, id)
    setPicks((p) => (isOn ? { ...p, on: p.on.filter((x) => x !== key), off: [...p.off, key] } : { ...p, off: p.off.filter((x) => x !== key), on: [...p.on, key] }))
  }
  const goals = GOALS.filter((g) => active('goal', g.id)).map((g) => g.id)
  const cautions = CAUTIONS.filter((c) => active('caution', c.id)).map((c) => c.id)
  const understood = [...GOALS.filter((g) => goals.includes(g.id)).map((g) => ({ ...g, kind: 'goal' })), ...CAUTIONS.filter((c) => cautions.includes(c.id)).map((c) => ({ ...c, kind: 'caution' }))]

  const build = () => {
    const plan = buildPlan({ mode, style, minutes, level: level || undefined, goals, cautions, request: text.trim(), peak: peak?.id, upTo: upTo?.id })
    try { sessionStorage.setItem(DRAFT, JSON.stringify(plan)) } catch { /* the plan page will say so */ }
    navigate('/classes/draft')
  }

  const tint = student ? 'clay' : styleTint(style)
  const pill = (list, value, onPick, label, tone) => (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
      {list.map((v) => <Chip key={String(v)} active={value === v} onClick={() => onPick(v)} tone={tone?.(v)} className="whitespace-nowrap">{label(v)}</Chip>)}
    </div>
  )
  const peaks = peaksFor(style)
  const series = POSES.filter((p) => p.ashtanga).sort((a, b) => a.ashtanga.position - b.ashtanga.position)

  return (
    <div className={tintClass(tint)}>
      <Header title={C.title} subtitle={C.intro} back="/classes" right={<SettingsButton />} />

      <div role="tablist" className="mb-4 grid grid-cols-2 gap-1 rounded-full bg-tint-soft p-1">
        {MODES.map((m) => (
          <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)}
            className={`press min-h-[40px] rounded-full px-3 text-[14px] font-medium transition-colors ${mode === m ? 'bg-paper text-tint-deep shadow-sm' : 'text-tint-deep/75'}`}>
            {m === 'class' ? C.modeClass : C.modeStudent}
          </button>
        ))}
      </div>

      <div className="wash rounded-4xl border border-line/60 p-4 shadow-card">
        <textarea
          value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder={student ? C.placeholderStudent : C.placeholderClass}
          className="w-full resize-none rounded-3xl border border-line/70 bg-paper p-4 text-body-lg text-ink outline-none placeholder:text-muted/60 focus:border-tint"
        />
        <div className="mt-3 px-1">
          <Eyebrow className="mb-1.5">{C.understood}</Eyebrow>
          {understood.length || peak || upTo ? (
            <div className="flex flex-wrap gap-1.5">
              {peak && <Tag tone="tint" className="!text-[13px]">★ {C.toward} {peak.en}</Tag>}
              {upTo && <Tag tone="tint" className="!text-[13px]">{C.upTo} {upTo.en}</Tag>}
              {understood.map((x) => <Tag key={`${x.kind}:${x.id}`} tone={x.kind === 'caution' ? 'gold' : 'tint'} className="!text-[13px]">{L(x.label)}</Tag>)}
              {!student && <Tag className="!text-[13px]">{t.poses[style]}</Tag>}
              <Tag className="!text-[13px]">{minutes} {C.min}</Tag>
              {level && <Tag className="!text-[13px]">{t.poses.levels[level]}</Tag>}
            </div>
          ) : (
            <p className="text-caption text-muted">{C.nothingYet}</p>
          )}
        </div>
      </div>

      {!student && (
        <Section title={C.style}>
          {pill(STYLES, style, (v) => setPicks((p) => ({ ...p, style: v })), (v) => t.poses[v], styleTint)}
        </Section>
      )}

      {!student && style !== 'ashtanga' && (
        <Section title={C.peak}>
          <p className="mb-2.5 px-1 text-caption text-muted">{C.peaksLead}</p>
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
            <Chip active={!peak} onClick={() => setPicks((p) => ({ ...p, peak: null }))} className="whitespace-nowrap">{C.peakNone}</Chip>
            {peak && !peaks.includes(peak) && <Chip active onClick={() => setSheet('peak')} className="whitespace-nowrap">★ {peak.en}</Chip>}
            {peaks.map((p) => <Chip key={p.id} active={peak?.id === p.id} onClick={() => setPicks((x) => ({ ...x, peak: p.id }))} className="whitespace-nowrap">{p.en}</Chip>)}
            <Chip onClick={() => setSheet('peak')} className="whitespace-nowrap"><Search size={14} className="mr-1.5" /> {C.pickPeak}</Chip>
          </div>
        </Section>
      )}

      {!student && style === 'ashtanga' && (
        <Section title={C.upTo}>
          <p className="mb-2.5 px-1 text-caption text-muted">{C.upToHelp}</p>
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
            <Chip active={!upTo} onClick={() => setPicks((p) => ({ ...p, upTo: null }))} className="whitespace-nowrap">{C.upToNone}</Chip>
            {upTo && !LANDMARKS.includes(upTo.id) && <Chip active onClick={() => setSheet('upTo')} className="whitespace-nowrap">{upTo.sa || upTo.en}</Chip>}
            {LANDMARKS.map(getPose).filter(Boolean).map((p) => <Chip key={p.id} active={upTo?.id === p.id} onClick={() => setPicks((x) => ({ ...x, upTo: p.id }))} className="whitespace-nowrap">{p.sa || p.en}</Chip>)}
            <Chip onClick={() => setSheet('upTo')} className="whitespace-nowrap"><Search size={14} className="mr-1.5" /> {C.pickUpTo}</Chip>
          </div>
        </Section>
      )}

      <Section title={C.minutes}>
        {pill(student ? STUDENT_MINUTES : MINUTES, minutes, (v) => setPicks((p) => ({ ...p, minutes: v })), (v) => `${v} ${C.min}`)}
      </Section>
      {!student && (
        <Section title={C.level}>
          {pill([null, ...LEVELS], level, (v) => setPicks((p) => ({ ...p, level: v })), (v) => (v ? t.poses.levels[v] : C.any))}
        </Section>
      )}
      <Section title={C.goals}>
        <div className="flex flex-wrap gap-2">
          {GOALS.map((g) => <Chip key={g.id} active={goals.includes(g.id)} onClick={() => toggle('goal', g.id)}>{L(g.label)}</Chip>)}
        </div>
      </Section>
      <Section title={C.cautions}>
        <div className="flex flex-wrap gap-2">
          {CAUTIONS.map((c) => <Chip key={c.id} active={cautions.includes(c.id)} onClick={() => toggle('caution', c.id)} tone="clay">{L(c.label)}</Chip>)}
        </div>
      </Section>

      <div className="mt-7">
        <Button size="lg" onClick={build} className="w-full">{student ? C.buildStudent : C.build} <ArrowRight size={18} /></Button>
      </div>

      <PoseSheet
        open={sheet === 'peak'} onClose={() => setSheet(null)} tint={tint} title={C.pickPeak}
        suggested={peaks} only={(p) => inStyle(p, style)}
        onPick={(id) => { setSheet(null); setPicks((p) => ({ ...p, peak: id })) }}
      />
      <PoseSheet
        open={sheet === 'upTo'} onClose={() => setSheet(null)} tint={tint} title={C.pickUpTo} suggestedTitle={t.poses.ashtangaNote}
        suggested={series} only={() => false}
        onPick={(id) => { setSheet(null); setPicks((p) => ({ ...p, upTo: id })) }}
      />
    </div>
  )
}
