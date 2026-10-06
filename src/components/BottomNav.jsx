import { NavLink } from 'react-router-dom'
import { PersonStanding, Mic, MessageSquareText } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'

function BodyIcon({ size = 20, strokeWidth = 1.8 }) {
  // A small anatomical mark: a torso outline with a heart-side accent.
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M7 9h10l-1 7h-8z" />
      <path d="M8 16v5M16 16v5M7 9l-3 4M17 9l3 4" />
    </svg>
  )
}

const TABS = [
  { to: '/poses', key: 'poses', Icon: PersonStanding },
  { to: '/anatomy', key: 'anatomy', Icon: BodyIcon },
  { to: '/speech', key: 'speech', Icon: Mic },
  { to: '/phrases', key: 'phrases', Icon: MessageSquareText },
]

export default function BottomNav() {
  const { t } = useLang()
  return (
    <nav className="fixed bottom-0 inset-x-0 z-20 bg-paper/95 backdrop-blur border-t border-line pb-safe">
      <div className="mx-auto max-w-xl grid grid-cols-4">
        {TABS.map(({ to, key, Icon }) => (
          <NavLink
            key={key}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${isActive ? 'text-sage-deep' : 'text-muted'}`
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
