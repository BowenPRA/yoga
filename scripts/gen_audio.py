"""Generate the app's fixed audio with Gemini TTS (voice Sulafat).

Reads scripts/clips.json (from `node scripts/export-clips.mjs`), generates only
clips that are missing, whose text changed, or that were made on a fallback
model, encodes each to mono MP3 at 48 kbps with ffmpeg, and keeps
public/audio/manifest.json as the record.

Quota: each TTS model has its own daily request cap (100 requests per day on
Tier 1 for gemini-3.8-flash-tts, found 2026-10-06). When the preferred model
is out of quota, run with `--model gemini-3.8-flash-lite-tts` (same voice,
slightly lower quality); those clips are redone the next time the preferred
model runs.

Delivery per clip kind goes in the style field (the 3.8 models read the text
verbatim; see research/gen_gemini_tts.py).

Usage:  python scripts/gen_audio.py [--only id-substring] [--model name] [--dry]
"""
import base64
import glob
import hashlib
import json
import os
import shutil
import subprocess
import sys
import time

import requests

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLIPS = os.path.join(ROOT, "scripts", "clips.json")
OUT = os.path.join(ROOT, "public", "audio")
MANIFEST = os.path.join(OUT, "manifest.json")
ENV = os.path.join(ROOT, ".env.local")

PREFERRED = "gemini-3.8-flash-tts"
MODEL = os.environ.get("TTS_MODEL", PREFERRED)
VOICE = "Sulafat"
PRICE_PER_M = {"gemini-3.8-flash-tts": 9.0, "gemini-3.8-flash-lite-tts": 6.0}

STYLES = {
    "term": "A warm, clear yoga teacher saying a single word for a learner to repeat. Slightly slow, every sound distinct, a natural falling tone.",
    "plain": "A warm yoga teacher saying a short phrase clearly for a learner to repeat. Slightly slow and natural.",
    "example": "A calm, warm yoga teacher cueing a class. Unhurried teaching pace, gentle and encouraging.",
    "pose-name": "A warm yoga teacher saying a pose name clearly for students to repeat. Slow, distinct, natural studio pronunciation.",
    "cue-alignment": "A calm, warm yoga teacher cueing a class. Unhurried teaching pace, gentle and encouraging.",
    "cue-transition": "A calm, warm yoga teacher guiding a transition. Steady, unhurried, clear.",
    "cue-breath": "A calm yoga teacher cueing the breath. Slow and soft, with space between phrases.",
    "cue-soften": "A yoga teacher inviting the class to soften. Very gentle, slow, almost a whisper, with pauses.",
    "cue-safety": "A kind yoga teacher giving a safety note. Clear and reassuring, unhurried.",
    "modification": "A kind yoga teacher offering an easier option. Warm, reassuring, unhurried.",
    "safety": "A kind yoga teacher giving a safety note. Clear and reassuring, unhurried.",
}


def key():
    for path in (ENV, r"C:\Users\bowen\Documents\Y8Science-Backend\.env.local"):
        if os.path.exists(path):
            with open(path, encoding="utf-8") as f:
                for line in f:
                    if line.startswith("GEMINI_API_KEY="):
                        return line.split("=", 1)[1].strip().strip('"')
    raise SystemExit("GEMINI_API_KEY not found")


def ffmpeg():
    p = shutil.which("ffmpeg")
    if p:
        return p
    hits = glob.glob(os.path.expandvars(r"%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg*\**\ffmpeg.exe"), recursive=True)
    if hits:
        return hits[0]
    raise SystemExit("ffmpeg not found")


def style_for(clip):
    s = STYLES.get(clip["kind"], STYLES["cue-alignment"])
    if clip.get("lang") == "sa" and clip.get("say"):
        s += f" Pronounce it the way it is said in yoga studios: {clip['say']}."
    return s


def synth(clip, k):
    body = {
        "model": MODEL,
        "input": [{"type": "user_input", "content": [{"type": "text", "text": clip["text"],
                                                         "annotations": [{"type": "speech_metadata", "style": style_for(clip)}]}]}],
        "response_format": {"type": "audio"},
        "generation_config": {"speech_config": [{"voice": VOICE}]},
    }
    for attempt in range(3):
        r = requests.post("https://generativelanguage.googleapis.com/v1beta/interactions",
                          headers={"x-goog-api-key": k, "Content-Type": "application/json"}, json=body, timeout=120)
        if r.status_code == 200:
            d = r.json()
            part = next(c for s in d["steps"] for c in s["content"] if c.get("type") == "audio")
            return base64.b64decode(part["data"]), d.get("usage", {}).get("total_output_tokens", 0)
        if r.status_code == 429 and "per day" in r.text:
            raise SystemExit(f"daily quota exhausted for {MODEL}: {r.text[:160]}")
        if r.status_code in (429, 500, 503):
            time.sleep(3 * (attempt + 1))
            continue
        raise RuntimeError(f"{r.status_code} {r.text[:200]}")
    raise RuntimeError("gave up after retries")


def to_mp3(wav_bytes, mp3_path, ff):
    tmp = mp3_path + ".wav"
    with open(tmp, "wb") as f:
        f.write(wav_bytes)
    # Trim leading/trailing silence lightly, mono, 48 kbps: small and fine on a phone.
    subprocess.run([ff, "-y", "-loglevel", "error", "-i", tmp,
                    "-af", "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.15,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.3,areverse",
                    "-ac", "1", "-b:a", "48k", mp3_path], check=True)
    os.remove(tmp)


def digest(clip):
    return hashlib.sha1(f"{VOICE}|{clip['text']}|{style_for(clip)}".encode("utf-8")).hexdigest()[:12]


def needs(clip, manifest):
    rec = manifest.get(clip["id"])
    if not rec or not os.path.exists(os.path.join(OUT, clip["id"] + ".mp3")):
        return True
    if rec.get("hash") != digest(clip):
        return True
    # Made on a fallback model while the preferred one was out of quota.
    return MODEL == PREFERRED and rec.get("model") != PREFERRED


def main():
    global MODEL
    args = sys.argv[1:]
    only = args[args.index("--only") + 1] if "--only" in args else None
    if "--model" in args:
        MODEL = args[args.index("--model") + 1]
    dry = "--dry" in args
    with open(CLIPS, encoding="utf-8") as f:
        clips = json.load(f)
    os.makedirs(OUT, exist_ok=True)
    manifest = {}
    if os.path.exists(MANIFEST):
        with open(MANIFEST, encoding="utf-8") as f:
            manifest = json.load(f)
    todo = [c for c in clips if (not only or only in c["id"]) and needs(c, manifest)]
    print(f"model {MODEL}: {len(clips)} clips, {len(todo)} to generate")
    if dry:
        for c in todo:
            print(" ", c["id"], "|", c["text"][:60])
        return
    k = key()
    ff = ffmpeg()
    tokens = 0
    for i, c in enumerate(todo, 1):
        try:
            wav, tok = synth(c, k)
            to_mp3(wav, os.path.join(OUT, c["id"] + ".mp3"), ff)
            tokens += tok
            manifest[c["id"]] = {"hash": digest(c), "text": c["text"], "kind": c["kind"], "tokens": tok, "model": MODEL}
            print(f"[{i}/{len(todo)}] ok {c['id']} ({tok} tok)", flush=True)
        except SystemExit as e:
            print(e)
            break
        except Exception as e:  # noqa: BLE001
            print(f"[{i}/{len(todo)}] FAIL {c['id']}: {str(e)[:160]}", flush=True)
        with open(MANIFEST, "w", encoding="utf-8") as f:
            json.dump(manifest, f, indent=1, ensure_ascii=False)
    price = PRICE_PER_M.get(MODEL, 9.0)
    print(f"done. {tokens} audio tokens ≈ ${tokens * price / 1e6:.3f}")


if __name__ == "__main__":
    main()
