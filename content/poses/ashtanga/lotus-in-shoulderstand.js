export const lotusInShoulderstand = {
  id: 'lotus-in-shoulderstand',
  styles: ['ashtanga'],
  family: 'inversion',
  level: 'strong',
  en: 'Lotus in Shoulderstand',
  aka: ['Upward Lotus', 'Embryo Pose'],
  sa: 'Ūrdhva Padmāsana, Piṇḍāsana',
  say: 'OORD-vah pad-MAH-sah-nah, pin-DAH-sah-nah',
  vi: 'Hoa sen ngược và Bào thai',
  saNote: {
    en: 'Two poses in one movement. Ūrdhva Padmāsana is the “upward lotus”; Piṇḍāsana is the “embryo”, the lotus curled down to your chest.',
    vi: 'Hai tư thế trong một chuỗi chuyển động. Ūrdhva Padmāsana là “hoa sen hướng lên”; Piṇḍāsana là “bào thai”, hoa sen cuộn xuống sát ngực.',
  },

  ashtanga: {
    series: 'primary',
    section: 'finishing',
    position: 44,
    breaths: 8,
    drishti: 'nose',
    note: {
      en: 'Eight breaths in each part: from Karṇapīḍāsana you come back up, fold your legs into lotus and press your knees into your hands for Ūrdhva Padmāsana, then curl the lotus to your chest and wrap your arms around it for Piṇḍāsana. The teacher says “Inhale, Ūrdhva Padmāsana” and later “Exhale, Piṇḍāsana”.',
      vi: 'Tám nhịp thở ở mỗi phần: từ Karṇapīḍāsana bạn nâng chân trở lại lên trên, gập chân vào hoa sen và đẩy gối vào lòng bàn tay cho Ūrdhva Padmāsana, rồi cuộn hoa sen về sát ngực và vòng tay ôm lấy cho Piṇḍāsana. Giáo viên nói “Hít vào, Ūrdhva Padmāsana” và sau đó “Thở ra, Piṇḍāsana”.',
    },
  },

  breath: {
    en: 'Breathe slowly. In Piṇḍāsana your belly is folded, so let the breath move into your back.',
    vi: 'Thở chậm. Trong Piṇḍāsana bụng đang gập lại, nên để hơi thở đi vào lưng.',
  },

  cues: [
    { id: 'lotus-in-shoulderstand__cue-1', kind: 'transition', en: 'From Shoulderstand, fold your right leg, then your left, into lotus.', vi: 'Từ tư thế Đứng bằng vai, gập chân phải, rồi chân trái, vào hoa sen.' },
    { id: 'lotus-in-shoulderstand__cue-2', kind: 'alignment', en: 'Rest your knees in your hands, and straighten your arms.', vi: 'Đặt gối lên lòng bàn tay, và duỗi thẳng tay.' },
    { id: 'lotus-in-shoulderstand__cue-3', kind: 'alignment', en: 'Press your knees up into your hands, and keep your hips over your shoulders.', vi: 'Đẩy gối lên vào lòng bàn tay, và giữ hông nằm trên vai.' },
    { id: 'lotus-in-shoulderstand__cue-4', kind: 'transition', en: 'Exhale, lower your knees toward your head, and wrap your arms around your legs.', vi: 'Thở ra, hạ gối về phía đầu, và vòng tay ôm quanh chân.' },
    { id: 'lotus-in-shoulderstand__cue-5', kind: 'alignment', en: 'Hold your wrist or your fingers, and draw your knees in close.', vi: 'Nắm cổ tay hoặc các ngón tay, và kéo gối lại thật gần.' },
    { id: 'lotus-in-shoulderstand__cue-6', kind: 'soften', en: 'Let your back round and soften, like a seed.', vi: 'Để lưng cong tròn và mềm ra, như một hạt mầm.' },
    { id: 'lotus-in-shoulderstand__cue-7', kind: 'breath', en: 'Eight breaths in each, slow and steady.', vi: 'Tám nhịp thở ở mỗi tư thế, chậm và đều.' },
    { id: 'lotus-in-shoulderstand__cue-8', kind: 'safety', en: 'If lotus pulls on your knees, simply cross your legs instead.', vi: 'Nếu hoa sen kéo căng gối, chỉ cần bắt chéo chân thay thế.' },
    { id: 'lotus-in-shoulderstand__cue-9', kind: 'transition', en: 'Bring your hands to the floor and roll down slowly, keeping your lotus.', vi: 'Đặt tay xuống sàn và từ từ lăn người xuống, vẫn giữ hoa sen.' },
  ],

  modifications: [
    { id: 'lotus-in-shoulderstand__mod-1', en: 'Cross your legs at the shins instead of full lotus.', vi: 'Bắt chéo chân ở ống chân thay vì hoa sen trọn vẹn.', props: [] },
    { id: 'lotus-in-shoulderstand__mod-2', en: 'Keep your hands on your back for support while your legs fold.', vi: 'Giữ tay đỡ lưng để nâng đỡ trong khi chân gập lại.', props: [] },
    { id: 'lotus-in-shoulderstand__mod-3', en: 'Keep folded blankets under your shoulders to protect your neck.', vi: 'Kê chăn gấp dưới vai để bảo vệ cổ.', props: ['blanket'] },
  ],

  safety: [
    { id: 'lotus-in-shoulderstand__safe-1', en: 'Never force lotus. Knee pain means come out of it.', vi: 'Đừng bao giờ ép hoa sen. Đau gối nghĩa là cần thoát ra.' },
    { id: 'lotus-in-shoulderstand__safe-2', en: 'With a neck injury, or in pregnancy, skip this and rest on your back.', vi: 'Nếu cổ có chấn thương, hoặc khi mang thai, bỏ qua tư thế này và nằm ngửa nghỉ.' },
  ],

  muscles: { working: ['rectus-abdominis'], lengthening: ['trapezius', 'erector-spinae'] },
  joints: ['cervical-spine', 'knee', 'hip-joint', 'thoracic-spine'],
  transitionsTo: ['fish-pose'],
  figure: 'lotus-in-shoulderstand',
}
