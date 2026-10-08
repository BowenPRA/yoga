export const lotus = {
  id: 'lotus',
  styles: ['vinyasa', 'ashtanga'],
  family: 'seated',
  level: 'strong',
  en: 'Lotus Pose',
  aka: ['Full Lotus'],
  sa: 'Padmāsana',
  say: 'pad-MAH-sah-nah',
  vi: 'Hoa sen',

  ashtanga: {
    series: 'primary',
    section: 'finishing',
    position: 49,
    breaths: 10,
    drishti: 'nose',
    note: {
      en: 'Straight after Yoga Mudrā, with the bind released: sit up in lotus, hands resting on your knees, for ten breaths, or longer in your own practice. The teacher says “Inhale, Padmāsana” and counts ten.',
      vi: 'Tiếp ngay sau Yoga Mudrā, khi đã thả thế khoá: ngồi thẳng trong hoa sen, hai tay đặt trên gối, trong mười nhịp thở, hoặc lâu hơn khi bạn tự tập. Giáo viên nói “Hít vào, Padmāsana” và đếm mười nhịp.',
    },
  },

  breath: {
    en: 'Sit tall and let the breath slow down by itself. Ten breaths, or longer.',
    vi: 'Ngồi thẳng và để hơi thở tự chậm lại. Mười nhịp thở, hoặc lâu hơn.',
  },

  cues: [
    { id: 'lotus__cue-1', kind: 'transition', en: 'Bring your right foot onto your left thigh, then your left foot onto your right thigh.', vi: 'Đặt bàn chân phải lên đùi trái, rồi bàn chân trái lên đùi phải.' },
    { id: 'lotus__cue-2', kind: 'alignment', en: 'Let your knees drop toward the floor.', vi: 'Để hai gối hạ dần xuống về phía sàn.' },
    { id: 'lotus__cue-3', kind: 'alignment', en: 'Rest your hands on your knees, thumb and first finger touching.', vi: 'Đặt hai tay lên gối, ngón cái và ngón trỏ chạm nhau.' },
    { id: 'lotus__cue-4', kind: 'alignment', en: 'Root down through your sitting bones and lengthen up.', vi: 'Bám rễ qua xương ngồi và kéo dài lên.' },
    { id: 'lotus__cue-5', kind: 'alignment', en: 'Lower your chin slightly, and lengthen the back of your neck.', vi: 'Hạ cằm nhẹ, và kéo dài phía sau cổ.' },
    { id: 'lotus__cue-6', kind: 'soften', en: 'Soften your shoulders, your face, your belly.', vi: 'Thả lỏng vai, khuôn mặt, và bụng.' },
    { id: 'lotus__cue-7', kind: 'breath', en: 'Stay for ten breaths. Let each one be a little slower.', vi: 'Giữ mười nhịp thở. Để mỗi hơi thở chậm hơn một chút.' },
    { id: 'lotus__cue-8', kind: 'safety', en: 'If your knees or ankles hurt, come out and sit cross-legged.', vi: 'Nếu gối hoặc cổ chân đau, thoát ra và ngồi xếp bằng.' },
    { id: 'lotus__cue-9', kind: 'transition', en: 'Place your hands beside your hips, ready to lift up.', vi: 'Đặt hai tay cạnh hông, sẵn sàng nâng người lên.' },
  ],

  modifications: [
    { id: 'lotus__mod-1', en: 'Sit in half lotus, one foot on the opposite thigh.', vi: 'Ngồi nửa hoa sen, một bàn chân đặt lên đùi bên kia.', props: [] },
    { id: 'lotus__mod-2', en: 'Sit cross-legged on a folded blanket.', vi: 'Ngồi xếp bằng trên chăn gấp.', props: ['blanket'] },
    { id: 'lotus__mod-3', en: 'Put blocks under your knees if they float.', vi: 'Kê gạch dưới gối nếu gối còn lơ lửng.', props: ['blocks'] },
  ],

  safety: [
    { id: 'lotus__safe-1', en: 'Lotus comes from your hips, not your knees. Never force your foot into place.', vi: 'Hoa sen đến từ hông, không phải từ gối. Đừng bao giờ ép bàn chân vào vị trí.' },
    { id: 'lotus__safe-2', en: 'With a knee injury, sit cross-legged instead.', vi: 'Nếu gối có chấn thương, ngồi xếp bằng thay thế.' },
  ],

  muscles: { working: ['deep-rotators', 'erector-spinae'], lengthening: ['tibialis-anterior'] },
  joints: ['hip-joint', 'knee', 'ankle', 'sit-bones'],
  transitionsTo: ['uplifting-pose'],
  figure: 'lotus',
}
