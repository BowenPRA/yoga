export const cowPose = {
  id: 'cow-pose',
  styles: ['vinyasa'],
  family: 'restorative',
  level: 'gentle',
  en: 'Cow Pose',
  sa: 'Bitilāsana',
  say: 'bih-tih-LAH-sah-nah',
  vi: 'Con bò',
  saNote: {
    en: 'A modern name, not a classical Sanskrit word for cow. Most teachers simply say Cow, or Cat-Cow for the pair.',
    vi: 'Một cái tên hiện đại, không phải từ Sanskrit cổ điển chỉ con bò. Hầu hết giáo viên chỉ nói Cow, hoặc Cat-Cow cho cả cặp Con mèo và Con bò.',
  },
  breath: {
    en: 'Cow moves with the inhale: lift your chest as you breathe in. Pair it with Cat on the exhale.',
    vi: 'Con bò đi cùng hơi hít vào: nâng ngực khi hít vào. Kết hợp với Con mèo khi thở ra.',
  },
  cues: [
    { id: 'cow-pose__cue-1', kind: 'transition', en: 'Start on all fours, with your spine long and neutral.', vi: 'Bắt đầu ở tư thế bốn điểm, cột sống dài và trung tính.' },
    { id: 'cow-pose__cue-2', kind: 'alignment', en: 'Inhale, drop your belly, and lift your tailbone.', vi: 'Hít vào, hạ bụng xuống, và nâng xương cụt lên.' },
    { id: 'cow-pose__cue-3', kind: 'alignment', en: 'Draw your chest forward, and your shoulders down your back.', vi: 'Đưa ngực về trước, và kéo vai xuống dọc lưng.' },
    { id: 'cow-pose__cue-4', kind: 'alignment', en: 'Lift your gaze a little, keeping the back of your neck long.', vi: 'Hơi ngước nhìn lên, giữ phía sau cổ dài.' },
    { id: 'cow-pose__cue-5', kind: 'soften', en: 'Keep it gentle. Arch your lower back only as much as feels easy.', vi: 'Giữ nhẹ nhàng. Chỉ ưỡn lưng dưới đến mức thấy dễ chịu.' },
    { id: 'cow-pose__cue-6', kind: 'breath', en: 'Inhale into Cow, exhale into Cat. Let your breath set the pace.', vi: 'Hít vào sang Con bò, thở ra sang Con mèo. Để hơi thở dẫn nhịp.' },
    { id: 'cow-pose__cue-7', kind: 'safety', en: 'Don’t throw your head back. Keep your neck long.', vi: 'Đừng ngửa đầu ra sau. Giữ cổ dài.' },
    { id: 'cow-pose__cue-8', kind: 'transition', en: 'Exhale, and return to a neutral spine.', vi: 'Thở ra, và trở về cột sống trung tính.' },
  ],
  modifications: [
    { id: 'cow-pose__mod-1', en: 'Fold a blanket under your knees for padding.', vi: 'Gấp chăn kê dưới gối cho êm.', props: ['blanket'] },
    { id: 'cow-pose__mod-2', en: 'Come onto your forearms if your wrists are tired.', vi: 'Hạ xuống chống cẳng tay nếu cổ tay mỏi.', props: [] },
    { id: 'cow-pose__mod-3', en: 'Sit on a chair with your hands on your knees, and lift your chest from there.', vi: 'Ngồi trên ghế, hai tay đặt lên gối, và nâng ngực ở tư thế đó.', props: ['chair'] },
  ],
  safety: [
    { id: 'cow-pose__safe-1', en: 'If your lower back is sensitive, keep the arch small.', vi: 'Nếu lưng dưới nhạy cảm, chỉ ưỡn nhẹ.' },
    { id: 'cow-pose__safe-2', en: 'In pregnancy, keep the arch small, and don’t let your belly hang heavy for long.', vi: 'Khi mang thai, chỉ ưỡn nhẹ, và đừng để bụng buông nặng quá lâu.' },
  ],
  muscles: {
    working: ['erector-spinae'],
    lengthening: ['rectus-abdominis'],
  },
  joints: ['lumbar-spine', 'thoracic-spine', 'pelvis'],
  transitionsTo: ['cat-pose', 'downward-dog', 'thread-the-needle'],
  figure: 'cow-pose',
}
