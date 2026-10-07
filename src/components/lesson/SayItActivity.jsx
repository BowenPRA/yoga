import { useEffect, useRef, useState } from 'react'
import { Mic, Square, Volume2 } from 'lucide-react'
import { useLang } from '../../lib/i18n.jsx'
import { cueText } from '../../lib/content.js'
import { audio } from '../../lib/audio.js'
import { api } from '../../lib/api.js'
import { canRecord, startRecording } from '../../lib/recorder.js'
import { useSpeaking } from '../../lib/useSpeaking.js'
import { Button } from '../ui.jsx'
import { Prompt } from './shared.jsx'
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

  const verdictLook = { good: 'bg-sage-soft text-sage-deep', almost: 'bg-gold-soft text-ink', again: 'bg-clay-soft text-clay' }
  const verdictLabel = { good: L.good, almost: L.almost, again: L.tryAgain }

  return (
    <div>
      <Prompt>{text(activity.prompt)}</Prompt>
      <div className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-muted">{L.wordOf} {i + 1} {L.of} {items.length}</div>

      <div className="rounded-2xl border border-line bg-paper p-4">
        <div className="flex items-start gap-3">
          <button onClick={() => (speaking === item.clip ? audio.stop() : audio.play(item.clip))} className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${speaking === item.clip ? 'bg-sage-deep text-paper speaking' : 'bg-sage-soft text-sage-deep'}`} aria-label={L.model}>
            <Volume2 size={22} />
          </button>
          <div className="min-w-0">
            <div className={`text-ink ${item.kind === 'cue' ? 'font-serif text-[19px] leading-snug' : 'font-serif text-[24px] leading-tight'}`}>{item.text}</div>
            {item.say && <div className="text-xs text-clay">{item.say}</div>}
            {cue?.vi && <div className="mt-1 text-sm text-muted">{cue.vi}</div>}
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          <button onClick={record} disabled={state === 'checking' || done}
            className={`grid h-20 w-20 place-items-center rounded-full transition disabled:opacity-50 ${state === 'recording' ? 'bg-clay text-paper speaking' : 'bg-ink text-paper'}`} aria-label={state === 'recording' ? L.stop : L.record}>
            {state === 'recording' ? <Square size={28} /> : <Mic size={30} />}
          </button>
          <span className="text-sm text-muted">{state === 'recording' ? L.recording : state === 'checking' ? L.checking : L.record}</span>
        </div>
        {error && <p className="mt-2 text-center text-sm text-clay">{error}</p>}
      </div>

      {feedback && state === 'shown' && (
        <div className="mt-3 rounded-2xl border border-line bg-paper p-4">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${verdictLook[feedback.verdict] || verdictLook.again}`}>{verdictLabel[feedback.verdict] || feedback.verdict}</span>
            {feedback.heard && <span className="min-w-0 truncate text-xs text-muted">{L.heard}: “{feedback.heard}”</span>}
          </div>
          {feedback.praise_vi && <p className="mt-2 text-[15px] text-ink">{feedback.praise_vi}</p>}
          {feedback.fixes?.length > 0 && (
            <ul className="mt-2 divide-y divide-line">
              {feedback.fixes.map((f, k) => (
                <li key={k} className="py-2">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-medium text-ink">{f.word}</span>
                    {f.say && <span className="text-xs text-clay">{f.say}</span>}
                    <span className="rounded-full bg-sand px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">{L.issues[f.issue] || f.issue}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-ink/80">{f.tip_vi}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {!done && (
        <div className="mt-3 flex items-center justify-between gap-2">
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
