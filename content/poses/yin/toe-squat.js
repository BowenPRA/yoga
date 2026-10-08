export const toeSquat = {
  id: 'toe-squat',
  styles: ['yin'],
  family: 'seated',
  level: 'moderate',
  en: 'Toe Squat',
  sa: null,
  vi: 'Ngồi trên ngón chân',
  yin: {
    holdMinutes: 1,
    target: ['feet'],
    counter: 'ankle-stretch',
    note: {
      en: 'One to two minutes: intense, so keep it short. The soles of the feet and the toes open while the heels carry your weight. Feel it in the soles and the toes; a pinch at the front of the ankle, or pain in the knees, means come out.',
      vi: 'Một đến hai phút: tư thế mạnh, nên giữ ngắn thôi. Gan bàn chân và các ngón chân mở ra trong khi gót chân chịu trọng lượng của bạn. Cảm giác nên ở gan bàn chân và ngón chân; nhói ở phía trước cổ chân, hoặc đau ở gối, nghĩa là cần thoát thế.',
    },
  },
  breath: {
    en: 'Breathe slowly and steadily. This one is intense, so let the exhale be long.',
    vi: 'Thở chậm và đều. Tư thế này mạnh, nên hãy để hơi thở ra thật dài.',
  },
  cues: [
    { id: 'toe-squat__cue-1', kind: 'transition', en: 'Kneel with a blanket under your knees, and tuck all your toes under.', vi: 'Quỳ với chăn kê dưới gối, và bấm tất cả các ngón chân xuống.' },
    { id: 'toe-squat__cue-2', kind: 'alignment', en: 'Check that your little toes are tucked under too.', vi: 'Kiểm tra xem các ngón chân út cũng đã được bấm xuống chưa.' },
    { id: 'toe-squat__cue-3', kind: 'transition', en: 'Slowly sit back onto your heels.', vi: 'Từ từ ngồi lùi lên gót chân.' },
    { id: 'toe-squat__cue-4', kind: 'soften', en: 'Find your edge. If it’s too much, lean forward onto your hands.', vi: 'Tìm ngưỡng của bạn. Nếu thấy quá sức, chống tay về trước.' },
    { id: 'toe-squat__cue-5', kind: 'soften', en: 'Soften your face and your shoulders. Let your weight do the work.', vi: 'Thả lỏng khuôn mặt và vai. Để trọng lượng cơ thể làm việc.' },
    { id: 'toe-squat__cue-6', kind: 'breath', en: 'Halfway there. Long, slow exhales.', vi: 'Được một nửa rồi. Thở ra dài và chậm.' },
    { id: 'toe-squat__cue-7', kind: 'safety', en: 'If your knees hurt, or the fronts of your ankles pinch, come out.', vi: 'Nếu gối đau, hoặc phía trước cổ chân bị nhói, hãy thoát thế.' },
    { id: 'toe-squat__cue-8', kind: 'transition', en: 'Lean forward onto your hands, and slowly untuck your toes.', vi: 'Chống tay về trước, và từ từ thả các ngón chân ra.' },
    { id: 'toe-squat__cue-9', kind: 'soften', en: 'Feel the rebound in your feet, then move into Ankle Stretch.', vi: 'Cảm nhận dư âm ở bàn chân, rồi chuyển sang tư thế Giãn cổ chân.' },
  ],
  modifications: [
    { id: 'toe-squat__mod-1', en: 'Lean forward onto your hands, or onto blocks, to take weight off your feet.', vi: 'Chống tay về trước, hoặc chống lên gạch, để giảm trọng lượng dồn lên bàn chân.', props: ['blocks'] },
    { id: 'toe-squat__mod-2', en: 'Pad your knees with a folded blanket.', vi: 'Kê chăn gấp dưới gối.', props: ['blanket'] },
    { id: 'toe-squat__mod-3', en: 'Tuck the toes of one foot at a time, with the other foot flat.', vi: 'Bấm ngón chân của từng bàn chân một, bàn chân kia đặt phẳng.', props: [] },
  ],
  safety: [
    { id: 'toe-squat__safe-1', en: 'Feel it in the soles of your feet and your toes. Sharp pain means come out straight away.', vi: 'Cảm giác nên ở gan bàn chân và ngón chân. Đau nhói nghĩa là cần thoát thế ngay.' },
    { id: 'toe-squat__safe-2', en: 'With a bunion, a toe injury or sore knees, skip it, or keep it very short.', vi: 'Nếu bị vẹo ngón chân cái, chấn thương ngón chân hoặc đau gối, bỏ qua tư thế này, hoặc giữ thật ngắn.' },
  ],
  muscles: {
    working: [],
    lengthening: ['plantar-fascia'],
  },
  joints: ['toes', 'ankle', 'knee'],
  transitionsTo: ['ankle-stretch'],
  figure: 'toe-squat',
}
