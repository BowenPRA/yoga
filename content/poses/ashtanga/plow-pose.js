export const plowPose = {
  id: 'plow-pose',
  styles: ['vinyasa', 'ashtanga'],
  family: 'inversion',
  level: 'strong',
  en: 'Plow Pose',
  aka: ['Plough Pose'],
  sa: 'Halāsana',
  say: 'hah-LAH-sah-nah',
  vi: 'Cái cày',

  ashtanga: {
    series: 'primary',
    section: 'finishing',
    position: 42,
    breaths: 8,
    drishti: 'nose',
    note: {
      en: 'Straight from Sālamba Sarvāṅgāsana, without coming down: eight breaths, with your hands interlaced on the floor behind your back. The teacher says “Exhale, Halāsana” and counts eight.',
      vi: 'Tiếp ngay từ Sālamba Sarvāṅgāsana, không hạ xuống: tám nhịp thở, hai tay đan vào nhau trên sàn sau lưng. Giáo viên nói “Thở ra, Halāsana” và đếm tám nhịp.',
    },
  },

  breath: {
    en: 'Exhale as your feet lower to the floor. Keep the breath slow and quiet.',
    vi: 'Thở ra khi hai bàn chân hạ xuống sàn. Giữ hơi thở chậm và nhẹ.',
  },

  cues: [
    { id: 'plow-pose__cue-1', kind: 'transition', en: 'Exhale, lower your feet to the floor behind your head.', vi: 'Thở ra, hạ hai bàn chân xuống sàn phía sau đầu.' },
    { id: 'plow-pose__cue-2', kind: 'alignment', en: 'Keep your legs straight, and lift your sitting bones high.', vi: 'Giữ hai chân thẳng, và nâng xương ngồi lên cao.' },
    { id: 'plow-pose__cue-3', kind: 'alignment', en: 'Interlace your fingers on the floor behind your back, and straighten your arms.', vi: 'Đan các ngón tay trên sàn sau lưng, và duỗi thẳng tay.' },
    { id: 'plow-pose__cue-4', kind: 'alignment', en: 'Roll your shoulders under, so you rest on the tops of your shoulders, not your neck.', vi: 'Cuộn vai vào bên dưới, để bạn tựa trên đỉnh vai, không phải trên cổ.' },
    { id: 'plow-pose__cue-5', kind: 'soften', en: 'Let your face and jaw soften.', vi: 'Để khuôn mặt và hàm mềm ra.' },
    { id: 'plow-pose__cue-6', kind: 'breath', en: 'Stay for eight breaths, slow and quiet.', vi: 'Giữ tám nhịp thở, chậm và nhẹ.' },
    { id: 'plow-pose__cue-7', kind: 'safety', en: 'If you feel pressure in your neck, come down. Don’t turn your head.', vi: 'Nếu thấy áp lực ở cổ, hạ xuống. Đừng quay đầu.' },
    { id: 'plow-pose__cue-8', kind: 'transition', en: 'Exhale, bend your knees down beside your ears.', vi: 'Thở ra, gập gối hạ xuống cạnh tai.' },
  ],

  modifications: [
    { id: 'plow-pose__mod-1', en: 'Rest your feet on a block or a chair if they don’t reach the floor.', vi: 'Đặt bàn chân lên gạch hoặc ghế nếu chân chưa chạm sàn.', props: ['block', 'chair'] },
    { id: 'plow-pose__mod-2', en: 'Keep your hands on your back to support you.', vi: 'Giữ hai tay đỡ lưng để nâng đỡ bạn.', props: [] },
    { id: 'plow-pose__mod-3', en: 'Practise with folded blankets under your shoulders, head on the floor.', vi: 'Tập với chăn gấp kê dưới vai, đầu đặt trên sàn.', props: ['blanket'] },
  ],

  safety: [
    { id: 'plow-pose__safe-1', en: 'With a neck injury, skip Plow and lie with your legs up the wall instead.', vi: 'Nếu cổ có chấn thương, bỏ qua Cái cày và nằm gác chân lên tường thay thế.' },
    { id: 'plow-pose__safe-2', en: 'With high blood pressure or glaucoma, skip it.', vi: 'Nếu bạn bị huyết áp cao hoặc tăng nhãn áp, bỏ qua tư thế này.' },
    { id: 'plow-pose__safe-3', en: 'In pregnancy, skip Plow.', vi: 'Khi mang thai, bỏ qua Cái cày.' },
  ],

  muscles: { working: ['quadriceps'], lengthening: ['hamstrings', 'erector-spinae', 'trapezius'] },
  joints: ['cervical-spine', 'thoracic-spine', 'shoulder-joint', 'hip-joint'],
  transitionsTo: ['ear-pressure-pose'],
  figure: 'plow-pose',
}
