/**
 * Lesson: the shoulder girdle. Same deck format as hip.js: meet each term on
 * the figure, hear it, hear it inside a real cue, then a check. The story:
 * "relax your shoulders away from your ears" (trapezius), spreading the
 * shoulder blades versus drawing them together, the rotator cuff and why
 * Chaturanga hurts shoulders, the chest opening in backbends, and what to
 * say when a shoulder pinches (the `care` line on each term slide, audio id
 * `shoulder__care-<term>`).
 *
 * Figure windows are [x, y, w, h] in the figure's own pixels (muscles) or
 * viewBox units (skeleton). On the back figure the deep layer (rotator cuff,
 * rhomboids) is on the viewer's left and the surface (trapezius, deltoid) on
 * the right; on the front figure the surface (pectoralis major) is on the
 * left and the deep layer (serratus anterior) on the right.
 */
const SKELETON = [72, 124, 264, 162]
const BACK = [70, 40, 400, 330]
const FRONT = [120, 180, 440, 280]

export const shoulderLesson = {
  id: 'shoulder',
  region: 'shoulder-girdle',
  title: { en: 'Shoulder girdle', vi: 'Vai' },
  lead: {
    en: 'Nine words for the shoulders: the bones, the muscles that move your shoulder blades, and what to say in Downward Dog and Chaturanga.',
    vi: 'Chín từ cho vùng vai: các xương, các cơ di chuyển bả vai, và những câu cần nói trong Chó úp mặt và Chaturanga.',
  },
  how: {
    en: 'Meet each word on the figure, hear it, label it, build a cue with it, then say it.',
    vi: 'Gặp từng từ trên hình, nghe, gắn nhãn, ghép câu cue với nó, rồi nói thử.',
  },
  minutes: 15,
  pose: 'downward-dog',
  terms: ['collarbones', 'shoulder-blades', 'shoulder-joint', 'trapezius', 'rhomboids', 'rotator-cuff', 'serratus-anterior', 'protraction-retraction', 'pectoralis-major'],

  slides: [
    { type: 'intro' },

    // ── the bones ─────────────────────────────────────────────────────────
    {
      type: 'term', term: 'collarbones',
      figure: { kind: 'skeleton', window: SKELETON, highlight: ['collarbones'] },
      cues: ['collarbones__cue-1', 'collarbones__cue-2'],
      care: { id: 'shoulder__care-collarbones', en: 'If your upper back aches while you sit, lean against a wall and broaden across your collarbones.', vi: 'Nếu lưng trên mỏi khi ngồi, tựa lưng vào tường và mở rộng hai bên xương quai xanh.' },
    },
    {
      type: 'term', term: 'shoulder-blades',
      figure: { kind: 'skeleton', window: SKELETON, highlight: ['shoulder-blades'] },
      cues: ['shoulder-blades__cue-1', 'shoulder-blades__cue-4'],
      care: { id: 'shoulder__care-shoulder-blades', en: 'If you feel a sharp pinch by your shoulder blade, back off until it’s only a stretch.', vi: 'Nếu thấy nhói gần bả vai, lùi ra đến khi chỉ còn cảm giác kéo giãn.' },
    },
    {
      type: 'term', term: 'shoulder-joint',
      figure: { kind: 'skeleton', window: SKELETON, highlight: ['shoulder-joint'] },
      cues: ['shoulder-joint__cue-2', 'shoulder-joint__cue-3'],
      care: { id: 'shoulder__care-shoulder-joint', en: 'If your shoulders pinch with your arms overhead, open your arms into a wide V.', vi: 'Nếu vai bị kẹt nhói khi giơ tay qua đầu, mở hai tay rộng thành hình chữ V.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'shoulder-label-bones',
        figure: { kind: 'skeleton', window: SKELETON, pad: [46, 46], font: 11 },
        prompt: { vi: 'Gắn mỗi tên vào đúng chỗ trên bộ xương.', en: 'Put each name in its place on the skeleton.' },
        pins: [
          { id: 'shoulder-joint', x: 130, y: 124, side: 'above', to: [126, 176] },
          { id: 'collarbones', x: 280, y: 124, side: 'above', to: [248, 151] },
          { id: 'shoulder-blades', x: 280, y: 286, side: 'below', to: [266, 190] },
        ],
        bank: ['collarbones', 'shoulder-blades', 'shoulder-joint', 'sternum'],
        credits: { labelled: ['collarbones', 'shoulder-blades', 'shoulder-joint'] },
      },
    },

    // ── the back of the shoulders ─────────────────────────────────────────
    {
      type: 'term', term: 'trapezius',
      figure: { kind: 'back', window: BACK, highlight: ['trapezius'] },
      cues: ['trapezius__cue-1', 'trapezius__cue-4'],
      care: { id: 'shoulder__care-trapezius', en: 'If your neck gets tense, rest your hands on your hips for a few breaths.', vi: 'Nếu cổ bị căng, đặt hai tay lên hông vài nhịp thở.' },
    },
    {
      type: 'term', term: 'rhomboids',
      figure: { kind: 'back', window: BACK, highlight: ['rhomboids'] },
      cues: ['rhomboids__cue-2', 'rhomboids__cue-3'],
      care: { id: 'shoulder__care-rhomboids', en: 'If you feel a cramp between your shoulder blades, soften the squeeze and breathe.', vi: 'Nếu thấy chuột rút giữa hai bả vai, nới lỏng lực siết và hít thở.' },
    },
    {
      type: 'term', term: 'rotator-cuff',
      figure: { kind: 'back', window: BACK, highlight: ['rotator-cuff'] },
      cues: ['rotator-cuff__cue-1', 'rotator-cuff__cue-2'],
      care: { id: 'shoulder__care-rotator-cuff', en: 'If your shoulder aches when you lower, put your knees down first.', vi: 'Nếu vai đau khi hạ người xuống, hạ gối xuống sàn trước.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'shoulder-label-back',
        figure: { kind: 'back', window: BACK, pad: [46, 46], font: 15 },
        prompt: { vi: 'Mặt sau của vai. Bên trái hình là lớp sâu, bên phải là lớp nông.', en: 'The back of the shoulders. The left of the figure is the deep layer, the right the surface.' },
        pins: [
          { id: 'rotator-cuff', x: 150, y: 40, side: 'above', to: [160, 255] },
          { id: 'trapezius', x: 360, y: 40, side: 'above', to: [345, 165] },
          { id: 'rhomboids', x: 245, y: 370, side: 'below', to: [244, 236] },
        ],
        bank: ['trapezius', 'rhomboids', 'rotator-cuff', 'deltoids'],
        credits: { labelled: ['trapezius', 'rhomboids', 'rotator-cuff'] },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'hotspot', id: 'shoulder-hotspot-ears',
        figure: { kind: 'back', window: BACK },
        clip: 'trapezius__cue-3',
        prompt: { vi: 'Nghe câu cue. Học viên sẽ thả lỏng ở đâu? Chạm vào hình. Bên phải hình là lớp nông.', en: 'Listen to the cue. Where will your students let go? Tap the figure. The right of the figure is the surface layer.' },
        accept: ['trapezius', 'levator-scapulae'],
        reveal: ['trapezius'],
        explain: {
          vi: 'Phần trên của cơ thang, giữa cổ và vai: chỗ gồng lên khi vai nhún về phía tai. Câu này hợp với Yin và lúc nằm thư giãn cuối buổi.',
          en: 'The upper trapezius, between the neck and the shoulder: what tightens when the shoulders creep up to the ears. Use this cue in Yin and in the final rest.',
        },
      },
    },

    // ── the front: push and open ──────────────────────────────────────────
    {
      type: 'term', term: 'serratus-anterior',
      figure: { kind: 'front', window: FRONT, highlight: ['serratus-anterior'] },
      cues: ['serratus-anterior__cue-1', 'serratus-anterior__cue-2'],
      care: { id: 'shoulder__care-serratus-anterior', en: 'If Plank makes your shoulders ache, lower your knees and push the floor away.', vi: 'Nếu Plank làm vai mỏi đau, hạ gối xuống và đẩy sàn ra xa.' },
    },
    {
      type: 'term', term: 'protraction-retraction',
      figure: { kind: 'skeleton', window: SKELETON, highlight: ['shoulder-blades'] },
      cues: ['protraction-retraction__cue-1', 'protraction-retraction__cue-2'],
      care: { id: 'shoulder__care-protraction-retraction', en: 'If your neck tightens when you squeeze your shoulder blades, draw them down instead.', vi: 'Nếu cổ căng lên khi bạn khép hai bả vai, hãy kéo chúng xuống thay vì khép lại.' },
    },
    {
      type: 'term', term: 'pectoralis-major',
      figure: { kind: 'front', window: FRONT, highlight: ['pectoralis-major'] },
      cues: ['pectoralis-major__cue-1', 'pectoralis-major__cue-4'],
      care: { id: 'shoulder__care-pectoralis-major', en: 'If the front of your chest feels strained, bring your arms lower and closer to your body.', vi: 'Nếu phía trước ngực bị căng quá, hạ hai tay thấp xuống và đưa gần vào thân hơn.' },
    },
    {
      type: 'activity',
      activity: {
        type: 'label', id: 'shoulder-label-front',
        figure: { kind: 'front', window: FRONT, pad: [46, 46], font: 16 },
        prompt: { vi: 'Mặt trước của vai và ngực. Bên phải hình là lớp sâu.', en: 'The front of the shoulders and chest. The right of the figure is the deep layer.' },
        pins: [
          { id: 'deltoids', x: 210, y: 180, side: 'above', to: [180, 275] },
          { id: 'pectoralis-major', x: 400, y: 180, side: 'above', to: [290, 300] },
          { id: 'serratus-anterior', x: 450, y: 460, side: 'below', to: [452, 375] },
        ],
        bank: ['pectoralis-major', 'serratus-anterior', 'deltoids', 'rhomboids'],
        credits: { labelled: ['pectoralis-major', 'serratus-anterior'] },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'hotspot', id: 'shoulder-hotspot-wrap',
        figure: { kind: 'front', window: FRONT },
        clip: 'serratus-anterior__cue-3',
        prompt: { vi: 'Nghe câu cue. Học viên sẽ cảm thấy cơ nào làm việc? Chạm vào hình. Bên phải hình là lớp sâu.', en: 'Listen to the cue. Which muscle will your students feel working? Tap the figure. The right of the figure is the deep layer.' },
        accept: ['serratus-anterior', 'pectoralis-minor'],
        reveal: ['serratus-anterior'],
        explain: {
          vi: 'Cơ răng trước, dọc theo xương sườn bên. Nó ôm bả vai vào lồng ngực và đẩy sàn ra xa trong Plank, Chó úp mặt và Mèo.',
          en: 'The serratus anterior, along the side ribs. It wraps the shoulder blades onto the ribs and pushes the floor away in Plank, Downward Dog and Cat.',
        },
      },
    },

    // ── using the words to teach ──────────────────────────────────────────
    {
      type: 'activity',
      activity: {
        type: 'sort', id: 'shoulder-sort-locust', pose: 'locust-pose',
        prompt: { vi: 'Trong Châu chấu, cơ nào đang làm việc, cơ nào đang được kéo giãn?', en: 'In Locust, which muscles are working and which are stretching?' },
        bins: [
          { id: 'working', vi: 'Đang làm việc', en: 'Working' },
          { id: 'stretching', vi: 'Đang kéo giãn', en: 'Stretching' },
        ],
        cards: [
          { term: 'rhomboids', bin: 'working' },
          { term: 'erector-spinae', bin: 'working' },
          { term: 'pectoralis-major', bin: 'stretching' },
          { term: 'rectus-abdominis', bin: 'stretching' },
        ],
        explain: {
          vi: 'Lưng làm việc: cơ trám khép hai bả vai lại, cơ dựng sống nâng ngực lên. Phía trước mở ra: cơ ngực lớn và cơ bụng trước được kéo dài. Vì thế ta nói các tư thế ngả sau “mở ngực”.',
          en: 'The back works: the rhomboids draw the shoulder blades together, the erector spinae lift the chest. The front opens: the pectoralis major and the rectus abdominis lengthen. That is why we say backbends “open the chest”.',
        },
      },
    },
    { type: 'pose', pose: 'downward-dog' },
    {
      type: 'activity',
      activity: {
        type: 'predict', id: 'shoulder-predict-chaturanga',
        prompt: { vi: 'Trong Chaturanga, một học viên hạ người thấp đến mức vai thấp hơn khuỷu tay. Họ sẽ cảm thấy ở đâu?', en: 'In Chaturanga, a student lowers until their shoulders are below their elbows. Where will they feel it?' },
        options: [
          { id: 'front-shoulder', en: 'At the front of the shoulder', vi: 'Ở phía trước vai' },
          { id: 'wrists', en: 'In the wrists', vi: 'Ở cổ tay' },
          { id: 'lower-back', en: 'In the lower back', vi: 'Ở lưng dưới' },
          { id: 'between', en: 'Between the shoulder blades', vi: 'Giữa hai bả vai' },
        ],
        correct: 'front-shoulder',
        explain: {
          vi: 'Phía trước vai. Khi vai thấp hơn khuỷu, đầu xương cánh tay bị đẩy về trước và chóp xoay phải chịu lực. Lặp lại hàng chục lần mỗi buổi tập, vai sẽ bắt đầu đau: đó là lý do Chaturanga hay làm đau vai. Đây là câu bạn nói:',
          en: 'At the front of the shoulder. When the shoulders drop below the elbows, the top of the upper arm bone tips forward and the rotator cuff takes the strain. Do that dozens of times a class and the shoulder starts to hurt: that is why Chaturanga hurts shoulders. This is what to say:',
        },
        then: { clip: 'chaturanga__cue-5' },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'order', id: 'shoulder-order-dog', pose: 'downward-dog',
        prompt: { vi: 'Sắp xếp các câu cue vào Chó úp mặt theo đúng thứ tự. Chạm loa để nghe từng câu.', en: 'Put the cues for Downward Dog in order. Tap the speaker to hear each one.' },
        steps: ['downward-dog__cue-1', 'downward-dog__cue-2', 'downward-dog__cue-4', 'downward-dog__cue-7', 'downward-dog__cue-9'],
        explain: {
          vi: 'Vào thế, rồi xây từ tay lên: bàn tay trước, rồi bắp tay xoay ra ngoài. Giữ năm nhịp thở. Câu cuối đưa học viên ra khỏi thế, ở cuối hơi thở ra.',
          en: 'Come into the pose, then build from the hands up: hands first, then the upper arms turn out. Stay five breaths. The last cue takes your students out, at the end of an exhale.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'chain', id: 'shoulder-chain-spread',
        prompt: { vi: 'Ghép câu cue. Ý: “Trong Plank, mở rộng hai bả vai trên lưng.”', en: 'Build the cue. Meaning: in Plank, spread your shoulder blades wide across your back.' },
        pieces: ['In Plank,', 'spread', 'your shoulder blades', 'wide', 'across your back.'],
        traps: ['squeeze', 'toward your ears'],
        clip: 'shoulder-blades__cue-3',
        credits: { cued: ['shoulder-blades', 'protraction-retraction'] },
        explain: {
          vi: '“Spread” (mở rộng) là chữ cho bả vai trong Plank và Mèo. Ngược lại là “draw together” (khép lại), trong Rắn hổ mang và Châu chấu. Ở đây không dùng “squeeze”.',
          en: '“Spread” is the shoulder-blade word for Plank and Cat. Its opposite, “draw together”, belongs to Cobra and Locust. Not “squeeze” here.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'chain', id: 'shoulder-chain-draw',
        prompt: { vi: 'Ghép câu cue. Ý: “Kéo hai bả vai lại gần nhau và nâng ngực lên.”', en: 'Build the cue. Meaning: draw the shoulder blades toward each other and lift the chest.' },
        pieces: ['Draw', 'your shoulder blades', 'toward each other', 'and lift', 'your chest.'],
        traps: ['away from each other', 'your chin.'],
        clip: 'rhomboids__cue-1',
        credits: { cued: ['rhomboids'] },
        explain: {
          vi: 'Đây là việc của cơ trám. “Toward each other” (về phía nhau) nhẹ hơn “squeeze”: học viên khép bả vai mà không gồng cổ. Nâng ngực, không nâng cằm.',
          en: 'This is the rhomboids’ job. “Toward each other” is softer than “squeeze”: your students draw the shoulder blades in without tensing the neck. Lift the chest, not the chin.',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'dictation', id: 'shoulder-dictation-ears',
        clip: 'trapezius__cue-1',
        prompt: { vi: 'Nghe câu cue và gõ lại.', en: 'Listen to the cue and type it.' },
        credits: { cued: ['trapezius', 'shoulder-joint'] },
        notes: {
          vi: 'Ba chỗ khó: “shoulders” (cụm ld, đuôi z), “away from” (đọc liền hai từ), “ears” (đuôi z).',
          en: 'Three hard spots: “shoulders” (ld, final z), “away from” (run the two words together), “ears” (final z).',
        },
      },
    },
    {
      type: 'activity',
      activity: {
        type: 'sayit', id: 'shoulder-say',
        prompt: { vi: 'Nghe mẫu, rồi ghi âm chính bạn. Gemini sẽ nói bằng tiếng Việt cần sửa gì.', en: 'Hear the model, then record yourself. Gemini will tell you in Vietnamese what to fix.' },
        items: [
          { clip: 'shoulder-blades', text: 'shoulder blades', say: 'SHOHL-der BLAYDZ', credit: 'shoulder-blades' },
          { clip: 'trapezius', text: 'trapezius', say: 'tra-PEE-zee-us', credit: 'trapezius' },
          { clip: 'rhomboids', text: 'rhomboids', say: 'ROM-boydz', credit: 'rhomboids' },
          { clip: 'serratus-anterior', text: 'serratus anterior', say: 'ser-AY-tus an-TEER-ee-or', credit: 'serratus-anterior' },
          { clip: 'rotator-cuff__cue-1', text: 'Rotate your upper arms outward so the shoulders feel wide.', credit: 'rotator-cuff', kind: 'cue', credits: { cued: ['rotator-cuff'] } },
        ],
      },
    },
    { type: 'done' },
  ],
}
