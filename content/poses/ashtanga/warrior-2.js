export const warrior2 = {
  id: 'warrior-2',
  styles: ['vinyasa', 'ashtanga'],
  family: 'standing',
  level: 'moderate',
  en: 'Warrior II',
  aka: ['Warrior 2', 'Warrior B'],
  sa: 'Vīrabhadrāsana II',
  say: 'vee-rah-bah-DRAH-sah-nah TWO',
  vi: 'Chiến binh II',
  saNote: {
    en: 'Ashtanga calls this Vīrabhadrāsana B (vee-rah-bah-DRAH-sah-nah BEE). In a Vinyasa class it is Vīrabhadrāsana II, Warrior Two.',
    vi: 'Ashtanga gọi tư thế này là Vīrabhadrāsana B. Trong lớp Vinyasa, đây là Vīrabhadrāsana II, Chiến binh II.',
  },

  ashtanga: {
    series: 'primary',
    section: 'standing',
    position: 20,
    breaths: 5,
    drishti: 'hand',
    note: {
      en: 'The close of the standing sequence, after Utkaṭāsana and Warrior I: from Warrior I on the left you open into Warrior II on the left, then turn to the right, five breaths each. Warrior I and II share one count of sixteen vinyasas; the teacher counts “Nava, Vīrabhadrāsana B, left side” and “Daśa, right side”.',
      vi: 'Kết thúc chuỗi đứng, sau Utkaṭāsana và Chiến binh I: từ Chiến binh I bên trái, bạn mở ra Chiến binh II bên trái, rồi xoay sang phải, năm nhịp thở mỗi bên. Chiến binh I và II dùng chung một cách đếm gồm mười sáu vinyasa; giáo viên đếm “Nava, Vīrabhadrāsana B, bên trái” và “Daśa, bên phải”.',
    },
  },

  breath: {
    en: 'Exhale into the pose. Stay for five slow breaths. Inhale to straighten the front leg and change sides.',
    vi: 'Thở ra khi vào tư thế. Giữ năm nhịp thở chậm. Hít vào để duỗi thẳng chân trước và đổi bên.',
  },

  cues: [
    { id: 'warrior-2__cue-1', kind: 'transition', en: 'Step your feet wide apart.', vi: 'Bước hai chân rộng ra.' },
    { id: 'warrior-2__cue-2', kind: 'alignment', en: 'Turn your right toes out, and your left toes in slightly.', vi: 'Xoay mũi chân phải ra ngoài, mũi chân trái hơi xoay vào trong.' },
    { id: 'warrior-2__cue-3', kind: 'alignment', en: 'Bend your front knee so it stacks over your ankle.', vi: 'Gập gối trước sao cho gối thẳng trên cổ chân.' },
    { id: 'warrior-2__cue-4', kind: 'alignment', en: 'Press into the outer edge of your back foot.', vi: 'Ấn vào cạnh ngoài của bàn chân sau.' },
    { id: 'warrior-2__cue-5', kind: 'alignment', en: 'Reach your arms out wide, and gaze over your front fingertips.', vi: 'Dang rộng hai tay, và nhìn qua đầu ngón tay phía trước.' },
    { id: 'warrior-2__cue-6', kind: 'soften', en: 'Relax your shoulders away from your ears.', vi: 'Thả lỏng vai, hạ vai xa khỏi tai.' },
    { id: 'warrior-2__cue-7', kind: 'breath', en: 'Stay here for five breaths.', vi: 'Giữ ở đây trong năm nhịp thở.' },
    { id: 'warrior-2__cue-8', kind: 'safety', en: 'Keep your front knee tracking over your second toe. Don’t let it fall inward.', vi: 'Giữ gối trước thẳng hướng với ngón chân thứ hai. Đừng để gối đổ vào trong.' },
    { id: 'warrior-2__cue-9', kind: 'transition', en: 'Inhale, straighten your front leg, and turn to face the other side.', vi: 'Hít vào, duỗi thẳng chân trước, và xoay người sang bên kia.' },
  ],

  modifications: [
    { id: 'warrior-2__mod-1', en: 'Shorten your stance if your front knee feels strained.', vi: 'Thu hẹp khoảng cách hai chân nếu gối trước thấy căng.', props: [] },
    { id: 'warrior-2__mod-2', en: 'Rest your hands on your hips to give your shoulders a break.', vi: 'Đặt hai tay lên hông để vai được nghỉ.', props: [] },
    { id: 'warrior-2__mod-3', en: 'You can sit on the edge of a chair with your front leg bent.', vi: 'Bạn có thể ngồi ở mép ghế với chân trước gập.', props: ['chair'] },
  ],

  safety: [
    { id: 'warrior-2__safe-1', en: 'If you have a knee injury, don’t bend as deeply, and come out sooner.', vi: 'Nếu bạn có chấn thương gối, đừng gập quá sâu và thoát thế sớm hơn.' },
    { id: 'warrior-2__safe-2', en: 'In pregnancy, take a shorter stance and come out before your legs tire.', vi: 'Khi mang thai, đứng hai chân gần nhau hơn và thoát thế trước khi chân mỏi.' },
  ],

  muscles: {
    working: ['quadriceps', 'gluteus-medius', 'deep-rotators', 'deltoids'],
    lengthening: ['hip-adductors', 'iliopsoas'],
  },
  joints: ['knee', 'ankle', 'hip-joint', 'shoulder-joint'],
  transitionsTo: ['staff-pose'],
  figure: 'warrior-2',
}
