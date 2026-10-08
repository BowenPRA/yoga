import { useEffect, useState } from 'react'
import Sheet from './Sheet.jsx'
import { Bi, Chip, Eyebrow, PlayButton, Say, SayHint, Section, Tag } from './ui.jsx'
import SuggestFix from './SuggestFix.jsx'
import { KnownMarks } from './lesson/slides.jsx'
import { useLang } from '../lib/i18n.jsx'
import { getTerm, getPose, poseName, posesUsing } from '../lib/content.js'
import { audio } from '../lib/audio.js'
import { progress } from '../lib/store.js'
import { termTint } from '../lib/tints.js'

/**
 * The full card for a muscle, bone, joint or movement, as a bottom sheet in
 * the colour of its region. `onOpen(id)` navigates to a neighbouring term.
 */
export default function AnatomyCard({ term, onClose, onOpen }) {
  const { t } = useLang()
  const a = t.anatomy
  // The progress row for the term on show, tagged with its id so a stale row
  // never shows under the next term.
  const [known, setKnown] = useState({ id: null, row: null })
  useEffect(() => { if (term) audio.play(term.id) }, [term])
  useEffect(() => {
    let live = true
    if (term) progress.term(term.id).then((r) => { if (live) setKnown({ id: term.id, row: r || null }) })
    return () => { live = false }
  }, [term])
  if (!term) return null
  const row = known.id === term.id ? known.row : null

  const plainDiffers = term.plain && term.plain.toLowerCase() !== term.en.toLowerCase()
  const related = [...new Set([...(term.works || []), ...(term.stretches || []), ...(term.poses || []), ...posesUsing(term.id).map((p) => p.id)])]
  const where = [a.regions[term.region], a.kinds?.[term.kind], term.kind === 'muscle' ? (term.deep ? a.deep : a.surface) : null].filter(Boolean).join(' · ')

  const poseChip = (id) => {
    const p = getPose(id)
    return p
      ? <Chip key={id} to={`/poses/${p.id}`}>{p.en}</Chip>
      : <span key={id} className="inline-flex items-center rounded-full bg-sand px-3.5 py-1.5 text-[14px] text-muted">{poseName(id)}</span>
  }
  const termChip = (id) => {
    const x = getTerm(id)
    return x ? <Chip key={id} onClick={() => onOpen?.(id)}>{x.en}</Chip> : null
  }

  return (
    <Sheet open onClose={onClose} tint={termTint(term)}>
      {where && <Eyebrow tone="tint" className="mb-2">{where}</Eyebrow>}
      <div className="flex items-start gap-4">
        <PlayButton id={term.id} size={56} />
        <div className="min-w-0 pt-0.5">
          <div className="font-serif text-[28px] leading-[1.1] text-ink">{term.en}</div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2"><SayHint say={term.say} /></div>
          {term.latin && term.latin !== term.en && <div className="text-[12px] text-muted">{a.latin}: {term.latin}</div>}
        </div>
      </div>
      <div className="mt-2 text-body-lg text-ink">{term.vi}</div>
      {term.viPlain && term.viPlain !== term.vi && <div className="text-caption text-muted">{term.viPlain}</div>}
      {term.shortEn && <div className="mt-1.5"><Tag tone="gold">“{term.shortEn}”</Tag></div>}
      {row && <div className="mt-3"><KnownMarks row={row} term={term} /></div>}

      {plainDiffers && (
        <Section title={a.plain}>
          <div className="rounded-3xl border border-line/70 bg-paper p-2 shadow-card">
            <Say id={`${term.id}__plain`} en={term.plain} vi={term.viPlain} size="lg" />
          </div>
        </Section>
      )}

      {term.does && (
        <Section title={a.does}><Bi en={term.does.en} vi={term.does.vi} /></Section>
      )}
      {term.feel && (
        <Section title={a.feel}><Bi en={term.feel.en} vi={term.feel.vi} /></Section>
      )}

      {term.cues?.length > 0 && (
        <Section title={a.inClass}>
          <div className="rounded-3xl border border-line/70 bg-paper p-2 shadow-card">
            {term.cues.map((c, i) => (
              <div key={i} className="flex items-start gap-1">
                <div className="min-w-0 flex-1"><Say id={`${term.id}__cue-${i + 1}`} en={c.en} vi={c.vi} /></div>
                <Tag className="mr-1 mt-3.5 uppercase tracking-wider">{a.styles[c.style] || c.style}</Tag>
              </div>
            ))}
          </div>
        </Section>
      )}

      {(term.works?.length > 0 || term.stretches?.length > 0) ? (
        <>
          {term.works?.length > 0 && (
            <Section title={a.works}><div className="flex flex-wrap gap-2">{term.works.map(poseChip)}</div></Section>
          )}
          {term.stretches?.length > 0 && (
            <Section title={a.stretches}><div className="flex flex-wrap gap-2">{term.stretches.map(poseChip)}</div></Section>
          )}
        </>
      ) : related.length > 0 && (
        <Section title={a.poses}><div className="flex flex-wrap gap-2">{related.map(poseChip)}</div></Section>
      )}

      {term.pair && getTerm(term.pair) && (
        <Section title={a.pair}><div className="flex flex-wrap gap-2">{termChip(term.pair)}</div></Section>
      )}

      {term.wordTrap && (
        <div className="tint-gold wash mt-7 rounded-3xl border border-line/60 px-4 py-3.5">
          <Eyebrow tone="tint" className="mb-1">{a.sayRight}</Eyebrow>
          <p className="text-body text-ink">{term.wordTrap}</p>
        </div>
      )}

      {term.under?.length > 0 && (
        <Section title={a.under}><div className="flex flex-wrap gap-2">{term.under.map(termChip)}</div></Section>
      )}
      {term.near?.length > 0 && (
        <Section title={a.near}><div className="flex flex-wrap gap-2">{term.near.map(termChip)}</div></Section>
      )}

      <div className="mt-7"><SuggestFix target={term.id} /></div>
    </Sheet>
  )
}
