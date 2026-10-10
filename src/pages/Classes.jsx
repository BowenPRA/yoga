import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { store } from '../lib/store.js'
import { buildPlan, parseRequest, planMinutes, GOALS, CAUTIONS, STYLES, MINUTES, LEVELS } from '../lib/planner.js'
import { Button, Card, Chip, Eyebrow, Header, Section, Tag } from '../components/ui.jsx'
import { SettingsButton } from '../components/SettingsSheet.jsx'
import { styleTint, tintClass } from '../lib/tints.js'

const MODES = ['class', 'student']
const STUDENT_MINUTES = [10, 15, 20]
export const DRAFT = 'ye.class.draft'
const fill = (s, vars) => Object.entries(vars).reduce((out, [k, v]) => out.replace(`{${k}}`, v), s)

// What she typed and which mode, kept for the tab session so coming back
// from a plan does not lose her words.
const recall = (k, fallback) => { try { return sessionStorage.getItem(`ye.classes.${k}`) ?? fallback } catch { return fallback } }
const remember = (k, v) => { try { sessionStorage.setItem(`ye.classes.${k}`, v) } catch { /* private mode: fine */ } }

/**
 * The Class Builder. She writes what the class is for, or what a student
 * said, in Vietnamese or English; the app reads it on the phone (theme,
 * cautions, style, length, level), shows what it understood as chips she
 * can correct, and builds the class with no network at all. Gemini is a
 * button on the plan, not a step in the way.
 */
export default function Classes() {
  const { t, ui } = useLang()
  const C = t.classes
  const navigate = useNavigate()
  const [mode, setModeState] = useState(() => (MODES.includes(recall('mode', 'class')) ? recall('mode', 'class') : 'class'))
  const [text, setTextState] = useState(() => recall('text', ''))
  const [picks, setPicks] = useState({ style: null, minutes: null, level: null, on: [], off: [] })
  const [saved, setSaved] = useState([])
  const L = (o) => (ui === 'vi' ? o.vi : o.en)

  useEffect(() => {
    store.all('classes').then((rows) => setSaved(rows.sort((a, b) => (b.savedAt || b.at) - (a.savedAt || a.at))))
  }, [])

  const setMode = (m) => { remember('mode', m); setModeState(m) }
  const setText = (v) => { remember('text', v); setTextState(v) }

  const parsed = useMemo(() => parseRequest(text), [text])
  const student = mode === 'student'
  const style = picks.style || parsed.style || 'vinyasa'
  const minutes = picks.minutes || parsed.minutes || (student ? 15 : 60)
  const level = picks.level !== null ? picks.level : parsed.level
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
    const plan = buildPlan({ mode, style, minutes, level: level || undefined, goals, cautions, request: text.trim() })
    try { sessionStorage.setItem(DRAFT, JSON.stringify(plan)) } catch { /* the plan page will say so */ }
    navigate('/classes/draft')
  }

  const tint = student ? 'clay' : styleTint(style)
  const pill = (list, value, onPick, label, tone) => (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
      {list.map((v) => <Chip key={String(v)} active={value === v} onClick={() => onPick(v)} tone={tone?.(v)} className="whitespace-nowrap">{label(v)}</Chip>)}
    </div>
  )

  return (
    <div className={tintClass(tint)}>
      <Header title={C.title} subtitle={C.intro} back="/poses" right={<SettingsButton />} />

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
          {understood.length ? (
            <div className="flex flex-wrap gap-1.5">
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

      <Section title={C.saved}>
        {saved.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-line bg-paper/60 p-5 text-center text-caption text-muted">{C.savedEmpty}</p>
        ) : (
          <div className="space-y-2.5">
            {saved.map((p) => (
              <Card key={p.id} to={`/classes/${p.id}`} tint={p.mode === 'student' ? 'clay' : styleTint(p.style)} pad="p-4">
                <div className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="font-serif text-[18px] leading-snug text-ink">{L(p.title)}</div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      {p.mode === 'student' ? <Tag tone="tint">{C.tags.student}</Tag> : <Tag tone="tint">{t.poses[p.style]}</Tag>}
                      <Tag>{fill(C.about, { n: planMinutes(p) })}</Tag>
                      <span className="text-[12px] text-muted">{new Date(p.savedAt || p.at).toLocaleDateString(ui === 'vi' ? 'vi-VN' : 'en-GB', { day: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-muted" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}
