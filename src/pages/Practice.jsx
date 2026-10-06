import { Headphones, ListMusic, MessageCircle, Mic } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { Header, NavCard } from '../components/ui.jsx'

export default function Practice() {
  const { t } = useLang()
  return (
    <>
      <Header title={t.practice.title} />
      <div className="grid grid-cols-1 gap-2">
        <NavCard to="/practice/coach" title={t.practice.coach} sub={t.practice.coachSub} icon={<Mic size={22} />} />
        <NavCard title={t.practice.talk} sub={t.practice.talkSub} icon={<MessageCircle size={22} />} soon />
        <NavCard title={t.practice.flow} sub={t.practice.flowSub} icon={<Headphones size={22} />} soon />
        <NavCard title={t.practice.builder} sub={t.practice.builderSub} icon={<ListMusic size={22} />} soon />
      </div>
    </>
  )
}
