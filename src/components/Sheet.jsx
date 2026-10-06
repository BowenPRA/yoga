import { useEffect } from 'react'
import { X } from 'lucide-react'

/** A bottom sheet, the phone's natural modal. */
export default function Sheet({ open, onClose, children, title }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-ink/30" onClick={onClose}>
      <div
        className="w-full max-w-xl max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-paper p-5 pb-safe shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line" />
        <div className="flex items-start justify-between gap-3">
          {title ? <h2 className="font-serif text-xl text-ink">{title}</h2> : <span />}
          <button onClick={onClose} className="rounded-full p-1.5 text-muted hover:bg-sand" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="pb-6">{children}</div>
      </div>
    </div>
  )
}
