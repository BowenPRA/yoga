export const extendedSideAngle = {
  id: 'extended-side-angle',
  styles: ['vinyasa', 'ashtanga'],
  family: 'standing',
  level: 'moderate',
  en: 'Extended Side Angle',
  aka: ['Side Angle'],
  sa: 'Utthita Pārśvakoṇāsana',
  say: 'oo-TEE-tah parsh-vah-koh-NAH-sah-nah',
  vi: 'Góc nghiêng mở rộng',

  ashtanga: {
    series: 'primary',
    section: 'standing',
    position: 14,
    vinyasas: 5,
    breaths: 5,
    drishti: 'hand',
    note: {
      en: 'Five vinyasas, the right side on dve and the left on catvāri, five breaths each, with your feet wider than in Triangle. The teacher counts “Ekam, inhale, step out to the right; dve, exhale, Utthita Pārśvakoṇāsana”.',
      vi: 'Năm vinyasa, bên phải ở dve và bên trái ở catvāri, năm nhịp thở mỗi bên, hai chân đặt rộng hơn so với Tam giác. Giáo viên đếm “Ekam, hít vào, bước sang phải; dve, thở ra, Utthita Pārśvakoṇāsana”.',
    },
  },

  breath: {
    en: 'Exhale as you bend your knee and reach into the pose. Stay for five breaths, then inhale to come up.',
    vi: 'Thở ra khi bạn gập gối và vươn vào tư thế. Giữ năm nhịp thở, rồi hít vào để đứng lên.',
  },

  cues: [
    { id: 'extended-side-angle__cue-1', kind: 'transition', en: 'Step your feet wide and turn your right toes out.', vi: 'Bước hai chân thật rộng và xoay mũi chân phải ra ngoài.' },
    { id: 'extended-side-angle__cue-2', kind: 'alignment', en: 'Bend your right knee until it’s directly over your ankle.', vi: 'Gập gối phải cho đến khi gối nằm ngay trên cổ chân.' },
    { id: 'extended-side-angle__cue-3', kind: 'alignment', en: 'Place your right hand on the floor, outside your right foot.', vi: 'Đặt bàn tay phải xuống sàn, phía ngoài bàn chân phải.' },
    { id: 'extended-side-angle__cue-4', kind: 'alignment', en: 'Reach your left arm over your ear, one long line from your back heel to your fingertips.', vi: 'Vươn tay trái qua tai, thành một đường dài từ gót chân sau đến đầu ngón tay.' },
    { id: 'extended-side-angle__cue-5', kind: 'alignment', en: 'Press your knee back into your arm, and open your chest.', vi: 'Ấn gối về sau vào cánh tay, và mở ngực.' },
    { id: 'extended-side-angle__cue-6', kind: 'soften', en: 'Let your neck relax as you gaze up past your top hand.', vi: 'Thả lỏng cổ khi bạn nhìn lên qua bàn tay phía trên.' },
    { id: 'extended-side-angle__cue-7', kind: 'breath', en: 'Stay for five breaths. Breathe into the long side of your body.', vi: 'Giữ năm nhịp thở. Thở vào bên thân đang được kéo dài.' },
    { id: 'extended-side-angle__cue-8', kind: 'safety', en: 'Keep your front knee over your ankle. Don’t let it fall inward.', vi: 'Giữ gối trước thẳng trên cổ chân. Đừng để gối đổ vào trong.' },
    { id: 'extended-side-angle__cue-9', kind: 'transition', en: 'Inhale, come up, and turn to the left.', vi: 'Hít vào, đứng lên, và xoay sang trái.' },
  ],

  modifications: [
    { id: 'extended-side-angle__mod-1', en: 'Rest your forearm on your thigh instead of your hand on the floor.', vi: 'Tựa cẳng tay lên đùi thay vì đặt bàn tay xuống sàn.', props: [] },
    { id: 'extended-side-angle__mod-2', en: 'Put a block under your bottom hand.', vi: 'Kê một viên gạch dưới bàn tay phía dưới.', props: ['block'] },
    { id: 'extended-side-angle__mod-3', en: 'Keep your top hand on your hip if your shoulder is tired.', vi: 'Đặt bàn tay phía trên lên hông nếu vai đã mỏi.', props: [] },
  ],

  safety: [
    { id: 'extended-side-angle__safe-1', en: 'With a knee injury, bend your front knee less and rest your forearm on your thigh.', vi: 'Nếu gối có chấn thương, gập gối trước ít lại và tựa cẳng tay lên đùi.' },
    { id: 'extended-side-angle__safe-2', en: 'With a neck injury, look down at the floor.', vi: 'Nếu cổ có chấn thương, nhìn xuống sàn.' },
  ],

  muscles: {
    working: ['quadriceps', 'deep-rotators'],
    lengthening: ['hip-adductors', 'latissimus-dorsi', 'external-oblique'],
  },
  joints: ['knee', 'ankle', 'hip-joint', 'shoulder-joint'],
  transitionsTo: ['revolved-side-angle'],
  figure: 'extended-side-angle',
}
