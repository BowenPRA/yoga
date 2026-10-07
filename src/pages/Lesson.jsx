import { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, X } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { getLesson } from '../lib/content.js'
import { audio } from '../lib/audio.js'
import { progress } from '../lib/store.js'
import { Button } from '../components/ui.jsx'
import { IntroSlide, TermSlide, PoseSlide, DoneSlide } from '../components/lesson/slides.jsx'
import LabelActivity from '../components/lesson/LabelActivity.jsx'
import SortActivity from '../components/lesson/SortActivity.jsx'
import OrderActivity from '../components/lesson/OrderActivity.jsx'
import HotspotActivity from '../components/lesson/HotspotActivity.jsx'
import PredictActivity from '../components/lesson/PredictActivity.jsx'
import ChainActivity from '../components/lesson/ChainActivity.jsx'
import DictationActivity from '../components/lesson/DictationActivity.jsx'
import SayItActivity from '../components/lesson/SayItActivity.jsx'

const ACTIVITIES = {
  label: LabelActivity, sort: SortActivity, order: OrderActivity, hotspot: HotspotActivity,
  predict: PredictActivity, chain: ChainActivity, dictation: DictationActivity, sayit: SayItActivity,
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

  // Resume where she stopped; a finished lesson starts again from the top.
  useEffect(() => {
    let live = true
    progress.lesson(id).then((row) => {
      if (!live) return
      if (row && !row.done && row.slide) { setIndex(Math.min(row.slide, (lesson?.slides?.length || 1) - 1)); setResults(row.results || {}) }
      doneRef.current = !!row?.done
      setReady(true)
    })
    return () => { live = false }
  }, [id, lesson])

  useEffect(() => { audio.stop() }, [index])
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

  const onResult = useCallback(async (i, result) => {
    setResults((r) => ({ ...r, [i]: result }))
    for (const [facet, ids] of Object.entries(result?.credits || {})) {
      if (ids?.length) await progress.mark(facet, ids)
    }
  }, [])

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

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-sand">
      <header className="flex items-center gap-3 px-3 pb-2 pt-3">
        <button onClick={close} className="rounded-full p-1.5 text-muted hover:bg-paper" aria-label={L.close}><X size={22} /></button>
        <div className="flex flex-1 gap-[3px]">
          {slides.map((_, k) => (
            <span key={k} className={`h-1 flex-1 rounded-full transition-colors ${k < index ? 'bg-sage' : k === index ? 'bg-sage-deep' : 'bg-line'}`} />
          ))}
        </div>
        <span className="text-xs tabular-nums text-muted">{index + 1}/{slides.length}</span>
      </header>
      <main className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
        <div key={index} className="mx-auto w-full max-w-xl slide-in">{body}</div>
      </main>
      <footer className="flex gap-2 border-t border-line bg-sand px-4 pt-2 pb-safe">
        <Button kind="secondary" onClick={prev} disabled={index === 0} className="!px-3" aria-label={L.back}><ChevronLeft size={20} /></Button>
        <Button onClick={next} disabled={pending} className="flex-1">{label}</Button>
      </footer>
    </div>
  )
}
