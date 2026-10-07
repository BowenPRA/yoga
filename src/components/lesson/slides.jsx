import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useLang } from '../../lib/i18n.jsx'
import { getTerm, getPose, LESSONS } from '../../lib/content.js'
import { audio } from '../../lib/audio.js'
import { store, FACETS } from '../../lib/store.js'
import { Bi, Chip, PlayButton, Say, SayHint, Section } from '../ui.jsx'
import FigureCrop from '../FigureCrop.jsx'
import { useText } from '../../lib/lesson.js'

/** The opening slide: what the lesson is for, the words she will meet, how it works. */
export function IntroSlide({ lesson }) {
  const { t } = useLang()
  const text = useText()
  const L = t.learn
  return (
    <div className="pt-4">
      <div className="text-[12px] font-semibold uppercase tracking-wider text-muted">{L.lessons}</div>
      <h1 className="mt-1 font-serif text-[36px] leading-tight text-ink">{text(lesson.title)}</h1>
      <p className="mt-3 text-[17px] leading-relaxed"><Bi en={lesson.lead.en} vi={lesson.lead.vi} /></p>
      <div className="mt-3 text-sm text-muted">{lesson.terms.length} {L.words} · {lesson.minutes} {L.minutes}</div>
      <Section title={L.youWillMeet}>
        <div className="flex flex-wrap gap-2">
          {lesson.terms.map((id) => {
            const term = getTerm(id)
            return term ? <Chip key={id} onClick={() => audio.play(id)}>{term.en} <span className="ml-1 opacity-70">· {term.vi}</span></Chip> : null
          })}
        </div>
      </Section>
      <Section title={L.how}><p className="text-[15px] leading-relaxed"><Bi en={lesson.how.en} vi={lesson.how.vi} /></p></Section>
    </div>
  )
}

/** One term: on the figure, heard, in plain words, inside a cue, and the line for when it hurts. */
export function TermSlide({ slide, lesson }) {
  const { t } = useLang()
  const L = t.learn
  const term = getTerm(slide.term)
  useEffect(() => {
    if (!term) return
    audio.play(term.id)
    store.meet(term.id, 'term')
  }, [term])
  if (!term) return null
  const plainDiffers = term.plain && term.plain.toLowerCase() !== term.en.toLowerCase()
  const label = lesson.labels?.[term.id]

  return (
    <div>
      <FigureCrop kind={slide.figure.kind} window={slide.figure.window} highlight={slide.figure.highlight} onTap={() => audio.play(term.id)} maxH="36dvh" />
      <p className="mt-1 px-1 text-[11px] text-muted">{L.tapFigure}</p>

      <div className="mt-3 flex items-start gap-3">
        <PlayButton id={term.id} size={50} />
        <div className="min-w-0">
          <div className="font-serif text-[28px] leading-tight text-ink">{label || term.en}</div>
          <div className="flex flex-wrap items-center gap-x-2">
            {label && <span className="text-sm text-muted">{term.en}</span>}
            <SayHint say={term.say} />
          </div>
          {term.latin && term.latin !== term.en && <div className="text-xs text-muted">{L.latin}: {term.latin}</div>}
        </div>
      </div>
      <div className="mt-1 text-[18px] text-ink">{term.vi}</div>
      {term.shortEn && <div className="mt-1 text-sm text-muted">“{term.shortEn}”</div>}

      {plainDiffers && (
        <Section title={L.plain}><Say id={`${term.id}__plain`} en={term.plain} vi={term.viPlain} size="lg" /></Section>
      )}
      {term.feel && (
        <Section title={L.feel}><p className="text-[15px] leading-relaxed"><Bi en={term.feel.en} vi={term.feel.vi} /></p></Section>
      )}
      <Section title={L.inClass}>
        <div className="rounded-2xl bg-sand/70 p-2">
          {(slide.cues || []).map((cid) => {
            const i = Number(cid.split('__cue-')[1]) - 1
            const c = term.cues?.[i]
            if (!c) return null
            return (
              <div key={cid} className="flex items-start gap-1">
                <div className="min-w-0 flex-1"><Say id={cid} en={c.en} vi={c.vi} /></div>
                <span className="mt-3 shrink-0 rounded-full bg-paper px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">{t.anatomy.styles[c.style] || c.style}</span>
              </div>
            )
          })}
        </div>
      </Section>
      {slide.care && (
        <Section title={L.care}>
          <div className="rounded-2xl bg-clay-soft/50 p-2"><Say id={slide.care.id} en={slide.care.en} vi={slide.care.vi} /></div>
        </Section>
      )}
      {term.wordTrap && <p className="mt-5 rounded-xl bg-gold-soft/70 px-3 py-2 text-sm leading-relaxed text-ink">{term.wordTrap}</p>}
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
    return m ? <Chip key={id} onClick={() => audio.play(id)}>{m.en} <span className="ml-1 opacity-70">· {m.vi}</span></Chip> : null
  })
  const note = pose.yin?.note || pose.ashtanga?.note
  return (
    <div>
      <div className="rounded-2xl bg-paper border border-line shadow-card p-4">
        <div className="flex items-center gap-3">
          <PlayButton id={`${pose.id}__en`} size={46} />
          <div className="min-w-0">
            <div className="font-serif text-[26px] leading-tight text-ink">{pose.en}</div>
            <div className="text-[15px] text-muted">{pose.vi}</div>
          </div>
        </div>
        {pose.sa && (
          <div className="mt-3 flex items-center gap-3">
            <PlayButton id={`${pose.id}__sa`} size={36} />
            <div className="min-w-0"><div className="text-ink">{pose.sa}</div><SayHint say={pose.say} /></div>
          </div>
        )}
        {note && <p className="mt-3 text-sm text-muted"><Bi en={note.en} vi={note.vi} /></p>}
      </div>
      {pose.muscles?.lengthening?.length > 0 && (
        <Section title={L.lengthening}><div className="flex flex-wrap gap-2">{chips(pose.muscles.lengthening)}</div></Section>
      )}
      {pose.muscles?.working?.length > 0 && (
        <Section title={L.working}><div className="flex flex-wrap gap-2">{chips(pose.muscles.working)}</div></Section>
      )}
      {pose.safety?.length > 0 && (
        <Section title={L.safety}>
          <div className="rounded-2xl bg-clay-soft/50 p-2">{pose.safety.map((s) => <Say key={s.id} id={s.id} en={s.en} vi={s.vi} />)}</div>
        </Section>
      )}
      {pose.breath && (
        <Section title={L.breath}><p className="text-[15px] leading-relaxed"><Bi en={pose.breath.en} vi={pose.breath.vi} /></p></Section>
      )}
      <div className="mt-5"><Link to={`/poses/${pose.id}`} className="text-sm text-sage-deep">{L.seePose} →</Link></div>
    </div>
  )
}

/** The three quiet marks of a known term. */
export function KnownMarks({ row, compact = false }) {
  const { t } = useLang()
  return (
    <span className={`inline-flex flex-wrap items-center ${compact ? 'gap-x-2' : 'gap-x-3'} text-[11px] text-muted`}>
      {FACETS.map((f) => (
        <span key={f} className={`inline-flex items-center gap-1 ${row?.[f] ? 'text-sage-deep' : ''}`}>
          {row?.[f] ? <Check size={11} /> : <span className="inline-block h-[9px] w-[9px] rounded-full border border-line" />}
          {t.learn.facets[f]}
        </span>
      ))}
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
      <div className="pt-8 pb-4 text-center">
        <div className="font-serif text-[44px] leading-none text-ink">{L.doneTitle}</div>
        <p className="mt-3 text-[15px] text-muted">{L.doneLead}</p>
      </div>
      <div className="rounded-2xl bg-paper border border-line shadow-card divide-y divide-line">
        {lesson.terms.map((id) => {
          const term = getTerm(id)
          if (!term) return null
          return (
            <div key={id} className="flex items-center gap-3 px-3 py-2.5">
              <PlayButton id={id} size={34} />
              <div className="min-w-0 flex-1">
                <div className="text-ink">{lesson.labels?.[id] || term.en} <span className="text-sm text-muted">· {term.vi}</span></div>
                <KnownMarks row={termRows?.[id]} compact />
              </div>
            </div>
          )
        })}
      </div>
      {next && (
        <p className="mt-5 text-sm text-muted">{L.nextLesson}: <span className="text-ink">{text(next.title)}</span>{next.slides ? '' : ` · ${L.soon}`}</p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <Chip to="/anatomy">{L.toAnatomy}</Chip>
        {pose && <Chip to={`/poses/${pose.id}`} tone="clay">{L.toPose}: {pose.en}</Chip>}
      </div>
    </div>
  )
}
