import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ClipboardList, Plus } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { store } from '../lib/store.js'
import { buildPlan, peaksFor, planMinutes, getGoal } from '../lib/planner.js'
import { Card, Eyebrow, Header, PoseArt, Section, Tag } from '../components/ui.jsx'
import { SettingsButton } from '../components/SettingsSheet.jsx'
import { TaughtLine } from '../components/plan.jsx'
import { styleTint, tintClass } from '../lib/tints.js'
import { DRAFT } from './ClassNew.jsx'

const fill = (s, vars) => Object.entries(vars).reduce((out, [k, v]) => out.replace(`{${k}}`, v), s)

/** The classes a tap away: a style, a length, a theme. */
const QUICK = [
  { style: 'vinyasa', minutes: 60, goals: ['energy'] },
  { style: 'yin', minutes: 60, goals: ['hips'] },
  { style: 'vinyasa', minutes: 45, goals: ['calm'] },
  { style: 'ashtanga', minutes: 90, goals: [] },
  { style: 'vinyasa', minutes: 60, goals: ['backbends'] },
  { style: 'yin', minutes: 75, goals: ['spine'] },
  { style: 'vinyasa', minutes: 30, goals: ['hamstrings'], level: 'gentle' },
]

/** When a class last mattered: taught, else saved. */
const last = (p) => Math.max(p.savedAt || p.at || 0, ...(p.taught || []))

/**
 * The Classes tab. One way in for a new class, a few quick starts, the
 * peaks a class can build toward, and the classes she has saved, with when
 * she taught them. Nothing to count, nothing to keep up: a shelf.
 */
export default function Classes() {
  const { t, ui } = useLang()
  const C = t.classes
  const navigate = useNavigate()
  const [saved, setSaved] = useState([])
  const L = (o) => (ui === 'vi' ? o.vi : o.en)

  useEffect(() => {
    store.all('classes').then((rows) => setSaved(rows.sort((a, b) => last(b) - last(a))))
  }, [])

  const start = (spec) => {
    const plan = buildPlan(spec)
    try { sessionStorage.setItem(DRAFT, JSON.stringify(plan)) } catch { /* the plan page will say so */ }
    navigate('/classes/draft')
  }
  const quickLabel = (q) => [t.poses[q.style], `${q.minutes} ${C.min}`, ...q.goals.map((g) => L(getGoal(g).label))].join(' · ')
  const peaks = [...peaksFor('vinyasa').slice(0, 8), ...peaksFor('yin').slice(0, 4)]

  return (
    <div className="tint-sage">
      <Header title={C.tabTitle} subtitle={C.tabLead} right={<SettingsButton />} />

      <Card to="/classes/new" wash tint="gold" pad="p-4" className="rise-1">
        <div className="flex items-center gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-tint-deep text-paper shadow-float"><Plus size={24} /></span>
          <div className="min-w-0 flex-1">
            <div className="font-serif text-heading leading-snug text-ink">{C.newClass}</div>
            <div className="text-caption leading-snug text-muted">{C.newLead}</div>
          </div>
          <ChevronRight size={18} className="shrink-0 text-muted" />
        </div>
      </Card>

      <Section title={C.quick} className="rise-2">
        <p className="mb-2.5 px-1 text-caption text-muted">{C.quickLead}</p>
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
          {QUICK.map((q, i) => (
            <button key={i} onClick={() => start(q)} className={`${tintClass(styleTint(q.style))} press shrink-0 rounded-3xl border border-line/70 bg-paper px-4 py-3 text-left shadow-card`}>
              <div className="text-[12px] font-semibold uppercase tracking-wider text-tint-deep">{t.poses[q.style]} · {q.minutes}′</div>
              <div className="mt-0.5 font-serif text-[17px] text-ink">{q.goals.length ? q.goals.map((g) => L(getGoal(g).label)).join(', ') : t.poses.ashtangaNote}</div>
              <span className="sr-only">{quickLabel(q)}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section title={C.peaks} className="rise-3">
        <p className="mb-2.5 px-1 text-caption text-muted">{C.peaksLead}</p>
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-1">
          {peaks.map((p) => (
            <button key={p.id} onClick={() => navigate(`/classes/new?peak=${p.id}`)} className={`${tintClass(styleTint(p.yin && !p.styles.includes('vinyasa') ? 'yin' : 'vinyasa'))} press w-[132px] shrink-0 rounded-3xl border border-line/70 bg-paper p-3 text-left shadow-card`}>
              <PoseArt pose={p} size={52} />
              <div className="mt-2.5 font-serif text-[16px] leading-tight text-ink">{p.en}</div>
              <div className="mt-0.5 truncate text-[12px] text-muted">{p.vi}</div>
            </button>
          ))}
        </div>
      </Section>

      <Section title={C.saved} className="rise-3">
        {saved.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-line bg-paper/60 p-5 text-center text-caption text-muted">{C.savedEmpty}</p>
        ) : (
          <div className="space-y-2.5">
            {saved.map((p) => (
              <Card key={p.id} to={`/classes/${p.id}`} tint={p.mode === 'student' ? 'clay' : styleTint(p.style)} pad="p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-tint-soft text-tint-deep"><ClipboardList size={19} /></span>
                  <div className="min-w-0 flex-1">
                    <div className="font-serif text-[18px] leading-snug text-ink">{L(p.title)}</div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      {p.mode === 'student' ? <Tag tone="tint">{C.tags.student}</Tag> : <Tag tone="tint">{t.poses[p.style]}</Tag>}
                      {p.level && t.poses.levels[p.level] && <Tag>{t.poses.levels[p.level]}</Tag>}
                      <Tag>{fill(C.about, { n: planMinutes(p) })}</Tag>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2">
                      <TaughtLine plan={p} />
                      {p.notes && <span className="min-w-0 truncate text-[12px] text-muted">· {p.notes.split('\n')[0]}</span>}
                    </div>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-muted" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>
      <Eyebrow className="sr-only">{C.saved}</Eyebrow>
    </div>
  )
}
