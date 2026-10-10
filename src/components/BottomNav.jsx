import { NavLink, useLocation } from 'react-router-dom'
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

/** The four tabs: a soft bar that floats over the page, no hard edge. */
export default function BottomNav() {
  const { t } = useLang()
  const { pathname } = useLocation()
  // The Class Builder lives under the Poses tab.
  const lit = (key, isActive) => isActive || (key === 'poses' && pathname.startsWith('/classes'))
  return (
    <nav className="tint-sage fixed inset-x-0 bottom-0 z-20 bg-paper/90 shadow-up backdrop-blur-md pb-safe">
      <div className="mx-auto grid max-w-xl grid-cols-4 pt-1.5">
        {TABS.map(({ to, key, Icon }) => (
          <NavLink
            key={key}
            to={to}
            className={({ isActive }) =>
              `press flex flex-col items-center gap-1 py-1.5 text-[11px] font-medium transition-colors ${lit(key, isActive) ? 'text-tint-deep' : 'text-muted'}`
            }
          >
            {({ isActive }) => {
              const on = lit(key, isActive)
              return (
                <>
                  <span className={`rounded-full px-4 py-1 transition-colors duration-200 ${on ? 'bg-tint-soft' : ''}`}>
                    <Icon size={20} strokeWidth={on ? 2.2 : 1.8} />
                  </span>
                  {t.nav[key]}
                </>
              )
            }}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
