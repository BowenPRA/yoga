/**
 * Movements: the anatomical actions and the plain verbs teachers use for
 * them. Each has the technical term, the plain cue verb, the Vietnamese, and
 * cues in context. `pair` links opposites.
 */
export const MOVEMENTS = [
  {
    id: 'flexion', en: 'flexion', plain: 'bend, fold, curl', vi: 'gấp', viPlain: 'gập, cuộn',
    say: 'FLEK-shun', traps: ['cluster-fl', 'cluster-ks'], pair: 'extension',
    does: { en: 'Closing a joint: bending the knee, folding at the hips, rounding the spine forward.', vi: 'Khép một khớp lại: gập gối, gập ở hông, cuộn cột sống về trước.' },
    cues: [
      { style: 'vinyasa', en: 'Fold forward from your hips.', vi: 'Gập người về trước từ hông.' },
      { style: 'vinyasa', en: 'Bend your knees deeply.', vi: 'Gập gối sâu.' },
      { style: 'yin', en: 'Round your spine and let your head hang.', vi: 'Cuộn tròn cột sống và để đầu buông.' },
    ],
    poses: ['standing-forward-fold', 'child-pose', 'caterpillar'],
    wordTrap: 'Trong lớp hầu như không ai nói “flex your hip”; họ nói “fold”, “bend”, “draw your knee in”. “Flex your foot” là ngoại lệ phổ biến.',
  },
  {
    id: 'extension', en: 'extension', plain: 'straighten, lengthen, arch, open', vi: 'duỗi', viPlain: 'duỗi thẳng, ưỡn',
    say: 'ek-STEN-shun', traps: ['cluster-kst', 'stress'], pair: 'flexion',
    does: { en: 'Opening a joint: straightening the knee, arching the back, taking the arm behind you.', vi: 'Mở một khớp ra: duỗi gối, ưỡn lưng, đưa tay ra sau.' },
    cues: [
      { style: 'vinyasa', en: 'Straighten your front leg and lift your chest.', vi: 'Duỗi thẳng chân trước và nâng ngực.' },
      { style: 'ashtanga', en: 'Press into your hands and arch your upper back.', vi: 'Ấn tay xuống và ưỡn lưng trên.' },
      { style: 'yin', en: 'Let the front of your body open over the bolster.', vi: 'Để phía trước thân mở ra trên gối ôm.' },
    ],
    poses: ['cobra', 'locust-pose', 'bridge-pose', 'camel-pose'],
    wordTrap: '“Backbend” là từ lớp học cho “spinal extension”. “Extend your leg” thì có dùng.',
  },
  {
    id: 'lateral-flexion', en: 'lateral flexion', plain: 'side bend', vi: 'nghiêng bên (gấp bên)', viPlain: 'nghiêng người sang bên',
    say: 'LAT-er-ul FLEK-shun', traps: ['stress'], pair: null,
    does: { en: 'Bending the trunk to one side, keeping the chest facing forward.', vi: 'Nghiêng thân sang một bên, giữ ngực hướng về trước.' },
    cues: [
      { style: 'vinyasa', en: 'Reach up and over to the right, keeping both hips grounded.', vi: 'Vươn lên và sang phải, giữ hai hông bám sàn.' },
      { style: 'yin', en: 'Let your side body lengthen; breathe into the ribs on top.', vi: 'Để bên thân dài ra; thở vào phần sườn phía trên.' },
    ],
    poses: ['side-bend', 'gate-pose', 'bananasana', 'triangle'],
    wordTrap: 'Nói “side bend”; không ai nói “lateral flexion” với học viên.',
  },
  {
    id: 'rotation', en: 'rotation', plain: 'twist, turn', vi: 'xoay', viPlain: 'vặn, xoay',
    say: 'roh-TAY-shun', traps: ['stress'], pair: null,
    does: { en: 'Turning around a long axis: the spine in a twist, the thigh in the hip socket, the arm in the shoulder.', vi: 'Xoay quanh một trục dọc: cột sống trong tư thế vặn, đùi trong ổ khớp háng, cánh tay trong khớp vai.' },
    cues: [
      { style: 'vinyasa', en: 'Twist from your belly and let your gaze follow last.', vi: 'Vặn từ bụng và để ánh nhìn theo sau cùng.' },
      { style: 'ashtanga', en: 'Rotate your upper arms outward.', vi: 'Xoay bắp tay ra ngoài.' },
      { style: 'yin', en: 'Let the twist deepen on its own with each exhale.', vi: 'Để tư thế vặn tự sâu hơn sau mỗi hơi thở ra.' },
    ],
    poses: ['seated-twist', 'revolved-triangle', 'supine-twist'],
    wordTrap: 'Cho cột sống nói “twist”; cho tay chân nói “rotate” hoặc “turn out / turn in”.',
  },
  {
    id: 'external-rotation', en: 'external rotation', plain: 'turn out, open', vi: 'xoay ngoài', viPlain: 'xoay ra ngoài',
    say: 'ek-STER-nul roh-TAY-shun', traps: ['cluster-kst', 'stress'], pair: 'internal-rotation',
    does: { en: 'Turning a limb away from the midline: the thigh in Warrior II, the upper arms in Downward Dog.', vi: 'Xoay một chi ra xa đường giữa: đùi trong Chiến binh II, bắp tay trong Chó úp mặt.' },
    cues: [
      { style: 'vinyasa', en: 'Turn your front thigh out so the knee tracks over the toes.', vi: 'Xoay đùi trước ra ngoài để gối thẳng hướng với ngón chân.' },
      { style: 'ashtanga', en: 'Roll your upper arms out and your shoulder blades down.', vi: 'Xoay bắp tay ra ngoài và kéo bả vai xuống.' },
      { style: 'yin', en: 'Let your knees fall open.', vi: 'Để hai gối rơi mở ra.' },
    ],
    poses: ['warrior-2', 'bound-angle', 'downward-dog', 'lotus'],
    wordTrap: '“Turn out” / “open” là cách nói lớp học. Trong hông: cơ hình lê và nhóm xoay sâu làm việc này.',
  },
  {
    id: 'internal-rotation', en: 'internal rotation', plain: 'turn in', vi: 'xoay trong', viPlain: 'xoay vào trong',
    say: 'in-TER-nul roh-TAY-shun', traps: ['stress'], pair: 'external-rotation',
    does: { en: 'Turning a limb toward the midline: the back thigh in Warrior I, the arms in Reverse Prayer.', vi: 'Xoay một chi về phía đường giữa: đùi sau trong Chiến binh I, cánh tay trong Chắp tay sau lưng.' },
    cues: [
      { style: 'ashtanga', en: 'Roll your back thigh in so the hips face forward.', vi: 'Xoay đùi sau vào trong để hông hướng về trước.' },
      { style: 'vinyasa', en: 'Turn your palms to face behind you.', vi: 'Xoay lòng bàn tay hướng ra sau.' },
    ],
    poses: ['warrior-1', 'reverse-prayer', 'cow-face-pose'],
    wordTrap: 'Người Việt hay nhầm “inner” (bên trong) và “internal” (xoay trong). “Inner thigh” là vị trí, “turn in” là động tác.',
  },
  {
    id: 'abduction', en: 'abduction', plain: 'lift out to the side, widen', vi: 'dạng', viPlain: 'đưa ra xa thân, dang ra',
    say: 'ab-DUK-shun', traps: ['stress', 'b-vs-d'], pair: 'adduction',
    does: { en: 'Moving a limb away from the midline: arms out in Warrior II, legs wide in Prasarita.', vi: 'Đưa một chi ra xa đường giữa: tay dang ngang trong Chiến binh II, chân dang rộng trong Prasarita.' },
    cues: [
      { style: 'vinyasa', en: 'Reach your arms out to the sides at shoulder height.', vi: 'Dang hai tay sang hai bên ngang vai.' },
      { style: 'vinyasa', en: 'Step your feet wide apart.', vi: 'Bước hai chân rộng ra.' },
      { style: 'yin', en: 'Let your legs open wide and heavy in Dragonfly.', vi: 'Để hai chân mở rộng và nặng trong tư thế Chuồn chuồn.' },
    ],
    poses: ['warrior-2', 'wide-legged-fold', 'dragonfly', 'half-moon'],
    wordTrap: '“Abduction” (dạng) và “adduction” (khép) chỉ khác “b/d”. Trong lớp nói “out to the side” và “together”.',
  },
  {
    id: 'adduction', en: 'adduction', plain: 'draw in, squeeze together', vi: 'khép', viPlain: 'khép vào, kẹp lại',
    say: 'a-DUK-shun', traps: ['stress', 'b-vs-d'], pair: 'abduction',
    does: { en: 'Bringing a limb toward the midline: squeezing a block between the thighs, crossing the legs in Eagle.', vi: 'Đưa một chi về phía đường giữa: kẹp gạch giữa hai đùi, bắt chéo chân trong Đại bàng.' },
    cues: [
      { style: 'vinyasa', en: 'Squeeze your inner thighs together.', vi: 'Kẹp mặt trong hai đùi vào nhau.' },
      { style: 'ashtanga', en: 'Hug your legs together in Headstand.', vi: 'Ép hai chân vào nhau trong tư thế Trồng chuối đầu.' },
    ],
    poses: ['eagle-pose', 'chair-pose', 'bridge-pose'],
    wordTrap: 'Nhấn “DUK”. Với học viên nói “squeeze together” hoặc “hug in”.',
  },
  {
    id: 'plantar-flexion', en: 'plantar flexion', plain: 'point your foot', vi: 'gấp gan chân', viPlain: 'duỗi mũi chân',
    say: 'PLAN-tar FLEK-shun', traps: ['cluster-pl', 'stress'], pair: 'dorsiflexion',
    does: { en: 'Pointing the toes away, as in rising onto tiptoe or the top of the foot in Hero.', vi: 'Duỗi mũi chân ra xa, như khi kiễng chân hoặc mu bàn chân áp sàn trong Anh hùng.' },
    cues: [
      { style: 'vinyasa', en: 'Point your toes and reach through the top of your foot.', vi: 'Duỗi mũi chân và vươn qua mu bàn chân.' },
      { style: 'yin', en: 'Let the tops of your feet rest on the floor.', vi: 'Để mu bàn chân nằm trên sàn.' },
    ],
    poses: ['hero-pose', 'saddle', 'locust-pose'],
    wordTrap: 'Nói “point your toes”; không ai dùng từ Latin với học viên.',
  },
  {
    id: 'dorsiflexion', en: 'dorsiflexion', plain: 'flex your foot', vi: 'gấp mu chân', viPlain: 'gập bàn chân, kéo mũi chân về',
    say: 'DOR-si-FLEK-shun', traps: ['stress', 'cluster-fl'], pair: 'plantar-flexion',
    does: { en: 'Pulling the toes toward the shin: it protects the knee in hip openers and stretches the calf.', vi: 'Kéo mũi chân về phía ống chân: bảo vệ gối trong các tư thế mở hông và kéo giãn bắp chân.' },
    cues: [
      { style: 'yin', en: 'Flex your front foot to protect the knee.', vi: 'Gập bàn chân trước để bảo vệ gối.' },
      { style: 'ashtanga', en: 'Flex your feet and press through your heels.', vi: 'Gập bàn chân và ấn qua gót.' },
    ],
    poses: ['staff-pose', 'sleeping-swan', 'reclined-hand-to-toe'],
    wordTrap: '“Flex your foot” là cách nói chuẩn trong lớp; “flex” ở đây nghĩa là gập cổ chân, không phải gồng cơ.',
  },
  {
    id: 'pronation-supination', en: 'pronation and supination', plain: 'turn your palm down / turn your palm up', vi: 'sấp và ngửa', viPlain: 'úp và ngửa bàn tay',
    say: 'proh-NAY-shun, soo-pi-NAY-shun', traps: ['cluster-pr', 'stress'], pair: null,
    does: { en: 'Rolling the forearm so the palm faces down (pronation) or up (supination); the feet do a version of it too.', vi: 'Lăn cẳng tay để lòng bàn tay úp xuống (sấp) hoặc ngửa lên (ngửa); bàn chân cũng có một dạng tương tự.' },
    cues: [
      { style: 'vinyasa', en: 'Turn your palms up and open your chest.', vi: 'Ngửa lòng bàn tay và mở ngực.' },
      { style: 'yin', en: 'Rest your hands palms up, fingers soft.', vi: 'Đặt tay ngửa, ngón tay thả lỏng.' },
    ],
    poses: ['savasana', 'mountain-pose', 'reverse-prayer'],
    wordTrap: 'Mẹo nhớ: “supination” như bưng bát “soup” (ngửa tay).',
  },
  {
    id: 'protraction-retraction', en: 'protraction and retraction', plain: 'spread your shoulder blades / squeeze your shoulder blades', vi: 'đưa ra trước và kéo về sau (bả vai)', viPlain: 'mở bả vai và khép bả vai',
    say: 'proh-TRAK-shun, ri-TRAK-shun', traps: ['cluster-tr', 'cluster-kt'], pair: null,
    does: { en: 'Sliding the shoulder blades apart around the ribs (Cat, Plank) or together toward the spine (Cow, Locust).', vi: 'Trượt hai bả vai tách ra vòng quanh lồng ngực (Mèo, Plank) hoặc khép lại về phía cột sống (Bò, Châu chấu).' },
    cues: [
      { style: 'vinyasa', en: 'Push the floor away and spread your shoulder blades.', vi: 'Đẩy sàn ra xa và mở rộng hai bả vai.' },
      { style: 'ashtanga', en: 'Draw your shoulder blades together and lift your heart.', vi: 'Kéo hai bả vai lại gần nhau và nâng ngực.' },
    ],
    poses: ['cat-pose', 'cow-pose', 'plank', 'locust-pose'],
    wordTrap: 'Nói “spread” và “squeeze” hoặc “draw together”; dễ hơn và rõ hơn.',
  },
  {
    id: 'elevation-depression', en: 'elevation and depression', plain: 'shrug up / draw down', vi: 'nâng và hạ (vai)', viPlain: 'nhún vai lên và hạ vai xuống',
    say: 'el-uh-VAY-shun, di-PRESH-un', traps: ['stress', 'cluster-pr'], pair: null,
    does: { en: 'Lifting the shoulders toward the ears, or drawing them down; almost every cue asks for the second.', vi: 'Nâng vai lên về phía tai, hoặc kéo vai xuống; hầu hết các cue yêu cầu điều thứ hai.' },
    cues: [
      { style: 'vinyasa', en: 'Draw your shoulders down away from your ears.', vi: 'Kéo vai xuống xa khỏi tai.' },
      { style: 'vinyasa', en: 'Inhale, shrug your shoulders up; exhale, let them drop.', vi: 'Hít vào, nhún vai lên; thở ra, để vai rơi xuống.' },
    ],
    poses: ['mountain-pose', 'warrior-2', 'downward-dog'],
    wordTrap: '“Depression” ở đây là động tác hạ vai, không phải trầm cảm; vì thế giáo viên nói “draw down”.',
  },
  {
    id: 'pelvic-tilt', en: 'anterior and posterior pelvic tilt', plain: 'tip your pelvis forward / tuck your tailbone', vi: 'nghiêng chậu ra trước và ra sau', viPlain: 'đổ khung chậu về trước / cuộn xương cụt',
    say: 'PEL-vik TILT', traps: ['cluster-lv', 'cluster-lt'], pair: null,
    does: { en: 'Rocking the pelvic bowl: forward arches the lower back (Cow), backward flattens it (Cat). Neutral is the goal in standing poses.', vi: 'Lắc “bát” khung chậu: đổ về trước làm ưỡn lưng dưới (Bò), ra sau làm phẳng lưng dưới (Mèo). Trung tính là mục tiêu trong các tư thế đứng.' },
    cues: [
      { style: 'vinyasa', en: 'Tip your pelvis forward and lift your sitting bones.', vi: 'Đổ khung chậu về trước và nâng xương ngồi.' },
      { style: 'vinyasa', en: 'Tuck your tailbone and round your lower back.', vi: 'Cuộn xương cụt và làm tròn lưng dưới.' },
      { style: 'ashtanga', en: 'Find a neutral pelvis: hip points and pubic bone in one line.', vi: 'Tìm khung chậu trung tính: mỏm hông và xương mu thẳng hàng.' },
    ],
    poses: ['cat-pose', 'cow-pose', 'mountain-pose', 'bridge-pose'],
    wordTrap: 'Cụm “lt” cuối trong “tilt” cần nghe được. “Tuck” (cuộn) là động từ rất hay dùng cho xương cụt.',
  },
]
