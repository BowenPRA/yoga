import { useEffect, useRef, useState } from 'react'
import { Mic, Square } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { api } from '../lib/api.js'
import { audio } from '../lib/audio.js'
import { canRecord, startRecording } from '../lib/recorder.js'
import PronounceFeedback from './PronounceFeedback.jsx'

/**
 * "Now you say it": she records herself saying an English line and Gemini
 * says, in Vietnamese, what to polish (/api/pronounce, as in a lesson's
 * Say it). Recording stops by itself after fifteen seconds.
 */
export default function PractiseLine({ text, className = '' }) {
  const { t } = useLang()
  const L = t.learn
  const s = t.speech
  const [state, setState] = useState('idle') // idle | recording | checking
  const [feedback, setFeedback] = useState(null)
  const [error, setError] = useState(null)
  const recRef = useRef(null)

  useEffect(() => () => recRef.current?.cancel?.(), [])

  const check = async () => {
    const rec = recRef.current
    if (!rec) return
    recRef.current = null
    setState('checking')
    try {
      const { base64, seconds } = await rec.stop()
      if (seconds >= 0.4) setFeedback(await api.pronounce(base64, text))
    } catch (err) {
      setError(`${L.sayError} (${err.message})`)
    }
    setState('idle')
  }

  const record = async () => {
    setError(null)
    if (state === 'recording') return check()
    if (!canRecord()) { setError(L.noMic); return }
    try {
      audio.stop()
      recRef.current = await startRecording({ onLimit: check })
      setFeedback(null)
      setState('recording')
    } catch {
      setError(L.noMic)
    }
  }

  const label = state === 'recording' ? L.recording : state === 'checking' ? L.checking : s.practiseHint

  return (
    <div className={`rounded-3xl border border-line/70 bg-paper p-4 shadow-card ${className}`}>
      <div className="flex items-center gap-3.5">
        <button onClick={record} disabled={state === 'checking'}
          className={`press grid h-14 w-14 shrink-0 place-items-center rounded-full disabled:opacity-50 ${state === 'recording' ? 'bg-clay text-paper speaking-clay' : 'bg-ink text-sand'}`}
          aria-label={state === 'recording' ? L.stop : L.record}>
          {state === 'recording' ? <Square size={22} /> : <Mic size={24} />}
        </button>
        <div className="min-w-0">
          <div className="font-medium text-ink">{s.practise}</div>
          <div className="text-caption text-muted">{label}</div>
        </div>
      </div>
      {error && <p className="mt-3 text-caption text-clay-deep">{error}</p>}
      {feedback && state === 'idle' && (
        <div className="slide-in mt-4 border-t border-line/70 pt-4">
          <PronounceFeedback feedback={feedback} />
        </div>
      )}
    </div>
  )
}
