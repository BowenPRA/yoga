import { useRef, useState } from 'react'
import { Download, Settings, Upload } from 'lucide-react'
import Sheet from './Sheet.jsx'
import { Button, Chip, Eyebrow } from './ui.jsx'
import { useLang } from '../lib/i18n.jsx'
import { store } from '../lib/store.js'

/** The gear in a page header: language, support level, theme, backup. */
export function SettingsButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} className="press grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper/80 text-muted shadow-sm" aria-label="Settings">
        <Settings size={19} />
      </button>
      <SettingsSheet open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default function SettingsSheet({ open, onClose }) {
  const { t, ui, setUi, support, setSupport, theme, setTheme } = useLang()
  const fileRef = useRef(null)

  const backup = async () => {
    const data = await store.exportAll()
    const blob = new Blob([JSON.stringify(data, null, 1)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `yoga-english-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }
  const restore = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    try { await store.importAll(JSON.parse(await f.text())) } catch { /* ignore a bad file */ }
    e.target.value = ''
  }

  return (
    <Sheet open={open} onClose={onClose} title={t.settings.title} tint="sage">
      <div className="divide-y divide-line/70">
        <div className="py-5">
          <Eyebrow className="mb-2.5">{t.settings.language}</Eyebrow>
          <div className="flex gap-2">
            <Chip active={ui === 'vi'} onClick={() => setUi('vi')}>Tiếng Việt</Chip>
            <Chip active={ui === 'en'} onClick={() => setUi('en')}>English</Chip>
          </div>
        </div>
        <div className="py-5">
          <Eyebrow className="mb-2.5">{t.settings.support}</Eyebrow>
          <div className="flex gap-2">
            <Chip active={support === 'full'} onClick={() => setSupport('full')}>{t.settings.supportFull}</Chip>
            <Chip active={support === 'balanced'} onClick={() => setSupport('balanced')}>{t.settings.supportBalanced}</Chip>
            <Chip active={support === 'light'} onClick={() => setSupport('light')}>{t.settings.supportLight}</Chip>
          </div>
          <p className="mt-2.5 text-caption text-muted">{t.settings.supportHelp}</p>
        </div>
        <div className="py-5">
          <Eyebrow className="mb-2.5">{t.settings.theme}</Eyebrow>
          <div className="flex gap-2">
            <Chip active={theme === 'auto'} onClick={() => setTheme('auto')}>{t.settings.auto}</Chip>
            <Chip active={theme === 'light'} onClick={() => setTheme('light')}>{t.settings.light}</Chip>
            <Chip active={theme === 'dark'} onClick={() => setTheme('dark')}>{t.settings.dark}</Chip>
          </div>
        </div>
        <div className="flex gap-2.5 py-5">
          <Button kind="secondary" onClick={backup}><Download size={16} /> {t.settings.backup}</Button>
          <Button kind="secondary" onClick={() => fileRef.current?.click()}><Upload size={16} /> {t.settings.restore}</Button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={restore} />
        </div>
      </div>
    </Sheet>
  )
}
