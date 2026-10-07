import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Check, Eye, EyeOff, Search } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { MUSCLES, BONES_ALL, MOVEMENTS_ALL, LESSONS, getTerm, searchTerms } from '../lib/content.js'
import { FIGURES, MUSCLE_REGIONS, SKELETON_LANDMARKS } from '../../content/anatomy/regions.js'
import { FIGURE_SRC, BONE_BOXES } from '../lib/figures.js'
import { progress, isKnown } from '../lib/store.js'
import { Chip, Header, PlayButton } from '../components/ui.jsx'
import FigureViewer from '../components/FigureViewer.jsx'
import AnatomyCard from '../components/AnatomyCard.jsx'
import { SettingsButton } from '../components/SettingsSheet.jsx'

const BASE = import.meta.env.BASE_URL
const TABS = ['muscles', 'bones', 'movements']
const { w: SK_W, h: SK_H } = FIGURE_SRC.skeleton
const boneBoxes = BONE_BOXES

/** The row of lessons by region: done, in progress, or not yet written. */
function LessonRow() {
  const { t, ui } = useLang()
  const L = t.learn
  const navigate = useNavigate()
  const [rows, setRows] = useState({})
  useEffect(() => { progress.lessons().then(setRows) }, [])
  return (
    <section className="mb-5">
      <h2 className="px-1 text-[13px] font-semibold uppercase tracking-wider text-muted">{L.lessons}</h2>
      <div className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1">
        {LESSONS.map((l) => {
          const row = rows[l.id]
          const open = !!l.slides
          const started = row && !row.done && row.slide > 0
          return (
            <button key={l.id} disabled={!open} onClick={() => navigate(`/learn/${l.id}`)}
              className={`w-[150px] shrink-0 rounded-2xl border p-3 text-left transition ${open ? 'bg-paper border-line shadow-card active:scale-[0.98]' : 'bg-sand border-line/60 opacity-70'}`}>
              <div className="flex items-start justify-between gap-1">
                <div className="font-serif text-[18px] leading-tight text-ink">{ui === 'vi' ? l.title.vi : l.title.en}</div>
                {row?.done && <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sage-soft text-sage-deep"><Check size={12} /></span>}
              </div>
              <div className="mt-2 text-xs text-muted">
                {open ? `${l.terms.length} ${L.words} · ${l.minutes} ${L.minutes}` : L.soon}
              </div>
              {open && (
                <div className="mt-1 text-xs text-sage-deep">{row?.done ? L.again : started ? L.resume : L.start}</div>
              )}
            </button>
          )
        })}
      </div>
      <p className="mt-2 px-1 text-xs text-muted">{L.lessonsIntro}</p>
    </section>
  )
}

export default function Anatomy() {
  const { t } = useLang()
  const a = t.anatomy
  const navigate = useNavigate()
  const { tab = 'muscles', id } = useParams()
  const [view, setView] = useState('front')
  const [showAll, setShowAll] = useState(false)
  const [q, setQ] = useState('')
  const [known, setKnown] = useState({})
  useEffect(() => { progress.terms().then((rows) => setKnown(Object.fromEntries(Object.entries(rows).map(([k, r]) => [k, isKnown(r)])))) }, [id])

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

  return (
    <>
      <Header title={a.title} right={<SettingsButton />} />
      <LessonRow />
      <div className="mb-3 flex gap-2">
        {TABS.map((tb) => <Chip key={tb} active={tab === tb} onClick={() => setTab(tb)}>{a[tb]}</Chip>)}
      </div>

      {tab === 'muscles' && (
        <>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex gap-2">
              <Chip active={view === 'front'} onClick={() => setView('front')} tone="clay">{a.front}</Chip>
              <Chip active={view === 'back'} onClick={() => setView('back')} tone="clay">{a.back}</Chip>
            </div>
            <button onClick={() => setShowAll((s) => !s)} className="inline-flex items-center gap-1 text-xs text-muted">
              {showAll ? <EyeOff size={14} /> : <Eye size={14} />} {showAll ? a.hideRegions : a.showRegions}
            </button>
          </div>
          <FigureViewer
            src={`${BASE}${FIGURES[view].src}`} w={FIGURES[view].w} h={FIGURES[view].h}
            regions={regionsForView} available={available}
            selected={term?.id} onSelect={openMuscle} showAll={showAll}
          />
          <p className="mt-2 px-1 text-xs text-muted">{a.hint}</p>
        </>
      )}

      {tab === 'bones' && (
        <>
          <div className="mb-2 flex justify-end">
            <button onClick={() => setShowAll((s) => !s)} className="inline-flex items-center gap-1 text-xs text-muted">
              {showAll ? <EyeOff size={14} /> : <Eye size={14} />} {showAll ? a.hideRegions : a.showRegions}
            </button>
          </div>
          <FigureViewer
            src={`${BASE}anatomy/skeleton-front.svg`} w={SK_W} h={SK_H}
            boxes={boneBoxes} circles={SKELETON_LANDMARKS}
            selected={term?.id} onSelect={open} showAll={showAll}
          />
          <p className="mt-2 px-1 text-xs text-muted">{a.bonesHint}</p>
        </>
      )}

      <div className="mt-5 mb-2 flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2">
        <Search size={16} className="text-muted" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={a.search} className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-muted/60" />
      </div>

      {grouped.map(([region, items]) => (
        <section key={region} className="mb-4">
          {region !== 'all' && <h2 className="mb-1 px-1 text-[12px] font-semibold uppercase tracking-wider text-muted">{a.regions[region] || region}</h2>}
          <div className="rounded-2xl bg-paper border border-line shadow-card divide-y divide-line">
            {items.map((x) => (
              <div key={x.id} role="button" tabIndex={0} onClick={() => (tab === 'muscles' ? openMuscle(x.id) : open(x.id))} onKeyDown={(e) => e.key === 'Enter' && open(x.id)} className="flex cursor-pointer items-center gap-3 px-3 py-2.5 hover:bg-sand">
                <PlayButton id={x.id} size={34} />
                <div className="flex-1 min-w-0">
                  <div className="text-ink">{x.en} <span className="ml-1 text-xs text-clay">{x.say}</span></div>
                  <div className="truncate text-sm text-muted">{x.vi}{x.plain && x.plain.toLowerCase() !== x.en.toLowerCase() ? ` · ${x.plain}` : ''}</div>
                </div>
                {known[x.id] && <span className="rounded-full bg-sage-soft px-2 py-0.5 text-[10px] text-sage-deep">{t.learn.known}</span>}
                {x.deep && <span className="rounded-full bg-sand px-2 py-0.5 text-[10px] text-muted">{a.deep}</span>}
              </div>
            ))}
          </div>
        </section>
      ))}

      <AnatomyCard term={term} onClose={() => open(null)} onOpen={(tid) => {
        const x = getTerm(tid)
        const tb = x?.kind === 'movement' ? 'movements' : x?.isBone ? 'bones' : 'muscles'
        navigate(`/anatomy/${tb}/${tid}`)
      }} />
    </>
  )
}
