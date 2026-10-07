import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Bookmark, BookmarkCheck, Play, Square } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { getPose, getTerm } from '../lib/content.js'
import { figureOf, windowFor } from '../lib/figures.js'
import { audio } from '../lib/audio.js'
import { learn } from '../lib/learning.js'
import { store } from '../lib/store.js'
import { Bi, Button, Chip, Eyebrow, Header, PlayButton, Porthole, Say, SayHint, Section, Tag } from '../components/ui.jsx'
import AnatomyCard from '../components/AnatomyCard.jsx'
import SuggestFix from '../components/SuggestFix.jsx'
import { poseTint, tintClass } from '../lib/tints.js'

export default function Pose() {
  const { id } = useParams()
  const pose = getPose(id)
  const { t } = useLang()
  const [term, setTerm] = useState(null)
  const navigate = useNavigate()
  const [playingAll, setPlayingAll] = useState(false)
  const [saved, setSaved] = useState({})
  const stopRef = useRef(false)

  useEffect(() => () => { stopRef.current = true; audio.stop() }, [pose])

  useEffect(() => {
    if (!pose) return
    store.all('phrasebook').then((rows) => {
      const s = {}
      rows.forEach((r) => { s[r.id] = true })
      setSaved(s)
    })
  }, [pose])

  if (!pose) return <Navigate to="/poses" replace />
  const note = pose.ashtanga?.note || pose.yin?.note
  const first = pose.muscles?.working?.[0] || pose.muscles?.lengthening?.[0]
  const artKind = first ? figureOf(first) : null
  const artWin = artKind ? windowFor(artKind, first) : null

  const playAll = async () => {
    if (playingAll) { stopRef.current = true; audio.stop(); setPlayingAll(false); return }
    stopRef.current = false
    setPlayingAll(true)
    await audio.sequence(pose.cues.map((c) => c.id), 900, () => stopRef.current)
    setPlayingAll(false)
  }

  const save = async (c) => {
    await learn.savePhrase({ id: c.id, en: c.en, vi: c.vi, source: pose.id })
    setSaved((s) => ({ ...s, [c.id]: true }))
  }

  const muscleChips = (ids) => ids.map((mid) => {
    const m = getTerm(mid)
    return m ? <Chip key={mid} onClick={() => setTerm(m)}>{m.en} <span className="ml-1 font-normal opacity-70">· {m.vi}</span></Chip> : null
  })

  return (
    <div className={tintClass(poseTint(pose))}>
      <Header title={pose.en} subtitle={pose.vi} back="/poses" eyebrow={pose.styles.map((s) => t.poses[s]).join(' · ')} />

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
          {artWin && <Porthole kind={artKind} window={artWin} highlight={[first]} size={84} className="shadow-card" />}
        </div>
        {pose.saNote && <p className="mt-4 text-caption text-muted"><Bi en={pose.saNote.en} vi={pose.saNote.vi} size="sm" /></p>}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {pose.styles.map((s) => <Tag key={s} tone="tint">{t.poses[s]}</Tag>)}
          {pose.ashtanga && <Tag tone="gold">{t.poses.ashtangaNote}</Tag>}
          {pose.yin && <Tag tone="gold">{t.poses.yinNote} · {pose.yin.holdMinutes} {t.poses.minutes}</Tag>}
        </div>
      </div>

      {note && (
        <p className="mt-4 px-1 text-caption text-muted">
          <Bi en={note.en} vi={note.vi} size="sm" />
        </p>
      )}

      <Section
        title={t.poses.cues}
        action={
          <Button kind="quiet" size="sm" onClick={playAll}>
            {playingAll ? <Square size={14} /> : <Play size={14} />} {playingAll ? t.common.stop : t.common.playAll}
          </Button>
        }
      >
        <div className="rounded-3xl border border-line/70 bg-paper p-2 shadow-card">
          {pose.cues.map((c) => (
            <div key={c.id} className="flex items-start gap-1">
              <div className="min-w-0 flex-1"><Say id={c.id} en={c.en} vi={c.vi} /></div>
              <button
                onClick={() => save(c)}
                className={`press mt-3 grid h-9 w-9 shrink-0 place-items-center rounded-full ${saved[c.id] ? 'text-tint-deep' : 'text-line hover:text-muted'}`}
                aria-label={t.poses.addToPhrasebook}
              >
                {saved[c.id] ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              </button>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t.poses.breath}>
        <div className="tint-mist wash rounded-3xl border border-line/60 p-4">
          <Bi en={pose.breath.en} vi={pose.breath.vi} />
        </div>
      </Section>

      <Section title={t.poses.modifications}>
        <div className="rounded-3xl border border-line/70 bg-paper p-2 shadow-card">
          {pose.modifications.map((m) => <Say key={m.id} id={m.id} en={m.en} vi={m.vi} />)}
        </div>
      </Section>

      <Section title={t.poses.safety}>
        <div className="tint-clay wash rounded-3xl border border-line/60 p-2">
          {pose.safety.map((s) => <Say key={s.id} id={s.id} en={s.en} vi={s.vi} />)}
        </div>
      </Section>

      <Section title={t.poses.muscles}>
        {pose.muscles.working.length > 0 && (
          <div className="mb-4">
            <Eyebrow className="mb-1.5 px-1">{t.poses.working}</Eyebrow>
            <div className="flex flex-wrap gap-2">{muscleChips(pose.muscles.working)}</div>
          </div>
        )}
        {pose.muscles.lengthening.length > 0 && (
          <div className="mb-4">
            <Eyebrow className="mb-1.5 px-1">{t.poses.lengthening}</Eyebrow>
            <div className="flex flex-wrap gap-2">{muscleChips(pose.muscles.lengthening)}</div>
          </div>
        )}
        {pose.joints?.length > 0 && (
          <div className="tint-gold">
            <Eyebrow className="mb-1.5 px-1">{t.poses.joints}</Eyebrow>
            <div className="flex flex-wrap gap-2">{muscleChips(pose.joints)}</div>
          </div>
        )}
      </Section>

      <div className="mt-8"><SuggestFix target={pose.id} /></div>
      <AnatomyCard term={term} onClose={() => setTerm(null)} onOpen={(tid) => { const x = getTerm(tid); setTerm(null); navigate(`/anatomy/${x?.kind === 'movement' ? 'movements' : x?.isBone ? 'bones' : 'muscles'}/${tid}`) }} />
    </div>
  )
}
