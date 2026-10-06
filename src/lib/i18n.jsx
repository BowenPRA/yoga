import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { STRINGS } from './strings.js'

/**
 * Two independent settings:
 *   ui       'vi' | 'en'   the language of buttons and labels
 *   support  'full' | 'balanced' | 'light'
 *            how much Vietnamese sits next to the English content.
 *            full: Vietnamese first, English under it.
 *            balanced: English first, Vietnamese under it.
 *            light: English only; Vietnamese on tap.
 * Plus theme 'auto' | 'light' | 'dark'. All three persist in localStorage;
 * they are device preferences, not learning data.
 */
const LangContext = createContext(null)

const read = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}
const write = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* private mode: fine, the choice just won't stick */
  }
}

export function LangProvider({ children }) {
  const [ui, setUiState] = useState(() => read('ye.ui', 'vi'))
  const [support, setSupportState] = useState(() => read('ye.support', 'balanced'))
  const [theme, setThemeState] = useState(() => read('ye.theme', 'auto'))

  const setUi = (v) => { setUiState(v); write('ye.ui', v) }
  const setSupport = (v) => { setSupportState(v); write('ye.support', v) }
  const setTheme = (v) => { setThemeState(v); write('ye.theme', v) }

  useEffect(() => {
    document.documentElement.lang = ui
  }, [ui])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const dark = theme === 'dark' || (theme === 'auto' && mq.matches)
      document.documentElement.classList.toggle('dark', dark)
      const meta = document.querySelector('meta[name="theme-color"]')
      if (meta) meta.setAttribute('content', dark ? '#1e1d1b' : '#f6f3ee')
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])

  const value = useMemo(() => {
    const t = STRINGS[ui] || STRINGS.vi
    return { ui, setUi, support, setSupport, theme, setTheme, t }
  }, [ui, support, theme])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  return useContext(LangContext)
}
