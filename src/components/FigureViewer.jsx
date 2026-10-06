import { useRef, useState } from 'react'
import { Minus, Plus } from 'lucide-react'

/**
 * An anatomical figure with tappable regions. The image sets the coordinate
 * space; an SVG overlay with the same viewBox carries the regions, so they
 * stay aligned at any zoom. Regions are invisible until selected, or faintly
 * outlined when `showAll` is on.
 *
 *   src, w, h    the image and its pixel size
 *   regions      { id: [polygon[], ...] } polygons in image pixels
 *   circles      { id: [[cx, cy, r], ...] } optional
 *   boxes        { id: [[x0, y0, x1, y1], ...] } optional
 *   selected     id or null; onSelect(id)
 */
export default function FigureViewer({ src, w, h, regions = {}, circles = {}, boxes = {}, selected, onSelect, showAll = false, available }) {
  const [zoom, setZoom] = useState(1)
  const scroller = useRef(null)
  const ids = new Set([...Object.keys(regions), ...Object.keys(circles), ...Object.keys(boxes)])
  const can = (id) => !available || available.has(id)

  const shapeProps = (id) => {
    const on = selected === id
    return {
      fill: on ? 'rgb(var(--sage-deep))' : showAll ? 'rgb(var(--sage))' : 'rgb(var(--sage))',
      fillOpacity: on ? 0.5 : showAll ? 0.14 : 0,
      stroke: on ? 'rgb(var(--sage-deep))' : 'rgb(var(--sage-deep))',
      strokeOpacity: on ? 0.95 : showAll ? 0.45 : 0,
      strokeWidth: on ? 3 : 1.5,
      strokeDasharray: on ? 'none' : '4 4',
      className: can(id) ? 'cursor-pointer' : '',
      onClick: (e) => { e.stopPropagation(); if (can(id)) onSelect?.(id) },
    }
  }

  return (
    <div className="relative">
      <div ref={scroller} className="overflow-auto no-scrollbar rounded-2xl bg-paper border border-line shadow-card" style={{ maxHeight: '70dvh' }}>
        <div style={{ width: `${zoom * 100}%`, position: 'relative' }}>
          <img src={src} width={w} height={h} alt="" className="block w-full h-auto select-none" draggable={false} />
          <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 w-full h-full" onClick={() => onSelect?.(null)}>
            {[...ids].map((id) => (
              <g key={id}>
                {(regions[id] || []).map((poly, i) => (
                  <polygon key={`p${i}`} points={poly.map((p) => p.join(',')).join(' ')} {...shapeProps(id)} />
                ))}
                {(boxes[id] || []).map(([x0, y0, x1, y1], i) => (
                  <rect key={`b${i}`} x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={6} {...shapeProps(id)} />
                ))}
                {(circles[id] || []).map(([cx, cy, r], i) => (
                  <circle key={`c${i}`} cx={cx} cy={cy} r={r} {...shapeProps(id)} />
                ))}
              </g>
            ))}
          </svg>
        </div>
      </div>
      <div className="absolute right-2 top-2 flex flex-col gap-1">
        <button onClick={() => setZoom((z) => Math.min(3, z + 0.5))} className="grid h-9 w-9 place-items-center rounded-full bg-paper/90 border border-line text-ink shadow-card" aria-label="Zoom in"><Plus size={16} /></button>
        <button onClick={() => setZoom((z) => Math.max(1, z - 0.5))} className="grid h-9 w-9 place-items-center rounded-full bg-paper/90 border border-line text-ink shadow-card" aria-label="Zoom out"><Minus size={16} /></button>
      </div>
    </div>
  )
}
