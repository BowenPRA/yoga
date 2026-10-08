export const upwardSalute = {
  id: 'upward-salute',
  styles: ['vinyasa', 'ashtanga'],
  family: 'sun-salutation',
  level: 'gentle',
  en: 'Upward Salute',
  aka: ['Raised Arms Pose', 'Upward Hands'],
  sa: 'Ūrdhva Hastāsana',
  say: 'OORD-vah hah-STAH-sah-nah',
  vi: 'Vươn tay lên cao',

  ashtanga: {
    series: 'primary',
    section: 'surya-a',
    position: 2,
    drishti: 'thumbs',
    note: {
      en: 'Ekam, the first vinyasa of Surya Namaskara A, and again nava, the ninth: one inhale, gaze at your thumbs, then straight on. It is a passing count; the state of the salutation is Downward Dog on ṣaṭ. The teacher counts “Ekam, inhale”.',
      vi: 'Ekam, vinyasa thứ nhất của Chào mặt trời A, và trở lại ở nava, vinyasa thứ chín: một hơi hít vào, nhìn ngón tay cái, rồi đi tiếp. Đây là một nhịp đi qua; trạng thái của cả chuỗi là Chó úp mặt ở ṣaṭ. Giáo viên đếm “Ekam, hít vào”.',
    },
  },

  breath: {
    en: 'Inhale as your arms sweep up; the movement lasts as long as the breath. Exhale as you fold.',
    vi: 'Hít vào khi hai tay vươn lên; chuyển động dài đúng bằng hơi thở. Thở ra khi bạn gập người.',
  },

  cues: [
    { id: 'upward-salute__cue-1', kind: 'transition', en: 'Inhale, sweep your arms out and up over your head.', vi: 'Hít vào, đưa hai tay vòng ra hai bên rồi lên trên đầu.' },
    { id: 'upward-salute__cue-2', kind: 'alignment', en: 'Bring your palms together and look up at your thumbs.', vi: 'Chắp hai lòng bàn tay và nhìn lên ngón tay cái.' },
    { id: 'upward-salute__cue-3', kind: 'alignment', en: 'Keep your legs strong and your feet rooted.', vi: 'Giữ hai chân vững và bàn chân bám chắc xuống sàn.' },
    { id: 'upward-salute__cue-4', kind: 'alignment', en: 'Draw your lower ribs in so your back doesn’t arch.', vi: 'Kéo xương sườn dưới vào để lưng không bị ưỡn.' },
    { id: 'upward-salute__cue-5', kind: 'soften', en: 'Let your shoulders slide down as your arms go up.', vi: 'Để vai trượt xuống trong khi hai tay đi lên.' },
    { id: 'upward-salute__cue-6', kind: 'breath', en: 'Make the movement last the whole inhale.', vi: 'Để chuyển động kéo dài trọn một hơi hít vào.' },
    { id: 'upward-salute__cue-7', kind: 'safety', en: 'If your shoulders are tight, keep your hands apart, shoulder-width.', vi: 'Nếu vai bị căng, giữ hai tay tách ra, rộng bằng vai.' },
    { id: 'upward-salute__cue-8', kind: 'transition', en: 'Exhale, fold forward.', vi: 'Thở ra, gập người về trước.' },
  ],

  modifications: [
    { id: 'upward-salute__mod-1', en: 'Keep your arms shoulder-width apart, palms facing each other.', vi: 'Giữ hai tay rộng bằng vai, lòng bàn tay hướng vào nhau.', props: [] },
    { id: 'upward-salute__mod-2', en: 'If your neck is sore, look straight ahead instead of up.', vi: 'Nếu cổ bị đau, nhìn thẳng về trước thay vì nhìn lên.', props: [] },
  ],

  safety: [
    { id: 'upward-salute__safe-1', en: 'With a shoulder injury, raise your arms only as high as is pain-free.', vi: 'Nếu vai có chấn thương, chỉ nâng tay đến mức không thấy đau.' },
    { id: 'upward-salute__safe-2', en: 'Don’t throw your head back. Lift your gaze, not your chin.', vi: 'Đừng ngửa đầu ra sau. Hãy nâng ánh nhìn, không phải nâng cằm.' },
  ],

  muscles: { working: ['deltoids', 'serratus-anterior', 'trapezius'], lengthening: ['latissimus-dorsi'] },
  joints: ['shoulder-joint', 'shoulder-blades', 'ribs'],
  transitionsTo: ['standing-forward-fold'],
  figure: 'upward-salute',
}
