export const halfLift = {
  id: 'half-lift',
  styles: ['vinyasa', 'ashtanga'],
  family: 'sun-salutation',
  level: 'gentle',
  en: 'Half Lift',
  aka: ['Halfway Lift', 'Flat Back'],
  sa: 'Ardha Uttānāsana',
  say: 'AR-dah oot-tah-NAH-sah-nah',
  vi: 'Nửa gập người',

  ashtanga: {
    series: 'primary',
    section: 'surya-a',
    position: 4,
    drishti: 'third-eye',
    note: {
      en: 'Trīṇi, the third vinyasa of Surya Namaskara A, on an inhale, and again sapta, the seventh, after you jump forward; in Surya Namaskara B it is trīṇi and pañcadaśa. A passing count; the teacher counts “Trīṇi, inhale, look up”.',
      vi: 'Trīṇi, vinyasa thứ ba của Chào mặt trời A, khi hít vào, và trở lại ở sapta, vinyasa thứ bảy, sau khi bạn nhảy lên; trong Chào mặt trời B là trīṇi và pañcadaśa. Một nhịp đi qua; giáo viên đếm “Trīṇi, hít vào, nhìn lên”.',
    },
  },

  breath: {
    en: 'Inhale to lengthen your spine forward. Exhale as you step or jump back.',
    vi: 'Hít vào để kéo dài cột sống về trước. Thở ra khi bạn bước hoặc nhảy ra sau.',
  },

  cues: [
    { id: 'half-lift__cue-1', kind: 'transition', en: 'Inhale, come halfway up with your fingertips on the floor.', vi: 'Hít vào, nâng người lên nửa chừng, đầu ngón tay vẫn chạm sàn.' },
    { id: 'half-lift__cue-2', kind: 'alignment', en: 'Lengthen your spine from your tailbone to the crown of your head.', vi: 'Kéo dài cột sống từ xương cụt đến đỉnh đầu.' },
    { id: 'half-lift__cue-3', kind: 'alignment', en: 'Reach your chest forward and draw your shoulder blades down your back.', vi: 'Vươn ngực về trước và kéo hai bả vai xuống dọc lưng.' },
    { id: 'half-lift__cue-4', kind: 'alignment', en: 'Bend your knees if your back starts to round.', vi: 'Chùng gối nếu lưng bắt đầu bị cong.' },
    { id: 'half-lift__cue-5', kind: 'alignment', en: 'Look forward and slightly up, keeping the back of your neck long.', vi: 'Nhìn về trước và hơi lên, giữ phía sau cổ dài.' },
    { id: 'half-lift__cue-6', kind: 'soften', en: 'Soften your shoulders. The lift comes from your spine.', vi: 'Thả lỏng vai. Hãy để cột sống nâng bạn lên.' },
    { id: 'half-lift__cue-7', kind: 'breath', en: 'It’s one inhale. Don’t hold it here.', vi: 'Chỉ một hơi hít vào. Đừng giữ lại ở đây.' },
    { id: 'half-lift__cue-8', kind: 'safety', en: 'With a sore lower back, keep your knees bent and your belly drawn in.', vi: 'Nếu lưng dưới đau, giữ gối chùng và hóp nhẹ bụng.' },
    { id: 'half-lift__cue-9', kind: 'transition', en: 'Exhale, plant your hands and step or jump back.', vi: 'Thở ra, đặt chắc hai tay và bước hoặc nhảy ra sau.' },
  ],

  modifications: [
    { id: 'half-lift__mod-1', en: 'Bring your hands to your shins or to blocks to keep your back flat.', vi: 'Đặt tay lên ống chân hoặc lên gạch để giữ lưng phẳng.', props: ['blocks'] },
    { id: 'half-lift__mod-2', en: 'Bend your knees deeply so your spine can stay long.', vi: 'Chùng gối sâu để cột sống được dài.', props: [] },
  ],

  safety: [
    { id: 'half-lift__safe-1', en: 'Keep the back of your neck long. Don’t crank your head up.', vi: 'Giữ phía sau cổ dài. Đừng ngửa mạnh đầu lên.' },
    { id: 'half-lift__safe-2', en: 'If your lower back aches, bend your knees and lift less.', vi: 'Nếu lưng dưới mỏi, chùng gối và nâng người ít lại.' },
  ],

  muscles: { working: ['erector-spinae', 'quadriceps'], lengthening: ['hamstrings', 'calves'] },
  joints: ['hip-joint', 'thoracic-spine', 'shoulder-blades'],
  transitionsTo: ['chaturanga'],
  figure: 'half-lift',
}
