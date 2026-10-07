import { useEffect, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { useLang } from '../../lib/i18n.jsx'
import { cueText, getTerm } from '../../lib/content.js'
import { audio } from '../../lib/audio.js'
import { regionAt } from '../../lib/figures.js'
import { Button } from '../ui.jsx'
import FigureCrop from '../FigureCrop.jsx'
import { Prompt, Verdict } from './shared.jsx'
import { useText } from '../../lib/lesson.js'

/**
 * Hear a cue or a phrase, tap where you'd feel it, after the Dashboard's
 * HotspotActivity: two tries, then the answer is shown on the figure. The
 * tap is hit-tested against the figure's own regions, so "deep in your
 * outer hip" can accept the piriformis, the rotators or the glutes.
 */
export default function HotspotActivity({ activity, result, onResult }) {
  const { t } = useLang()
  const text = useText()
  const L = t.learn
  const [tries, setTries] = useState(result?.tries || 0)
  const [last, setLast] = useState(result?.last || null)
  const checked = !!result?.done
  const line = cueText(activity.clip) || (() => { const x = getTerm(activity.clip.replace(/__plain$/, '')); return x ? { en: activity.clip.endsWith('__plain') ? x.plain : x.en, vi: activity.clip.endsWith('__plain') ? x.viPlain : x.vi } : null })()

  useEffect(() => { if (!checked) audio.play(activity.clip) }, [activity.clip, checked])

  const tap = (point) => {
    if (checked) return
    const hit = regionAt(activity.figure.kind, point)
    const n = tries + 1
    const ok = !!hit && activity.accept.includes(hit)
    setTries(n)
    setLast({ point, hit })
    if (ok) onResult({ done: true, correct: true, tries: n, last: { point, hit } })
    else if (n >= 2) onResult({ done: true, correct: false, tries: n, last: { point, hit } })
  }

  const r = activity.figure.window[2] / 28
  return (
    <div>
      <Prompt>{text(activity.prompt)}</Prompt>
      <div className="mb-3">
        <Button kind="secondary" onClick={() => audio.play(activity.clip)}><Volume2 size={18} /> {L.replay}</Button>
        {checked && line && <p className="mt-2 text-sm text-muted">“{line.en}”</p>}
      </div>
      <FigureCrop kind={activity.figure.kind} window={activity.figure.window} onTap={tap}
        highlight={checked ? activity.reveal : []} tone={checked && !result.correct ? 'clay' : 'sage'} dashed={checked && !result.correct}>
        {last && (
          <circle cx={last.point[0]} cy={last.point[1]} r={r} fill={checked && result.correct ? '#4f6e5b' : '#b9704f'} fillOpacity={0.35} stroke={checked && result.correct ? '#4f6e5b' : '#b9704f'} strokeWidth={r / 6} pointerEvents="none" />
        )}
      </FigureCrop>
      {!checked && (
        <p className="mt-2 px-1 text-sm text-muted">{tries === 0 ? L.hotspotTap : L.hotspotAgain}</p>
      )}
      {checked && (
        <Verdict ok={result.correct}>
          {line && <div className="mb-1 text-sm text-muted">{line.vi}</div>}
          {text(activity.explain)}
        </Verdict>
      )}
    </div>
  )
}
