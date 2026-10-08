export const headstand = {
  id: 'headstand',
  styles: ['vinyasa', 'ashtanga'],
  family: 'inversion',
  level: 'strong',
  en: 'Headstand',
  aka: ['Supported Headstand'],
  sa: 'Śīrṣāsana',
  say: 'sheer-SHAH-sah-nah',
  vi: 'Trồng chuối bằng đầu',
  saNote: {
    en: 'Ashtanga teaches it in two parts: Śīrṣāsana A, legs straight up, and Śīrṣāsana B, the half headstand with your legs at a right angle (also called Ūrdhva Daṇḍāsana).',
    vi: 'Ashtanga dạy tư thế này thành hai phần: Śīrṣāsana A, hai chân thẳng lên, và Śīrṣāsana B, nửa trồng chuối với hai chân vuông góc (còn gọi là Ūrdhva Daṇḍāsana).',
  },

  ashtanga: {
    series: 'primary',
    section: 'finishing',
    position: 47,
    breaths: 25,
    drishti: 'nose',
    note: {
      en: 'Śīrṣāsana A is held for twenty-five breaths, as the tradition has it; then your legs lower to a right angle for Śīrṣāsana B, ten breaths, and you rest in Child’s Pose before the last seated poses. The teacher says “Inhale, Śīrṣāsana” and counts, sometimes fewer breaths in a led class.',
      vi: 'Śīrṣāsana A được giữ hai mươi lăm nhịp thở, theo truyền thống; sau đó hai chân hạ xuống vuông góc cho Śīrṣāsana B, mười nhịp thở, và bạn nghỉ ở tư thế Em bé trước các tư thế ngồi cuối cùng. Giáo viên nói “Hít vào, Śīrṣāsana” và đếm, đôi khi ít nhịp hơn trong lớp có hướng dẫn.',
    },
  },

  breath: {
    en: 'Breathe slowly and evenly. If your breath gets short or strained, come down.',
    vi: 'Thở chậm và đều. Nếu hơi thở trở nên ngắn hoặc gắng sức, hãy hạ xuống.',
  },

  cues: [
    { id: 'headstand__cue-1', kind: 'transition', en: 'Kneel, interlace your fingers, and place your forearms on the floor, elbows shoulder-width apart.', vi: 'Quỳ xuống, đan các ngón tay, và đặt cẳng tay xuống sàn, hai khuỷu tay rộng bằng vai.' },
    { id: 'headstand__cue-2', kind: 'alignment', en: 'Place the crown of your head on the floor, with the back of your head in your hands.', vi: 'Đặt đỉnh đầu xuống sàn, phía sau đầu tựa vào lòng hai bàn tay.' },
    { id: 'headstand__cue-3', kind: 'alignment', en: 'Press your forearms down, and lift your shoulders away from the floor.', vi: 'Ấn cẳng tay xuống, và nâng vai lên khỏi sàn.' },
    { id: 'headstand__cue-4', kind: 'transition', en: 'Walk your feet in, and on an inhale, lift both legs slowly.', vi: 'Bước chân lại gần, và khi hít vào, từ từ nâng cả hai chân lên.' },
    { id: 'headstand__cue-5', kind: 'alignment', en: 'Stack your hips over your shoulders, and hug your legs together.', vi: 'Đặt hông thẳng trên vai, và ép hai chân vào nhau.' },
    { id: 'headstand__cue-6', kind: 'soften', en: 'Keep your face and jaw soft.', vi: 'Giữ khuôn mặt và hàm mềm.' },
    { id: 'headstand__cue-7', kind: 'breath', en: 'Stay for up to twenty-five breaths, gazing toward your nose.', vi: 'Giữ đến hai mươi lăm nhịp thở, mắt nhìn về chóp mũi.' },
    { id: 'headstand__cue-8', kind: 'safety', en: 'Most of your weight is in your forearms. If your neck feels it, come down.', vi: 'Phần lớn trọng lượng nằm ở cẳng tay. Nếu cổ thấy nặng, hãy hạ xuống.' },
    { id: 'headstand__cue-9', kind: 'transition', en: 'Exhale, lower your legs slowly, and rest in Child’s Pose.', vi: 'Thở ra, hạ hai chân xuống từ từ, và nghỉ ở tư thế Em bé.' },
  ],

  modifications: [
    { id: 'headstand__mod-1', en: 'Practise with your back to a wall, a hand’s width away from it.', vi: 'Tập với lưng quay vào tường, cách tường khoảng một bàn tay.', props: ['wall'] },
    { id: 'headstand__mod-2', en: 'Keep your feet on the floor and your hips high, in Dolphin, to build strength.', vi: 'Giữ bàn chân trên sàn và hông nâng cao, ở tư thế Cá heo, để xây dựng sức mạnh.', props: [] },
    { id: 'headstand__mod-3', en: 'Draw your knees into your chest and stay there, before you straighten your legs.', vi: 'Co hai gối vào ngực và giữ ở đó, trước khi duỗi thẳng chân.', props: [] },
  ],

  safety: [
    { id: 'headstand__safe-1', en: 'With a neck injury, high blood pressure or glaucoma, skip Headstand and rest in Child’s Pose.', vi: 'Nếu cổ có chấn thương, bạn bị huyết áp cao hoặc tăng nhãn áp, bỏ qua Trồng chuối và nghỉ ở tư thế Em bé.' },
    { id: 'headstand__safe-2', en: 'Never jump or kick up. Lift slowly, with control.', vi: 'Không bao giờ bật nhảy hay đá chân lên. Nâng lên từ từ, có kiểm soát.' },
    { id: 'headstand__safe-3', en: 'In pregnancy, practise it only if it’s already steady in your practice, and near a wall.', vi: 'Khi mang thai, chỉ tập nếu tư thế này đã vững trong buổi tập của bạn, và tập gần tường.' },
  ],

  muscles: { working: ['deltoids', 'serratus-anterior', 'trapezius', 'transversus-abdominis'], lengthening: [] },
  joints: ['crown', 'cervical-spine', 'shoulder-joint', 'elbow', 'forearm-bones'],
  transitionsTo: ['bound-lotus'],
  counterPoses: ['child-pose'],
  figure: 'headstand',
}
