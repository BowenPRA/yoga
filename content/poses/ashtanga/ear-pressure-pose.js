export const earPressurePose = {
  id: 'ear-pressure-pose',
  styles: ['ashtanga'],
  family: 'inversion',
  level: 'strong',
  en: 'Ear Pressure Pose',
  aka: ['Knees-to-Ears Pose'],
  sa: 'Karṇapīḍāsana',
  say: 'kar-nah-pee-DAH-sah-nah',
  vi: 'Gối ép tai',

  ashtanga: {
    series: 'primary',
    section: 'finishing',
    position: 43,
    breaths: 8,
    drishti: 'nose',
    note: {
      en: 'Straight from Halāsana: bend your knees down beside your ears for eight breaths. The teacher says “Exhale, Karṇapīḍāsana” and counts eight.',
      vi: 'Tiếp ngay từ Halāsana: gập gối hạ xuống cạnh tai trong tám nhịp thở. Giáo viên nói “Thở ra, Karṇapīḍāsana” và đếm tám nhịp.',
    },
  },

  breath: {
    en: 'Breathe into the back of your ribs. The front of your body is folded, so the breath will be small.',
    vi: 'Thở vào phía sau lồng ngực. Phía trước cơ thể đang gập lại, nên hơi thở sẽ nhỏ.',
  },

  cues: [
    { id: 'ear-pressure-pose__cue-1', kind: 'transition', en: 'From Plow, exhale and bend your knees down beside your ears.', vi: 'Từ Cái cày, thở ra và gập gối hạ xuống cạnh tai.' },
    { id: 'ear-pressure-pose__cue-2', kind: 'alignment', en: 'Rest your knees on the floor, or as close as they come.', vi: 'Đặt gối xuống sàn, hoặc gần sàn nhất có thể.' },
    { id: 'ear-pressure-pose__cue-3', kind: 'alignment', en: 'Keep your hands interlaced behind you, or wrap your arms around the backs of your knees.', vi: 'Giữ hai tay đan sau lưng, hoặc vòng tay ôm phía sau gối.' },
    { id: 'ear-pressure-pose__cue-4', kind: 'alignment', en: 'Point your toes, and let the tops of your feet rest on the floor.', vi: 'Duỗi mũi chân, và để mu bàn chân nằm trên sàn.' },
    { id: 'ear-pressure-pose__cue-5', kind: 'soften', en: 'Let your knees gently close over your ears, and listen inward.', vi: 'Để gối khép nhẹ lên tai, và lắng nghe vào bên trong.' },
    { id: 'ear-pressure-pose__cue-6', kind: 'breath', en: 'Stay for eight breaths, breathing into your back.', vi: 'Giữ tám nhịp thở, thở vào lưng.' },
    { id: 'ear-pressure-pose__cue-7', kind: 'safety', en: 'Keep the weight on your shoulders. If your neck hurts, come out.', vi: 'Giữ trọng lượng trên vai. Nếu cổ đau, thoát thế.' },
    { id: 'ear-pressure-pose__cue-8', kind: 'transition', en: 'Inhale, bring your hands to your back and lift your legs back up.', vi: 'Hít vào, đặt tay đỡ lưng và nâng hai chân trở lại lên trên.' },
  ],

  modifications: [
    { id: 'ear-pressure-pose__mod-1', en: 'Keep your hands on your back, and your knees above your forehead.', vi: 'Giữ tay đỡ lưng, và để gối ở phía trên trán.', props: [] },
    { id: 'ear-pressure-pose__mod-2', en: 'Rest your shins on a chair seat behind your head.', vi: 'Tựa ống chân lên mặt ghế phía sau đầu.', props: ['chair'] },
    { id: 'ear-pressure-pose__mod-3', en: 'Work with folded blankets under your shoulders.', vi: 'Tập với chăn gấp kê dưới vai.', props: ['blanket'] },
  ],

  safety: [
    { id: 'ear-pressure-pose__safe-1', en: 'With a neck injury, skip it.', vi: 'Nếu cổ có chấn thương, bỏ qua tư thế này.' },
    { id: 'ear-pressure-pose__safe-2', en: 'With high blood pressure or glaucoma, or in pregnancy, skip it.', vi: 'Nếu bạn bị huyết áp cao hoặc tăng nhãn áp, hoặc khi mang thai, bỏ qua tư thế này.' },
  ],

  muscles: { working: [], lengthening: ['erector-spinae', 'trapezius', 'gluteus-maximus'] },
  joints: ['cervical-spine', 'thoracic-spine', 'knee'],
  transitionsTo: ['lotus-in-shoulderstand'],
  figure: 'ear-pressure-pose',
}
