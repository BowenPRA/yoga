export const halfBoundLotusStanding = {
  id: 'half-bound-lotus-standing',
  styles: ['ashtanga'],
  family: 'balance',
  level: 'strong',
  en: 'Half Bound Lotus Forward Fold',
  aka: ['Standing Half Bound Lotus'],
  sa: 'Ardha Baddha Padmottānāsana',
  say: 'AR-dah BAH-dah pad-moh-tah-NAH-sah-nah',
  vi: 'Nửa hoa sen đứng gập người',

  ashtanga: {
    series: 'primary',
    section: 'standing',
    position: 19,
    vinyasas: 9,
    breaths: 5,
    drishti: 'nose',
    note: {
      en: 'The last balance of the standing sequence, before Utkaṭāsana: nine vinyasas, the right side held on dve, five breaths each side. The teacher counts “Ekam, inhale, bind; dve, exhale, fold”.',
      vi: 'Tư thế thăng bằng cuối cùng của chuỗi đứng, trước Utkaṭāsana: chín vinyasa, bên phải giữ ở dve, năm nhịp thở mỗi bên. Giáo viên đếm “Ekam, hít vào, khoá tay; dve, thở ra, gập người”.',
    },
  },

  breath: {
    en: 'Inhale to bind and stand tall. Exhale to fold. Stay for five breaths, then inhale to look up.',
    vi: 'Hít vào để khoá tay và đứng thẳng. Thở ra để gập người. Giữ năm nhịp thở, rồi hít vào để nhìn lên.',
  },

  cues: [
    { id: 'half-bound-lotus-standing__cue-1', kind: 'transition', en: 'Lift your right foot into half lotus, high on your left thigh.', vi: 'Đưa bàn chân phải lên nửa hoa sen, đặt cao trên đùi trái.' },
    { id: 'half-bound-lotus-standing__cue-2', kind: 'alignment', en: 'Reach your right arm behind your back and catch your right big toe.', vi: 'Vòng tay phải ra sau lưng và nắm ngón chân cái phải.' },
    { id: 'half-bound-lotus-standing__cue-3', kind: 'transition', en: 'Exhale, fold forward and place your left hand beside your left foot.', vi: 'Thở ra, gập người về trước và đặt bàn tay trái cạnh bàn chân trái.' },
    { id: 'half-bound-lotus-standing__cue-4', kind: 'alignment', en: 'Let your bent knee point down toward the floor.', vi: 'Để gối đang gập hướng xuống sàn.' },
    { id: 'half-bound-lotus-standing__cue-5', kind: 'alignment', en: 'Bring your chin toward your shin, and keep your standing leg straight.', vi: 'Đưa cằm về phía ống chân, và giữ chân trụ thẳng.' },
    { id: 'half-bound-lotus-standing__cue-6', kind: 'soften', en: 'Relax your shoulders, and let the fold come slowly.', vi: 'Thả lỏng vai, và để động tác gập đến từ từ.' },
    { id: 'half-bound-lotus-standing__cue-7', kind: 'breath', en: 'Stay for five breaths, gazing toward your nose.', vi: 'Giữ năm nhịp thở, mắt nhìn về chóp mũi.' },
    { id: 'half-bound-lotus-standing__cue-8', kind: 'safety', en: 'If your knee feels any pain, take your foot out of lotus straight away.', vi: 'Nếu gối thấy đau, đưa bàn chân ra khỏi hoa sen ngay.' },
    { id: 'half-bound-lotus-standing__cue-9', kind: 'transition', en: 'Inhale, look up. Then come up slowly and release your foot.', vi: 'Hít vào, nhìn lên. Rồi từ từ đứng lên và thả bàn chân ra.' },
  ],

  modifications: [
    { id: 'half-bound-lotus-standing__mod-1', en: 'Rest your foot on your thigh without the bind, and bring your hands together at your chest.', vi: 'Đặt bàn chân lên đùi mà không khoá tay, và chắp hai tay trước ngực.', props: [] },
    { id: 'half-bound-lotus-standing__mod-2', en: 'If half lotus hurts your knee, place your foot on your inner thigh, as in Tree Pose.', vi: 'Nếu nửa hoa sen làm đau gối, đặt bàn chân vào mặt trong đùi, như tư thế Cái cây.', props: [] },
    { id: 'half-bound-lotus-standing__mod-3', en: 'Stand beside a wall, or bring your bottom hand to a block when you fold.', vi: 'Đứng cạnh tường, hoặc đặt bàn tay phía dưới lên gạch khi gập người.', props: ['wall', 'block'] },
  ],

  safety: [
    { id: 'half-bound-lotus-standing__safe-1', en: 'Never force the lotus. Pain in your knee means come out.', vi: 'Đừng bao giờ ép hoa sen. Đau ở gối nghĩa là cần thoát ra.' },
    { id: 'half-bound-lotus-standing__safe-2', en: 'Fold only when your foot sits high on your thigh and your knee feels easy.', vi: 'Chỉ gập người khi bàn chân đã nằm cao trên đùi và gối thấy dễ chịu.' },
    { id: 'half-bound-lotus-standing__safe-3', en: 'In pregnancy, keep the foot on your thigh and stay upright.', vi: 'Khi mang thai, giữ bàn chân trên đùi và giữ thân thẳng.' },
  ],

  muscles: {
    working: ['quadriceps', 'gluteus-medius', 'deep-rotators'],
    lengthening: ['hamstrings', 'calves'],
  },
  joints: ['knee', 'hip-joint', 'ankle', 'shoulder-joint'],
  transitionsTo: ['chair-pose'],
  figure: 'half-bound-lotus-standing',
}
