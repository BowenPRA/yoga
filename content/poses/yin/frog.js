export const frog = {
  id: 'frog',
  styles: ['yin'],
  family: 'hip-opener',
  level: 'strong',
  en: 'Frog',
  sa: null,
  vi: 'Con ếch',
  yin: {
    holdMinutes: 3,
    target: ['inner-thighs', 'hips'],
    counter: 'child-pose',
    note: {
      en: 'Three to five minutes. The inner thighs open as the hips sink back. Pad the knees well; sharp pain inside a knee, or a pinch in the lower back, means ease off.',
      vi: 'Ba đến năm phút. Mặt trong đùi mở ra khi hông hạ dần về sau. Kê đệm kỹ cho gối; đau nhói ở mặt trong gối, hoặc nhói ở lưng dưới, nghĩa là cần giảm bớt.',
    },
  },
  breath: {
    en: 'Breathe slowly into your inner thighs. Let the floor take the weight of your body.',
    vi: 'Thở chậm vào mặt trong đùi. Để sàn nhà đỡ trọng lượng cơ thể.',
  },
  cues: [
    { id: 'frog__cue-1', kind: 'transition', en: 'Come onto all fours, with a blanket under your knees.', vi: 'Về tư thế bốn điểm, kê chăn dưới gối.' },
    { id: 'frog__cue-2', kind: 'alignment', en: 'Slowly slide your knees out wide, with your ankles in line with your knees.', vi: 'Từ từ trượt hai gối ra rộng, cổ chân thẳng hàng với gối.' },
    { id: 'frog__cue-3', kind: 'transition', en: 'Lower onto your forearms, or rest your chest on a bolster.', vi: 'Hạ xuống chống cẳng tay, hoặc tựa ngực lên gối ôm.' },
    { id: 'frog__cue-4', kind: 'soften', en: 'Let your hips drift back until you find your edge.', vi: 'Để hông trôi dần về sau đến khi chạm ngưỡng của bạn.' },
    { id: 'frog__cue-5', kind: 'soften', en: 'Let your belly and your inner thighs soften. Don’t push.', vi: 'Để bụng và mặt trong đùi mềm ra. Đừng ép.' },
    { id: 'frog__cue-6', kind: 'breath', en: 'About halfway now. If your edge has moved, follow it. Or stay.', vi: 'Đã được khoảng một nửa thời gian. Nếu ngưỡng đã dịch chuyển, đi theo nó. Hoặc cứ ở yên.' },
    { id: 'frog__cue-7', kind: 'safety', en: 'If your knees or your lower back complain, bring your knees a little closer together.', vi: 'Nếu gối hoặc lưng dưới khó chịu, đưa hai gối lại gần nhau hơn một chút.' },
    { id: 'frog__cue-8', kind: 'transition', en: 'To come out, slide forward onto your belly, then slowly draw your knees in.', vi: 'Để thoát thế, trượt người về trước nằm sấp, rồi từ từ kéo hai gối vào.' },
    { id: 'frog__cue-9', kind: 'soften', en: 'Rest on your belly for a few breaths, and feel the rebound.', vi: 'Nằm sấp nghỉ vài hơi thở, và cảm nhận dư âm.' },
  ],
  modifications: [
    { id: 'frog__mod-1', en: 'Bring your feet together behind you for Tadpole, a gentler half frog.', vi: 'Chụm hai bàn chân lại phía sau để vào tư thế Nòng nọc, một dạng nửa con ếch nhẹ nhàng hơn.', props: [] },
    { id: 'frog__mod-2', en: 'Rest your chest on a bolster so your lower back doesn’t sag.', vi: 'Tựa ngực lên gối ôm để lưng dưới không bị võng.', props: ['bolster'] },
    { id: 'frog__mod-3', en: 'Pad your knees with folded blankets, or double the mat.', vi: 'Kê chăn gấp dưới gối, hoặc gấp đôi thảm.', props: ['blanket'] },
  ],
  safety: [
    { id: 'frog__safe-1', en: 'Feel it in your inner thighs. Sharp pain inside the knee means come out.', vi: 'Cảm giác nên ở mặt trong đùi. Đau nhói phía trong gối nghĩa là cần thoát thế.' },
    { id: 'frog__safe-2', en: 'In pregnancy, or with a tender sacroiliac joint, keep the knees less wide and the hold short.', vi: 'Khi mang thai, hoặc khi khớp cùng chậu nhạy cảm, mở gối ít rộng hơn và giữ ngắn thôi.' },
  ],
  muscles: {
    working: [],
    lengthening: ['hip-adductors'],
  },
  joints: ['hip-joint', 'knee', 'lumbar-spine'],
  transitionsTo: ['child-pose', 'sphinx'],
  figure: 'frog',
}
