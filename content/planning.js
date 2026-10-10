/**
 * What the Class Builder knows that the pose files do not: what a class can
 * be for (GOALS), what a student can bring to it (CAUTIONS), and which poses
 * are done on both sides. Everything else (families, Yin targets, muscles,
 * levels, transitions, cues, modifications, safety lines) is read from the
 * poses themselves, so a new pose joins the planner for free.
 *
 * Matching is by keyword. Her request is Vietnamese, English or a mix;
 * keywords with diacritics match exactly (cổ is the neck, có is not), and
 * keywords without match the folded text. Longer keywords win: "cổ tay" is
 * the wrist before "cổ" can be the neck, "đau lưng" is a caution before
 * "lưng" can be a theme.
 *
 * A goal picks poses by family, by Yin target and by the muscles a pose
 * lengthens or works; `peak` names the poses a class on this theme builds
 * towards. `theme` is the line that opens the class when Gemini is not asked.
 *
 * A caution removes poses: those named in `avoid`, whole families in
 * `avoidFamilies`, and any strong pose whose safety lines mention the
 * caution (`match`). The safety line of every pose that is kept is attached
 * to its step, so she knows what to say. `prefer` is a gentle sequence for
 * that body; `terms` names the anatomy whose lesson "care" lines apply;
 * `lines` are phrase ids worth saying to that student.
 */
export const GOALS = [
  {
    id: 'hips',
    label: { en: 'Hip opening', vi: 'Mở hông' },
    keywords: ['hip', 'hips', 'hip opener', 'hip openers', 'hip opening', 'open the hips', 'tight hips', 'hông', 'mở hông', 'mo hong', 'khớp háng', 'háng', 'hông chặt', 'cứng hông'],
    families: ['hip-opener'],
    targets: ['hips', 'inner-thighs'],
    lengthening: ['hip-adductors', 'iliopsoas', 'piriformis', 'deep-rotators', 'gluteus-maximus', 'gluteus-medius', 'tensor-fasciae-latae'],
    working: [],
    peak: ['pigeon', 'lizard-pose', 'malasana', 'goddess-pose', 'bound-angle', 'figure-four'],
    theme: { en: 'Today we move slowly and spend some time in the hips.', vi: 'Hôm nay chúng ta chuyển động chậm và dành thời gian cho vùng hông.' },
    welcome: 'welcome-6',
  },
  {
    id: 'hamstrings',
    label: { en: 'Hamstrings and forward folds', vi: 'Gân kheo và gập người' },
    keywords: ['hamstring', 'hamstrings', 'forward fold', 'forward folds', 'folds', 'back of the legs', 'backs of the legs', 'gân kheo', 'gan kheo', 'đùi sau', 'mặt sau đùi', 'mặt sau chân', 'gập người', 'gập trước', 'gập về trước'],
    families: ['forward-fold'],
    targets: ['hamstrings'],
    lengthening: ['hamstrings', 'calves'],
    working: [],
    peak: ['standing-forward-fold', 'pyramid-pose', 'wide-legged-fold', 'half-splits', 'seated-forward-fold', 'janu-sirsasana'],
    theme: { en: 'Today we work slowly into the backs of the legs. Bend your knees as much as you need.', vi: 'Hôm nay chúng ta từ từ đi vào mặt sau chân. Chùng gối bao nhiêu tuỳ cần.' },
  },
  {
    id: 'backbends',
    label: { en: 'Backbends and heart opening', vi: 'Uốn lưng và mở ngực' },
    keywords: ['backbend', 'backbends', 'back bend', 'back bends', 'heart opening', 'heart opener', 'heart openers', 'open the heart', 'open the chest', 'chest opening', 'chest', 'uốn lưng', 'ngả sau', 'mở ngực', 'mở tim', 'ngực', 'mở lồng ngực'],
    families: ['backbend'],
    targets: ['chest'],
    lengthening: ['pectoralis-major', 'pectoralis-minor', 'rectus-abdominis', 'iliopsoas'],
    working: ['erector-spinae', 'gluteus-maximus'],
    peak: ['camel-pose', 'bow-pose', 'bridge-pose', 'dancer-pose', 'wild-thing', 'wheel-pose', 'upward-dog'],
    theme: { en: 'Today we open across the front of the body and lift the heart. Keep the lower back long and easy.', vi: 'Hôm nay chúng ta mở phía trước cơ thể và nâng tim lên. Giữ lưng dưới dài và thoải mái.' },
  },
  {
    id: 'shoulders',
    label: { en: 'Shoulders and neck', vi: 'Vai và cổ' },
    keywords: ['shoulder', 'shoulders', 'neck', 'upper back', 'shoulder blades', 'vai', 'bả vai', 'vai gáy', 'cổ vai', 'vùng cổ', 'gáy', 'lưng trên', 'cổ'],
    families: [],
    targets: ['shoulders', 'neck'],
    lengthening: ['trapezius', 'levator-scapulae', 'rhomboids', 'deltoids', 'latissimus-dorsi', 'teres-major', 'pectoralis-major', 'pectoralis-minor'],
    working: ['serratus-anterior', 'rotator-cuff', 'rhomboids'],
    peak: ['puppy-pose', 'thread-the-needle', 'eagle-pose', 'cow-face-pose', 'dolphin-pose', 'melting-heart', 'supported-fish'],
    theme: { en: 'Today we make space in the shoulders and the neck. Let them stay soft all the way through.', vi: 'Hôm nay chúng ta tạo khoảng trống cho vai và cổ. Để chúng mềm suốt buổi tập.' },
  },
  {
    id: 'spine',
    label: { en: 'Spine and twists', vi: 'Cột sống và vặn xoắn' },
    keywords: ['spine', 'twist', 'twists', 'twisting', 'spinal', 'mobility', 'cột sống', 'cot song', 'vặn', 'vặn xoắn', 'xoắn', 'vặn mình', 'linh hoạt', 'lưng'],
    families: ['twist'],
    targets: ['spine'],
    lengthening: ['erector-spinae', 'external-oblique', 'internal-oblique', 'quadratus-lumborum', 'latissimus-dorsi'],
    working: ['external-oblique', 'internal-oblique', 'erector-spinae'],
    peak: ['revolved-triangle', 'revolved-side-angle', 'seated-twist', 'supine-twist', 'side-bend', 'gate-pose', 'cat-pose', 'cow-pose'],
    theme: { en: 'Today we move the spine in every direction: forward, back, to the side, and a twist.', vi: 'Hôm nay chúng ta chuyển động cột sống theo mọi hướng: gập trước, ngả sau, nghiêng bên, và vặn.' },
  },
  {
    id: 'core',
    label: { en: 'Core and strength', vi: 'Cơ lõi và sức mạnh' },
    keywords: ['core', 'abs', 'abdominals', 'strength', 'strong', 'power', 'stability', 'cơ lõi', 'co loi', 'cơ bụng', 'bụng', 'sức mạnh', 'khoẻ', 'khỏe', 'vững'],
    families: ['core', 'arm-balance'],
    targets: [],
    lengthening: [],
    working: ['rectus-abdominis', 'transversus-abdominis', 'external-oblique', 'internal-oblique', 'serratus-anterior', 'iliopsoas'],
    peak: ['boat-pose', 'plank', 'side-plank', 'forearm-plank', 'crow-pose', 'chair-pose'],
    theme: { en: 'Today we build heat and steadiness through the centre of the body. Keep breathing: if the breath stops, ease off.', vi: 'Hôm nay chúng ta tạo nhiệt và sự vững vàng từ trung tâm cơ thể. Tiếp tục thở: nếu hơi thở ngừng lại, nhẹ bớt đi.' },
  },
  {
    id: 'balance',
    label: { en: 'Balance', vi: 'Thăng bằng' },
    keywords: ['balance', 'balances', 'balancing', 'standing balance', 'focus', 'thăng bằng', 'thang bang', 'cân bằng', 'tập trung'],
    families: ['balance'],
    targets: [],
    lengthening: [],
    working: ['gluteus-medius', 'tibialis-posterior', 'fibularis-longus', 'quadriceps'],
    peak: ['tree-pose', 'warrior-3', 'half-moon', 'dancer-pose', 'eagle-pose', 'standing-hand-to-toe'],
    theme: { en: 'Today we play with balance. Wobbling is part of it; find one point to look at and breathe.', vi: 'Hôm nay chúng ta chơi với thăng bằng. Lắc lư là một phần của nó; tìm một điểm để nhìn và thở.' },
  },
  {
    id: 'legs',
    label: { en: 'Strong legs', vi: 'Chân khoẻ' },
    keywords: ['legs', 'leg strength', 'strong legs', 'thighs', 'quads', 'quadriceps', 'standing poses', 'warriors', 'chân', 'đùi', 'đùi trước', 'cơ đùi', 'tư thế đứng', 'chiến binh'],
    families: ['standing'],
    targets: ['quads'],
    lengthening: ['quadriceps'],
    working: ['quadriceps', 'gluteus-maximus', 'gluteus-medius'],
    peak: ['chair-pose', 'warrior-1', 'warrior-2', 'goddess-pose', 'crescent-lunge', 'extended-side-angle'],
    theme: { en: 'Today we stand strong: long holds in the legs, steady breath.', vi: 'Hôm nay chúng ta đứng thật vững: giữ lâu ở chân, hơi thở đều.' },
  },
  {
    id: 'calm',
    label: { en: 'Calm and rest', vi: 'Thư giãn và nghỉ ngơi' },
    keywords: ['calm', 'calming', 'relax', 'relaxing', 'relaxation', 'rest', 'restful', 'restorative', 'stress', 'anxiety', 'anxious', 'sleep', 'evening', 'night', 'slow', 'gentle', 'tired', 'thư giãn', 'thu gian', 'nhẹ nhàng', 'bình an', 'căng thẳng', 'lo âu', 'ngủ', 'mất ngủ', 'buổi tối', 'chậm', 'phục hồi', 'thả lỏng', 'mệt'],
    families: ['restorative', 'supine', 'forward-fold'],
    targets: ['spine', 'hamstrings'],
    lengthening: [],
    working: [],
    peak: ['legs-up-the-wall', 'supported-fish', 'child-pose', 'reclined-bound-angle', 'supine-twist', 'happy-baby', 'caterpillar'],
    level: 'gentle',
    theme: { en: 'Tonight there is nothing to achieve. We slow down, we rest, and we let the breath get long.', vi: 'Tối nay không có gì phải đạt được. Chúng ta chậm lại, nghỉ ngơi, và để hơi thở dài ra.' },
  },
  {
    id: 'energy',
    label: { en: 'Energy and flow', vi: 'Năng lượng và chuyển động' },
    keywords: ['energy', 'energising', 'energizing', 'energetic', 'morning', 'wake up', 'wake-up', 'flow', 'dynamic', 'sweat', 'sweaty', 'cardio', 'năng lượng', 'nang luong', 'buổi sáng', 'tỉnh táo', 'năng động', 'đổ mồ hôi', 'nóng'],
    families: ['sun-salutation', 'standing', 'backbend'],
    targets: [],
    lengthening: [],
    working: ['quadriceps', 'deltoids', 'erector-spinae'],
    peak: ['chair-pose', 'warrior-1', 'crescent-lunge', 'upward-dog', 'wild-thing', 'humble-warrior'],
    sunRounds: 2,
    theme: { en: 'This morning we wake the body up: a few rounds of sun salutations, then strong standing poses.', vi: 'Sáng nay chúng ta đánh thức cơ thể: vài vòng chào mặt trời, rồi các tư thế đứng mạnh.' },
  },
  {
    id: 'flexibility',
    label: { en: 'Flexibility', vi: 'Dẻo dai' },
    keywords: ['flexibility', 'flexible', 'stretch', 'stretching', 'stretches', 'deep stretch', 'dẻo', 'dẻo dai', 'deo dai', 'kéo giãn', 'giãn cơ', 'mềm dẻo', 'giãn'],
    families: ['forward-fold', 'hip-opener'],
    targets: ['hamstrings', 'hips', 'inner-thighs', 'quads'],
    lengthening: ['hamstrings', 'hip-adductors', 'iliopsoas', 'quadriceps', 'calves'],
    working: [],
    peak: ['half-splits', 'pigeon', 'wide-legged-fold', 'bound-angle', 'low-lunge', 'reclined-hand-to-toe'],
    theme: { en: 'Today we stretch slowly and stay a little longer. Go to where you feel it, not past it.', vi: 'Hôm nay chúng ta kéo giãn chậm và ở lại lâu hơn một chút. Đi đến nơi bạn cảm nhận được, đừng vượt quá.' },
  },
  {
    id: 'inversions',
    label: { en: 'Inversions and arm balances', vi: 'Đảo ngược và thăng bằng tay' },
    keywords: ['inversion', 'inversions', 'upside down', 'handstand', 'headstand', 'arm balance', 'arm balances', 'crow', 'đảo ngược', 'dao nguoc', 'trồng chuối', 'thăng bằng tay', 'con quạ'],
    families: ['inversion', 'arm-balance'],
    targets: [],
    lengthening: [],
    working: ['deltoids', 'serratus-anterior', 'triceps-brachii', 'transversus-abdominis'],
    peak: ['dolphin-pose', 'crow-pose', 'headstand', 'handstand', 'shoulderstand', 'forearm-plank'],
    level: 'strong',
    theme: { en: 'Today we go upside down. We build it step by step, and the wall is always there.', vi: 'Hôm nay chúng ta lộn ngược. Chúng ta xây từng bước một, và bức tường luôn ở đó.' },
  },
  {
    id: 'feet',
    label: { en: 'Feet and ankles', vi: 'Bàn chân và cổ chân' },
    keywords: ['feet', 'foot', 'ankles', 'toes', 'arches', 'bàn chân', 'ban chan', 'cổ chân', 'ngón chân', 'gót chân', 'lòng bàn chân'],
    families: [],
    targets: ['feet'],
    lengthening: ['plantar-fascia', 'tibialis-anterior', 'calves', 'achilles-tendon'],
    working: ['tibialis-posterior', 'fibularis-longus', 'tibialis-anterior'],
    peak: ['toe-squat', 'ankle-stretch', 'tree-pose', 'squat', 'hero-pose', 'mountain-pose'],
    theme: { en: 'Today we start from the ground: the feet, the ankles, and how we stand.', vi: 'Hôm nay chúng ta bắt đầu từ mặt đất: bàn chân, cổ chân, và cách chúng ta đứng.' },
  },
  {
    id: 'breath',
    label: { en: 'Breath and pranayama', vi: 'Hơi thở và pranayama' },
    keywords: ['breath', 'breathing', 'pranayama', 'ujjayi', 'hơi thở', 'hoi tho', 'thở', 'pranayama', 'luyện thở'],
    families: ['restorative', 'seated'],
    targets: ['chest', 'spine'],
    lengthening: ['pectoralis-major', 'rectus-abdominis'],
    working: ['diaphragm'],
    peak: ['bound-angle', 'hero-pose', 'supported-fish', 'fish-pose', 'cat-pose', 'cow-pose'],
    pranayama: true,
    theme: { en: 'Today the breath leads. Every movement waits for an inhale or an exhale.', vi: 'Hôm nay hơi thở dẫn dắt. Mọi chuyển động đều chờ một hơi hít vào hoặc thở ra.' },
  },
  {
    id: 'meditation',
    label: { en: 'Meditation and stillness', vi: 'Thiền và tĩnh lặng' },
    keywords: ['meditation', 'meditate', 'mindfulness', 'mindful', 'vipassana', 'stillness', 'thiền', 'thien', 'chánh niệm', 'tĩnh lặng', 'vipassana', 'quán'],
    families: ['seated', 'restorative'],
    targets: ['hips', 'spine'],
    lengthening: ['hip-adductors', 'erector-spinae'],
    working: [],
    peak: ['hero-pose', 'bound-angle', 'lotus', 'butterfly', 'child-pose'],
    meditation: true,
    level: 'gentle',
    theme: { en: 'Today we move only enough to sit still. The practice is the sitting at the end.', vi: 'Hôm nay chúng ta chỉ chuyển động vừa đủ để ngồi yên. Buổi tập chính là lúc ngồi thiền cuối giờ.' },
  },
]

export const CAUTIONS = [
  {
    id: 'knee',
    label: { en: 'Knees', vi: 'Đầu gối' },
    keywords: ['knee', 'knees', 'knee pain', 'bad knee', 'gối', 'đầu gối', 'dau goi', 'đau gối'],
    match: /\bknee/i,
    terms: ['knee', 'kneecap', 'femur', 'shin-bone', 'flexion'],
    avoid: ['hero-pose', 'reclined-hero', 'lotus', 'bound-lotus', 'lotus-in-shoulderstand', 'saddle', 'half-saddle', 'toe-squat', 'squat', 'malasana', 'half-bound-lotus-standing', 'half-bound-lotus-forward-fold', 'embryo-pose', 'tortoise-pose', 'rooster-pose', 'uplifting-pose', 'camel-pose', 'crow-pose'],
    avoidFamilies: [],
    prefer: ['cat-pose', 'cow-pose', 'bridge-pose', 'reclined-hand-to-toe', 'legs-up-the-wall', 'supine-twist', 'staff-pose', 'caterpillar'],
    lines: ['inj-10', 'safe-1', 'safe-3'],
  },
  {
    id: 'lower-back',
    label: { en: 'Lower back', vi: 'Lưng dưới' },
    keywords: ['lower back', 'low back', 'back pain', 'bad back', 'lumbar', 'sciatica', 'disc', 'lưng dưới', 'lung duoi', 'đau lưng', 'dau lung', 'thắt lưng', 'thoát vị', 'đau thần kinh toạ', 'đau thần kinh tọa'],
    match: /lower back|lumbar/i,
    terms: ['lumbar-spine', 'sacrum', 'pelvic-tilt', 'erector-spinae', 'quadratus-lumborum'],
    avoid: ['wheel-pose', 'setu-bandhasana', 'bow-pose', 'camel-pose', 'wild-thing', 'upward-facing-forward-fold', 'tortoise-pose', 'plow-pose', 'ear-pressure-pose', 'seal', 'boat-pose', 'extended-leg-pose', 'revolved-triangle', 'dangling', 'standing-forward-fold'],
    avoidFamilies: [],
    prefer: ['cat-pose', 'cow-pose', 'child-pose', 'bridge-pose', 'sphinx', 'figure-four', 'happy-baby', 'supine-twist', 'reclined-hand-to-toe'],
    lines: ['safe-1', 'safe-3'],
  },
  {
    id: 'wrist',
    label: { en: 'Wrists', vi: 'Cổ tay' },
    keywords: ['wrist', 'wrists', 'carpal tunnel', 'cổ tay', 'co tay', 'đau cổ tay'],
    match: /\bwrist/i,
    terms: ['wrist', 'hands', 'forearm-flexors', 'forearm-extensors'],
    avoid: ['crow-pose', 'handstand', 'wheel-pose', 'upward-plank', 'side-plank', 'plank', 'chaturanga', 'upward-dog', 'rooster-pose', 'shoulder-pressing-pose', 'uplifting-pose', 'wild-thing', 'hand-under-foot-pose', 'seal'],
    avoidFamilies: ['arm-balance'],
    prefer: ['forearm-plank', 'dolphin-pose', 'sphinx', 'puppy-pose', 'cat-pose', 'cow-pose', 'bridge-pose', 'melting-heart'],
    lines: ['safe-2', 'props-2'],
  },
  {
    id: 'neck',
    label: { en: 'Neck', vi: 'Cổ' },
    keywords: ['neck', 'neck pain', 'stiff neck', 'cervical', 'đau cổ', 'dau co', 'cứng cổ', 'đốt sống cổ', 'vẹo cổ'],
    match: /\bneck/i,
    terms: ['cervical-spine', 'sternocleidomastoid', 'trapezius', 'levator-scapulae'],
    avoid: ['shoulderstand', 'plow-pose', 'ear-pressure-pose', 'lotus-in-shoulderstand', 'headstand', 'snail', 'fish-pose', 'extended-leg-pose', 'camel-pose', 'wheel-pose', 'setu-bandhasana', 'both-big-toes-pose', 'reclined-angle-pose', 'handstand'],
    avoidFamilies: [],
    prefer: ['thread-the-needle', 'cat-pose', 'cow-pose', 'puppy-pose', 'child-pose', 'supported-fish', 'legs-up-the-wall', 'supine-twist'],
    lines: ['safe-3', 'safe-7'],
  },
  {
    id: 'shoulder',
    label: { en: 'Shoulders', vi: 'Vai' },
    keywords: ['shoulder injury', 'shoulder pain', 'bad shoulder', 'rotator cuff', 'frozen shoulder', 'đau vai', 'dau vai', 'chấn thương vai', 'viêm quanh khớp vai', 'cứng vai'],
    match: /\bshoulder/i,
    terms: ['shoulder-joint', 'rotator-cuff', 'shoulder-blades', 'deltoids'],
    avoid: ['chaturanga', 'handstand', 'wheel-pose', 'upward-plank', 'wild-thing', 'shoulderstand', 'plow-pose', 'headstand', 'crow-pose', 'eagle-pose', 'cow-face-pose', 'bound-lotus', 'half-bound-lotus-standing', 'half-bound-lotus-forward-fold', 'marichyasana', 'humble-warrior'],
    avoidFamilies: ['arm-balance'],
    prefer: ['cat-pose', 'cow-pose', 'thread-the-needle', 'sphinx', 'bridge-pose', 'child-pose', 'legs-up-the-wall', 'supine-twist'],
    lines: ['safe-3', 'inj-10'],
  },
  {
    id: 'pregnancy',
    label: { en: 'Pregnancy', vi: 'Mang thai' },
    keywords: ['pregnant', 'pregnancy', 'expecting', 'prenatal', 'mang thai', 'mang bầu', 'có thai', 'có bầu', 'bầu', 'thai kỳ', 'bà bầu'],
    match: /pregnan/i,
    terms: [],
    avoid: ['cobra', 'locust-pose', 'bow-pose', 'sphinx', 'seal', 'upward-dog', 'boat-pose', 'revolved-triangle', 'revolved-side-angle', 'marichyasana', 'seated-twist', 'wheel-pose', 'headstand', 'shoulderstand', 'plow-pose', 'handstand', 'crow-pose', 'snail', 'happy-baby', 'frog', 'cat-pulling-its-tail', 'plank', 'forearm-plank', 'side-plank', 'chaturanga', 'embryo-pose', 'tortoise-pose'],
    avoidFamilies: ['prone', 'inversion', 'arm-balance', 'core'],
    prefer: ['cat-pose', 'cow-pose', 'bound-angle', 'wide-legged-fold', 'goddess-pose', 'warrior-2', 'tree-pose', 'child-pose', 'side-bend', 'legs-up-the-wall'],
    lines: ['inj-3', 'safe-6'],
  },
  {
    id: 'hip',
    label: { en: 'Hips (pain or a replacement)', vi: 'Hông đau hoặc đã thay khớp' },
    keywords: ['hip pain', 'hip replacement', 'hip injury', 'bad hip', 'sore hip', 'đau hông', 'dau hong', 'đau háng', 'thay khớp háng', 'chấn thương hông'],
    match: /\bhip\b|\bhips\b/i,
    terms: ['hip-joint', 'iliopsoas', 'piriformis', 'gluteus-medius', 'hip-adductors'],
    avoid: ['lotus', 'bound-lotus', 'half-bound-lotus-standing', 'half-bound-lotus-forward-fold', 'frog', 'square', 'shoelace', 'cow-face-pose', 'eagle-pose', 'marichyasana', 'embryo-pose', 'tortoise-pose', 'wide-angle-seated-fold', 'dragonfly'],
    avoidFamilies: [],
    prefer: ['cat-pose', 'cow-pose', 'bridge-pose', 'reclined-hand-to-toe', 'low-lunge', 'warrior-2', 'tree-pose', 'legs-up-the-wall', 'savasana'],
    lines: ['inj-4', 'inj-11', 'safe-3'],
  },
  {
    id: 'hamstring',
    label: { en: 'A hamstring injury', vi: 'Chấn thương gân kheo' },
    keywords: ['hamstring injury', 'pulled hamstring', 'torn hamstring', 'hamstring tear', 'hamstring strain', 'rách gân kheo', 'đau gân kheo', 'đau đùi sau', 'căng cơ đùi sau', 'chấn thương gân kheo'],
    match: /hamstring/i,
    terms: ['hamstrings', 'sit-bones'],
    avoid: ['half-splits', 'pyramid-pose', 'big-toe-pose', 'hand-under-foot-pose', 'standing-hand-to-toe', 'upward-facing-forward-fold', 'both-big-toes-pose', 'reclined-angle-pose', 'tortoise-pose', 'dangling', 'caterpillar', 'half-butterfly', 'dragonfly'],
    avoidFamilies: [],
    prefer: ['bridge-pose', 'locust-pose', 'warrior-2', 'tree-pose', 'cat-pose', 'cow-pose', 'bound-angle', 'supine-twist'],
    lines: ['safe-1', 'props-3', 'safe-3'],
  },
  {
    id: 'blood-pressure',
    label: { en: 'Blood pressure, eyes', vi: 'Huyết áp, mắt' },
    keywords: ['blood pressure', 'high blood pressure', 'low blood pressure', 'hypertension', 'glaucoma', 'dizzy', 'dizziness', 'huyết áp', 'huyet ap', 'cao huyết áp', 'tăng nhãn áp', 'chóng mặt', 'hoa mắt'],
    match: /blood pressure|glaucoma|eye pressure/i,
    terms: [],
    avoid: ['headstand', 'shoulderstand', 'plow-pose', 'ear-pressure-pose', 'lotus-in-shoulderstand', 'handstand', 'snail', 'dolphin-pose', 'wide-legged-fold', 'dangling', 'standing-forward-fold', 'humble-warrior', 'reclined-angle-pose'],
    avoidFamilies: ['inversion'],
    prefer: ['mountain-pose', 'warrior-2', 'tree-pose', 'cat-pose', 'cow-pose', 'bound-angle', 'supine-twist', 'reclined-bound-angle'],
    lines: ['safe-7', 'safe-8'],
  },
  {
    id: 'ankle',
    label: { en: 'Ankles', vi: 'Cổ chân' },
    keywords: ['ankle', 'ankles', 'sprained ankle', 'sprain', 'cổ chân', 'co chan', 'mắt cá', 'bong gân', 'đau cổ chân', 'trật cổ chân'],
    match: /\bankle/i,
    terms: ['ankle', 'achilles-tendon', 'calves', 'dorsiflexion', 'plantar-flexion'],
    avoid: ['toe-squat', 'ankle-stretch', 'hero-pose', 'reclined-hero', 'squat', 'malasana', 'tree-pose', 'warrior-3', 'half-moon', 'dancer-pose', 'eagle-pose', 'standing-hand-to-toe', 'half-bound-lotus-standing', 'saddle', 'half-saddle'],
    avoidFamilies: [],
    prefer: ['cat-pose', 'cow-pose', 'bridge-pose', 'reclined-hand-to-toe', 'bound-angle', 'seated-twist', 'supine-twist', 'legs-up-the-wall'],
    lines: ['props-6', 'safe-3'],
  },
]

/**
 * Poses done once on each side. Read off the cues ("your right knee",
 * "other side") and corrected by hand: Savasana says "roll onto your right
 * side" but has no second side, and Half Moon never names a side yet has
 * two. A pose that is not here is held once.
 */
export const TWO_SIDED = new Set([
  'warrior-1', 'warrior-2', 'warrior-3', 'triangle', 'revolved-triangle', 'extended-side-angle', 'revolved-side-angle',
  'pyramid-pose', 'standing-hand-to-toe', 'half-bound-lotus-standing', 'half-bound-lotus-forward-fold', 'three-limb-forward-fold',
  'janu-sirsasana', 'marichyasana', 'reclined-hand-to-toe', 'side-plank', 'low-lunge', 'crescent-lunge', 'reverse-warrior',
  'humble-warrior', 'side-bend', 'tree-pose', 'eagle-pose', 'half-moon', 'dancer-pose', 'wild-thing', 'lizard-pose', 'half-splits',
  'pigeon', 'figure-four', 'gate-pose', 'cow-face-pose', 'thread-the-needle', 'seated-twist', 'supine-twist',
  'swan', 'sleeping-swan', 'shoelace', 'square', 'dragon', 'half-butterfly', 'deer', 'cat-pulling-its-tail', 'bananasana',
  'reclined-twist', 'half-saddle',
])

/**
 * Where each pose is done, so a class moves down to the floor and does not
 * climb back up: standing, kneeling (all fours, lunges, Pigeon), seated,
 * prone (on the belly), supine (on the back). A pose not listed takes its
 * family's posture (standing, balance and sun salutations stand; seated,
 * forward folds, hip openers and twists sit; prone and supine as named).
 */
export const POSTURES = {
  standing: ['standing-forward-fold', 'half-lift', 'hand-under-foot-pose', 'big-toe-pose', 'revolved-triangle', 'revolved-side-angle', 'pyramid-pose', 'wide-legged-fold', 'chair-pose', 'goddess-pose', 'eagle-pose', 'malasana', 'squat', 'dangling', 'upward-salute', 'mountain-pose', 'standing-hand-to-toe', 'half-bound-lotus-standing', 'crescent-lunge', 'low-lunge', 'downward-dog', 'handstand'],
  kneeling: ['cat-pose', 'cow-pose', 'child-pose', 'puppy-pose', 'thread-the-needle', 'camel-pose', 'hero-pose', 'gate-pose', 'melting-heart', 'swan', 'sleeping-swan', 'dragon', 'toe-squat', 'ankle-stretch', 'saddle', 'half-saddle', 'plank', 'forearm-plank', 'side-plank', 'chaturanga', 'dolphin-pose', 'crow-pose', 'headstand', 'lizard-pose', 'half-splits', 'pigeon', 'wild-thing'],
  seated: ['staff-pose', 'seated-forward-fold', 'upward-plank', 'half-bound-lotus-forward-fold', 'three-limb-forward-fold', 'janu-sirsasana', 'marichyasana', 'boat-pose', 'shoulder-pressing-pose', 'tortoise-pose', 'embryo-pose', 'rooster-pose', 'bound-angle', 'wide-angle-seated-fold', 'both-big-toes-pose', 'upward-facing-forward-fold', 'bound-lotus', 'lotus', 'uplifting-pose', 'seated-twist', 'cow-face-pose', 'butterfly', 'half-butterfly', 'dragonfly', 'caterpillar', 'shoelace', 'square', 'deer'],
  prone: ['cobra', 'locust-pose', 'bow-pose', 'sphinx', 'seal', 'upward-dog', 'frog'],
  supine: ['bridge-pose', 'wheel-pose', 'setu-bandhasana', 'fish-pose', 'extended-leg-pose', 'shoulderstand', 'plow-pose', 'ear-pressure-pose', 'lotus-in-shoulderstand', 'reclined-angle-pose', 'reclined-hand-to-toe', 'figure-four', 'happy-baby', 'reclined-bound-angle', 'supine-twist', 'cat-pulling-its-tail', 'snail', 'bananasana', 'reclined-twist', 'supported-fish', 'legs-up-the-wall', 'savasana', 'reclined-hero'],
}

/**
 * Where the voice can take a class from one moment to the next. Phrase ids
 * from content/phrases.js; the Class Builder plays them between poses.
 */
export const BRIDGES = {
  otherSide: 'trans-6',
  vinyasa: 'trans-3',
  vinyasaOrRest: 'trans-9',
  toStanding: 'trans-5',
  toAllFours: 'trans-2',
  toBelly: 'trans-7',
  toBack: 'trans-8',
  stepForward: 'trans-1',
  fiveBreaths: 'trans-10',
  lastBreath: 'trans-11',
  release: 'breath-8',
}

/** The moments a class opens and closes with, as phrase ids. */
export const MOMENTS = {
  arrive: ['welcome-1', 'welcome-2', 'welcome-4', 'welcome-5'],
  arriveYin: ['welcome-1', 'welcome-2', 'yin-7', 'yin-1', 'yin-2'],
  arriveAshtanga: ['welcome-1', 'welcome-2', 'mantra-open-1', 'mantra-open-2', 'mantra-open-3', 'mantra-open-4'],
  pranayama: ['pran-1', 'pran-2', 'pran-7', 'pran-11'],
  yinHold: ['yin-3', 'yin-4', 'yin-5', 'yin-9', 'yin-6'],
  savasana: 'savasana',
  meditation: 'meditation',
  close: ['close-1', 'close-6', 'close-2', 'close-3'],
  closeAshtanga: ['mantra-close-1', 'mantra-close-2', 'mantra-close-3', 'close-2', 'close-4'],
  student: ['inj-4', 'inj-9', 'safe-3', 'props-8'],
}
