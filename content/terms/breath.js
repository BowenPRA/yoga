/** Breath and rhythm language. Short, because these are said constantly. */
export const BREATH = [
  { id: 'inhale', domain: 'breath', group: 'verb', en: 'inhale', vi: 'hít vào', say: 'in-HAYL', traps: ['stress', 'final-l'],
    example: { en: 'Inhale, reach your arms up.', vi: 'Hít vào, vươn hai tay lên.' } },
  { id: 'exhale', domain: 'breath', group: 'verb', en: 'exhale', vi: 'thở ra', say: 'eks-HAYL', traps: ['cluster-ks', 'final-l'],
    example: { en: 'Exhale, fold forward.', vi: 'Thở ra, gập người về trước.' } },
  { id: 'breathe', domain: 'breath', group: 'verb', en: 'breathe', vi: 'thở (động từ)', say: 'BREETH (dài, rung)', traps: ['th-voiced', 'long-ee', 'breath-breathe'],
    example: { en: 'Breathe into the back of your body.', vi: 'Hít thở hướng vào phía sau cơ thể.' } },
  { id: 'breath', domain: 'breath', group: 'noun', en: 'breath', vi: 'hơi thở (danh từ)', say: 'BRETH (ngắn, không rung)', traps: ['th', 'short-e', 'breath-breathe'],
    example: { en: 'Stay here for five breaths.', vi: 'Giữ ở đây trong năm nhịp thở.' } },
  { id: 'on-your-next-exhale', domain: 'breath', group: 'phrase', en: 'on your next exhale', vi: 'ở hơi thở ra tiếp theo', say: 'on yor NEKST EKS-hayl', traps: ['cluster-kst'],
    example: { en: 'On your next exhale, slowly come out of the pose.', vi: 'Ở hơi thở ra tiếp theo, từ từ thoát khỏi tư thế.' } },
  { id: 'stay-for-five-breaths', domain: 'breath', group: 'phrase', en: 'stay here for five breaths', vi: 'giữ ở đây trong năm nhịp thở', say: 'STAY heer for FYV BRETHS', traps: ['final-ths', 'cluster-st'],
    example: { en: 'Stay here for five breaths.', vi: 'Giữ ở đây trong năm nhịp thở.' } },
]
