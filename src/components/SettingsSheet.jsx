import { useEffect, useRef, useState } from 'react'
import { Download, Send, Settings, Upload } from 'lucide-react'
import Sheet from './Sheet.jsx'
import { Button, Chip, Eyebrow } from './ui.jsx'
import { useLang } from '../lib/i18n.jsx'
import { store, suggestions } from '../lib/store.js'
import { targetLabel } from '../lib/content.js'
import { version } from '../../package.json'

// Set at build time (scripts/build-pages.mjs, .env.local); see .env.example.
const APP_VERSION = import.meta.env.VITE_APP_VERSION || version
const FEEDBACK_EMAIL = import.meta.env.VITE_FEEDBACK_EMAIL || ''

const when = (ms) => new Date(ms).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

/** The waiting notes as one plain-text message for Bowen. */
function compose(notes) {
  const title = `Yoga English: ${notes.length === 1 ? 'a suggested fix' : `${notes.length} suggested fixes`}`
  const body = notes.map((n, i) => {
    const label = targetLabel(n.target)
    const head = `${i + 1}. ${label}${label !== n.target ? ` (${n.target})` : ''}`
    const text = n.text.split('\n').map((l) => `   ${l}`).join('\n')
    return `${head}\n   ${when(n.at)}\n${text}`
  })
  const text = `${title}\nApp ${APP_VERSION}, sent ${when(Date.now())}\n\n${body.join('\n\n')}\n`
  return { title, text }
}

/** The gear in a page header: language, support level, theme, the outbox, backup. */
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
  const S = t.settings
  const fileRef = useRef(null)
  const [notes, setNotes] = useState([])
  const [status, setStatus] = useState(null)

  const reload = () => suggestions.all().then(setNotes)
  useEffect(() => {
    if (open) suggestions.all().then((rows) => { setNotes(rows); setStatus(null) })
  }, [open])

  const waiting = notes.filter((n) => !n.sentAt)

  // Composed and shared straight from the tap: a share sheet needs the tap
  // that opened it, so nothing is awaited first.
  const send = async () => {
    if (!waiting.length) return
    const { title, text } = compose(waiting)
    let sent = false
    if (navigator.share && navigator.canShare?.({ title, text }) !== false) {
      try {
        await navigator.share({ title, text })
        sent = true
      } catch (e) {
        if (e?.name === 'AbortError') return // she closed the sheet: nothing sent
      }
    }
    if (!sent) {
      try {
        window.location.assign(`mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text)}`)
        sent = true
      } catch {
        setStatus('failed')
        return
      }
    }
    await suggestions.markSent(waiting.map((n) => n.id))
    await reload()
    setStatus('sent')
  }

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
    reload()
  }

  const outboxLine = waiting.length
    ? (waiting.length === 1 ? S.outboxWaitingOne : S.outboxWaiting.replace('{n}', waiting.length))
    : status === 'sent' ? S.outboxSent : notes.length ? S.outboxAllSent : S.outboxEmpty

  return (
    <Sheet open={open} onClose={onClose} title={S.title} tint="sage">
      <div className="divide-y divide-line/70">
        <div className="py-5">
          <Eyebrow className="mb-2.5">{S.language}</Eyebrow>
          <div className="flex gap-2">
            <Chip active={ui === 'vi'} onClick={() => setUi('vi')}>Tiếng Việt</Chip>
            <Chip active={ui === 'en'} onClick={() => setUi('en')}>English</Chip>
          </div>
        </div>
        <div className="py-5">
          <Eyebrow className="mb-2.5">{S.support}</Eyebrow>
          <div className="flex gap-2">
            <Chip active={support === 'full'} onClick={() => setSupport('full')}>{S.supportFull}</Chip>
            <Chip active={support === 'balanced'} onClick={() => setSupport('balanced')}>{S.supportBalanced}</Chip>
            <Chip active={support === 'light'} onClick={() => setSupport('light')}>{S.supportLight}</Chip>
          </div>
          <p className="mt-2.5 text-caption text-muted">{S.supportHelp}</p>
        </div>
        <div className="py-5">
          <Eyebrow className="mb-2.5">{S.theme}</Eyebrow>
          <div className="flex gap-2">
            <Chip active={theme === 'auto'} onClick={() => setTheme('auto')}>{S.auto}</Chip>
            <Chip active={theme === 'light'} onClick={() => setTheme('light')}>{S.light}</Chip>
            <Chip active={theme === 'dark'} onClick={() => setTheme('dark')}>{S.dark}</Chip>
          </div>
        </div>
        <div className="py-5">
          <Eyebrow className="mb-2">{S.outbox}</Eyebrow>
          <p className={`text-caption ${waiting.length || status === 'sent' ? 'text-ink' : 'text-muted'}`}>{status === 'failed' ? S.outboxFailed : outboxLine}</p>
          {waiting.length > 0 && (
            <Button kind="secondary" onClick={send} className="mt-3"><Send size={16} /> {S.sendToBowen}</Button>
          )}
        </div>
        <div className="flex gap-2.5 py-5">
          <Button kind="secondary" onClick={backup}><Download size={16} /> {S.backup}</Button>
          <Button kind="secondary" onClick={() => fileRef.current?.click()}><Upload size={16} /> {S.restore}</Button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={restore} />
        </div>
      </div>
    </Sheet>
  )
}
