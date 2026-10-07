import { useState } from 'react'
import { useLang } from '../../lib/i18n.jsx'
import { cueText } from '../../lib/content.js'
import { Eyebrow, Say } from '../ui.jsx'
import { Prompt, Verdict, CheckButton, Board } from './shared.jsx'
import { useText } from '../../lib/lesson.js'

/**
 * Predict, then reveal, after the Dashboard's PredictActivity: "in Sleeping
 * Swan, where will your students feel it?" Choose, see the answer, then hear
 * the line to say when it is somewhere it shouldn't be.
 */
export default function PredictActivity({ activity, result, onResult }) {
  const { t, support } = useLang()
  const text = useText()
  const [chosen, setChosen] = useState(result?.chosen || null)
  const checked = !!result?.done
  const then = activity.then?.clip ? cueText(activity.then.clip) : null

  return (
    <div>
      <Prompt>{text(activity.prompt)}</Prompt>
      <div className="grid gap-2.5">
        {activity.options.map((o) => {
          const isChosen = chosen === o.id
          const isRight = o.id === activity.correct
          let look = 'border-line/70 bg-paper text-ink shadow-card'
          if (isChosen && !checked) look = 'border-tint-deep bg-tint-deep text-paper shadow-float'
          if (checked) {
            if (isRight) look = 'border-sage/50 bg-sage-soft text-sage-deep'
            else if (isChosen) look = 'border-clay/50 bg-clay-soft text-clay-deep'
            else look = 'border-line/70 bg-paper text-muted opacity-60'
          }
          return (
            <button key={o.id} disabled={checked} onClick={() => setChosen(o.id)} className={`press rounded-3xl border px-4 py-3.5 text-left ${look}`}>
              <div className="text-[16px] leading-snug">{o.en}</div>
              {support !== 'light' && <div className={`mt-0.5 text-[12px] ${isChosen && !checked ? 'text-paper/80' : 'opacity-70'}`}>{o.vi}</div>}
            </button>
          )
        })}
      </div>
      {!checked && <CheckButton onClick={() => onResult({ done: true, correct: chosen === activity.correct, chosen })} disabled={!chosen} label={t.learn.reveal} />}
      {checked && (
        <>
          <Verdict ok={result.correct}>{text(activity.explain)}</Verdict>
          {then && (
            <Board className="mt-4 !p-2">
              <Eyebrow className="px-2 pt-1.5">{t.learn.thenSay}</Eyebrow>
              <Say id={activity.then.clip} en={then.en} vi={then.vi} />
            </Board>
          )}
        </>
      )}
    </div>
  )
}
