import { useLang } from '../lib/i18n.jsx'
import { SayHint, Tag } from './ui.jsx'

const LOOK = { good: 'bg-sage-soft text-sage-deep', almost: 'bg-gold-soft text-gold-deep', again: 'bg-clay-soft text-clay-deep' }

/** Gemini's answer to a recording of her (/api/pronounce): verdict, what it heard, what to fix. */
export default function PronounceFeedback({ feedback }) {
  const { t } = useLang()
  const L = t.learn
  const label = { good: L.good, almost: L.almost, again: L.tryAgain }
  return (
    <>
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-[14px] font-medium ${LOOK[feedback.verdict] || LOOK.again}`}>{label[feedback.verdict] || feedback.verdict}</span>
        {feedback.heard && <span className="min-w-0 truncate text-[12px] text-muted">{L.heard}: “{feedback.heard}”</span>}
      </div>
      {feedback.praise_vi && <p className="mt-3 text-body text-ink">{feedback.praise_vi}</p>}
      {feedback.fixes?.length > 0 && (
        <ul className="mt-2 divide-y divide-line/70">
          {feedback.fixes.map((f, k) => (
            <li key={k} className="py-2.5">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-medium text-ink">{f.word}</span>
                {f.say && <SayHint say={f.say} />}
                <Tag className="uppercase tracking-wider">{L.issues[f.issue] || f.issue}</Tag>
              </div>
              <p className="mt-1 text-caption text-ink/80">{f.tip_vi}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
