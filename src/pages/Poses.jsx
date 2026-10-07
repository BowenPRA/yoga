import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { POSES } from '../lib/content.js'
import { figureOf, windowFor } from '../lib/figures.js'
import { Chip, Header, PlayButton, Porthole, Tag } from '../components/ui.jsx'
import { SettingsButton } from '../components/SettingsSheet.jsx'
import { poseTint, styleTint, tintClass } from '../lib/tints.js'

const STYLES = ['all', 'vinyasa', 'ashtanga', 'yin']

/** A pose's picture: the first muscle it works, on the figure, in the pose's tint. */
function PoseArt({ pose, size = 64 }) {
  const first = pose.muscles?.working?.[0] || pose.muscles?.lengthening?.[0]
  const kind = first ? figureOf(first) : null
  const win = kind ? windowFor(kind, first) : null
  if (!win) return null
  return <Porthole kind={kind} window={win} highlight={[first]} size={size} className="shadow-card" />
}

export default function Poses() {
  const { t } = useLang()
  const [style, setStyle] = useState('all')
  const list = POSES.filter((p) => style === 'all' || p.styles.includes(style))
  return (
    <div className="tint-sage">
      <Header title={t.poses.title} right={<SettingsButton />} />
      <div className="no-scrollbar -mx-5 mb-5 flex gap-2 overflow-x-auto px-5">
        {STYLES.map((s) => (
          <Chip key={s} active={style === s} onClick={() => setStyle(s)} tone={s === 'all' ? 'sage' : styleTint(s)}>{t.poses[s]}</Chip>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3">
        {list.map((p) => (
          <div key={p.id} className={`${tintClass(poseTint(p))} wash press relative rounded-3xl border border-line/70 p-4 shadow-card`}>
            <Link to={`/poses/${p.id}`} className="absolute inset-0 rounded-3xl" aria-label={p.en} />
            <div className="relative flex items-center gap-4">
              <PoseArt pose={p} />
              <div className="min-w-0 flex-1">
                <div className="font-serif text-heading text-ink">{p.en}</div>
                {p.sa && <div className="font-serif italic text-caption text-muted">{p.sa}</div>}
                <div className="text-caption text-muted">{p.vi}</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.styles.map((s) => <Tag key={s} tone="tint">{t.poses[s]}</Tag>)}
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-center gap-2">
                <div className="relative"><PlayButton id={`${p.id}__en`} size={42} /></div>
                <ChevronRight size={18} className="text-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
