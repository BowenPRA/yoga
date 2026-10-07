import { useRef } from 'react'
import { FIGURE_SRC, shapesFor } from '../lib/figures.js'

const BASE = import.meta.env.BASE_URL

/**
 * A window onto one of the figures. The SVG's viewBox is the window, so
 * the full image is drawn once at its natural coordinates and the browser
 * shows only the crop; highlights and children are drawn in figure units.
 *
 *   kind       'front' | 'back' | 'skeleton'
 *   window     [x, y, w, h] in figure units
 *   pad        [top, bottom] extra space above and below the window, for labels
 *   highlight  term ids to tint
 *   tone       'sage' (default) | 'clay' for the highlight
 *   onTap      (point [x, y] in figure units) => void
 */
export default function FigureCrop({ kind, window: win, pad = [0, 0], highlight = [], tone = 'sage', dashed = false, onTap, children, className = '', maxH = '52dvh' }) {
  const fig = FIGURE_SRC[kind]
  const svgRef = useRef(null)
  const [x, y, w, h] = win
  const [top, bottom] = pad
  const vb = `${x} ${y - top} ${w} ${h + top + bottom}`
  const stroke = w / 140
  // The figures are always white, so the tint keeps the light palette in both themes.
  const fill = tone === 'clay' ? '#b9704f' : '#4f6e5b'

  const tap = (e) => {
    if (!onTap) return
    const svg = svgRef.current
    const ctm = svg?.getScreenCTM?.()
    if (!ctm) return
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse())
    onTap([p.x, p.y], e)
  }

  return (
    <div className={`overflow-hidden rounded-2xl bg-paper border border-line shadow-card ${className}`} style={{ maxHeight: maxH }}>
      <svg ref={svgRef} viewBox={vb} className={`block w-full h-auto select-none ${onTap ? 'cursor-pointer' : ''}`} style={{ maxHeight: maxH, touchAction: 'manipulation' }} onClick={tap}>
        <image href={`${BASE}${fig.src}`} x={0} y={0} width={fig.w} height={fig.h} preserveAspectRatio="none" />
        {highlight.map((id) => {
          const s = shapesFor(kind, id)
          const props = { fill, fillOpacity: 0.28, stroke: fill, strokeWidth: stroke, strokeOpacity: 0.9, strokeDasharray: dashed ? `${stroke * 3} ${stroke * 2}` : undefined, pointerEvents: 'none' }
          return (
            <g key={id}>
              {s.polys.map((poly, i) => <polygon key={`p${i}`} points={poly.map((p) => p.join(',')).join(' ')} {...props} />)}
              {s.boxes.map(([x0, y0, x1, y1], i) => <rect key={`b${i}`} x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={stroke * 2} {...props} />)}
              {s.circles.map(([cx, cy, r], i) => <circle key={`c${i}`} cx={cx} cy={cy} r={Math.max(r, 6)} {...props} />)}
            </g>
          )
        })}
        {children}
      </svg>
    </div>
  )
}
