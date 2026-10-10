import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import Sheet from './Sheet.jsx'
import { Eyebrow, PoseArt, Tag } from './ui.jsx'
import { useLang } from '../lib/i18n.jsx'
import { POSES, searchPoses } from '../lib/content.js'
import { poseTint, styleTint, tintClass } from '../lib/tints.js'

/**
 * Pick a pose for a class: the ones that fit the plan first (its style,
 * screened for its cautions, best for its theme), then everything else,
 * with the same search as the Poses tab.
 */
export default function PoseSheet({ open, onClose, onPick, suggested = [], tint = 'sage' }) {
  const { t } = useLang()
  const C = t.classes
  const [q, setQ] = useState('')
  const ids = useMemo(() => new Set(suggested.map((p) => p.id)), [suggested])
  const top = useMemo(() => searchPoses(q, suggested).slice(0, q ? 40 : 12), [q, suggested])
  const rest = useMemo(() => searchPoses(q, POSES.filter((p) => !ids.has(p.id))).slice(0, q ? 40 : 30), [q, ids])
  const row = (p) => (
    <button key={p.id} onClick={() => { onPick(p.id); setQ('') }} className={`${tintClass(poseTint(p))} press flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left hover:bg-paper/70`}>
      <PoseArt pose={p} size={44} className="" />
      <div className="min-w-0 flex-1">
        <div className="truncate font-serif text-[17px] text-ink">{p.en}</div>
        <div className="truncate text-caption text-muted">{p.vi}{p.sa ? ` · ${p.sa}` : ''}</div>
      </div>
      <div className="flex shrink-0 gap-1">
        {p.styles.map((s) => <Tag key={s} tone="tint" className={tintClass(styleTint(s))}>{t.poses[s]}</Tag>)}
      </div>
    </button>
  )
  return (
    <Sheet open={open} onClose={() => { setQ(''); onClose() }} title={C.pickPose} tint={tint}>
      <div className="mb-3 mt-2 flex items-center gap-2.5 rounded-full border border-line/70 bg-paper px-4 py-2.5 focus-within:border-tint">
        <Search size={17} className="shrink-0 text-muted" />
        <input
          value={q} onChange={(e) => setQ(e.target.value)} placeholder={C.searchPose} type="search" autoCorrect="off" autoCapitalize="off" spellCheck={false}
          className="w-full min-w-0 bg-transparent text-body text-ink outline-none placeholder:text-muted/60 [&::-webkit-search-cancel-button]:hidden"
        />
      </div>
      {top.length > 0 && (
        <>
          <Eyebrow tone="tint" className="mb-1 px-2">{C.suggested}</Eyebrow>
          <div className="mb-3 space-y-0.5">{top.map(row)}</div>
        </>
      )}
      {rest.length > 0 && (
        <>
          <Eyebrow className="mb-1 px-2">{C.others}</Eyebrow>
          <div className="space-y-0.5">{rest.map(row)}</div>
        </>
      )}
      {top.length + rest.length === 0 && <p className="px-2 py-6 text-center text-caption text-muted">{t.poses.noResults}</p>}
    </Sheet>
  )
}
