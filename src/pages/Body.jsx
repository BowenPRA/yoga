import { useMemo, useState } from 'react'
import { useLang } from '../lib/i18n.jsx'
import { TERMS } from '../lib/content.js'
import { Chip, Header, PlayButton } from '../components/ui.jsx'
import BodyFigure from '../components/BodyFigure.jsx'
import TermSheet from '../components/TermSheet.jsx'

export default function Body() {
  const { t } = useLang()
  const [view, setView] = useState('front')
  const [term, setTerm] = useState(null)
  const [group, setGroup] = useState('muscle')

  const bodyTerms = useMemo(() => TERMS.filter((x) => x.domain === 'body'), [])
  const byRegion = useMemo(() => {
    const m = new Map()
    bodyTerms.forEach((x) => x.bodyMap && m.set(`${x.bodyMap.figure}:${x.bodyMap.region}`, x))
    return m
  }, [bodyTerms])
  const available = useMemo(
    () => new Set(bodyTerms.filter((x) => x.bodyMap?.figure === view).map((x) => x.bodyMap.region)),
    [bodyTerms, view],
  )
  const list = bodyTerms.filter((x) => (group === 'muscle' ? x.group === 'muscle' : x.group !== 'muscle'))

  return (
    <>
      <Header title={t.body.title} subtitle={t.body.tapHint} back="/learn" />
      <div className="mb-3 flex gap-2">
        <Chip active={view === 'front'} onClick={() => setView('front')}>{t.body.front}</Chip>
        <Chip active={view === 'back'} onClick={() => setView('back')}>{t.body.back}</Chip>
      </div>
      <div className="rounded-2xl bg-paper border border-line shadow-card p-3">
        <BodyFigure
          view={view}
          available={available}
          selected={term?.bodyMap?.figure === view ? term.bodyMap.region : null}
          onSelect={(region) => setTerm(byRegion.get(`${view}:${region}`) || null)}
        />
      </div>

      <div className="mt-6 mb-2 flex gap-2">
        <Chip active={group === 'muscle'} onClick={() => setGroup('muscle')}>{t.body.musclesTab}</Chip>
        <Chip active={group === 'bone'} onClick={() => setGroup('bone')}>{t.body.bones}</Chip>
      </div>
      <div className="rounded-2xl bg-paper border border-line shadow-card divide-y divide-line">
        {list.map((x) => (
          <button key={x.id} onClick={() => { setView(x.bodyMap?.figure || view); setTerm(x) }} className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-sand">
            <PlayButton id={x.id} size={34} />
            <div className="flex-1 min-w-0">
              <div className="text-ink">{x.en} <span className="text-xs text-clay">{x.say}</span></div>
              <div className="text-sm text-muted truncate">{x.vi}{x.plain && x.plain !== x.en ? ` · ${x.plain}` : ''}</div>
            </div>
          </button>
        ))}
      </div>
      <TermSheet term={term} onClose={() => setTerm(null)} />
    </>
  )
}
