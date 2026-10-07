import { useMemo, useState } from 'react'
import { useLang } from '../../lib/i18n.jsx'
import { getTerm } from '../../lib/content.js'
import { audio } from '../../lib/audio.js'
import FigureCrop from '../FigureCrop.jsx'
import { Prompt, Verdict, CheckButton, Piece } from './shared.jsx'
import { useText, labelOf } from '../../lib/lesson.js'

/**
 * Label It on the anatomy figure, after the Dashboard's LabelIt: a crop of
 * the figure with a leader line from each part to an empty box in the margin
 * above or below. Tap a name, tap its box. Check marks every box and writes
 * the right name into each wrong one; tapping a box then plays the name.
 *
 * Box layout follows utils/labelIt.js: one box size for the whole item,
 * sized to the widest name in the bank, so a box's width never gives its
 * answer away.
 */

// A bold sans at `font`, per character (from the Dashboard, rounded up).
const NARROW = new Set([...'ijlI.,:;!|\'’'])
const SLIM = new Set([...'frt'])
const MID = new Set([...'scz1'])
function approxWidth(text, font) {
  let em = 0
  for (const ch of String(text)) {
    if (ch === ' ') em += 0.3
    else if (NARROW.has(ch)) em += 0.35
    else if (SLIM.has(ch)) em += 0.47
    else if (MID.has(ch)) em += 0.54
    else if ('()-/'.includes(ch)) em += 0.45
    else if ('mw'.includes(ch)) em += 0.98
    else if (ch >= 'A' && ch <= 'Z') em += 0.78
    else em += 0.66
  }
  return em * font
}
function wrap(text, maxW, m) {
  const words = String(text || '').split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  for (const w of words) {
    const next = line ? `${line} ${w}` : w
    if (line && m(next) > maxW) { lines.push(line); line = w } else line = next
  }
  if (line) lines.push(line)
  return lines.length ? lines : ['']
}

function layout(activity, labels) {
  const font = activity.figure.font || 12
  const padX = font * 0.6, padY = font * 0.42, lineH = font * 1.22
  const m = (s) => approxWidth(s, font)
  const widest = Math.max(font * 4, ...labels.map(m))
  const inner = Math.min(widest, font * 12)
  const w = inner + 2 * padX
  const linesOf = (s) => wrap(s, inner, m)
  const rows = Math.max(1, ...labels.map((s) => linesOf(s).length))
  const h = rows * lineH + 2 * padY
  const boxes = activity.pins.map((p) => {
    const side = p.side || 'below'
    const x0 = side === 'left' ? p.x - w : side === 'right' ? p.x : p.x - w / 2
    const y0 = side === 'above' ? p.y - h : side === 'below' ? p.y : p.y - h / 2
    return { id: p.id, side, x: x0, y: y0, w, h, cx: x0 + w / 2, cy: y0 + h / 2, pin: p }
  })
  return { font, lineH, w, h, linesOf, boxes }
}

export default function LabelActivity({ activity, lesson, result, onResult }) {
  const { t, support } = useLang()
  const text = useText()
  const L = t.learn
  const labels = useMemo(() => Object.fromEntries(activity.bank.map((id) => [id, labelOf(lesson, id)])), [activity, lesson])
  const lay = useMemo(() => layout(activity, Object.values(labels)), [activity, labels])
  const [placements, setPlacements] = useState(() => result?.placements || {})
  const [picked, setPicked] = useState(null)
  const checked = !!result?.done

  const used = Object.values(placements)
  const bank = activity.bank.filter((id) => !used.includes(id))
  const allPlaced = activity.pins.every((p) => placements[p.id])

  const put = (pinId, id) => {
    setPlacements((p) => {
      const n = { ...p }
      for (const k of Object.keys(n)) if (n[k] === id) delete n[k]
      n[pinId] = id
      return n
    })
    setPicked(null)
  }
  const tapBox = (pinId) => {
    if (checked) { audio.play(pinId); return }
    if (picked) put(pinId, picked)
    else if (placements[pinId]) setPlacements((p) => { const n = { ...p }; delete n[pinId]; return n })
  }
  const check = () => {
    const perPin = {}
    for (const p of activity.pins) perPin[p.id] = placements[p.id] === p.id
    const right = Object.entries(perPin).filter(([, ok]) => ok).map(([id]) => id)
    onResult({ done: true, correct: right.length === activity.pins.length, perPin, placements, credits: { labelled: right } })
  }

  const { font, lineH, boxes } = lay
  const stroke = font * 0.1
  // The figure itself is always white, so the overlay keeps the light palette in both themes.
  const sage = '#4f6e5b', clay = '#b9704f', line = '#d9d2c6', muted = '#6f6a62'
  const paper = '#ffffff', sageSoft = '#e4ece6', claySoft = '#f3e3da', ink = '#2b2a27'

  return (
    <div>
      <Prompt>{text(activity.prompt)}</Prompt>
      <FigureCrop kind={activity.figure.kind} window={activity.figure.window} pad={activity.figure.pad} maxH="60dvh">
        {boxes.map((b) => {
          const ok = checked ? result.perPin[b.id] : null
          const colour = checked ? (ok ? sage : clay) : muted
          const [tx, ty] = b.pin.to
          const ax = b.pin.x, ay = b.pin.y
          return (
            <g key={`lead-${b.id}`} pointerEvents="none">
              <line x1={ax} y1={ay} x2={tx} y2={ty} stroke={colour} strokeWidth={stroke} strokeLinecap="round" />
              <circle cx={tx} cy={ty} r={font * 0.28} fill={colour} stroke={paper} strokeWidth={stroke * 0.8} />
            </g>
          )
        })}
        {boxes.map((b) => {
          const val = placements[b.id]
          const ok = checked ? result.perPin[b.id] : null
          const shown = checked && !ok ? b.id : val
          const lines = shown ? lay.linesOf(labels[shown] || labelOf(lesson, shown)) : []
          const filled = !!val
          const fill = checked ? (ok ? sageSoft : claySoft) : filled ? sageSoft : paper
          const edge = checked ? (ok ? sage : clay) : filled || picked ? sage : line
          const textFill = checked ? (ok ? sage : clay) : ink
          return (
            <g key={b.id} className="cursor-pointer" onClick={(e) => { e.stopPropagation(); tapBox(b.id) }}>
              <rect x={b.x - font * 0.5} y={b.y - font * 0.4} width={b.w + font} height={b.h + font * 0.8} fill="transparent" />
              <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={font * 0.4} fill={fill} stroke={edge} strokeWidth={filled || checked || picked ? stroke * 1.4 : stroke} strokeDasharray={filled || checked ? undefined : `${font * 0.4} ${font * 0.3}`} />
              {lines.length > 0 && (
                <text x={b.cx} y={b.cy - ((lines.length - 1) * lineH) / 2} textAnchor="middle" dominantBaseline="central" fontSize={font} fontWeight="600" fill={textFill} fontFamily="'Be Vietnam Pro', system-ui, sans-serif" pointerEvents="none">
                  {lines.map((ln, k) => <tspan key={k} x={b.cx} dy={k === 0 ? 0 : lineH}>{ln}</tspan>)}
                </text>
              )}
            </g>
          )
        })}
      </FigureCrop>

      {!checked && (
        <>
          <div className="mt-3 flex min-h-[48px] flex-wrap items-center gap-2 rounded-2xl border border-dashed border-line bg-sand/60 p-2">
            {bank.length === 0
              ? <span className="px-1 text-sm text-muted">{L.labelPlaced}</span>
              : bank.map((id) => {
                const term = getTerm(id)
                return (
                  <Piece key={id} look={picked === id ? 'picked' : 'idle'} onClick={() => setPicked(picked === id ? null : id)} sub={support === 'full' && term ? term.vi : null}>
                    {labels[id]}
                  </Piece>
                )
              })}
          </div>
          <p className="mt-2 px-1 text-xs text-muted">{picked ? L.labelNext : L.labelTap}</p>
          <CheckButton onClick={check} disabled={!allPlaced} />
        </>
      )}

      {checked && (
        <Verdict ok={result.correct}>
          {result.correct ? L.allRight : L.labelWrong}
          <ul className="mt-2 space-y-1">
            {activity.pins.map((p) => {
              const term = getTerm(p.id)
              return (
                <li key={p.id} className="flex items-baseline gap-2 text-[15px]">
                  <button onClick={() => audio.play(p.id)} className={`font-medium ${result.perPin[p.id] ? 'text-sage-deep' : 'text-clay'}`}>{labels[p.id] || labelOf(lesson, p.id)}</button>
                  <span className="text-sm text-muted">{term?.vi}</span>
                </li>
              )
            })}
          </ul>
        </Verdict>
      )}
    </div>
  )
}
