/**
 * Lesson: the spine and trunk. The format is hip.js: meet each term on the
 * figure, hear it, hear it inside a real cue, then a check. The story: the
 * three curves and what a neutral spine is, the base of the spine in
 * backbends and in Yin, the back muscles in Cat, Cow and Downward Dog, and
 * what to say when a lower back hurts. The "when a student hurts" line for
 * each term is `spine__care-<term>`.
 *
 * The spine is drawn on the front skeleton (viewBox units); the back muscles
 * on the back figure (pixels), deep layer on the viewer's left.
 */
const SPINE = [93, 66, 220, 330]
const BASE = [110, 280, 190, 140]
const BACK = [140, 240, 330, 290]

export const spineLesson = {
  id: 'spine',
  region: 'spine',
  title: { en: 'Spine and trunk', vi: 'Cột sống và thân' },
  lead: {
    en: 'Nine words for teaching the spine in English: its three curves, the base of the spine, and the back muscles your students feel in Cat, Cow and Downward Dog.',
    vi: 'Chín từ để dạy về cột sống bằng tiếng Anh: ba đường cong, phần đáy của cột sống, và các cơ lưng học viên cảm thấy trong Con mèo, Con bò và Chó úp mặt.',
  },
  how: {
    en: 'Meet each word on the figure, hear it, label it, build a cue with it, then say it.',
    vi: 'Gặp từng từ trên hình, nghe, gắn nhãn, ghép câu cue với nó, rồi nói thử.',
  },
  minutes: 15,
  pose: 'cat-pose',
  terms: ['cervical-spine', 'thoracic-spine', 'lumbar-spine', 'sacrum', 'tailbone', 'pelvic-tilt', 'erector-spinae', 'quadratus-lumborum', 'latissimus-dorsi'],
  /** Lesson names for bank labels where the term's `en` is not what a teacher says. */
  labels: { 'pelvic-tilt': 'pelvic tilt', iliopsoas: 'hip flexors' },

  slides: [
    { type: 'intro' },

    // ── the three curves ──────────────────────────────────────────────────
    {
      type: 'term', term: 'cervical-spine',
      figure: { kind: 'skeleton', window: SPINE, highlight: ['cervical-spine'] },
      cues: ['cervical-spine__cue-1', 'cervical-spine__cue-3'],
      care: { id: 'spine__care-cervical-spine', en: 'If your neck feels pinched, bring your gaze down to the floor.', vi: 'Nếu cổ thấy bị chèn, hạ ánh nhìn xuống sàn.' },
    },
    {
      type: 'term', term: 'thoracic-spine',
      figure: { kind: 'skeleton', window: SPINE, highlight: ['thoracic-spine'] },
      cues: ['thoracic-spine__cue-1', 'thoracic-spine__cue-3'],
      care: { id: 'spine__care-thoracic-spine', en: 'If your upper back feels stiff, keep the twist small and let your breath open it.', vi: 'Nếu lưng trên thấy cứng, chỉ vặn nhẹ và để hơi thở mở nó ra.' },
    },
    {
      type: 'term', term: 'lumbar-spine',
      figure: { kind: 'skeleton', window: SPINE, highlight: ['lumbar-spine'] },
      cues: ['lumbar-spine__cue-2', 'lumbar-spine__cue-1'],
      care: { id: 'spine__care-lumbar-spine', en: 'If your lower back hurts, come out and rest in Child’s Pose.', vi: 'Nếu lưng dưới đau, thoát thế và nghỉ ở tư thế Em bé.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'spine-label-curves',
        figure: { kind: 'skeleton', window: [93, 28, 220, 372], pad: [40, 40], font: 11 },
        prompt: { vi: 'Ba đoạn cong của cột sống. Gắn mỗi tên vào đúng chỗ.', en: 'The three curves of the spine. Put each name where it belongs.' },
        pins: [
          { id: 'cervical-spine', x: 148, y: 28, side: 'above', to: [203, 136] },
          { id: 'thoracic-spine', x: 258, y: 28, side: 'above', to: [203, 268] },
          { id: 'lumbar-spine', x: 258, y: 400, side: 'below', to: [205, 318] },
        ],
        bank: ['cervical-spine', 'thoracic-spine', 'lumbar-spine', 'ribs'],
        credits: { labelled: ['cervical-spine', 'thoracic-spine', 'lumbar-spine'] },
      },
    },

    // ── the base of the spine ─────────────────────────────────────────────
    {
      type: 'term', term: 'sacrum',
      figure: { kind: 'skeleton', window: BASE, highlight: ['sacrum'] },
      cues: ['sacrum__cue-1', 'sacrum__cue-2'],
      care: { id: 'spine__care-sacrum', en: 'If you feel the block in your lower back, slide it a little lower, under your sacrum.', vi: 'Nếu thấy viên gạch cấn ở lưng dưới, trượt nó xuống thấp hơn một chút, đặt dưới xương cùng.' },
    },
    {
      type: 'term', term: 'tailbone',
      figure: { kind: 'skeleton', window: BASE, highlight: ['tailbone'] },
      cues: ['tailbone__cue-1', 'tailbone__cue-3'],
      care: { id: 'spine__care-tailbone', en: 'If sitting hurts your tailbone, sit on the edge of a folded blanket.', vi: 'Nếu ngồi làm đau xương cụt, hãy ngồi lên mép một tấm chăn gấp.' },
    },
    {
      type: 'term', term: 'pelvic-tilt',
      figure: { kind: 'skeleton', window: BASE, highlight: ['pelvis'] },
      cues: ['pelvic-tilt__cue-1', 'pelvic-tilt__cue-2'],
      care: { id: 'spine__care-pelvic-tilt', en: 'If arching your lower back pinches, make the movement smaller.', vi: 'Nếu ưỡn lưng dưới thấy bị chèn, hãy làm chuyển động nhỏ lại.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'spine-label-base',
        figure: { kind: 'skeleton', window: [95, 290, 220, 125], pad: [40, 40], font: 11 },
        prompt: { vi: 'Đáy của cột sống, nơi nó gặp khung chậu. Gắn mỗi tên vào đúng chỗ.', en: 'The base of the spine, where it meets the pelvis. Put each name where it belongs.' },
        pins: [
          { id: 'sacrum', x: 255, y: 290, side: 'above', to: [210, 362] },
          { id: 'tailbone', x: 152, y: 415, side: 'below', to: [201, 390] },
          { id: 'sit-bones', x: 260, y: 415, side: 'below', to: [238, 404] },
        ],
        bank: ['sacrum', 'tailbone', 'sit-bones', 'lumbar-spine'],
        credits: { labelled: ['sacrum', 'tailbone', 'sit-bones'] },
      },
    },

    // ── the muscles of the back ───────────────────────────────────────────
    {
      type: 'term', term: 'erector-spinae',
      figure: { kind: 'back', window: BACK, highlight: ['erector-spinae'] },
      cues: ['erector-spinae__cue-1', 'erector-spinae__cue-4'],
      care: { id: 'spine__care-erector-spinae', en: 'If your back cramps in Locust, lower down, rest your forehead, and lift a little less.', vi: 'Nếu lưng bị chuột rút trong Châu chấu, hạ xuống, đặt trán nghỉ, rồi nâng thấp hơn một chút.' },
    },
    {
      type: 'term', term: 'quadratus-lumborum',
      figure: { kind: 'back', window: BACK, highlight: ['quadratus-lumborum'] },
      cues: ['quadratus-lumborum__cue-1', 'quadratus-lumborum__cue-2'],
      care: { id: 'spine__care-quadratus-lumborum', en: 'If one side of your lower back feels tight, make the side bend smaller and keep both hips down.', vi: 'Nếu một bên lưng dưới thấy căng, nghiêng ít lại và giữ hai hông bám sàn.' },
    },
    {
      type: 'term', term: 'latissimus-dorsi',
      figure: { kind: 'back', window: BACK, highlight: ['latissimus-dorsi'] },
      cues: ['latissimus-dorsi__cue-2', 'latissimus-dorsi__cue-1'],
      care: { id: 'spine__care-latissimus-dorsi', en: 'If your back rounds in Downward Dog, bend your knees and take your hands a little wider.', vi: 'Nếu lưng bị cong tròn trong Chó úp mặt, chùng gối và đặt hai tay rộng ra một chút.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'spine-label-back',
        figure: { kind: 'back', window: [130, 240, 350, 290], pad: [46, 46], font: 12 },
        prompt: { vi: 'Các cơ lưng. Bên trái hình là lớp sâu, bên phải là lớp nông.', en: 'The muscles of the back. The left of the figure is the deep layer, the right the surface.' },
        pins: [
          { id: 'erector-spinae', x: 220, y: 240, side: 'above', to: [240, 380] },
          { id: 'latissimus-dorsi', x: 390, y: 240, side: 'above', to: [365, 400] },
          { id: 'quadratus-lumborum', x: 230, y: 530, side: 'below', to: [210, 468] },
        ],
        bank: ['erector-spinae', 'quadratus-lumborum', 'latissimus-dorsi', 'trapezius'],
        credits: { labelled: ['erector-spinae', 'quadratus-lumborum', 'latissimus-dorsi'] },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'hotspot', id: 'spine-hotspot-dog',
        figure: { kind: 'back', window: BACK },
        clip: 'latissimus-dorsi__cue-2',
        prompt: { vi: 'Nghe câu cue. Học viên sẽ cảm thấy được kéo dài ở đâu? Chạm vào hình.', en: 'Listen to the cue. Where will your students feel the stretch? Tap the figure.' },
        accept: ['latissimus-dorsi', 'external-oblique', 'quadratus-lumborum', 'teres-major'],
        reveal: ['latissimus-dorsi'],
        explain: {
          vi: 'Hai bên lưng và eo: cơ lưng rộng (lats). Cơ này đi từ cánh tay xuống tận lưng dưới, nên nó dài ra khi hai tay vươn xa và hông đẩy ra sau trong Chó úp mặt.',
          en: 'The sides of the back and waist: the lats. They run from the upper arm down to the lower back, so they lengthen when the arms reach and the hips go back in Downward Dog.',
        },
      },
    },

    // ── using the words to teach ──────────────────────────────────────────
    {
      type: 'activity',
      activity: {
        type: 'sort', id: 'spine-sort-fold', pose: 'seated-forward-fold',
        prompt: { vi: 'Trong Gập người về trước ngồi, cơ nào đang làm việc, cơ nào đang được kéo giãn?', en: 'In Seated Forward Fold, which muscles are working and which are stretching?' },
        bins: [
          { id: 'working', vi: 'Đang làm việc', en: 'Working' },
          { id: 'stretching', vi: 'Đang kéo giãn', en: 'Stretching' },
        ],
        cards: [
          { term: 'quadriceps', bin: 'working' },
          { term: 'iliopsoas', bin: 'working' },
          { term: 'erector-spinae', bin: 'stretching' },
          { term: 'hamstrings', bin: 'stretching' },
        ],
        explain: {
          vi: 'Mặt trước đùi làm việc để giữ hai chân hoạt động, cơ gấp hông kéo thân về trước. Mặt sau đùi và các cơ dọc hai bên cột sống được kéo dài.',
          en: 'The front of the thighs works to keep the legs active, and the hip flexors draw the trunk forward. The backs of the thighs and the long muscles along the spine lengthen.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'predict', id: 'spine-predict-fold',
        prompt: { vi: 'Trong Gập người về trước ngồi, lưng dưới của một học viên cong tròn nhiều. Thường là do đâu?', en: 'In Seated Forward Fold, a student’s lower back rounds a lot. What is usually the reason?' },
        options: [
          { id: 'hamstrings', en: 'Tight hamstrings: the pelvis can’t tip forward', vi: 'Mặt sau đùi căng: khung chậu không nghiêng về trước được' },
          { id: 'weak-back', en: 'A weak lower back', vi: 'Lưng dưới yếu' },
          { id: 'gaze', en: 'Looking down at the knees', vi: 'Nhìn xuống đầu gối' },
          { id: 'breath', en: 'Breathing too slowly', vi: 'Thở quá chậm' },
        ],
        correct: 'hamstrings',
        explain: {
          vi: 'Cơ đùi sau bám vào xương ngồi. Khi chúng căng, khung chậu bị giữ lại và lưng dưới phải cong tròn để gập. Chùng gối, hoặc ngồi lên chăn gấp, giúp khung chậu nghiêng về trước. Đây là câu bạn nói:',
          en: 'The hamstrings hang from the sitting bones. When they are tight, they hold the pelvis back, and the lower back rounds to make up for it. Bent knees or a folded blanket let the pelvis tip forward. This is what to say:',
        },
        then: { clip: 'seated-forward-fold__cue-8' },
      },
    },
    { type: 'pose', pose: 'cat-pose' },
    {
      type: 'activity',
      activity: {
        type: 'order', id: 'spine-order-cat-cow', pose: 'cow-pose',
        prompt: { vi: 'Sắp xếp các câu cue cho Con mèo và Con bò theo đúng thứ tự. Chạm loa để nghe từng câu.', en: 'Put the Cat and Cow cues in order. Tap the speaker to hear each one.' },
        steps: ['cow-pose__cue-1', 'cow-pose__cue-2', 'cat-pose__cue-2', 'cat-pose__cue-5', 'cat-pose__cue-8'],
        explain: {
          vi: 'Vào thế trước, với cột sống trung tính. Rồi hơi thở dẫn đường: hít vào sang Con bò, thở ra sang Con mèo, và câu chi tiết đến khi học viên đã ở trong tư thế. Về lưng phẳng là một hơi hít vào, nên Con mèo đứng ngay trước nó.',
          en: 'Set up first, with a neutral spine. Then the breath leads: inhale into Cow, exhale into Cat, and the detail comes once they are in the pose. Coming back to a flat back is an inhale, so Cat comes just before it.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'chain', id: 'spine-chain-lengthen',
        prompt: { vi: 'Ghép câu cue. Ý: “Kéo dài cột sống từ xương cụt đến đỉnh đầu.”', en: 'Build the cue. Meaning: lengthen the spine from the tailbone to the crown of the head.' },
        pieces: ['Lengthen', 'your spine', 'from your tailbone', 'to the crown', 'of your head.'],
        traps: ['Round', 'to your heels'],
        clip: 'erector-spinae__cue-1',
        credits: { cued: ['erector-spinae', 'tailbone'] },
        explain: {
          vi: '“Lengthen” (kéo dài) luôn đến trước “fold” (gập) và “twist” (vặn). Hai đầu của cột sống là xương cụt và đỉnh đầu: kéo chúng ra xa nhau.',
          en: '“Lengthen” always comes before “fold” and “twist”. The two ends of the spine are the tailbone and the crown of the head: draw them apart.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'chain', id: 'spine-chain-neck',
        prompt: { vi: 'Ghép câu cue. Ý: “Giữ phía sau cổ dài; nhìn hơi về trước, không ngước lên.”', en: 'Build the cue. Meaning: keep the back of the neck long; look slightly forward, not up.' },
        pieces: ['Keep', 'the back of your neck', 'long;', 'gaze slightly forward,', 'not up.'],
        traps: ['the front of your neck', 'not down.'],
        clip: 'cervical-spine__cue-1',
        credits: { cued: ['cervical-spine'] },
        explain: {
          vi: 'Câu này dùng cho Rắn hổ mang, Con bò và mọi tư thế ngả sau: ngước lên quá nhiều làm cổ bị chèn. “Gaze” là ánh nhìn.',
          en: 'Use it in Cobra, Cow and every backbend: looking up too far pinches the neck. “Gaze” is where the eyes rest.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'dictation', id: 'spine-dictation-backbend',
        clip: 'lumbar-spine__cue-2',
        prompt: { vi: 'Nghe câu cue và gõ lại.', en: 'Listen to the cue and type it.' },
        credits: { cued: ['lumbar-spine'] },
        notes: {
          vi: 'Ba chỗ khó: “backbends” (ck và b liền nhau, đuôi ndz), “lengthen” (ng rồi th), “through” (th + r).',
          en: 'Three hard spots: “backbends” (ck and b together, final ndz), “lengthen” (ng then th), “through” (th + r).',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'sayit', id: 'spine-say',
        prompt: { vi: 'Nghe mẫu, rồi ghi âm chính bạn. Gemini sẽ nói bằng tiếng Việt cần sửa gì.', en: 'Hear the model, then record yourself. Gemini will tell you in Vietnamese what to fix.' },
        items: [
          { clip: 'thoracic-spine', text: 'thoracic spine', say: 'thor-AS-ik SPYN', credit: 'thoracic-spine' },
          { clip: 'sacrum', text: 'sacrum', say: 'SAY-krum', credit: 'sacrum' },
          { clip: 'tailbone', text: 'tailbone', say: 'TAYL-bohn', credit: 'tailbone' },
          { clip: 'latissimus-dorsi', text: 'latissimus dorsi', say: 'la-TIS-i-mus DOR-sy', credit: 'latissimus-dorsi' },
          { clip: 'thoracic-spine__cue-3', text: 'Twist from your upper back, not your lower back.', credit: 'thoracic-spine', kind: 'cue', credits: { cued: ['thoracic-spine'] } },
        ],
      },
    },
    { type: 'done' },
  ],
}
