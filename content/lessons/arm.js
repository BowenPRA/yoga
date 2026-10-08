/**
 * Lesson: the arm and hand. Same deck format as hip.js: meet each term on
 * the figure, hear it, hear it inside a real cue, then a check. The story:
 * spreading the fingers and pressing through the knuckles, wrists under
 * shoulders, a microbend in the elbows, "hug your elbows in" in Chaturanga,
 * the triceps in Plank, and what to say when a student's wrists hurt (the
 * `care` line on each term slide, audio id `arm__care-<term>`).
 *
 * Figure windows are [x, y, w, h] in the figure's own pixels (muscles) or
 * viewBox units (skeleton). The bones are the skeleton's left arm (the
 * viewer's right); the muscles are each figure's surface side: the viewer's
 * left arm on the front figure, the viewer's right arm on the back figure.
 */
const HAND = [270, 330, 190, 165]
const FOREARM = [255, 290, 190, 160]
const ELBOW = [225, 225, 200, 170]
const UPPER = [205, 148, 220, 190]
const ARM = [200, 150, 300, 340]
const FRONT = [-30, 296, 330, 300]
const BACK = [296, 280, 340, 300]
const BACK_UPPER = [296, 250, 300, 240]
const BACK_FOREARM = [330, 380, 290, 240]

export const armLesson = {
  id: 'arm',
  region: 'arm',
  title: { en: 'Arm and hand', vi: 'Tay và bàn tay' },
  lead: {
    en: 'Nine words for weight on the hands: the fingers, wrists and elbows, and the arm muscles that hold your students up in Plank and Downward Dog.',
    vi: 'Chín từ cho các tư thế chống tay: ngón tay, cổ tay, khuỷu tay, và các cơ tay giữ học viên trong Plank và Chó úp mặt.',
  },
  how: {
    en: 'Meet each word on the figure, hear it, label it, build a cue with it, then say it.',
    vi: 'Gặp từng từ trên hình, nghe, gắn nhãn, ghép câu cue với nó, rồi nói thử.',
  },
  minutes: 15,
  pose: 'plank',
  terms: ['hands', 'wrist', 'forearm-bones', 'elbow', 'upper-arm-bone', 'forearm-flexors', 'biceps-brachii', 'forearm-extensors', 'triceps-brachii'],

  slides: [
    { type: 'intro' },

    // ── the hands on the mat ──────────────────────────────────────────────
    {
      type: 'term', term: 'hands',
      figure: { kind: 'skeleton', window: HAND, highlight: ['hands'] },
      cues: ['hands__cue-1', 'hands__cue-3'],
      care: { id: 'arm__care-hands', en: 'If your hands tingle, come out, shake them out and rest a moment.', vi: 'Nếu bàn tay bị tê, thoát thế, lắc tay cho lỏng và nghỉ một chút.' },
    },
    {
      type: 'term', term: 'wrist',
      figure: { kind: 'skeleton', window: HAND, highlight: ['wrist'] },
      cues: ['wrist__cue-3', 'wrist__cue-2'],
      care: { id: 'arm__care-wrist', en: 'If your wrists are sore, fold the edge of your mat under the heels of your hands.', vi: 'Nếu cổ tay đau, gấp mép thảm lại và kê dưới gốc bàn tay.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'hotspot', id: 'arm-hotspot-knuckles',
        figure: { kind: 'skeleton', window: HAND },
        clip: 'hands__cue-2',
        prompt: { vi: 'Nghe câu cue. Học viên sẽ ấn xuống ở đâu? Chạm vào hình.', en: 'Listen to the cue. Where will your students press down? Tap the figure.' },
        accept: ['hands'],
        reveal: ['hands'],
        explain: {
          vi: 'Gốc ngón trỏ, trên bàn tay. Ấn ở đây và qua các khớp ngón khác chia trọng lượng ra khắp bàn tay, để cổ tay không phải gánh hết.',
          en: 'The base of the index finger, on the hand. Pressing here and through the other knuckles spreads the weight across the hand, so the wrist doesn’t carry it all.',
        },
      },
    },

    // ── forearm, elbow, upper arm ─────────────────────────────────────────
    {
      type: 'term', term: 'forearm-bones',
      figure: { kind: 'skeleton', window: FOREARM, highlight: ['forearm-bones'] },
      cues: ['forearm-bones__cue-1', 'forearm-bones__cue-2'],
      care: { id: 'arm__care-forearm-bones', en: 'If your forearms are sore on the hard floor, fold your mat over or slide a blanket underneath.', vi: 'Nếu cẳng tay bị cấn đau trên sàn cứng, gấp đôi thảm hoặc kê thêm chăn bên dưới.' },
    },
    {
      type: 'term', term: 'elbow',
      figure: { kind: 'skeleton', window: ELBOW, highlight: ['elbow'] },
      cues: ['elbow__cue-1', 'elbow__cue-3'],
      care: { id: 'arm__care-elbow', en: 'If your elbows ache, don’t lock them. Keep a microbend.', vi: 'Nếu khuỷu tay đau, đừng khoá khuỷu. Giữ khuỷu tay hơi chùng.' },
    },
    {
      type: 'term', term: 'upper-arm-bone',
      figure: { kind: 'skeleton', window: UPPER, highlight: ['upper-arm-bone'] },
      cues: ['upper-arm-bone__cue-2', 'upper-arm-bone__cue-1'],
      care: { id: 'arm__care-upper-arm-bone', en: 'If your arms get tired, rest in Child’s Pose and join us again when you’re ready.', vi: 'Nếu tay mỏi, nghỉ ở tư thế Em bé, rồi tập tiếp cùng cả lớp khi bạn sẵn sàng.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'arm-label-bones',
        figure: { kind: 'skeleton', window: ARM, pad: [40, 40], font: 11 },
        prompt: { vi: 'Gắn mỗi tên vào đúng chỗ trên cánh tay.', en: 'Put each name in its place on the arm.' },
        pins: [
          { id: 'upper-arm-bone', x: 380, y: 150, side: 'above', to: [303, 235] },
          { id: 'elbow', x: 345, y: 300, side: 'right', to: [321, 306] },
          { id: 'forearm-bones', x: 368, y: 362, side: 'right', to: [338, 362] },
          { id: 'wrist', x: 280, y: 490, side: 'below', to: [350, 416] },
          { id: 'hands', x: 430, y: 490, side: 'below', to: [382, 458] },
        ],
        bank: ['hands', 'wrist', 'forearm-bones', 'elbow', 'upper-arm-bone', 'ankle'],
        credits: { labelled: ['hands', 'wrist', 'forearm-bones', 'elbow', 'upper-arm-bone'] },
      },
    },

    // ── the muscles: front and back ───────────────────────────────────────
    {
      type: 'term', term: 'forearm-flexors',
      figure: { kind: 'front', window: FRONT, highlight: ['forearm-flexors'] },
      cues: ['forearm-flexors__cue-1', 'forearm-flexors__cue-2'],
      care: { id: 'arm__care-forearm-flexors', en: 'If your forearms burn, come down to your knees and shake out your wrists.', vi: 'Nếu cẳng tay nóng rát, hạ gối xuống và lắc nhẹ cổ tay.' },
    },
    {
      type: 'term', term: 'biceps-brachii',
      figure: { kind: 'front', window: FRONT, highlight: ['biceps-brachii'] },
      cues: ['biceps-brachii__cue-1', 'biceps-brachii__cue-2'],
      care: { id: 'arm__care-biceps-brachii', en: 'If you feel a strain at the front of your arms with your hands behind your back, hold your elbows instead.', vi: 'Nếu thấy căng ở bắp tay trước khi đưa tay ra sau lưng, hãy nắm lấy hai khuỷu tay thay vào đó.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'arm-label-front',
        figure: { kind: 'front', window: FRONT, pad: [46, 46], font: 13 },
        prompt: { vi: 'Mặt trước của cánh tay.', en: 'The front of the arm.' },
        pins: [
          { id: 'biceps-brachii', x: 220, y: 296, side: 'above', to: [162, 385] },
          { id: 'forearm-flexors', x: 200, y: 596, side: 'below', to: [118, 505] },
        ],
        bank: ['biceps-brachii', 'forearm-flexors', 'triceps-brachii', 'forearm-extensors'],
        credits: { labelled: ['biceps-brachii', 'forearm-flexors'] },
      },
    },
    {
      type: 'term', term: 'forearm-extensors',
      figure: { kind: 'back', window: BACK_FOREARM, highlight: ['forearm-extensors'] },
      cues: ['forearm-extensors__cue-1'],
      care: { id: 'arm__care-forearm-extensors', en: 'If the top of your forearm aches, grip the mat a little less.', vi: 'Nếu mặt ngoài cẳng tay mỏi đau, bấm ngón tay xuống thảm nhẹ hơn một chút.' },
    },
    {
      type: 'term', term: 'triceps-brachii',
      figure: { kind: 'back', window: BACK_UPPER, highlight: ['triceps-brachii'] },
      cues: ['triceps-brachii__cue-1', 'triceps-brachii__cue-2'],
      care: { id: 'arm__care-triceps-brachii', en: 'If your arms shake, that’s okay. Lower your knees whenever you need to.', vi: 'Nếu tay run, không sao cả. Hạ gối xuống bất cứ khi nào bạn cần.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'arm-label-back',
        figure: { kind: 'back', window: BACK, pad: [46, 46], font: 13 },
        prompt: { vi: 'Mặt sau của cánh tay.', en: 'The back of the arm.' },
        pins: [
          { id: 'triceps-brachii', x: 540, y: 280, side: 'above', to: [452, 355] },
          { id: 'forearm-extensors', x: 545, y: 580, side: 'below', to: [482, 505] },
        ],
        bank: ['triceps-brachii', 'forearm-extensors', 'biceps-brachii', 'forearm-flexors'],
        credits: { labelled: ['triceps-brachii', 'forearm-extensors'] },
      },
    },

    // ── using the words to teach ──────────────────────────────────────────
    {
      type: 'activity',
      activity: {
        type: 'sort', id: 'arm-sort-upward-plank', pose: 'upward-plank',
        prompt: { vi: 'Trong Tấm ván ngược, cơ nào đang làm việc, cơ nào đang được kéo giãn?', en: 'In Upward Plank, which muscles are working and which are stretching?' },
        bins: [
          { id: 'working', vi: 'Đang làm việc', en: 'Working' },
          { id: 'stretching', vi: 'Đang kéo giãn', en: 'Stretching' },
        ],
        cards: [
          { term: 'triceps-brachii', bin: 'working' },
          { term: 'gluteus-maximus', bin: 'working' },
          { term: 'biceps-brachii', bin: 'stretching' },
          { term: 'pectoralis-major', bin: 'stretching' },
        ],
        explain: {
          vi: 'Bắp tay sau giữ khuỷu thẳng và đẩy sàn; cơ mông nâng hông lên. Hai tay ở sau lưng nên bắp tay trước và cơ ngực được kéo dài.',
          en: 'The triceps keep the elbows straight and push the floor away; the glutes lift the hips. With the hands behind you, the biceps and the chest lengthen.',
        },
      },
    },
    { type: 'pose', pose: 'plank' },
    {
      type: 'activity',
      activity: {
        type: 'predict', id: 'arm-predict-heel',
        prompt: { vi: 'Trong Chó úp mặt, một học viên dồn hết trọng lượng vào gốc bàn tay. Họ sẽ cảm thấy ở đâu?', en: 'In Downward Dog, a student puts all their weight into the heels of their hands. Where will they feel it?' },
        options: [
          { id: 'wrists', en: 'In the wrists', vi: 'Ở cổ tay' },
          { id: 'fingers', en: 'In the fingertips', vi: 'Ở đầu ngón tay' },
          { id: 'elbows', en: 'In the elbows', vi: 'Ở khuỷu tay' },
          { id: 'thighs', en: 'In the back of the thighs', vi: 'Ở mặt sau đùi' },
        ],
        correct: 'wrists',
        explain: {
          vi: 'Ở cổ tay. Gốc bàn tay nằm ngay dưới cổ tay, nên khi dồn hết sức nặng vào đó, cổ tay gập hết mức và gánh cả cơ thể. Ấn qua các khớp ngón và đầu ngón tay để chia bớt. Đây là câu bạn nói:',
          en: 'In the wrists. The heel of the hand sits right under the wrist, so all that weight bends the wrist as far as it goes. Pressing through the knuckles and fingertips shares the load. This is what to say:',
        },
        then: { clip: 'downward-dog__safe-1' },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'order', id: 'arm-order-plank', pose: 'plank',
        prompt: { vi: 'Sắp xếp các câu cue vào Plank theo đúng thứ tự. Chạm loa để nghe từng câu.', en: 'Put the cues for Plank in order. Tap the speaker to hear each one.' },
        steps: ['plank__cue-1', 'plank__cue-2', 'plank__cue-4', 'plank__cue-7', 'plank__cue-9'],
        explain: {
          vi: 'Từ Chó úp mặt, đưa vai thẳng trên cổ tay. Rồi đến bàn tay, rồi cả thân thành một đường. Giữ vài nhịp thở, và thoát thế khi thở ra.',
          en: 'From Downward Dog, the shoulders come over the wrists. Then the hands, then the whole body in one line. Stay a few breaths, and leave on an exhale.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'chain', id: 'arm-chain-knuckles',
        prompt: { vi: 'Ghép câu cue. Ý: “Xoè ngón tay và ấn qua các khớp ngón để giảm trọng lượng dồn lên cổ tay.”', en: 'Build the cue. Meaning: spread the fingers and press through the knuckles to take weight off the wrists.' },
        pieces: ['Spread your fingers', 'and press', 'through your knuckles', 'to take weight', 'off your wrists.'],
        traps: ['into your palms', 'onto your wrists.'],
        clip: 'wrist__cue-1',
        credits: { cued: ['wrist', 'hands'] },
        explain: {
          vi: '“Knuckles” là các khớp ngón tay, chỗ ngón tay nối với bàn tay. “Off” (ra khỏi) ngược với “onto” (dồn lên).',
          en: '“Knuckles” are where the fingers meet the hand. “Off” is the opposite of “onto”.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'chain', id: 'arm-chain-hug',
        prompt: { vi: 'Ghép câu cue. Ý: “Ôm khuỷu tay sát vào sườn khi bạn hạ xuống.”', en: 'Build the cue. Meaning: hug your elbows in toward your ribs as you lower.' },
        pieces: ['Hug', 'your elbows', 'in toward', 'your ribs', 'as you lower.'],
        traps: ['out to the sides', 'as you lift.'],
        clip: 'triceps-brachii__cue-2',
        credits: { cued: ['triceps-brachii', 'elbow'] },
        explain: {
          vi: 'Đây là cue cho Chaturanga. “Hug in” (ôm vào) là động từ cho khuỷu tay: khuỷu chĩa ra sau, không bè ra hai bên. Bắp tay sau làm việc nhiều nhất ở đây.',
          en: 'This is the Chaturanga cue. “Hug in” is the verb for elbows: they point back, not out to the sides. The triceps do most of the work here.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'dictation', id: 'arm-dictation-forearms',
        clip: 'forearm-bones__cue-1',
        prompt: { vi: 'Nghe câu cue và gõ lại.', en: 'Listen to the cue and type it.' },
        credits: { cued: ['forearm-bones'] },
        notes: {
          vi: 'Ba chỗ khó: “onto” (một từ, ON-too), “forearms” (đuôi mz), “shoulders” (cụm ld, đuôi z).',
          en: 'Three hard spots: “onto” (one word), “forearms” (final mz), “shoulders” (ld, final z).',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'sayit', id: 'arm-say',
        prompt: { vi: 'Nghe mẫu, rồi ghi âm chính bạn. Gemini sẽ nói bằng tiếng Việt cần sửa gì.', en: 'Hear the model, then record yourself. Gemini will tell you in Vietnamese what to fix.' },
        items: [
          { clip: 'wrist', text: 'wrist', say: 'RIST', credit: 'wrist' },
          { clip: 'forearm-bones', text: 'forearm', say: 'FOR-arm', credit: 'forearm-bones' },
          { clip: 'biceps-brachii', text: 'biceps', say: 'BY-seps', credit: 'biceps-brachii' },
          { clip: 'triceps-brachii', text: 'triceps', say: 'TRY-seps', credit: 'triceps-brachii' },
          { clip: 'forearm-flexors__cue-2', text: 'Turn your palms up and stretch the inside of your wrists.', credit: 'forearm-flexors', kind: 'cue', credits: { cued: ['forearm-flexors'] } },
        ],
      },
    },
    { type: 'done' },
  ],
}
