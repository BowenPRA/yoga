export const chaturanga = {
  id: 'chaturanga',
  styles: ['vinyasa', 'ashtanga'],
  family: 'arm-balance',
  level: 'strong',
  en: 'Chaturanga',
  aka: ['Four-Limbed Staff Pose', 'Low Plank'],
  sa: 'Caturaṅga Daṇḍāsana',
  say: 'chah-too-RANG-gah dan-DAH-sah-nah',
  vi: 'Tấm ván thấp',

  ashtanga: {
    series: 'primary',
    section: 'surya-a',
    position: 5,
    drishti: 'nose',
    note: {
      en: 'Catvāri, the fourth vinyasa of Surya Namaskara A, on an exhale; it comes back after every Warrior I in Surya Namaskara B and in every vinyasa between the seated poses. A passing count; the teacher counts “Catvāri, exhale” as you jump or step back and lower.',
      vi: 'Catvāri, vinyasa thứ tư của Chào mặt trời A, khi thở ra; tư thế này trở lại sau mỗi lần Chiến binh I trong Chào mặt trời B và trong mỗi vinyasa giữa các tư thế ngồi. Một nhịp đi qua; giáo viên đếm “Catvāri, thở ra” khi bạn nhảy hoặc bước ra sau và hạ xuống.',
    },
  },

  breath: {
    en: 'Exhale as you lower. Inhale as you roll forward into Upward Dog.',
    vi: 'Thở ra khi hạ xuống. Hít vào khi lăn người về trước vào Chó ngửa mặt.',
  },

  cues: [
    { id: 'chaturanga__cue-1', kind: 'transition', en: 'Exhale, step or jump back, and lower halfway down.', vi: 'Thở ra, bước hoặc nhảy ra sau, và hạ người xuống nửa chừng.' },
    { id: 'chaturanga__cue-2', kind: 'alignment', en: 'Hug your elbows in toward your ribs as you lower.', vi: 'Ôm khuỷu tay sát vào sườn khi bạn hạ xuống.' },
    { id: 'chaturanga__cue-3', kind: 'alignment', en: 'Keep your elbows stacked over your wrists.', vi: 'Giữ khuỷu tay thẳng trên cổ tay.' },
    { id: 'chaturanga__cue-4', kind: 'alignment', en: 'Keep your body in one long line, from your head to your heels.', vi: 'Giữ cơ thể thành một đường dài, từ đầu đến gót chân.' },
    { id: 'chaturanga__cue-5', kind: 'alignment', en: 'Stop when your shoulders are level with your elbows.', vi: 'Dừng lại khi vai ngang bằng với khuỷu tay.' },
    { id: 'chaturanga__cue-6', kind: 'soften', en: 'Let your face stay soft, even while your arms work hard.', vi: 'Giữ khuôn mặt mềm, ngay cả khi hai tay đang làm việc nhiều.' },
    { id: 'chaturanga__cue-7', kind: 'breath', en: 'One long exhale, all the way down.', vi: 'Một hơi thở ra dài, suốt quãng hạ xuống.' },
    { id: 'chaturanga__cue-8', kind: 'safety', en: 'Don’t let your shoulders drop lower than your elbows.', vi: 'Đừng để vai hạ thấp hơn khuỷu tay.' },
    { id: 'chaturanga__cue-9', kind: 'transition', en: 'Inhale, roll over your toes into Upward Dog.', vi: 'Hít vào, lăn qua các ngón chân vào Chó ngửa mặt.' },
  ],

  modifications: [
    { id: 'chaturanga__mod-1', en: 'Lower your knees to the mat first, then bend your elbows.', vi: 'Hạ hai gối xuống thảm trước, rồi mới gập khuỷu tay.', props: [] },
    { id: 'chaturanga__mod-2', en: 'Place a block under your chest and lower only until you touch it.', vi: 'Đặt một viên gạch dưới ngực và chỉ hạ xuống đến khi chạm gạch.', props: ['block'] },
    { id: 'chaturanga__mod-3', en: 'Lower all the way to your belly, and skip the hover.', vi: 'Hạ hẳn người xuống nằm sấp, bỏ qua bước giữ người lơ lửng.', props: [] },
  ],

  safety: [
    { id: 'chaturanga__safe-1', en: 'With a shoulder injury, keep your knees down, or skip it and lower to the floor.', vi: 'Nếu vai có chấn thương, giữ gối chạm sàn, hoặc bỏ qua và hạ hẳn xuống sàn.' },
    { id: 'chaturanga__safe-2', en: 'If your wrists hurt, press through your knuckles and fingertips.', vi: 'Nếu cổ tay đau, ấn qua các khớp ngón và đầu ngón tay.' },
    { id: 'chaturanga__safe-3', en: 'From the middle of pregnancy, keep your knees down or skip it.', vi: 'Từ giữa thai kỳ, giữ gối chạm sàn hoặc bỏ qua tư thế này.' },
  ],

  muscles: {
    working: ['triceps-brachii', 'pectoralis-major', 'deltoids', 'serratus-anterior', 'rectus-abdominis', 'quadriceps'],
    lengthening: [],
  },
  joints: ['elbow', 'shoulder-joint', 'wrist'],
  transitionsTo: ['upward-dog'],
  figure: 'chaturanga',
}
