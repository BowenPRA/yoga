export const ankleStretch = {
  id: 'ankle-stretch',
  styles: ['yin'],
  family: 'seated',
  level: 'gentle',
  en: 'Ankle Stretch',
  sa: null,
  vi: 'Giãn cổ chân',
  yin: {
    holdMinutes: 2,
    target: ['feet'],
    note: {
      en: 'One to three minutes, usually straight after Toe Squat. The tops of the feet, the fronts of the ankles and the shins lengthen. Feel it in the front of the ankles; pain in the knees means keep them down and sit on a blanket.',
      vi: 'Một đến ba phút, thường ngay sau Ngồi trên ngón chân. Mu bàn chân, phía trước cổ chân và ống chân được kéo dài. Cảm giác nên ở phía trước cổ chân; đau ở gối nghĩa là cần giữ gối trên sàn và ngồi lên chăn.',
    },
  },
  breath: {
    en: 'Breathe easily. As you exhale, let the fronts of your ankles open a little more.',
    vi: 'Thở nhẹ nhàng. Khi thở ra, để phía trước cổ chân mở thêm một chút.',
  },
  cues: [
    { id: 'ankle-stretch__cue-1', kind: 'transition', en: 'Kneel with the tops of your feet flat on the floor, and sit back on your heels.', vi: 'Quỳ với mu bàn chân đặt phẳng trên sàn, và ngồi lùi lên gót chân.' },
    { id: 'ankle-stretch__cue-2', kind: 'alignment', en: 'If your ankles feel sharp on the floor, roll a blanket under them.', vi: 'Nếu cổ chân bị cấn trên sàn, cuộn chăn đặt bên dưới.' },
    { id: 'ankle-stretch__cue-3', kind: 'transition', en: 'Place your hands behind you, and slowly lift your knees.', vi: 'Đặt hai tay phía sau, và từ từ nhấc gối lên.' },
    { id: 'ankle-stretch__cue-4', kind: 'soften', en: 'Lift only as far as your edge. Then let it be.', vi: 'Chỉ nhấc đến ngưỡng của bạn. Rồi cứ để vậy.' },
    { id: 'ankle-stretch__cue-5', kind: 'soften', en: 'Let your shoulders soften, and your breath stay easy.', vi: 'Để vai mềm ra, và hơi thở nhẹ nhàng.' },
    { id: 'ankle-stretch__cue-6', kind: 'breath', en: 'Halfway. You can lower your knees for a moment, then lift again.', vi: 'Được một nửa rồi. Bạn có thể hạ gối xuống một lát, rồi nhấc lên lại.' },
    { id: 'ankle-stretch__cue-7', kind: 'safety', en: 'If your knees complain, keep them down, and sit on a blanket.', vi: 'Nếu gối khó chịu, giữ gối trên sàn, và ngồi lên chăn.' },
    { id: 'ankle-stretch__cue-8', kind: 'transition', en: 'Lower your knees slowly, and come to sit with your legs out in front.', vi: 'Từ từ hạ gối xuống, rồi ngồi duỗi hai chân ra phía trước.' },
    { id: 'ankle-stretch__cue-9', kind: 'soften', en: 'Let your feet rest, and notice the rebound.', vi: 'Để bàn chân nghỉ, và cảm nhận dư âm.' },
  ],
  modifications: [
    { id: 'ankle-stretch__mod-1', en: 'Keep your knees down, and sit on a folded blanket between your heels.', vi: 'Giữ gối trên sàn, và ngồi trên chăn gấp đặt giữa hai gót chân.', props: ['blanket'] },
    { id: 'ankle-stretch__mod-2', en: 'Lift one knee at a time.', vi: 'Nhấc từng gối một.', props: [] },
  ],
  safety: [
    { id: 'ankle-stretch__safe-1', en: 'Feel it in the fronts of your ankles and shins. Sharp pain means come out.', vi: 'Cảm giác nên ở phía trước cổ chân và ống chân. Đau nhói nghĩa là cần thoát thế.' },
    { id: 'ankle-stretch__safe-2', en: 'With an ankle or knee injury, keep your knees down, and the hold short.', vi: 'Nếu cổ chân hoặc gối bị chấn thương, giữ gối trên sàn, và giữ ngắn thôi.' },
  ],
  muscles: {
    working: [],
    lengthening: ['tibialis-anterior'],
  },
  joints: ['ankle', 'knee', 'toes'],
  transitionsTo: ['caterpillar'],
  figure: 'ankle-stretch',
}
