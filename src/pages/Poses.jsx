import { memo, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ClipboardList, Search, X } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { ashtangaSeries, familiesOf, posesByStyle, searchPoses, yinByTarget } from '../lib/content.js'
import { Chip, Header, PlayButton, PoseArt, ScrollMemory, Tag } from '../components/ui.jsx'
import { SettingsButton } from '../components/SettingsSheet.jsx'
import { poseTint, styleTint, tintClass } from '../lib/tints.js'

const STYLES = ['all', 'vinyasa', 'ashtanga', 'yin']
const ART = 60

// The view and the search she left, so coming back from a pose lands where
// she was (ScrollMemory keeps the scroll for each view). Per tab session.
const recall = (k, fallback) => { try { return sessionStorage.getItem(`ye.poses.${k}`) ?? fallback } catch { return fallback } }
const remember = (k, v) => { try { sessionStorage.setItem(`ye.poses.${k}`, v) } catch { /* private mode: fine */ } }

/**
 * A hundred rows, each with a porthole that draws a whole figure, must not
 * make a phone stutter. Rows start as `content-visibility: auto`, so a new
 * list costs only what is on screen; then, while the phone is idle, a few
 * rows at a time are let out of it, so the browser can lay them out and
 * paint them ahead of a scroll instead of in the middle of one. (Measured
 * on 120 rows at 4x CPU throttle: `auto` cuts the longest frame when a list
 * appears from 165-410 ms to 45-100 ms but paints rows during the scroll;
 * once warmed, scrolling is as smooth as with no `auto` at all. Mounting
 * the portholes lazily with an IntersectionObserver measured worse on both.)
 */
function useWarmRows(ref, key) {
  useEffect(() => {
    const rows = [...(ref.current?.querySelectorAll('[data-row]') || [])]
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 60))
    const cancel = window.cancelIdleCallback || clearTimeout
    let i = 0
    let handle
    const step = () => {
      // Styles apply at the next frame, so a fixed handful per idle period
      // keeps each frame's layout small.
      for (const end = Math.min(rows.length, i + 4); i < end; i++) rows[i].style.contentVisibility = 'visible'
      if (i < rows.length) handle = idle(step)
    }
    handle = idle(step)
    return () => cancel(handle)
  }, [ref, key])
}

/** The groups of one view: families, the series by section, Yin by target. */
function groupsFor(style, list) {
  if (style === 'ashtanga') return ashtangaSeries(list)
  if (style === 'yin') return yinByTarget(list)
  return familiesOf(posesByStyle(style, list))
}

/** A group's title, stuck to the top while its poses scroll under it. */
function GroupHeader({ title }) {
  return (
    <div className="sticky z-10 -mx-5 bg-sand px-6 pb-2.5 pt-3" style={{ top: 'env(safe-area-inset-top, 0px)' }}>
      <div className="flex items-center gap-2">
        <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-tint" />
        <span className="text-eyebrow font-semibold uppercase text-tint-deep">{title}</span>
      </div>
    </div>
  )
}

/**
 * One pose in the list: picture, the three names, what the view needs to
 * know (place in the series, or the hold), style and level. The whole card
 * opens the pose; the speaker says its name. In the Ashtanga view the
 * Sanskrit leads, as the series is called in class.
 */
const PoseRow = memo(function PoseRow({ pose, view, t }) {
  const P = t.poses
  const sanskritFirst = view === 'ashtanga' && pose.sa
  const a = pose.ashtanga
  let meta = null
  if (view === 'ashtanga' && a) {
    meta = (
      <>
        <span className="font-semibold">{a.position}</span>
        {a.breaths ? <span> · {a.breaths} {P.breaths}</span> : null}
        {a.vinyasas ? <span> · {a.vinyasas} {P.vinyasas}</span> : null}
      </>
    )
  } else if (view === 'yin' && pose.yin) {
    meta = <span>{pose.yin.holdMinutes} {P.minutes}</span>
  }
  const tint = view === 'all' ? poseTint(pose) : styleTint(view)
  return (
    <div
      className={`${tintClass(tint)} wash press relative rounded-3xl border border-line/70 p-4 shadow-card`}
      data-row=""
      data-anchor={pose.id}
      style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 124px' }}
    >
      {/* A plain hash link: the router hears the change, and a hundred rows skip a hundred router hooks. */}
      <a href={`#/poses/${pose.id}`} className="absolute inset-0 rounded-3xl" aria-label={pose.en} />
      <div className="pointer-events-none relative flex items-center gap-4">
        <PoseArt pose={pose} size={ART} />
        <div className="min-w-0 flex-1">
          {meta && <div className="mb-0.5 text-[12px] text-tint-deep">{meta}</div>}
          {sanskritFirst ? (
            <>
              <div className="font-serif text-[19px] italic leading-snug text-ink">{pose.sa}</div>
              <div className="text-caption text-ink/80">{pose.en}</div>
            </>
          ) : (
            <>
              <div className="font-serif text-[19px] leading-snug text-ink">{pose.en}</div>
              {pose.sa && <div className="font-serif text-caption italic text-muted">{pose.sa}</div>}
            </>
          )}
          <div className="text-caption text-muted">{pose.vi}</div>
          <div className="mt-2 flex flex-wrap gap-1">
            {pose.styles.map((s) => <Tag key={s} tone="tint" className={tintClass(styleTint(s))}>{P[s]}</Tag>)}
            {pose.level && P.levels[pose.level] && <Tag>{P.levels[pose.level]}</Tag>}
          </div>
        </div>
        <div className="pointer-events-auto shrink-0">
          <PlayButton id={sanskritFirst ? `${pose.id}__sa` : `${pose.id}__en`} size={40} />
        </div>
      </div>
    </div>
  )
})

export default function Poses() {
  const { t } = useLang()
  const P = t.poses
  const [style, setStyleState] = useState(() => { const s = recall('style', 'all'); return STYLES.includes(s) ? s : 'all' })
  const [q, setQState] = useState(() => recall('q', ''))
  // The chip and the field answer at once; the list follows a beat later,
  // rendered in slices so a long list never freezes the tap.
  const query = useDeferredValue(q)
  const view = useDeferredValue(style)
  const pending = view !== style || query !== q
  const setStyle = (s) => { remember('style', s); setStyleState(s) }
  const setQ = (v) => { remember('q', v); setQState(v) }

  const groups = useMemo(() => groupsFor(view, searchPoses(query)), [view, query])
  const listRef = useRef(null)
  useWarmRows(listRef, groups)
  const tint = style === 'all' ? 'sage' : styleTint(style)
  const titleOf = (key) => {
    if (key === 'other') return P.other
    if (view === 'ashtanga') return P.sections[key] || key
    if (view === 'yin') return P.targets[key] || key
    return P.families[key] || key
  }

  return (
    <div className={tintClass(tint)}>
      <ScrollMemory id={view} anchor="[data-anchor]" />
      <Header title={P.title} right={<SettingsButton />} />

      {/* The Class Builder lives behind the library: a theme or a student's words become a class the voice can lead. */}
      <Link to="/classes" className="tint-gold wash press mb-4 flex items-center gap-3.5 rounded-3xl border border-line/60 p-4 shadow-card">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-tint-soft text-tint-deep"><ClipboardList size={22} /></span>
        <div className="min-w-0 flex-1">
          <div className="font-serif text-[18px] leading-snug text-ink">{t.classes.entry}</div>
          <div className="text-caption leading-snug text-muted">{t.classes.entryLead}</div>
        </div>
        <ChevronRight size={18} className="shrink-0 text-muted" />
      </Link>

      <div className="mb-4 flex items-center gap-2.5 rounded-full border border-line/70 bg-paper px-4 py-2.5 shadow-card focus-within:border-tint">
        <Search size={17} className="shrink-0 text-muted" />
        <input
          value={q} onChange={(e) => setQ(e.target.value)} placeholder={P.search}
          type="search" enterKeyHint="search" autoCorrect="off" autoCapitalize="off" spellCheck={false}
          className="w-full min-w-0 bg-transparent text-body text-ink outline-none placeholder:text-muted/60 [&::-webkit-search-cancel-button]:hidden"
        />
        {q && (
          <button onClick={() => setQ('')} className="press -mr-1.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted" aria-label={t.common.clear}>
            <X size={16} />
          </button>
        )}
      </div>

      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
        {STYLES.map((s) => (
          <Chip key={s} active={style === s} onClick={() => setStyle(s)} tone={s === 'all' ? 'sage' : styleTint(s)}>{P[s]}</Chip>
        ))}
      </div>
      <p className="mb-2 mt-3 px-1 text-caption text-muted">{P.lead[style]}</p>

      <div ref={listRef} className={`${tintClass(view === 'all' ? 'sage' : styleTint(view))} transition-opacity duration-200 ${pending ? 'opacity-60' : ''}`}>
        {groups.length === 0 && (
          <div className="slide-in mt-4 rounded-3xl border border-line/70 bg-paper p-5 text-body text-muted shadow-card">{P.noResults}</div>
        )}
        {groups.map(({ key, poses }) => (
          <section key={key} className="mb-3">
            <GroupHeader title={titleOf(key)} />
            <div className="grid grid-cols-1 gap-3">
              {poses.map((p) => <PoseRow key={p.id} pose={p} view={view} t={t} />)}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
