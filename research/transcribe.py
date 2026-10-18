"""Check what each TTS clip actually says, by transcribing it with Gemini.
Catches a voice reading the style prompt aloud, skipping words, or saying
the Sanskrit wrongly.

  python research/transcribe.py [name-substring ...]
      every wav/mp3 in research/tts (the listening tests), one request each.

  python research/transcribe.py --dir public/audio --ids ids.json [--batch 8] [--out t.json]
      the app's clips named in ids.json (a JSON list of clip ids), several
      clips per request (each labelled, answered as JSON), so checking a few
      hundred clips stays a modest number of calls. Results are merged into
      --out (default research/tts/transcripts.json), keyed by file name.
"""
import base64
import glob
import json
import os
import sys
import time
import wave

import requests

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(HERE, "tts")
ENVS = [os.path.join(ROOT, ".env.local"), r"C:\Users\bowen\Documents\Y8Science-Backend\.env.local"]
MODEL = "gemini-3.8-flash"
ASK = ("Transcribe this audio exactly, word for word, in the language spoken. "
       "Output only the transcript. If you hear a speaker reading stage directions "
       "or instructions about how to speak, transcribe those too.")


def key():
    for path in ENVS:
        if os.path.exists(path):
            with open(path, encoding="utf-8") as f:
                for line in f:
                    if line.startswith("GEMINI_API_KEY="):
                        return line.split("=", 1)[1].strip().strip('"')
    raise SystemExit("no key")


def duration(path):
    if path.endswith(".wav"):
        with wave.open(path) as w:
            return round(w.getnframes() / w.getframerate(), 1)
    # mp3: estimate from the 48 kbps the generators encode at
    return round(os.path.getsize(path) * 8 / 48000, 1)


def audio_part(p):
    mime = "audio/wav" if p.endswith(".wav") else "audio/mp3"
    with open(p, "rb") as f:
        return {"inlineData": {"mimeType": mime, "data": base64.b64encode(f.read()).decode()}}


def call(url, body):
    for attempt in range(4):
        r = requests.post(url, json=body, timeout=180)
        if r.status_code == 200:
            return r.json()["candidates"][0]["content"]["parts"][-1]["text"].strip()
        if r.status_code in (429, 500, 503) and attempt < 3:
            time.sleep(5 * (attempt + 1))
            continue
        return f"ERROR {r.status_code} {r.text[:200]}"


def one(url, p):
    body = {
        "contents": [{"parts": [audio_part(p), {"text": ASK}]}],
        "generationConfig": {"temperature": 0, "thinkingConfig": {"thinkingLevel": "low"}},
    }
    return call(url, body)


def many(url, paths):
    """Several clips in one request: each audio part follows its label, and
    the answer is a JSON object from label to transcript."""
    parts = []
    for i, p in enumerate(paths, 1):
        parts.append({"text": f"Clip {i}:"})
        parts.append(audio_part(p))
    parts.append({"text": (
        f"There are {len(paths)} separate audio clips above, each after its label. " + ASK +
        " A clip may pause between phrases: transcribe every clip completely, to its very end."
        f' Answer with a JSON object with exactly the keys "1" to "{len(paths)}", each the full transcript of'
        ' that clip only. If a clip is silent, give an empty string.')})
    body = {
        "contents": [{"parts": parts}],
        "generationConfig": {"temperature": 0, "responseMimeType": "application/json",
                             "thinkingConfig": {"thinkingLevel": "low"}},
    }
    text = call(url, body)
    if text.startswith("ERROR"):
        return [text] * len(paths)
    try:
        d = json.loads(text)
        return [str(d.get(str(i), "MISSING")).strip() for i in range(1, len(paths) + 1)]
    except ValueError:
        return [f"ERROR unparsable {text[:120]}"] * len(paths)


def arg(args, name, default=None):
    return args[args.index(name) + 1] if name in args else default


def main():
    args = sys.argv[1:]
    k = key()
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={k}"
    out = arg(args, "--out", os.path.join(OUT, "transcripts.json"))
    results = {}
    if "--dir" in args:
        folder = arg(args, "--dir")
        if not os.path.isabs(folder):
            folder = os.path.join(ROOT, folder)
        with open(arg(args, "--ids"), encoding="utf-8") as f:
            ids = json.load(f)
        size = int(arg(args, "--batch", "8"))
        files = [os.path.join(folder, i + ".mp3") for i in ids if os.path.exists(os.path.join(folder, i + ".mp3"))]
        calls = 0
        for s in range(0, len(files), size):
            chunk = files[s:s + size]
            texts = many(url, chunk) if len(chunk) > 1 else [one(url, chunk[0])]
            calls += 1
            for p, text in zip(chunk, texts):
                name = os.path.basename(p)
                results[name] = {"seconds": duration(p), "transcript": text}
                print(f"{name} [{results[name]['seconds']}s]: {text[:160]}", flush=True)
        print(f"{len(files)} clips in {calls} requests", flush=True)
    else:
        files = sorted(glob.glob(os.path.join(OUT, "*.wav")) + glob.glob(os.path.join(OUT, "*.mp3")))
        only = args
        for p in files:
            name = os.path.basename(p)
            if only and not any(o in name for o in only):
                continue
            text = one(url, p)
            results[name] = {"seconds": duration(p), "transcript": text}
            print(f"{name} [{results[name]['seconds']}s]: {text[:160]}")
    old = {}
    if os.path.exists(out):
        with open(out, encoding="utf-8") as f:
            old = json.load(f)
    old.update(results)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(old, f, indent=1, ensure_ascii=False)


main()
