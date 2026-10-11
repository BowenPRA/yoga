export const wheelPose = {
  id: 'wheel-pose',
  styles: ['vinyasa', 'ashtanga'],
  family: 'backbend',
  level: 'strong',
  en: 'Wheel Pose',
  aka: ['Upward Bow', 'Full Backbend'],
  sa: 'Ūrdhva Dhanurāsana',
  say: 'OORD-vah dah-noo-RAH-sah-nah',
  vi: 'Bánh xe',

  ashtanga: {
    series: 'primary',
    section: 'finishing',
    position: 40,
    breaths: 5,
    drishti: 'nose',
    note: {
      en: 'The first pose of the finishing sequence, straight after Setu Bandhāsana: three backbends of five breaths each, lowering to rest between them, then Paścimottānāsana for ten breaths as the counterpose. In a led class the teacher says “Inhale, come up”, counts five breaths, then “Exhale, come down”, and repeats twice more.',
      vi: 'Tư thế đầu tiên của chuỗi kết thúc, ngay sau Setu Bandhāsana: ba lần ngả sau, mỗi lần năm nhịp thở, hạ xuống nghỉ ở giữa, rồi Paścimottānāsana mười nhịp thở làm tư thế đối. Trong lớp có hướng dẫn, giáo viên nói “Hít vào, nâng lên”, đếm năm nhịp thở, rồi “Thở ra, hạ xuống”, và lặp lại thêm hai lần.',
    },
  },

  breath: {
    en: 'Inhale to press up. Keep breathing evenly through your nose for five breaths, then exhale to lower slowly.',
    vi: 'Hít vào để đẩy người lên. Tiếp tục thở đều bằng mũi trong năm nhịp thở, rồi thở ra để hạ xuống từ từ.',
  },

  cues: [
    { id: 'wheel-pose__cue-1', kind: 'transition', en: 'Lie on your back, bend your knees, and bring your feet hip-width apart, close to your hips.', vi: 'Nằm ngửa, co gối, và đặt hai bàn chân rộng bằng hông, sát gần hông.' },
    { id: 'wheel-pose__cue-2', kind: 'transition', en: 'Place your hands beside your ears, fingers pointing toward your shoulders.', vi: 'Đặt hai tay cạnh tai, các ngón tay hướng về phía vai.' },
    { id: 'wheel-pose__cue-3', kind: 'transition', en: 'Inhale, press into your hands and feet, and lift all the way up.', vi: 'Hít vào, ấn hai tay và hai bàn chân xuống, và nâng người lên hẳn.' },
    { id: 'wheel-pose__cue-4', kind: 'alignment', en: 'Keep your feet parallel and your knees in line with your hips.', vi: 'Giữ hai bàn chân song song và hai gối thẳng hàng với hông.' },
    { id: 'wheel-pose__cue-5', kind: 'alignment', en: 'Straighten your arms and move your chest toward the wall behind you.', vi: 'Duỗi thẳng tay và đưa ngực về phía bức tường sau lưng.' },
    { id: 'wheel-pose__cue-6', kind: 'soften', en: 'Let your neck relax and your head hang between your arms.', vi: 'Thả lỏng cổ và để đầu buông giữa hai cánh tay.' },
    { id: 'wheel-pose__cue-7', kind: 'breath', en: 'Stay for five breaths. Keep the breath moving, even if it’s short.', vi: 'Giữ năm nhịp thở. Cứ tiếp tục thở, dù hơi thở có ngắn.' },
    { id: 'wheel-pose__cue-8', kind: 'safety', en: 'If your lower back pinches, lengthen your tailbone toward your knees, or come down.', vi: 'Nếu lưng dưới bị nhói, kéo dài xương cụt về phía gối, hoặc hạ xuống.' },
    { id: 'wheel-pose__cue-9', kind: 'transition', en: 'Exhale, tuck your chin, and lower slowly: shoulders first, then your hips.', vi: 'Thở ra, thu cằm, và hạ xuống từ từ: vai trước, rồi đến hông.' },
  ],

  modifications: [
    { id: 'wheel-pose__mod-1', en: 'Take Bridge Pose instead, with a block under your sacrum if you like.', vi: 'Thay bằng tư thế Cây cầu, có thể kê một viên gạch dưới xương cùng.', props: ['block'] },
    { id: 'wheel-pose__mod-2', en: 'Place two blocks against a wall and put your hands on them.', vi: 'Đặt hai viên gạch sát tường và chống hai tay lên gạch.', props: ['blocks', 'wall'] },
    { id: 'wheel-pose__mod-3', en: 'Squeeze a block between your thighs to keep your knees from splaying.', vi: 'Kẹp một viên gạch giữa hai đùi để hai gối không bị mở bung ra.', props: ['block'] },
  ],

  safety: [
    { id: 'wheel-pose__safe-1', en: 'With a lower back, shoulder or wrist injury, take Bridge Pose instead.', vi: 'Nếu lưng dưới, vai hoặc cổ tay có chấn thương, thay bằng tư thế Cây cầu.' },
    { id: 'wheel-pose__safe-2', en: 'Don’t turn your head while you’re up.', vi: 'Đừng quay đầu khi đang ở trên.' },
    { id: 'wheel-pose__safe-3', en: 'In pregnancy, skip Wheel. Bridge or a supported backbend is gentler.', vi: 'Khi mang thai, bỏ qua Bánh xe. Cây cầu hoặc một tư thế ngả sau có hỗ trợ sẽ nhẹ nhàng hơn.' },
  ],

  muscles: {
    working: ['triceps-brachii', 'gluteus-maximus', 'erector-spinae', 'quadriceps'],
    lengthening: ['rectus-abdominis', 'iliopsoas', 'latissimus-dorsi', 'pectoralis-major'],
  },
  joints: ['wrist', 'shoulder-joint', 'thoracic-spine', 'lumbar-spine', 'hip-joint'],
  transitionsTo: ['seated-forward-fold'],
  counterPoses: ['seated-forward-fold'],
  figure: 'wheel-pose',
}
