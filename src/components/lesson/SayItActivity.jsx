import { useEffect, useRef, useState } from 'react'
import { Mic, Square, Volume2 } from 'lucide-react'
import { useLang } from '../../lib/i18n.jsx'
import { cueText } from '../../lib/content.js'
import { audio } from '../../lib/audio.js'
import { api } from '../../lib/api.js'
import { canRecord, startRecording } from '../../lib/recorder.js'
import { useSpeaking } from '../../lib/useSpeaking.js'
import { Button, Dots, SayHint } from '../ui.jsx'
import PronounceFeedback from '../PronounceFeedback.jsx'
import { Prompt, Board } from './shared.jsx'
import { useText } from '../../lib/lesson.js'

/**
 * Say it: hear the model, record herself, and Gemini says in Vietnamese
 * what to fix (finals, clusters, th, stress, vowels). One item at a time;
 * any item can be left for later. The activity is done when she reaches the
 * end, whatever the verdicts; a term counts as "said" on good or almost.
 */
export default function SayItActivity({ activity, result, onResult }) {
  const { t } = useLang()
  const text = useText()
  const L = t.learn
  const items = activity.items
  const [i, setI] = useState(() => (result?.done ? items.length - 1 : 0))
  const [verdicts, setVerdicts] = useState(() => result?.verdicts || {})
  const [state, setState] = useState('idle') // idle | recording | checking | shown
  const [feedback, setFeedback] = useState(null)
  const [error, setError] = useState(null)
  const recRef = useRef(null)
  const speaking = useSpeaking()
  const item = items[i]
  const cue = item.kind === 'cue' ? cueText(item.clip) : null
  const done = !!result?.done

  useEffect(() => () => { recRef.current?.cancel?.() }, [])
  useEffect(() => { if (!done) audio.play(item.clip) }, [item.clip, done])

  const record = async () => {
    setError(null)
    if (state === 'recording') {
      setState('checking')
      try {
        const { base64, seconds } = await recRef.current.stop()
        recRef.current = null
        if (seconds < 0.4) { setState('idle'); return }
        const fb = await api.pronounce(base64, item.text, item.say)
        setFeedback(fb)
        setVerdicts((v) => ({ ...v, [i]: fb.verdict }))
        setState('shown')
      } catch (err) {
        setError(`${L.sayError} (${err.message})`)
        setState('idle')
      }
      return
    }
    if (!canRecord()) { setError(L.noMic); return }
    try {
      audio.stop()
      recRef.current = await startRecording()
      setFeedback(null)
      setState('recording')
    } catch {
      setError(L.noMic)
    }
  }

  const finish = (v) => {
    const said = items.filter((it, k) => ['good', 'almost'].includes(v[k]) && it.credit && it.kind !== 'cue').map((it) => it.credit)
    const cued = items.flatMap((it, k) => (it.kind === 'cue' && ['good', 'almost'].includes(v[k]) ? it.credits?.cued || [] : []))
    onResult({ done: true, correct: true, verdicts: v, credits: { said, cued } })
  }
  const next = () => {
    if (i + 1 < items.length) { setI(i + 1); setState('idle'); setFeedback(null) }
    else finish(verdicts)
  }
  const skip = () => next()

  const modelOn = speaking === item.clip

  return (
    <div>
      <Prompt>{text(activity.prompt)}</Prompt>
      <Dots count={items.length} index={i} className="mb-4 !justify-start" />

      <Board className="!p-5">
        <div className="flex items-start gap-4">
          <button onClick={() => (modelOn ? audio.stop() : audio.play(item.clip))} className={`press grid h-13 w-13 shrink-0 place-items-center rounded-full ${modelOn ? 'bg-tint-deep text-paper speaking' : 'bg-tint-soft text-tint-deep'}`} aria-label={L.model}>
            <Volume2 size={24} />
          </button>
          <div className="min-w-0 pt-0.5">
            <div className={`font-serif text-ink ${item.kind === 'cue' ? 'text-heading' : 'text-title'}`}>{item.text}</div>
            {item.say && <div className="mt-0.5"><SayHint say={item.say} /></div>}
            {cue?.vi && <div className="mt-1 text-caption text-muted">{cue.vi}</div>}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2.5">
          <button onClick={record} disabled={state === 'checking' || done}
            className={`press grid h-24 w-24 place-items-center rounded-full shadow-card disabled:opacity-50 ${state === 'recording' ? 'bg-clay text-paper speaking-clay' : 'bg-ink text-sand'}`} aria-label={state === 'recording' ? L.stop : L.record}>
            {state === 'recording' ? <Square size={30} /> : <Mic size={34} />}
          </button>
          <span className="text-caption text-muted">{state === 'recording' ? L.recording : state === 'checking' ? L.checking : L.record}</span>
        </div>
        {error && <p className="mt-3 text-center text-caption text-clay-deep">{error}</p>}
      </Board>

      {feedback && state === 'shown' && (
        <Board className="slide-in mt-4 !p-5">
          <PronounceFeedback feedback={feedback} />
        </Board>
      )}

      {!done && (
        <div className="mt-4 flex items-center justify-between gap-2">
          <Button kind="quiet" onClick={skip} disabled={state === 'recording' || state === 'checking'}>{L.skip}</Button>
          <div className="flex gap-2">
            {state === 'shown' && <Button kind="secondary" onClick={() => { setState('idle'); setFeedback(null) }}>{L.tryAgain}</Button>}
            {state === 'shown' && <Button onClick={next}>{i + 1 < items.length ? L.nextWord : L.finish}</Button>}
          </div>
        </div>
      )}
    </div>
  )
}
