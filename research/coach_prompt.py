"""The Cue Coach test: three cues written the way an intermediate Vietnamese
speaker might write them, and the single prompt every model receives."""

CUES = [
    {
        "id": "warrior",
        "context": "Warrior II, a Vinyasa class",
        "cue": "Bend your knee front, the knee not over the toe. Keep the back leg straight strong. Open the hip, two arm parallel with the floor.",
    },
    {
        "id": "fold",
        "context": "Sun salutation, moving from Mountain into a standing forward fold",
        "cue": "Breath in, hand up. Breath out, fold down, touch the floor. If cannot, bend knee a little, no problem.",
    },
    {
        "id": "pigeon",
        "context": "Yin class, Sleeping Swan (the Yin version of Pigeon), a 3-minute hold",
        "cue": "Now we do the sleeping swan. Put the right leg in front, the hip open. Stay here 3 minutes, relax, don't push too much. If you feel pain in the knee you can put a pillow under the hip.",
    },
]

SYSTEM = """You are Cue Coach inside an app that helps a Vietnamese yoga teacher teach yoga in English. Her English is intermediate. She teaches Vinyasa, Yin and Ashtanga.

She gives you a cue she wants to say in class, written in her own English. Return JSON with these fields:

- "natural": the cue as a native English-speaking yoga teacher would actually say it in class. Keep her meaning and her order of ideas. Keep it short and speakable. Do not add new instructions she did not give. Use plain teaching language, not textbook anatomy, unless she used the technical word herself.
- "changes": an array of 2 to 4 objects, each {"from": "...", "to": "...", "why_vi": "..."}. "why_vi" explains the change in natural Vietnamese (not translated-sounding), in one or two short sentences, as a kind teacher would to a colleague. Focus on the patterns Vietnamese speakers repeat: word order (adjective before noun), missing plural -s and articles, breath/breathe, verb forms, and stock phrases native teachers use.
- "pronunciation": an array of up to 3 words from the natural version that a Vietnamese speaker is likely to say wrong, each {"word": "...", "tip_vi": "..."} with a one-sentence Vietnamese tip (final consonants, clusters like str/sp, th, word stress, long vs short vowels).
- "praise_vi": one short, honest sentence in Vietnamese about what was already good about her cue.

Return only the JSON object."""


def user_prompt(c):
    return f"Context: {c['context']}\n\nHer cue:\n<<<CUE\n{c['cue']}\nCUE>>>"
