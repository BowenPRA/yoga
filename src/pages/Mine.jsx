import { useEffect, useRef, useState } from 'react'
import { Download, Trash2, Upload } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { store } from '../lib/store.js'
import { Button, Chip, Header, PlayButton, Section } from '../components/ui.jsx'

export default function Mine() {
  const { t, ui, setUi, support, setSupport, theme, setTheme } = useLang()
  const [phrases, setPhrases] = useState([])
  const fileRef = useRef(null)

  const load = () => store.all('phrasebook').then((r) => setPhrases(r.sort((a, b) => b.at - a.at)))
  useEffect(() => { load() }, [])

  const remove = async (id) => { await store.del('phrasebook', id); load() }

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
    try {
      await store.importAll(JSON.parse(await f.text()))
      load()
    } catch { /* ignore a bad file */ }
    e.target.value = ''
  }

  return (
    <>
      <Header title={t.mine.title} />

      <Section title={t.mine.phrasebook}>
        {phrases.length === 0 ? (
          <p className="rounded-2xl bg-paper border border-line p-4 text-sm text-muted">{t.mine.empty}</p>
        ) : (
          <div className="rounded-2xl bg-paper border border-line shadow-card divide-y divide-line">
            {phrases.map((p) => (
              <div key={p.id} className="flex items-start gap-3 p-3">
                {p.source !== 'coach' && <PlayButton id={p.id} size={34} />}
                <div className="flex-1 min-w-0">
                  <div className="text-ink">{p.en}</div>
                  {p.vi && <div className="text-sm text-muted">{p.vi}</div>}
                  {p.original && <div className="text-xs text-muted line-through">{p.original}</div>}
                </div>
                <button onClick={() => remove(p.id)} className="p-1.5 text-line hover:text-clay" aria-label={t.mine.remove}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title={t.mine.settings}>
        <div className="rounded-2xl bg-paper border border-line shadow-card divide-y divide-line">
          <div className="p-4">
            <div className="mb-2 text-sm text-muted">{t.mine.language}</div>
            <div className="flex gap-2">
              <Chip active={ui === 'vi'} onClick={() => setUi('vi')}>Tiếng Việt</Chip>
              <Chip active={ui === 'en'} onClick={() => setUi('en')}>English</Chip>
            </div>
          </div>
          <div className="p-4">
            <div className="mb-2 text-sm text-muted">{t.mine.support}</div>
            <div className="flex gap-2">
              <Chip active={support === 'full'} onClick={() => setSupport('full')}>{t.mine.supportFull}</Chip>
              <Chip active={support === 'balanced'} onClick={() => setSupport('balanced')}>{t.mine.supportBalanced}</Chip>
              <Chip active={support === 'light'} onClick={() => setSupport('light')}>{t.mine.supportLight}</Chip>
            </div>
            <p className="mt-2 text-xs text-muted">{t.mine.supportHelp}</p>
          </div>
          <div className="p-4">
            <div className="mb-2 text-sm text-muted">{t.mine.theme}</div>
            <div className="flex gap-2">
              <Chip active={theme === 'auto'} onClick={() => setTheme('auto')}>{t.mine.auto}</Chip>
              <Chip active={theme === 'light'} onClick={() => setTheme('light')}>{t.mine.light}</Chip>
              <Chip active={theme === 'dark'} onClick={() => setTheme('dark')}>{t.mine.dark}</Chip>
            </div>
          </div>
          <div className="p-4 flex gap-2">
            <Button kind="secondary" onClick={backup}><Download size={16} /> Backup</Button>
            <Button kind="secondary" onClick={() => fileRef.current?.click()}><Upload size={16} /> Restore</Button>
            <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={restore} />
          </div>
        </div>
      </Section>
    </>
  )
}
