export const fishPose = {
  id: 'fish-pose',
  styles: ['vinyasa', 'ashtanga'],
  family: 'backbend',
  level: 'moderate',
  en: 'Fish Pose',
  sa: 'Matsyāsana',
  say: 'mat-see-AH-sah-nah',
  vi: 'Con cá',

  ashtanga: {
    series: 'primary',
    section: 'finishing',
    position: 45,
    breaths: 8,
    drishti: 'nose',
    note: {
      en: 'The counterpose to the shoulderstand group: roll down still in lotus, arch your back onto the crown of your head, and hold your feet, for eight breaths. The teacher says “Inhale, Matsyāsana” and counts eight.',
      vi: 'Tư thế đối của nhóm đứng bằng vai: lăn xuống vẫn giữ hoa sen, ưỡn lưng tựa lên đỉnh đầu, và nắm bàn chân, trong tám nhịp thở. Giáo viên nói “Hít vào, Matsyāsana” và đếm tám nhịp.',
    },
  },

  breath: {
    en: 'Breathe deeply into your chest. After the closed shoulderstand, it opens wide here.',
    vi: 'Thở sâu vào ngực. Sau tư thế đứng bằng vai khép kín, ngực được mở rộng ở đây.',
  },

  cues: [
    { id: 'fish-pose__cue-1', kind: 'transition', en: 'Roll down onto your back, keeping your legs in lotus.', vi: 'Lăn người xuống nằm ngửa, vẫn giữ chân trong hoa sen.' },
    { id: 'fish-pose__cue-2', kind: 'alignment', en: 'Press into your elbows and lift your chest up.', vi: 'Ấn khuỷu tay xuống và nâng ngực lên.' },
    { id: 'fish-pose__cue-3', kind: 'alignment', en: 'Arch your back, and rest the crown of your head lightly on the floor.', vi: 'Ưỡn lưng, và đặt nhẹ đỉnh đầu xuống sàn.' },
    { id: 'fish-pose__cue-4', kind: 'alignment', en: 'Hold your feet, and keep your knees down.', vi: 'Nắm bàn chân, và giữ gối hạ xuống.' },
    { id: 'fish-pose__cue-5', kind: 'alignment', en: 'Lift your breastbone up toward the ceiling.', vi: 'Nâng xương ức lên hướng trần nhà.' },
    { id: 'fish-pose__cue-6', kind: 'soften', en: 'Let your throat stay soft and open.', vi: 'Để cổ họng mềm và mở.' },
    { id: 'fish-pose__cue-7', kind: 'breath', en: 'Stay for eight breaths, breathing into your chest.', vi: 'Giữ tám nhịp thở, thở vào ngực.' },
    { id: 'fish-pose__cue-8', kind: 'safety', en: 'Keep the weight off your head. Your arms and back hold you up.', vi: 'Đừng dồn trọng lượng lên đầu. Tay và lưng nâng đỡ bạn.' },
    { id: 'fish-pose__cue-9', kind: 'transition', en: 'Inhale, release your lotus, and lift your legs up straight.', vi: 'Hít vào, thả hoa sen ra, và nâng hai chân thẳng lên.' },
  ],

  modifications: [
    { id: 'fish-pose__mod-1', en: 'Keep your legs straight on the floor instead of in lotus.', vi: 'Duỗi thẳng hai chân trên sàn thay vì hoa sen.', props: [] },
    { id: 'fish-pose__mod-2', en: 'Lie back over a block under your upper back, with your head resting down.', vi: 'Nằm ngả trên một viên gạch đặt dưới lưng trên, đầu tựa xuống.', props: ['block'] },
    { id: 'fish-pose__mod-3', en: 'Rest your head on a folded blanket if the crown doesn’t reach the floor.', vi: 'Đặt đầu lên chăn gấp nếu đỉnh đầu chưa chạm sàn.', props: ['blanket'] },
  ],

  safety: [
    { id: 'fish-pose__safe-1', en: 'With a neck injury, don’t take your head back. Rest it on a blanket instead.', vi: 'Nếu cổ có chấn thương, đừng ngửa đầu ra sau. Hãy đặt đầu lên chăn gấp.' },
    { id: 'fish-pose__safe-2', en: 'With a lower back injury, keep your legs straight and the arch small.', vi: 'Nếu lưng dưới có chấn thương, giữ hai chân thẳng và chỉ ưỡn nhẹ.' },
  ],

  muscles: { working: ['erector-spinae', 'rhomboids'], lengthening: ['rectus-abdominis', 'sternocleidomastoid'] },
  joints: ['thoracic-spine', 'cervical-spine', 'crown', 'knee'],
  transitionsTo: ['extended-leg-pose'],
  figure: 'fish-pose',
}
