import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Bookmark, BookmarkCheck, ChevronLeft, ChevronRight, Play, Square } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { STRINGS } from '../lib/strings.js'
import { getPose, getTerm, nextInSeries, poseClipIds, poseName, prevInSeries, seriesLength } from '../lib/content.js'
import { audio } from '../lib/audio.js'
import { learn } from '../lib/learning.js'
import { store } from '../lib/store.js'
import { useSpeaking } from '../lib/useSpeaking.js'
import { Bi, Button, Chip, Eyebrow, Header, KeepOffline, PlayButton, PoseArt, Say, SayHint, ScrollTop, Section, Tag } from '../components/ui.jsx'
import AnatomyCard from '../components/AnatomyCard.jsx'
import SuggestFix from '../components/SuggestFix.jsx'
import { poseTint, styleTint, tintClass } from '../lib/tints.js'

const fill = (s, vars) => Object.entries(vars).reduce((out, [k, v]) => out.replace(`{${k}}`, v), s)

/** A pose that may not be written yet: a link when it is, its name when not. */
function PoseChip({ id }) {
  const p = getPose(id)
  if (p)
    return (
      <Chip to={`/poses/${p.id}`} tone={poseTint(p)}>
        {p.en}<span className="ml-1 font-normal opacity-70">· {p.vi}</span>
      </Chip>
    )
  return <span className="inline-flex min-h-[36px] items-center rounded-full border border-dashed border-line px-3.5 py-1.5 text-[14px] text-muted">{poseName(id)}</span>
}

/** A number and what it counts, on a small tile. */
function Stat({ n, label }) {
  return (
    <div className="rounded-2xl bg-paper/75 px-3.5 py-2.5">
      <div className="font-serif text-heading text-ink">{n}</div>
      <div className="text-[12px] text-muted">{label}</div>
    </div>
  )
}

/** Its place in the primary series: section, position, breaths, vinyasas, gaze, and the poses either side. */
function AshtangaCard({ pose }) {
  const { t } = useLang()
  const P = t.poses
  const a = pose.ashtanga
  const prev = prevInSeries(pose)
  const next = nextInSeries(pose)
  const d = a.drishti
  return (
    <Section title={P.ashtangaNote}>
      <div className="tint-gold wash rounded-3xl border border-line/60 p-5 shadow-card">
        <Eyebrow tone="tint">{P.sections[a.section] || a.section}</Eyebrow>
        <div className="mt-1 font-serif text-heading text-ink">{fill(P.position, { n: a.position, total: seriesLength() })}</div>
        {(a.breaths || a.vinyasas) && (
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {a.breaths ? <Stat n={a.breaths} label={P.breaths} /> : null}
            {a.vinyasas ? <Stat n={a.vinyasas} label={P.vinyasas} /> : null}
          </div>
        )}
        {d && STRINGS.en.poses.drishti[d] && (
          <div className="mt-4">
            <Eyebrow className="mb-1">{P.gaze}</Eyebrow>
            <Bi en={STRINGS.en.poses.drishti[d]} vi={STRINGS.vi.poses.drishti[d]} />
          </div>
        )}
        {a.note && <div className="mt-4"><Bi en={a.note.en} vi={a.note.vi} size="sm" /></div>}
        {(prev || next) && (
          <div className="mt-5 flex flex-wrap justify-between gap-2">
            {prev ? (
              <Chip to={`/poses/${prev.id}`} className="max-w-full">
                <ChevronLeft size={16} className="-ml-1.5 mr-1 shrink-0" aria-label={P.prev} /><span className="truncate">{prev.sa || prev.en}</span>
              </Chip>
            ) : <span />}
            {next && (
              <Chip to={`/poses/${next.id}`} className="max-w-full">
                <span className="truncate">{next.sa || next.en}</span><ChevronRight size={16} className="-mr-1.5 ml-1 shrink-0" aria-label={P.next} />
              </Chip>
            )}
          </div>
        )}
      </div>
    </Section>
  )
}

/** The Yin hold: how long, where it reaches, what to do after, what it is for. */
function YinCard({ pose }) {
  const { t } = useLang()
  const P = t.poses
  const y = pose.yin
  return (
    <Section title={P.yinNote}>
      <div className="tint-dusk wash rounded-3xl border border-line/60 p-5 shadow-card">
        <div className="font-serif text-heading text-ink">{fill(P.hold, { n: y.holdMinutes })}</div>
        {y.target?.length > 0 && (
          <div className="mt-4">
            <Eyebrow className="mb-1.5">{P.target}</Eyebrow>
            <div className="flex flex-wrap gap-1.5">{y.target.map((x) => <Tag key={x} tone="tint" className="!text-[13px]">{P.targets[x] || x}</Tag>)}</div>
          </div>
        )}
        {y.counter && (
          <div className="mt-4">
            <Eyebrow className="mb-1.5">{P.counter}</Eyebrow>
            <PoseChip id={y.counter} />
          </div>
        )}
        {y.note && <div className="mt-4"><Bi en={y.note.en} vi={y.note.vi} size="sm" /></div>}
      </div>
    </Section>
  )
}

export default function Pose() {
  const { id } = useParams()
  const pose = getPose(id)
  const { t } = useLang()
  const P = t.poses
  const [term, setTerm] = useState(null)
  const navigate = useNavigate()
  const [playing, setPlaying] = useState(null) // null | 'cues' | 'all'
  const [saved, setSaved] = useState({})
  const stopRef = useRef(false)
  const speaking = useSpeaking()

  useEffect(() => () => { stopRef.current = true; audio.stop(); setPlaying(null) }, [pose])

  useEffect(() => {
    if (!pose) return
    store.all('phrasebook').then((rows) => {
      const s = {}
      rows.forEach((r) => { s[r.id] = true })
      setSaved(s)
    })
  }, [pose])

  // While a sequence plays, keep the line being spoken on screen, so she can
  // follow it from the mat.
  useEffect(() => {
    if (!playing || !speaking) return
    const el = document.querySelector(`[data-clip="${CSS.escape(speaking)}"]`)
    const calm = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    el?.scrollIntoView({ block: 'nearest', behavior: calm ? 'auto' : 'smooth' })
  }, [speaking, playing])

  if (!pose) return <Navigate to="/poses" replace />
  const cues = pose.cues || []
  const mods = pose.modifications || []
  const safety = pose.safety || []
  const working = pose.muscles?.working || []
  const lengthening = pose.muscles?.lengthening || []
  const joints = pose.joints || []
  const transitions = pose.transitionsTo || []
  const counters = pose.counterPoses || []

  const play = async (which) => {
    if (playing) { stopRef.current = true; audio.stop(); setPlaying(null); return }
    stopRef.current = false
    setPlaying(which)
    await audio.sequence([...cues, ...(which === 'all' ? mods : [])].map((c) => c.id), 900, () => stopRef.current)
    setPlaying(null)
  }

  const toggleSave = async (line) => {
    if (saved[line.id]) {
      await learn.removePhrase(line.id)
      setSaved((s) => ({ ...s, [line.id]: false }))
    } else {
      await learn.savePhrase({ id: line.id, en: line.en, vi: line.vi, source: pose.id })
      setSaved((s) => ({ ...s, [line.id]: true }))
    }
  }

  /** Spoken lines, each with a bookmark that keeps it in her phrasebook. */
  const lines = (list, withProps = false) => list.map((l) => (
    <div key={l.id} data-clip={l.id} className="scroll-mb-28 scroll-mt-4">
      <div className="flex items-start gap-1">
        <div className="min-w-0 flex-1"><Say id={l.id} en={l.en} vi={l.vi} /></div>
        <button
          onClick={() => toggleSave(l)}
          className={`press mt-3 grid h-9 w-9 shrink-0 place-items-center rounded-full ${saved[l.id] ? 'text-tint-deep' : 'text-muted/45 hover:text-muted'}`}
          aria-label={saved[l.id] ? P.saved : P.addToPhrasebook}
          aria-pressed={!!saved[l.id]}
        >
          {saved[l.id] ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>
      {withProps && l.props?.length > 0 && (
        <div className="-mt-1 mb-1.5 flex flex-wrap gap-1 pl-[54px]">
          {l.props.map((p) => <Tag key={p}>{P.props[p] || p}</Tag>)}
        </div>
      )}
    </div>
  ))

  const termChips = (ids) => ids.map((mid) => {
    const m = getTerm(mid)
    return m ? <Chip key={mid} onClick={() => setTerm(m)}>{m.en} <span className="ml-1 font-normal opacity-70">· {m.vi}</span></Chip> : null
  })

  return (
    <div className={tintClass(poseTint(pose))}>
      <ScrollTop on={pose.id} />
      <Header title={pose.en} subtitle={pose.vi} back="/poses" eyebrow={pose.styles.map((s) => P[s]).join(' · ')} />

      <div className="wash rounded-4xl border border-line/60 p-5 shadow-card">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1 space-y-4">
            <div className="flex items-center gap-3.5">
              <PlayButton id={`${pose.id}__en`} size={46} />
              <div className="min-w-0">
                <div className="text-body-lg font-medium text-ink">{pose.en}</div>
                <div className="text-[12px] text-muted">{t.common.english}</div>
              </div>
            </div>
            {pose.sa && (
              <div className="flex items-center gap-3.5">
                <PlayButton id={`${pose.id}__sa`} size={46} />
                <div className="min-w-0">
                  <div className="font-serif italic text-body-lg text-ink">{pose.sa}</div>
                  <SayHint say={pose.say} />
                </div>
              </div>
            )}
            <div className="flex items-center gap-3.5">
              <span className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-full bg-paper text-[12px] font-semibold text-muted shadow-sm">VI</span>
              <div className="text-body-lg font-medium text-ink">{pose.vi}</div>
            </div>
          </div>
          <PoseArt pose={pose} size={84} />
        </div>
        {pose.aka?.length > 0 && (
          <p className="mt-4 text-caption text-muted">{P.aka}: <span className="text-ink">{pose.aka.join(', ')}</span></p>
        )}
        {pose.saNote && <div className="mt-4 text-caption text-muted"><Bi en={pose.saNote.en} vi={pose.saNote.vi} size="sm" /></div>}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {pose.styles.map((s) => <Tag key={s} tone="tint" className={tintClass(styleTint(s))}>{P[s]}</Tag>)}
          {pose.level && P.levels[pose.level] && <Tag>{P.level}: {P.levels[pose.level]}</Tag>}
        </div>
      </div>

      {pose.ashtanga && <AshtangaCard pose={pose} />}
      {pose.yin && <YinCard pose={pose} />}

      <Section
        title={P.cues}
        action={
          <Button kind="quiet" size="sm" onClick={() => play('cues')}>
            {playing === 'cues' ? <Square size={14} /> : <Play size={14} />} {playing === 'cues' ? t.common.stop : t.common.playAll}
          </Button>
        }
      >
        <div className="rounded-3xl border border-line/70 bg-paper p-2 shadow-card">{lines(cues)}</div>
        {mods.length > 0 && (
          <div className="mt-1.5 flex justify-end">
            <Button kind="quiet" size="sm" onClick={() => play('all')} className="text-caption">
              {playing === 'all' ? <Square size={13} /> : <Play size={13} />} {playing === 'all' ? t.common.stop : P.playWithMods}
            </Button>
          </div>
        )}
      </Section>

      {pose.breath && (
        <Section title={P.breath}>
          <div className="tint-mist wash rounded-3xl border border-line/60 p-4">
            <Bi en={pose.breath.en} vi={pose.breath.vi} />
          </div>
        </Section>
      )}

      {mods.length > 0 && (
        <Section title={P.modifications}>
          <div className="rounded-3xl border border-line/70 bg-paper p-2 shadow-card">{lines(mods, true)}</div>
        </Section>
      )}

      {safety.length > 0 && (
        <Section title={P.safety}>
          <div className="tint-clay wash rounded-3xl border border-line/60 p-2">{lines(safety)}</div>
        </Section>
      )}

      {(working.length > 0 || lengthening.length > 0 || joints.length > 0) && (
        <Section title={P.muscles}>
          {working.length > 0 && (
            <div className="mb-4">
              <Eyebrow className="mb-1.5 px-1">{P.working}</Eyebrow>
              <div className="flex flex-wrap gap-2">{termChips(working)}</div>
            </div>
          )}
          {lengthening.length > 0 && (
            <div className="mb-4">
              <Eyebrow className="mb-1.5 px-1">{P.lengthening}</Eyebrow>
              <div className="flex flex-wrap gap-2">{termChips(lengthening)}</div>
            </div>
          )}
          {joints.length > 0 && (
            <div className="tint-gold">
              <Eyebrow className="mb-1.5 px-1">{P.joints}</Eyebrow>
              <div className="flex flex-wrap gap-2">{termChips(joints)}</div>
            </div>
          )}
        </Section>
      )}

      {(transitions.length > 0 || counters.length > 0) && (
        <Section title={P.flow}>
          {transitions.length > 0 && (
            <div className="mb-4">
              <Eyebrow className="mb-1.5 px-1">{P.transitionsTo}</Eyebrow>
              <div className="flex flex-wrap gap-2">{transitions.map((x) => <PoseChip key={x} id={x} />)}</div>
            </div>
          )}
          {counters.length > 0 && (
            <div>
              <Eyebrow className="mb-1.5 px-1">{P.counterPoses}</Eyebrow>
              <div className="flex flex-wrap gap-2">{counters.map((x) => <PoseChip key={x} id={x} />)}</div>
            </div>
          )}
        </Section>
      )}

      <div className="mt-8 flex flex-col items-start gap-1">
        <KeepOffline key={pose.id} ids={poseClipIds(pose)} label={t.common.offline.pose} />
        <SuggestFix key={`fix-${pose.id}`} target={pose.id} />
      </div>
      <AnatomyCard term={term} onClose={() => setTerm(null)} onOpen={(tid) => { const x = getTerm(tid); setTerm(null); navigate(`/anatomy/${x?.kind === 'movement' ? 'movements' : x?.isBone ? 'bones' : 'muscles'}/${tid}`) }} />
    </div>
  )
}
