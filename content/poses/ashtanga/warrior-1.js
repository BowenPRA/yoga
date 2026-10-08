export const warrior1 = {
  id: 'warrior-1',
  styles: ['vinyasa', 'ashtanga'],
  family: 'standing',
  level: 'moderate',
  en: 'Warrior I',
  aka: ['Warrior 1', 'Warrior A'],
  sa: 'Vīrabhadrāsana I',
  say: 'vee-rah-bah-DRAH-sah-nah WUN',
  vi: 'Chiến binh I',
  saNote: {
    en: 'Ashtanga calls this Vīrabhadrāsana A (vee-rah-bah-DRAH-sah-nah AY). In a Vinyasa class it is Vīrabhadrāsana I, Warrior One.',
    vi: 'Ashtanga gọi tư thế này là Vīrabhadrāsana A. Trong lớp Vinyasa, đây là Vīrabhadrāsana I, Chiến binh I.',
  },

  ashtanga: {
    series: 'primary',
    section: 'surya-b',
    position: 9,
    vinyasas: 16,
    breaths: 5,
    drishti: 'thumbs',
    note: {
      en: 'Sapta and ekādaśa, the seventh and eleventh vinyasas of Surya Namaskara B: one inhale, right foot forward, then the left. It returns at the end of the standing sequence for five breaths each side, on sapta and aṣṭau of Vīrabhadrāsana’s sixteen vinyasas; the teacher counts “Sapta, inhale, right foot forward”.',
      vi: 'Sapta và ekādaśa, vinyasa thứ bảy và thứ mười một của Chào mặt trời B: một hơi hít vào, chân phải lên trước, rồi đến chân trái. Tư thế trở lại ở cuối chuỗi đứng, năm nhịp thở mỗi bên, ở sapta và aṣṭau trong mười sáu vinyasa của Vīrabhadrāsana; giáo viên đếm “Sapta, hít vào, chân phải lên trước”.',
    },
  },

  breath: {
    en: 'Inhale as you step forward and sweep your arms up. In the standing sequence, stay for five breaths each side.',
    vi: 'Hít vào khi bước lên và vươn hai tay lên. Trong chuỗi đứng, giữ năm nhịp thở mỗi bên.',
  },

  cues: [
    { id: 'warrior-1__cue-1', kind: 'transition', en: 'Turn your back heel down and step your right foot forward between your hands.', vi: 'Hạ gót chân sau xuống và bước chân phải lên trước, vào giữa hai tay.' },
    { id: 'warrior-1__cue-2', kind: 'alignment', en: 'Bend your front knee over your ankle.', vi: 'Gập gối trước, thẳng trên cổ chân.' },
    { id: 'warrior-1__cue-3', kind: 'alignment', en: 'Press the outer edge of your back foot into the mat.', vi: 'Ấn cạnh ngoài bàn chân sau xuống thảm.' },
    { id: 'warrior-1__cue-4', kind: 'alignment', en: 'Turn your hips to face the front of your mat.', vi: 'Xoay hông hướng về phía trước thảm.' },
    { id: 'warrior-1__cue-5', kind: 'alignment', en: 'Reach your arms up, palms together, and look up at your thumbs.', vi: 'Vươn hai tay lên, chắp lòng bàn tay, và nhìn lên ngón tay cái.' },
    { id: 'warrior-1__cue-6', kind: 'soften', en: 'Let your shoulders drop as your arms reach up.', vi: 'Để vai hạ xuống trong khi hai tay vươn lên.' },
    { id: 'warrior-1__cue-7', kind: 'breath', en: 'Stay for five breaths. Sink a little deeper on each exhale.', vi: 'Giữ năm nhịp thở. Hạ sâu thêm một chút ở mỗi hơi thở ra.' },
    { id: 'warrior-1__cue-8', kind: 'safety', en: 'Keep your front knee over your ankle, not past your toes.', vi: 'Giữ gối trước thẳng trên cổ chân, không vượt quá ngón chân.' },
    { id: 'warrior-1__cue-9', kind: 'transition', en: 'Inhale, straighten your front leg and turn to the other side.', vi: 'Hít vào, duỗi thẳng chân trước và xoay sang bên kia.' },
  ],

  modifications: [
    { id: 'warrior-1__mod-1', en: 'Lift your back heel into a high lunge if your back ankle is tight.', vi: 'Nhấc gót chân sau lên thành tư thế chùng chân cao nếu cổ chân sau bị căng.', props: [] },
    { id: 'warrior-1__mod-2', en: 'Step your feet wider apart, like train tracks, for more balance.', vi: 'Đặt hai bàn chân rộng sang hai bên, như hai đường ray, để vững hơn.', props: [] },
    { id: 'warrior-1__mod-3', en: 'Keep your hands on your hips if your shoulders are tired.', vi: 'Đặt tay lên hông nếu vai đã mỏi.', props: [] },
  ],

  safety: [
    { id: 'warrior-1__safe-1', en: 'With a knee injury, bend your front knee less.', vi: 'Nếu gối có chấn thương, gập gối trước ít lại.' },
    { id: 'warrior-1__safe-2', en: 'If your lower back pinches, draw your belly in and lift your chest less.', vi: 'Nếu lưng dưới bị nhói, hóp nhẹ bụng và bớt nâng ngực.' },
    { id: 'warrior-1__safe-3', en: 'With a neck injury, look straight ahead.', vi: 'Nếu cổ có chấn thương, nhìn thẳng về trước.' },
  ],

  muscles: {
    working: ['quadriceps', 'gluteus-maximus', 'deltoids'],
    lengthening: ['iliopsoas', 'calves', 'latissimus-dorsi'],
  },
  joints: ['knee', 'ankle', 'hip-joint', 'pelvis', 'shoulder-joint'],
  transitionsTo: ['chaturanga', 'warrior-2'],
  figure: 'warrior-1',
}
