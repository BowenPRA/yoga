import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { useLang } from '../../lib/i18n.jsx'
import { getTerm, getPose, LESSONS } from '../../lib/content.js'
import { audio } from '../../lib/audio.js'
import { store, FACETS } from '../../lib/store.js'
import { Bi, Chip, Eyebrow, PlayButton, Porthole, Ring, Say, SayHint, Section, Tag } from '../ui.jsx'
import FigureCrop from '../FigureCrop.jsx'
import { useText } from '../../lib/lesson.js'
import { lessonArt, tintClass, poseTint } from '../../lib/tints.js'

/** The opening slide: what the lesson is for, the words she will meet, how it works. */
export function IntroSlide({ lesson }) {
  const { t } = useLang()
  const text = useText()
  const L = t.learn
  const art = lessonArt(lesson)
  return (
    <div className="pt-2">
      {art && <Porthole kind={art.kind} window={art.window} size={112} className="mb-5 shadow-card" />}
      <Eyebrow tone="tint">{L.lessons}</Eyebrow>
      <h1 className="mt-1.5 font-serif text-display text-ink">{text(lesson.title)}</h1>
      <div className="mt-4"><Bi en={lesson.lead.en} vi={lesson.lead.vi} size="lg" /></div>
      <div className="mt-3 text-caption text-muted">{lesson.terms.length} {L.words} · {lesson.minutes} {L.minutes}</div>
      <Section title={L.youWillMeet}>
        <div className="flex flex-wrap gap-2">
          {lesson.terms.map((id) => {
            const term = getTerm(id)
            return term ? <Chip key={id} onClick={() => audio.play(id)}>{term.en} <span className="ml-1 font-normal opacity-70">· {term.vi}</span></Chip> : null
          })}
        </div>
      </Section>
      <Section title={L.how}><Bi en={lesson.how.en} vi={lesson.how.vi} /></Section>
    </div>
  )
}

/** One term: on the figure, heard, in plain words, inside a cue, and the line for when it hurts. */
export function TermSlide({ slide, lesson }) {
  const { t } = useLang()
  const L = t.learn
  const a = t.anatomy
  const term = getTerm(slide.term)
  useEffect(() => {
    if (!term) return
    audio.play(term.id)
    store.meet(term.id, 'term')
  }, [term])
  if (!term) return null
  const plainDiffers = term.plain && term.plain.toLowerCase() !== term.en.toLowerCase()
  const label = lesson.labels?.[term.id]
  const where = [a.regions[term.region], a.kinds?.[term.kind]].filter(Boolean).join(' · ')

  return (
    <div>
      {where && <Eyebrow tone="tint" className="mb-2">{where}</Eyebrow>}
      <FigureCrop kind={slide.figure.kind} window={slide.figure.window} highlight={slide.figure.highlight} onTap={() => audio.play(term.id)} maxH="34dvh" />
      <p className="mt-2 px-1 text-[12px] text-muted">{L.tapFigure}</p>

      <div className="mt-5 flex items-start gap-4">
        <PlayButton id={term.id} size={56} />
        <div className="min-w-0 pt-0.5">
          <div className="font-serif text-[30px] leading-[1.1] text-ink">{label || term.en}</div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2">
            {label && <span className="text-caption text-muted">{term.en}</span>}
            <SayHint say={term.say} />
          </div>
          {term.latin && term.latin !== term.en && <div className="text-[12px] text-muted">{L.latin}: {term.latin}</div>}
        </div>
      </div>
      <div className="mt-2 text-body-lg text-ink">{term.vi}</div>
      {term.shortEn && <div className="mt-1"><Tag tone="gold">“{term.shortEn}”</Tag></div>}

      {plainDiffers && (
        <Section title={L.plain}>
          <div className="rounded-3xl border border-line/70 bg-paper p-2 shadow-card">
            <Say id={`${term.id}__plain`} en={term.plain} vi={term.viPlain} size="lg" />
          </div>
        </Section>
      )}
      {term.feel && (
        <Section title={L.feel}><Bi en={term.feel.en} vi={term.feel.vi} /></Section>
      )}
      <Section title={L.inClass}>
        <div className="rounded-3xl border border-line/70 bg-paper p-2 shadow-card">
          {(slide.cues || []).map((cid) => {
            const i = Number(cid.split('__cue-')[1]) - 1
            const c = term.cues?.[i]
            if (!c) return null
            return (
              <div key={cid} className="flex items-start gap-1">
                <div className="min-w-0 flex-1"><Say id={cid} en={c.en} vi={c.vi} /></div>
                <Tag className="mr-1 mt-3.5 uppercase tracking-wider">{t.anatomy.styles[c.style] || c.style}</Tag>
              </div>
            )
          })}
        </div>
      </Section>
      {slide.care && (
        <Section title={L.care}>
          <div className="tint-clay wash rounded-3xl border border-line/60 p-2"><Say id={slide.care.id} en={slide.care.en} vi={slide.care.vi} /></div>
        </Section>
      )}
      {term.wordTrap && (
        <div className="tint-gold wash mt-6 rounded-3xl border border-line/60 px-4 py-3.5">
          <Eyebrow tone="tint" className="mb-1">{a.sayRight}</Eyebrow>
          <p className="text-body text-ink">{term.wordTrap}</p>
        </div>
      )}
    </div>
  )
}

/** A pose, seen through the lesson's terms: names, the muscles that stretch, what to say for safety. */
export function PoseSlide({ slide }) {
  const { t } = useLang()
  const L = t.learn
  const pose = getPose(slide.pose)
  useEffect(() => { if (pose) audio.play(`${pose.id}__en`) }, [pose])
  if (!pose) return null
  const chips = (ids) => ids.map((id) => {
    const m = getTerm(id)
    return m ? <Chip key={id} onClick={() => audio.play(id)}>{m.en} <span className="ml-1 font-normal opacity-70">· {m.vi}</span></Chip> : null
  })
  const note = pose.yin?.note || pose.ashtanga?.note
  return (
    <div className={tintClass(poseTint(pose))}>
      <Eyebrow tone="tint" className="mb-2">{L.pose}{pose.styles?.length ? ` · ${pose.styles.map((s) => t.poses[s]).join(' · ')}` : ''}</Eyebrow>
      <div className="wash rounded-3xl border border-line/60 p-5 shadow-card">
        <div className="flex items-center gap-4">
          <PlayButton id={`${pose.id}__en`} size={52} />
          <div className="min-w-0">
            <div className="font-serif text-title text-ink">{pose.en}</div>
            <div className="text-body text-muted">{pose.vi}</div>
          </div>
        </div>
        {pose.sa && (
          <div className="mt-4 flex items-center gap-4">
            <PlayButton id={`${pose.id}__sa`} size={40} />
            <div className="min-w-0"><div className="font-serif italic text-body-lg text-ink">{pose.sa}</div><SayHint say={pose.say} /></div>
          </div>
        )}
        {note && <p className="mt-4 text-caption text-muted"><Bi en={note.en} vi={note.vi} size="sm" /></p>}
      </div>
      {pose.muscles?.lengthening?.length > 0 && (
        <Section title={L.lengthening}><div className="flex flex-wrap gap-2">{chips(pose.muscles.lengthening)}</div></Section>
      )}
      {pose.muscles?.working?.length > 0 && (
        <Section title={L.working}><div className="flex flex-wrap gap-2">{chips(pose.muscles.working)}</div></Section>
      )}
      {pose.safety?.length > 0 && (
        <Section title={L.safety}>
          <div className="tint-clay wash rounded-3xl border border-line/60 p-2">{pose.safety.map((s) => <Say key={s.id} id={s.id} en={s.en} vi={s.vi} />)}</div>
        </Section>
      )}
      {pose.breath && (
        <Section title={L.breath}><Bi en={pose.breath.en} vi={pose.breath.vi} /></Section>
      )}
      <div className="mt-6"><Link to={`/poses/${pose.id}`} className="inline-flex items-center gap-1.5 text-body font-medium text-tint-deep">{L.seePose} <ArrowRight size={16} /></Link></div>
    </div>
  )
}

/** The three quiet marks of a known term: labelled, said, used in a cue. */
export function KnownMarks({ row, compact = false }) {
  const { t } = useLang()
  return (
    <span className={`inline-flex flex-wrap items-center ${compact ? 'gap-x-2.5' : 'gap-x-3.5'} gap-y-1 text-[11px] text-muted`}>
      {FACETS.map((f) => {
        const on = !!row?.[f]
        return (
          <span key={f} className={`inline-flex items-center gap-1.5 ${on ? 'text-tint-deep' : ''}`}>
            <span className={`grid h-[14px] w-[14px] place-items-center rounded-full transition-colors ${on ? 'bg-tint-deep text-paper' : 'border border-line bg-paper/60'}`}>
              {on && <Check size={9} strokeWidth={3.5} />}
            </span>
            {t.learn.facets[f]}
          </span>
        )
      })}
    </span>
  )
}

/** The end: done, the words met, where each stands, what comes next. */
export function DoneSlide({ lesson, termRows }) {
  const { t } = useLang()
  const text = useText()
  const L = t.learn
  const pose = lesson.pose ? getPose(lesson.pose) : null
  const idx = LESSONS.findIndex((l) => l.id === lesson.id)
  const next = LESSONS[idx + 1]
  return (
    <div>
      <div className="flex flex-col items-center pb-5 pt-6 text-center">
        <Ring value={1} done size={84} stroke={5} className="mb-5" />
        <div className="font-serif text-display text-ink">{L.doneTitle}</div>
        <p className="mt-2 max-w-[26ch] text-body text-muted">{L.doneLead}</p>
      </div>
      <div className="divide-y divide-line/70 rounded-3xl border border-line/70 bg-paper shadow-card">
        {lesson.terms.map((id) => {
          const term = getTerm(id)
          if (!term) return null
          return (
            <div key={id} className="flex items-center gap-3 px-3.5 py-3">
              <PlayButton id={id} size={38} />
              <div className="min-w-0 flex-1">
                <div className="text-body text-ink">{lesson.labels?.[id] || term.en} <span className="text-caption text-muted">· {term.vi}</span></div>
                <KnownMarks row={termRows?.[id]} compact />
              </div>
            </div>
          )
        })}
      </div>
      {next && (
        <p className="mt-6 px-1 text-caption text-muted">{L.nextLesson}: <span className="text-ink">{text(next.title)}</span>{next.slides ? '' : ` · ${L.soon}`}</p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <Chip to="/anatomy">{L.toAnatomy}</Chip>
        {pose && <Chip to={`/poses/${pose.id}`} tone={poseTint(pose)}>{L.toPose}: {pose.en}</Chip>}
      </div>
    </div>
  )
}
