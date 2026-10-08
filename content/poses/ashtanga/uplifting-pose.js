export const upliftingPose = {
  id: 'uplifting-pose',
  styles: ['ashtanga'],
  family: 'arm-balance',
  level: 'strong',
  en: 'Uplifting Pose',
  aka: ['Scale Pose', 'Lifted Lotus'],
  sa: 'Utplutiḥ',
  say: 'oot-PLOO-tee',
  vi: 'Hoa sen nâng người',
  saNote: {
    en: 'Ashtanga books usually spell it Utpluthiḥ; the Sanskrit word is utpluti, “leaping up”. Outside Ashtanga the same lift is often called Tolāsana, Scale Pose.',
    vi: 'Sách Ashtanga thường viết là Utpluthiḥ; từ Sanskrit là utpluti, nghĩa là “bật lên”. Ngoài Ashtanga, động tác nâng người này thường được gọi là Tolāsana, tư thế Cái cân.',
  },

  ashtanga: {
    series: 'primary',
    section: 'finishing',
    position: 50,
    breaths: 10,
    drishti: 'nose',
    note: {
      en: 'The last pose of the series: from lotus, press your hands down and lift your whole body off the floor for ten breaths; some teachers count to twenty-five. A final vinyasa follows, then rest; the teacher says “Inhale, Utpluthiḥ, lift up” and counts.',
      vi: 'Tư thế cuối cùng của chuỗi: từ hoa sen, ấn hai tay xuống và nâng cả cơ thể lên khỏi sàn trong mười nhịp thở; một số giáo viên đếm đến hai mươi lăm. Sau đó là một vinyasa cuối, rồi nghỉ; giáo viên nói “Hít vào, Utpluthiḥ, nâng lên” và đếm.',
    },
  },

  breath: {
    en: 'Keep breathing steadily while you hold. Don’t hold your breath to stay up.',
    vi: 'Tiếp tục thở đều trong khi giữ. Đừng nín thở để giữ người.',
  },

  cues: [
    { id: 'uplifting-pose__cue-1', kind: 'transition', en: 'Keep your lotus, and place your palms flat beside your hips.', vi: 'Giữ hoa sen, và đặt lòng bàn tay áp sàn cạnh hông.' },
    { id: 'uplifting-pose__cue-2', kind: 'transition', en: 'Inhale, press your hands down and lift your hips and knees off the floor.', vi: 'Hít vào, ấn hai tay xuống và nâng hông và gối lên khỏi sàn.' },
    { id: 'uplifting-pose__cue-3', kind: 'alignment', en: 'Straighten your arms, and draw your shoulders down.', vi: 'Duỗi thẳng tay, và kéo vai xuống.' },
    { id: 'uplifting-pose__cue-4', kind: 'alignment', en: 'Draw your knees toward your chest and your belly in.', vi: 'Kéo gối về phía ngực và hóp bụng vào.' },
    { id: 'uplifting-pose__cue-5', kind: 'soften', en: 'Keep your face soft. The work is in your arms and belly.', vi: 'Giữ khuôn mặt mềm. Tay và bụng làm việc, còn khuôn mặt thì nghỉ.' },
    { id: 'uplifting-pose__cue-6', kind: 'breath', en: 'Stay for ten breaths, and keep breathing.', vi: 'Giữ mười nhịp thở, và cứ tiếp tục thở.' },
    { id: 'uplifting-pose__cue-7', kind: 'safety', en: 'If your wrists complain, lift on your fists instead.', vi: 'Nếu cổ tay khó chịu, nâng người bằng nắm tay thay thế.' },
    { id: 'uplifting-pose__cue-8', kind: 'transition', en: 'Exhale, swing back through your arms, and land in Chaturanga.', vi: 'Thở ra, đu người ra sau qua hai tay, và đáp xuống Chaturanga.' },
  ],

  modifications: [
    { id: 'uplifting-pose__mod-1', en: 'Place blocks under your hands to give yourself more height.', vi: 'Đặt gạch dưới tay để có thêm độ cao.', props: ['blocks'] },
    { id: 'uplifting-pose__mod-2', en: 'Simply cross your legs, and lift only your hips.', vi: 'Chỉ bắt chéo chân, và chỉ nâng hông lên.', props: [] },
    { id: 'uplifting-pose__mod-3', en: 'As a first step, keep your feet on the floor and lift your hips.', vi: 'Ở bước đầu, giữ bàn chân trên sàn và nâng hông lên.', props: [] },
  ],

  safety: [
    { id: 'uplifting-pose__safe-1', en: 'With a wrist injury, lift on blocks with your fingers over the edge, or skip it.', vi: 'Nếu cổ tay có chấn thương, nâng người trên gạch với ngón tay bám mép gạch, hoặc bỏ qua.' },
    { id: 'uplifting-pose__safe-2', en: 'In pregnancy, skip it, and sit quietly instead.', vi: 'Khi mang thai, bỏ qua tư thế này, và ngồi yên thay thế.' },
  ],

  muscles: { working: ['triceps-brachii', 'latissimus-dorsi', 'rectus-abdominis', 'iliopsoas'], lengthening: [] },
  joints: ['wrist', 'elbow', 'shoulder-joint', 'hip-joint'],
  transitionsTo: ['savasana'],
  figure: 'uplifting-pose',
}
