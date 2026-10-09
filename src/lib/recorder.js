/**
 * Record her voice and hand back a small mono 16 kHz WAV as base64. The phone
 * records in whatever MediaRecorder offers (webm/opus on Android, mp4/aac on
 * iPhone); decoding it here and re-encoding as WAV means the backend and
 * Gemini only ever see one format.
 */
const RATE = 16000
const MAX_MS = 15000

export function canRecord() {
  return typeof window !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && typeof window.MediaRecorder !== 'undefined'
}

/** `onLimit` runs when the recording stops itself at `maxMs`; call stop() then. */
export async function startRecording({ maxMs = MAX_MS, onLimit } = {}) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
  const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'].find((m) => MediaRecorder.isTypeSupported?.(m)) || ''
  const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined)
  const chunks = []
  rec.ondataavailable = (e) => { if (e.data?.size) chunks.push(e.data) }
  const stopped = new Promise((resolve) => { rec.onstop = resolve })
  rec.start(250)
  const timer = setTimeout(() => { if (rec.state === 'recording') { rec.stop(); onLimit?.() } }, maxMs)

  return {
    /** Stop and return { base64, seconds }. */
    async stop() {
      clearTimeout(timer)
      if (rec.state === 'recording') rec.stop()
      await stopped
      stream.getTracks().forEach((t) => t.stop())
      const blob = new Blob(chunks, { type: rec.mimeType || mime || 'audio/webm' })
      return toWav(blob)
    },
    cancel() {
      clearTimeout(timer)
      if (rec.state === 'recording') rec.stop()
      stream.getTracks().forEach((t) => t.stop())
    },
  }
}

async function toWav(blob) {
  const Ctx = window.AudioContext || window.webkitAudioContext
  const ctx = new Ctx()
  const buf = await ctx.decodeAudioData(await blob.arrayBuffer())
  const mono = buf.getChannelData(0)
  const ratio = buf.sampleRate / RATE
  const n = Math.floor(mono.length / ratio)
  const pcm = new Int16Array(n)
  for (let i = 0; i < n; i++) {
    // average the source samples that fall into this output sample
    const a = Math.floor(i * ratio), b = Math.min(mono.length, Math.floor((i + 1) * ratio))
    let s = 0
    for (let k = a; k < b; k++) s += mono[k]
    const v = Math.max(-1, Math.min(1, s / Math.max(1, b - a)))
    pcm[i] = v < 0 ? v * 0x8000 : v * 0x7fff
  }
  ctx.close?.()
  const wav = new ArrayBuffer(44 + pcm.length * 2)
  const dv = new DataView(wav)
  const str = (o, s) => { for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i)) }
  str(0, 'RIFF'); dv.setUint32(4, 36 + pcm.length * 2, true); str(8, 'WAVE')
  str(12, 'fmt '); dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true)
  dv.setUint32(24, RATE, true); dv.setUint32(28, RATE * 2, true); dv.setUint16(32, 2, true); dv.setUint16(34, 16, true)
  str(36, 'data'); dv.setUint32(40, pcm.length * 2, true)
  new Int16Array(wav, 44).set(pcm)
  const bytes = new Uint8Array(wav)
  let bin = ''
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000))
  return { base64: btoa(bin), seconds: n / RATE }
}
