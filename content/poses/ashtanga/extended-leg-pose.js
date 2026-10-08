export const extendedLegPose = {
  id: 'extended-leg-pose',
  styles: ['ashtanga'],
  family: 'backbend',
  level: 'strong',
  en: 'Extended Leg Pose',
  aka: ['Raised Leg Pose'],
  sa: 'Uttāna Pādāsana',
  say: 'oo-TAH-nah pah-DAH-sah-nah',
  vi: 'Con cá duỗi chân',

  ashtanga: {
    series: 'primary',
    section: 'finishing',
    position: 46,
    breaths: 8,
    drishti: 'third-eye',
    note: {
      en: 'Straight from Matsyāsana: release the lotus and lift your straight legs and arms, still on the crown of your head, for eight breaths. Then a backward roll, Cakrāsana, takes you into the vinyasa before Śīrṣāsana; the teacher says “Inhale, Uttāna Pādāsana” and counts eight.',
      vi: 'Tiếp ngay từ Matsyāsana: thả hoa sen ra và nâng hai chân thẳng cùng hai tay lên, vẫn tựa trên đỉnh đầu, trong tám nhịp thở. Sau đó một lần lăn ngược ra sau, Cakrāsana, đưa bạn vào vinyasa trước Śīrṣāsana; giáo viên nói “Hít vào, Uttāna Pādāsana” và đếm tám nhịp.',
    },
  },

  breath: {
    en: 'Breathe steadily. Your belly and legs work hard here, so keep the breath long.',
    vi: 'Thở đều. Bụng và chân làm việc nhiều ở đây, nên hãy giữ hơi thở dài.',
  },

  cues: [
    { id: 'extended-leg-pose__cue-1', kind: 'transition', en: 'Keep the arch in your back, and release your legs from lotus.', vi: 'Giữ lưng ưỡn, và thả hai chân ra khỏi hoa sen.' },
    { id: 'extended-leg-pose__cue-2', kind: 'alignment', en: 'Lift your straight legs to about forty-five degrees, feet together.', vi: 'Nâng hai chân thẳng lên khoảng bốn mươi lăm độ, hai bàn chân khép lại.' },
    { id: 'extended-leg-pose__cue-3', kind: 'alignment', en: 'Reach your arms up alongside your legs, palms together.', vi: 'Vươn hai tay lên song song với chân, lòng bàn tay chắp lại.' },
    { id: 'extended-leg-pose__cue-4', kind: 'alignment', en: 'Point your toes, and reach through your fingertips.', vi: 'Duỗi mũi chân, và vươn dài đến tận đầu ngón tay.' },
    { id: 'extended-leg-pose__cue-5', kind: 'soften', en: 'Keep your face soft while your legs work.', vi: 'Giữ khuôn mặt mềm trong khi hai chân làm việc.' },
    { id: 'extended-leg-pose__cue-6', kind: 'breath', en: 'Stay for eight breaths, steady and long.', vi: 'Giữ tám nhịp thở, đều và dài.' },
    { id: 'extended-leg-pose__cue-7', kind: 'safety', en: 'If your neck or lower back strains, lower your head and legs and rest.', vi: 'Nếu cổ hoặc lưng dưới bị căng, hạ đầu và chân xuống và nghỉ.' },
    { id: 'extended-leg-pose__cue-8', kind: 'transition', en: 'Exhale, lower your legs, then roll back over into Chaturanga.', vi: 'Thở ra, hạ hai chân xuống, rồi lăn ngược ra sau vào Chaturanga.' },
  ],

  modifications: [
    { id: 'extended-leg-pose__mod-1', en: 'Keep your head on the floor, and lift one leg at a time.', vi: 'Giữ đầu trên sàn, và nâng từng chân một.', props: [] },
    { id: 'extended-leg-pose__mod-2', en: 'Keep your hands on the floor beside your hips for support.', vi: 'Đặt hai tay trên sàn cạnh hông để nâng đỡ.', props: [] },
    { id: 'extended-leg-pose__mod-3', en: 'Bend your knees, and keep your shins parallel to the floor.', vi: 'Gập gối, và giữ ống chân song song với sàn.', props: [] },
  ],

  safety: [
    { id: 'extended-leg-pose__safe-1', en: 'With a neck injury, keep the back of your head on the floor.', vi: 'Nếu cổ có chấn thương, giữ phía sau đầu trên sàn.' },
    { id: 'extended-leg-pose__safe-2', en: 'With a lower back injury, or in pregnancy, skip the leg lift.', vi: 'Nếu lưng dưới có chấn thương, hoặc khi mang thai, bỏ qua bước nâng chân.' },
  ],

  muscles: { working: ['iliopsoas', 'quadriceps', 'erector-spinae'], lengthening: ['sternocleidomastoid'] },
  joints: ['hip-joint', 'thoracic-spine', 'cervical-spine', 'crown'],
  transitionsTo: ['headstand'],
  figure: 'extended-leg-pose',
}
