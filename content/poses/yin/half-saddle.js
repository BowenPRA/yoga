export const halfSaddle = {
  id: 'half-saddle',
  styles: ['yin'],
  family: 'backbend',
  level: 'moderate',
  en: 'Half Saddle',
  sa: null,
  vi: 'Nửa yên ngựa',
  yin: {
    holdMinutes: 3,
    target: ['quads', 'hips'],
    counter: 'savasana',
    note: {
      en: 'Three to five minutes each side. One leg bends back, so the front of one thigh and hip lengthens at a time; kinder to the knees and the lower back than full Saddle. Keep the bent knee close to the other leg: it should feel nothing.',
      vi: 'Ba đến năm phút mỗi bên. Một chân co về sau, nên mặt trước đùi và phía trước hông được kéo dài từng bên một; nhẹ nhàng với gối và lưng dưới hơn Yên ngựa đầy đủ. Giữ gối co sát chân kia: gối không được có cảm giác gì.',
    },
  },
  breath: {
    en: 'Breathe into the front of your bent leg. Let each exhale ease you back a little.',
    vi: 'Thở vào mặt trước của chân co. Để mỗi hơi thở ra giúp bạn ngả ra sau thêm một chút.',
  },
  cues: [
    { id: 'half-saddle__cue-1', kind: 'transition', en: 'Sit with your left leg straight, and bend your right knee back, the foot beside your hip.', vi: 'Ngồi với chân trái duỗi thẳng, co gối phải về sau, bàn chân đặt cạnh hông.' },
    { id: 'half-saddle__cue-2', kind: 'alignment', en: 'Bend your left knee, and place your foot on the floor to protect your lower back.', vi: 'Co gối trái, và đặt bàn chân xuống sàn để bảo vệ lưng dưới.' },
    { id: 'half-saddle__cue-3', kind: 'transition', en: 'Lean back onto your hands, your elbows, or a bolster.', vi: 'Ngả người ra sau chống tay, chống khuỷu, hoặc tựa lên gối ôm.' },
    { id: 'half-saddle__cue-4', kind: 'soften', en: 'Stop where you find your edge, in the front of your right thigh.', vi: 'Dừng lại khi bạn chạm ngưỡng, ở mặt trước đùi phải.' },
    { id: 'half-saddle__cue-5', kind: 'soften', en: 'Let your right knee be heavy, and let your breath slow down.', vi: 'Để gối phải nặng xuống, và để hơi thở chậm lại.' },
    { id: 'half-saddle__cue-6', kind: 'breath', en: 'Halfway. Notice how the sensation has changed. There’s nowhere to get to.', vi: 'Được một nửa rồi. Để ý cảm giác đã thay đổi thế nào. Không cần phải đến đâu cả.' },
    { id: 'half-saddle__cue-7', kind: 'safety', en: 'If your right knee hurts, come up higher, or sit on a block.', vi: 'Nếu gối phải đau, nâng người cao hơn, hoặc ngồi lên viên gạch.' },
    { id: 'half-saddle__cue-8', kind: 'transition', en: 'Press up slowly, lean to the left, and straighten your right leg.', vi: 'Từ từ chống người lên, nghiêng sang trái, và duỗi thẳng chân phải.' },
    { id: 'half-saddle__cue-9', kind: 'soften', en: 'Rest a moment with both legs long, and notice the rebound.', vi: 'Nghỉ một lát với hai chân duỗi dài, và cảm nhận dư âm.' },
  ],
  modifications: [
    { id: 'half-saddle__mod-1', en: 'Rest your back on a bolster propped up on blocks.', vi: 'Tựa lưng lên gối ôm được kê cao trên gạch.', props: ['bolster', 'blocks'] },
    { id: 'half-saddle__mod-2', en: 'Sit on a folded blanket so the bent knee bends less.', vi: 'Ngồi trên chăn gấp để gối co gập ít hơn.', props: ['blanket'] },
  ],
  safety: [
    { id: 'half-saddle__safe-1', en: 'Keep the bent knee pointing forward, close to the other leg. Pain in it means come out.', vi: 'Giữ gối co hướng về trước, sát chân kia. Gối đau nghĩa là cần thoát thế.' },
    { id: 'half-saddle__safe-2', en: 'In pregnancy, stay up on your hands or on a high bolster.', vi: 'Khi mang thai, giữ người cao, chống tay hoặc tựa trên gối ôm kê cao.' },
  ],
  muscles: {
    working: [],
    lengthening: ['quadriceps', 'iliopsoas'],
  },
  joints: ['knee', 'ankle', 'hip-joint', 'lumbar-spine'],
  transitionsTo: ['saddle', 'caterpillar'],
  figure: 'half-saddle',
}
