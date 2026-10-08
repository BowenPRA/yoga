export const seal = {
  id: 'seal',
  styles: ['yin'],
  family: 'backbend',
  level: 'moderate',
  en: 'Seal',
  sa: null,
  vi: 'Hải cẩu',
  yin: {
    holdMinutes: 2,
    target: ['spine'],
    counter: 'child-pose',
    note: {
      en: 'One to five minutes, usually after Sphinx. The arms straighten, so the lower back arches more deeply than in Sphinx. Turn the hands out and place them wider if the wrists or shoulders complain; the lower back should never pinch.',
      vi: 'Một đến năm phút, thường sau Nhân sư. Hai tay duỗi thẳng nên lưng dưới ưỡn sâu hơn trong Nhân sư. Xoay bàn tay ra ngoài và đặt rộng hơn nếu cổ tay hoặc vai khó chịu; lưng dưới không bao giờ được nhói.',
    },
  },
  breath: {
    en: 'Breathe slowly into your belly. Let each exhale soften your lower back and your seat.',
    vi: 'Thở chậm vào bụng. Để mỗi hơi thở ra làm mềm lưng dưới và mông.',
  },
  cues: [
    { id: 'seal__cue-1', kind: 'transition', en: 'From Sphinx, place your hands forward and wider than your shoulders, fingers turned out.', vi: 'Từ Nhân sư, đặt hai bàn tay về trước và rộng hơn vai, các ngón tay hướng ra ngoài.' },
    { id: 'seal__cue-2', kind: 'alignment', en: 'If your hip points press into the floor, slide a blanket under them.', vi: 'Nếu hai mỏm xương phía trước hông bị cấn xuống sàn, kê chăn bên dưới.' },
    { id: 'seal__cue-3', kind: 'transition', en: 'Slowly straighten your arms, and let your chest lift.', vi: 'Từ từ duỗi thẳng tay, và để ngực nâng lên.' },
    { id: 'seal__cue-4', kind: 'soften', en: 'Find your edge. If it’s too much, walk your hands further forward.', vi: 'Tìm ngưỡng của bạn. Nếu thấy quá sức, đưa tay ra xa hơn về trước.' },
    { id: 'seal__cue-5', kind: 'soften', en: 'Let your belly and your seat stay soft.', vi: 'Để bụng và mông thả mềm.' },
    { id: 'seal__cue-6', kind: 'breath', en: 'We’re halfway. If your lower back is quiet, stay. If not, come back to Sphinx.', vi: 'Đã được một nửa thời gian. Nếu lưng dưới vẫn yên ổn, cứ ở lại. Nếu không, trở về Nhân sư.' },
    { id: 'seal__cue-7', kind: 'safety', en: 'If your wrists ache, make fists, or come down onto your forearms.', vi: 'Nếu cổ tay nhức, nắm tay lại, hoặc hạ xuống chống cẳng tay.' },
    { id: 'seal__cue-8', kind: 'transition', en: 'Slowly bend your elbows, and lower all the way down.', vi: 'Từ từ gập khuỷu tay, và hạ hẳn người xuống.' },
    { id: 'seal__cue-9', kind: 'soften', en: 'Turn your head to one side, rest, and notice the rebound.', vi: 'Quay đầu sang một bên, nghỉ ngơi, và cảm nhận dư âm.' },
  ],
  modifications: [
    { id: 'seal__mod-1', en: 'Keep your elbows soft, or stay in Sphinx.', vi: 'Giữ khuỷu tay hơi chùng, hoặc ở lại tư thế Nhân sư.', props: [] },
    { id: 'seal__mod-2', en: 'Bring your hands further forward to make the backbend smaller.', vi: 'Đưa tay xa hơn về trước để giảm độ ngả sau.', props: [] },
    { id: 'seal__mod-3', en: 'Rest a folded blanket under your hip points.', vi: 'Kê chăn gấp dưới hai mỏm xương phía trước hông.', props: ['blanket'] },
  ],
  safety: [
    { id: 'seal__safe-1', en: 'Seal is a deeper backbend than Sphinx. A sharp pinch in the lower back means come down.', vi: 'Hải cẩu ngả sau sâu hơn Nhân sư. Đau nhói ở lưng dưới nghĩa là cần hạ xuống.' },
    { id: 'seal__safe-2', en: 'In pregnancy, skip Seal, and choose a supported backbend over a bolster instead.', vi: 'Khi mang thai, bỏ qua Hải cẩu, thay bằng một tư thế ngả sau có gối ôm đỡ.' },
  ],
  muscles: {
    working: [],
    lengthening: ['rectus-abdominis'],
  },
  joints: ['lumbar-spine', 'sacrum', 'wrist', 'shoulder-joint'],
  transitionsTo: ['child-pose'],
  figure: 'seal',
}
