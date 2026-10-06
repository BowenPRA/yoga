"""Run the three imperfect cues through Gemini models via REST, with a JSON
response schema, the way the backend pattern does it."""
import json
import os
import sys
import time

import requests

sys.path.insert(0, os.path.dirname(__file__))
from coach_prompt import CUES, SYSTEM, user_prompt

OUT = os.path.join(os.path.dirname(__file__), "coach")
ENV = r"C:\Users\bowen\Documents\Y8Science-Backend\.env.local"
MODELS = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.5-flash-lite"]

SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "natural": {"type": "STRING"},
        "changes": {"type": "ARRAY", "items": {"type": "OBJECT", "properties": {
            "from": {"type": "STRING"}, "to": {"type": "STRING"}, "why_vi": {"type": "STRING"}},
            "required": ["from", "to", "why_vi"]}},
        "pronunciation": {"type": "ARRAY", "items": {"type": "OBJECT", "properties": {
            "word": {"type": "STRING"}, "tip_vi": {"type": "STRING"}}, "required": ["word", "tip_vi"]}},
        "praise_vi": {"type": "STRING"},
    },
    "required": ["natural", "changes", "pronunciation", "praise_vi"],
}


def key():
    with open(ENV, encoding="utf-8") as f:
        for line in f:
            if line.startswith("GEMINI_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"')
    raise SystemExit("no key")


def main():
    k = key()
    os.makedirs(OUT, exist_ok=True)
    for model in MODELS:
        results = []
        for c in CUES:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={k}"
            body = {
                "systemInstruction": {"parts": [{"text": SYSTEM}]},
                "contents": [{"parts": [{"text": user_prompt(c)}]}],
                "generationConfig": {
                    "temperature": 0.3,
                    "responseMimeType": "application/json",
                    "responseSchema": SCHEMA,
                },
            }
            t0 = time.time()
            r = requests.post(url, json=body, timeout=180)
            dt = round(time.time() - t0, 1)
            rec = {"cue": c["id"], "model": model, "seconds": dt}
            if r.status_code != 200:
                rec["error"] = f"{r.status_code} {r.text[:300]}"
                print("FAIL", model, c["id"], rec["error"])
            else:
                d = r.json()
                text = d["candidates"][0]["content"]["parts"][0]["text"]
                rec["usage"] = d.get("usageMetadata", {})
                try:
                    rec["result"] = json.loads(text)
                except json.JSONDecodeError:
                    rec["raw"] = text
                print("ok", model, c["id"], f"{dt}s", rec["usage"])
            results.append(rec)
        with open(os.path.join(OUT, f"{model}.json"), "w", encoding="utf-8") as f:
            json.dump(results, f, indent=1, ensure_ascii=False)


main()
