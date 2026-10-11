export const shoulderstand = {
  id: 'shoulderstand',
  styles: ['vinyasa', 'ashtanga'],
  family: 'inversion',
  level: 'strong',
  en: 'Shoulderstand',
  aka: ['Supported Shoulderstand'],
  sa: 'Sālamba Sarvāṅgāsana',
  say: 'sah-LAHM-bah sar-vahn-GAH-sah-nah',
  vi: 'Đứng bằng vai',

  ashtanga: {
    series: 'primary',
    section: 'finishing',
    position: 41,
    breaths: 10,
    drishti: 'nose',
    note: {
      en: 'The first of the inversions that close the practice, after Paścimottānāsana: ten breaths, and longer in your own practice, up to twenty-five. Halāsana, Karṇapīḍāsana and the lotus in the air follow without coming down; the teacher says “Inhale, Sālamba Sarvāṅgāsana” and counts the breaths aloud.',
      vi: 'Tư thế đầu tiên trong nhóm tư thế đảo ngược khép lại buổi tập, sau Paścimottānāsana: mười nhịp thở, và lâu hơn khi bạn tự tập, đến hai mươi lăm nhịp. Halāsana, Karṇapīḍāsana và hoa sen trên không tiếp nối mà không hạ xuống; giáo viên nói “Hít vào, Sālamba Sarvāṅgāsana” và đếm to từng nhịp thở.',
    },
  },

  breath: {
    en: 'Breathe slowly and evenly. The breath may feel short because your chin is close to your chest; don’t force it.',
    vi: 'Thở chậm và đều. Hơi thở có thể thấy ngắn vì cằm ở gần ngực; đừng ép.',
  },

  cues: [
    { id: 'shoulderstand__cue-1', kind: 'transition', en: 'Lie on your back, and on an inhale, lift your legs and hips up over your head.', vi: 'Nằm ngửa, và khi hít vào, nâng chân và hông lên qua đầu.' },
    { id: 'shoulderstand__cue-2', kind: 'alignment', en: 'Bring your hands to your back, close to your shoulder blades.', vi: 'Đặt hai tay đỡ lưng, gần bả vai.' },
    { id: 'shoulderstand__cue-3', kind: 'alignment', en: 'Draw your elbows in, shoulder-width apart.', vi: 'Kéo hai khuỷu tay vào, rộng bằng vai.' },
    { id: 'shoulderstand__cue-4', kind: 'alignment', en: 'Lift your legs straight up, one line from your shoulders to your feet.', vi: 'Nâng hai chân thẳng lên, thành một đường từ vai đến bàn chân.' },
    { id: 'shoulderstand__cue-5', kind: 'alignment', en: 'Point your toes, and squeeze your legs together.', vi: 'Duỗi mũi chân, và ép hai chân vào nhau.' },
    { id: 'shoulderstand__cue-6', kind: 'soften', en: 'Keep your face and throat soft.', vi: 'Giữ khuôn mặt và cổ họng mềm.' },
    { id: 'shoulderstand__cue-7', kind: 'breath', en: 'Stay for ten breaths, gazing toward your nose.', vi: 'Giữ mười nhịp thở, mắt nhìn về chóp mũi.' },
    { id: 'shoulderstand__cue-8', kind: 'safety', en: 'Never turn your head while you’re up here.', vi: 'Không bao giờ quay đầu khi đang ở trên này.' },
    { id: 'shoulderstand__cue-9', kind: 'transition', en: 'Exhale, lower your feet over your head to the floor behind you.', vi: 'Thở ra, hạ hai bàn chân qua đầu xuống sàn phía sau.' },
  ],

  modifications: [
    { id: 'shoulderstand__mod-1', en: 'Lie on two folded blankets, shoulders on the edge and your head on the floor.', vi: 'Nằm trên hai tấm chăn gấp, vai đặt ở mép chăn và đầu trên sàn.', props: ['blanket'] },
    { id: 'shoulderstand__mod-2', en: 'Take legs up the wall instead: lie on your back with your legs resting on the wall.', vi: 'Thay bằng tư thế gác chân lên tường: nằm ngửa với hai chân tựa lên tường.', props: ['wall'] },
    { id: 'shoulderstand__mod-3', en: 'Rest your sacrum on a block and lift your legs toward the ceiling.', vi: 'Đặt xương cùng lên một viên gạch và nâng hai chân lên hướng trần nhà.', props: ['block'] },
  ],

  safety: [
    { id: 'shoulderstand__safe-1', en: 'With a neck injury, skip Shoulderstand and take legs up the wall.', vi: 'Nếu cổ có chấn thương, bỏ qua Đứng bằng vai và gác chân lên tường.' },
    { id: 'shoulderstand__safe-2', en: 'With high blood pressure or glaucoma, or during your period if you prefer, rest with your legs up the wall.', vi: 'Nếu bạn bị huyết áp cao hoặc tăng nhãn áp, hoặc trong kỳ kinh nếu bạn muốn, hãy nghỉ với hai chân gác lên tường.' },
    { id: 'shoulderstand__safe-3', en: 'In pregnancy, practise it only if it’s already steady in your practice; otherwise, legs up the wall.', vi: 'Khi mang thai, chỉ tập nếu tư thế này đã vững trong buổi tập của bạn; nếu không, gác chân lên tường.' },
  ],

  muscles: {
    working: ['erector-spinae', 'triceps-brachii', 'quadriceps'],
    lengthening: ['trapezius', 'levator-scapulae'],
  },
  joints: ['cervical-spine', 'shoulder-joint', 'elbow', 'thoracic-spine'],
  transitionsTo: ['plow-pose'],
  counterPoses: ['fish-pose'],
  figure: 'shoulderstand',
}
