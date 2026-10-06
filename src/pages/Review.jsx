import { useEffect, useState } from 'react'
import { useLang } from '../lib/i18n.jsx'
import { store } from '../lib/store.js'
import { grade, isKnown } from '../lib/srs.js'
import { getPose, getTerm, POSES } from '../lib/content.js'
import { audio } from '../lib/audio.js'
import { Button, Header, PlayButton } from '../components/ui.jsx'

/**
 * Today's cards, one at a time. Three card kinds, all built from content:
 *   term    Vietnamese shown, she says the English, reveal shows word + plain
 *   cue     Vietnamese shown, she says the cue, reveal shows English + audio
 *   pose    Sanskrit + Vietnamese shown, she names it in English
 *   phrase  her own saved cue; Vietnamese or the original shown
 */
function resolve(card) {
  if (card.kind === 'term') {
    const x = getTerm(card.ref)
    return x && { prompt: x.vi, hint: x.viPlain && x.viPlain !== x.vi ? x.viPlain : null, answer: x.en, sub: x.plain !== x.en ? x.plain : null, say: x.say, audioId: x.id }
  }
  if (card.kind === 'cue') {
    for (const p of POSES) {
      const c = p.cues.find((c) => c.id === card.ref)
      if (c) return { prompt: c.vi, hint: p.en, answer: c.en, audioId: c.id }
    }
  }
  if (card.kind === 'pose') {
    const p = getPose(card.ref)
    return p && { prompt: p.vi, hint: p.sa, answer: p.en, say: p.say, audioId: `${p.id}__en`, audioId2: p.sa ? `${p.id}__sa` : null }
  }
  return null
}

export default function Review() {
  const { t } = useLang()
  const [queue, setQueue] = useState(null)
  const [i, setI] = useState(0)
  const [shown, setShown] = useState(false)
  const [known, setKnown] = useState(0)
  const [phrases, setPhrases] = useState({})

  useEffect(() => {
    ;(async () => {
      const due = await store.dueCards()
      const all = await store.all('cards')
      const pb = await store.all('phrasebook')
      const m = {}
      pb.forEach((p) => { m[p.id] = p })
      setPhrases(m)
      setKnown(all.filter(isKnown).length)
      // Shuffle lightly so the same pose's cues don't all come in a row.
      setQueue(due.sort(() => Math.random() - 0.5))
    })()
  }, [])

  if (!queue) return <Header title={t.review.title} />

  const card = queue[i]
  const view = card
    ? card.kind === 'phrase'
      ? (phrases[card.ref] && { prompt: phrases[card.ref].vi || phrases[card.ref].original, hint: null, answer: phrases[card.ref].en, audioId: null })
      : resolve(card)
    : null

  const answer = async (g) => {
    const next = grade(card, g)
    await store.put('cards', next)
    setShown(false)
    if (g === 0) setQueue((q) => [...q, next]) // comes back at the end of today's queue
    setI((n) => n + 1)
  }

  if (!card || !view) {
    return (
      <>
        <Header title={t.review.title} />
        <div className="rounded-2xl bg-sage-soft p-6 text-center">
          <div className="font-serif text-2xl text-ink">{queue.length ? t.review.done : t.review.none}</div>
          {known > 0 && <div className="mt-2 text-sm text-sage-deep">{known} {t.review.known}</div>}
          {!queue.length && <p className="mt-3 text-sm text-muted">{t.review.startEmpty}</p>}
        </div>
      </>
    )
  }

  const label = card.kind === 'pose' ? t.review.namePose : t.review.sayIt
  const remaining = queue.length - i

  return (
    <>
      <Header title={t.review.title} subtitle={`${remaining} ${t.review.due}`} />
      <div className="rounded-3xl bg-paper border border-line shadow-card p-6 min-h-[320px] flex flex-col">
        <div className="text-[13px] font-semibold uppercase tracking-wider text-muted">{label}</div>
        <div className="mt-4 font-serif text-2xl leading-snug text-ink">{view.prompt}</div>
        {view.hint && <div className="mt-2 text-sm text-muted">{view.hint}</div>}

        <div className="flex-1" />

        {shown ? (
          <div className="mt-6 border-t border-line pt-4">
            <div className="flex items-center gap-3">
              {view.audioId && <PlayButton id={view.audioId} size={44} />}
              <div>
                <div className="text-xl text-ink">{view.answer}</div>
                {view.sub && <div className="text-sm text-muted">{view.sub}</div>}
                {view.say && <div className="text-xs text-clay">{view.say}</div>}
              </div>
            </div>
            {view.audioId2 && (
              <button onClick={() => audio.play(view.audioId2)} className="mt-2 text-sm text-sage-deep">{t.common.sanskrit} ▸</button>
            )}
          </div>
        ) : (
          <Button onClick={() => { setShown(true); if (view.audioId) audio.play(view.audioId) }} className="mt-6 w-full">
            {t.review.reveal}
          </Button>
        )}
      </div>

      {shown && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          <Button kind="secondary" onClick={() => answer(0)} className="!px-2 text-clay">{t.review.again}</Button>
          <Button kind="secondary" onClick={() => answer(1)} className="!px-2">{t.review.hard}</Button>
          <Button onClick={() => answer(2)} className="!px-2">{t.review.good}</Button>
          <Button kind="secondary" onClick={() => answer(3)} className="!px-2">{t.review.easy}</Button>
        </div>
      )}
    </>
  )
}
