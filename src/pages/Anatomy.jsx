import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Eye, EyeOff, Search } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { MUSCLES, BONES_ALL, MOVEMENTS_ALL, getTerm, searchTerms } from '../lib/content.js'
import { FIGURES, MUSCLE_REGIONS, SKELETON_LANDMARKS, SKELETON_BOXES } from '../../content/anatomy/regions.js'
import skeletonBoxes from '../../content/anatomy/skeleton-boxes.json'
import { Chip, Header, PlayButton } from '../components/ui.jsx'
import FigureViewer from '../components/FigureViewer.jsx'
import AnatomyCard from '../components/AnatomyCard.jsx'
import { SettingsButton } from '../components/SettingsSheet.jsx'

const BASE = import.meta.env.BASE_URL
const TABS = ['muscles', 'bones', 'movements']

// Skeleton viewBox and the bone-group boxes measured from the SVG.
const [, , SK_W, SK_H] = skeletonBoxes.viewBox.split(' ').map(Number)
const boneBoxes = {}
for (const b of BONES_ALL) {
  const boxes = (b.skeleton || []).map((g) => skeletonBoxes.groups[g]).filter(Boolean)
  const extra = SKELETON_BOXES[b.id] || []
  if (boxes.length || extra.length) boneBoxes[b.id] = [...boxes, ...extra]
}

export default function Anatomy() {
  const { t } = useLang()
  const a = t.anatomy
  const navigate = useNavigate()
  const { tab = 'muscles', id } = useParams()
  const [view, setView] = useState('front')
  const [showAll, setShowAll] = useState(false)
  const [q, setQ] = useState('')

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
