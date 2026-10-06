import { useRef, useState } from 'react'
import { Play, Square } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { PHRASE_GROUPS } from '../lib/content.js'
import { audio } from '../lib/audio.js'
import { Button, Header, Say } from '../components/ui.jsx'
import { SettingsButton } from '../components/SettingsSheet.jsx'
import SuggestFix from '../components/SuggestFix.jsx'

export default function Phrases() {
  const { t, ui } = useLang()
  const [playing, setPlaying] = useState(null)
  const stopRef = useRef(false)

  const playGroup = async (g) => {
    if (playing === g.id) { stopRef.current = true; audio.stop(); setPlaying(null); return }
    stopRef.current = false
    setPlaying(g.id)
    await audio.sequence(g.lines.map((l) => `phrase__${l.id}`), 1200, () => stopRef.current)
    setPlaying(null)
  }

  return (
    <>
      <Header title={t.phrases.title} subtitle={t.phrases.intro} right={<SettingsButton />} />
      {PHRASE_GROUPS.map((g) => (
        <section key={g.id} className="mb-5">
          <div className="mb-1 flex items-baseline justify-between px-1">
            <h2 className="font-serif text-lg text-ink">{ui === 'vi' ? g.title.vi : g.title.en}</h2>
            <Button kind="quiet" onClick={() => playGroup(g)} className="!py-1 !px-2 text-sm">
              {playing === g.id ? <Square size={14} /> : <Play size={14} />} {playing === g.id ? t.common.stop : t.common.playAll}
            </Button>
          </div>
          <div className="rounded-2xl bg-paper border border-line shadow-card p-2">
            {g.lines.map((l) => <Say key={l.id} id={`phrase__${l.id}`} en={l.en} vi={l.vi} />)}
          </div>
          <div className="mt-1 px-1"><SuggestFix target={`phrases:${g.id}`} /></div>
        </section>
      ))}
    </>
  )
}
