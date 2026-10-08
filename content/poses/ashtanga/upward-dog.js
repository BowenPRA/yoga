export const upwardDog = {
  id: 'upward-dog',
  styles: ['vinyasa', 'ashtanga'],
  family: 'backbend',
  level: 'moderate',
  en: 'Upward-Facing Dog',
  aka: ['Up Dog'],
  sa: 'Ūrdhva Mukha Śvānāsana',
  say: 'OORD-vah MOO-kah shvah-NAH-sah-nah',
  vi: 'Chó ngửa mặt',

  ashtanga: {
    series: 'primary',
    section: 'surya-a',
    position: 6,
    drishti: 'nose',
    note: {
      en: 'Pañca, the fifth vinyasa of Surya Namaskara A, on an inhale; it follows every Chaturanga in the series. A passing count, never held; the teacher counts “Pañca, inhale”.',
      vi: 'Pañca, vinyasa thứ năm của Chào mặt trời A, khi hít vào; tư thế này theo sau mọi lần Chaturanga trong cả chuỗi. Một nhịp đi qua, không bao giờ giữ lại; giáo viên đếm “Pañca, hít vào”.',
    },
  },

  breath: {
    en: 'Inhale as you roll forward and lift your chest. Exhale to lift your hips back into Downward Dog.',
    vi: 'Hít vào khi lăn người về trước và nâng ngực. Thở ra để đưa hông lên, ra sau, vào Chó úp mặt.',
  },

  cues: [
    { id: 'upward-dog__cue-1', kind: 'transition', en: 'Inhale, roll over your toes and lift your chest forward and up.', vi: 'Hít vào, lăn qua các ngón chân và nâng ngực về trước, lên trên.' },
    { id: 'upward-dog__cue-2', kind: 'alignment', en: 'Straighten your arms and press the tops of your feet into the mat.', vi: 'Duỗi thẳng tay và ấn mu bàn chân xuống thảm.' },
    { id: 'upward-dog__cue-3', kind: 'alignment', en: 'Lift your thighs and knees away from the floor.', vi: 'Nâng đùi và gối lên khỏi sàn.' },
    { id: 'upward-dog__cue-4', kind: 'alignment', en: 'Stack your shoulders over your wrists.', vi: 'Đặt vai thẳng trên cổ tay.' },
    { id: 'upward-dog__cue-5', kind: 'alignment', en: 'Draw your shoulders back and broaden across your collarbones.', vi: 'Kéo vai ra sau và mở rộng hai bên xương đòn.' },
    { id: 'upward-dog__cue-6', kind: 'soften', en: 'Keep your glutes soft, and lengthen your tailbone toward your heels.', vi: 'Giữ cơ mông mềm, và kéo dài xương cụt về phía gót chân.' },
    { id: 'upward-dog__cue-7', kind: 'breath', en: 'Just one inhale here. Let it lift your chest.', vi: 'Chỉ một hơi hít vào ở đây. Để hơi thở nâng ngực bạn lên.' },
    { id: 'upward-dog__cue-8', kind: 'safety', en: 'If your lower back pinches, bend your elbows a little or lower into Cobra.', vi: 'Nếu lưng dưới bị nhói, hơi gập khuỷu tay hoặc hạ xuống tư thế Rắn hổ mang.' },
    { id: 'upward-dog__cue-9', kind: 'transition', en: 'Exhale, roll back over your toes into Downward Dog.', vi: 'Thở ra, lăn ngược qua các ngón chân về Chó úp mặt.' },
  ],

  modifications: [
    { id: 'upward-dog__mod-1', en: 'Keep your thighs on the mat and lift into Cobra.', vi: 'Giữ đùi trên thảm và nâng người lên tư thế Rắn hổ mang.', props: [] },
    { id: 'upward-dog__mod-2', en: 'Place your hands on blocks to give your lower back more room.', vi: 'Đặt hai tay lên gạch để lưng dưới có thêm khoảng trống.', props: ['blocks'] },
    { id: 'upward-dog__mod-3', en: 'Turn one foot over at a time if rolling over your toes is hard.', vi: 'Lật từng bàn chân một nếu lăn qua các ngón chân còn khó.', props: [] },
  ],

  safety: [
    { id: 'upward-dog__safe-1', en: 'Keep the back of your neck long. Don’t drop your head back.', vi: 'Giữ phía sau cổ dài. Đừng ngửa đầu ra sau.' },
    { id: 'upward-dog__safe-2', en: 'With a lower back injury, take Cobra instead, with your elbows bent.', vi: 'Nếu lưng dưới có chấn thương, thay bằng Rắn hổ mang với khuỷu tay hơi gập.' },
    { id: 'upward-dog__safe-3', en: 'In pregnancy, skip it: go from all fours straight back into Downward Dog.', vi: 'Khi mang thai, bỏ qua tư thế này: từ tư thế bốn điểm chuyển thẳng về Chó úp mặt.' },
  ],

  muscles: {
    working: ['triceps-brachii', 'erector-spinae', 'quadriceps'],
    lengthening: ['rectus-abdominis', 'iliopsoas', 'pectoralis-major'],
  },
  joints: ['wrist', 'lumbar-spine', 'thoracic-spine', 'shoulder-joint'],
  transitionsTo: ['downward-dog'],
  figure: 'upward-dog',
}
