import { useEffect, useRef, useState } from 'react'
import { Bookmark, BookmarkCheck, Languages, Mic, Pencil, Snail, Square, Volume2 } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { api } from '../lib/api.js'
import { audio } from '../lib/audio.js'
import { learn } from '../lib/learning.js'
import { canRecord, startRecording } from '../lib/recorder.js'
import { useSpeaking } from '../lib/useSpeaking.js'
import { Button, Eyebrow, Section } from './ui.jsx'
import PractiseLine from './PractiseLine.jsx'

/**
 * Say it in English: she types or says what she wants to say, in
 * Vietnamese, English or a mix. Gemini returns the line a native teacher
 * would say (/api/translate), and the voice reads it aloud as soon as it
 * arrives (/api/speak). She can hear it again, slower, save it with its
 * audio, and record herself saying it.
 */
export default function SayInEnglish({ onSaved }) {
  const { t } = useLang()
  const s = t.speech
  const L = t.learn
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('idle') // idle | recording | translating
  const [voicing, setVoicing] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [typed, setTyped] = useState(false)
  const [saved, setSaved] = useState(false)
  const recRef = useRef(null)
  const blobRef = useRef(null)
  // Bumped for every new line, so a voice that arrives after she has moved on stays quiet.
  const lineRef = useRef(0)
  const speaking = useSpeaking()

  useEffect(() => () => { recRef.current?.cancel?.(); audio.stop() }, [])

  /** Fetch the voice once per line, then play it at `rate`. */
  const play = async (english, rate = 1) => {
    const id = rate < 1 ? 'say:slow' : 'say'
    if (speaking === id) { audio.stop(); return }
    const line = lineRef.current
    setError(null)
    try {
      if (!blobRef.current) {
        setVoicing(true)
        const blob = await api.speak(english)
        if (line !== lineRef.current) return
        blobRef.current = blob
      }
    } catch (err) {
      if (line === lineRef.current) setError(`${s.noVoice} (${err.message})`)
      return
    } finally {
      setVoicing(false)
    }
    await audio.playBlob(blobRef.current, id, { rate })
  }

  const translate = async (input) => {
    const line = ++lineRef.current
    setPhase('translating'); setError(null); setResult(null); setSaved(false); blobRef.current = null
    try {
      const out = await api.translate(input)
      if (line !== lineRef.current) return
      if (!out.english) { setError(out.note_vi || s.nothingHeard); return }
      setResult(out)
      play(out.english)
    } catch (err) {
      setError(`${s.error} (${err.message})`)
    } finally {
      setPhase('idle')
    }
  }

  const submit = (e) => {
    e?.preventDefault()
    if (!text.trim() || phase !== 'idle') return
    audio.unlock()
    setTyped(true)
    translate({ text: text.trim() })
  }

  const sendRecording = async () => {
    const rec = recRef.current
    if (!rec) return
    recRef.current = null
    setPhase('translating')
    try {
      const { base64, seconds } = await rec.stop()
      if (seconds < 0.5) { setPhase('idle'); return }
      setTyped(false)
      await translate({ audio: base64 })
    } catch (err) {
      setError(`${L.sayError} (${err.message})`)
      setPhase('idle')
    }
  }

  const mic = async () => {
    setError(null)
    audio.unlock()
    if (phase === 'recording') return sendRecording()
    if (!canRecord()) { setError(L.noMic); return }
    try {
      audio.stop()
      recRef.current = await startRecording({ maxMs: 30000, onLimit: sendRecording })
      setPhase('recording')
    } catch {
      setError(L.noMic)
    }
  }

  const save = async () => {
    if (!result) return
    // Her own Vietnamese words read best under the English; typed English gets the meaning instead.
    const vi = result.lang === 'en' ? result.meaning_vi : result.heard || text
    await learn.savePhrase({ id: `say:${Date.now()}`, en: result.english, vi: vi || '', source: 'say' }, blobRef.current)
    setSaved(true)
    onSaved?.()
  }

  const reset = () => { lineRef.current++; audio.stop(); setResult(null); setText(''); setSaved(false); setError(null); blobRef.current = null }
  /** Back to the box with her words in it; for a recording, what Gemini heard, to fix a misheard word. */
  const edit = () => {
    if (!typed) setText(result?.heard || '')
    lineRef.current++; audio.stop(); setResult(null); setSaved(false); setError(null); blobRef.current = null
  }

  const recording = phase === 'recording'
  const busy = phase === 'translating'

  if (!result) {
    return (
      <form onSubmit={submit} className="wash rounded-4xl border border-line/60 p-4 shadow-card">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} placeholder={s.sayPlaceholder} disabled={recording || busy}
          className="w-full resize-none rounded-3xl border border-line/70 bg-paper p-4 text-body-lg text-ink outline-none placeholder:text-muted/60 focus:border-tint disabled:opacity-60" />
        <div className="mt-4 flex items-center gap-2.5">
          <Button kind="secondary" onClick={mic} disabled={busy} className={recording ? 'tint-clay !border-clay/60 !text-clay-deep speaking' : ''}>
            {recording ? <Square size={18} /> : <Mic size={18} />} {recording ? s.stopSpeak : s.speak}
          </Button>
          <Button type="submit" disabled={!text.trim() || busy || recording} className="flex-1">
            <Languages size={18} /> {busy ? s.translating : s.toEnglish}
          </Button>
        </div>
        {recording && <p className="mt-3 text-center text-caption text-muted">{s.recordingSay}</p>}
        {error && <p className="mt-3 text-caption text-clay-deep">{error}</p>}
      </form>
    )
  }

  const on = speaking === 'say'
  const slowOn = speaking === 'say:slow'
  return (
    <>
      <div className="wash slide-in rounded-4xl border border-line/60 p-5 shadow-card">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <Eyebrow>{s.youSaid}</Eyebrow>
            <p className="mt-1 text-caption text-muted">{result.heard || text}</p>
          </div>
          <button onClick={edit} className="press -mr-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted hover:bg-paper" aria-label={s.edit}>
            <Pencil size={16} />
          </button>
        </div>
        <Eyebrow tone="tint" className="mt-4">{s.inEnglish}</Eyebrow>
        <p className="mt-1.5 font-serif text-heading text-ink">“{result.english}”</p>
        {result.meaning_vi && <p className="mt-2 text-caption text-muted">{s.meaningBack}: {result.meaning_vi}</p>}
        <div className="mt-4 flex gap-2.5">
          <Button onClick={() => play(result.english)} kind={on ? 'secondary' : 'primary'} className={`flex-1 ${on ? 'speaking' : ''}`} disabled={voicing}>
            <Volume2 size={18} /> {voicing ? s.voicing : s.listen}
          </Button>
          <Button kind="secondary" onClick={() => play(result.english, 0.75)} className={slowOn ? 'speaking' : ''} disabled={voicing}>
            <Snail size={18} /> {s.slower}
          </Button>
        </div>
        <Button kind="quiet" size="sm" onClick={save} disabled={saved} className="-ml-2 mt-2">
          {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />} {saved ? t.poses.saved : s.save}
        </Button>
        {error && <p className="mt-3 text-caption text-clay-deep">{error}</p>}
      </div>

      {result.note_vi && <div className="tint-gold wash mt-4 rounded-3xl border border-line/60 px-4 py-3.5 text-body text-tint-deep">{result.note_vi}</div>}

      {result.phrases?.length > 0 && (
        <Section title={s.keyPhrases}>
          <div className="divide-y divide-line/70 rounded-3xl border border-line/70 bg-paper shadow-card">
            {result.phrases.map((p, i) => (
              <div key={i} className="p-3.5">
                <div className="font-medium text-ink">{p.en}</div>
                <div className="mt-0.5 text-caption text-muted">{p.vi}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <PractiseLine key={result.english} text={result.english} className="mt-5" />

      <div className="mt-6"><Button kind="secondary" size="lg" onClick={reset} className="w-full">{s.again}</Button></div>
    </>
  )
}
