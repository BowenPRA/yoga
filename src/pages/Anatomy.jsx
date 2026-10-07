import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, Search } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { MUSCLES, BONES_ALL, MOVEMENTS_ALL, LESSONS, POSES, getTerm, searchTerms } from '../lib/content.js'
import { FIGURES, MUSCLE_REGIONS, SKELETON_LANDMARKS } from '../../content/anatomy/regions.js'
import { FIGURE_SRC, BONE_BOXES, figureOf, windowFor } from '../lib/figures.js'
import { progress, isKnown } from '../lib/store.js'
import { Button, Chip, Eyebrow, PlayButton, Porthole, Ring, SayHint, Tag } from '../components/ui.jsx'
import FigureViewer from '../components/FigureViewer.jsx'
import AnatomyCard from '../components/AnatomyCard.jsx'
import { SettingsButton } from '../components/SettingsSheet.jsx'
import { tintClass, lessonTint, lessonArt, poseTint, dayPart } from '../lib/tints.js'
import { useText } from '../lib/lesson.js'

const BASE = import.meta.env.BASE_URL
const TABS = ['muscles', 'bones', 'movements']
const { w: SK_W, h: SK_H } = FIGURE_SRC.skeleton
const boneBoxes = BONE_BOXES

/** How far through a lesson she is, 0 to 1, from the row the store keeps. */
const ringValue = (lesson, row) => {
  if (!lesson?.slides || !row) return 0
  if (row.done) return 1
  return (row.slide || 0) / Math.max(1, lesson.slides.length - 1)
}

/** A pose for today's class: the same one all day, a different one tomorrow. */
function poseOfTheDay() {
  const now = new Date()
  const day = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)
  return POSES[day % POSES.length]
}

/**
 * The welcome: a greeting for the hour and one clear thing to do next. A
 * lesson she has started comes first, then the next one she has not done,
 * and when every lesson is done, a pose for today's class.
 */
function Home({ rows }) {
  const { t } = useLang()
  const text = useText()
  const navigate = useNavigate()
  const h = t.home
  const L = t.learn
  const part = dayPart()
  const greet = h[part === 'night' ? 'evening' : part]

  const open = LESSONS.filter((l) => l.slides)
  const started = open.find((l) => rows[l.id] && !rows[l.id].done && rows[l.id].slide > 0)
  const fresh = open.find((l) => !rows[l.id]?.done)
  const lesson = started || fresh || null
  const pose = lesson ? null : poseOfTheDay()

  let hero = null
  if (lesson) {
    const row = rows[lesson.id]
    const art = lessonArt(lesson)
    hero = (
      <div className={`${tintClass(lessonTint(lesson))} wash rise-2 mt-5 rounded-4xl border border-line/60 p-5 shadow-card`}>
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <Eyebrow tone="tint">{h.nextUp}</Eyebrow>
            <div className="mt-1.5 font-serif text-heading text-ink">{text(lesson.title)}</div>
            <div className="mt-0.5 text-[12px] text-muted">{lesson.terms.length} {L.words} · {lesson.minutes} {L.minutes}</div>
            <p className="mt-2.5 text-caption text-muted">{text(lesson.lead)}</p>
          </div>
          {art && <Porthole kind={art.kind} window={art.window} size={80} className="mt-1 shadow-card" />}
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Button size="lg" onClick={() => navigate(`/learn/${lesson.id}`)} className="flex-1">
            {started ? h.continueLesson : h.startLesson} <ArrowRight size={18} />
          </Button>
          <Ring value={ringValue(lesson, row)} done={!!row?.done} size={44} stroke={3.5} />
        </div>
      </div>
    )
  } else if (pose) {
    const first = pose.muscles?.working?.[0]
    const kind = first ? figureOf(first) : null
    const win = kind ? windowFor(kind, first) : null
    hero = (
      <div className={`${tintClass(poseTint(pose))} wash rise-2 mt-5 rounded-4xl border border-line/60 p-5 shadow-card`}>
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <Eyebrow tone="tint">{h.poseToday}</Eyebrow>
            <div className="mt-1.5 font-serif text-heading text-ink">{pose.en}</div>
            <div className="mt-0.5 text-caption text-muted">{pose.vi}{pose.sa ? ` · ${pose.sa}` : ''}</div>
          </div>
          {win && <Porthole kind={kind} window={win} highlight={[first]} size={80} className="mt-1 shadow-card" />}
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Button size="lg" onClick={() => navigate(`/poses/${pose.id}`)} className="flex-1">{h.openPose} <ArrowRight size={18} /></Button>
          <PlayButton id={`${pose.id}__en`} size={44} />
        </div>
      </div>
    )
  }

  return (
    <section className="mb-8">
      <div className="rise-1 flex items-start justify-between gap-3 pt-2">
        <div className="min-w-0">
          <h1 className="font-serif text-display text-ink">{greet}</h1>
          <p className="mt-1.5 text-body text-muted">{h.lead}</p>
        </div>
        <SettingsButton />
      </div>
      {hero}
    </section>
  )
}

/** The row of lessons by region: a picture, a ring, and where she stands. */
function LessonRow({ rows }) {
  const { t } = useLang()
  const text = useText()
  const L = t.learn
  const navigate = useNavigate()
  return (
    <section className="rise-3 mb-8">
      <Eyebrow className="px-1">{L.lessons}</Eyebrow>
      <div className="no-scrollbar -mx-5 mt-3 flex gap-3 overflow-x-auto px-5 pb-2 pt-0.5">
        {LESSONS.map((l) => {
          const row = rows[l.id]
          const open = !!l.slides
          const started = row && !row.done && row.slide > 0
          const art = lessonArt(l)
          return (
            <button
              key={l.id} disabled={!open} onClick={() => navigate(`/learn/${l.id}`)}
              className={`${tintClass(lessonTint(l))} press w-[168px] shrink-0 rounded-3xl border border-line/70 p-4 text-left ${open ? 'wash shadow-card' : 'bg-paper/60'}`}
            >
              <div className="flex items-start justify-between gap-2">
                {art ? <Porthole kind={art.kind} window={art.window} size={52} className={open ? '' : 'opacity-60'} /> : <span className="h-[52px]" />}
                {open ? <Ring value={ringValue(l, row)} done={!!row?.done} size={26} stroke={2.5} /> : <Tag tone="gold">{L.soon}</Tag>}
              </div>
              <div className={`mt-3 font-serif text-[19px] leading-tight ${open ? 'text-ink' : 'text-muted'}`}>{text(l.title)}</div>
              <div className="mt-1 min-h-[18px] text-[12px] text-muted">{open ? `${l.terms.length} ${L.words} · ${l.minutes} ${L.minutes}` : ''}</div>
              {open && <div className="mt-2 text-caption font-medium text-tint-deep">{row?.done ? L.again : started ? L.resume : L.start}</div>}
            </button>
          )
        })}
      </div>
      <p className="mt-1 px-1 text-caption text-muted">{L.lessonsIntro}</p>
    </section>
  )
}

export default function Anatomy() {
  const { t } = useLang()
  const a = t.anatomy
  const h = t.home
  const navigate = useNavigate()
  const { tab = 'muscles', id } = useParams()
  const [view, setView] = useState('front')
  const [showAll, setShowAll] = useState(false)
  const [q, setQ] = useState('')
  const [known, setKnown] = useState({})
  const [rows, setRows] = useState({})
  useEffect(() => { progress.terms().then((r) => setKnown(Object.fromEntries(Object.entries(r).map(([k, row]) => [k, isKnown(row)])))) }, [id])
  useEffect(() => { progress.lessons().then(setRows) }, [])

  const term = id ? getTerm(id) : null
  const open = (tid) => navigate(tid ? `/anatomy/${tab}/${tid}` : `/anatomy/${tab}`)
  const setTab = (tb) => { setQ(''); navigate(`/anatomy/${tb}`) }

  const list = tab === 'muscles' ? MUSCLES : tab === 'bones' ? BONES_ALL : MOVEMENTS_ALL
  const filtered = useMemo(() => searchTerms(q, list), [q, list])
  const grouped = useMemo(() => {
    const m = new Map()
    for (const x of filtered) {
      const k = tab === 'movements' ? 'all' : x.region || 'other'
      if (!m.has(k)) m.set(k, [])
      m.get(k).push(x)
    }
    return [...m.entries()]
  }, [filtered, tab])

  const regionsForView = MUSCLE_REGIONS[view]
  const available = useMemo(() => new Set(Object.keys(regionsForView)), [regionsForView])
  // When a muscle is only on the other side, switch the figure to it.
  const openMuscle = (tid) => {
    if (tid && tab === 'muscles' && !MUSCLE_REGIONS[view][tid]) {
      const other = view === 'front' ? 'back' : 'front'
      if (MUSCLE_REGIONS[other][tid]) setView(other)
    }
    open(tid)
  }

  const regionsToggle = (
    <button onClick={() => setShowAll((s) => !s)} className="press inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-2 text-caption text-muted">
      {showAll ? <EyeOff size={14} /> : <Eye size={14} />} {showAll ? a.hideRegions : a.showRegions}
    </button>
  )

  return (
    <>
      <Home rows={rows} />
      <LessonRow rows={rows} />

      <section className="tint-sage">
        <div className="px-1">
          <h2 className="font-serif text-heading text-ink">{h.theBody}</h2>
          <p className="mt-1 text-caption text-muted">{h.theBodyLead}</p>
        </div>
        <div className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
          {TABS.map((tb) => <Chip key={tb} active={tab === tb} onClick={() => setTab(tb)}>{a[tb]}</Chip>)}
        </div>

        {tab === 'muscles' && (
          <div className="mt-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex gap-2">
                <Chip active={view === 'front'} onClick={() => setView('front')} tone="clay">{a.front}</Chip>
                <Chip active={view === 'back'} onClick={() => setView('back')} tone="clay">{a.back}</Chip>
              </div>
              {regionsToggle}
            </div>
            <FigureViewer
              src={`${BASE}${FIGURES[view].src}`} w={FIGURES[view].w} h={FIGURES[view].h}
              regions={regionsForView} available={available}
              selected={term?.id} onSelect={openMuscle} showAll={showAll}
            />
            <p className="mt-2.5 px-1 text-caption text-muted">{a.hint}</p>
          </div>
        )}

        {tab === 'bones' && (
          <div className="mt-4">
            <div className="mb-3 flex justify-end">{regionsToggle}</div>
            <FigureViewer
              src={`${BASE}anatomy/skeleton-front.svg`} w={SK_W} h={SK_H}
              boxes={boneBoxes} circles={SKELETON_LANDMARKS}
              selected={term?.id} onSelect={open} showAll={showAll}
            />
            <p className="mt-2.5 px-1 text-caption text-muted">{a.bonesHint}</p>
          </div>
        )}

        <div className="mb-3 mt-6 flex items-center gap-2.5 rounded-full border border-line/70 bg-paper px-4 py-2.5 shadow-card">
          <Search size={17} className="shrink-0 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={a.search} className="w-full bg-transparent text-body text-ink outline-none placeholder:text-muted/60" />
        </div>

        {grouped.map(([region, items]) => (
          <section key={region} className="mb-5">
            {region !== 'all' && <Eyebrow className="mb-2 px-1">{a.regions[region] || region}</Eyebrow>}
            <div className="divide-y divide-line/70 rounded-3xl border border-line/70 bg-paper shadow-card">
              {items.map((x) => (
                <div key={x.id} role="button" tabIndex={0} onClick={() => (tab === 'muscles' ? openMuscle(x.id) : open(x.id))} onKeyDown={(e) => e.key === 'Enter' && open(x.id)} className="flex cursor-pointer items-center gap-3 px-3.5 py-3 first:rounded-t-3xl last:rounded-b-3xl hover:bg-sand/60">
                  <PlayButton id={x.id} size={38} />
                  <div className="min-w-0 flex-1">
                    <div className="text-body text-ink">{x.en} <SayHint say={x.say} className="ml-1" /></div>
                    <div className="truncate text-caption text-muted">{x.vi}{x.plain && x.plain.toLowerCase() !== x.en.toLowerCase() ? ` · ${x.plain}` : ''}</div>
                  </div>
                  {known[x.id] && <Tag tone="tint">{t.learn.known}</Tag>}
                  {x.deep && <Tag>{a.deep}</Tag>}
                </div>
              ))}
            </div>
          </section>
        ))}
      </section>

      <AnatomyCard term={term} onClose={() => open(null)} onOpen={(tid) => {
        const x = getTerm(tid)
        const tb = x?.kind === 'movement' ? 'movements' : x?.isBone ? 'bones' : 'muscles'
        navigate(`/anatomy/${tb}/${tid}`)
      }} />
    </>
  )
}
