/**
 * A schematic body, front and back, with tappable regions. Deliberately
 * simple: a quiet silhouette with soft regions, not an anatomy chart. Region
 * ids match `bodyMap.region` on the body terms.
 */
const FRONT = [
  { id: 'crown', shape: 'ellipse', cx: 100, cy: 16, rx: 14, ry: 7 },
  { id: 'deltoids', shape: 'ellipse', cx: 60, cy: 92, rx: 12, ry: 10 },
  { id: 'deltoids', shape: 'ellipse', cx: 140, cy: 92, rx: 12, ry: 10 },
  { id: 'wrists', shape: 'ellipse', cx: 36, cy: 232, rx: 8, ry: 7 },
  { id: 'wrists', shape: 'ellipse', cx: 164, cy: 232, rx: 8, ry: 7 },
  { id: 'abdominals', shape: 'ellipse', cx: 100, cy: 172, rx: 20, ry: 30 },
  { id: 'pelvis', shape: 'ellipse', cx: 100, cy: 226, rx: 32, ry: 14 },
  { id: 'hips', shape: 'ellipse', cx: 68, cy: 238, rx: 9, ry: 9 },
  { id: 'hips', shape: 'ellipse', cx: 132, cy: 238, rx: 9, ry: 9 },
  { id: 'hip-flexors', shape: 'ellipse', cx: 84, cy: 252, rx: 9, ry: 13 },
  { id: 'hip-flexors', shape: 'ellipse', cx: 116, cy: 252, rx: 9, ry: 13 },
  { id: 'quadriceps', shape: 'ellipse', cx: 80, cy: 310, rx: 13, ry: 40 },
  { id: 'quadriceps', shape: 'ellipse', cx: 120, cy: 310, rx: 13, ry: 40 },
  { id: 'hip-adductors', shape: 'ellipse', cx: 93, cy: 290, rx: 6, ry: 28 },
  { id: 'hip-adductors', shape: 'ellipse', cx: 107, cy: 290, rx: 6, ry: 28 },
  { id: 'knees', shape: 'ellipse', cx: 82, cy: 364, rx: 10, ry: 10 },
  { id: 'knees', shape: 'ellipse', cx: 118, cy: 364, rx: 10, ry: 10 },
  { id: 'ankles', shape: 'ellipse', cx: 83, cy: 440, rx: 8, ry: 7 },
  { id: 'ankles', shape: 'ellipse', cx: 117, cy: 440, rx: 8, ry: 7 },
]

const BACK = [
  { id: 'shoulders', shape: 'ellipse', cx: 68, cy: 90, rx: 16, ry: 10 },
  { id: 'shoulders', shape: 'ellipse', cx: 132, cy: 90, rx: 16, ry: 10 },
  { id: 'triceps', shape: 'ellipse', cx: 47, cy: 150, rx: 8, ry: 26 },
  { id: 'triceps', shape: 'ellipse', cx: 153, cy: 150, rx: 8, ry: 26 },
  { id: 'spine', shape: 'ellipse', cx: 100, cy: 150, rx: 6, ry: 70 },
  { id: 'sacrum', shape: 'ellipse', cx: 100, cy: 228, rx: 11, ry: 10 },
  { id: 'tailbone', shape: 'ellipse', cx: 100, cy: 246, rx: 4, ry: 7 },
  { id: 'gluteus-medius', shape: 'ellipse', cx: 68, cy: 236, rx: 9, ry: 11 },
  { id: 'gluteus-medius', shape: 'ellipse', cx: 132, cy: 236, rx: 9, ry: 11 },
  { id: 'glutes', shape: 'ellipse', cx: 82, cy: 258, rx: 15, ry: 17 },
  { id: 'glutes', shape: 'ellipse', cx: 118, cy: 258, rx: 15, ry: 17 },
  { id: 'piriformis', shape: 'ellipse', cx: 76, cy: 248, rx: 6, ry: 5 },
  { id: 'piriformis', shape: 'ellipse', cx: 124, cy: 248, rx: 6, ry: 5 },
  { id: 'sit-bones', shape: 'ellipse', cx: 88, cy: 278, rx: 5, ry: 5 },
  { id: 'sit-bones', shape: 'ellipse', cx: 112, cy: 278, rx: 5, ry: 5 },
  { id: 'hamstrings', shape: 'ellipse', cx: 82, cy: 322, rx: 13, ry: 38 },
  { id: 'hamstrings', shape: 'ellipse', cx: 118, cy: 322, rx: 13, ry: 38 },
  { id: 'calves', shape: 'ellipse', cx: 83, cy: 400, rx: 11, ry: 28 },
  { id: 'calves', shape: 'ellipse', cx: 117, cy: 400, rx: 11, ry: 28 },
  { id: 'heels', shape: 'ellipse', cx: 83, cy: 452, rx: 9, ry: 6 },
  { id: 'heels', shape: 'ellipse', cx: 117, cy: 452, rx: 9, ry: 6 },
]

function Silhouette() {
  // One body outline, shared by both views. Drawn once, kept soft.
  return (
    <g fill="rgb(var(--line))" stroke="none">
      <circle cx="100" cy="40" r="26" />
      <rect x="92" y="62" width="16" height="14" rx="6" />
      <path d="M62 76 Q100 66 138 76 L146 130 Q148 190 140 236 L138 250 L62 250 L60 236 Q52 190 54 130 Z" />
      <path d="M62 78 Q44 90 40 130 L32 226 Q31 240 40 240 Q48 240 48 228 L58 150 Z" />
      <path d="M138 78 Q156 90 160 130 L168 226 Q169 240 160 240 Q152 240 152 228 L142 150 Z" />
      <path d="M64 250 L98 250 L96 350 L94 446 Q94 456 84 456 L76 456 Q68 456 70 446 L72 350 Z" />
      <path d="M102 250 L136 250 L128 350 L130 446 Q132 456 124 456 L116 456 Q106 456 106 446 L104 350 Z" />
      <path d="M68 450 L96 450 L96 462 L60 462 Z" />
      <path d="M104 450 L132 450 L140 462 L104 462 Z" />
    </g>
  )
}

export default function BodyFigure({ view = 'front', selected, available, onSelect }) {
  const regions = view === 'front' ? FRONT : BACK
  return (
    <svg viewBox="0 0 200 470" className="w-full max-w-[240px] mx-auto select-none" role="img">
      <Silhouette />
      {regions.map((r, i) => {
        const has = !available || available.has(r.id)
        const on = selected === r.id
        return (
          <ellipse
            key={`${r.id}-${i}`}
            cx={r.cx}
            cy={r.cy}
            rx={r.rx}
            ry={r.ry}
            onClick={() => has && onSelect?.(r.id)}
            className={has ? 'cursor-pointer' : ''}
            fill={on ? 'rgb(var(--sage-deep))' : has ? 'rgb(var(--sage))' : 'transparent'}
            fillOpacity={on ? 0.95 : has ? 0.45 : 0}
            stroke={on ? 'rgb(var(--paper))' : 'rgb(var(--sage-deep))'}
            strokeOpacity={has ? 0.6 : 0}
            strokeWidth={on ? 2 : 1}
          />
        )
      })}
    </svg>
  )
}
