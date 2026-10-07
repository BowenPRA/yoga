import { useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Check, Play, Square } from 'lucide-react'
import { useLang } from '../../lib/i18n.jsx'
import { cueText } from '../../lib/content.js'
import { audio } from '../../lib/audio.js'
import { Button, PlayButton } from '../ui.jsx'
import { Prompt, Verdict, CheckButton } from './shared.jsx'
import { seededShuffle, useText } from '../../lib/lesson.js'

/**
 * Order the cues of a pose, after the Dashboard's OrderActivity: the steps
 * arrive shuffled, each one playable; move them with the arrows. Check marks
 * each row and says where a misplaced one belongs. Afterwards she can hear
 * the whole sequence in the right order.
 */
export default function OrderActivity({ activity, result, onResult }) {
  const { t, support } = useLang()
  const text = useText()
  const L = t.learn
  const steps = activity.steps
  const [order, setOrder] = useState(() => result?.order || seededShuffle(steps, activity.id))
  const [playing, setPlaying] = useState(false)
  const stopRef = useRef(false)
  const checked = !!result?.done

  const move = (from, to) => {
    if (checked || to < 0 || to >= order.length) return
    setOrder((o) => { const n = [...o]; const [x] = n.splice(from, 1); n.splice(to, 0, x); return n })
  }
  const check = () => onResult({ done: true, correct: order.every((id, i) => id === steps[i]), order })
  const playAll = async () => {
    if (playing) { stopRef.current = true; audio.stop(); setPlaying(false); return }
    stopRef.current = false
    setPlaying(true)
    await audio.sequence(steps, 900, () => stopRef.current)
    setPlaying(false)
  }

  return (
    <div>
      <Prompt>{text(activity.prompt)}</Prompt>
      <ol className="space-y-2.5">
        {order.map((id, i) => {
          const line = cueText(id)
          const ok = checked ? steps[i] === id : null
          const look = checked ? (ok ? 'border-sage/50 bg-sage-soft/60' : 'border-clay/50 bg-clay-soft/50') : 'border-line/70 bg-paper shadow-card'
          return (
            <li key={id} className={`flex items-start gap-2 rounded-3xl border px-2.5 py-2.5 transition-colors ${look}`}>
              <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-tint-soft text-[12px] font-semibold text-tint-deep">{i + 1}</span>
              <PlayButton id={id} size={34} className="mt-0.5" />
              <div className="min-w-0 flex-1 pt-1">
                <div className="text-body leading-snug text-ink">{line?.en}</div>
                {support !== 'light' && line?.vi && <div className="text-[12px] text-muted">{line.vi}</div>}
                {checked && !ok && <div className="mt-1 text-eyebrow font-semibold uppercase text-clay-deep">{L.orderShouldBe} {steps.indexOf(id) + 1}</div>}
              </div>
              {checked ? (ok && <Check size={18} className="mt-2 text-sage-deep" />) : (
                <span className="flex flex-col gap-1">
                  <button onClick={() => move(i, i - 1)} disabled={i === 0} className="press grid h-8 w-8 place-items-center rounded-full border border-line/70 bg-paper text-muted disabled:opacity-30" aria-label={L.orderUp}><ChevronUp size={16} /></button>
                  <button onClick={() => move(i, i + 1)} disabled={i === order.length - 1} className="press grid h-8 w-8 place-items-center rounded-full border border-line/70 bg-paper text-muted disabled:opacity-30" aria-label={L.orderDown}><ChevronDown size={16} /></button>
                </span>
              )}
            </li>
          )
        })}
      </ol>
      {!checked && <CheckButton onClick={check} />}
      {checked && (
        <>
          <Verdict ok={result.correct}>{text(activity.explain)}</Verdict>
          <div className="mt-4"><Button kind="soft" onClick={playAll} className="w-full">{playing ? <Square size={16} /> : <Play size={16} />} {playing ? t.common.stop : L.listenAll}</Button></div>
        </>
      )}
    </div>
  )
}
