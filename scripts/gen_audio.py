"""Generate the app's fixed audio with Gemini TTS (voice Sulafat).

Reads scripts/clips.json (from `node scripts/export-clips.mjs`), generates only
clips that are missing, whose text changed, or that were made on a fallback
model, encodes each to mono MP3 at 48 kbps with ffmpeg, and keeps
public/audio/manifest.json as the record.

Quota: each TTS model allows 100 requests per day on Tier 1 (found
2026-10-06). So clips are BATCHED: up to BATCH lines of the same delivery
style go into one request as separate paragraphs, with the style asking for
a clear silence between them; the returned audio is split at the silences
with ffmpeg. If the number of pieces does not match, every clip in that batch
is redone one by one. `--single` disables batching.

Delivery per clip kind goes in the style field (the 3.8 models read the text
verbatim; see research/gen_gemini_tts.py).

Usage:  python scripts/gen_audio.py [--only id-substring] [--model name] [--dry] [--single] [--max N]
"""
import base64
import glob
import hashlib
import json
import os
import re
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
TMP = os.path.join(ROOT, "research", "anatomy", "_tts_tmp")

PREFERRED = "gemini-3.8-flash-tts"
MODEL = os.environ.get("TTS_MODEL", PREFERRED)
VOICE = "Sulafat"
PRICE_PER_M = {"gemini-3.8-flash-tts": 9.0, "gemini-3.8-flash-lite-tts": 6.0}
BATCH = 6
BATCH_CHARS = 700
GAP = " Leave a clear silence of two full seconds between paragraphs; each paragraph is a separate line to be read on its own."

STYLES = {
    "term": "A warm, clear yoga teacher saying a single word or short name for a learner to repeat. Slightly slow, every sound distinct, a natural falling tone.",
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
    "cue-vinyasa": "A calm, warm yoga teacher cueing a flowing class. Unhurried teaching pace, gentle and encouraging.",
    "cue-yin": "A yoga teacher guiding a long, still hold. Very slow, soft, with space between phrases.",
    "cue-ashtanga": "A steady yoga teacher counting a class through a set sequence. Clear, even, unhurried.",
    "phrase-welcome": "A warm yoga teacher welcoming a class. Friendly, relaxed, unhurried.",
    "phrase-breath": "A calm yoga teacher cueing the breath. Slow and soft, with space between phrases.",
    "phrase-transitions": "A calm yoga teacher guiding the class between poses. Steady and clear.",
    "phrase-safety": "A kind yoga teacher giving safety notes and options. Clear, reassuring, unhurried.",
    "phrase-yin": "A yoga teacher guiding a long Yin hold. Very slow, soft, almost a whisper, with pauses.",
    "phrase-savasana": "A yoga teacher guiding final relaxation. Very slow and soft, almost a whisper, with long pauses.",
    "phrase-closing": "A warm yoga teacher closing a class. Gentle, grateful, unhurried.",
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


class QuotaExhausted(SystemExit):
    pass


def synth(text, style, k):
    body = {
        "model": MODEL,
        "input": [{"type": "user_input", "content": [{"type": "text", "text": text,
                                                         "annotations": [{"type": "speech_metadata", "style": style}]}]}],
        "response_format": {"type": "audio"},
        "generation_config": {"speech_config": [{"voice": VOICE}]},
    }
    for attempt in range(3):
        r = requests.post("https://generativelanguage.googleapis.com/v1beta/interactions",
                          headers={"x-goog-api-key": k, "Content-Type": "application/json"}, json=body, timeout=180)
        if r.status_code == 200:
            d = r.json()
            part = next(c for s in d["steps"] for c in s["content"] if c.get("type") == "audio")
            return base64.b64decode(part["data"]), d.get("usage", {}).get("total_output_tokens", 0)
        if r.status_code == 429 and "per day" in r.text:
            raise QuotaExhausted(f"daily quota exhausted for {MODEL}: {r.text[:160]}")
        if r.status_code in (429, 500, 503):
            time.sleep(3 * (attempt + 1))
            continue
        raise RuntimeError(f"{r.status_code} {r.text[:200]}")
    raise RuntimeError("gave up after retries")


TRIM = "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.15,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.3,areverse"


def encode(ff, wav_path, mp3_path, start=None, end=None):
    cmd = [ff, "-y", "-loglevel", "error"]
    if start is not None:
        cmd += ["-ss", f"{start:.3f}"]
    if end is not None:
        cmd += ["-to", f"{end:.3f}"]
    cmd += ["-i", wav_path, "-af", TRIM, "-ac", "1", "-b:a", "48k", mp3_path]
    subprocess.run(cmd, check=True)


def silences(ff, wav_path, min_len=0.75, noise="-38dB"):
    """Interior silences as (start, end) pairs, via ffmpeg silencedetect."""
    r = subprocess.run([ff, "-i", wav_path, "-af", f"silencedetect=noise={noise}:d={min_len}", "-f", "null", "-"],
                       capture_output=True, text=True)
    starts = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", r.stderr)]
    ends = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", r.stderr)]
    dur = re.search(r"Duration: (\d+):(\d+):([0-9.]+)", r.stderr)
    total = int(dur.group(1)) * 3600 + int(dur.group(2)) * 60 + float(dur.group(3)) if dur else None
    pairs = list(zip(starts, ends))
    # drop leading/trailing silence
    pairs = [(a, b) for a, b in pairs if a > 0.2 and (total is None or b < total - 0.2)]
    return pairs, total


def digest(clip):
    return hashlib.sha1(f"{VOICE}|{clip['text']}|{style_for(clip)}".encode("utf-8")).hexdigest()[:12]


def needs(clip, manifest):
    rec = manifest.get(clip["id"])
    if not rec or not os.path.exists(os.path.join(OUT, clip["id"] + ".mp3")):
        return True
    if rec.get("hash") != digest(clip):
        return True
    return MODEL == PREFERRED and rec.get("model") != PREFERRED


def save_manifest(manifest):
    with open(MANIFEST, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=1, ensure_ascii=False)


def record(manifest, clip, tok, batched):
    manifest[clip["id"]] = {"hash": digest(clip), "text": clip["text"], "kind": clip["kind"], "tokens": tok, "model": MODEL, "batched": batched}


def do_single(clip, k, ff, manifest):
    wav, tok = synth(clip["text"], style_for(clip), k)
    tmp = os.path.join(TMP, clip["id"] + ".wav")
    with open(tmp, "wb") as f:
        f.write(wav)
    encode(ff, tmp, os.path.join(OUT, clip["id"] + ".mp3"))
    os.remove(tmp)
    record(manifest, clip, tok, False)
    return tok


def do_batch(batch, k, ff, manifest):
    """One request for several clips. Returns tokens used, or None if the
    split did not line up (caller falls back to singles)."""
    text = "\n\n".join(c["text"] for c in batch)
    wav, tok = synth(text, style_for(batch[0]) + GAP, k)
    tmp = os.path.join(TMP, f"batch-{int(time.time()*1000)}.wav")
    with open(tmp, "wb") as f:
        f.write(wav)
    pairs, total = silences(ff, tmp)
    if len(pairs) != len(batch) - 1:
        # try a slightly looser detection before giving up
        pairs, total = silences(ff, tmp, min_len=0.5, noise="-35dB")
    if len(pairs) != len(batch) - 1:
        os.remove(tmp)
        return None
    cuts = [0.0] + [(a + b) / 2 for a, b in pairs] + [total]
    per = tok / len(batch)
    for c, a, b in zip(batch, cuts[:-1], cuts[1:]):
        encode(ff, tmp, os.path.join(OUT, c["id"] + ".mp3"), a, b)
        record(manifest, c, round(per), True)
    os.remove(tmp)
    return tok


def make_batches(todo):
    groups = {}
    for c in todo:
        groups.setdefault(style_for(c), []).append(c)
    batches = []
    for _, items in groups.items():
        cur, chars = [], 0
        for c in items:
            if cur and (len(cur) >= BATCH or chars + len(c["text"]) > BATCH_CHARS):
                batches.append(cur)
                cur, chars = [], 0
            cur.append(c)
            chars += len(c["text"])
        if cur:
            batches.append(cur)
    return batches


def main():
    global MODEL
    args = sys.argv[1:]
    only = args[args.index("--only") + 1] if "--only" in args else None
    if "--model" in args:
        MODEL = args[args.index("--model") + 1]
    max_req = int(args[args.index("--max") + 1]) if "--max" in args else 10_000
    dry = "--dry" in args
    single = "--single" in args
    with open(CLIPS, encoding="utf-8") as f:
        clips = json.load(f)
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(TMP, exist_ok=True)
    manifest = {}
    if os.path.exists(MANIFEST):
        with open(MANIFEST, encoding="utf-8") as f:
            manifest = json.load(f)
    todo = [c for c in clips if (not only or only in c["id"]) and needs(c, manifest)]
    batches = [[c] for c in todo] if single else make_batches(todo)
    print(f"model {MODEL}: {len(clips)} clips, {len(todo)} to generate in {len(batches)} requests")
    if dry:
        for b in batches[:40]:
            print(" ", len(b), "|", " / ".join(c["id"] for c in b)[:110])
        return
    k = key()
    ff = ffmpeg()
    tokens = 0
    requests_made = 0
    try:
        for i, b in enumerate(batches, 1):
            if requests_made >= max_req:
                print("stopping at --max requests")
                break
            try:
                if len(b) > 1:
                    tok = do_batch(b, k, ff, manifest)
                    requests_made += 1
                    if tok is None:
                        print(f"[{i}/{len(batches)}] split mismatch, redoing {len(b)} singly")
                        for c in b:
                            tokens += do_single(c, k, ff, manifest)
                            requests_made += 1
                            print(f"    ok {c['id']}", flush=True)
                    else:
                        tokens += tok
                        print(f"[{i}/{len(batches)}] ok batch of {len(b)}: {', '.join(c['id'] for c in b)[:100]}", flush=True)
                else:
                    tokens += do_single(b[0], k, ff, manifest)
                    requests_made += 1
                    print(f"[{i}/{len(batches)}] ok {b[0]['id']}", flush=True)
            except QuotaExhausted as e:
                print(e)
                break
            except Exception as e:  # noqa: BLE001
                print(f"[{i}/{len(batches)}] FAIL {', '.join(c['id'] for c in b)[:80]}: {str(e)[:160]}", flush=True)
            save_manifest(manifest)
    finally:
        save_manifest(manifest)
    price = PRICE_PER_M.get(MODEL, 9.0)
    print(f"done. {requests_made} requests, {tokens} audio tokens ≈ ${tokens * price / 1e6:.3f}")


if __name__ == "__main__":
    main()
