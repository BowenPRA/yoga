import { ExternalLink } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { AREAS, SOURCES } from '../../content/sources.js'
import { Bi, Eyebrow, Header, Section, Tag } from '../components/ui.jsx'
import { SettingsButton } from '../components/SettingsSheet.jsx'

const AREA_TINT = { poses: 'sage', ashtanga: 'gold', yin: 'dusk', sequencing: 'clay', safety: 'clay', philosophy: 'gold', meditation: 'dusk', vietnamese: 'mist', anatomy: 'mist', own: 'sage' }

/** One source: what it is, who made it, on what terms, and what we took from it. */
function SourceCard({ s }) {
  const { t } = useLang()
  const S = t.sources
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="font-serif text-[18px] leading-snug text-ink">{s.title}</div>
          <div className="mt-0.5 text-caption text-muted">{s.by}{s.year ? `, ${s.year}` : ''}</div>
        </div>
        {s.url && <ExternalLink size={16} className="mt-1 shrink-0 text-muted" />}
      </div>
      {s.licence && <Tag tone={s.licence === 'Free to read' ? 'sand' : 'tint'} className="mt-2">{S.licence[s.licence] || s.licence}</Tag>}
      <div className="mt-2.5"><Bi en={s.note.en} vi={s.note.vi} size="sm" /></div>
    </>
  )
  const cls = 'block rounded-3xl border border-line/70 bg-paper p-4 shadow-card'
  if (s.url) return <a href={s.url} target="_blank" rel="noreferrer" className={`${cls} press`}>{inner}</a>
  return <div className={`${cls} wash`}>{inner}</div>
}

/**
 * Where the content comes from, by area. What was written for the app
 * comes first, so the honest line is read before the references.
 */
export default function Sources() {
  const { t } = useLang()
  const S = t.sources
  const own = SOURCES.filter((s) => s.covers.includes('own'))
  return (
    <div className="tint-sage">
      <Header title={S.title} subtitle={S.lead} back={-1} right={<SettingsButton />} />
      <div className="space-y-2.5">{own.map((s) => <SourceCard key={s.id} s={s} />)}</div>
      {AREAS.filter((a) => a !== 'own').map((area) => {
        const list = SOURCES.filter((s) => s.covers.includes(area))
        if (!list.length) return null
        return (
          <Section key={area} title={S.areas[area] || area} className={`tint-${AREA_TINT[area] || 'sage'}`}>
            <div className="space-y-2.5">{list.map((s) => <SourceCard key={`${area}-${s.id}`} s={s} />)}</div>
          </Section>
        )
      })}
      <Eyebrow className="sr-only">{S.all}</Eyebrow>
    </div>
  )
}
