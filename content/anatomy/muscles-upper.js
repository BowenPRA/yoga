/**
 * Muscles of the neck, shoulder girdle, chest, back and arm.
 *
 * Fields
 *   en        the name a teacher says ("the deltoids"); latin when it differs
 *   plain     the plain-English teaching phrase she can use instead
 *   vi        standard Vietnamese anatomy term; viPlain the everyday phrase
 *   say       stress respelling (capitals on the stressed syllable)
 *   traps     pronunciation targets for Vietnamese speakers
 *   region    index group; view: which figure(s) show it; deep: under others
 *   does      what it does, one line (teaching level, not textbook)
 *   feel      where she feels it on the mat
 *   cues      3 to 5 cues using it in context, tagged by style
 *   works     poses where it is working; stretches: poses where it lengthens
 *   wordTrap  the mistake Vietnamese speakers make with this word, in Vietnamese
 *   near      neighbours; under: what lies deep to it (ids)
 */
export const MUSCLES_UPPER = [
  {
    id: 'sternocleidomastoid', en: 'sternocleidomastoid', plain: 'the long muscle at the side of your neck',
    vi: 'cơ ức đòn chũm', viPlain: 'cơ bên cổ', say: 'STER-no-KLY-do-MAS-toyd', traps: ['stress', 'cluster-st', 'final-d'],
    region: 'neck', view: ['front'], deep: false,
    does: { en: 'Turns and tilts the head; both sides together nod the chin down.', vi: 'Xoay và nghiêng đầu; hai bên cùng co thì gật cằm xuống.' },
    feel: { en: 'The cord that stands out when you turn your head in a twist, or that grips when the head is held off the floor.', vi: 'Sợi cơ nổi lên khi bạn xoay đầu trong tư thế vặn, hoặc gồng lên khi đầu nhấc khỏi sàn.' },
    cues: [
      { style: 'vinyasa', en: 'Let your head be heavy; you don’t need to hold it up with your neck.', vi: 'Để đầu nặng xuống; bạn không cần dùng cổ để giữ đầu.' },
      { style: 'yin', en: 'Soften the sides of your neck and let the jaw unclench.', vi: 'Thả lỏng hai bên cổ và để hàm buông ra.' },
      { style: 'ashtanga', en: 'In the twist, turn your gaze last, and keep the neck long.', vi: 'Trong tư thế vặn, xoay ánh nhìn sau cùng, và giữ cổ dài.' },
    ],
    works: ['boat-pose', 'bridge-pose'], stretches: ['fish-pose', 'supine-twist'],
    wordTrap: 'Từ rất dài; nếu khó, cứ nói “the side of your neck”. Đừng cố nói nhanh, hãy ngắt thành bốn nhịp.',
    near: ['trapezius', 'scalenes'], under: [],
  },
  {
    id: 'trapezius', en: 'trapezius', plain: 'the top of your shoulders and upper back', shortEn: 'traps',
    vi: 'cơ thang', viPlain: 'cơ vai gáy', say: 'tra-PEE-zee-us', traps: ['stress', 'cluster-tr', 'final-s'],
    region: 'shoulder-girdle', view: ['front', 'back'], deep: false,
    does: { en: 'Lifts, pulls back and lowers the shoulder blades; the upper part hunches the shoulders toward the ears.', vi: 'Nâng, kéo về sau và hạ xương bả vai; phần trên nhún vai lên gần tai.' },
    feel: { en: 'The part that creeps up when arms are overhead and the shoulders rise with them.', vi: 'Phần cơ hay gồng lên khi tay giơ cao và vai nhấc theo.' },
    cues: [
      { style: 'vinyasa', en: 'Relax your shoulders away from your ears.', vi: 'Thả vai xuống, xa khỏi tai.' },
      { style: 'vinyasa', en: 'Slide your shoulder blades down your back.', vi: 'Trượt hai xương bả vai xuống dọc theo lưng.' },
      { style: 'yin', en: 'Let the tops of your shoulders melt away from your neck.', vi: 'Để phần trên vai mềm ra, rời xa cổ.' },
      { style: 'ashtanga', en: 'In Downward Dog, broaden across the upper back rather than shrugging.', vi: 'Trong Chó úp mặt, mở rộng phần lưng trên thay vì nhún vai.' },
    ],
    works: ['downward-dog', 'plank', 'warrior-2'], stretches: ['child-pose', 'eagle-arms', 'thread-the-needle'],
    wordTrap: 'Trọng âm rơi vào “PEE”, không phải âm đầu. Trong lớp, giáo viên bản xứ hay nói gọn “your traps”.',
    near: ['deltoids', 'rhomboids', 'levator-scapulae'], under: ['rhomboids', 'levator-scapulae'],
  },
  {
    id: 'levator-scapulae', en: 'levator scapulae', plain: 'the muscle that lifts your shoulder blade',
    vi: 'cơ nâng vai', viPlain: 'cơ nâng bả vai', say: 'le-VAY-tor SKAP-yoo-lee', traps: ['stress', 'cluster-sk'],
    region: 'shoulder-girdle', view: ['back'], deep: true,
    does: { en: 'Lifts the shoulder blade and tilts the neck; the classic “tight spot” between neck and shoulder.', vi: 'Nâng xương bả vai và nghiêng cổ; điểm căng cứng quen thuộc giữa cổ và vai.' },
    feel: { en: 'The knot at the top inner corner of the shoulder blade after a day at a desk.', vi: 'Cục cứng ở góc trên trong của xương bả vai sau một ngày ngồi bàn.' },
    cues: [
      { style: 'yin', en: 'Drop your ear toward your shoulder and let the back of the neck lengthen.', vi: 'Hạ tai về phía vai và để phía sau cổ dài ra.' },
      { style: 'vinyasa', en: 'Keep your shoulder blades heavy as you reach up.', vi: 'Giữ xương bả vai nặng xuống khi bạn vươn lên.' },
    ],
    works: ['shoulder-shrugs'], stretches: ['ear-to-shoulder', 'thread-the-needle'],
    wordTrap: 'Hiếm khi cần nói tên này trong lớp; “the top of your shoulder blade” là đủ.',
    near: ['trapezius', 'rhomboids'], under: [],
  },
  {
    id: 'rhomboids', en: 'rhomboids', plain: 'the muscles between your shoulder blades',
    vi: 'cơ trám', viPlain: 'cơ giữa hai bả vai', say: 'ROM-boydz', traps: ['stress', 'final-dz'],
    region: 'shoulder-girdle', view: ['back'], deep: true,
    does: { en: 'Pull the shoulder blades toward the spine; the “squeeze” in backbends and Locust.', vi: 'Kéo hai xương bả vai về phía cột sống; cảm giác “siết” trong các tư thế ngả sau và Châu chấu.' },
    feel: { en: 'Between the shoulder blades when you draw them together; stretched when you round the upper back.', vi: 'Giữa hai bả vai khi bạn kéo chúng lại gần nhau; được giãn khi bạn cuộn tròn lưng trên.' },
    cues: [
      { style: 'vinyasa', en: 'Draw your shoulder blades toward each other and lift your chest.', vi: 'Kéo hai xương bả vai lại gần nhau và nâng ngực lên.' },
      { style: 'ashtanga', en: 'In Locust, squeeze between the shoulder blades to lift the arms higher.', vi: 'Trong Châu chấu, siết giữa hai bả vai để nâng tay cao hơn.' },
      { style: 'yin', en: 'Round your upper back and let the space between your shoulder blades open.', vi: 'Cuộn tròn lưng trên và để khoảng giữa hai bả vai mở ra.' },
    ],
    works: ['locust-pose', 'cobra', 'bow-pose'], stretches: ['eagle-arms', 'cat-pose', 'child-pose'],
    wordTrap: 'Đọc “ROM-boydz”, nhớ âm cuối “dz”; học viên thường nghe thành “rhomboy” nếu bạn nuốt đuôi.',
    near: ['trapezius', 'levator-scapulae'], under: [],
  },
  {
    id: 'deltoids', en: 'deltoids', plain: 'the caps of your shoulders', latin: 'deltoideus',
    vi: 'cơ delta', viPlain: 'cơ vai', say: 'DEL-toydz', traps: ['stress', 'final-dz'],
    region: 'shoulder-girdle', view: ['front', 'back'], deep: false,
    does: { en: 'Lifts the arm out to the side, forward and back; the shoulder’s main mover.', vi: 'Nâng cánh tay sang ngang, ra trước và ra sau; cơ vận động chính của vai.' },
    feel: { en: 'Burning at the top of the arm when arms are held out in Warrior II.', vi: 'Nóng rát ở đầu cánh tay khi giữ tay dang ngang trong Chiến binh II.' },
    cues: [
      { style: 'vinyasa', en: 'Reach out through your fingertips; let the shoulders stay soft while the arms work.', vi: 'Vươn qua đầu ngón tay; để vai mềm trong khi hai tay làm việc.' },
      { style: 'ashtanga', en: 'In Warrior II, keep the arms at shoulder height, strong to the fingertips.', vi: 'Trong Chiến binh II, giữ tay ngang vai, khoẻ đến tận đầu ngón tay.' },
      { style: 'yin', en: 'Let the arms rest; nothing to hold here.', vi: 'Để hai tay nghỉ; không cần giữ gì ở đây.' },
    ],
    works: ['warrior-2', 'downward-dog', 'plank', 'side-plank'], stretches: ['eagle-arms', 'cow-face-arms'],
    wordTrap: 'Nhấn âm đầu “DEL”. Nói “your shoulders” cũng được, nhưng “deltoids” là từ học viên nước ngoài hay nghe trong phòng gym.',
    near: ['trapezius', 'pectoralis-major', 'rotator-cuff'], under: ['rotator-cuff'],
  },
  {
    id: 'rotator-cuff', en: 'rotator cuff', plain: 'the small muscles that hold your shoulder in its socket',
    vi: 'chóp xoay', viPlain: 'nhóm cơ giữ khớp vai', say: 'ROH-tay-tor KUF', traps: ['stress', 'final-f'],
    region: 'shoulder-girdle', view: ['back'], deep: true,
    latin: 'supraspinatus, infraspinatus, teres minor, subscapularis',
    does: { en: 'Four small muscles that steady the ball of the shoulder in its socket and rotate the arm.', vi: 'Bốn cơ nhỏ giữ chỏm xương cánh tay ổn định trong ổ khớp và xoay cánh tay.' },
    feel: { en: 'Deep in the shoulder in Chaturanga and arm balances; the first thing to complain in bad Downward Dogs.', vi: 'Sâu trong vai khi tập Chaturanga và các tư thế thăng bằng tay; là nơi kêu đau đầu tiên khi Chó úp mặt sai.' },
    cues: [
      { style: 'vinyasa', en: 'Rotate your upper arms outward so the shoulders feel wide.', vi: 'Xoay bắp tay ra ngoài để vai thấy rộng.' },
      { style: 'ashtanga', en: 'In Chaturanga, keep the elbows close and the shoulders no lower than the elbows.', vi: 'Trong Chaturanga, giữ khuỷu sát thân và vai không thấp hơn khuỷu.' },
      { style: 'yin', en: 'If the shoulder pinches, come out and choose the gentler option.', vi: 'Nếu vai bị kẹt nhói, thoát thế và chọn lựa chọn nhẹ nhàng hơn.' },
    ],
    works: ['chaturanga', 'downward-dog', 'side-plank'], stretches: ['cow-face-arms', 'thread-the-needle'],
    wordTrap: '“Cuff” đọc với âm /ʌ/ ngắn, như “cup”. Đây là từ mà học viên bị đau vai hay nhắc đến, nên đáng để nói rõ.',
    near: ['deltoids', 'teres-major'], under: [],
  },
  {
    id: 'teres-major', en: 'teres major', plain: 'the muscle under your armpit at the back',
    vi: 'cơ tròn lớn', viPlain: 'cơ dưới nách phía sau', say: 'TEH-reez MAY-jor', traps: ['stress', 'final-z'],
    region: 'shoulder-girdle', view: ['back'], deep: false,
    does: { en: 'Pulls the arm down and in, helping the lats.', vi: 'Kéo cánh tay xuống và vào trong, hỗ trợ cơ lưng rộng.' },
    feel: { en: 'The edge of the armpit that stretches when arms go overhead in Downward Dog.', vi: 'Mép nách căng ra khi tay vươn qua đầu trong Chó úp mặt.' },
    cues: [
      { style: 'vinyasa', en: 'Lift your armpits toward the ceiling in Downward Dog.', vi: 'Nâng hõm nách lên hướng trần nhà trong Chó úp mặt.' },
    ],
    works: ['chaturanga', 'pull-down-arms'], stretches: ['downward-dog', 'puppy-pose'],
    wordTrap: 'Ít khi cần nói tên này; “the back of your armpit” rõ hơn với học viên.',
    near: ['latissimus-dorsi', 'rotator-cuff'], under: [],
  },
  {
    id: 'pectoralis-major', en: 'pectoralis major', plain: 'your chest', shortEn: 'pecs',
    vi: 'cơ ngực lớn', viPlain: 'cơ ngực', say: 'pek-tor-AL-is MAY-jor', traps: ['stress', 'cluster-kt'],
    region: 'chest', view: ['front'], deep: false,
    does: { en: 'Brings the arm across the body and presses it down; tight pecs round the shoulders forward.', vi: 'Đưa cánh tay ngang qua thân và ép xuống; cơ ngực căng làm vai tròn về trước.' },
    feel: { en: 'Open and stretching in backbends and Cobra; working hard in Chaturanga.', vi: 'Mở và giãn trong các tư thế ngả sau và Rắn hổ mang; làm việc nhiều trong Chaturanga.' },
    cues: [
      { style: 'vinyasa', en: 'Open your chest toward the ceiling.', vi: 'Mở ngực hướng lên trần nhà.' },
      { style: 'vinyasa', en: 'Broaden across your collarbones.', vi: 'Mở rộng hai bên xương đòn.' },
      { style: 'ashtanga', en: 'Lower to Chaturanga with your chest, not your chin.', vi: 'Hạ xuống Chaturanga bằng ngực, không phải bằng cằm.' },
      { style: 'yin', en: 'Let the front of your chest soften and spread over the bolster.', vi: 'Để phía trước ngực mềm ra và trải rộng trên gối ôm.' },
    ],
    works: ['chaturanga', 'plank'], stretches: ['cobra', 'bridge-pose', 'supported-fish', 'camel-pose'],
    wordTrap: 'Trọng âm ở “AL”. Trong lớp, “your chest” là tự nhiên nhất; “pecs” nghe như phòng gym.',
    near: ['deltoids', 'serratus-anterior'], under: ['pectoralis-minor'],
  },
  {
    id: 'pectoralis-minor', en: 'pectoralis minor', plain: 'the small muscle under your chest',
    vi: 'cơ ngực bé', viPlain: 'cơ nhỏ dưới ngực', say: 'pek-tor-AL-is MY-nor', traps: ['stress'],
    region: 'chest', view: ['front'], deep: true,
    does: { en: 'Pulls the shoulder blade forward and down; when tight it drags the shoulders into a slump.', vi: 'Kéo xương bả vai ra trước và xuống; khi căng nó kéo vai gục xuống.' },
    feel: { en: 'The stretch just under the collarbone when the arms open wide in a supported backbend.', vi: 'Cảm giác giãn ngay dưới xương đòn khi hai tay mở rộng trong tư thế ngả sau có hỗ trợ.' },
    cues: [
      { style: 'yin', en: 'Let your arms open wide and feel the space under your collarbones.', vi: 'Để hai tay mở rộng và cảm nhận khoảng trống dưới xương đòn.' },
      { style: 'vinyasa', en: 'Lift the front of your shoulders away from the floor.', vi: 'Nâng phía trước vai lên khỏi sàn.' },
    ],
    works: ['chaturanga'], stretches: ['supported-fish', 'doorway-stretch'],
    wordTrap: 'Thường chỉ cần nói “under your collarbones”.',
    near: ['pectoralis-major', 'serratus-anterior'], under: [],
  },
  {
    id: 'serratus-anterior', en: 'serratus anterior', plain: 'the muscle along the side of your ribs',
    vi: 'cơ răng trước', viPlain: 'cơ bên sườn', say: 'ser-AY-tus an-TEER-ee-or', traps: ['stress', 'final-s'],
    region: 'chest', view: ['front'], deep: false,
    does: { en: 'Holds the shoulder blade flat against the ribs and pushes it forward; the “push” muscle of Plank.', vi: 'Giữ xương bả vai áp sát lồng ngực và đẩy nó ra trước; cơ “đẩy” trong Plank.' },
    feel: { en: 'Along the side ribs when you push the floor away in Plank and Cat.', vi: 'Dọc theo xương sườn bên khi bạn đẩy sàn ra xa trong Plank và Mèo.' },
    cues: [
      { style: 'vinyasa', en: 'Push the floor away and feel your upper back broaden.', vi: 'Đẩy sàn ra xa và cảm nhận lưng trên mở rộng.' },
      { style: 'ashtanga', en: 'In Plank, don’t let your chest sink between your shoulders.', vi: 'Trong Plank, đừng để ngực lún xuống giữa hai vai.' },
      { style: 'vinyasa', en: 'Wrap your shoulder blades around your ribs.', vi: 'Ôm xương bả vai vòng quanh lồng ngực.' },
    ],
    works: ['plank', 'cat-pose', 'downward-dog', 'crow-pose'], stretches: ['cow-face-arms'],
    wordTrap: 'Đọc “ser-AY-tus”; nhiều người đọc nhầm thành “se-ra-tus” đều nhịp.',
    near: ['pectoralis-major', 'external-oblique', 'latissimus-dorsi'], under: [],
  },
  {
    id: 'latissimus-dorsi', en: 'latissimus dorsi', plain: 'the big muscles of your mid back', shortEn: 'lats',
    vi: 'cơ lưng rộng', viPlain: 'cơ lưng', say: 'la-TIS-i-mus DOR-sy', traps: ['stress', 'final-s'],
    region: 'back', view: ['back'], deep: false,
    does: { en: 'Pulls the arm down and back; tight lats stop the arms reaching straight overhead.', vi: 'Kéo cánh tay xuống và ra sau; cơ lưng rộng căng khiến tay không vươn thẳng lên trên được.' },
    feel: { en: 'The stretch down the side of the back in Downward Dog and side bends.', vi: 'Cảm giác giãn dọc bên lưng trong Chó úp mặt và các tư thế nghiêng bên.' },
    cues: [
      { style: 'vinyasa', en: 'Reach your arms up and feel the sides of your back lengthen.', vi: 'Vươn tay lên và cảm nhận hai bên lưng dài ra.' },
      { style: 'ashtanga', en: 'In Downward Dog, send your hips back and let the sides of your waist get long.', vi: 'Trong Chó úp mặt, đưa hông ra sau và để hai bên eo dài ra.' },
      { style: 'yin', en: 'In the side bend, breathe into the side ribs.', vi: 'Trong tư thế nghiêng bên, hít thở vào phần sườn bên.' },
    ],
    works: ['chaturanga', 'wheel-pose', 'arm-balances'], stretches: ['downward-dog', 'puppy-pose', 'side-bend', 'child-pose'],
    wordTrap: 'Trọng âm “TIS”. “Your lats” là cách nói ngắn quen thuộc; “the sides of your back” là cách nói dễ hiểu nhất.',
    near: ['teres-major', 'erector-spinae', 'external-oblique'], under: [],
  },
  {
    id: 'erector-spinae', en: 'erector spinae', plain: 'the long muscles along your spine',
    vi: 'cơ dựng sống', viPlain: 'cơ dọc hai bên cột sống', say: 'e-REK-tor SPY-nee', traps: ['stress', 'cluster-sp'],
    region: 'back', view: ['back'], deep: true,
    does: { en: 'Hold you upright and arch the back; they let go in a forward fold.', vi: 'Giữ bạn thẳng người và ưỡn lưng; chúng buông ra trong tư thế gập người.' },
    feel: { en: 'Two ropes beside the spine, working in Locust and Warrior III, softening in Child’s Pose.', vi: 'Hai “sợi dây” dọc hai bên cột sống, làm việc trong Châu chấu và Chiến binh III, mềm ra trong tư thế Em bé.' },
    cues: [
      { style: 'vinyasa', en: 'Lengthen your spine from your tailbone to the crown of your head.', vi: 'Kéo dài cột sống từ xương cụt đến đỉnh đầu.' },
      { style: 'ashtanga', en: 'Lift through the back of your heart in Locust.', vi: 'Nâng lên qua phía sau tim trong Châu chấu.' },
      { style: 'yin', en: 'Let your back round; let the muscles along your spine go quiet.', vi: 'Để lưng cong tròn; để các cơ dọc cột sống lặng xuống.' },
      { style: 'vinyasa', en: 'Keep a long spine as you fold; hinge from your hips.', vi: 'Giữ cột sống dài khi gập; gập từ hông.' },
    ],
    works: ['locust-pose', 'warrior-3', 'cobra', 'mountain-pose'], stretches: ['child-pose', 'forward-fold', 'caterpillar'],
    wordTrap: 'Ít khi cần tên này; “the muscles along your spine” hoặc đơn giản “your back” là đủ. “Spine” cần cụm “sp” liền.',
    near: ['latissimus-dorsi', 'quadratus-lumborum'], under: [],
  },
  {
    id: 'quadratus-lumborum', en: 'quadratus lumborum', plain: 'the deep muscle of your lower back and waist', shortEn: 'QL',
    vi: 'cơ vuông thắt lưng', viPlain: 'cơ sâu vùng thắt lưng', say: 'kwo-DRAY-tus lum-BOR-um', traps: ['stress', 'cluster-dr'],
    region: 'back', view: ['back'], deep: true,
    does: { en: 'Side-bends the trunk and hikes the hip; a usual suspect in lower back tightness.', vi: 'Nghiêng thân sang bên và nhấc hông; thủ phạm thường gặp khi lưng dưới bị căng.' },
    feel: { en: 'Deep in the waist on the stretched side of a side bend.', vi: 'Sâu trong eo ở bên được kéo giãn khi nghiêng người.' },
    cues: [
      { style: 'yin', en: 'Let the waist on your top side open and breathe into it.', vi: 'Để eo bên trên mở ra và hít thở vào đó.' },
      { style: 'vinyasa', en: 'Keep both hips level as you reach over to the side.', vi: 'Giữ hai hông ngang bằng khi bạn vươn sang bên.' },
    ],
    works: ['side-plank', 'triangle'], stretches: ['side-bend', 'bananasana', 'gate-pose'],
    wordTrap: 'Giáo viên thường nói “the QL” (kiu-el). Với học viên, “your lower back and waist” dễ hiểu hơn.',
    near: ['erector-spinae', 'iliopsoas'], under: [],
  },
  {
    id: 'biceps-brachii', en: 'biceps', latin: 'biceps brachii', plain: 'the front of your upper arms',
    vi: 'cơ nhị đầu cánh tay', viPlain: 'bắp tay trước', say: 'BY-seps', traps: ['stress', 'final-ps'],
    region: 'arm', view: ['front'], deep: false,
    does: { en: 'Bends the elbow and turns the palm up.', vi: 'Gập khuỷu tay và xoay lòng bàn tay lên.' },
    feel: { en: 'Stretched when the arms reach back and the palms turn down, as in Reverse Prayer or Camel.', vi: 'Được giãn khi tay vươn ra sau và lòng bàn tay úp xuống, như trong Chắp tay sau lưng hoặc Lạc đà.' },
    cues: [
      { style: 'vinyasa', en: 'Keep a soft bend in your elbows; don’t lock them.', vi: 'Giữ khuỷu tay hơi chùng; đừng khoá khuỷu.' },
      { style: 'ashtanga', en: 'In Chaturanga, bend your elbows to ninety degrees, no lower.', vi: 'Trong Chaturanga, gập khuỷu tay vuông góc, không thấp hơn.' },
    ],
    works: ['chaturanga', 'crow-pose'], stretches: ['camel-pose', 'reverse-prayer'],
    wordTrap: '“Biceps” là một từ số ít dù kết thúc bằng “s”; đừng nói “bicep”. Đọc rõ cụm cuối “ps”.',
    near: ['deltoids', 'brachialis', 'triceps-brachii'], under: ['brachialis'],
  },
  {
    id: 'triceps-brachii', en: 'triceps', latin: 'triceps brachii', plain: 'the back of your upper arms',
    vi: 'cơ tam đầu cánh tay', viPlain: 'bắp tay sau', say: 'TRY-seps', traps: ['cluster-tr', 'final-ps'],
    region: 'arm', view: ['back'], deep: false,
    does: { en: 'Straightens the elbow; the pushing muscle of Plank and Chaturanga.', vi: 'Duỗi thẳng khuỷu tay; cơ đẩy trong Plank và Chaturanga.' },
    feel: { en: 'Shaking in Chaturanga; stretched when the elbow points up in Cow Face arms.', vi: 'Run lên trong Chaturanga; được giãn khi khuỷu chỉ lên trong tay Mặt bò.' },
    cues: [
      { style: 'vinyasa', en: 'Press the floor away and straighten your arms without locking your elbows.', vi: 'Đẩy sàn ra xa và duỗi thẳng tay nhưng không khoá khuỷu.' },
      { style: 'ashtanga', en: 'Hug your elbows in toward your ribs as you lower.', vi: 'Ôm khuỷu tay sát vào sườn khi bạn hạ xuống.' },
      { style: 'yin', en: 'Let the arms be heavy; you don’t need them here.', vi: 'Để hai tay nặng xuống; bạn không cần dùng đến chúng ở đây.' },
    ],
    works: ['chaturanga', 'plank', 'downward-dog', 'crow-pose'], stretches: ['cow-face-arms'],
    wordTrap: 'Cụm “tr” ở đầu đọc liền, không chèn âm “ơ” thành “tờ-rai”. Giống “biceps”, đây là từ số ít.',
    near: ['deltoids', 'latissimus-dorsi'], under: [],
  },
  {
    id: 'forearm-flexors', en: 'forearm flexors', plain: 'the inside of your forearms',
    vi: 'nhóm cơ gấp cẳng tay', viPlain: 'mặt trong cẳng tay', say: 'FOR-arm FLEK-sers', traps: ['cluster-fl', 'final-z'],
    region: 'arm', view: ['front'], deep: false,
    does: { en: 'Bend the wrist and grip; they get tight from typing and complain in Downward Dog.', vi: 'Gập cổ tay và nắm; bị căng do gõ phím và “kêu” trong Chó úp mặt.' },
    feel: { en: 'The pull along the inner forearm when the hands are flat and the arms straight.', vi: 'Cảm giác kéo dọc mặt trong cẳng tay khi bàn tay áp sàn và tay duỗi thẳng.' },
    cues: [
      { style: 'vinyasa', en: 'Spread your fingers wide and press through your knuckles.', vi: 'Xoè rộng các ngón tay và ấn qua các khớp ngón.' },
      { style: 'vinyasa', en: 'Turn your palms up and stretch the inside of your wrists.', vi: 'Ngửa lòng bàn tay lên và kéo giãn mặt trong cổ tay.' },
    ],
    works: ['downward-dog', 'plank', 'crow-pose'], stretches: ['wrist-stretches', 'reverse-tabletop'],
    wordTrap: '“Forearm” nhấn âm đầu, hai âm tiết: FOR-arm.',
    near: ['biceps-brachii', 'wrist'], under: [],
  },
  {
    id: 'forearm-extensors', en: 'forearm extensors', plain: 'the outside of your forearms',
    vi: 'nhóm cơ duỗi cẳng tay', viPlain: 'mặt ngoài cẳng tay', say: 'FOR-arm ek-STEN-sers', traps: ['cluster-kst', 'final-z'],
    region: 'arm', view: ['back'], deep: false,
    does: { en: 'Lift the back of the hand and straighten the fingers; they steady the wrist in arm balances.', vi: 'Nâng mu bàn tay và duỗi ngón tay; giữ cổ tay vững trong các tư thế thăng bằng tay.' },
    feel: { en: 'Along the top of the forearm when you make a fist and pull it toward you.', vi: 'Dọc mặt trên cẳng tay khi bạn nắm tay và kéo về phía mình.' },
    cues: [
      { style: 'vinyasa', en: 'Grip the mat lightly with your fingertips to protect your wrists.', vi: 'Bấm nhẹ đầu ngón tay xuống thảm để bảo vệ cổ tay.' },
    ],
    works: ['crow-pose', 'handstand', 'plank'], stretches: ['wrist-stretches'],
    wordTrap: 'Cụm “kst” ở giữa “extensors” khó với người Việt; đọc chậm “ek-STEN-sers”.',
    near: ['triceps-brachii', 'wrist'], under: [],
  },
]
