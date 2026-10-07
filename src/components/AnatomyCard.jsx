import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sheet from './Sheet.jsx'
import { Bi, Chip, PlayButton, Say, SayHint, Section } from './ui.jsx'
import SuggestFix from './SuggestFix.jsx'
import { KnownMarks } from './lesson/slides.jsx'
import { useLang } from '../lib/i18n.jsx'
import { getTerm, getPose, poseName, posesUsing } from '../lib/content.js'
import { audio } from '../lib/audio.js'
import { progress } from '../lib/store.js'

/**
 * The full card for a muscle, bone, joint or movement, as a bottom sheet.
 * `onOpen(id)` navigates to a neighbouring term.
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

  const poseChip = (id) => {
    const p = getPose(id)
    return p
      ? <Chip key={id} to={`/poses/${p.id}`}>{p.en}</Chip>
      : <span key={id} className="inline-flex rounded-full bg-sand px-3 py-1 text-sm text-muted">{poseName(id)}</span>
  }
  const termChip = (id) => {
    const x = getTerm(id)
    return x ? <Chip key={id} onClick={() => onOpen?.(id)}>{x.en}</Chip> : null
  }

  return (
    <Sheet open onClose={onClose}>
      <div className="flex items-start gap-3">
        <PlayButton id={term.id} size={46} />
        <div className="min-w-0">
          <div className="font-serif text-[24px] leading-tight text-ink">{term.en}</div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2"><SayHint say={term.say} /></div>
          {term.latin && term.latin !== term.en && <div className="text-xs text-muted">{a.latin}: {term.latin}</div>}
        </div>
      </div>
      <div className="mt-2 text-[17px] text-ink">{term.vi}</div>
      {term.viPlain && term.viPlain !== term.vi && <div className="text-sm text-muted">{term.viPlain}</div>}
      <div className="mt-2 flex flex-wrap gap-1">
        {term.region && <span className="rounded-full bg-sand px-2 py-0.5 text-[11px] text-muted">{a.regions[term.region] || term.region}</span>}
        {term.kind === 'muscle' && <span className="rounded-full bg-sand px-2 py-0.5 text-[11px] text-muted">{term.deep ? a.deep : a.surface}</span>}
        {term.shortEn && <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[11px] text-muted">“{term.shortEn}”</span>}
      </div>
      {row && <div className="mt-2"><KnownMarks row={row} /></div>}

      {plainDiffers && (
        <Section title={a.plain}>
          <Say id={`${term.id}__plain`} en={term.plain} vi={term.viPlain} />
        </Section>
      )}

      {term.does && (
        <Section title={a.does}>
          <p className="text-[15px]"><Bi en={term.does.en} vi={term.does.vi} /></p>
        </Section>
      )}
      {term.feel && (
        <Section title={a.feel}>
          <p className="text-[15px]"><Bi en={term.feel.en} vi={term.feel.vi} /></p>
        </Section>
      )}

      {term.cues?.length > 0 && (
        <Section title={a.inClass}>
          <div className="rounded-2xl bg-sand/70 p-2">
            {term.cues.map((c, i) => (
              <div key={i} className="flex items-start gap-1">
                <div className="flex-1 min-w-0"><Say id={`${term.id}__cue-${i + 1}`} en={c.en} vi={c.vi} /></div>
                <span className="mt-3 shrink-0 rounded-full bg-paper px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">{a.styles[c.style] || c.style}</span>
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
        <Section title={a.sayRight}>
          <p className="rounded-xl bg-clay-soft/60 px-3 py-2 text-sm text-ink">{term.wordTrap}</p>
        </Section>
      )}

      {term.under?.length > 0 && (
        <Section title={a.under}><div className="flex flex-wrap gap-2">{term.under.map(termChip)}</div></Section>
      )}
      {term.near?.length > 0 && (
        <Section title={a.near}><div className="flex flex-wrap gap-2">{term.near.map(termChip)}</div></Section>
      )}

      <div className="mt-6"><SuggestFix target={term.id} /></div>
      <Link to="/anatomy" className="hidden" />
    </Sheet>
  )
}
