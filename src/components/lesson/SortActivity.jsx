import { useMemo, useState } from 'react'
import { CornerDownRight } from 'lucide-react'
import { useLang } from '../../lib/i18n.jsx'
import { getTerm, getPose } from '../../lib/content.js'
import { PlayButton } from '../ui.jsx'
import { Prompt, Verdict, CheckButton, Piece, Bank } from './shared.jsx'
import { seededShuffle, useText, labelOf } from '../../lib/lesson.js'

/**
 * Sort muscles into bins for a pose (working / stretching), after the
 * Dashboard's SortActivity: tap a card, tap its bin; a card in a bin taps
 * back out. Check marks every card and names the right bin on the wrong ones.
 */
export default function SortActivity({ activity, lesson, result, onResult }) {
  const { t, support } = useLang()
  const text = useText()
  const L = t.learn
  const pose = activity.pose ? getPose(activity.pose) : null
  const cards = useMemo(() => seededShuffle(activity.cards, activity.id), [activity])
  const [placed, setPlaced] = useState(() => result?.placed || {})
  const [picked, setPicked] = useState(null)
  const checked = !!result?.done

  const bank = cards.filter((c) => !placed[c.term])
  const put = (termId, binId) => { setPlaced((p) => ({ ...p, [termId]: binId })); setPicked(null) }
  const unput = (termId) => setPlaced((p) => { const n = { ...p }; delete n[termId]; return n })
  const check = () => {
    const wrong = cards.filter((c) => placed[c.term] !== c.bin).map((c) => c.term)
    onResult({ done: true, correct: wrong.length === 0, placed, wrong })
  }

  const chip = (c, inBin) => {
    const term = getTerm(c.term)
    const ok = checked ? placed[c.term] === c.bin : null
    const look = checked ? (ok ? 'good' : 'bad') : picked === c.term ? 'picked' : 'idle'
    const bin = activity.bins.find((b) => b.id === c.bin)
    return (
      <Piece key={c.term} look={look} disabled={checked}
        onClick={() => { if (checked) return; if (inBin) unput(c.term); else setPicked(picked === c.term ? null : c.term) }}
        sub={checked && !ok ? `→ ${text(bin)}` : support === 'full' ? term?.vi : null}>
        {labelOf(lesson, c.term)}
      </Piece>
    )
  }

  return (
    <div>
      <Prompt>{text(activity.prompt)}</Prompt>
      {pose && (
        <div className="mb-4 flex items-center gap-3 rounded-3xl border border-line/70 bg-paper px-3.5 py-2.5 shadow-card">
          <PlayButton id={`${pose.id}__en`} size={38} />
          <div className="min-w-0"><div className="font-serif text-body-lg text-ink">{pose.en}</div><div className="text-caption text-muted">{pose.vi}{pose.sa ? ` · ${pose.sa}` : ''}</div></div>
        </div>
      )}
      {!checked && (
        <Bank className="mb-4" empty={bank.length === 0 ? L.sortPlaced : null}>
          {bank.map((c) => chip(c, false))}
        </Bank>
      )}
      <div className="grid grid-cols-2 gap-3">
        {activity.bins.map((bin) => {
          const here = cards.filter((c) => placed[c.term] === bin.id)
          const active = !!picked && !checked
          return (
            <div key={bin.id} onClick={() => picked && put(picked, bin.id)}
              className={`min-w-0 overflow-hidden rounded-3xl border bg-paper shadow-card transition ${active ? 'cursor-pointer border-tint ring-2 ring-tint/30' : 'border-line/70'}`}>
              <div className="border-b border-line/70 bg-tint-soft/60 px-3 py-2 text-center text-eyebrow font-semibold uppercase text-tint-deep">{text(bin)}</div>
              <div className="flex min-h-[72px] flex-wrap items-start gap-1.5 p-2.5">
                {here.length === 0 && (
                  <span className={`flex items-center gap-1 text-[11px] ${active ? 'text-tint-deep' : 'text-muted/70'}`}>
                    <CornerDownRight size={12} /> {active ? L.sortDrop : L.sortTap}
                  </span>
                )}
                {here.map((c) => chip(c, true))}
              </div>
            </div>
          )
        })}
      </div>
      {!checked && <CheckButton onClick={check} disabled={bank.length > 0} />}
      {checked && <Verdict ok={result.correct}>{text(activity.explain)}</Verdict>}
    </div>
  )
}
