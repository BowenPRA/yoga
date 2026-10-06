import { useEffect } from 'react'
import Sheet from './Sheet.jsx'
import { Bi, Chip, PlayButton, Say, SayHint, Section } from './ui.jsx'
import SuggestFix from './SuggestFix.jsx'
import { useLang } from '../lib/i18n.jsx'
import { posesUsing } from '../lib/content.js'
import { audio } from '../lib/audio.js'
import { learn } from '../lib/learning.js'

/** The detail view for one term, opened from the Body Map or a pose's muscle list. */
export default function TermSheet({ term, onClose }) {
  const { t } = useLang()
  useEffect(() => {
    if (term) {
      learn.meetTerm(term)
      audio.play(term.id)
    }
  }, [term])
  if (!term) return null
  const poses = posesUsing(term.id)
  return (
    <Sheet open={!!term} onClose={onClose}>
      <div className="flex items-center gap-3">
        <PlayButton id={term.id} size={44} />
        <div>
          <div className="font-serif text-2xl text-ink">{term.en}</div>
          <SayHint say={term.say} />
        </div>
      </div>
      <div className="mt-2 text-base text-ink">{term.vi}</div>

      {term.plain && term.plain !== term.en && (
        <Section title={t.body.plain}>
          <Say id={`${term.id}__plain`} en={term.plain} vi={term.viPlain} />
        </Section>
      )}
      {term.example?.en && (
        <Section title={t.body.example}>
          <Say id={`${term.id}__example`} en={term.example.en} vi={term.example.vi} />
        </Section>
      )}
      {poses.length > 0 && (
        <Section title={t.body.usedIn}>
          <div className="flex flex-wrap gap-2">
            {poses.map((p) => (
              <Chip key={p.id} to={`/learn/poses/${p.id}`}>{p.en}</Chip>
            ))}
          </div>
        </Section>
      )}
      <div className="mt-6">
        <SuggestFix target={term.id} />
      </div>
      <Bi en="" vi="" />
    </Sheet>
  )
}
