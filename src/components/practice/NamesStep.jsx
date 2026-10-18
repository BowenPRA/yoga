import { useEffect, useRef, useState } from 'react'
import { Mic, Square } from 'lucide-react'
import { useLang } from '../../lib/i18n.jsx'
import { audio } from '../../lib/audio.js'
import { api } from '../../lib/api.js'
import { canRecord, startRecording } from '../../lib/recorder.js'
import { Eyebrow, PlayButton, SayHint } from '../ui.jsx'
import PronounceFeedback from '../PronounceFeedback.jsx'
import { Board, Hint, Prompt } from '../lesson/shared.jsx'

const SAID = ['good', 'almost']
const LOOK = { good: 'bg-sage-soft text-sage-deep', almost: 'bg-gold-soft text-gold-deep', again: 'bg-clay-soft text-clay-deep' }

/** The mic can be tried: a recorder on this browser and, as far as the phone knows, a network. */
const canListen = () => canRecord() && !(typeof navigator !== 'undefined' && navigator.onLine === false)

/**
 * The first step of a pose practice: hear the pose's three names, then say
 * the English and the Sanskrit (and one word of the pose with a known trap)
 * into the mic. Each recording goes to /api/pronounce, as in SayItActivity,
 * and Gemini answers in Vietnamese. The step never blocks: she can move on
 * at any time. A good or almost verdict on the word counts it as "said".
 *
 * When the mic or the API cannot be reached, the step turns quietly into
 * listen and repeat: the mic buttons go, the voice stays, one line says why.
 */
export default function NamesStep({ step, pose, result, onResult }) {
  const { t } = useLang()
  const L = t.learn
  const X = t.practice
  const items = step.items
  const [verdicts, setVerdicts] = useState(() => result?.verdicts || {})
  const [busy, setBusy] = useState(null) // { key, phase: 'recording' | 'checking' }
  const [feedback, setFeedback] = useState(null) // { key, fb }
  const [listenOnly, setListenOnly] = useState(() => !!result?.listenOnly || !canListen())
  const [note, setNote] = useState(() => !!result?.listenOnly)
  const [arrive] = useState(() => !result)
  const recRef = useRef(null)
  const verdictsRef = useRef(verdicts)
  const quiet = useRef(false)

  useEffect(() => () => recRef.current?.cancel?.(), [])

  // Hear the names once on arrival: the English, then the Sanskrit when it has
  // a recording. Any tap on the step stops the rest of the sequence.
  useEffect(() => {
    if (!arrive) return
    quiet.current = false
    const ids = items.filter((it) => it.kind === 'name' && it.playable).map((it) => it.clip)
    const timer = setTimeout(() => audio.sequence(ids, 700, () => quiet.current), 400)
    return () => { quiet.current = true; clearTimeout(timer) }
  }, [arrive, items])

  const fallBack = () => {
    recRef.current?.cancel?.()
    recRef.current = null
    setBusy(null)
    setListenOnly(true)
    setNote(true)
    onResult({ done: true, verdicts: verdictsRef.current, listenOnly: true })
  }

  const finish = async (item) => {
    const rec = recRef.current
    if (!rec) return
    recRef.current = null
    setBusy({ key: item.key, phase: 'checking' })
    try {
      const { base64, seconds } = await rec.stop()
      if (seconds < 0.4) { setBusy(null); return }
      const fb = await api.pronounce(base64, item.text, item.say)
      verdictsRef.current = { ...verdictsRef.current, [item.key]: fb.verdict }
      setVerdicts(verdictsRef.current)
      setFeedback({ key: item.key, fb })
      setBusy(null)
      const credits = item.credit && SAID.includes(fb.verdict) ? { said: [item.credit] } : null
      onResult({ done: true, verdicts: verdictsRef.current, credits })
    } catch {
      fallBack()
    }
  }

  const record = async (item) => {
    quiet.current = true
    if (busy?.phase === 'checking') return
    if (busy?.phase === 'recording') {
      if (busy.key === item.key) await finish(item)
      return
    }
    audio.stop()
    try {
      recRef.current = await startRecording({ onLimit: () => finish(item) })
      setFeedback(null)
      setBusy({ key: item.key, phase: 'recording' })
    } catch {
      fallBack()
    }
  }

  const sa = items.find((it) => it.key === 'sa')
  const word = items.find((it) => it.key === 'word')
  const verdictLabel = { good: L.good, almost: L.almost, again: L.tryAgain }
  const prompt = listenOnly ? X.namesPromptRepeat : sa ? X.namesPrompt : X.namesPromptNoSa

  const row = (item, label, { serif = false } = {}) => {
    const mine = busy?.key === item.key ? busy.phase : null
    const v = verdicts[item.key]
    return (
      <div key={item.key} className="flex items-center gap-3 px-2 py-2.5">
        {item.playable ? (
          <PlayButton id={item.clip} size={44} />
        ) : (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sand text-[11px] font-semibold uppercase text-muted">{item.key === 'sa' ? 'SA' : 'EN'}</span>
        )}
        <div className="min-w-0 flex-1">
          <div className={`break-words text-ink ${serif ? 'font-serif text-body-lg italic' : 'text-body-lg font-medium'}`}>{item.text}</div>
          <div className="flex flex-wrap items-baseline gap-x-2">
            {label && <span className="text-[12px] text-muted">{label}</span>}
            {item.say && <SayHint say={item.say} />}
          </div>
          {!item.playable && item.say && <div className="mt-0.5 text-[12px] text-muted">{X.readSay}</div>}
          {mine && <div className="mt-0.5 text-[12px] font-medium text-tint-deep">{mine === 'recording' ? L.recording : L.checking}</div>}
          {!mine && v && <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[12px] font-medium ${LOOK[v] || LOOK.again}`}>{verdictLabel[v] || v}</span>}
        </div>
        {!listenOnly && (
          <button
            onClick={() => record(item)}
            disabled={mine === 'checking' || (!!busy && busy.key !== item.key)}
            className={`press grid h-11 w-11 shrink-0 place-items-center rounded-full disabled:opacity-35 ${mine === 'recording' ? 'bg-clay text-paper speaking-clay' : 'bg-ink text-sand'}`}
            aria-label={mine === 'recording' ? L.stop : `${L.record}: ${item.text}`}
          >
            {mine === 'recording' ? <Square size={16} /> : <Mic size={19} />}
          </button>
        )}
      </div>
    )
  }

  const heard = feedback && items.find((it) => it.key === feedback.key)

  return (
    <div onPointerDownCapture={() => { quiet.current = true }}>
      <Prompt>{prompt}</Prompt>
      <Board className="divide-y divide-line/60 !p-1.5">
        {row(items[0], t.common.english)}
        {sa && row(sa, t.common.sanskrit, { serif: true })}
        <div className="flex items-center gap-3 px-2 py-2.5">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sand text-[11px] font-semibold text-muted">VI</span>
          <div className="min-w-0 flex-1">
            <div className="break-words text-body-lg font-medium text-ink">{pose.vi}</div>
            <div className="text-[12px] text-muted">{t.common.vietnamese}</div>
          </div>
        </div>
      </Board>

      {word && (
        <>
          <Eyebrow className="mb-2 mt-5 px-1">{X.word}</Eyebrow>
          <Board className="!p-1.5">{row(word, word.vi)}</Board>
        </>
      )}

      {note && <Hint className="mt-3">{X.repeatNote}</Hint>}

      {heard && (
        <Board className="slide-in mt-4 !p-5">
          <Eyebrow className="mb-2">{heard.text}</Eyebrow>
          <PronounceFeedback feedback={feedback.fb} />
        </Board>
      )}
    </div>
  )
}
