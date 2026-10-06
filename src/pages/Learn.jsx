import { Flower2, Leaf, PersonStanding } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { Header, NavCard } from '../components/ui.jsx'

export default function Learn() {
  const { t } = useLang()
  return (
    <>
      <Header title={t.learn.title} />
      <div className="grid gap-2">
        <NavCard to="/learn/poses" title={t.learn.poses} sub={t.learn.posesSub} icon={<PersonStanding size={22} />} />
        <NavCard to="/learn/body" title={t.learn.body} sub={t.learn.bodySub} icon={<Leaf size={22} />} />
        <NavCard title={t.learn.philosophy} sub={t.learn.philosophySub} icon={<Flower2 size={22} />} soon />
      </div>
    </>
  )
}
