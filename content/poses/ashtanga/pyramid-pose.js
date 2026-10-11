export const pyramidPose = {
  id: 'pyramid-pose',
  styles: ['vinyasa', 'ashtanga'],
  family: 'forward-fold',
  level: 'moderate',
  en: 'Pyramid Pose',
  aka: ['Intense Side Stretch'],
  sa: 'Pārśvottānāsana',
  say: 'parsh-voh-tah-NAH-sah-nah',
  vi: 'Kim tự tháp',

  ashtanga: {
    series: 'primary',
    section: 'standing',
    position: 17,
    vinyasas: 5,
    breaths: 5,
    drishti: 'toes',
    note: {
      en: 'Five vinyasas, the right side on dve and the left on catvāri, five breaths each, with your palms together behind your back from the first count. The teacher counts “Ekam, inhale, turn to the right; dve, exhale, Pārśvottānāsana”.',
      vi: 'Năm vinyasa, bên phải ở dve và bên trái ở catvāri, năm nhịp thở mỗi bên, hai lòng bàn tay chắp sau lưng ngay từ nhịp đầu tiên. Giáo viên đếm “Ekam, hít vào, xoay sang phải; dve, thở ra, Pārśvottānāsana”.',
    },
  },

  breath: {
    en: 'Inhale to lift your chest. Exhale to fold over your front leg. Stay for five breaths.',
    vi: 'Hít vào để nâng ngực. Thở ra để gập người trên chân trước. Giữ năm nhịp thở.',
  },

  cues: [
    { id: 'pyramid-pose__cue-1', kind: 'transition', en: 'Bring your palms together behind your back, fingers pointing up.', vi: 'Chắp hai lòng bàn tay sau lưng, các ngón tay hướng lên.' },
    { id: 'pyramid-pose__cue-2', kind: 'transition', en: 'Turn to the right: front toes forward, back foot turned in.', vi: 'Xoay sang phải: mũi chân trước hướng về trước, bàn chân sau xoay vào trong.' },
    { id: 'pyramid-pose__cue-3', kind: 'alignment', en: 'Square your hips to the front of the mat.', vi: 'Xoay hai hông hướng thẳng về phía trước thảm.' },
    { id: 'pyramid-pose__cue-4', kind: 'alignment', en: 'Exhale, fold over your front leg with a long spine.', vi: 'Thở ra, gập người trên chân trước với cột sống dài.' },
    { id: 'pyramid-pose__cue-5', kind: 'alignment', en: 'Draw your elbows back and press your palms together.', vi: 'Kéo khuỷu tay ra sau và ép hai lòng bàn tay vào nhau.' },
    { id: 'pyramid-pose__cue-6', kind: 'soften', en: 'Soften your neck, and let your chin move toward your shin.', vi: 'Thả lỏng cổ, và để cằm dần hướng về ống chân.' },
    { id: 'pyramid-pose__cue-7', kind: 'breath', en: 'Stay for five breaths. Let each inhale lengthen you and each exhale fold you.', vi: 'Giữ năm nhịp thở. Hít vào thì kéo dài, thở ra thì gập sâu hơn.' },
    { id: 'pyramid-pose__cue-8', kind: 'safety', en: 'Keep a soft bend in your front knee. Don’t hang on the back of it.', vi: 'Giữ gối trước hơi chùng. Đừng dồn lực vào phía sau gối.' },
    { id: 'pyramid-pose__cue-9', kind: 'transition', en: 'Inhale, come up, and turn to the left.', vi: 'Hít vào, đứng lên, và xoay sang trái.' },
  ],

  modifications: [
    { id: 'pyramid-pose__mod-1', en: 'Hold opposite elbows behind your back instead of the prayer.', vi: 'Nắm khuỷu tay đối diện sau lưng thay vì chắp tay.', props: [] },
    { id: 'pyramid-pose__mod-2', en: 'Rest your hands on blocks either side of your front foot.', vi: 'Đặt hai tay lên gạch ở hai bên bàn chân trước.', props: ['blocks'] },
    { id: 'pyramid-pose__mod-3', en: 'Shorten your stance so your hips can square more easily.', vi: 'Thu ngắn khoảng cách hai chân để hông dễ hướng thẳng về trước hơn.', props: [] },
  ],

  safety: [
    { id: 'pyramid-pose__safe-1', en: 'With a wrist or shoulder problem, hold your elbows instead of the prayer behind your back.', vi: 'Nếu cổ tay hoặc vai có vấn đề, nắm khuỷu tay thay vì chắp tay sau lưng.' },
    { id: 'pyramid-pose__safe-2', en: 'With a hamstring injury, bend your front knee and fold only halfway.', vi: 'Nếu cơ gân kheo bị chấn thương, chùng gối trước và chỉ gập người nửa chừng.' },
    { id: 'pyramid-pose__safe-3', en: 'In pregnancy, widen your stance and fold only halfway, hands on blocks.', vi: 'Khi mang thai, đặt hai chân rộng hơn và chỉ gập người nửa chừng, tay đặt lên gạch.' },
  ],

  muscles: { working: ['quadriceps', 'rhomboids'], lengthening: ['hamstrings', 'calves', 'pectoralis-major'] },
  joints: ['hip-joint', 'pelvis', 'wrist', 'shoulder-joint'],
  transitionsTo: ['standing-hand-to-toe'],
  figure: 'pyramid-pose',
}
