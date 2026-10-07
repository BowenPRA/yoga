/**
 * Lesson: the hip. A short phone deck in the style of the Dashboard's Notes
 * slides: meet each term on the figure, hear it, hear it inside a real cue,
 * then a check. Term data comes from content/anatomy; this file only says
 * which terms, in what order, with what checks, and adds the "when a student
 * hurts" line for each term (audio id `hip__care-<term>`).
 *
 * Figure windows are [x, y, w, h] in the figure's own pixels (muscles) or
 * viewBox units (skeleton). Label pins follow the Dashboard's labelIt shape:
 * (x, y) is where the leader meets the box, `side` is where the box grows,
 * `to` is the point on the part.
 */
export const hipLesson = {
  id: 'hip',
  region: 'hip',
  title: { en: 'The hip', vi: 'Hông' },
  lead: {
    en: 'Eight words for teaching a Yin hip class in English: the bones, the joint, and the muscles your students feel in Sleeping Swan.',
    vi: 'Tám từ để dạy lớp Yin mở hông bằng tiếng Anh: xương, khớp, và các cơ học viên cảm thấy trong Thiên nga ngủ.',
  },
  how: {
    en: 'Meet each word on the figure, hear it, label it, build a cue with it, then say it.',
    vi: 'Gặp từng từ trên hình, nghe, gắn nhãn, ghép câu cue với nó, rồi nói thử.',
  },
  minutes: 15,
  pose: 'sleeping-swan',
  terms: ['pelvis', 'hip-joint', 'sit-bones', 'gluteus-maximus', 'gluteus-medius', 'piriformis', 'iliopsoas', 'hip-adductors'],
  /** Lesson names for bank labels where the term's `en` is not what a teacher says. */
  labels: { iliopsoas: 'hip flexors' },

  slides: [
    { type: 'intro' },

    // ── bones and landmarks ───────────────────────────────────────────────
    {
      type: 'term', term: 'pelvis',
      figure: { kind: 'skeleton', window: [96, 286, 244, 160], highlight: ['pelvis'] },
      cues: ['pelvis__cue-3', 'pelvis__cue-1'],
      care: { id: 'hip__care-pelvis', en: 'If your lower back is complaining, bring your hips a little higher on a blanket.', vi: 'Nếu lưng dưới khó chịu, kê chăn để nâng hông cao hơn một chút.' },
    },
    {
      type: 'term', term: 'hip-joint',
      figure: { kind: 'skeleton', window: [96, 286, 244, 160], highlight: ['hip-joint'] },
      cues: ['hip-joint__cue-2', 'hip-joint__cue-1'],
      care: { id: 'hip__care-hip-joint', en: 'If you feel a pinch at the front of your hip, back out a little and take the knee wider.', vi: 'Nếu thấy nhói ở phía trước hông, lùi ra một chút và mở gối rộng hơn.' },
    },
    {
      type: 'term', term: 'sit-bones',
      figure: { kind: 'skeleton', window: [96, 286, 244, 160], highlight: ['sit-bones'] },
      cues: ['sit-bones__cue-3', 'sit-bones__cue-1'],
      care: { id: 'hip__care-sit-bones', en: 'If you can’t sit tall, sit up on a block so your sitting bones can tip forward.', vi: 'Nếu không ngồi thẳng được, ngồi lên gạch để xương ngồi có thể nghiêng về trước.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'hip-label-bones',
        figure: { kind: 'skeleton', window: [100, 290, 236, 150], pad: [46, 46], font: 11 },
        prompt: { vi: 'Gắn mỗi tên vào đúng chỗ trên khung chậu.', en: 'Put each name where it belongs on the pelvis.' },
        pins: [
          { id: 'pelvis', x: 280, y: 290, side: 'above', to: [264, 350] },
          { id: 'hip-joint', x: 158, y: 440, side: 'below', to: [152, 392] },
          { id: 'sit-bones', x: 280, y: 440, side: 'below', to: [238, 404] },
        ],
        bank: ['pelvis', 'hip-joint', 'sit-bones', 'tailbone'],
        credits: { labelled: ['pelvis', 'hip-joint', 'sit-bones'] },
      },
    },

    // ── the back of the hip ───────────────────────────────────────────────
    {
      type: 'term', term: 'gluteus-maximus',
      figure: { kind: 'back', window: [100, 440, 340, 280], highlight: ['gluteus-maximus'] },
      cues: ['gluteus-maximus__cue-3', 'gluteus-maximus__cue-1'],
      care: { id: 'hip__care-gluteus-maximus', en: 'If the outer hip feels too intense, slide the front foot closer in.', vi: 'Nếu hông ngoài căng quá, đưa bàn chân trước vào gần người hơn.' },
    },
    {
      type: 'term', term: 'gluteus-medius',
      figure: { kind: 'back', window: [100, 440, 340, 280], highlight: ['gluteus-medius'] },
      cues: ['gluteus-medius__cue-3', 'gluteus-medius__cue-1'],
      care: { id: 'hip__care-gluteus-medius', en: 'If the side of your hip cramps, come out, shake the leg out, and try again with less.', vi: 'Nếu bên hông bị chuột rút, thoát thế, lắc chân cho lỏng rồi thử lại nhẹ hơn.' },
    },
    {
      type: 'term', term: 'piriformis',
      figure: { kind: 'back', window: [100, 440, 340, 280], highlight: ['piriformis', 'deep-rotators'] },
      cues: ['piriformis__cue-1', 'piriformis__cue-2'],
      care: { id: 'hip__care-piriformis', en: 'If you feel it in your knee instead of your hip, come out and bring the shin closer to you.', vi: 'Nếu cảm thấy ở gối thay vì ở hông, thoát thế và đưa ống chân vào gần người hơn.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'hip-label-back',
        figure: { kind: 'back', window: [100, 440, 340, 280], pad: [46, 46], font: 13 },
        prompt: { vi: 'Mặt sau của hông. Bên trái hình là lớp sâu, bên phải là lớp nông.', en: 'The back of the hip. The left of the figure is the deep layer, the right the surface.' },
        pins: [
          { id: 'gluteus-medius', x: 185, y: 440, side: 'above', to: [183, 512] },
          { id: 'gluteus-maximus', x: 355, y: 720, side: 'below', to: [352, 586] },
          { id: 'piriformis', x: 185, y: 720, side: 'below', to: [214, 565] },
        ],
        bank: ['gluteus-maximus', 'gluteus-medius', 'piriformis', 'hamstrings'],
        credits: { labelled: ['gluteus-maximus', 'gluteus-medius', 'piriformis'] },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'hotspot', id: 'hip-hotspot-swan',
        figure: { kind: 'back', window: [100, 440, 340, 280] },
        clip: 'piriformis__cue-1',
        prompt: { vi: 'Nghe câu cue. Học viên sẽ cảm thấy ở đâu? Chạm vào hình.', en: 'Listen to the cue. Where will your students feel it? Tap the figure.' },
        accept: ['piriformis', 'deep-rotators', 'gluteus-maximus', 'gluteus-medius', 'gluteus-minimus'],
        reveal: ['piriformis', 'deep-rotators'],
        explain: {
          vi: 'Sâu bên ngoài hông: cơ hình lê và nhóm xoay sâu, nằm dưới cơ mông lớn. Nếu học viên nói “my knee”, đó là dấu hiệu để thoát thế.',
          en: 'Deep in the outer hip: the piriformis and the deep rotators, under the gluteus maximus. If a student says “my knee”, that is the sign to come out.',
        },
      },
    },

    // ── the front of the hip ──────────────────────────────────────────────
    {
      type: 'term', term: 'iliopsoas',
      figure: { kind: 'front', window: [150, 540, 370, 280], highlight: ['iliopsoas'] },
      cues: ['iliopsoas__cue-2', 'iliopsoas__cue-1'],
      care: { id: 'hip__care-iliopsoas', en: 'If the front of your hip pinches in the lunge, shorten your stance and lift your chest.', vi: 'Nếu phía trước hông bị nhói trong tư thế chùng chân, thu ngắn khoảng cách hai chân và nâng ngực lên.' },
    },
    {
      type: 'term', term: 'hip-adductors',
      figure: { kind: 'front', window: [150, 540, 370, 280], highlight: ['hip-adductors'] },
      cues: ['hip-adductors__cue-2', 'hip-adductors__cue-4'],
      care: { id: 'hip__care-hip-adductors', en: 'If your inner thighs are shaking, bring the knees closer together. Wider isn’t better.', vi: 'Nếu mặt trong đùi run, đưa hai gối lại gần nhau hơn. Mở rộng hơn không có nghĩa là tốt hơn.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'hip-label-front',
        figure: { kind: 'front', window: [150, 540, 370, 280], pad: [46, 46], font: 13 },
        prompt: { vi: 'Mặt trước của hông và đùi. Bên phải hình là lớp sâu.', en: 'The front of the hip and thigh. The right of the figure is the deep layer.' },
        pins: [
          { id: 'iliopsoas', x: 410, y: 540, side: 'above', to: [426, 624] },
          { id: 'hip-adductors', x: 400, y: 820, side: 'below', to: [372, 736] },
          { id: 'quadriceps', x: 230, y: 820, side: 'below', to: [250, 770] },
        ],
        bank: ['iliopsoas', 'hip-adductors', 'quadriceps', 'hamstrings'],
        credits: { labelled: ['iliopsoas', 'hip-adductors'] },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'hotspot', id: 'hip-hotspot-inner',
        figure: { kind: 'front', window: [150, 540, 370, 280] },
        clip: 'hip-adductors__plain',
        prompt: { vi: 'Nghe cụm từ, rồi chạm vào chỗ đó.', en: 'Listen to the phrase, then tap the place.' },
        accept: ['hip-adductors'],
        reveal: ['hip-adductors'],
        explain: {
          vi: '“Your inner thighs” là cách nói trong lớp cho nhóm cơ khép đùi (adductors). Chúng mở ra trong Con ếch, Chuồn chuồn và Chiến binh II.',
          en: '“Your inner thighs” is the class name for the adductors. They open in Frog, Dragonfly and Warrior II.',
        },
      },
    },

    // ── using the words to teach ──────────────────────────────────────────
    {
      type: 'activity',
      activity: {
        type: 'sort', id: 'hip-sort-warrior', pose: 'warrior-2',
        prompt: { vi: 'Trong Chiến binh II, cơ nào đang làm việc, cơ nào đang được kéo giãn?', en: 'In Warrior II, which muscles are working and which are stretching?' },
        bins: [
          { id: 'working', vi: 'Đang làm việc', en: 'Working' },
          { id: 'stretching', vi: 'Đang kéo giãn', en: 'Stretching' },
        ],
        cards: [
          { term: 'quadriceps', bin: 'working' },
          { term: 'gluteus-medius', bin: 'working' },
          { term: 'hip-adductors', bin: 'stretching' },
          { term: 'iliopsoas', bin: 'stretching' },
        ],
        explain: {
          vi: 'Chân trước: cơ tứ đầu đùi giữ gối gập, cơ mông nhỡ giữ hông cân bằng. Mặt trong đùi mở ra, và phía trước hông của chân sau (cơ thắt lưng chậu) được kéo dài.',
          en: 'Front leg: the quadriceps hold the bent knee, the gluteus medius keeps the hips level. The inner thighs open, and the front of the back hip (the iliopsoas) lengthens.',
        },
      },
    },
    { type: 'pose', pose: 'sleeping-swan' },
    {
      type: 'activity',
      activity: {
        type: 'predict', id: 'hip-predict-swan',
        prompt: { vi: 'Trong Thiên nga ngủ, học viên sẽ cảm thấy ở đâu?', en: 'In Sleeping Swan, where will your students feel it?' },
        options: [
          { id: 'outer-hip', en: 'Deep in the outer hip of the front leg', vi: 'Sâu bên ngoài hông của chân trước' },
          { id: 'knee', en: 'In the front knee', vi: 'Ở gối trước' },
          { id: 'lower-back', en: 'In the lower back', vi: 'Ở lưng dưới' },
          { id: 'neck', en: 'In the back of the neck', vi: 'Ở sau gáy' },
        ],
        correct: 'outer-hip',
        explain: {
          vi: 'Hông ngoài của chân trước: cơ hình lê, các cơ xoay sâu và cơ mông. Gối không được đau. Đây là câu bạn nói khi học viên cảm thấy ở gối:',
          en: 'The outer hip of the front leg: the piriformis, the deep rotators and the glutes. The knee should never hurt. This is what to say when a student feels it in the knee:',
        },
        then: { clip: 'sleeping-swan__cue-7' },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'order', id: 'hip-order-swan', pose: 'sleeping-swan',
        prompt: { vi: 'Sắp xếp các câu cue vào Thiên nga ngủ theo đúng thứ tự. Chạm loa để nghe từng câu.', en: 'Put the cues into Sleeping Swan in order. Tap the speaker to hear each one.' },
        steps: ['sleeping-swan__cue-1', 'sleeping-swan__cue-3', 'sleeping-swan__cue-4', 'sleeping-swan__cue-5', 'sleeping-swan__cue-8'],
        explain: {
          vi: 'Vào thế: gối, chân sau, gập người. Rồi mới “find your edge”. Thoát thế luôn là câu cuối, và nói chậm.',
          en: 'Set up: knee, back leg, fold. Only then “find your edge”. Coming out is always the last cue, and said slowly.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'chain', id: 'hip-chain-seat',
        prompt: { vi: 'Ghép câu cue. Ý: “Để mông nặng và mềm ra; chìm về phía sàn.”', en: 'Build the cue. Meaning: let the glutes get heavy and soft, sink toward the floor.' },
        pieces: ['Let', 'your seat', 'get heavy and soft;', 'sink', 'toward the floor.'],
        traps: ['your shoulders', 'lift'],
        clip: 'gluteus-maximus__cue-3',
        credits: { cued: ['gluteus-maximus'] },
        explain: {
          vi: '“Your seat” là cách nói dịu cho cơ mông trong lớp Yin. “Toward” nghĩa là hướng về phía, không cần chạm tới.',
          en: '“Your seat” is the gentle class word for the glutes in Yin. “Toward” means in that direction, not all the way.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'chain', id: 'hip-chain-socket',
        prompt: { vi: 'Ghép câu cue. Ý: “Để xương đùi lắng sâu hơn vào ổ khớp háng.”', en: 'Build the cue. Meaning: let the thigh bone settle deeper into the hip socket.' },
        pieces: ['Let', 'the thigh bone', 'settle', 'deeper', 'into the hip socket.'],
        traps: ['the knee', 'away from'],
        clip: 'hip-joint__cue-2',
        credits: { cued: ['hip-joint'] },
        explain: {
          vi: '“Settle” (lắng xuống) và “deeper into” (sâu hơn vào) là ngôn ngữ Yin: không ép, chỉ để trọng lượng làm việc.',
          en: '“Settle” and “deeper into” are Yin language: no pushing, the weight does the work.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'dictation', id: 'hip-dictation-sit',
        clip: 'sit-bones__cue-1',
        prompt: { vi: 'Nghe câu cue và gõ lại.', en: 'Listen to the cue and type it.' },
        credits: { cued: ['sit-bones'] },
        notes: {
          vi: 'Ba chỗ khó: “through” (th + r), “bones” (đuôi z), “lengthen” (ng rồi th).',
          en: 'Three hard spots: “through” (th + r), “bones” (final z), “lengthen” (ng then th).',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'sayit', id: 'hip-say',
        prompt: { vi: 'Nghe mẫu, rồi ghi âm chính bạn. Gemini sẽ nói bằng tiếng Việt cần sửa gì.', en: 'Hear the model, then record yourself. Gemini will tell you in Vietnamese what to fix.' },
        items: [
          { clip: 'sit-bones', text: 'sitting bones', say: 'SIT-ing BOHNZ', credit: 'sit-bones' },
          { clip: 'gluteus-maximus', text: 'gluteus maximus', say: 'GLOO-tee-us MAK-si-mus', credit: 'gluteus-maximus' },
          { clip: 'piriformis', text: 'piriformis', say: 'pir-i-FOR-mis', credit: 'piriformis' },
          { clip: 'hip-adductors__plain', text: 'your inner thighs', say: 'IN-er THYZ', credit: 'hip-adductors' },
          { clip: 'piriformis__cue-2', text: 'Find your edge and let the hip soften a little more with each exhale.', credit: 'piriformis', kind: 'cue', credits: { cued: ['piriformis'] } },
        ],
      },
    },
    { type: 'done' },
  ],
}
