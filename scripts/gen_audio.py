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
                                    [--priority scripts/priority.json]

--priority: a JSON list of clip ids (the lessons' clips, from export-clips)
that are batched among themselves and generated before everything else.
A batch whose silences do not split cleanly is halved and retried, so a
mismatch costs two requests rather than six.
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
BATCH_CHARS = 520  # long lines get fewer per request; short names get six
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
    # Phrases tab. The long silences of a script (savasana, meditation) come
    # from each line's pauseAfter in the app's "lead it" mode, not from the
    # clip: inside a clip, pauses between sentences stay shorter than the gap
    # the batch splitter cuts on.
    "phrase-welcome": "A warm yoga teacher welcoming a class. Friendly, relaxed, unhurried.",
    "phrase-injuries-and-consent": "A kind, attentive yoga teacher speaking quietly to one student before or during class. Warm and respectful, unhurried, never clinical.",
    "phrase-breath": "A calm yoga teacher cueing the breath. Slow and soft, with space between phrases.",
    "phrase-transitions": "A calm yoga teacher guiding the class between poses. Steady and clear.",
    "phrase-props-and-options": "A warm yoga teacher offering props and easier or stronger options. Encouraging and relaxed, unhurried.",
    "phrase-safety": "A kind yoga teacher giving safety notes and options. Clear, reassuring, unhurried.",
    "phrase-yin": "A yoga teacher guiding a long Yin hold. Very slow and soft, almost a whisper, with a gentle pause between sentences.",
    "phrase-ashtanga-count": "A steady Ashtanga teacher leading a counted class. Each line opens with a Sanskrit count or gaze word, said the way Mysore-trained teachers say it (Ekam EH-kum, Dve DVAY, Trini TREE-nee, Chatvari chut-VAH-ree, Pancha PUN-chuh, Shat SHUT, Sapta SUP-tuh, Ashtau USH-tow, Nava NUH-vuh, Dasha DUH-shuh; the vimshatih numbers end in a soft echo, VIM-shuh-tee-hee; drishti DRISH-tee), then the movement in plain English. Clear and even, the same unhurried rhythm for every line.",
    "phrase-ashtanga-count-chant": "A yoga teacher chanting a traditional Sanskrit invocation at the start or end of an Ashtanga class. Slow, even and devotional on a calm, steady pitch, every syllable distinct, not sung like a song.",
    "phrase-pranayama": "A calm yoga teacher guiding a breathing practice. Slow, soft and even, with a gentle pause between sentences.",
    "phrase-savasana": "A yoga teacher guiding final relaxation. Very slow and soft, almost a whisper, with a gentle pause between sentences.",
    "phrase-closing": "A warm yoga teacher closing a class. Gentle, grateful, unhurried.",
    "phrase-after-class": "A friendly yoga teacher chatting with a student after class. Natural, warm, an easy conversational pace.",
    "phrase-meditation": "A meditation teacher guiding a silent vipassana sit. Very slow, soft and low, calm and plain, never sing-song, with a gentle pause between sentences.",
    "phrase-philosophy-in-class": "A thoughtful yoga teacher sharing one short idea with the class. Warm, clear and unhurried; Sanskrit words said as in a yoga studio.",
    "phrase-sanskrit-terms": "A warm yoga teacher saying a single Sanskrit word for a learner to repeat. Slow and clear, every syllable distinct, pronounced as in a yoga studio, following the respelling given.",
    "phrase-sanskrit-terms-inclass": "A warm yoga teacher saying one short sentence to a class. Unhurried and clear; the Sanskrit word in it is said as in a yoga studio.",
    "phrase-pali-terms": "A meditation teacher saying a single Pali word for a learner to repeat. Slow and clear, every syllable distinct, pronounced as in a vipassana meditation hall, following the respelling given.",
    "phrase-pali-terms-inclass": "A calm meditation teacher saying one short sentence to a group. Unhurried and soft; the Pali word in it is said as in a vipassana meditation hall.",
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
    """The delivery for a clip. A Sanskrit or Pali clip carries its own
    respelling, so each one is its own style (and its own request: the batcher
    groups by style). The Sanskrit sentence is unchanged so existing pose-name
    clips keep their hash."""
    s = STYLES.get(clip["kind"], STYLES["cue-alignment"])
    if clip.get("lang") == "sa" and clip.get("say"):
        s += f" Pronounce it the way it is said in yoga studios: {clip['say']}."
    elif clip.get("lang") == "pi" and clip.get("say"):
        s += f" Pronounce it the way it is said in vipassana meditation halls: {clip['say']}."
    return s


class QuotaExhausted(SystemExit):
    pass


def synth(text, style, k):
    if MODEL.startswith("gemini-2.5"):
        return synth_legacy(text, style, k)
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


def synth_legacy(text, style, k):
    """The 2.5 TTS models: generateContent with speechConfig, style in the
    prompt, raw 16-bit PCM at 24 kHz back. A fallback for a day when both 3.8
    models have hit their cap; the manifest records the model, so the next
    Flash run replaces these."""
    import io
    import wave
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={k}"
    body = {
        "contents": [{"parts": [{"text": f"{style}\n\nSay exactly this and nothing else:\n{text}"}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": VOICE}}},
        },
    }
    for attempt in range(3):
        r = requests.post(url, json=body, timeout=180)
        if r.status_code == 200:
            d = r.json()
            part = d["candidates"][0]["content"]["parts"][0]["inlineData"]
            pcm = base64.b64decode(part["data"])
            rate = 24000
            m = re.search(r"rate=(\d+)", part.get("mimeType", ""))
            if m:
                rate = int(m.group(1))
            buf = io.BytesIO()
            with wave.open(buf, "wb") as w:
                w.setnchannels(1)
                w.setsampwidth(2)
                w.setframerate(rate)
                w.writeframes(pcm)
            return buf.getvalue(), d.get("usageMetadata", {}).get("candidatesTokenCount", 0)
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


def silences(ff, wav_path, min_len=0.3, noise="-38dB"):
    """Interior silences as (start, end) pairs, via ffmpeg silencedetect."""
    r = subprocess.run([ff, "-i", wav_path, "-af", f"silencedetect=noise={noise}:d={min_len}", "-f", "null", "-"],
                       capture_output=True, text=True)
    starts = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", r.stderr)]
    ends = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", r.stderr)]
    dur = re.search(r"Duration: (\d+):(\d+):([0-9.]+)", r.stderr)
    total = int(dur.group(1)) * 3600 + int(dur.group(2)) * 60 + float(dur.group(3)) if dur else None
    pairs = list(zip(starts, ends))
    pairs = [(a, b) for a, b in pairs if a > 0.2 and (total is None or b < total - 0.2)]
    return pairs, total


def pick_gaps(pairs, n):
    """Choose the n longest silences as the gaps between items, if they stand
    clearly apart from the sentence pauses. Returns them in time order or None."""
    if len(pairs) < n:
        return None
    ranked = sorted(pairs, key=lambda p: p[1] - p[0], reverse=True)
    chosen, rest = ranked[:n], ranked[n:]
    shortest_chosen = min(b - a for a, b in chosen)
    longest_rest = max((b - a for a, b in rest), default=0.0)
    if shortest_chosen < 0.45 or (rest and shortest_chosen < longest_rest * 1.25):
        return None
    return sorted(chosen)


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


def copy_clip(src_id, clip, manifest):
    """The same line said the same way is one recording: copy it under the
    new id instead of spending a request on it."""
    shutil.copyfile(os.path.join(OUT, src_id + ".mp3"), os.path.join(OUT, clip["id"] + ".mp3"))
    rec = dict(manifest[src_id])
    rec.update({"text": clip["text"], "kind": clip["kind"], "copyOf": src_id})
    manifest[clip["id"]] = rec


def reuse(todo, manifest, dry=False):
    """Split the work into clips that must be synthesised and twins that can
    be copied: from a clip already made (same hash, acceptable model), or
    from the first clip in this run with the same hash. A dry run only counts."""
    done = {}
    for cid, rec in manifest.items():
        if not os.path.exists(os.path.join(OUT, cid + ".mp3")):
            continue
        if MODEL == PREFERRED and rec.get("model") != PREFERRED:
            continue
        done.setdefault(rec.get("hash"), cid)
    fresh, twins, seen = [], [], {}
    for c in todo:
        h = digest(c)
        if h in done and done[h] != c["id"]:
            if not dry:
                copy_clip(done[h], c, manifest)
        elif h in seen:
            twins.append((seen[h], c))
        else:
            seen[h] = c["id"]
            fresh.append(c)
    return fresh, twins


def copy_twins(twins, manifest):
    for src_id, c in twins:
        if src_id in manifest and os.path.exists(os.path.join(OUT, src_id + ".mp3")) and needs(c, manifest):
            copy_clip(src_id, c, manifest)


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
    gaps = pick_gaps(pairs, len(batch) - 1)
    if gaps is None or total is None:
        os.remove(tmp)
        return None
    cuts = [0.0] + [(a + b) / 2 for a, b in gaps] + [total]
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


def run_batch(b, k, ff, manifest, counter):
    """Generate a batch; on a split mismatch halve it and retry, down to
    singles. Returns the audio tokens used. `counter` is a one-item list."""
    if len(b) == 1:
        tok = do_single(b[0], k, ff, manifest)
        counter[0] += 1
        print(f"    ok {b[0]['id']}", flush=True)
        return tok
    tok = do_batch(b, k, ff, manifest)
    counter[0] += 1
    if tok is not None:
        return tok
    half = len(b) // 2
    print(f"    split mismatch on {len(b)}, retrying as {half} + {len(b) - half}", flush=True)
    return run_batch(b[:half], k, ff, manifest, counter) + run_batch(b[half:], k, ff, manifest, counter)


def main():
    global MODEL
    args = sys.argv[1:]
    only = args[args.index("--only") + 1] if "--only" in args else None
    if "--model" in args:
        MODEL = args[args.index("--model") + 1]
    max_req = int(args[args.index("--max") + 1]) if "--max" in args else 10_000
    dry = "--dry" in args
    single = "--single" in args
    priority = []
    if "--priority" in args:
        with open(args[args.index("--priority") + 1], encoding="utf-8") as f:
            priority = json.load(f)
    with open(CLIPS, encoding="utf-8") as f:
        clips = json.load(f)
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(TMP, exist_ok=True)
    manifest = {}
    if os.path.exists(MANIFEST):
        with open(MANIFEST, encoding="utf-8") as f:
            manifest = json.load(f)
    todo = [c for c in clips if (not only or only in c["id"]) and needs(c, manifest)]
    before = len(todo)
    todo, twins = reuse(todo, manifest, dry)
    if before - len(todo) - len(twins):
        print(f"{before - len(todo) - len(twins)} clips copied from identical lines already recorded")
        if not dry:
            save_manifest(manifest)
    if twins:
        print(f"{len(twins)} clips will be copied from identical lines in this run")
    first = [c for c in todo if c["id"] in set(priority)]
    rest = [] if "--priority-only" in args else [c for c in todo if c["id"] not in set(priority)]
    if single:
        batches = [[c] for c in first + rest]
    else:
        batches = make_batches(first) + make_batches(rest)
    print(f"model {MODEL}: {len(clips)} clips, {len(todo)} to generate in {len(batches)} requests ({len(first)} lesson clips first)")
    if dry:
        for b in batches[:40]:
            print(" ", len(b), "|", " / ".join(c["id"] for c in b)[:110])
        return
    k = key()
    ff = ffmpeg()
    tokens = 0
    counter = [0]
    try:
        for i, b in enumerate(batches, 1):
            if counter[0] >= max_req:
                print("stopping at --max requests")
                break
            try:
                print(f"[{i}/{len(batches)}] batch of {len(b)}: {', '.join(c['id'] for c in b)[:100]}", flush=True)
                tokens += run_batch(b, k, ff, manifest, counter)
            except QuotaExhausted as e:
                print(e)
                break
            except Exception as e:  # noqa: BLE001
                print(f"[{i}/{len(batches)}] FAIL {', '.join(c['id'] for c in b)[:80]}: {str(e)[:160]}", flush=True)
            save_manifest(manifest)
    finally:
        copy_twins(twins, manifest)
        save_manifest(manifest)
    price = PRICE_PER_M.get(MODEL, 9.0)
    left = [c for c in clips if needs(c, manifest)]
    print(f"done. {counter[0]} requests, {tokens} audio tokens ≈ ${tokens * price / 1e6:.3f}; {len(left)} clips still to do")


if __name__ == "__main__":
    main()
