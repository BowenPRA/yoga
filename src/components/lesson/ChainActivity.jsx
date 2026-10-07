import { useMemo, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { useLang } from '../../lib/i18n.jsx'
import { cueText } from '../../lib/content.js'
import { audio } from '../../lib/audio.js'
import { Button } from '../ui.jsx'
import { Prompt, Verdict, CheckButton, Piece } from './shared.jsx'
import { seededShuffle, useText } from '../../lib/lesson.js'

/**
 * Build a cue from its pieces (verb, body part, direction, breath), after the
 * Dashboard's ChainActivity build board: the bank holds the pieces and two
 * traps; tapping a piece adds it to the end of the line, tapping a placed
 * piece takes it back. Right when the line is the cue, which then plays.
 */
export default function ChainActivity({ activity, result, onResult }) {
  const { t } = useLang()
  const text = useText()
  const L = t.learn
  const bankAll = useMemo(() => seededShuffle([...activity.pieces, ...(activity.traps || [])], activity.id), [activity])
  const [line, setLine] = useState(() => result?.line || [])
  const checked = !!result?.done
  const cue = cueText(activity.clip)

  const add = (piece) => { if (!checked && line.length < activity.pieces.length) setLine([...line, piece]) }
  const takeBack = (i) => { if (!checked) setLine(line.slice(0, i)) }
  const check = () => {
    const correct = line.length === activity.pieces.length && line.every((p, i) => p === activity.pieces[i])
    onResult({ done: true, correct, line, credits: correct ? activity.credits : null })
    if (correct) audio.play(activity.clip)
  }
  const bank = bankAll.filter((p) => !line.includes(p))

  return (
    <div>
      <Prompt>{text(activity.prompt)}</Prompt>
      <div className="min-h-[72px] rounded-2xl border border-line bg-paper p-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {line.map((p, i) => {
            const ok = checked ? p === activity.pieces[i] : null
            return <Piece key={`${p}-${i}`} look={checked ? (ok ? 'good' : 'bad') : 'idle'} onClick={() => takeBack(i)} disabled={checked}>{p}</Piece>
          })}
          {!checked && line.length < activity.pieces.length && (
            <span className="inline-block h-9 w-16 rounded-xl border border-dashed border-sage/60 bg-sage-soft/40" />
          )}
        </div>
      </div>
      {!checked && (
        <>
          <div className="mt-3 flex min-h-[48px] flex-wrap items-center gap-2 rounded-2xl border border-dashed border-line bg-sand/60 p-2">
            {bank.map((p) => <Piece key={p} onClick={() => add(p)}>{p}</Piece>)}
          </div>
          <p className="mt-2 px-1 text-xs text-muted">{L.chainTap}</p>
          <CheckButton onClick={check} disabled={line.length < activity.pieces.length} />
        </>
      )}
      {checked && (
        <>
          <Verdict ok={result.correct}>
            {!result.correct && cue && <div className="mb-2"><span className="text-[11px] uppercase tracking-wider text-muted">{L.chainRight}: </span><span className="font-medium">{cue.en}</span></div>}
            {text(activity.explain)}
          </Verdict>
          <div className="mt-3 flex items-center gap-3">
            <Button kind="secondary" onClick={() => audio.play(activity.clip)} className="shrink-0 whitespace-nowrap"><Volume2 size={18} /> {L.listenCue}</Button>
            {cue && <span className="text-sm text-muted">{cue.vi}</span>}
          </div>
        </>
      )}
    </div>
  )
}
