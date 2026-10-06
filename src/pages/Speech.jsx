import { useEffect, useRef, useState } from 'react'
import { Bookmark, BookmarkCheck, Mic, MicOff, Sparkles, Trash2, Volume2 } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { api } from '../lib/api.js'
import { audio } from '../lib/audio.js'
import { learn } from '../lib/learning.js'
import { Button, Header, Section } from '../components/ui.jsx'
import { SettingsButton } from '../components/SettingsSheet.jsx'

/**
 * Speech: she writes or dictates a cue in her own English; Gemini returns the
 * natural teacher version, the changes explained in Vietnamese, pronunciation
 * warnings and a line of praise. She can hear it and save it. Saved lines sit
 * below.
 */
export default function Speech() {
  const { t } = useLang()
  const s = t.speech
  const [cue, setCue] = useState('')
  const [context, setContext] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [saved, setSaved] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [listening, setListening] = useState(false)
  const [lines, setLines] = useState([])
  const recRef = useRef(null)
  const blobRef = useRef(null)

  const refresh = () => learn.phrases().then(setLines)
  useEffect(() => { refresh() }, [])

  const Recognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)

  const dictate = () => {
    if (!Recognition) { setError(s.noSpeech); return }
    if (listening) { recRef.current?.stop(); return }
    const rec = new Recognition()
    rec.lang = 'en-US'
    rec.interimResults = true
    let final = ''
    rec.onresult = (e) => {
      let interim = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const txt = e.results[i][0].transcript
        if (e.results[i].isFinal) final += txt
        else interim += txt
      }
      setCue((final + interim).trim())
    }
    rec.onend = () => setListening(false)
    rec.onerror = () => setListening(false)
    recRef.current = rec
    setListening(true)
    rec.start()
  }

  const submit = async (e) => {
    e?.preventDefault()
    if (!cue.trim() || busy) return
    setBusy(true); setError(null); setResult(null); setSaved(false); blobRef.current = null
    try { setResult(await api.coach(cue.trim(), context.trim())) }
    catch (err) { setError(`${s.error} (${err.message})`) }
    finally { setBusy(false) }
  }

  const listen = async () => {
    if (!result) return
    if (speaking) { audio.stop(); setSpeaking(false); return }
    setSpeaking(true)
    try {
      if (!blobRef.current) blobRef.current = await api.speak(result.natural)
      await audio.playBlob(blobRef.current, 'coach')
    } catch (err) { setError(`${s.error} (${err.message})`) }
    finally { setSpeaking(false) }
  }

  const save = async () => {
    if (!result) return
    await learn.savePhrase({ id: `coach:${Date.now()}`, en: result.natural, vi: result.meaning_vi || '', original: cue, source: 'coach' })
    setSaved(true)
    refresh()
  }
  const remove = async (id) => { await learn.removePhrase(id); refresh() }
  const reset = () => { setResult(null); setCue(''); setSaved(false); setError(null); blobRef.current = null }

  return (
    <>
      <Header title={s.title} subtitle={s.intro} right={<SettingsButton />} />

      {!result && (
        <form onSubmit={submit} className="rounded-2xl bg-paper border border-line shadow-card p-4">
          <textarea value={cue} onChange={(e) => setCue(e.target.value)} rows={4} placeholder={s.placeholder}
            className="w-full resize-none rounded-xl border border-line bg-sand p-3 text-[17px] leading-relaxed text-ink outline-none placeholder:text-muted/60 focus:border-sage" />
          <input value={context} onChange={(e) => setContext(e.target.value)} placeholder={s.contextPlaceholder}
            className="mt-2 w-full rounded-xl border border-line bg-sand px-3 py-2 text-sm text-ink outline-none placeholder:text-muted/60 focus:border-sage" />
          <div className="mt-3 flex items-center gap-2">
            <Button kind="secondary" onClick={dictate} className={listening ? '!border-clay text-clay' : ''}>
              {listening ? <MicOff size={18} /> : <Mic size={18} />} {listening ? s.listening : s.dictate}
            </Button>
            <Button type="submit" disabled={!cue.trim() || busy} className="flex-1">
              <Sparkles size={18} /> {busy ? s.working : s.send}
            </Button>
          </div>
          {busy && <p className="mt-2 text-xs text-muted">{s.slowNote}</p>}
          {error && <p className="mt-2 text-sm text-clay">{error}</p>}
        </form>
      )}

      {result && (
        <>
          <div className="rounded-2xl bg-paper border border-line shadow-card p-4">
            <div className="text-xs text-muted line-through">{cue}</div>
            <div className="mt-1 text-[13px] font-semibold uppercase tracking-wider text-sage-deep">{s.natural}</div>
            <p className="mt-1 font-serif text-[19px] leading-snug text-ink">“{result.natural}”</p>
            {result.meaning_vi && <p className="mt-1 text-sm text-muted">{result.meaning_vi}</p>}
            <div className="mt-3 flex gap-2">
              <Button onClick={listen} kind={speaking ? 'secondary' : 'primary'}><Volume2 size={18} className={speaking ? 'speaking' : ''} /> {s.listen}</Button>
              <Button kind="secondary" onClick={save} disabled={saved}>{saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />} {saved ? t.poses.saved : s.save}</Button>
            </div>
            {error && <p className="mt-2 text-sm text-clay">{error}</p>}
          </div>

          <Section title={s.changes}>
            <div className="rounded-2xl bg-paper border border-line shadow-card divide-y divide-line">
              {result.changes.map((c, i) => (
                <div key={i} className="p-3">
                  <div className="text-[15px]"><span className="text-muted line-through">{c.from}</span><span className="mx-2 text-sage">→</span><span className="font-medium text-ink">{c.to}</span></div>
                  <p className="mt-1 text-sm text-ink/80">{c.why_vi}</p>
                </div>
              ))}
            </div>
          </Section>

          {result.pronunciation?.length > 0 && (
            <Section title={s.pronunciation}>
              <div className="rounded-2xl bg-paper border border-line shadow-card divide-y divide-line">
                {result.pronunciation.map((p, i) => (
                  <div key={i} className="p-3">
                    <div className="font-medium text-ink">{p.word} {p.say && <span className="ml-1 text-xs text-clay">{p.say}</span>}</div>
                    <p className="mt-0.5 text-sm text-ink/80">{p.tip_vi}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {result.praise_vi && <div className="mt-4 rounded-xl bg-sage-soft px-4 py-3 text-sm text-sage-deep">{result.praise_vi}</div>}
          <div className="mt-6"><Button kind="secondary" onClick={reset} className="w-full">{s.again}</Button></div>
        </>
      )}

      <Section title={s.saved}>
        {lines.length === 0 ? (
          <p className="rounded-2xl bg-paper border border-line p-4 text-sm text-muted">{s.savedEmpty}</p>
        ) : (
          <div className="rounded-2xl bg-paper border border-line shadow-card divide-y divide-line">
            {lines.map((p) => (
              <div key={p.id} className="flex items-start gap-3 p-3">
                <div className="flex-1 min-w-0">
                  <div className="text-ink">{p.en}</div>
                  {p.vi && <div className="text-sm text-muted">{p.vi}</div>}
                  {p.original && <div className="text-xs text-muted line-through">{p.original}</div>}
                </div>
                <button onClick={() => remove(p.id)} className="p-1.5 text-line hover:text-clay" aria-label={s.remove}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
