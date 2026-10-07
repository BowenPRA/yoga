import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { store } from '../lib/store.js'
import { Button } from './ui.jsx'

/**
 * "Suggest a fix" on every card. The note is kept on the phone and sent to
 * Bowen by the backend when online (wiring in a later step); for now it is
 * stored so nothing is lost.
 */
export default function SuggestFix({ target }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)

  const send = async () => {
    if (!text.trim()) return
    await store.put('suggestions', { id: `${target}:${Date.now()}`, target, text: text.trim(), at: Date.now() })
    setSent(true)
    setText('')
    setTimeout(() => { setSent(false); setOpen(false) }, 1500)
  }

  if (!open)
    return (
      <button onClick={() => setOpen(true)} className="press inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-2 text-caption text-muted hover:text-tint-deep">
        <Pencil size={13} /> {t.common.suggestFix}
      </button>
    )
  return (
    <div className="slide-in rounded-3xl border border-line/70 bg-paper p-4 shadow-card">
      <p className="mb-2.5 text-caption text-muted">{t.common.suggestIntro}</p>
      {sent ? (
        <p className="text-body text-tint-deep">{t.common.suggestThanks}</p>
      ) : (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-line/70 bg-sand p-3 text-body text-ink outline-none focus:border-tint"
          />
          <div className="mt-3 flex justify-end gap-2">
            <Button kind="quiet" size="sm" onClick={() => setOpen(false)}>{t.common.close}</Button>
            <Button size="sm" onClick={send}>{t.common.suggestSend}</Button>
          </div>
        </>
      )}
    </div>
  )
}
