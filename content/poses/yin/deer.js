export const deer = {
  id: 'deer',
  styles: ['yin'],
  family: 'hip-opener',
  level: 'gentle',
  en: 'Deer',
  sa: null,
  vi: 'Con nai',
  yin: {
    holdMinutes: 3,
    target: ['hips'],
    counter: 'reclined-twist',
    note: {
      en: 'Three to five minutes each side. The front hip turns out and the back hip turns in, so both directions of rotation get a long, gentle stress. The back knee should feel nothing: move the back foot or sit higher until it is quiet.',
      vi: 'Ba đến năm phút mỗi bên. Hông trước xoay ra ngoài, hông sau xoay vào trong, nên cả hai chiều xoay đều được kéo giãn lâu và nhẹ. Gối sau không nên có cảm giác gì: dịch bàn chân sau hoặc ngồi cao hơn đến khi gối yên.',
    },
  },
  breath: {
    en: 'Breathe evenly into both hips. Let each exhale invite the back hip to soften.',
    vi: 'Thở đều vào cả hai bên hông. Để mỗi hơi thở ra mời hông sau mềm ra.',
  },
  cues: [
    { id: 'deer__cue-1', kind: 'transition', en: 'Sit with your knees bent and your feet wide, then let both knees fall to the right.', vi: 'Ngồi co gối, hai bàn chân đặt rộng, rồi để cả hai gối ngả sang phải.' },
    { id: 'deer__cue-2', kind: 'alignment', en: 'Adjust your legs so both knees bend at about ninety degrees.', vi: 'Chỉnh hai chân để cả hai gối gập khoảng chín mươi độ.' },
    { id: 'deer__cue-3', kind: 'alignment', en: 'If your left hip lifts, sit on a folded blanket.', vi: 'Nếu hông trái nhấc lên, ngồi trên chăn gấp.' },
    { id: 'deer__cue-4', kind: 'soften', en: 'Stay upright, or turn toward your front shin and fold over it to find your edge.', vi: 'Ngồi thẳng, hoặc xoay về phía ống chân trước và gập người xuống trên đó để tìm ngưỡng.' },
    { id: 'deer__cue-5', kind: 'soften', en: 'Let your hips be heavy, and let your arms rest.', vi: 'Để hông nặng xuống, và để hai tay nghỉ.' },
    { id: 'deer__cue-6', kind: 'breath', en: 'We’re halfway. You can turn toward your back foot for a twist, or stay.', vi: 'Chúng ta đã đi được nửa chặng. Bạn có thể xoay người về phía bàn chân sau để vặn nhẹ, hoặc ở yên.' },
    { id: 'deer__cue-7', kind: 'safety', en: 'If your back knee complains, move your back foot until your knee is quiet.', vi: 'Nếu gối sau khó chịu, dịch bàn chân sau đến khi gối thấy yên.' },
    { id: 'deer__cue-8', kind: 'transition', en: 'Slowly come upright, and bring your knees back to the middle.', vi: 'Từ từ ngồi thẳng dậy, và đưa hai gối về giữa.' },
    { id: 'deer__cue-9', kind: 'soften', en: 'Pause with your knees up, and notice the rebound in your hips.', vi: 'Dừng lại với hai gối dựng lên, và cảm nhận dư âm ở hông.' },
  ],
  modifications: [
    { id: 'deer__mod-1', en: 'Sit on a bolster or a folded blanket to take pressure off your back knee.', vi: 'Ngồi trên gối ôm hoặc chăn gấp để giảm áp lực lên đầu gối sau.', props: ['bolster', 'blanket'] },
    { id: 'deer__mod-2', en: 'Fold forward onto a bolster placed along your front shin.', vi: 'Gập người tựa lên gối ôm đặt dọc theo ống chân trước.', props: ['bolster'] },
  ],
  safety: [
    { id: 'deer__safe-1', en: 'Watch your back knee. Any twisting feeling in it means come out.', vi: 'Hãy để ý gối sau. Có cảm giác vặn xoắn ở gối đó nghĩa là cần thoát thế.' },
    { id: 'deer__safe-2', en: 'In pregnancy, stay upright and keep any twist small.', vi: 'Khi mang thai, ngồi thẳng và chỉ vặn thật nhẹ.' },
  ],
  muscles: {
    working: [],
    lengthening: ['deep-rotators', 'piriformis'],
  },
  joints: ['hip-joint', 'knee'],
  transitionsTo: ['reclined-twist', 'shoelace'],
  figure: 'deer',
}
