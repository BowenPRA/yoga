import { useEffect, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { useLang } from '../../lib/i18n.jsx'
import { cueText } from '../../lib/content.js'
import { audio } from '../../lib/audio.js'
import { useSpeaking } from '../../lib/useSpeaking.js'
import { similarity, wordDiff } from '../../lib/similarity.js'
import { Button } from '../ui.jsx'
import { Prompt, Verdict, CheckButton } from './shared.jsx'
import { useText } from '../../lib/lesson.js'

const PASS = 0.85

/**
 * Hear a cue, type it, after the Dashboard's Dictation task. Marked by
 * similarity; a near miss shows which words were missed and lets her listen
 * and fix, or show the cue and move on.
 */
export default function DictationActivity({ activity, result, onResult }) {
  const { t } = useLang()
  const text = useText()
  const L = t.learn
  const cue = cueText(activity.clip)
  const speaking = useSpeaking()
  const [typed, setTyped] = useState(result?.typed || '')
  const [attempt, setAttempt] = useState(null) // { score, diff } of a failed try
  const checked = !!result?.done

  useEffect(() => { if (!checked) audio.play(activity.clip) }, [activity.clip, checked])

  const check = () => {
    const score = similarity(typed, cue.en)
    if (score >= PASS) onResult({ done: true, correct: true, typed, score, credits: activity.credits })
    else setAttempt({ score, diff: wordDiff(typed, cue.en) })
  }
  const giveUp = () => onResult({ done: true, correct: false, typed, score: attempt?.score || 0 })
  const diff = checked ? wordDiff(result.typed, cue.en) : attempt?.diff
  const on = speaking === activity.clip

  return (
    <div>
      <Prompt>{text(activity.prompt)}</Prompt>
      <div className="flex flex-col items-center gap-3 py-3">
        <button onClick={() => (on ? audio.stop() : audio.play(activity.clip))}
          className={`press grid h-24 w-24 place-items-center rounded-full shadow-card ${on ? 'bg-tint-deep text-paper speaking' : 'bg-tint-soft text-tint-deep'}`} aria-label={L.replay}>
          <Volume2 size={38} />
        </button>
        <span className="max-w-[30ch] text-center text-caption text-muted">{L.dictationHint}</span>
      </div>
      {!checked && (
        <>
          <textarea value={typed} onChange={(e) => setTyped(e.target.value)} rows={3} spellCheck={false} autoCorrect="off" autoCapitalize="sentences" placeholder={L.dictationPlaceholder}
            className={`w-full resize-none rounded-3xl border bg-paper p-4 text-body-lg text-ink shadow-card outline-none placeholder:text-muted/60 ${attempt ? 'border-clay/60' : 'border-line/70 focus:border-tint'}`} />
          {attempt && (
            <div className="tint-clay wash mt-3 rounded-3xl border border-line/60 px-4 py-3 text-body text-ink">
              <div className="mb-1">{L.dictationClose}</div>
              <DiffLine diff={attempt.diff} hideMissed />
            </div>
          )}
          <div className="mt-2 flex items-center justify-between gap-2">
            {attempt ? <Button kind="quiet" onClick={giveUp} className="mt-4">{L.showAnswer}</Button> : <span />}
            <CheckButton onClick={check} disabled={!typed.trim()} />
          </div>
        </>
      )}
      {checked && (
        <Verdict ok={result.correct}>
          <div className="text-eyebrow uppercase text-muted">{L.target}</div>
          <div className="mt-1 text-body-lg font-medium"><DiffLine diff={diff} /></div>
          <div className="mt-1 text-caption text-muted">{cue.vi}</div>
          {activity.notes && <div className="mt-2.5 text-caption">{text(activity.notes)}</div>}
        </Verdict>
      )}
    </div>
  )
}

/** The target with the words she missed marked; her extra words struck through. */
function DiffLine({ diff, hideMissed = false }) {
  if (!diff) return null
  return (
    <span>
      {diff.map((d, i) => {
        if (d.state === 'ok') return <span key={i}>{d.word} </span>
        if (d.state === 'missed') return <span key={i} className="rounded-md bg-clay-soft px-1 text-clay-deep">{hideMissed ? '· · ·' : d.word} </span>
        return <span key={i} className="text-muted line-through">{d.word} </span>
      })}
    </span>
  )
}
