/**
 * Lesson: the foot. Same deck format as hip.js: meet each term on the
 * figure, hear it, hear it inside a real cue, then a check. The story:
 * rooting through the four corners of the feet, lifting the arches, “flex
 * your foot” versus “point your toes”, the Achilles in Down Dog, the
 * plantar fascia in Toe Squat; the pose is Mountain, built from the feet up.
 *
 * Figure windows are [x, y, w, h] in the figure's own pixels (muscles) or
 * viewBox units (skeleton). The skeleton is drawn from the front, so the
 * heel and the ankle share the tarsal bones there. On the back figure the
 * feet are drawn from underneath: the soles face the viewer. Pointing and
 * flexing have no region of their own, so their slides show the muscles
 * that do them.
 */
const SKELETON = [100, 700, 200, 140]
const FRONT = [170, 880, 310, 320]
const BACK = [130, 900, 290, 326]
const SOLES = [150, 1040, 250, 186]

export const footLesson = {
  id: 'foot',
  region: 'foot',
  title: { en: 'Foot', vi: 'Bàn chân' },
  lead: {
    en: 'Nine words for the feet: the bones your students root through, the muscles that flex and point them, and what they feel in Down Dog and Toe Squat.',
    vi: 'Chín từ cho bàn chân: các xương giúp học viên bám chắc xuống sàn, các cơ gập và duỗi bàn chân, và những gì họ cảm thấy trong Chó úp mặt và Ngồi trên ngón chân.',
  },
  how: {
    en: 'Meet each word on the figure, hear it, label it, build a cue with it, then say it.',
    vi: 'Gặp từng từ trên hình, nghe, gắn nhãn, ghép câu cue với nó, rồi nói thử.',
  },
  minutes: 15,
  pose: 'mountain-pose',
  terms: ['ankle', 'heel', 'arch', 'toes', 'tibialis-anterior', 'dorsiflexion', 'plantar-flexion', 'achilles-tendon', 'plantar-fascia'],

  slides: [
    { type: 'intro' },

    // ── the bones you stand on ────────────────────────────────────────────
    {
      type: 'term', term: 'ankle',
      figure: { kind: 'skeleton', window: SKELETON, highlight: ['ankle'] },
      cues: ['ankle__cue-1', 'ankle__cue-3'],
      care: { id: 'foot__care-ankle', en: 'If the fronts of your ankles hurt when you kneel, roll a blanket under them.', vi: 'Nếu phía trước cổ chân đau khi quỳ, cuộn chăn kê bên dưới.' },
    },
    {
      type: 'term', term: 'heel',
      figure: { kind: 'skeleton', window: SKELETON, highlight: ['heel'] },
      cues: ['heel__cue-1', 'heel__cue-2'],
      care: { id: 'foot__care-heel', en: 'If your heel is sore when you stand, soften your knees and spread your weight through your whole foot.', vi: 'Nếu gót chân đau khi đứng, thả lỏng gối và trải đều trọng lượng ra khắp bàn chân.' },
    },
    {
      type: 'term', term: 'arch',
      figure: { kind: 'skeleton', window: SKELETON, highlight: ['arch'] },
      cues: ['arch__cue-1', 'arch__cue-2'],
      care: { id: 'foot__care-arch', en: 'If your arch cramps, come out and gently pull your toes back toward you.', vi: 'Nếu vòm chân bị chuột rút, thoát thế và nhẹ nhàng kéo các ngón chân về phía bạn.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'chain', id: 'foot-chain-corners',
        prompt: { vi: 'Ghép câu cue. Ý: “Ấn bốn góc bàn chân xuống thảm.”', en: 'Build the cue. Meaning: press the four corners of the feet into the mat.' },
        pieces: ['Press', 'the four corners', 'of your feet', 'into the mat.'],
        traps: ['Lift', 'the tops'],
        clip: 'arch__cue-2',
        credits: { cued: ['arch'] },
        explain: {
          vi: 'Bốn góc bàn chân: gốc ngón chân cái, gốc ngón chân út, gót chân phía trong, gót chân phía ngoài. Ấn đều cả bốn góc thì vòm chân tự nâng lên. Đây là cue đầu tiên của mọi tư thế đứng.',
          en: 'The four corners: the base of the big toe, the base of the little toe, the inner heel and the outer heel. Press all four evenly and the arch lifts by itself. It is the first cue of every standing pose.',
        },
      },
    },
    {
      type: 'term', term: 'toes',
      figure: { kind: 'skeleton', window: SKELETON, highlight: ['toes'] },
      cues: ['toes__cue-1', 'toes__cue-2'],
      care: { id: 'foot__care-toes', en: 'If tucking your toes hurts, tuck one foot at a time.', vi: 'Nếu bấm các ngón chân xuống thấy đau, bấm từng bàn chân một.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'foot-label-bones',
        figure: { kind: 'skeleton', window: [70, 700, 260, 135], pad: [44, 44], font: 11 },
        prompt: { vi: 'Gắn mỗi tên vào đúng chỗ trên xương bàn chân. Gót chân nằm ngay dưới mắt cá ngoài.', en: 'Put each name where it belongs on the bones of the feet. The heel sits just below the outer ankle bone.' },
        pins: [
          { id: 'heel', x: 128, y: 700, side: 'above', to: [166, 771] },
          { id: 'ankle', x: 272, y: 700, side: 'above', to: [214, 764] },
          { id: 'toes', x: 128, y: 835, side: 'below', to: [168, 808] },
          { id: 'arch', x: 272, y: 835, side: 'below', to: [222, 792] },
        ],
        bank: ['ankle', 'heel', 'arch', 'toes', 'shin-bone'],
        credits: { labelled: ['ankle', 'heel', 'arch', 'toes'] },
      },
    },

    // ── the front of the shin: flex your foot ─────────────────────────────
    {
      type: 'term', term: 'tibialis-anterior',
      figure: { kind: 'front', window: FRONT, highlight: ['tibialis-anterior'] },
      cues: ['tibialis-anterior__cue-1', 'tibialis-anterior__cue-2'],
      care: { id: 'foot__care-tibialis-anterior', en: 'If the fronts of your shins pull too much, sit up higher on a block.', vi: 'Nếu phía trước ống chân bị kéo căng quá, ngồi cao hơn trên một viên gạch.' },
    },
    {
      type: 'term', term: 'dorsiflexion',
      figure: { kind: 'front', window: FRONT, highlight: ['tibialis-anterior'] },
      cues: ['dorsiflexion__cue-1', 'dorsiflexion__cue-2'],
      care: { id: 'foot__care-dorsiflexion', en: 'If flexing your foot pulls hard behind your knee, bend that knee a little.', vi: 'Nếu gập bàn chân làm phía sau gối bị kéo mạnh, chùng gối đó một chút.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'foot-label-shin',
        figure: { kind: 'front', window: [180, 870, 290, 310], pad: [46, 46], font: 13 },
        prompt: { vi: 'Cẳng chân nhìn từ phía trước. Gắn mỗi tên vào đúng chỗ.', en: 'The lower leg from the front. Put each name where it belongs.' },
        pins: [
          { id: 'fibularis-longus', x: 248, y: 870, side: 'above', to: [235, 1020] },
          { id: 'calves', x: 400, y: 870, side: 'above', to: [357, 1000] },
          { id: 'tibialis-anterior', x: 262, y: 1180, side: 'below', to: [268, 1000] },
        ],
        bank: ['tibialis-anterior', 'fibularis-longus', 'calves', 'hamstrings'],
        credits: { labelled: ['tibialis-anterior'] },
      },
    },

    // ── the back of the lower leg: point your toes ────────────────────────
    {
      type: 'term', term: 'plantar-flexion',
      figure: { kind: 'back', window: BACK, highlight: ['calves', 'achilles-tendon'] },
      cues: ['plantar-flexion__cue-1', 'plantar-flexion__cue-2'],
      care: { id: 'foot__care-plantar-flexion', en: 'If your foot cramps when you point it, flex it for a breath, then point more softly.', vi: 'Nếu bàn chân bị chuột rút khi duỗi mũi chân, gập bàn chân lại một nhịp thở, rồi duỗi nhẹ hơn.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'predict', id: 'foot-predict-flex',
        prompt: { vi: 'Bạn nói “Flex your feet”. Học viên nên làm gì?', en: 'You say “Flex your feet.” What should your students do?' },
        options: [
          { id: 'toward', en: 'Draw the toes back toward the shins', vi: 'Kéo mũi chân về phía ống chân' },
          { id: 'away', en: 'Reach the toes away, like a dancer', vi: 'Duỗi mũi chân ra xa, như vũ công' },
          { id: 'squeeze', en: 'Squeeze the muscles of the feet hard', vi: 'Gồng chặt các cơ bàn chân' },
          { id: 'curl', en: 'Curl the toes under', vi: 'Co quắp các ngón chân xuống' },
        ],
        correct: 'toward',
        explain: {
          vi: '“Flex your feet” là gập bàn chân: kéo mũi chân về phía ống chân và đẩy gót chân ra (dorsiflexion). Ngược lại là “point your toes”: duỗi mũi chân ra xa (plantar flexion). Trong lớp yoga, “flex” không có nghĩa là gồng cơ. Trong các tư thế mở hông, gập bàn chân giúp bảo vệ gối:',
          en: '“Flex your feet” means draw the toes back toward the shins and push out through the heels: dorsiflexion. The opposite is “point your toes”: plantar flexion. In a yoga class, “flex” never means squeeze the muscles. In hip openers, a flexed foot protects the knee:',
        },
        then: { clip: 'dorsiflexion__cue-1' },
      },
    },
    {
      type: 'term', term: 'achilles-tendon',
      figure: { kind: 'back', window: BACK, highlight: ['achilles-tendon'] },
      cues: ['achilles-tendon__cue-1'],
      care: { id: 'foot__care-achilles-tendon', en: 'If the cord above your heel feels sore, bend your knees and let your heels lift.', vi: 'Nếu gân sau gót chân bị đau, chùng gối và để gót chân nhấc lên.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'hotspot', id: 'foot-hotspot-dog',
        figure: { kind: 'back', window: [130, 830, 290, 330] },
        clip: 'downward-dog__cue-5',
        prompt: { vi: 'Nghe câu cue trong Chó úp mặt. Học viên sẽ cảm thấy kéo giãn ở đâu? Chạm vào hình.', en: 'Listen to the cue for Down Dog. Where will your students feel the stretch? Tap the figure.' },
        accept: ['calves', 'achilles-tendon', 'tibialis-posterior', 'fibularis-longus'],
        reveal: ['calves', 'achilles-tendon'],
        explain: {
          vi: 'Bắp chân và gân sau gót chân (gân gót) dài ra khi gót hạ xuống. Gót không cần chạm sàn: gân gót cần thời gian, nên không bao giờ nhún nảy.',
          en: 'The calves and the cord above the heel (the Achilles tendon) lengthen as the heels sink. The heels don’t need to touch: the Achilles takes time, so never bounce.',
        },
      },
    },
    {
      type: 'term', term: 'plantar-fascia',
      figure: { kind: 'back', window: SOLES, highlight: ['plantar-fascia'] },
      cues: ['plantar-fascia__cue-1', 'plantar-fascia__cue-2'],
      care: { id: 'foot__care-plantar-fascia', en: 'If the soles of your feet burn, lean forward and take some weight into your hands.', vi: 'Nếu gan bàn chân nóng rát, nghiêng người về trước và dồn bớt trọng lượng vào hai tay.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'hotspot', id: 'foot-hotspot-toe-squat',
        figure: { kind: 'back', window: SOLES },
        clip: 'toe-squat__cue-3',
        prompt: { vi: 'Nghe câu cue trong Ngồi trên ngón chân. Học viên sẽ cảm thấy ở đâu? Hình này nhìn bàn chân từ bên dưới.', en: 'Listen to the cue for Toe Squat. Where will your students feel it? The figure shows the feet from underneath.' },
        accept: ['plantar-fascia'],
        reveal: ['plantar-fascia'],
        explain: {
          vi: 'Gan bàn chân: các ngón chân bị gập ngược và gót chân chịu trọng lượng, nên cân gan chân được kéo dài, rất rõ. Giữ ngắn thôi; đau nhói nghĩa là thoát thế ngay.',
          en: 'The soles of the feet: the toes bend back and the heels carry the weight, so the plantar fascia stretches, intensely. Keep it short; sharp pain means come out straight away.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'foot-label-back',
        figure: { kind: 'back', window: [130, 840, 290, 386], pad: [46, 46], font: 13 },
        prompt: { vi: 'Cẳng chân nhìn từ phía sau. Bàn chân được vẽ nhìn từ dưới lên, thấy gan bàn chân.', en: 'The lower leg from behind. The feet are drawn from underneath, so you see the soles.' },
        pins: [
          { id: 'calves', x: 330, y: 840, side: 'above', to: [330, 925] },
          { id: 'achilles-tendon', x: 200, y: 1226, side: 'below', to: [232, 1060] },
          { id: 'plantar-fascia', x: 350, y: 1226, side: 'below', to: [318, 1180] },
        ],
        bank: ['calves', 'achilles-tendon', 'plantar-fascia', 'tibialis-anterior'],
        credits: { labelled: ['achilles-tendon', 'plantar-fascia'] },
      },
    },

    // ── using the words to teach ──────────────────────────────────────────
    {
      type: 'activity',
      activity: {
        type: 'sort', id: 'foot-sort-dog', pose: 'downward-dog',
        prompt: { vi: 'Trong Chó úp mặt, cơ nào đang làm việc, cơ nào đang được kéo giãn?', en: 'In Downward-Facing Dog, which muscles are working and which are stretching?' },
        bins: [
          { id: 'working', vi: 'Đang làm việc', en: 'Working' },
          { id: 'stretching', vi: 'Đang kéo giãn', en: 'Stretching' },
        ],
        cards: [
          { term: 'quadriceps', bin: 'working' },
          { term: 'deltoids', bin: 'working' },
          { term: 'hamstrings', bin: 'stretching' },
          { term: 'calves', bin: 'stretching' },
          { term: 'achilles-tendon', bin: 'stretching' },
        ],
        explain: {
          vi: 'Vai (cơ delta) làm việc khi hai tay đẩy sàn ra xa, và mặt trước đùi làm việc để đưa hông ra sau. Cả mặt sau chân được kéo dài: mặt sau đùi, bắp chân, và gân gót khi gót chân hạ xuống.',
          en: 'The shoulders (the deltoids) work as the arms push the floor away, and the front of the thighs works to send the hips back. The whole back of the leg lengthens: the hamstrings, the calves, and the Achilles tendon as the heels sink.',
        },
      },
    },
    { type: 'pose', pose: 'mountain-pose' },
    {
      type: 'activity',
      activity: {
        type: 'order', id: 'foot-order-mountain', pose: 'mountain-pose',
        prompt: { vi: 'Sắp xếp các câu cue cho Ngọn núi theo đúng thứ tự. Chạm loa để nghe từng câu.', en: 'Put the cues for Mountain Pose in order. Tap the speaker to hear each one.' },
        steps: ['mountain-pose__cue-1', 'mountain-pose__cue-2', 'mountain-pose__cue-3', 'mountain-pose__cue-4', 'mountain-pose__cue-5'],
        explain: {
          vi: 'Ngọn núi được dựng từ dưới lên: bàn chân, gối, xương cụt, rồi đỉnh đầu. Bàn chân đi trước vì đó là nền móng của mọi tư thế đứng.',
          en: 'Mountain Pose is built from the ground up: feet, knees, tailbone, then the crown. The feet come first because they are the base of every standing pose.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'chain', id: 'foot-chain-point',
        prompt: { vi: 'Ghép câu cue. Ý: “Duỗi mũi chân và vươn qua mu bàn chân.”', en: 'Build the cue. Meaning: point the toes and reach through the top of the foot.' },
        pieces: ['Point', 'your toes', 'and reach', 'through', 'the top of your foot.'],
        traps: ['Flex', 'the sole of your foot.'],
        clip: 'plantar-flexion__cue-1',
        credits: { cued: ['plantar-flexion', 'toes'] },
        explain: {
          vi: '“Point” (duỗi mũi chân) và “flex” (gập bàn chân) là một cặp ngược nhau. “The top of your foot” là mu bàn chân; “the sole of your foot” là gan bàn chân.',
          en: '“Point” and “flex” are opposites. “The top of your foot” is the upper side; “the sole of your foot” is underneath.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'dictation', id: 'foot-dictation-heels',
        clip: 'achilles-tendon__cue-1',
        prompt: { vi: 'Nghe câu cue và gõ lại.', en: 'Listen to the cue and type it.' },
        credits: { cued: ['achilles-tendon', 'heel'] },
        notes: {
          vi: 'Ba chỗ khó: “heels” (âm “ee” dài, đuôi lz), “slowly” (cụm sl), “bounce” (đuôi ns).',
          en: 'Three hard spots: “heels” (long ee, final lz), “slowly” (the sl cluster), “bounce” (final ns).',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'sayit', id: 'foot-say',
        prompt: { vi: 'Nghe mẫu, rồi ghi âm chính bạn. Gemini sẽ nói bằng tiếng Việt cần sửa gì.', en: 'Hear the model, then record yourself. Gemini will tell you in Vietnamese what to fix.' },
        items: [
          { clip: 'heel', text: 'heel', say: 'HEEL', credit: 'heel' },
          { clip: 'ankle', text: 'ankle', say: 'ANG-kul', credit: 'ankle' },
          { clip: 'toes', text: 'toes', say: 'TOHZ', credit: 'toes' },
          { clip: 'plantar-fascia__plain', text: 'the sole of your foot', say: 'the SOHL of your FOOT', credit: 'plantar-fascia' },
          { clip: 'dorsiflexion__cue-2', text: 'Flex your feet and press through your heels.', credit: 'dorsiflexion', kind: 'cue', credits: { cued: ['dorsiflexion', 'heel'] } },
        ],
      },
    },
    { type: 'done' },
  ],
}
