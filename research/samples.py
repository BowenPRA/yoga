"""The shared test sentences for the TTS listening test. Every provider
reads exactly the same text so the comparison is fair."""

SAMPLES = [
    {
        "id": "warrior",
        "label": "Warrior II cue",
        "lang": "en",
        "text": "Bend your front knee so it stacks over your ankle. Reach your arms out wide, and gaze softly over your front fingertips. Stay here for five breaths.",
        "style": "You are a calm, warm yoga teacher cueing a class. Speak at an unhurried teaching pace with a gentle, encouraging tone.",
    },
    {
        "id": "savasana",
        "label": "Savasana line",
        "lang": "en",
        "text": "Let your whole body become heavy. Soften your jaw. Soften the space between your eyebrows. There is nothing left to do.",
        "style": "You are a yoga teacher guiding final relaxation. Speak very slowly and softly, almost a whisper, with long pauses between sentences.",
    },
    {
        "id": "sanskrit",
        "label": "Three Sanskrit pose names",
        "lang": "en",
        "text": "Virabhadrasana Two. Adho Mukha Svanasana. Utthita Trikonasana.",
        "style": "You are a yoga teacher saying Sanskrit pose names clearly for students to repeat. Say each name slowly and distinctly, with a pause after each one, using the standard pronunciation heard in yoga studios: vee-rah-bah-DRAH-sah-nah, AH-doh MOO-kah shvah-NAH-sah-nah, oot-TEE-tah trik-oh-NAH-sah-nah.",
    },
    {
        "id": "pali",
        "label": "Pali term",
        "lang": "en",
        "text": "Anicca. Impermanence. Everything that arises will also pass away.",
        "style": "You are a meditation teacher introducing a Pali word. Say 'anicca' as ah-NEE-cha, slowly and clearly, then continue in a quiet, reflective tone.",
    },
    {
        "id": "vietnamese",
        "label": "Vietnamese explanation",
        "lang": "vi",
        "text": "Cơ tứ đầu đùi là nhóm cơ ở mặt trước đùi, giúp bạn duỗi thẳng đầu gối.",
        "style": "Speak this Vietnamese sentence naturally, like a friendly teacher explaining anatomy, at a relaxed pace.",
    },
]
