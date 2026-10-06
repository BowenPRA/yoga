import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Bookmark, BookmarkCheck, Play, Square } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { getPose, getTerm } from '../lib/content.js'
import { audio } from '../lib/audio.js'
import { learn } from '../lib/learning.js'
import { store } from '../lib/store.js'
import { Bi, Button, Chip, Header, PlayButton, Say, SayHint, Section } from '../components/ui.jsx'
import TermSheet from '../components/TermSheet.jsx'
import SuggestFix from '../components/SuggestFix.jsx'

export default function Pose() {
  const { id } = useParams()
  const pose = getPose(id)
  const { t } = useLang()
  const [term, setTerm] = useState(null)
  const [playingAll, setPlayingAll] = useState(false)
  const [saved, setSaved] = useState({})
  const stopRef = useRef(false)

  useEffect(() => {
    if (pose) learn.meetPose(pose)
    return () => { stopRef.current = true; audio.stop() }
  }, [pose])

  useEffect(() => {
    if (!pose) return
    store.all('phrasebook').then((rows) => {
      const s = {}
      rows.forEach((r) => { s[r.id] = true })
      setSaved(s)
    })
  }, [pose])

  if (!pose) return <Navigate to="/learn/poses" replace />
  const note = pose.ashtanga?.note || pose.yin?.note

  const playAll = async () => {
    if (playingAll) { stopRef.current = true; audio.stop(); setPlayingAll(false); return }
    stopRef.current = false
    setPlayingAll(true)
    await audio.sequence(pose.cues.map((c) => c.id), 900, () => stopRef.current)
    setPlayingAll(false)
  }

  const save = async (c) => {
    await learn.savePhrase({ id: c.id, en: c.en, vi: c.vi, source: pose.id, kind: 'cue' })
    setSaved((s) => ({ ...s, [c.id]: true }))
  }

  const muscleChips = (ids) => ids.map((mid) => {
    const m = getTerm(mid)
    return m ? <Chip key={mid} onClick={() => setTerm(m)}>{m.en} · {m.vi}</Chip> : null
  })

  return (
    <>
      <Header title={pose.en} subtitle={pose.vi} back="/learn/poses" />

      <div className="rounded-2xl bg-paper border border-line shadow-card p-4">
        <div className="flex items-center gap-3">
          <PlayButton id={`${pose.id}__en`} size={44} />
          <div className="flex-1">
            <div className="text-ink font-medium">{pose.en}</div>
            <div className="text-xs text-muted">{t.common.english}</div>
          </div>
        </div>
        {pose.sa && (
          <div className="mt-3 flex items-center gap-3">
            <PlayButton id={`${pose.id}__sa`} size={44} />
            <div className="flex-1">
              <div className="text-ink font-medium">{pose.sa}</div>
              <SayHint say={pose.say} />
            </div>
          </div>
        )}
        <div className="mt-3 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-sand text-muted text-sm">VI</span>
          <div className="text-ink font-medium">{pose.vi}</div>
        </div>
        {pose.saNote && <p className="mt-3 text-xs text-muted"><Bi en={pose.saNote.en} vi={pose.saNote.vi} /></p>}
        <div className="mt-3 flex flex-wrap gap-1">
          {pose.styles.map((s) => <span key={s} className="rounded-full bg-sand px-2 py-0.5 text-[11px] text-muted">{t.poses[s]}</span>)}
          {pose.ashtanga && <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[11px] text-muted">{t.poses.ashtangaNote}</span>}
          {pose.yin && <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[11px] text-muted">{t.poses.yinNote} · {pose.yin.holdMinutes} {t.poses.minutes}</span>}
        </div>
      </div>

      {note && (
        <p className="mt-3 px-1 text-sm text-muted">
          <Bi en={note.en} vi={note.vi} />
        </p>
      )}

      <Section
        title={t.poses.cues}
        action={
          <Button kind="quiet" onClick={playAll} className="!py-1 !px-2 text-sm">
            {playingAll ? <Square size={14} /> : <Play size={14} />} {playingAll ? t.common.stop : t.common.playAll}
          </Button>
        }
      >
        <div className="rounded-2xl bg-paper border border-line shadow-card p-3">
          {pose.cues.map((c) => (
            <div key={c.id} className="flex items-start gap-1">
              <div className="flex-1 min-w-0"><Say id={c.id} en={c.en} vi={c.vi} /></div>
              <button
                onClick={() => save(c)}
                className={`mt-3 rounded-full p-1.5 ${saved[c.id] ? 'text-sage-deep' : 'text-line hover:text-muted'}`}
                aria-label={t.poses.addToPhrasebook}
              >
                {saved[c.id] ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              </button>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t.poses.breath}>
        <div className="rounded-2xl bg-paper border border-line shadow-card p-4 text-[15px]">
          <Bi en={pose.breath.en} vi={pose.breath.vi} />
        </div>
      </Section>

      <Section title={t.poses.modifications}>
        <div className="rounded-2xl bg-paper border border-line shadow-card p-3">
          {pose.modifications.map((m) => <Say key={m.id} id={m.id} en={m.en} vi={m.vi} />)}
        </div>
      </Section>

      <Section title={t.poses.safety}>
        <div className="rounded-2xl bg-clay-soft/60 border border-clay-soft p-3">
          {pose.safety.map((s) => <Say key={s.id} id={s.id} en={s.en} vi={s.vi} />)}
        </div>
      </Section>

      <Section title={t.poses.muscles}>
        {pose.muscles.working.length > 0 && (
          <div className="mb-3">
            <div className="mb-1 text-xs text-muted">{t.poses.working}</div>
            <div className="flex flex-wrap gap-2">{muscleChips(pose.muscles.working)}</div>
          </div>
        )}
        {pose.muscles.lengthening.length > 0 && (
          <div className="mb-3">
            <div className="mb-1 text-xs text-muted">{t.poses.lengthening}</div>
            <div className="flex flex-wrap gap-2">{muscleChips(pose.muscles.lengthening)}</div>
          </div>
        )}
        {pose.joints?.length > 0 && (
          <div>
            <div className="mb-1 text-xs text-muted">{t.body.bones}</div>
            <div className="flex flex-wrap gap-2">{muscleChips(pose.joints)}</div>
          </div>
        )}
      </Section>

      <div className="mt-8"><SuggestFix target={pose.id} /></div>
      <TermSheet term={term} onClose={() => setTerm(null)} />
    </>
  )
}
