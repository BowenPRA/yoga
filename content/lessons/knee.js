/**
 * Lesson: the knee and the lower leg. Same deck format as hip.js: meet each
 * term on the figure, hear it, hear it inside a real cue, then a check. The
 * story: the knee is a hinge between the thigh bone and the shin; it tracks
 * over the second toe; the quadriceps lift the kneecap and straighten it
 * (Chair), the hamstrings bend it and lengthen in a forward fold; the IT
 * band in Shoelace; and a knee should never hurt, in Hero or in Swan.
 *
 * Figure windows are [x, y, w, h] in the figure's own pixels (muscles) or
 * viewBox units (skeleton). Flexion and extension have no region of their
 * own, so their slides show the muscles that do them at the knee.
 */
const SKELETON = [96, 500, 216, 178]
const FRONT = [150, 600, 360, 360]
const BACK = [100, 620, 340, 280]

export const kneeLesson = {
  id: 'knee',
  region: 'leg',
  title: { en: 'Knee and lower leg', vi: 'Đầu gối và cẳng chân' },
  lead: {
    en: 'Nine words for teaching the knee in English: the bones that meet there, the muscles that bend and straighten it, and what your students feel in Chair, Hero and a forward fold.',
    vi: 'Chín từ để dạy về gối bằng tiếng Anh: các xương gặp nhau ở đó, các cơ gập và duỗi gối, và những gì học viên cảm thấy trong Cái ghế, Anh hùng và tư thế gập người.',
  },
  how: {
    en: 'Meet each word on the figure, hear it, label it, build a cue with it, then say it.',
    vi: 'Gặp từng từ trên hình, nghe, gắn nhãn, ghép câu cue với nó, rồi nói thử.',
  },
  minutes: 15,
  pose: 'chair-pose',
  terms: ['femur', 'shin-bone', 'knee', 'kneecap', 'quadriceps', 'it-band', 'extension', 'hamstrings', 'flexion'],
  /** Lesson names for bank labels where the term's `en` is not what a teacher says. */
  labels: { iliopsoas: 'hip flexors' },

  slides: [
    { type: 'intro' },

    // ── the hinge: two long bones and the joint between them ───────────────
    {
      type: 'term', term: 'femur',
      figure: { kind: 'skeleton', window: SKELETON, highlight: ['femur'] },
      cues: ['femur__cue-1', 'femur__cue-2'],
      care: { id: 'knee__care-femur', en: 'If your knee feels twisted, turn your whole thigh so your knee points the same way as your toes.', vi: 'Nếu thấy gối bị vặn, xoay cả đùi để gối hướng cùng chiều với các ngón chân.' },
    },
    {
      type: 'term', term: 'shin-bone',
      figure: { kind: 'skeleton', window: SKELETON, highlight: ['shin-bone'] },
      cues: ['shin-bone__cue-2', 'shin-bone__cue-1'],
      care: { id: 'knee__care-shin-bone', en: 'If your knee aches in a lunge, bring your shin upright, with your knee over your ankle.', vi: 'Nếu gối thấy nhức khi chùng chân, dựng ống chân thẳng đứng, gối ngay trên cổ chân.' },
    },
    {
      type: 'term', term: 'knee',
      figure: { kind: 'skeleton', window: SKELETON, highlight: ['knee'] },
      cues: ['knee__cue-1', 'knee__cue-2'],
      care: { id: 'knee__care-knee', en: 'Your knee should never hurt. If it does, come out, and we’ll find another way.', vi: 'Gối không bao giờ nên bị đau. Nếu đau, hãy thoát thế, rồi chúng ta sẽ tìm cách khác.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'chain', id: 'knee-chain-track',
        prompt: { vi: 'Ghép câu cue. Ý: “Giữ gối đi thẳng hướng với ngón chân thứ hai.”', en: 'Build the cue. Meaning: keep the knee moving in line with the second toe.' },
        pieces: ['Keep', 'your knee', 'tracking', 'over', 'your second toe.'],
        traps: ['away from', 'your heel.'],
        clip: 'knee__cue-1',
        credits: { cued: ['knee'] },
        explain: {
          vi: '“Tracking over” nghĩa là khi gập, gối đi theo một đường thẳng phía trên ngón chân thứ hai: không đổ vào trong, không lệch ra ngoài. Đây là câu bạn sẽ nói nhiều nhất cho gối.',
          en: '“Tracking over” means that as it bends, the knee follows a line over the second toe: not falling in, not drifting out. It is the knee cue you will say most.',
        },
      },
    },
    {
      type: 'term', term: 'kneecap',
      figure: { kind: 'skeleton', window: SKELETON, highlight: ['kneecap'] },
      cues: ['kneecap__cue-1', 'kneecap__cue-2'],
      care: { id: 'knee__care-kneecap', en: 'If kneeling hurts your kneecaps, fold a blanket under your knees.', vi: 'Nếu quỳ làm đau xương bánh chè, gấp chăn kê dưới gối.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'knee-label-bones',
        figure: { kind: 'skeleton', window: [40, 544, 320, 170], pad: [44, 44], font: 12 },
        prompt: { vi: 'Gắn mỗi tên vào đúng chỗ quanh gối.', en: 'Put each name where it belongs around the knee.' },
        pins: [
          { id: 'femur', x: 100, y: 544, side: 'above', to: [165, 532] },
          { id: 'knee', x: 300, y: 544, side: 'above', to: [245, 600] },
          { id: 'kneecap', x: 100, y: 714, side: 'below', to: [172, 594] },
          { id: 'shin-bone', x: 300, y: 714, side: 'below', to: [227, 665] },
        ],
        bank: ['femur', 'knee', 'kneecap', 'shin-bone', 'hip-joint'],
        credits: { labelled: ['femur', 'knee', 'kneecap', 'shin-bone'] },
      },
    },

    // ── the front of the thigh: the muscles that straighten the knee ───────
    {
      type: 'term', term: 'quadriceps',
      figure: { kind: 'front', window: FRONT, highlight: ['quadriceps'] },
      cues: ['quadriceps__cue-2', 'quadriceps__cue-1'],
      care: { id: 'knee__care-quadriceps', en: 'If the front of your thighs burns too much, come up a little and keep breathing.', vi: 'Nếu mặt trước đùi nóng rát quá, nâng người lên một chút và tiếp tục thở.' },
    },
    {
      type: 'term', term: 'it-band',
      figure: { kind: 'front', window: FRONT, highlight: ['it-band'] },
      cues: ['it-band__cue-1', 'it-band__cue-2'],
      care: { id: 'knee__care-it-band', en: 'If you feel it on the outside of your knee, not your hip, come out a little.', vi: 'Nếu bạn cảm thấy ở mặt ngoài gối thay vì ở hông, lùi ra một chút.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'knee-label-front',
        figure: { kind: 'front', window: [150, 610, 360, 330], pad: [46, 46], font: 13 },
        prompt: { vi: 'Đùi nhìn từ phía trước: mặt trước, mặt ngoài và mặt trong.', en: 'The thigh from the front: the front, the outside and the inside.' },
        pins: [
          { id: 'quadriceps', x: 245, y: 610, side: 'above', to: [238, 790] },
          { id: 'hip-adductors', x: 400, y: 610, side: 'above', to: [358, 716] },
          { id: 'it-band', x: 205, y: 940, side: 'below', to: [211, 760] },
        ],
        bank: ['quadriceps', 'it-band', 'hip-adductors', 'hamstrings'],
        credits: { labelled: ['quadriceps', 'it-band'] },
      },
    },
    {
      type: 'term', term: 'extension',
      figure: { kind: 'front', window: FRONT, highlight: ['quadriceps'] },
      cues: ['extension__cue-1', 'extension__cue-2'],
      care: { id: 'knee__care-extension', en: 'If your knees lock back when you straighten your legs, keep a micro-bend.', vi: 'Nếu gối bị ưỡn ra sau khi duỗi thẳng chân, hãy giữ gối hơi chùng.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'hotspot', id: 'knee-hotspot-chair',
        figure: { kind: 'front', window: FRONT },
        clip: 'chair-pose__cue-3',
        prompt: { vi: 'Nghe câu cue trong Cái ghế. Học viên sẽ thấy nóng ở đâu? Chạm vào hình.', en: 'Listen to the cue for Chair. Where will your students feel the burn? Tap the figure.' },
        accept: ['quadriceps', 'sartorius'],
        reveal: ['quadriceps'],
        explain: {
          vi: 'Mặt trước đùi: cơ tứ đầu đùi giữ gối gập, nên đùi nóng lên. Nóng ở đùi là bình thường. Đau ở gối thì không: bảo học viên đừng ngồi thấp như vậy.',
          en: 'The front of the thighs: the quadriceps hold the knees bent, so the thighs burn. A burn in the thighs is fine. Pain in the knees is not: tell your students not to sit as low.',
        },
      },
    },

    // ── the back of the thigh: the muscles that bend the knee ──────────────
    {
      type: 'term', term: 'hamstrings',
      figure: { kind: 'back', window: BACK, highlight: ['hamstrings'] },
      cues: ['hamstrings__cue-1', 'hamstrings__cue-4'],
      care: { id: 'knee__care-hamstrings', en: 'If you feel a sharp pull right behind your knee, bend your knees more.', vi: 'Nếu thấy kéo nhói ngay sau gối, chùng gối nhiều hơn.' },
    },
    {
      type: 'term', term: 'flexion',
      figure: { kind: 'back', window: BACK, highlight: ['hamstrings'] },
      cues: ['flexion__cue-2', 'flexion__cue-1'],
      care: { id: 'knee__care-flexion', en: 'If your knees don’t like bending this deeply, put a rolled blanket behind them.', vi: 'Nếu gối khó chịu khi gập sâu như vậy, kê chăn cuộn phía sau gối.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'hotspot', id: 'knee-hotspot-fold',
        figure: { kind: 'back', window: [130, 610, 290, 380] },
        clip: 'standing-forward-fold__cue-1',
        prompt: { vi: 'Nghe câu cue. Khi gập người, học viên sẽ cảm thấy kéo giãn ở đâu? Chạm vào hình.', en: 'Listen to the cue. When your students fold, where will they feel the stretch? Tap the figure.' },
        accept: ['hamstrings', 'calves', 'hip-adductors'],
        reveal: ['hamstrings'],
        explain: {
          vi: 'Mặt sau đùi: nhóm cơ đùi sau dài ra khi gập người, và bắp chân cũng vậy. Nếu học viên thấy kéo nhói ngay sau gối, bảo họ chùng gối.',
          en: 'The back of the thighs: the hamstrings lengthen as you fold, and so do the calves. If a student feels a sharp pull right behind the knee, tell them to bend their knees.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'knee-label-back',
        figure: { kind: 'back', window: [120, 610, 310, 380], pad: [46, 46], font: 13 },
        prompt: { vi: 'Chân nhìn từ phía sau. Gắn mỗi tên vào đúng chỗ.', en: 'The leg from behind. Put each name where it belongs.' },
        pins: [
          { id: 'hamstrings', x: 220, y: 610, side: 'above', to: [205, 730] },
          { id: 'it-band', x: 380, y: 610, side: 'above', to: [370, 700] },
          { id: 'calves', x: 330, y: 990, side: 'below', to: [330, 915] },
        ],
        bank: ['hamstrings', 'it-band', 'calves', 'quadriceps'],
        credits: { labelled: ['hamstrings', 'it-band'] },
      },
    },

    // ── using the words to teach ──────────────────────────────────────────
    {
      type: 'activity',
      activity: {
        type: 'sort', id: 'knee-sort-warrior', pose: 'warrior-1',
        prompt: { vi: 'Trong Chiến binh I, cơ nào đang làm việc, cơ nào đang được kéo giãn?', en: 'In Warrior I, which muscles are working and which are stretching?' },
        bins: [
          { id: 'working', vi: 'Đang làm việc', en: 'Working' },
          { id: 'stretching', vi: 'Đang kéo giãn', en: 'Stretching' },
        ],
        cards: [
          { term: 'quadriceps', bin: 'working' },
          { term: 'gluteus-maximus', bin: 'working' },
          { term: 'calves', bin: 'stretching' },
          { term: 'iliopsoas', bin: 'stretching' },
        ],
        explain: {
          vi: 'Chân trước: cơ tứ đầu đùi giữ gối gập ngay trên cổ chân, cơ mông lớn làm việc cùng. Chân sau: gót chân ấn xuống nên bắp chân được kéo dài, và phía trước hông (cơ thắt lưng chậu) dài ra.',
          en: 'Front leg: the quadriceps hold the knee bent over the ankle, and the gluteus maximus works with them. Back leg: the heel presses down, so the calf lengthens, and the front of the hip (the iliopsoas) opens.',
        },
      },
    },
    { type: 'pose', pose: 'chair-pose' },
    {
      type: 'activity',
      activity: {
        type: 'predict', id: 'knee-predict-hero',
        prompt: { vi: 'Trong tư thế Anh hùng, học viên nên cảm thấy giãn ở đâu?', en: 'In Hero Pose, where should your students feel the stretch?' },
        options: [
          { id: 'front-thighs', en: 'In the front of the thighs', vi: 'Ở mặt trước đùi' },
          { id: 'knees', en: 'Inside the knees', vi: 'Bên trong khớp gối' },
          { id: 'back-thighs', en: 'In the back of the thighs', vi: 'Ở mặt sau đùi' },
          { id: 'lower-back', en: 'In the lower back', vi: 'Ở lưng dưới' },
        ],
        correct: 'front-thighs',
        explain: {
          vi: 'Mặt trước đùi (cơ tứ đầu đùi) và phía trước ống chân. Gối là khớp bản lề: chỉ gập và duỗi, không thích bị vặn. Trong Anh hùng hay Thiên nga, cảm giác bên trong gối luôn là dấu hiệu dừng lại, không phải để vượt qua. Khi học viên thấy đau ở gối, bạn nói:',
          en: 'The front of the thighs (the quadriceps) and the fronts of the shins. The knee is a hinge: it bends and straightens, and doesn’t like to twist. In Hero or Swan, a feeling inside the knee is always a sign to stop, never something to push through. When a student’s knee hurts, you say:',
        },
        then: { clip: 'hero-pose__cue-8' },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'order', id: 'knee-order-chair', pose: 'chair-pose',
        prompt: { vi: 'Sắp xếp các câu cue cho Cái ghế theo đúng thứ tự. Chạm loa để nghe từng câu.', en: 'Put the cues for Chair Pose in order. Tap the speaker to hear each one.' },
        steps: ['chair-pose__cue-1', 'chair-pose__cue-3', 'chair-pose__cue-5', 'chair-pose__cue-7', 'chair-pose__cue-9'],
        explain: {
          vi: 'Vào thế cùng hơi hít vào. Rồi chỉnh từ dưới lên: trước hết là chân (ngồi lùi, trọng lượng về gót chân), rồi đến thân (sườn, xương cụt). Sau đó mới giữ năm nhịp thở, và thoát thế khi thở ra.',
          en: 'Come in on the inhale. Then work from the ground up: the legs first (sit back, weight in the heels), then the trunk (ribs, tailbone). Only then hold for five breaths, and leave on an exhale.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'chain', id: 'knee-chain-kneecaps',
        prompt: { vi: 'Ghép câu cue. Ý: “Nâng xương bánh chè để kích hoạt mặt trước đùi.”', en: 'Build the cue. Meaning: lift the kneecaps to switch on the front of the thighs.' },
        pieces: ['Lift', 'your kneecaps', 'to engage', 'the front', 'of your thighs.'],
        traps: ['Soften', 'the back'],
        clip: 'quadriceps__cue-1',
        credits: { cued: ['kneecap', 'quadriceps'] },
        explain: {
          vi: 'Xương bánh chè nằm trong gân của cơ tứ đầu đùi. Khi cơ này làm việc, nó kéo xương bánh chè lên, nên “lift your kneecaps” là cách nói đơn giản để kích hoạt đùi.',
          en: 'The kneecap sits in the tendon of the quadriceps. When they work, they pull the kneecap up, so “lift your kneecaps” is the simple way to switch on the thighs.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'dictation', id: 'knee-dictation-bend',
        clip: 'hamstrings__cue-1',
        prompt: { vi: 'Nghe câu cue và gõ lại.', en: 'Listen to the cue and type it.' },
        credits: { cued: ['hamstrings', 'flexion'] },
        notes: {
          vi: 'Ba chỗ khó: “knees” (k câm, đuôi z), “as much as” (nói liền một hơi), “back long” (giữ âm k trước âm l).',
          en: 'Three hard spots: “knees” (silent k, final z), “as much as” (said as one), “back long” (keep the k before the l).',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'sayit', id: 'knee-say',
        prompt: { vi: 'Nghe mẫu, rồi ghi âm chính bạn. Gemini sẽ nói bằng tiếng Việt cần sửa gì.', en: 'Hear the model, then record yourself. Gemini will tell you in Vietnamese what to fix.' },
        items: [
          { clip: 'femur', text: 'thigh bone', say: 'THY bohn', credit: 'femur' },
          { clip: 'kneecap', text: 'kneecap', say: 'NEE-kap', credit: 'kneecap' },
          { clip: 'quadriceps', text: 'quadriceps', say: 'KWOD-ri-seps', credit: 'quadriceps' },
          { clip: 'hamstrings', text: 'hamstrings', say: 'HAM-strings', credit: 'hamstrings' },
          { clip: 'it-band__cue-1', text: 'Cross your knees and let the outer thighs release.', credit: 'it-band', kind: 'cue', credits: { cued: ['it-band'] } },
        ],
      },
    },
    { type: 'done' },
  ],
}
