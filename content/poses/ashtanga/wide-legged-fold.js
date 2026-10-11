export const wideLeggedFold = {
  id: 'wide-legged-fold',
  styles: ['vinyasa', 'ashtanga'],
  family: 'forward-fold',
  level: 'moderate',
  en: 'Wide-Legged Forward Fold',
  aka: ['Prasarita', 'Wide-Legged Forward Bend'],
  sa: 'Prasārita Pādottānāsana',
  say: 'prah-SAH-ree-tah pah-doh-tah-NAH-sah-nah',
  vi: 'Gập người dang rộng chân',
  saNote: {
    en: 'Prasārita Pādottānāsana A, B, C and D: one pose with four arm positions, practised one after another.',
    vi: 'Prasārita Pādottānāsana A, B, C và D: một tư thế với bốn cách đặt tay, tập lần lượt nối tiếp nhau.',
  },

  ashtanga: {
    series: 'primary',
    section: 'standing',
    position: 16,
    vinyasas: 5,
    breaths: 5,
    drishti: 'nose',
    note: {
      en: 'Four versions in a row, each of five vinyasas with the state on trīṇi, five breaths: A, hands on the floor; B, hands on your waist; C, fingers interlaced behind you; D, holding your big toes. The teacher counts each version from ekam, and at the state says “Trīṇi, exhale, head down”.',
      vi: 'Bốn biến thể liên tiếp, mỗi biến thể năm vinyasa với trạng thái ở trīṇi, năm nhịp thở: A, tay đặt xuống sàn; B, tay chống eo; C, đan tay sau lưng; D, nắm ngón chân cái. Giáo viên đếm mỗi biến thể từ ekam, và đến trạng thái thì nói “Trīṇi, thở ra, cúi đầu xuống”.',
    },
  },

  breath: {
    en: 'Inhale to lengthen your spine and look forward. Exhale to fold. Stay for five breaths in each version.',
    vi: 'Hít vào để kéo dài cột sống và nhìn về trước. Thở ra để gập người. Giữ năm nhịp thở ở mỗi biến thể.',
  },

  cues: [
    { id: 'wide-legged-fold__cue-1', kind: 'transition', en: 'Step your feet wide apart, toes turned slightly in.', vi: 'Bước hai chân thật rộng, mũi chân hơi xoay vào trong.' },
    { id: 'wide-legged-fold__cue-2', kind: 'transition', en: 'Exhale, place your hands on the floor between your feet, shoulder-width apart.', vi: 'Thở ra, đặt hai tay xuống sàn giữa hai bàn chân, rộng bằng vai.' },
    { id: 'wide-legged-fold__cue-3', kind: 'alignment', en: 'Inhale, look forward and lengthen your spine.', vi: 'Hít vào, nhìn về trước và kéo dài cột sống.' },
    { id: 'wide-legged-fold__cue-4', kind: 'alignment', en: 'Exhale, bend your elbows straight back and lower the crown of your head toward the floor.', vi: 'Thở ra, gập khuỷu tay thẳng về sau và hạ đỉnh đầu về phía sàn.' },
    { id: 'wide-legged-fold__cue-5', kind: 'alignment', en: 'Draw your inner thighs back as you fold.', vi: 'Kéo mặt trong đùi ra sau khi bạn gập người.' },
    { id: 'wide-legged-fold__cue-6', kind: 'soften', en: 'Let your neck soften and your head hang heavy.', vi: 'Để cổ mềm ra và đầu buông nặng.' },
    { id: 'wide-legged-fold__cue-7', kind: 'breath', en: 'Stay for five breaths, and let each exhale take you a little deeper.', vi: 'Giữ năm nhịp thở, và để mỗi hơi thở ra đưa bạn sâu thêm một chút.' },
    { id: 'wide-legged-fold__cue-8', kind: 'safety', en: 'Keep your weight in your feet, not on your head.', vi: 'Giữ trọng lượng ở hai bàn chân, đừng dồn lên đầu.' },
    { id: 'wide-legged-fold__cue-9', kind: 'transition', en: 'Inhale, look up. Exhale, hands to your waist. Inhale, come all the way up.', vi: 'Hít vào, nhìn lên. Thở ra, tay chống eo. Hít vào, đứng hẳn lên.' },
  ],

  modifications: [
    { id: 'wide-legged-fold__mod-1', en: 'Rest your hands or forearms on blocks.', vi: 'Đặt tay hoặc cẳng tay lên gạch.', props: ['blocks'] },
    { id: 'wide-legged-fold__mod-2', en: 'Bend your knees a little to ease the pull in the back of your legs.', vi: 'Chùng gối một chút để giảm cảm giác kéo ở mặt sau chân.', props: [] },
    { id: 'wide-legged-fold__mod-3', en: 'In version C, hold a strap between your hands if they don’t meet behind you.', vi: 'Ở biến thể C, cầm một sợi dây giữa hai tay nếu hai tay chưa chạm nhau sau lưng.', props: ['strap'] },
  ],

  safety: [
    { id: 'wide-legged-fold__safe-1', en: 'With high blood pressure or glaucoma, keep your head above your heart: hands on blocks, back flat.', vi: 'Nếu bạn bị huyết áp cao hoặc tăng nhãn áp, giữ đầu cao hơn tim: tay đặt lên gạch, lưng phẳng.' },
    { id: 'wide-legged-fold__safe-2', en: 'With a lower back injury, come up with a flat back and your hands on your waist.', vi: 'Nếu lưng dưới có chấn thương, đứng lên với lưng phẳng và tay chống eo.' },
    { id: 'wide-legged-fold__safe-3', en: 'In version C, if your shoulders pinch, keep your hands lower.', vi: 'Ở biến thể C, nếu vai bị kẹt nhói, giữ hai tay thấp hơn.' },
  ],

  muscles: { working: ['quadriceps'], lengthening: ['hamstrings', 'hip-adductors', 'pectoralis-major'] },
  joints: ['hip-joint', 'sit-bones', 'shoulder-joint', 'crown'],
  transitionsTo: ['pyramid-pose'],
  figure: 'wide-legged-fold',
}
