import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { POSES } from '../lib/content.js'
import { Card, Chip, Header, PlayButton } from '../components/ui.jsx'

const STYLES = ['all', 'vinyasa', 'ashtanga', 'yin']

export default function Poses() {
  const { t } = useLang()
  const [style, setStyle] = useState('all')
  const list = POSES.filter((p) => style === 'all' || p.styles.includes(style))
  return (
    <>
      <Header title={t.poses.title} back="/learn" />
      <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar">
        {STYLES.map((s) => (
          <Chip key={s} active={style === s} onClick={() => setStyle(s)}>{t.poses[s]}</Chip>
        ))}
      </div>
      <div className="grid gap-2">
        {list.map((p) => (
          <Card key={p.id} to={`/learn/poses/${p.id}`}>
            <div className="flex items-center gap-3">
              <PlayButton id={`${p.id}__en`} size={40} />
              <div className="flex-1 min-w-0">
                <div className="font-serif text-lg text-ink">{p.en}</div>
                <div className="text-sm text-muted truncate">{p.sa} · {p.vi}</div>
                <div className="mt-1 flex gap-1">
                  {p.styles.map((s) => (
                    <span key={s} className="rounded-full bg-sand px-2 py-0.5 text-[11px] text-muted">{t.poses[s]}</span>
                  ))}
                </div>
              </div>
              <ChevronRight size={18} className="text-muted" />
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
