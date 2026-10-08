export const snail = {
  id: 'snail',
  styles: ['yin'],
  family: 'inversion',
  level: 'strong',
  en: 'Snail',
  sa: null,
  saNote: { en: 'Snail is the Yin name. The yang pose is Plough, Halāsana, held with the legs straight and active.', vi: 'Ốc sên là tên Yin. Tư thế yang là Cái cày, Halāsana, giữ với hai chân duỗi thẳng và chủ động.' },
  vi: 'Ốc sên',
  yin: {
    holdMinutes: 2,
    target: ['spine', 'neck'],
    counter: 'supported-fish',
    note: {
      en: 'One to five minutes, building up slowly over weeks. The whole spine rounds, from the lower back to the neck. The weight rests on the shoulders, never on the neck: if the neck feels squeezed or the breath feels trapped, come down.',
      vi: 'Một đến năm phút, tăng dần thời gian qua nhiều tuần. Toàn bộ cột sống cong tròn, từ lưng dưới đến cổ. Trọng lượng nằm trên vai, không bao giờ trên cổ: nếu cổ bị ép hoặc thấy khó thở, hãy hạ xuống.',
    },
  },
  breath: {
    en: 'The breath may feel short here. Keep it soft and slow, without forcing.',
    vi: 'Hơi thở có thể ngắn lại ở đây. Giữ hơi thở nhẹ và chậm, không gắng sức.',
  },
  cues: [
    { id: 'snail__cue-1', kind: 'transition', en: 'Lie on your back, with a folded blanket under your shoulders and your head on the mat.', vi: 'Nằm ngửa, kê chăn gấp dưới vai, đầu đặt trên thảm.' },
    { id: 'snail__cue-2', kind: 'transition', en: 'Bend your knees, and slowly roll your hips up and over.', vi: 'Co gối, rồi từ từ cuộn hông lên và đưa hai chân qua đầu.' },
    { id: 'snail__cue-3', kind: 'alignment', en: 'Rest your feet on the floor behind your head, or on a block. Your knees can bend.', vi: 'Đặt bàn chân xuống sàn phía sau đầu, hoặc lên viên gạch. Gối có thể co.' },
    { id: 'snail__cue-4', kind: 'safety', en: 'Keep your head still. Don’t turn it while you’re here.', vi: 'Giữ đầu yên. Đừng quay đầu khi đang ở trong tư thế.' },
    { id: 'snail__cue-5', kind: 'soften', en: 'Find your edge, then let your back round and your arms rest.', vi: 'Tìm ngưỡng của bạn, rồi để lưng cong tròn và hai tay nghỉ.' },
    { id: 'snail__cue-6', kind: 'breath', en: 'Halfway. Check your breath and your neck. Both should feel easy.', vi: 'Được một nửa rồi. Kiểm tra hơi thở và cổ của bạn. Cả hai đều nên thấy dễ chịu.' },
    { id: 'snail__cue-7', kind: 'transition', en: 'To come out, bend your knees, and roll down slowly, one vertebra at a time.', vi: 'Để thoát thế, co gối, và từ từ cuộn người xuống, từng đốt sống một.' },
    { id: 'snail__cue-8', kind: 'soften', en: 'Rest your feet on the floor, and feel the rebound along your spine.', vi: 'Đặt hai bàn chân xuống sàn, và cảm nhận dư âm dọc cột sống.' },
  ],
  modifications: [
    { id: 'snail__mod-1', en: 'Rest your feet on a chair or a bolster behind you instead of the floor.', vi: 'Đặt bàn chân lên ghế hoặc gối ôm phía sau, thay vì xuống sàn.', props: ['chair', 'bolster'] },
    { id: 'snail__mod-2', en: 'Take Legs Up the Wall instead, for a gentle inversion with no weight on the neck.', vi: 'Thay bằng Gác chân lên tường, một tư thế đảo ngược nhẹ nhàng không dồn trọng lượng lên cổ.', props: ['wall'] },
  ],
  safety: [
    { id: 'snail__safe-1', en: 'Skip this pose with a neck injury, high blood pressure, glaucoma, or in pregnancy.', vi: 'Bỏ qua tư thế này nếu bị chấn thương cổ, huyết áp cao, tăng nhãn áp, hoặc khi mang thai.' },
    { id: 'snail__safe-2', en: 'The weight belongs on your shoulders. Any pressure in your neck or your head means come down.', vi: 'Trọng lượng phải đặt trên vai. Thấy áp lực ở cổ hoặc ở đầu nghĩa là cần hạ xuống.' },
  ],
  muscles: {
    working: [],
    lengthening: ['erector-spinae', 'trapezius'],
  },
  joints: ['cervical-spine', 'thoracic-spine', 'lumbar-spine', 'shoulder-joint'],
  transitionsTo: ['supported-fish', 'savasana'],
  figure: 'snail',
}
