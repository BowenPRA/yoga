export const chairPose = {
  id: 'chair-pose',
  styles: ['vinyasa', 'ashtanga'],
  family: 'standing',
  level: 'moderate',
  en: 'Chair Pose',
  aka: ['Fierce Pose', 'Awkward Pose'],
  sa: 'Utkaṭāsana',
  say: 'oot-kah-TAH-sah-nah',
  vi: 'Cái ghế',

  ashtanga: {
    series: 'primary',
    section: 'surya-b',
    position: 8,
    vinyasas: 13,
    breaths: 5,
    drishti: 'thumbs',
    note: {
      en: 'Ekam, the first vinyasa of Surya Namaskara B, and again saptadaśa, the seventeenth: one inhale, then on. It returns near the end of the standing sequence as a pose of its own, thirteen vinyasas, held on sapta for five breaths; the teacher counts “Ekam, inhale, Utkaṭāsana”.',
      vi: 'Ekam, vinyasa thứ nhất của Chào mặt trời B, và trở lại ở saptadaśa, vinyasa thứ mười bảy: một hơi hít vào, rồi đi tiếp. Tư thế trở lại gần cuối chuỗi đứng như một tư thế riêng, mười ba vinyasa, giữ ở sapta trong năm nhịp thở; giáo viên đếm “Ekam, hít vào, Utkaṭāsana”.',
    },
  },

  breath: {
    en: 'Inhale as you bend your knees and reach your arms up. In the standing sequence, stay for five breaths, then exhale your hands down.',
    vi: 'Hít vào khi chùng gối và vươn hai tay lên. Trong chuỗi đứng, giữ năm nhịp thở, rồi thở ra hạ tay xuống.',
  },

  cues: [
    { id: 'chair-pose__cue-1', kind: 'transition', en: 'Inhale, bend your knees and reach your arms up.', vi: 'Hít vào, chùng gối và vươn hai tay lên.' },
    { id: 'chair-pose__cue-2', kind: 'alignment', en: 'Keep your feet and knees together.', vi: 'Giữ hai bàn chân và hai gối khép sát.' },
    { id: 'chair-pose__cue-3', kind: 'alignment', en: 'Sit back as if into a chair, with your weight in your heels.', vi: 'Ngồi lùi ra sau như đang ngồi xuống ghế, dồn trọng lượng về gót chân.' },
    { id: 'chair-pose__cue-4', kind: 'alignment', en: 'Bring your palms together and look up at your thumbs.', vi: 'Chắp hai lòng bàn tay và nhìn lên ngón tay cái.' },
    { id: 'chair-pose__cue-5', kind: 'alignment', en: 'Draw your lower ribs in, and lengthen your tailbone down.', vi: 'Kéo xương sườn dưới vào, và kéo dài xương cụt xuống.' },
    { id: 'chair-pose__cue-6', kind: 'soften', en: 'Relax your shoulders away from your ears.', vi: 'Thả vai xuống, xa khỏi tai.' },
    { id: 'chair-pose__cue-7', kind: 'breath', en: 'Stay for five breaths. Keep the breath long, even when your thighs burn.', vi: 'Giữ năm nhịp thở. Giữ hơi thở dài, ngay cả khi đùi bắt đầu nóng.' },
    { id: 'chair-pose__cue-8', kind: 'safety', en: 'If your knees complain, don’t sit as low.', vi: 'Nếu gối khó chịu, đừng ngồi xuống thấp như vậy.' },
    { id: 'chair-pose__cue-9', kind: 'transition', en: 'Exhale, fold forward and place your hands beside your feet.', vi: 'Thở ra, gập người về trước và đặt tay cạnh bàn chân.' },
  ],

  modifications: [
    { id: 'chair-pose__mod-1', en: 'Keep your hands on your hips, or together at your chest.', vi: 'Đặt tay lên hông, hoặc chắp tay trước ngực.', props: [] },
    { id: 'chair-pose__mod-2', en: 'Squeeze a block between your thighs to keep your knees together.', vi: 'Kẹp một viên gạch giữa hai đùi để giữ hai gối khép lại.', props: ['block'] },
    { id: 'chair-pose__mod-3', en: 'Rest your back against a wall and slide down only a little.', vi: 'Tựa lưng vào tường và chỉ trượt xuống một chút.', props: ['wall'] },
  ],

  safety: [
    { id: 'chair-pose__safe-1', en: 'With a knee injury, bend only a little and keep your weight in your heels.', vi: 'Nếu gối có chấn thương, chỉ chùng gối một chút và giữ trọng lượng ở gót chân.' },
    { id: 'chair-pose__safe-2', en: 'With a shoulder injury, keep your arms shoulder-width apart, or lower them.', vi: 'Nếu vai có chấn thương, giữ hai tay rộng bằng vai, hoặc hạ tay xuống.' },
    { id: 'chair-pose__safe-3', en: 'In pregnancy, stand with your feet hip-width apart.', vi: 'Khi mang thai, đứng hai chân rộng bằng hông.' },
  ],

  muscles: {
    working: ['quadriceps', 'gluteus-maximus', 'erector-spinae', 'deltoids'],
    lengthening: ['latissimus-dorsi'],
  },
  joints: ['knee', 'ankle', 'hip-joint', 'shoulder-joint'],
  transitionsTo: ['standing-forward-fold', 'warrior-1'],
  figure: 'chair-pose',
}
