export const bigToePose = {
  id: 'big-toe-pose',
  styles: ['ashtanga'],
  family: 'forward-fold',
  level: 'moderate',
  en: 'Big Toe Pose',
  aka: ['Standing Big Toe Hold'],
  sa: 'Pādāṅguṣṭhāsana',
  say: 'pah-dahn-goosh-TAH-sah-nah',
  vi: 'Gập người nắm ngón chân cái',

  ashtanga: {
    series: 'primary',
    section: 'standing',
    position: 10,
    vinyasas: 3,
    breaths: 5,
    drishti: 'nose',
    note: {
      en: 'The first pose of the standing sequence, straight after the sun salutations: three vinyasas, with the state on dve, five breaths. The teacher counts “Ekam, inhale, look up; dve, exhale, fold”.',
      vi: 'Tư thế đầu tiên của chuỗi đứng, ngay sau các vòng Chào mặt trời: ba vinyasa, trạng thái ở dve, năm nhịp thở. Giáo viên đếm “Ekam, hít vào, nhìn lên; dve, thở ra, gập người”.',
    },
  },

  breath: {
    en: 'Inhale to lengthen your spine and look up. Exhale to fold, and stay for five breaths.',
    vi: 'Hít vào để kéo dài cột sống và nhìn lên. Thở ra để gập người, và giữ năm nhịp thở.',
  },

  cues: [
    { id: 'big-toe-pose__cue-1', kind: 'transition', en: 'Step or jump your feet hip-width apart, parallel.', vi: 'Bước hoặc nhảy hai chân ra rộng bằng hông, song song.' },
    { id: 'big-toe-pose__cue-2', kind: 'transition', en: 'Fold and hook your big toes with your first two fingers.', vi: 'Gập người và móc ngón chân cái bằng ngón trỏ và ngón giữa.' },
    { id: 'big-toe-pose__cue-3', kind: 'alignment', en: 'Inhale, straighten your arms and lengthen your spine.', vi: 'Hít vào, duỗi thẳng tay và kéo dài cột sống.' },
    { id: 'big-toe-pose__cue-4', kind: 'alignment', en: 'Exhale, bend your elbows out to the sides and fold.', vi: 'Thở ra, mở khuỷu tay sang hai bên và gập người xuống.' },
    { id: 'big-toe-pose__cue-5', kind: 'alignment', en: 'Lift your kneecaps, and lift your sitting bones.', vi: 'Nâng xương bánh chè, và nâng xương ngồi lên.' },
    { id: 'big-toe-pose__cue-6', kind: 'soften', en: 'Relax your neck and let your head hang.', vi: 'Thả lỏng cổ và để đầu buông xuống.' },
    { id: 'big-toe-pose__cue-7', kind: 'breath', en: 'Stay for five breaths, gazing toward your nose.', vi: 'Giữ năm nhịp thở, mắt nhìn về chóp mũi.' },
    { id: 'big-toe-pose__cue-8', kind: 'safety', en: 'If you feel it right behind your knees, bend them a little.', vi: 'Nếu thấy căng ngay phía sau gối, chùng gối một chút.' },
    { id: 'big-toe-pose__cue-9', kind: 'transition', en: 'Inhale, lift your head and straighten your arms.', vi: 'Hít vào, nâng đầu lên và duỗi thẳng tay.' },
  ],

  modifications: [
    { id: 'big-toe-pose__mod-1', en: 'Bend your knees enough to reach your toes with a long back.', vi: 'Chùng gối vừa đủ để nắm được ngón chân mà lưng vẫn dài.', props: [] },
    { id: 'big-toe-pose__mod-2', en: 'Loop a strap under the balls of your feet and hold that instead.', vi: 'Vòng dây tập dưới gốc các ngón chân và nắm dây thay cho ngón chân.', props: ['strap'] },
    { id: 'big-toe-pose__mod-3', en: 'Rest your hands on your shins.', vi: 'Đặt tay lên ống chân.', props: [] },
  ],

  safety: [
    { id: 'big-toe-pose__safe-1', en: 'With a lower back injury, keep your knees bent and your back long. Don’t round to go deeper.', vi: 'Nếu lưng dưới có chấn thương, giữ gối chùng và lưng dài. Đừng cong lưng để gập sâu hơn.' },
    { id: 'big-toe-pose__safe-2', en: 'In pregnancy, step your feet wider and keep the fold shallow.', vi: 'Khi mang thai, đứng hai chân rộng hơn và chỉ gập nhẹ.' },
  ],

  muscles: { working: ['quadriceps', 'biceps-brachii'], lengthening: ['hamstrings', 'calves', 'erector-spinae'] },
  joints: ['hip-joint', 'sit-bones', 'knee', 'toes'],
  transitionsTo: ['hand-under-foot-pose'],
  figure: 'big-toe-pose',
}
