export const downwardDog = {
  id: 'downward-dog',
  styles: ['vinyasa', 'ashtanga'],
  family: 'inversion',
  en: 'Downward-Facing Dog',
  sa: 'Adho Mukha Śvānāsana',
  say: 'AH-doh MOO-kah shvah-NAH-sah-nah',
  vi: 'Chó úp mặt',
  ashtanga: { series: 'primary', section: 'surya-a', position: 7, breaths: 5, drishti: 'navel', note: { en: 'The fifth vinyasa of Surya Namaskara A, held for five breaths. The resting point between every seated pose.', vi: 'Vinyasa thứ năm của Chào mặt trời A, giữ năm nhịp thở. Điểm nghỉ giữa mọi tư thế ngồi.' } },
  breath: {
    en: 'Exhale to lift your hips up and back. Stay for five breaths, breathing into the back of your body.',
    vi: 'Thở ra, nâng hông lên và ra sau. Giữ năm nhịp thở, hít thở hướng vào phía sau cơ thể.',
  },
  cues: [
    { id: 'downward-dog__cue-1', kind: 'transition', en: 'Tuck your toes and lift your hips up and back.', vi: 'Bấm các ngón chân xuống và nâng hông lên, ra sau.' },
    { id: 'downward-dog__cue-2', kind: 'alignment', en: 'Spread your fingers wide and press down through your knuckles.', vi: 'Xoè rộng các ngón tay và ấn xuống qua các khớp ngón tay.' },
    { id: 'downward-dog__cue-3', kind: 'alignment', en: 'Lengthen through your spine, and let your head hang heavy.', vi: 'Kéo dài cột sống, và để đầu buông nặng.' },
    { id: 'downward-dog__cue-4', kind: 'soften', en: 'Bend your knees as much as you need to keep your back long.', vi: 'Chùng gối bao nhiêu tuỳ cần để giữ lưng dài.' },
    { id: 'downward-dog__cue-5', kind: 'alignment', en: 'Reach your heels toward the floor. They don’t have to touch.', vi: 'Hướng gót chân xuống sàn. Không nhất thiết phải chạm.' },
    { id: 'downward-dog__cue-6', kind: 'alignment', en: 'Rotate your upper arms outward to make space for your neck.', vi: 'Xoay bắp tay ra ngoài để tạo khoảng trống cho cổ.' },
    { id: 'downward-dog__cue-7', kind: 'breath', en: 'Stay for five breaths. Breathe into the back of your body.', vi: 'Giữ năm nhịp thở. Hít thở hướng vào phía sau cơ thể.' },
  ],
  modifications: [
    { id: 'downward-dog__mod-1', en: 'Keep your knees bent and your heels lifted if the back of your legs feels tight.', vi: 'Giữ gối chùng và gót nhấc lên nếu mặt sau chân thấy căng.', props: [] },
    { id: 'downward-dog__mod-2', en: 'Place your hands on blocks to take weight off your wrists.', vi: 'Đặt hai tay lên gạch để giảm trọng lượng dồn lên cổ tay.', props: ['blocks'] },
    { id: 'downward-dog__mod-3', en: 'Come to your forearms, or rest in Puppy Pose with your knees down.', vi: 'Hạ xuống chống cẳng tay, hoặc nghỉ ở tư thế Chó con với hai gối chạm sàn.', props: [] },
  ],
  safety: [
    { id: 'downward-dog__safe-1', en: 'If your wrists hurt, press through your knuckles and fingertips, not the heel of your hand.', vi: 'Nếu cổ tay đau, ấn qua các khớp và đầu ngón tay, không dồn vào gốc bàn tay.' },
    { id: 'downward-dog__safe-2', en: 'Late in pregnancy, keep the hold short, or choose a gentler option.', vi: 'Ở giai đoạn cuối thai kỳ, giữ ngắn thôi, hoặc chọn một lựa chọn nhẹ nhàng hơn.' },
  ],
  muscles: {
    working: ['triceps-brachii', 'deltoids', 'serratus-anterior', 'quadriceps', 'transversus-abdominis'],
    lengthening: ['hamstrings', 'calves', 'latissimus-dorsi', 'erector-spinae', 'achilles-tendon'],
  },
  joints: ['wrist', 'shoulder-joint', 'hip-joint', 'ankle', 'sit-bones'],
  transitionsTo: ['plank', 'low-lunge', 'standing-forward-fold'],
  figure: 'downward-dog',
}
