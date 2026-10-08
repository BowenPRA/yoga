import { useEffect, useRef, useState } from 'react'
import { Pencil } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { suggestions } from '../lib/store.js'
import { Button } from './ui.jsx'

/**
 * "Suggest a fix" on every card. The note is kept on the phone, in the
 * `suggestions` outbox, until she sends the waiting notes to Bowen from
 * Settings (one message, through the share sheet or an email).
 */
export default function SuggestFix({ target }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [kept, setKept] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const keep = async () => {
    if (!text.trim()) return
    await suggestions.add(target, text.trim())
    setKept(true)
    setText('')
    timer.current = setTimeout(() => { setKept(false); setOpen(false) }, 3500)
  }

  if (!open)
    return (
      <button onClick={() => setOpen(true)} className="press inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-2 text-caption text-muted hover:text-tint-deep">
        <Pencil size={13} /> {t.common.suggestFix}
      </button>
    )
  return (
    <div className="slide-in rounded-3xl border border-line/70 bg-paper p-4 shadow-card">
      {kept ? (
        <p className="fade-in text-body text-tint-deep">{t.common.suggestThanks}</p>
      ) : (
        <>
          <p className="mb-2.5 text-caption text-muted">{t.common.suggestIntro}</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-line/70 bg-sand p-3 text-body text-ink outline-none focus:border-tint"
          />
          <div className="mt-3 flex justify-end gap-2">
            <Button kind="quiet" size="sm" onClick={() => setOpen(false)}>{t.common.close}</Button>
            <Button size="sm" onClick={keep} disabled={!text.trim()}>{t.common.suggestSend}</Button>
          </div>
        </>
      )}
    </div>
  )
}
