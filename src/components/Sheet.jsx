import { useEffect } from 'react'
import { X } from 'lucide-react'
import { tintClass } from '../lib/tints.js'

/**
 * A bottom sheet, the phone's natural modal. It rises from the bottom and
 * opens with a breath of `tint` at the top, so a term card arrives in the
 * colour of its region.
 */
export default function Sheet({ open, onClose, children, title, tint = 'sage' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fade-in fixed inset-0 z-30 flex items-end justify-center bg-ink/40 backdrop-blur-[2px]" onClick={onClose}>
      <div
        className={`sheet-up wash ${tintClass(tint)} max-h-[88dvh] w-full max-w-xl overflow-y-auto rounded-t-4xl px-5 pt-3 shadow-up pb-safe`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-ink/15" />
        <div className="flex items-start justify-between gap-3">
          {title ? <h2 className="font-serif text-heading text-ink">{title}</h2> : <span />}
          <button onClick={onClose} className="press -mr-2 grid h-10 w-10 place-items-center rounded-full bg-paper/70 text-muted" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="pb-8">{children}</div>
      </div>
    </div>
  )
}
