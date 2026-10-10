import { useCallback, useEffect, useRef, useState } from 'react'
import { audio } from './audio.js'
import { voiceFor } from './voice.js'

/**
 * Reads a script aloud, one item at a time, holding the silence after each.
 * An item is { clip?, text?, en, pauseAfter }: `clip` plays a generated
 * clip, `text` is spoken by the live voice (fetched once, kept on the
 * phone). The same runner as the Phrases tab's "lead it", generalised to
 * mixed scripts and to starting part-way through.
 *
 * A run is cancelled by a token, so a stopped or replaced run never carries
 * on when a stale clip ends; a clip played from elsewhere makes the run
 * yield. `run` is { key, items, title, tint, index, phase: 'speak' | 'pause'
 * | 'done', pause?, at? } or null.
 */
export function useRunner() {
  const [run, setRun] = useState(null)
  const token = useRef(0)
  const skipRef = useRef(null)
  const expected = useRef(null)

  const halt = useCallback(() => {
    token.current += 1
    expected.current = null
    const skip = skipRef.current
    skipRef.current = null
    if (skip) skip()
  }, [])

  const stop = useCallback(() => {
    halt()
    audio.stop()
    setRun(null)
  }, [halt])

  useEffect(
    () =>
      audio.subscribe((id) => {
        if (id && expected.current && id !== expected.current) {
          halt()
          setRun(null)
        }
      }),
    [halt],
  )
  useEffect(() => () => { halt(); audio.stop() }, [halt])

  const start = useCallback(async (key, items, { title = '', tint = 'sage', from = 0 } = {}) => {
    halt()
    const mine = token.current
    const alive = () => token.current === mine
    const hold = (ms) =>
      new Promise((resolve) => {
        const timer = setTimeout(() => { skipRef.current = null; resolve('ended') }, Math.max(0, ms))
        skipRef.current = () => { clearTimeout(timer); resolve('skipped') }
      })
    const base = { key, items, title, tint }
    for (let i = Math.max(0, from); i < items.length; i++) {
      if (!alive()) return
      const it = items[i]
      setRun({ ...base, index: i, phase: 'speak' })
      const clipId = it.clip || `say:${key}:${i}`
      expected.current = clipId
      const began = Date.now()
      // "Next" while a line is being read moves straight on.
      const how = await new Promise((resolve) => {
        skipRef.current = () => { audio.stop(); resolve('skipped') }
        const playing = it.clip
          ? audio.play(it.clip)
          : voiceFor(it.text).then((blob) => (alive() ? audio.playBlob(blob, clipId) : null)).catch(() => null)
        playing.then(() => resolve('ended'))
      })
      skipRef.current = null
      if (!alive()) return
      if (how === 'skipped') continue
      // A clip that is not generated yet ends at once; the line still stays
      // on screen for about as long as it takes to say it.
      const spoken = Date.now() - began
      if (spoken < 700) {
        const words = String(it.en || '').split(/\s+/).length
        const read = await hold(Math.min(7000, Math.max(1800, words * 420)) - spoken)
        if (!alive()) return
        if (read === 'skipped') continue
      }
      const pause = it.pauseAfter ?? 1.5
      if (pause > 0 && i < items.length - 1) {
        setRun({ ...base, index: i, phase: 'pause', pause, at: Date.now() })
        await hold(pause * 1000)
        if (!alive()) return
      }
    }
    expected.current = null
    setRun({ ...base, index: items.length - 1, phase: 'done' })
  }, [halt])

  const skip = useCallback(() => { if (skipRef.current) skipRef.current() }, [])
  return { run, start, stop, skip }
}

/** Keep the screen awake while she leads from the mat. */
export function useWakeLock(on) {
  useEffect(() => {
    if (!on || !navigator.wakeLock) return
    let lock = null
    let gone = false
    navigator.wakeLock.request('screen').then((l) => { if (gone) l.release(); else lock = l }).catch(() => {})
    return () => { gone = true; lock?.release().catch(() => {}) }
  }, [on])
}
