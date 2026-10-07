import { useMemo, useState } from 'react'
import { Volume2 } from 'lucide-react'
import { useLang } from '../../lib/i18n.jsx'
import { cueText } from '../../lib/content.js'
import { audio } from '../../lib/audio.js'
import { useSpeaking } from '../../lib/useSpeaking.js'
import { Button } from '../ui.jsx'
import { Prompt, Verdict, CheckButton, Piece, Board, Bank, Hint } from './shared.jsx'
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
  const speaking = useSpeaking()
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
  const on = speaking === activity.clip

  return (
    <div>
      <Prompt>{text(activity.prompt)}</Prompt>
      <Board className="min-h-[80px]">
        <div className="flex flex-wrap items-center gap-2">
          {line.map((p, i) => {
            const ok = checked ? p === activity.pieces[i] : null
            return <Piece key={`${p}-${i}`} look={checked ? (ok ? 'good' : 'bad') : 'idle'} onClick={() => takeBack(i)} disabled={checked}>{p}</Piece>
          })}
          {!checked && line.length < activity.pieces.length && (
            <span className="inline-block h-10 w-16 rounded-2xl border border-dashed border-tint/50 bg-tint-soft/50" />
          )}
        </div>
      </Board>
      {!checked && (
        <>
          <Bank className="mt-4">
            {bank.map((p) => <Piece key={p} onClick={() => add(p)}>{p}</Piece>)}
          </Bank>
          <Hint>{L.chainTap}</Hint>
          <CheckButton onClick={check} disabled={line.length < activity.pieces.length} />
        </>
      )}
      {checked && (
        <>
          <Verdict ok={result.correct}>
            {!result.correct && cue && <div className="mb-2"><span className="text-eyebrow uppercase text-muted">{L.chainRight}: </span><span className="font-medium">{cue.en}</span></div>}
            {text(activity.explain)}
          </Verdict>
          <div className="mt-4 flex items-center gap-3">
            <Button kind={on ? 'primary' : 'soft'} onClick={() => (on ? audio.stop() : audio.play(activity.clip))} className={`shrink-0 whitespace-nowrap ${on ? 'speaking' : ''}`}><Volume2 size={18} /> {L.listenCue}</Button>
            {cue && <span className="text-caption text-muted">{cue.vi}</span>}
          </div>
        </>
      )}
    </div>
  )
}
