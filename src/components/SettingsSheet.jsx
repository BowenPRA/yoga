import { useRef, useState } from 'react'
import { Download, Settings, Upload } from 'lucide-react'
import Sheet from './Sheet.jsx'
import { Button, Chip } from './ui.jsx'
import { useLang } from '../lib/i18n.jsx'
import { store } from '../lib/store.js'

/** The gear in a page header: language, support level, theme, backup. */
export function SettingsButton() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} className="rounded-full p-2 text-muted hover:bg-paper" aria-label="Settings">
        <Settings size={20} />
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
    <Sheet open={open} onClose={onClose} title={t.settings.title}>
      <div className="divide-y divide-line">
        <div className="py-4">
          <div className="mb-2 text-sm text-muted">{t.settings.language}</div>
          <div className="flex gap-2">
            <Chip active={ui === 'vi'} onClick={() => setUi('vi')}>Tiếng Việt</Chip>
            <Chip active={ui === 'en'} onClick={() => setUi('en')}>English</Chip>
          </div>
        </div>
        <div className="py-4">
          <div className="mb-2 text-sm text-muted">{t.settings.support}</div>
          <div className="flex gap-2">
            <Chip active={support === 'full'} onClick={() => setSupport('full')}>{t.settings.supportFull}</Chip>
            <Chip active={support === 'balanced'} onClick={() => setSupport('balanced')}>{t.settings.supportBalanced}</Chip>
            <Chip active={support === 'light'} onClick={() => setSupport('light')}>{t.settings.supportLight}</Chip>
          </div>
          <p className="mt-2 text-xs text-muted">{t.settings.supportHelp}</p>
        </div>
        <div className="py-4">
          <div className="mb-2 text-sm text-muted">{t.settings.theme}</div>
          <div className="flex gap-2">
            <Chip active={theme === 'auto'} onClick={() => setTheme('auto')}>{t.settings.auto}</Chip>
            <Chip active={theme === 'light'} onClick={() => setTheme('light')}>{t.settings.light}</Chip>
            <Chip active={theme === 'dark'} onClick={() => setTheme('dark')}>{t.settings.dark}</Chip>
          </div>
        </div>
        <div className="py-4 flex gap-2">
          <Button kind="secondary" onClick={backup}><Download size={16} /> {t.settings.backup}</Button>
          <Button kind="secondary" onClick={() => fileRef.current?.click()}><Upload size={16} /> {t.settings.restore}</Button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={restore} />
        </div>
      </div>
    </Sheet>
  )
}
