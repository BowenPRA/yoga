/**
 * A thought for the class: one line from a text she teaches from, quoted
 * word for word from a translation that is free to quote (public domain or
 * CC0, see content/sources.js), with what it means and one sentence she can
 * say to the class in her own words. The Class Builder offers one per plan,
 * matched to the theme.
 *
 * The Vietnamese under a quote is this app's rendering of the English, not a
 * published translation; the page says so.
 *
 * { id, source (a SOURCES id), ref (where in the text), lang: 'sa' | 'pi',
 *   term (the key phrase in IAST), say (stress respelling),
 *   quote: { en (verbatim), vi }, meaning?: { en, vi },
 *   inClass: { en, vi } (her own sentence; `line` names a phrase clip that says it),
 *   goals: [goal ids it suits], styles?: [styles it suits] }
 */
export const THEMES = [
  {
    id: 'ys-2-46', source: 'yoga-sutras', ref: 'Yoga Sutras 2.46', lang: 'sa',
    term: 'sthira-sukham āsanam', say: 'STEE-ruh SOO-kum AH-suh-num',
    quote: { en: 'Right poise must be firm and without strain.', vi: 'Tư thế phải vững vàng và không gắng sức.' },
    meaning: { en: 'Patañjali’s only words about the pose itself: steady, and at ease.', vi: 'Lời duy nhất của Patañjali về chính tư thế: vững, và thoải mái.' },
    inClass: { en: 'Patanjali says a pose should be sthira and sukha: steady and easy.', vi: 'Patanjali nói tư thế cần sthira và sukha: vững vàng và thoải mái.' },
    line: 'phil-7',
    goals: ['balance', 'legs', 'feet', 'core', 'spine'],
  },
  {
    id: 'ys-2-47', source: 'yoga-sutras', ref: 'Yoga Sutras 2.47', lang: 'sa',
    term: 'prayatna-śaithilya', say: 'pruh-YUT-nuh SHY-til-yuh',
    quote: { en: 'Right poise is to be gained by steady and temperate effort, and by setting the heart upon the everlasting.', vi: 'Tư thế vững có được nhờ nỗ lực đều đặn và chừng mực, và nhờ hướng lòng về điều bất biến.' },
    meaning: { en: 'Loosen the effort. The pose comes from less strain, not more.', vi: 'Buông bớt sự gắng sức. Tư thế đến từ việc bớt căng, không phải thêm.' },
    inClass: { en: 'Make a little less effort than you think you need, and let the breath do the rest.', vi: 'Hãy gắng sức ít hơn bạn nghĩ một chút, và để hơi thở làm phần còn lại.' },
    goals: ['flexibility', 'hamstrings', 'hips', 'shoulders'], styles: ['yin'],
  },
  {
    id: 'ys-1-2', source: 'yoga-sutras', ref: 'Yoga Sutras 1.2', lang: 'sa',
    term: 'yogaś citta-vṛtti-nirodhaḥ', say: 'YOH-gush CHIT-tuh VRIT-tee nee-ROH-duh',
    quote: { en: 'Union, spiritual consciousness, is gained through control of the versatile psychic nature.', vi: 'Yoga đạt được khi làm chủ được những dao động của tâm.' },
    meaning: { en: 'The famous definition: yoga is the stilling of the movements of the mind. Johnston’s English is heavier than the Sanskrit.', vi: 'Định nghĩa nổi tiếng: yoga là làm lắng dịu những dao động của tâm. Bản tiếng Anh của Johnston nặng nề hơn câu Sanskrit.' },
    inClass: { en: 'Patanjali defines yoga as the stilling of the movements of the mind.', vi: 'Patanjali định nghĩa yoga là làm lắng dịu những dao động của tâm.' },
    line: 'phil-3',
    goals: ['meditation', 'calm'],
  },
  {
    id: 'ys-1-14', source: 'yoga-sutras', ref: 'Yoga Sutras 1.14', lang: 'sa',
    term: 'abhyāsa', say: 'ub-YAH-suh',
    quote: { en: 'This becomes a firm resting-place, when followed long, persistently, with earnestness.', vi: 'Sự luyện tập trở nên vững chắc khi được theo đuổi lâu dài, liên tục, với lòng thành.' },
    meaning: { en: 'Practice (abhyāsa) takes root only with time and steadiness.', vi: 'Sự luyện tập (abhyāsa) chỉ bén rễ nhờ thời gian và sự đều đặn.' },
    inClass: { en: 'Practice becomes steady when you keep coming back to it, week after week.', vi: 'Sự luyện tập trở nên vững khi bạn tiếp tục quay lại với nó, tuần này qua tuần khác.' },
    goals: ['inversions', 'core', 'energy'], styles: ['ashtanga'],
  },
  {
    id: 'ys-1-33', source: 'yoga-sutras', ref: 'Yoga Sutras 1.33', lang: 'sa',
    term: 'maitrī, karuṇā, muditā, upekṣā', say: 'MY-tree, kuh-roo-NAH, moo-dee-TAH, oo-PAYK-shah',
    quote: { en: 'By sympathy with the happy, compassion for the sorrowful, delight in the holy, disregard of the unholy, the psychic nature moves to gracious peace.', vi: 'Vui với người hạnh phúc, thương người đau khổ, mừng cho người tốt, bình thản trước người xấu: tâm trở nên an hoà.' },
    meaning: { en: 'The four attitudes she already knows as tứ vô lượng tâm: từ, bi, hỷ, xả.', vi: 'Bốn tâm thái bạn đã biết là tứ vô lượng tâm: từ, bi, hỷ, xả.' },
    inClass: { en: 'Bring a little kindness to the person on the mat next to you, and to yourself.', vi: 'Mang một chút tử tế đến người tập bên cạnh bạn, và đến chính bạn.' },
    goals: ['calm', 'meditation'],
  },
  {
    id: 'ys-1-34', source: 'yoga-sutras', ref: 'Yoga Sutras 1.34', lang: 'sa',
    term: 'prāṇa', say: 'PRAH-nuh',
    quote: { en: 'Or peace may be reached by the even sending forth and control of the life-breath.', vi: 'Hoặc sự an tĩnh có thể đến nhờ thở ra đều đặn và làm chủ hơi thở.' },
    inClass: { en: 'Make the exhale long and even, and let the mind follow the breath.', vi: 'Thở ra dài và đều, rồi để tâm theo hơi thở.' },
    goals: ['breath', 'calm'],
  },
  {
    id: 'ys-2-35', source: 'yoga-sutras', ref: 'Yoga Sutras 2.35', lang: 'sa',
    term: 'ahiṃsā', say: 'uh-HIM-sah',
    quote: { en: 'Where non-injury is perfected, all enmity ceases in the presence of him who possesses it.', vi: 'Khi không gây hại trở nên trọn vẹn, mọi thù địch đều tan biến trước mặt người ấy.' },
    meaning: { en: 'Non-harming begins with your own body on the mat.', vi: 'Không gây hại bắt đầu từ chính cơ thể bạn trên thảm.' },
    inClass: { en: 'Our theme today is ahimsa, non-harming. Let it begin with how you treat your own body.', vi: 'Chủ đề hôm nay là ahimsa, không gây hại. Hãy bắt đầu từ cách bạn đối xử với chính cơ thể mình.' },
    line: 'phil-4',
    goals: ['hips', 'flexibility', 'hamstrings', 'student'],
  },
  {
    id: 'ys-2-42', source: 'yoga-sutras', ref: 'Yoga Sutras 2.42', lang: 'sa',
    term: 'santoṣa', say: 'sun-TOH-shuh',
    quote: { en: 'From acceptance, the disciple gains happiness supreme.', vi: 'Từ sự chấp nhận, người tập có được hạnh phúc tối thượng.' },
    inClass: { en: 'Today’s theme is santosha, contentment. Can you be happy with the pose you have today?', vi: 'Chủ đề hôm nay là santosha, sự hài lòng. Bạn có thể vui với tư thế mình có hôm nay không?' },
    line: 'phil-5',
    goals: ['balance', 'backbends', 'inversions'],
  },
  {
    id: 'hyp-1-66', source: 'hyp', ref: 'Hatha Yoga Pradipika 1.66 (Sinh’s numbering; 1.64 in most editions)', lang: 'sa',
    term: 'haṭha', say: 'HUH-tuh',
    quote: { en: 'Whether young, old or too old, sick or lean, one who discards laziness, gets success if he practises Yoga.', vi: 'Dù trẻ, già hay rất già, ốm yếu hay gầy gò, ai bỏ được sự lười biếng sẽ thành công nếu chuyên cần tập yoga.' },
    inClass: { en: 'It doesn’t matter how old you are or how stiff you feel. What matters is that you came.', vi: 'Không quan trọng bạn bao nhiêu tuổi hay cứng đến đâu. Quan trọng là bạn đã đến.' },
    goals: ['energy', 'legs', 'flexibility'], styles: ['vinyasa'],
  },
  {
    id: 'hyp-2-2', source: 'hyp', ref: 'Hatha Yoga Pradipika 2.2', lang: 'sa',
    term: 'prāṇāyāma', say: 'PRAH-nah-YAH-muh',
    quote: { en: 'Respiration being disturbed, the mind becomes disturbed. By restraining respiration, the Yogî gets steadiness of mind.', vi: 'Hơi thở rối thì tâm rối. Làm chủ được hơi thở, người tập yoga có được sự vững vàng của tâm.' },
    inClass: { en: 'When the breath is steady, the mind is steady. If you lose the breath, you’ve gone too far.', vi: 'Khi hơi thở đều, tâm sẽ đều. Nếu mất hơi thở, bạn đã đi quá xa.' },
    goals: ['breath', 'core', 'energy'],
  },
  {
    id: 'gita-2-47', source: 'gita', ref: 'Bhagavad Gita 2.47', lang: 'sa',
    term: 'karma-yoga', say: 'KAR-muh YOH-guh',
    quote: { en: 'Your business is with action alone; not by any means with fruit.', vi: 'Việc của bạn là hành động, không phải là kết quả.' },
    inClass: { en: 'Do the pose for the doing, not for how it looks. The result is not your business today.', vi: 'Tập tư thế vì chính việc tập, không phải vì hình dáng. Hôm nay, kết quả không phải việc của bạn.' },
    goals: ['inversions', 'core', 'energy', 'balance'],
  },
  {
    id: 'gita-2-48', source: 'gita', ref: 'Bhagavad Gita 2.48', lang: 'sa',
    term: 'samatvaṃ yoga ucyate', say: 'suh-MUT-vum YOH-guh OOCH-yuh-tay',
    quote: { en: '…being equable in success or ill-success; (such) equability is called devotion.', vi: '…giữ tâm bình thản dù thành hay bại; sự bình thản ấy được gọi là yoga.' },
    meaning: { en: 'Telang’s "devotion" is the Sanskrit yoga: yoga is evenness of mind.', vi: 'Chữ "devotion" của Telang chính là yoga trong tiếng Sanskrit: yoga là sự bình thản của tâm.' },
    inClass: { en: 'Yoga is evenness of mind: the same breath when the pose comes, and when it doesn’t.', vi: 'Yoga là sự bình thản của tâm: cùng một hơi thở khi vào được tư thế, và khi không.' },
    goals: ['balance', 'backbends', 'shoulders'],
  },
  {
    id: 'mn10-4-3', source: 'suttacentral', ref: 'Satipaṭṭhāna Sutta, MN 10, tr. Sujato', lang: 'pi',
    term: 'sato va assasati, sato va passasati', say: 'SUH-toh-vuh US-suh-suh-tee, SUH-toh-vuh PUS-suh-suh-tee',
    quote: { en: 'Just mindful, they breathe in. Mindful, they breathe out.', vi: 'Chánh niệm, vị ấy thở vào. Chánh niệm, vị ấy thở ra.' },
    meaning: { en: 'Pali: So satova assasati, satova passasati. The first instruction of mindfulness of breathing.', vi: 'Pali: So satova assasati, satova passasati. Lời chỉ dẫn đầu tiên về niệm hơi thở.' },
    inClass: { en: 'Just notice. Breathing in, you know you’re breathing in. Breathing out, you know you’re breathing out.', vi: 'Chỉ cần nhận biết. Thở vào, bạn biết mình đang thở vào. Thở ra, bạn biết mình đang thở ra.' },
    goals: ['meditation', 'breath', 'calm'],
  },
  {
    id: 'snp-1-8', source: 'suttacentral', ref: 'Mettā Sutta, Snp 1.8, tr. Sujato', lang: 'pi',
    term: 'sabbe sattā bhavantu sukhitattā', say: 'SUB-bay SUT-tah buh-VUN-too soo-kee-TUT-tah',
    quote: { en: 'May all beings be happy!', vi: 'Nguyện cho tất cả chúng sinh được an vui.' },
    meaning: { en: 'Pali: Sabbasattā bhavantu sukhitattā. The line Vietnamese Buddhists know as a wish of từ, loving-kindness.', vi: 'Pali: Sabbasattā bhavantu sukhitattā. Câu mà người Phật tử Việt biết như một lời nguyện của tâm từ.' },
    inClass: { en: 'As we close, send a little of this ease to everyone in the room, and then to everyone outside it.', vi: 'Khi kết thúc, hãy gửi một chút sự an ổn này đến mọi người trong phòng, rồi đến mọi người ngoài kia.' },
    goals: ['calm', 'meditation', 'student'],
  },
]

const byId = new Map(THEMES.map((t) => [t.id, t]))
export const getTheme = (id) => byId.get(id)

/**
 * The thoughts that suit a plan, best first: those naming one of its goals
 * (the first goal counts most), then those for its style, then the rest.
 * `seed` rotates the order so "another thought" and another class differ.
 */
export function themesFor({ goals = [], style, mode } = {}, seed = 0) {
  const want = mode === 'student' ? ['student', ...goals] : goals
  const score = (t) => {
    let s = 0
    want.forEach((g, i) => { if (t.goals.includes(g)) s += i === 0 ? 4 : 2 })
    if (t.styles?.includes(style)) s += 1
    return s
  }
  const ranked = THEMES.map((t, i) => ({ t, s: score(t), i })).sort((a, b) => b.s - a.s || a.i - b.i)
  const top = ranked.filter((x) => x.s === ranked[0].s)
  const rest = ranked.filter((x) => x.s !== ranked[0].s)
  const k = top.length ? Math.abs(seed) % top.length : 0
  return [...top.slice(k), ...top.slice(0, k), ...rest].map((x) => x.t)
}
