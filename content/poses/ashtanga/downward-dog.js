export const downwardDog = {
  id: 'downward-dog',
  styles: ['vinyasa', 'ashtanga'],
  family: 'inversion',
  level: 'moderate',
  en: 'Downward-Facing Dog',
  aka: ['Down Dog'],
  sa: 'Adho Mukha Śvānāsana',
  say: 'AH-doh MOO-kah shvah-NAH-sah-nah',
  vi: 'Chó úp mặt',

  ashtanga: {
    series: 'primary',
    section: 'surya-a',
    position: 7,
    breaths: 5,
    drishti: 'navel',
    note: {
      en: 'Ṣaṭ, the sixth vinyasa of Surya Namaskara A, is the state of the salutation: the one place you stay, for five breaths (caturdaśa, the fourteenth, in Surya Namaskara B). The teacher counts “Ṣaṭ, exhale”, then the five breaths.',
      vi: 'Ṣaṭ, vinyasa thứ sáu của Chào mặt trời A, là trạng thái của cả chuỗi: nơi duy nhất bạn ở lại, trong năm nhịp thở (trong Chào mặt trời B là caturdaśa, vinyasa thứ mười bốn). Giáo viên đếm “Ṣaṭ, thở ra”, rồi đếm năm nhịp thở.',
    },
  },

  breath: {
    en: 'Exhale to lift your hips up and back. Stay for five breaths, breathing into the back of your body.',
    vi: 'Thở ra, nâng hông lên và ra sau. Giữ năm nhịp thở, hít thở hướng vào phía sau cơ thể.',
  },

  cues: [
    { id: 'downward-dog__cue-1', kind: 'transition', en: 'Exhale, roll over your toes and lift your hips up and back.', vi: 'Thở ra, lăn qua các ngón chân và nâng hông lên, ra sau.' },
    { id: 'downward-dog__cue-2', kind: 'alignment', en: 'Spread your fingers wide and press down through your knuckles.', vi: 'Xoè rộng các ngón tay và ấn các khớp ngón tay xuống sàn.' },
    { id: 'downward-dog__cue-3', kind: 'alignment', en: 'Let your head hang between your arms, and gaze toward your navel.', vi: 'Để đầu buông giữa hai cánh tay, và nhìn về phía rốn.' },
    { id: 'downward-dog__cue-4', kind: 'alignment', en: 'Rotate your upper arms outward to make space for your neck.', vi: 'Xoay cánh tay trên ra ngoài để tạo khoảng trống cho cổ.' },
    { id: 'downward-dog__cue-5', kind: 'alignment', en: 'Reach your heels toward the floor. They don’t have to touch.', vi: 'Hướng gót chân xuống sàn. Không nhất thiết phải chạm.' },
    { id: 'downward-dog__cue-6', kind: 'soften', en: 'Bend your knees as much as you need to keep your back long.', vi: 'Chùng gối bao nhiêu tuỳ cần để giữ lưng dài.' },
    { id: 'downward-dog__cue-7', kind: 'breath', en: 'Stay for five breaths. Breathe into the back of your body.', vi: 'Giữ năm nhịp thở. Hít thở hướng vào phía sau cơ thể.' },
    { id: 'downward-dog__cue-8', kind: 'safety', en: 'If your shoulders pinch, move your hands a little wider apart.', vi: 'Nếu vai bị kẹt nhói, đặt hai tay rộng ra một chút.' },
    { id: 'downward-dog__cue-9', kind: 'transition', en: 'At the end of your exhale, bend your knees and look between your hands.', vi: 'Cuối hơi thở ra, chùng gối và nhìn về khoảng giữa hai tay.' },
  ],

  modifications: [
    { id: 'downward-dog__mod-1', en: 'Keep your knees bent and your heels lifted if the backs of your legs feel tight.', vi: 'Giữ gối chùng và gót nhấc lên nếu mặt sau chân thấy căng.', props: [] },
    { id: 'downward-dog__mod-2', en: 'Place your hands on blocks to take weight off your wrists.', vi: 'Đặt hai tay lên gạch để giảm trọng lượng dồn lên cổ tay.', props: ['blocks'] },
    { id: 'downward-dog__mod-3', en: 'Come to your forearms, or rest in Puppy Pose with your knees down.', vi: 'Hạ xuống chống cẳng tay, hoặc nghỉ ở tư thế Chó con với hai gối chạm sàn.', props: [] },
  ],

  safety: [
    { id: 'downward-dog__safe-1', en: 'If your wrists hurt, press through your knuckles and fingertips, not the heel of your hand.', vi: 'Nếu cổ tay đau, dồn lực vào các khớp ngón tay và đầu ngón tay, không dồn vào gốc bàn tay.' },
    { id: 'downward-dog__safe-2', en: 'Late in pregnancy, keep the hold short, or choose a gentler option.', vi: 'Ở giai đoạn cuối thai kỳ, giữ ngắn thôi, hoặc chọn một lựa chọn nhẹ nhàng hơn.' },
  ],

  muscles: {
    working: ['triceps-brachii', 'deltoids', 'serratus-anterior', 'quadriceps'],
    lengthening: ['hamstrings', 'calves', 'latissimus-dorsi', 'achilles-tendon'],
  },
  joints: ['wrist', 'shoulder-joint', 'hip-joint', 'ankle', 'sit-bones'],
  transitionsTo: ['half-lift', 'warrior-1'],
  figure: 'downward-dog',
}
