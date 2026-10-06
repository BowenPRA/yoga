import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Layers, Leaf, Mic, PersonStanding } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { store } from '../lib/store.js'
import { isKnown } from '../lib/srs.js'
import { Card, NavCard, Section } from '../components/ui.jsx'

export default function Home() {
  const { t, ui } = useLang()
  const [due, setDue] = useState(null)
  const [known, setKnown] = useState(0)

  useEffect(() => {
    let alive = true
    ;(async () => {
      const d = await store.dueCards()
      const all = await store.all('cards')
      if (!alive) return
      setDue(d.length)
      setKnown(all.filter(isKnown).length)
    })()
    return () => { alive = false }
  }, [])

  const hour = new Date().getHours()
  const soft = hour < 11 ? '🌤' : hour < 17 ? '☀️' : '🌙'

  return (
    <>
      <header className="mb-5 mt-2">
        <p className="text-sm text-muted">{soft} {new Date().toLocaleDateString(ui === 'vi' ? 'vi-VN' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        <h1 className="font-serif text-[30px] leading-tight text-ink">{t.home.greeting}</h1>
      </header>

      <Card className="bg-sage-soft border-sage-soft">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-wider text-sage-deep">{t.home.dueToday}</div>
            <div className="mt-1 font-serif text-3xl text-ink">{due ?? '…'}</div>
            {due === 0 && <div className="text-sm text-muted">{t.home.noDue}</div>}
          </div>
          <Link to="/review" className="rounded-xl bg-sage-deep px-4 py-2.5 text-paper font-medium">
            {t.home.review}
          </Link>
        </div>
        {known > 0 && <div className="mt-3 text-sm text-sage-deep">{known} {t.home.known}</div>}
      </Card>

      <Section title={t.home.startHere}>
        <div className="grid gap-2">
          <NavCard to="/learn/poses" title={t.home.poses} sub={t.learn.posesSub} icon={<PersonStanding size={22} />} />
          <NavCard to="/learn/body" title={t.home.body} sub={t.learn.bodySub} icon={<Leaf size={22} />} />
          <NavCard to="/practice/coach" title={t.home.coach} sub={t.practice.coachSub} icon={<Mic size={22} />} />
          <NavCard to="/review" title={t.home.review} sub={t.review.startEmpty} icon={<Layers size={22} />} />
        </div>
      </Section>
    </>
  )
}
