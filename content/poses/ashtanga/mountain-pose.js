export const mountainPose = {
  id: 'mountain-pose',
  styles: ['vinyasa', 'ashtanga'],
  family: 'standing',
  level: 'gentle',
  en: 'Mountain Pose',
  aka: ['Samasthiti', 'Equal Standing'],
  sa: 'Samasthitiḥ',
  say: 'sah-mah-STEE-tee',
  vi: 'Ngọn núi',
  saNote: {
    en: 'Ashtanga teachers call this Samasthitiḥ, “standing evenly”. In a Vinyasa class the same pose is Tāḍāsana (tah-DAH-sah-nah), Mountain Pose.',
    vi: 'Giáo viên Ashtanga gọi tư thế này là Samasthitiḥ, nghĩa là “đứng cân bằng”. Trong lớp Vinyasa, cùng tư thế này là Tāḍāsana, tư thế Ngọn núi.',
  },

  ashtanga: {
    series: 'primary',
    section: 'surya-a',
    position: 1,
    drishti: 'nose',
    note: {
      en: 'The start and finish of every sun salutation and every standing pose; it is not a counted vinyasa. In a led class the teacher says “Samasthitiḥ”, waits for the room to settle, then counts “Ekam, inhale”.',
      vi: 'Điểm bắt đầu và kết thúc của mọi vòng Chào mặt trời và mọi tư thế đứng; đây không phải là một vinyasa được đếm. Trong lớp có hướng dẫn, giáo viên nói “Samasthitiḥ”, chờ cả lớp ổn định, rồi đếm “Ekam, hít vào”.',
    },
  },

  breath: {
    en: 'Breathe slowly through your nose, with a soft sound in your throat. Let the breath find its rhythm before you move.',
    vi: 'Thở chậm bằng mũi, với một âm thanh nhẹ ở cổ họng. Để hơi thở tìm được nhịp của nó trước khi bạn chuyển động.',
  },

  cues: [
    { id: 'mountain-pose__cue-1', kind: 'transition', en: 'Come to the front of your mat and stand with your feet together.', vi: 'Bước lên đầu thảm và đứng với hai bàn chân khép lại.' },
    { id: 'mountain-pose__cue-2', kind: 'alignment', en: 'Spread your toes and press evenly through both feet.', vi: 'Xoè các ngón chân và ấn đều hai bàn chân xuống sàn.' },
    { id: 'mountain-pose__cue-3', kind: 'alignment', en: 'Lift your kneecaps to wake up the front of your thighs.', vi: 'Nâng xương bánh chè để đánh thức mặt trước đùi.' },
    { id: 'mountain-pose__cue-4', kind: 'alignment', en: 'Lengthen your tailbone toward your heels and draw your belly in gently.', vi: 'Kéo dài xương cụt về phía gót chân và hóp nhẹ bụng vào.' },
    { id: 'mountain-pose__cue-5', kind: 'alignment', en: 'Let your arms rest by your sides, and lengthen through the crown of your head.', vi: 'Để hai tay buông dọc thân, và vươn đỉnh đầu lên cao.' },
    { id: 'mountain-pose__cue-6', kind: 'soften', en: 'Relax your shoulders away from your ears, and soften your jaw.', vi: 'Thả vai xuống, xa khỏi tai, và thả lỏng hàm.' },
    { id: 'mountain-pose__cue-7', kind: 'breath', en: 'Close your mouth and breathe slowly, with a soft sound in your throat.', vi: 'Khép miệng và thở chậm, với một âm thanh nhẹ ở cổ họng.' },
    { id: 'mountain-pose__cue-8', kind: 'safety', en: 'If your knees tend to push back, keep them very slightly bent.', vi: 'Nếu gối bạn hay bị duỗi quá ra sau, hãy giữ gối hơi chùng một chút.' },
    { id: 'mountain-pose__cue-9', kind: 'transition', en: 'From here, inhale and reach your arms up.', vi: 'Từ đây, hít vào và vươn hai tay lên.' },
  ],

  modifications: [
    { id: 'mountain-pose__mod-1', en: 'Stand with your feet hip-width apart if that feels steadier.', vi: 'Đứng hai chân rộng bằng hông nếu như vậy bạn thấy vững hơn.', props: [] },
    { id: 'mountain-pose__mod-2', en: 'Stand with your back to a wall, heels a little away from it, to feel your body line up.', vi: 'Đứng quay lưng vào tường, gót chân cách tường một chút, để cảm nhận cơ thể thẳng hàng.', props: ['wall'] },
    { id: 'mountain-pose__mod-3', en: 'Squeeze a block between your thighs to feel your legs working.', vi: 'Kẹp một viên gạch giữa hai đùi để cảm nhận hai chân đang làm việc.', props: ['block'] },
  ],

  safety: [
    { id: 'mountain-pose__safe-1', en: 'If you feel dizzy, step your feet apart and keep your eyes open.', vi: 'Nếu thấy chóng mặt, bước hai chân rộng ra và giữ mắt mở.' },
    { id: 'mountain-pose__safe-2', en: 'In pregnancy, stand with your feet hip-width apart or wider.', vi: 'Khi mang thai, đứng hai chân rộng bằng hông hoặc rộng hơn.' },
  ],

  muscles: { working: ['quadriceps', 'erector-spinae', 'tibialis-posterior'], lengthening: [] },
  joints: ['arch', 'knee', 'pelvis', 'crown'],
  transitionsTo: ['upward-salute'],
  figure: 'mountain-pose',
}
