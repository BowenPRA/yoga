import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, X } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { getLesson, getPose } from '../lib/content.js'
import { audio } from '../lib/audio.js'
import { progress } from '../lib/store.js'
import { Button, Dots, Eyebrow } from '../components/ui.jsx'
import { IntroSlide, TermSlide, PoseSlide, DoneSlide } from '../components/lesson/slides.jsx'
import LabelActivity from '../components/lesson/LabelActivity.jsx'
import SortActivity from '../components/lesson/SortActivity.jsx'
import OrderActivity from '../components/lesson/OrderActivity.jsx'
import HotspotActivity from '../components/lesson/HotspotActivity.jsx'
import PredictActivity from '../components/lesson/PredictActivity.jsx'
import ChainActivity from '../components/lesson/ChainActivity.jsx'
import DictationActivity from '../components/lesson/DictationActivity.jsx'
import SayItActivity from '../components/lesson/SayItActivity.jsx'
import { tintClass, lessonTint, activityTint, poseTint } from '../lib/tints.js'

const ACTIVITIES = {
  label: LabelActivity, sort: SortActivity, order: OrderActivity, hotspot: HotspotActivity,
  predict: PredictActivity, chain: ChainActivity, dictation: DictationActivity, sayit: SayItActivity,
}

/** The colour a slide arrives in: the region for its terms, the task for an activity. */
function tintOf(slide, lesson) {
  if (!slide) return 'sage'
  if (slide.type === 'activity') return activityTint(slide.activity.type)
  if (slide.type === 'pose') return poseTint(getPose(slide.pose))
  if (slide.type === 'done') return 'sage'
  return lessonTint(lesson)
}

/**
 * A lesson deck, one slide per screen, in the manner of the Dashboard's
 * Notes: a slide with an activity cannot be left until it is answered; her
 * place and answers are kept so she can stop and come back; reaching the
 * end marks the lesson done, once, with no score.
 */
export default function Lesson() {
  const { id } = useParams()
  const lesson = getLesson(id)
  const navigate = useNavigate()
  const { t } = useLang()
  const L = t.learn
  const [index, setIndex] = useState(0)
  const [results, setResults] = useState({})
  const [termRows, setTermRows] = useState({})
  const [ready, setReady] = useState(false)
  const doneRef = useRef(false)
  const mainRef = useRef(null)

  // Resume where she stopped; a finished lesson starts again from the top.
  useEffect(() => {
    let live = true
    setIndex(0); setResults({}); setReady(false)
    progress.lesson(id).then((row) => {
      if (!live) return
      if (row && !row.done && row.slide) { setIndex(Math.min(row.slide, (lesson?.slides?.length || 1) - 1)); setResults(row.results || {}) }
      doneRef.current = !!row?.done
      setReady(true)
    })
    return () => { live = false }
  }, [id, lesson])

  useEffect(() => { audio.stop(); mainRef.current?.scrollTo?.({ top: 0 }) }, [index])
  useEffect(() => () => audio.stop(), [])

  const slides = lesson?.slides || []
  const slide = slides[index]
  const last = index === slides.length - 1

  useEffect(() => {
    if (!ready || !lesson) return
    if (last) {
      progress.saveLesson(id, { done: Date.now(), slide: 0, results: {} })
      progress.terms().then(setTermRows)
    } else {
      progress.saveLesson(id, { slide: index, results })
    }
  }, [index, results, ready, last, id, lesson])

  // An activity credits the facets it names: the ones its component worked
  // out, else the lesson's own `credits` on that activity, once it is right.
  const onResult = useCallback(async (i, result) => {
    setResults((r) => ({ ...r, [i]: result }))
    const credits = result?.credits || (result?.correct ? slides[i]?.activity?.credits : null)
    for (const [facet, ids] of Object.entries(credits || {})) {
      if (ids?.length) await progress.mark(facet, ids)
    }
  }, [slides])

  if (!lesson?.slides) return <Navigate to="/anatomy" replace />
  if (!ready) return <div className="fixed inset-0 z-40 bg-sand" />

  const pending = slide.type === 'activity' && !results[index]?.done
  const close = () => navigate('/anatomy')
  const next = () => (last ? close() : setIndex((i) => Math.min(slides.length - 1, i + 1)))
  const prev = () => setIndex((i) => Math.max(0, i - 1))

  let body
  if (slide.type === 'intro') body = <IntroSlide lesson={lesson} />
  else if (slide.type === 'term') body = <TermSlide slide={slide} lesson={lesson} />
  else if (slide.type === 'pose') body = <PoseSlide slide={slide} lesson={lesson} />
  else if (slide.type === 'done') body = <DoneSlide lesson={lesson} termRows={termRows} />
  else if (slide.type === 'activity') {
    const A = ACTIVITIES[slide.activity.type]
    body = A ? <A activity={slide.activity} lesson={lesson} result={results[index]} onResult={(r) => onResult(index, r)} /> : null
  }

  const label = slide.type === 'intro' ? L.start : last ? L.finish : L.next
  const tint = tintOf(slide, lesson)

  return (
    <div className={`screen-wash fixed inset-0 z-40 flex flex-col ${tintClass(tint)}`}>
      <header className="flex items-center gap-3 px-4 pb-2 pt-safe">
        <button onClick={close} className="press grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper/70 text-muted" aria-label={L.close}><X size={20} /></button>
        <Dots count={slides.length} index={index} className="min-w-0 flex-1" />
        <span className="w-10 shrink-0" />
      </header>
      <main ref={mainRef} className="min-h-0 flex-1 overflow-y-auto px-5 pb-8 pt-2">
        <div key={index} className="slide-in mx-auto w-full max-w-xl">
          {slide.type === 'activity' && <Eyebrow tone="tint" className="mb-2">{L.kinds[slide.activity.type] || L.activity}</Eyebrow>}
          {body}
        </div>
      </main>
      <footer className="flex items-center gap-3 bg-sand/95 px-5 pt-3 backdrop-blur-sm pb-safe">
        <Button kind="secondary" size="lg" onClick={prev} disabled={index === 0} className="w-[54px] !px-0" aria-label={L.back}><ChevronLeft size={22} /></Button>
        <Button size="lg" onClick={next} disabled={pending} className="flex-1">{label}</Button>
      </footer>
    </div>
  )
}
