export const standingForwardFold = {
  id: 'standing-forward-fold',
  styles: ['vinyasa', 'ashtanga'],
  family: 'forward-fold',
  level: 'gentle',
  en: 'Standing Forward Fold',
  aka: ['Forward Fold', 'Forward Bend'],
  sa: 'Uttānāsana',
  say: 'oot-tah-NAH-sah-nah',
  vi: 'Đứng gập người',

  ashtanga: {
    series: 'primary',
    section: 'surya-a',
    position: 3,
    drishti: 'nose',
    note: {
      en: 'Dve, the second vinyasa of Surya Namaskara A, on an exhale, and again aṣṭau, the eighth; in Surya Namaskara B it is dve and ṣoḍaśa. A passing count with your gaze at your nose; the teacher counts “Dve, exhale”.',
      vi: 'Dve, vinyasa thứ hai của Chào mặt trời A, khi thở ra, và trở lại ở aṣṭau, vinyasa thứ tám; trong Chào mặt trời B là dve và ṣoḍaśa. Một nhịp đi qua, mắt nhìn chóp mũi; giáo viên đếm “Dve, thở ra”.',
    },
  },

  breath: {
    en: 'Exhale as you fold. If you stay longer, let each exhale soften you a little deeper.',
    vi: 'Thở ra khi gập người. Nếu ở lại lâu hơn, để mỗi hơi thở ra giúp bạn mềm sâu thêm một chút.',
  },

  cues: [
    { id: 'standing-forward-fold__cue-1', kind: 'transition', en: 'Exhale, hinge at your hips and fold forward.', vi: 'Thở ra, gập người về trước từ khớp háng.' },
    { id: 'standing-forward-fold__cue-2', kind: 'alignment', en: 'Bring your fingertips or palms to the floor beside your feet.', vi: 'Đặt đầu ngón tay hoặc lòng bàn tay xuống sàn cạnh bàn chân.' },
    { id: 'standing-forward-fold__cue-3', kind: 'alignment', en: 'Bend your knees as much as you need to keep your back long.', vi: 'Chùng gối bao nhiêu tuỳ cần để giữ lưng dài.' },
    { id: 'standing-forward-fold__cue-4', kind: 'alignment', en: 'Lift your sitting bones, and let your head hang heavy.', vi: 'Nâng xương ngồi lên, và để đầu buông nặng.' },
    { id: 'standing-forward-fold__cue-5', kind: 'alignment', en: 'Shift your weight a little forward, toward the balls of your feet.', vi: 'Dồn trọng lượng hơi về trước, lên phía gốc các ngón chân.' },
    { id: 'standing-forward-fold__cue-6', kind: 'soften', en: 'Soften the back of your neck, and let your shoulders drop.', vi: 'Thả lỏng phía sau cổ, và để vai buông xuống.' },
    { id: 'standing-forward-fold__cue-7', kind: 'breath', en: 'Let the exhale fold you a little deeper.', vi: 'Để hơi thở ra đưa bạn gập sâu thêm một chút.' },
    { id: 'standing-forward-fold__cue-8', kind: 'safety', en: 'If your lower back complains, bend your knees more.', vi: 'Nếu lưng dưới khó chịu, chùng gối nhiều hơn.' },
    { id: 'standing-forward-fold__cue-9', kind: 'transition', en: 'Inhale, lift your chest halfway and look forward.', vi: 'Hít vào, nâng ngực lên nửa chừng và nhìn về trước.' },
  ],

  modifications: [
    { id: 'standing-forward-fold__mod-1', en: 'Rest your hands on blocks if the floor feels far away.', vi: 'Đặt tay lên gạch nếu thấy sàn còn xa.', props: ['blocks'] },
    { id: 'standing-forward-fold__mod-2', en: 'Hold opposite elbows and let your upper body hang.', vi: 'Nắm khuỷu tay đối diện và để thân trên buông xuống.', props: [] },
    { id: 'standing-forward-fold__mod-3', en: 'Keep your knees well bent and rest your belly on your thighs.', vi: 'Chùng gối nhiều và để bụng tựa lên đùi.', props: [] },
  ],

  safety: [
    { id: 'standing-forward-fold__safe-1', en: 'With a lower back injury, bend your knees and come up slowly with a flat back.', vi: 'Nếu lưng dưới có chấn thương, chùng gối và đứng lên từ từ với lưng phẳng.' },
    { id: 'standing-forward-fold__safe-2', en: 'If your head feels heavy or dizzy, come up slowly, leading with your chest.', vi: 'Nếu đầu thấy nặng hoặc chóng mặt, đứng lên từ từ, nâng ngực lên trước.' },
    { id: 'standing-forward-fold__safe-3', en: 'In pregnancy, step your feet wide so your belly has room.', vi: 'Khi mang thai, đặt hai chân rộng ra để bụng có chỗ.' },
  ],

  muscles: { working: ['quadriceps'], lengthening: ['hamstrings', 'calves', 'erector-spinae'] },
  joints: ['hip-joint', 'sit-bones', 'knee', 'lumbar-spine'],
  transitionsTo: ['half-lift'],
  figure: 'standing-forward-fold',
}
