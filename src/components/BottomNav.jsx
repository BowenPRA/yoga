import { NavLink } from 'react-router-dom'
import { Sun, BookOpen, Mic, Layers, User } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'

const TABS = [
  { to: '/', key: 'home', Icon: Sun, end: true },
  { to: '/learn', key: 'learn', Icon: BookOpen },
  { to: '/practice', key: 'practice', Icon: Mic },
  { to: '/review', key: 'review', Icon: Layers },
  { to: '/mine', key: 'mine', Icon: User },
]

export default function BottomNav() {
  const { t } = useLang()
  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 bg-paper/95 backdrop-blur border-t border-line pb-safe">
      <div className="mx-auto max-w-xl grid grid-cols-5">
        {TABS.map(({ to, key, Icon, end }) => (
          <NavLink
            key={key}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${
                isActive ? 'text-sage-deep' : 'text-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`rounded-full px-4 py-1 transition-colors ${isActive ? 'bg-sage-soft' : ''}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                </span>
                {t.nav[key]}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
