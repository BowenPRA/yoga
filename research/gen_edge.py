"""Baseline: the free Microsoft edge-tts voices the Dashboard uses today
(Aria), plus the newer multilingual ones, plus a Vietnamese voice."""
import asyncio
import json
import os
import sys

import edge_tts

sys.path.insert(0, os.path.dirname(__file__))
from samples import SAMPLES

OUT = os.path.join(os.path.dirname(__file__), "tts")

# (short id, voice, which languages it should attempt)
VOICES = [
    ("edge-aria", "en-US-AriaNeural", {"en"}),            # the Dashboard's current voice
    ("edge-ava", "en-US-AvaMultilingualNeural", {"en", "vi"}),
    ("edge-andrew", "en-US-AndrewMultilingualNeural", {"en", "vi"}),
    ("edge-sonia", "en-GB-SoniaNeural", {"en"}),
    ("edge-hoaimy", "vi-VN-HoaiMyNeural", {"vi"}),
]


async def one(text, voice, path, rate):
    comm = edge_tts.Communicate(text, voice, rate=rate)
    await comm.save(path)


async def main():
    os.makedirs(OUT, exist_ok=True)
    manifest = []
    for vid, voice, langs in VOICES:
        for s in SAMPLES:
            if s["lang"] not in langs:
                continue
            # edge-tts has no style prompt; the only lever is rate.
            rate = "-20%" if s["id"] == "savasana" else "-5%"
            fn = f"{vid}__{s['id']}.mp3"
            path = os.path.join(OUT, fn)
            try:
                await one(s["text"], voice, path, rate)
                ok = os.path.getsize(path) > 1000
            except Exception as e:  # noqa: BLE001
                print("FAIL", fn, e)
                ok = False
            manifest.append({"provider": vid, "voice": voice, "sample": s["id"], "file": fn, "ok": ok})
            print("ok" if ok else "FAIL", fn)
    with open(os.path.join(OUT, "manifest_edge.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=1, ensure_ascii=False)


asyncio.run(main())
