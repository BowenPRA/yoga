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
      <button onClick={() => setOpen(true)} className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-sage-deep">
        <Pencil size={12} /> {t.common.suggestFix}
      </button>
    )
  return (
    <div className="rounded-xl border border-line bg-sand p-3">
      <p className="mb-2 text-sm text-muted">{t.common.suggestIntro}</p>
      {sent ? (
        <p className="text-sm text-sage-deep">{t.common.suggestThanks}</p>
      ) : (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-line bg-paper p-2 text-sm text-ink outline-none focus:border-sage"
          />
          <div className="mt-2 flex justify-end gap-2">
            <Button kind="quiet" onClick={() => setOpen(false)}>{t.common.close}</Button>
            <Button onClick={send}>{t.common.suggestSend}</Button>
          </div>
        </>
      )}
    </div>
  )
}
