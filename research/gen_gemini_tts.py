"""Gemini TTS samples using the key the Y8Science backend already has.

Two request shapes, because Google changed the API between generations:
  * gemini-3.8-*-tts    -> the Interactions API. The text is a verbatim
                           transcript; delivery goes in a `speech_metadata`
                           style annotation. Returns a complete WAV.
  * gemini-2.5-*-tts    -> generateContent with speechConfig. Style goes in
                           the prompt text. Returns raw 16-bit PCM at 24 kHz,
                           which we wrap as WAV (no ffmpeg on this machine).
Run with an argument (e.g. `gem38`) to regenerate only matching variants.
"""
import base64
import json
import os
import sys
import time
import wave

import requests

sys.path.insert(0, os.path.dirname(__file__))
from samples import SAMPLES

OUT = os.path.join(os.path.dirname(__file__), "tts")
ENV = r"C:\Users\bowen\Documents\Y8Science-Backend\.env.local"


def key():
    with open(ENV, encoding="utf-8") as f:
        for line in f:
            if line.startswith("GEMINI_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"')
    raise SystemExit("no key")


# (short id, model, voice)
VARIANTS = [
    ("gem38-sulafat", "gemini-3.8-flash-tts", "Sulafat"),       # warm
    ("gem38-achernar", "gemini-3.8-flash-tts", "Achernar"),     # soft
    ("gem38-charon", "gemini-3.8-flash-tts", "Charon"),         # male, informative
    ("gem38lite-sulafat", "gemini-3.8-flash-lite-tts", "Sulafat"),
    ("gem25pro-sulafat", "gemini-2.5-pro-preview-tts", "Sulafat"),
]


def synth_interactions(model, voice, text, style, k):
    url = "https://generativelanguage.googleapis.com/v1beta/interactions"
    body = {
        "model": model,
        "input": [{"type": "user_input", "content": [{
            "type": "text", "text": text,
            "annotations": [{"type": "speech_metadata", "style": style}],
        }]}],
        "response_format": {"type": "audio"},
        "generation_config": {"speech_config": [{"voice": voice}]},
    }
    r = requests.post(url, headers={"x-goog-api-key": k, "Content-Type": "application/json"},
                      json=body, timeout=180)
    if r.status_code != 200:
        raise RuntimeError(f"{r.status_code} {r.text[:300]}")
    d = r.json()
    part = next(c for s in d["steps"] for c in s["content"] if c.get("type") == "audio")
    usage = {"input_tokens": d["usage"]["total_input_tokens"],
             "output_audio_tokens": d["usage"]["total_output_tokens"]}
    return base64.b64decode(part["data"]), part.get("mime_type", ""), usage


def synth_generate_content(model, voice, text, style, k):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={k}"
    body = {
        "contents": [{"parts": [{"text": f"{style}\n\nSay exactly this and nothing else:\n{text}"}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}},
        },
    }
    r = requests.post(url, json=body, timeout=180)
    if r.status_code != 200:
        raise RuntimeError(f"{r.status_code} {r.text[:300]}")
    d = r.json()
    u = d.get("usageMetadata", {})
    usage = {"input_tokens": u.get("promptTokenCount"), "output_audio_tokens": u.get("candidatesTokenCount")}
    part = d["candidates"][0]["content"]["parts"][0]["inlineData"]
    return base64.b64decode(part["data"]), part.get("mimeType", ""), usage


def write_wav_from_pcm(pcm, path, rate=24000):
    with wave.open(path, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(pcm)


def seconds_of(path):
    with wave.open(path) as w:
        return round(w.getnframes() / w.getframerate(), 1)


def main():
    only = sys.argv[1:]
    k = key()
    os.makedirs(OUT, exist_ok=True)
    mpath = os.path.join(OUT, "manifest_gemini.json")
    manifest = []
    if os.path.exists(mpath) and only:
        with open(mpath, encoding="utf-8") as f:
            manifest = [m for m in json.load(f) if not any(o in m["provider"] for o in only)]
    for vid, model, voice in VARIANTS:
        if only and not any(o in vid for o in only):
            continue
        for s in SAMPLES:
            fn = f"{vid}__{s['id']}.wav"
            path = os.path.join(OUT, fn)
            rec = {"provider": vid, "model": model, "voice": voice, "sample": s["id"], "file": fn}
            t0 = time.time()
            try:
                if model.startswith("gemini-3."):
                    audio, mime, usage = synth_interactions(model, voice, s["text"], s["style"], k)
                    with open(path, "wb") as f:
                        f.write(audio)
                else:
                    pcm, mime, usage = synth_generate_content(model, voice, s["text"], s["style"], k)
                    rate = int(mime.split("rate=")[1].split(";")[0]) if "rate=" in mime else 24000
                    write_wav_from_pcm(pcm, path, rate)
                rec.update(ok=True, mime=mime, usage=usage, seconds=round(time.time() - t0, 1),
                           audio_seconds=seconds_of(path))
                print("ok", fn, usage, f"{rec['seconds']}s gen, {rec['audio_seconds']}s audio")
            except Exception as e:  # noqa: BLE001
                rec.update(ok=False, error=str(e)[:300])
                print("FAIL", fn, str(e)[:300])
            manifest.append(rec)
            time.sleep(0.3)
    with open(mpath, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=1, ensure_ascii=False)


main()
