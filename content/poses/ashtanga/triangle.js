export const triangle = {
  id: 'triangle',
  styles: ['vinyasa', 'ashtanga'],
  family: 'standing',
  level: 'moderate',
  en: 'Triangle Pose',
  aka: ['Extended Triangle', 'Triangle'],
  sa: 'Utthita Trikoṇāsana',
  say: 'oo-TEE-tah tri-koh-NAH-sah-nah',
  vi: 'Tam giác',

  ashtanga: {
    series: 'primary',
    section: 'standing',
    position: 12,
    vinyasas: 5,
    breaths: 5,
    drishti: 'hand',
    note: {
      en: 'The first standing pose taken to each side: five vinyasas, the right side on dve and the left on catvāri, five breaths each. The teacher counts “Ekam, inhale, step out to the right; dve, exhale, Utthita Trikoṇāsana”.',
      vi: 'Tư thế đứng đầu tiên tập từng bên: năm vinyasa, bên phải ở dve và bên trái ở catvāri, năm nhịp thở mỗi bên. Giáo viên đếm “Ekam, hít vào, bước sang phải; dve, thở ra, Utthita Trikoṇāsana”.',
    },
  },

  breath: {
    en: 'Exhale as you reach out and tip into the pose. Stay for five breaths, then inhale to come up.',
    vi: 'Thở ra khi bạn vươn ra và nghiêng người vào tư thế. Giữ năm nhịp thở, rồi hít vào để đứng lên.',
  },

  cues: [
    { id: 'triangle__cue-1', kind: 'transition', en: 'Step your feet about a leg’s length apart and turn your right toes out.', vi: 'Bước hai chân rộng khoảng một chiều dài chân và xoay mũi chân phải ra ngoài.' },
    { id: 'triangle__cue-2', kind: 'alignment', en: 'Line up your front heel with the arch of your back foot.', vi: 'Đặt gót chân trước thẳng hàng với vòm bàn chân sau.' },
    { id: 'triangle__cue-3', kind: 'alignment', en: 'Reach forward over your right leg, then tip down and hold your big toe.', vi: 'Vươn người về trước trên chân phải, rồi nghiêng xuống và nắm ngón chân cái.' },
    { id: 'triangle__cue-4', kind: 'alignment', en: 'Stretch your left arm up, in line with your right.', vi: 'Vươn tay trái lên, thẳng hàng với tay phải.' },
    { id: 'triangle__cue-5', kind: 'alignment', en: 'Lengthen both sides of your waist, and open your chest to the side.', vi: 'Kéo dài hai bên eo, và mở ngực sang bên.' },
    { id: 'triangle__cue-6', kind: 'soften', en: 'Soften your neck, and let your gaze rest on your top hand.', vi: 'Thả lỏng cổ, và để ánh nhìn nghỉ trên bàn tay phía trên.' },
    { id: 'triangle__cue-7', kind: 'breath', en: 'Stay for five breaths, long and smooth.', vi: 'Giữ năm nhịp thở, dài và đều.' },
    { id: 'triangle__cue-8', kind: 'safety', en: 'Don’t lock your front knee. Keep it soft and lifted.', vi: 'Đừng khoá gối trước. Giữ gối mềm và nâng xương bánh chè.' },
    { id: 'triangle__cue-9', kind: 'transition', en: 'Inhale, come up, and turn to the left.', vi: 'Hít vào, đứng lên, và xoay sang trái.' },
  ],

  modifications: [
    { id: 'triangle__mod-1', en: 'Rest your bottom hand on a block or on your shin instead of your toe.', vi: 'Đặt bàn tay dưới lên gạch hoặc lên ống chân thay vì nắm ngón chân.', props: ['block'] },
    { id: 'triangle__mod-2', en: 'Practise with your back against a wall to feel your body in one plane.', vi: 'Tập với lưng tựa vào tường để cảm nhận cơ thể nằm trên một mặt phẳng.', props: ['wall'] },
    { id: 'triangle__mod-3', en: 'If your neck is tired, look straight ahead or down at your front foot.', vi: 'Nếu cổ mỏi, nhìn thẳng về trước hoặc nhìn xuống bàn chân trước.', props: [] },
  ],

  safety: [
    { id: 'triangle__safe-1', en: 'If your knees tend to push back, keep a soft bend in your front knee.', vi: 'Nếu gối bạn hay bị ưỡn ra sau, giữ gối trước hơi chùng.' },
    { id: 'triangle__safe-2', en: 'With a neck injury, look forward, not up.', vi: 'Nếu cổ có chấn thương, nhìn về trước, không nhìn lên.' },
    { id: 'triangle__safe-3', en: 'In pregnancy, shorten your stance and use a block.', vi: 'Khi mang thai, thu ngắn khoảng cách hai chân và dùng gạch.' },
  ],

  muscles: {
    working: ['quadriceps', 'quadratus-lumborum', 'external-oblique'],
    lengthening: ['hamstrings', 'hip-adductors'],
  },
  joints: ['hip-joint', 'knee', 'pelvis', 'shoulder-joint'],
  transitionsTo: ['revolved-triangle'],
  figure: 'triangle',
}
