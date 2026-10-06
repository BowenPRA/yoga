"""Check what each TTS clip actually says, by transcribing it with Gemini.
Catches a voice reading the style prompt aloud, skipping words, or saying
the Sanskrit wrongly."""
import base64
import glob
import json
import os
import sys
import wave

import requests

OUT = os.path.join(os.path.dirname(__file__), "tts")
ENV = r"C:\Users\bowen\Documents\Y8Science-Backend\.env.local"
MODEL = "gemini-3.8-flash"


def key():
    with open(ENV, encoding="utf-8") as f:
        for line in f:
            if line.startswith("GEMINI_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"')
    raise SystemExit("no key")


def duration(path):
    if path.endswith(".wav"):
        with wave.open(path) as w:
            return round(w.getnframes() / w.getframerate(), 1)
    # mp3: rough estimate from edge-tts's 48 kbps stream
    return round(os.path.getsize(path) * 8 / 48000, 1)


def main():
    k = key()
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={k}"
    files = sorted(glob.glob(os.path.join(OUT, "*.wav")) + glob.glob(os.path.join(OUT, "*.mp3")))
    only = sys.argv[1:]
    results = {}
    for p in files:
        name = os.path.basename(p)
        if only and not any(o in name for o in only):
            continue
        mime = "audio/wav" if p.endswith(".wav") else "audio/mp3"
        with open(p, "rb") as f:
            data = base64.b64encode(f.read()).decode()
        body = {
            "contents": [{"parts": [
                {"inlineData": {"mimeType": mime, "data": data}},
                {"text": "Transcribe this audio exactly, word for word, in the language spoken. "
                         "Output only the transcript. If you hear a speaker reading stage directions "
                         "or instructions about how to speak, transcribe those too."},
            ]}],
            "generationConfig": {"temperature": 0, "thinkingConfig": {"thinkingLevel": "low"}},
        }
        r = requests.post(url, json=body, timeout=120)
        if r.status_code != 200:
            text = f"ERROR {r.status_code} {r.text[:200]}"
        else:
            text = r.json()["candidates"][0]["content"]["parts"][0]["text"].strip()
        results[name] = {"seconds": duration(p), "transcript": text}
        print(f"{name} [{results[name]['seconds']}s]: {text[:160]}")
    out = os.path.join(OUT, "transcripts.json")
    old = {}
    if os.path.exists(out):
        with open(out, encoding="utf-8") as f:
            old = json.load(f)
    old.update(results)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(old, f, indent=1, ensure_ascii=False)


main()
