import { useState } from 'react'
import { useLang } from '../../lib/i18n.jsx'
import { cueText } from '../../lib/content.js'
import { Say } from '../ui.jsx'
import { Prompt, Verdict, CheckButton } from './shared.jsx'
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
      <div className="grid gap-2">
        {activity.options.map((o) => {
          const isChosen = chosen === o.id
          const isRight = o.id === activity.correct
          let look = 'border-line bg-paper text-ink'
          if (isChosen && !checked) look = 'border-sage-deep bg-sage-deep text-paper'
          if (checked) {
            if (isRight) look = 'border-sage bg-sage-soft text-sage-deep'
            else if (isChosen) look = 'border-clay/60 bg-clay-soft text-clay'
            else look = 'border-line bg-paper text-muted opacity-60'
          }
          return (
            <button key={o.id} disabled={checked} onClick={() => setChosen(o.id)} className={`rounded-2xl border px-4 py-3 text-left transition ${look}`}>
              <div className="text-[16px] leading-snug">{o.en}</div>
              {support !== 'light' && <div className={`text-xs ${isChosen && !checked ? 'text-paper/80' : 'opacity-70'}`}>{o.vi}</div>}
            </button>
          )
        })}
      </div>
      {!checked && <CheckButton onClick={() => onResult({ done: true, correct: chosen === activity.correct, chosen })} disabled={!chosen} label={t.learn.reveal} />}
      {checked && (
        <>
          <Verdict ok={result.correct}>{text(activity.explain)}</Verdict>
          {then && (
            <div className="mt-3 rounded-2xl bg-paper border border-line p-2">
              <div className="px-2 pt-1 text-[12px] font-semibold uppercase tracking-wider text-muted">{t.learn.thenSay}</div>
              <Say id={activity.then.clip} en={then.en} vi={then.vi} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
