export const revolvedTriangle = {
  id: 'revolved-triangle',
  styles: ['vinyasa', 'ashtanga'],
  family: 'twist',
  level: 'strong',
  en: 'Revolved Triangle',
  aka: ['Twisted Triangle'],
  sa: 'Parivṛtta Trikoṇāsana',
  say: 'pah-ree-VRIT-tah tri-koh-NAH-sah-nah',
  vi: 'Tam giác vặn',

  ashtanga: {
    series: 'primary',
    section: 'standing',
    position: 13,
    vinyasas: 5,
    breaths: 5,
    drishti: 'hand',
    note: {
      en: 'Straight after Utthita Trikoṇāsana: five vinyasas, the right side on dve and the left on catvāri, five breaths each. The teacher counts “Ekam, inhale, turn to the right; dve, exhale, Parivṛtta Trikoṇāsana”.',
      vi: 'Ngay sau Utthita Trikoṇāsana: năm vinyasa, bên phải ở dve và bên trái ở catvāri, năm nhịp thở mỗi bên. Giáo viên đếm “Ekam, hít vào, xoay sang phải; dve, thở ra, Parivṛtta Trikoṇāsana”.',
    },
  },

  breath: {
    en: 'Inhale to lengthen your spine. Exhale to twist. Stay for five breaths, turning a little more on each exhale.',
    vi: 'Hít vào để kéo dài cột sống. Thở ra để vặn. Giữ năm nhịp thở, vặn thêm một chút ở mỗi hơi thở ra.',
  },

  cues: [
    { id: 'revolved-triangle__cue-1', kind: 'transition', en: 'Turn your right toes out and your back foot in, and square your hips forward.', vi: 'Xoay mũi chân phải ra ngoài, bàn chân sau xoay vào trong, và hướng hông vuông về phía trước.' },
    { id: 'revolved-triangle__cue-2', kind: 'transition', en: 'Exhale, fold over your front leg and bring your left hand outside your right foot.', vi: 'Thở ra, gập người trên chân trước và đặt tay trái ra ngoài bàn chân phải.' },
    { id: 'revolved-triangle__cue-3', kind: 'alignment', en: 'Press your back heel down and keep your back leg strong.', vi: 'Ấn gót chân sau xuống và giữ chân sau vững.' },
    { id: 'revolved-triangle__cue-4', kind: 'alignment', en: 'Draw your right hip back as you twist.', vi: 'Kéo hông phải ra sau khi bạn vặn.' },
    { id: 'revolved-triangle__cue-5', kind: 'alignment', en: 'Reach your right arm up and look at your top hand.', vi: 'Vươn tay phải lên và nhìn bàn tay phía trên.' },
    { id: 'revolved-triangle__cue-6', kind: 'soften', en: 'Twist from your belly, not from your neck.', vi: 'Vặn từ bụng, không phải từ cổ.' },
    { id: 'revolved-triangle__cue-7', kind: 'breath', en: 'Inhale to lengthen, exhale to twist a little more.', vi: 'Hít vào để kéo dài, thở ra để vặn thêm một chút.' },
    { id: 'revolved-triangle__cue-8', kind: 'safety', en: 'Keep your neck long. If it strains, look down at the floor.', vi: 'Giữ cổ dài. Nếu cổ căng, nhìn xuống sàn.' },
    { id: 'revolved-triangle__cue-9', kind: 'transition', en: 'Inhale, come up, and turn to the left.', vi: 'Hít vào, đứng lên, và xoay sang trái.' },
  ],

  modifications: [
    { id: 'revolved-triangle__mod-1', en: 'Put your bottom hand on a block, inside or outside your front foot.', vi: 'Đặt bàn tay dưới lên gạch, ở phía trong hoặc phía ngoài bàn chân trước.', props: ['block'] },
    { id: 'revolved-triangle__mod-2', en: 'Shorten your stance, and widen your feet for more balance.', vi: 'Thu ngắn khoảng cách hai chân, và đặt hai chân rộng sang hai bên để vững hơn.', props: [] },
    { id: 'revolved-triangle__mod-3', en: 'Keep your top hand on your hip.', vi: 'Đặt bàn tay phía trên lên hông.', props: [] },
  ],

  safety: [
    { id: 'revolved-triangle__safe-1', en: 'With lower back or sacrum pain, twist only a little and let your hips turn with you.', vi: 'Nếu lưng dưới hoặc xương cùng bị đau, chỉ vặn nhẹ và để hông xoay theo.' },
    { id: 'revolved-triangle__safe-2', en: 'In pregnancy, skip closed twists. Take Triangle again instead.', vi: 'Khi mang thai, bỏ qua các tư thế vặn kín. Tập lại Tam giác thay thế.' },
  ],

  muscles: {
    working: ['quadriceps', 'external-oblique', 'internal-oblique'],
    lengthening: ['hamstrings', 'gluteus-medius'],
  },
  joints: ['hip-joint', 'thoracic-spine', 'sacrum', 'ankle'],
  transitionsTo: ['extended-side-angle'],
  figure: 'revolved-triangle',
}
