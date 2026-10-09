import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Bookmark, BookmarkCheck, Mic, MicOff, Sparkles, Square, Trash2, Volume2 } from 'lucide-react'
import { useLang } from '../lib/i18n.jsx'
import { api } from '../lib/api.js'
import { audio } from '../lib/audio.js'
import { learn } from '../lib/learning.js'
import { availableClips } from '../lib/offline.js'
import { useSpeaking } from '../lib/useSpeaking.js'
import { Button, Eyebrow, Header, PlayButton, SayHint, Section } from '../components/ui.jsx'
import { SettingsButton } from '../components/SettingsSheet.jsx'
import SayInEnglish from '../components/SayInEnglish.jsx'
import PractiseLine from '../components/PractiseLine.jsx'

const MODES = ['say', 'coach']
const readMode = () => {
  try {
    const m = localStorage.getItem('ye.speechMode')
    return MODES.includes(m) ? m : 'say'
  } catch {
    return 'say'
  }
}
const writeMode = (m) => {
  try {
    localStorage.setItem('ye.speechMode', m)
  } catch {
    /* private mode: fine, the choice just won't stick */
  }
}

/**
 * Speech, in two modes:
 *   say    she types or says what she wants to say, in Vietnamese or
 *          English, and hears it in natural English (SayInEnglish)
 *   coach  she writes or dictates a cue in her own English; Gemini returns
 *          the natural teacher version, the changes explained in Vietnamese,
 *          pronunciation warnings and a line of praise
 * Either way she can hear the line, save it and practise saying it. Saved
 * lines sit below, with their audio when it was kept.
 */
export default function Speech() {
  const { t } = useLang()
  const s = t.speech
  const [mode, setModeState] = useState(readMode)
  const [lines, setLines] = useState([])
  const [voiced, setVoiced] = useState(() => new Set())
  const [clips, setClips] = useState(() => new Set())
  const speaking = useSpeaking()

  const refresh = () => Promise.all([learn.phrases(), learn.voiced()]).then(([rows, ids]) => { setLines(rows); setVoiced(ids) })
  useEffect(() => {
    refresh()
    availableClips().then((ids) => ids && setClips(ids))
  }, [])

  const setMode = (m) => { audio.stop(); setModeState(m); writeMode(m) }
  const remove = async (id) => { await learn.removePhrase(id); refresh() }
  const playSaved = async (id) => {
    const key = `saved:${id}`
    if (speaking === key) { audio.stop(); return }
    audio.unlock()
    const blob = await learn.voice(id)
    if (blob) audio.playBlob(blob, key)
  }

  return (
    <div className="tint-sage">
      <Header title={s.title} subtitle={mode === 'say' ? s.sayIntro : s.intro} right={<SettingsButton />} />

      <div role="tablist" className="mb-4 grid grid-cols-2 gap-1 rounded-full bg-tint-soft p-1">
        {MODES.map((m) => (
          <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)}
            className={`press min-h-[40px] rounded-full px-3 text-[14px] font-medium transition-colors ${mode === m ? 'bg-paper text-tint-deep shadow-sm' : 'text-tint-deep/75'}`}>
            {m === 'say' ? s.modeSay : s.modeCoach}
          </button>
        ))}
      </div>

      {mode === 'say' ? <SayInEnglish onSaved={refresh} /> : <Coach onSaved={refresh} />}

      <Section title={s.saved}>
        {lines.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-line bg-paper/60 p-5 text-center text-caption text-muted">{s.savedEmpty}</p>
        ) : (
          <div className="divide-y divide-line/70 rounded-3xl border border-line/70 bg-paper shadow-card">
            {lines.map((p) => {
              const on = speaking === `saved:${p.id}`
              return (
                <div key={p.id} className="flex items-start gap-3 p-3.5">
                  {voiced.has(p.id) ? (
                    <button onClick={() => playSaved(p.id)} aria-label={s.listen}
                      className={`press grid h-10 w-10 shrink-0 place-items-center rounded-full ${on ? 'bg-tint-deep text-paper speaking' : 'bg-tint-soft text-tint-deep'}`}>
                      {on ? <Square size={14} /> : <Volume2 size={19} />}
                    </button>
                  ) : clips.has(p.id) ? <PlayButton id={p.id} /> : null}
                  <div className="min-w-0 flex-1">
                    <div className="text-body text-ink">{p.en}</div>
                    {p.vi && <div className="text-caption text-muted">{p.vi}</div>}
                    {p.original && <div className={`text-[12px] text-muted ${p.source === 'coach' ? 'line-through' : ''}`}>{p.original}</div>}
                  </div>
                  <button onClick={() => remove(p.id)} className="press grid h-9 w-9 shrink-0 place-items-center rounded-full text-line hover:text-clay" aria-label={s.remove}><Trash2 size={16} /></button>
                </div>
              )
            })}
          </div>
        )}
      </Section>
    </div>
  )
}

/** Cue Coach: her English cue in; the natural version and the reasons out. */
function Coach({ onSaved }) {
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
  const recRef = useRef(null)
  const blobRef = useRef(null)

  useEffect(() => () => { recRef.current?.stop?.(); audio.stop() }, [])

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
    audio.unlock()
    setSpeaking(true)
    try {
      if (!blobRef.current) blobRef.current = await api.speak(result.natural)
      await audio.playBlob(blobRef.current, 'coach')
    } catch (err) { setError(`${s.error} (${err.message})`) }
    finally { setSpeaking(false) }
  }

  const save = async () => {
    if (!result) return
    await learn.savePhrase({ id: `coach:${Date.now()}`, en: result.natural, vi: result.meaning_vi || '', original: cue, source: 'coach' }, blobRef.current)
    setSaved(true)
    onSaved?.()
  }
  const reset = () => { audio.stop(); setResult(null); setCue(''); setSaved(false); setError(null); blobRef.current = null }

  return (
    <>
      {!result && (
        <form onSubmit={submit} className="wash rounded-4xl border border-line/60 p-4 shadow-card">
          <textarea value={cue} onChange={(e) => setCue(e.target.value)} rows={4} placeholder={s.placeholder}
            className="w-full resize-none rounded-3xl border border-line/70 bg-paper p-4 text-body-lg text-ink outline-none placeholder:text-muted/60 focus:border-tint" />
          <input value={context} onChange={(e) => setContext(e.target.value)} placeholder={s.contextPlaceholder}
            className="mt-2.5 w-full rounded-full border border-line/70 bg-paper px-4 py-2.5 text-caption text-ink outline-none placeholder:text-muted/60 focus:border-tint" />
          <div className="mt-4 flex items-center gap-2.5">
            <Button kind="secondary" onClick={dictate} className={listening ? 'tint-clay !border-clay/60 !text-clay-deep speaking' : ''}>
              {listening ? <MicOff size={18} /> : <Mic size={18} />} {listening ? s.listening : s.dictate}
            </Button>
            <Button type="submit" disabled={!cue.trim() || busy} className="flex-1">
              <Sparkles size={18} /> {busy ? s.working : s.send}
            </Button>
          </div>
          {busy && <p className="mt-3 text-center text-caption text-muted">{s.slowNote}</p>}
          {error && <p className="mt-3 text-caption text-clay-deep">{error}</p>}
        </form>
      )}

      {result && (
        <>
          <div className="wash slide-in rounded-4xl border border-line/60 p-5 shadow-card">
            <div className="text-[12px] text-muted line-through">{cue}</div>
            <Eyebrow tone="tint" className="mt-3">{s.natural}</Eyebrow>
            <p className="mt-1.5 font-serif text-heading text-ink">“{result.natural}”</p>
            {result.meaning_vi && <p className="mt-2 text-caption text-muted">{result.meaning_vi}</p>}
            <div className="mt-4 flex gap-2.5">
              <Button onClick={listen} kind={speaking ? 'secondary' : 'primary'} className={speaking ? 'speaking' : ''}><Volume2 size={18} /> {s.listen}</Button>
              <Button kind="secondary" onClick={save} disabled={saved}>{saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />} {saved ? t.poses.saved : s.save}</Button>
            </div>
            {error && <p className="mt-3 text-caption text-clay-deep">{error}</p>}
          </div>

          <Section title={s.changes}>
            <div className="divide-y divide-line/70 rounded-3xl border border-line/70 bg-paper shadow-card">
              {result.changes.map((c, i) => (
                <div key={i} className="p-3.5">
                  <div className="flex flex-wrap items-center gap-x-2 text-body"><span className="text-muted line-through">{c.from}</span><ArrowRight size={14} className="text-tint" /><span className="font-medium text-ink">{c.to}</span></div>
                  <p className="mt-1 text-caption text-ink/80">{c.why_vi}</p>
                </div>
              ))}
            </div>
          </Section>

          {result.pronunciation?.length > 0 && (
            <Section title={s.pronunciation}>
              <div className="divide-y divide-line/70 rounded-3xl border border-line/70 bg-paper shadow-card">
                {result.pronunciation.map((p, i) => (
                  <div key={i} className="p-3.5">
                    <div className="font-medium text-ink">{p.word} {p.say && <SayHint say={p.say} className="ml-1" />}</div>
                    <p className="mt-1 text-caption text-ink/80">{p.tip_vi}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {result.praise_vi && <div className="wash mt-5 rounded-3xl border border-line/60 px-4 py-3.5 text-body text-tint-deep">{result.praise_vi}</div>}
          <PractiseLine key={result.natural} text={result.natural} className="mt-5" />
          <div className="mt-6"><Button kind="secondary" size="lg" onClick={reset} className="w-full">{s.again}</Button></div>
        </>
      )}
    </>
  )
}
