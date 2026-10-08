/**
 * Lesson: the breath. The format is hip.js: meet each term on the figure,
 * hear it, hear it inside a real cue, then a check. The story: where the
 * breath goes (belly, ribs, collarbones), the diaphragm and the pelvic floor
 * moving together, the bandhas in plain words, the rhythm of a flow, ujjayi,
 * and what to say when a student holds their breath. The "when a student
 * struggles" line for each term is `breath__care-<term>`; the breath cues
 * the activities use are this lesson's own lines (`breath__<slug>`).
 *
 * The bones are on the front skeleton (viewBox units); the muscles on the
 * front figure (pixels), deep layer on the viewer's right: the diaphragm,
 * the pelvic floor and the transversus are traced there only.
 */
const CHEST = [90, 110, 230, 190]
const BELLY = [190, 360, 320, 280]

export const breathLesson = {
  id: 'breath',
  region: 'trunk',
  title: { en: 'Breath', vi: 'Hơi thở' },
  lead: {
    en: 'Eight words for teaching the breath in English: where the breath goes, the muscles that move it, and the gentle lift of the bandhas.',
    vi: 'Tám từ để dạy về hơi thở bằng tiếng Anh: hơi thở đi đến đâu, các cơ làm nó chuyển động, và cái nâng nhẹ nhàng của bandha.',
  },
  how: {
    en: 'Meet each word on the figure, hear it, put the breath cues in order, build them, then say them.',
    vi: 'Gặp từng từ trên hình, nghe, sắp xếp các câu cue về hơi thở, ghép câu, rồi nói thử.',
  },
  minutes: 15,
  pose: 'savasana',
  terms: ['diaphragm', 'ribs', 'collarbones', 'sternum', 'pelvic-floor', 'transversus-abdominis', 'rectus-abdominis', 'external-oblique'],
  /** Lesson names for bank labels where the term's `en` is not what a teacher says. */
  labels: { iliopsoas: 'hip flexors' },

  slides: [
    { type: 'intro' },

    // ── where the breath goes ─────────────────────────────────────────────
    {
      type: 'term', term: 'diaphragm',
      figure: { kind: 'front', window: [190, 250, 320, 260], highlight: ['diaphragm'] },
      cues: ['diaphragm__cue-1', 'diaphragm__cue-3'],
      care: { id: 'breath__care-diaphragm', en: 'If belly breathing feels strange, rest a hand on your belly and just watch it rise and fall.', vi: 'Nếu thở bằng bụng thấy lạ, đặt một tay lên bụng và chỉ quan sát nó phồng lên, xẹp xuống.' },
    },
    {
      type: 'term', term: 'ribs',
      figure: { kind: 'skeleton', window: CHEST, highlight: ['ribs'] },
      cues: ['ribs__cue-2', 'ribs__cue-1'],
      care: { id: 'breath__care-ribs', en: 'If your chest feels tight, wrap your hands around your lower ribs and breathe into your hands.', vi: 'Nếu ngực thấy căng, đặt hai tay ôm quanh xương sườn dưới và thở vào lòng bàn tay.' },
    },
    {
      type: 'term', term: 'collarbones',
      figure: { kind: 'skeleton', window: CHEST, highlight: ['collarbones'] },
      cues: ['collarbones__cue-1', 'collarbones__cue-2'],
      care: { id: 'breath__care-collarbones', en: 'If your shoulders creep up to your ears as you breathe in, let them stay heavy.', vi: 'Nếu vai nhô lên gần tai khi hít vào, để vai nặng xuống.' },
    },
    {
      type: 'activity',
      lines: [
        { id: 'breath__belly', kind: 'cue-breath', en: 'Breathe in through your nose, and let your belly rise.', vi: 'Hít vào bằng mũi, và để bụng phồng lên.' },
        { id: 'breath__ribs', kind: 'cue-breath', en: 'Keep breathing in, and feel your ribs widen.', vi: 'Tiếp tục hít vào, và cảm nhận xương sườn mở rộng.' },
        { id: 'breath__collarbones', kind: 'cue-breath', en: 'Let your breath rise all the way up to your collarbones.', vi: 'Để hơi thở dâng lên tận xương đòn.' },
        { id: 'breath__exhale-down', kind: 'cue-breath', en: 'Breathe out slowly, from your collarbones, to your ribs, to your belly.', vi: 'Thở ra chậm, từ xương đòn, xuống xương sườn, rồi đến bụng.' },
        { id: 'breath__belly-in', kind: 'cue-breath', en: 'At the end of your exhale, let your belly draw gently in.', vi: 'Cuối hơi thở ra, để bụng nhẹ nhàng hóp vào.' },
      ],
      activity: {
        type: 'order', id: 'breath-order-three-part',
        prompt: { vi: 'Sắp xếp hơi thở ba phần theo đúng thứ tự. Chạm loa để nghe từng câu.', en: 'Put the three-part breath in order. Tap the speaker to hear each one.' },
        steps: ['breath__belly', 'breath__ribs', 'breath__collarbones', 'breath__exhale-down', 'breath__belly-in'],
        explain: {
          vi: 'Hít vào từ dưới lên: bụng, xương sườn, xương đòn. Thở ra từ trên xuống, và bụng hóp nhẹ vào ở cuối. Nói chậm, theo nhịp thở của học viên.',
          en: 'Breathe in from the bottom up: belly, ribs, collarbones. Breathe out from the top down, and the belly draws in at the end. Say it slowly, at the pace of their breath.',
        },
      },
    },
    {
      type: 'term', term: 'sternum',
      figure: { kind: 'skeleton', window: CHEST, highlight: ['sternum'] },
      cues: ['sternum__cue-1', 'sternum__cue-3'],
      care: { id: 'breath__care-sternum', en: 'If your chest feels closed, sit up on a folded blanket and let your breastbone lift.', vi: 'Nếu ngực thấy bị bó, ngồi cao lên trên một tấm chăn gấp và để xương ức nâng lên.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'breath-label-chest',
        figure: { kind: 'skeleton', window: [80, 110, 250, 190], pad: [40, 40], font: 11 },
        prompt: { vi: 'Gắn mỗi tên vào đúng chỗ trên lồng ngực.', en: 'Put each name where it belongs on the rib cage.' },
        pins: [
          { id: 'sternum', x: 140, y: 110, side: 'above', to: [203, 198] },
          { id: 'collarbones', x: 270, y: 110, side: 'above', to: [252, 150] },
          { id: 'ribs', x: 148, y: 300, side: 'below', to: [160, 262] },
        ],
        bank: ['sternum', 'collarbones', 'ribs', 'shoulder-blades'],
        credits: { labelled: ['sternum', 'collarbones', 'ribs'] },
      },
    },

    // ── the floor and the corset ──────────────────────────────────────────
    {
      type: 'term', term: 'pelvic-floor',
      figure: { kind: 'front', window: [215, 510, 240, 210], highlight: ['pelvic-floor'] },
      cues: ['pelvic-floor__cue-1'],
      care: { id: 'breath__care-pelvic-floor', en: 'If you can’t feel your pelvic floor yet, don’t worry. Breathe out fully and notice the gentle lift.', vi: 'Nếu chưa cảm nhận được sàn chậu, đừng lo. Thở ra hết và để ý cảm giác nâng nhẹ.' },
    },
    {
      type: 'term', term: 'transversus-abdominis',
      figure: { kind: 'front', window: BELLY, highlight: ['transversus-abdominis'] },
      cues: ['transversus-abdominis__cue-2', 'transversus-abdominis__cue-1'],
      care: { id: 'breath__care-transversus-abdominis', en: 'If drawing your belly in makes you hold your breath, soften it. You should always be able to breathe.', vi: 'Nếu hóp bụng làm bạn nín thở, hãy thả lỏng bớt. Bạn luôn phải thở được.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'breath-label-deep',
        figure: { kind: 'front', window: [225, 360, 330, 330], pad: [46, 46], font: 11 },
        prompt: { vi: 'Các cơ thở nằm sâu trong thân. Bên phải hình là lớp sâu.', en: 'The deep muscles of the breath. The right of the figure is the deep layer.' },
        pins: [
          { id: 'diaphragm', x: 420, y: 360, side: 'above', to: [415, 400] },
          { id: 'pelvic-floor', x: 315, y: 690, side: 'below', to: [335, 657] },
          { id: 'transversus-abdominis', x: 468, y: 690, side: 'below', to: [432, 515] },
        ],
        bank: ['diaphragm', 'pelvic-floor', 'transversus-abdominis', 'ribs'],
        credits: { labelled: ['diaphragm', 'pelvic-floor', 'transversus-abdominis'] },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'hotspot', id: 'breath-hotspot-mula',
        figure: { kind: 'front', window: [190, 400, 320, 300] },
        clip: 'pelvic-floor__cue-1',
        prompt: { vi: 'Nghe câu cue. Học viên sẽ cảm thấy cái nâng ở đâu? Chạm vào hình.', en: 'Listen to the cue. Where will your students feel the lift? Tap the figure.' },
        accept: ['pelvic-floor'],
        reveal: ['pelvic-floor'],
        explain: {
          vi: 'Ở đáy khung chậu, giữa hai xương ngồi: sàn chậu. Nó chuyển động cùng cơ hoành: khi hít vào, cả hai hạ xuống và mềm ra; khi thở ra, cả hai nâng lên. Mula bandha chính là cái nâng đó, giữ thật nhẹ nhàng.',
          en: 'At the base of the pelvis, between the sitting bones: the pelvic floor. It moves with the diaphragm: as you breathe in, both soften down; as you breathe out, both lift. Mula bandha is that lift, kept gentle.',
        },
      },
    },

    // ── the belly and the waist ───────────────────────────────────────────
    {
      type: 'term', term: 'rectus-abdominis',
      figure: { kind: 'front', window: BELLY, highlight: ['rectus-abdominis'] },
      cues: ['rectus-abdominis__cue-2', 'rectus-abdominis__cue-3'],
      care: { id: 'breath__care-rectus-abdominis', en: 'If your belly shakes and your breath stops, bend your knees and keep breathing.', vi: 'Nếu bụng run và hơi thở ngừng lại, co gối và tiếp tục thở.' },
    },
    {
      type: 'term', term: 'external-oblique',
      figure: { kind: 'front', window: BELLY, highlight: ['external-oblique'] },
      cues: ['external-oblique__cue-2', 'external-oblique__cue-4'],
      care: { id: 'breath__care-external-oblique', en: 'If the twist makes breathing hard, come out a little until your breath is easy again.', vi: 'Nếu tư thế vặn làm bạn khó thở, lùi ra một chút cho đến khi thở lại dễ dàng.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'breath-label-layers',
        figure: { kind: 'front', window: [175, 380, 330, 240], pad: [46, 46], font: 11 },
        prompt: { vi: 'Bụng, từ lớp nông đến lớp sâu nhất. Bên phải hình là lớp sâu.', en: 'The belly, from the surface to the deepest layer. The right of the figure is the deep layer.' },
        pins: [
          { id: 'external-oblique', x: 260, y: 380, side: 'above', to: [240, 470] },
          { id: 'transversus-abdominis', x: 420, y: 380, side: 'above', to: [432, 515] },
          { id: 'rectus-abdominis', x: 320, y: 620, side: 'below', to: [305, 520] },
        ],
        bank: ['rectus-abdominis', 'external-oblique', 'transversus-abdominis', 'serratus-anterior'],
        credits: { labelled: ['rectus-abdominis', 'external-oblique', 'transversus-abdominis'] },
      },
    },

    // ── using the words to teach ──────────────────────────────────────────
    {
      type: 'activity',
      activity: {
        type: 'sort', id: 'breath-sort-boat', pose: 'boat-pose',
        prompt: { vi: 'Trong Con thuyền, cơ nào đang làm việc, cơ nào đang được kéo giãn?', en: 'In Boat Pose, which muscles are working and which are stretching?' },
        bins: [
          { id: 'working', vi: 'Đang làm việc', en: 'Working' },
          { id: 'stretching', vi: 'Đang kéo giãn', en: 'Stretching' },
        ],
        cards: [
          { term: 'rectus-abdominis', bin: 'working' },
          { term: 'transversus-abdominis', bin: 'working' },
          { term: 'iliopsoas', bin: 'working' },
          { term: 'hamstrings', bin: 'stretching' },
        ],
        explain: {
          vi: 'Cơ bụng trước và cơ bụng sâu giữ thân vững, cơ gấp hông nâng hai chân lên. Mặt sau đùi được kéo dài, nên hãy co gối nếu lưng dưới bị cong tròn.',
          en: 'The front and the deep belly hold the trunk steady, and the hip flexors lift the legs. The backs of the thighs lengthen, so bend the knees if the lower back rounds.',
        },
      },
    },
    {
      type: 'activity',
      lines: [
        { id: 'breath__holding', kind: 'cue-breath', en: 'If you notice you’re holding your breath, ease off until it flows again.', vi: 'Nếu bạn thấy mình đang nín thở, hãy nhẹ lại cho đến khi hơi thở trôi chảy trở lại.' },
      ],
      activity: {
        type: 'predict', id: 'breath-predict-boat',
        prompt: { vi: 'Trong Con thuyền, một học viên đỏ mặt và nín thở. Điều đó thường có nghĩa là gì?', en: 'In Boat Pose, a student’s face goes red and they hold their breath. What does it usually mean?' },
        options: [
          { id: 'too-much', en: 'They’re working harder than they need to', vi: 'Họ đang gắng sức nhiều hơn mức cần thiết' },
          { id: 'strong', en: 'Their core is strong and working well', vi: 'Cơ bụng của họ khoẻ và đang làm việc tốt' },
          { id: 'ujjayi', en: 'They’re doing ujjayi breathing', vi: 'Họ đang thở ujjayi' },
          { id: 'hamstrings', en: 'Their hamstrings are too tight', vi: 'Mặt sau đùi của họ quá căng' },
        ],
        correct: 'too-much',
        explain: {
          vi: 'Nín thở là dấu hiệu đã đi quá ngưỡng: bụng gồng cứng và cơ hoành không chuyển động được. Hãy giúp họ lùi lại một chút, co gối, và thở trở lại. Đây là câu bạn nói:',
          en: 'Holding the breath is a sign of going past the edge: the belly grips and the diaphragm can’t move. Help them back off, bend their knees and breathe again. This is what to say:',
        },
        then: { clip: 'breath__holding' },
      },
    },
    { type: 'pose', pose: 'savasana' },
    {
      type: 'activity',
      lines: [
        { id: 'breath__lengthen-fold', kind: 'cue-breath', en: 'Inhale, lengthen your spine. Exhale, fold forward from your hips.', vi: 'Hít vào, kéo dài cột sống. Thở ra, gập người về trước từ hông.' },
      ],
      activity: {
        type: 'chain', id: 'breath-chain-rhythm',
        prompt: { vi: 'Ghép câu cue. Ý: “Hít vào, kéo dài cột sống. Thở ra, gập người về trước từ hông.”', en: 'Build the cue. Meaning: inhale and lengthen the spine; exhale and fold forward from the hips.' },
        pieces: ['Inhale,', 'lengthen your spine.', 'Exhale,', 'fold forward', 'from your hips.'],
        traps: ['Hold your breath,', 'from your waist.'],
        clip: 'breath__lengthen-fold',
        explain: {
          vi: 'Đây là nhịp của cả một chuỗi flow: hít vào để kéo dài, thở ra để gập. Hơi thở đi trước, chuyển động theo sau. Gập từ hông, không phải từ eo.',
          en: 'This is the rhythm of a whole flow: inhale to lengthen, exhale to fold. The breath goes first and the movement follows. Fold from the hips, not the waist.',
        },
      },
    },
    {
      type: 'activity',
      lines: [
        { id: 'breath__floor-together', kind: 'cue-breath', en: 'As you breathe in, let your pelvic floor soften. As you breathe out, feel it lift.', vi: 'Khi hít vào, để sàn chậu mềm ra. Khi thở ra, cảm nhận nó nâng lên.' },
      ],
      activity: {
        type: 'chain', id: 'breath-chain-floor',
        prompt: { vi: 'Ghép câu cue. Ý: “Khi hít vào, để sàn chậu mềm ra. Khi thở ra, cảm nhận nó nâng lên.”', en: 'Build the cue. Meaning: as you breathe in, the pelvic floor softens; as you breathe out, it lifts.' },
        pieces: ['As you breathe in,', 'let your pelvic floor', 'soften.', 'As you breathe out,', 'feel it lift.'],
        traps: ['grip.', 'hold your breath,'],
        clip: 'breath__floor-together',
        credits: { cued: ['pelvic-floor'] },
        explain: {
          vi: 'Sàn chậu và cơ hoành chuyển động cùng nhau, như một pít-tông: hít vào, cả hai hạ xuống; thở ra, cả hai nâng lên. Đừng dạy học viên siết chặt.',
          en: 'The pelvic floor and the diaphragm move together, like a piston: breathe in and both move down; breathe out and both lift. Never teach students to grip.',
        },
      },
    },
    {
      type: 'activity',
      lines: [
        { id: 'breath__bandha', kind: 'cue-breath', en: 'Draw your low belly gently in, just below your navel.', vi: 'Hóp nhẹ bụng dưới vào, ngay dưới rốn.' },
      ],
      activity: {
        type: 'dictation', id: 'breath-dictation-bandha',
        clip: 'breath__bandha',
        prompt: { vi: 'Nghe câu cue và gõ lại. Đây là bandha nói bằng lời giản dị.', en: 'Listen to the cue and type it. This is bandha in plain words.' },
        credits: { cued: ['transversus-abdominis'] },
        notes: {
          vi: 'Ba chỗ khó: “draw” (d và r liền nhau), “belly” và “below” (âm l rõ), “navel” (NAY-vul, đuôi l).',
          en: 'Three hard spots: “draw” (d and r together), “belly” and “below” (a clear l), “navel” (NAY-vul, final l).',
        },
      },
    },
    {
      type: 'activity',
      lines: [
        { id: 'breath__ujjayi', kind: 'cue-breath', en: 'Breathe through your nose, with a soft ocean sound in your throat.', vi: 'Thở bằng mũi, với một âm thanh nhẹ như sóng biển trong cổ họng.' },
      ],
      activity: {
        type: 'sayit', id: 'breath-say',
        prompt: { vi: 'Nghe mẫu, rồi ghi âm chính bạn. Gemini sẽ nói bằng tiếng Việt cần sửa gì.', en: 'Hear the model, then record yourself. Gemini will tell you in Vietnamese what to fix.' },
        items: [
          { clip: 'diaphragm', text: 'diaphragm', say: 'DY-uh-fram', credit: 'diaphragm' },
          { clip: 'ribs', text: 'ribs', say: 'RIBZ', credit: 'ribs' },
          { clip: 'pelvic-floor', text: 'pelvic floor', say: 'PEL-vik FLOR', credit: 'pelvic-floor' },
          { clip: 'transversus-abdominis', text: 'transversus abdominis', say: 'trans-VER-sus ab-DOM-i-nis', credit: 'transversus-abdominis' },
          { clip: 'breath__ujjayi', text: 'Breathe through your nose, with a soft ocean sound in your throat.', kind: 'cue', credits: { cued: [] } },
        ],
      },
    },
    { type: 'done' },
  ],
}
