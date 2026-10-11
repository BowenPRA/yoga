/**
 * Where the app's content comes from, so she can say "this comes from
 * somewhere": the classical texts that first describe a pose, the modern
 * references every teacher training uses, the official sites of the
 * traditions, the public-domain translations the thoughts quote, and the
 * anatomy the figure is drawn from. Every entry is free to read online or
 * a book any library has; `licence` says what may be reused and on what
 * terms. A pose file names the texts and pages that describe it in `refs`;
 * a concept card in content/phrases.js names its own `source`; a thought
 * (content/themes.js) names the text it quotes.
 *
 * What is NOT taken from anywhere: the cues, modifications, safety lines,
 * the Vietnamese, and the class plans. Those were written for this app in the
 * register of a native teacher, checked against the references below, and
 * are corrected through "Suggest a fix". The `own` entry says so on the page.
 *
 * An entry: { id, covers: [area], title, by, year?, url, licence, note: { en, vi } }
 *   covers   'poses' | 'ashtanga' | 'yin' | 'sequencing' | 'safety' | 'philosophy' | 'meditation' | 'vietnamese' | 'anatomy' | 'own'
 *   licence  'Public domain' | 'CC0' | 'CC BY-NC-SA 4.0' | 'CC BY-SA 4.0' | 'Free to read' | 'Book'
 *            ("Free to read" is copyrighted text anyone can open and cite, but not copy;
 *             "Book" is a reference work cited by title, with no link)
 */
export const AREAS = ['poses', 'ashtanga', 'yin', 'sequencing', 'safety', 'philosophy', 'meditation', 'vietnamese', 'anatomy', 'own']

export const SOURCES = [
  // ── The classical texts ───────────────────────────────────────────────
  {
    id: 'hyp', covers: ['poses', 'philosophy'],
    title: 'Haṭha Yoga Pradīpikā', by: 'Svātmārāma (15th century), translated by Pancham Sinh', year: 1914, url: 'https://sacred-texts.com/hin/hyp/', licence: 'Public domain',
    note: {
      en: 'The oldest surviving manual of hatha yoga. Chapter 1 describes fifteen āsanas, among them Gomukhāsana, Vīrāsana, Kūrmāsana, Kukkuṭāsana, Dhanurāsana, Matsyendrāsana, Paścimottānāsana, Śavāsana and Padmāsana; chapter 2 is the breath. Verse numbers in this app follow Sinh’s edition.',
      vi: 'Cẩm nang hatha yoga cổ nhất còn lại. Chương 1 mô tả mười lăm āsana, trong đó có Gomukhāsana, Vīrāsana, Kūrmāsana, Kukkuṭāsana, Dhanurāsana, Matsyendrāsana, Paścimottānāsana, Śavāsana và Padmāsana; chương 2 nói về hơi thở. Số câu trong ứng dụng theo bản của Sinh.',
    },
  },
  {
    id: 'gheranda', covers: ['poses'],
    title: 'Gheraṇḍa Saṃhitā', by: 'translated by Rai Bahadur Srisa Chandra Vasu', year: 1915, url: 'https://archive.org/details/in.ernet.dli.2015.36514', licence: 'Public domain',
    note: {
      en: 'A 17th-century manual whose second lesson describes thirty-two āsanas, including Bhujaṅgāsana, Śalabhāsana, Uṣṭrāsana, Vṛkṣāsana, Garuḍāsana, Matsyāsana and Utkaṭāsana: the first written record of several poses every class still uses.',
      vi: 'Cẩm nang thế kỷ 17; bài học thứ hai mô tả ba mươi hai āsana, trong đó có Bhujaṅgāsana, Śalabhāsana, Uṣṭrāsana, Vṛkṣāsana, Garuḍāsana, Matsyāsana và Utkaṭāsana: ghi chép bằng văn bản sớm nhất của nhiều tư thế mà mọi lớp vẫn dùng.',
    },
  },
  // ── The modern references ─────────────────────────────────────────────
  {
    id: 'light-on-yoga', covers: ['poses'],
    title: 'Light on Yoga', by: 'B. K. S. Iyengar', year: 1966, url: null, licence: 'Book',
    note: {
      en: 'The reference every teacher training uses for the Sanskrit names and the standard form of the modern poses: Warrior, Triangle, Downward Dog, Pigeon and the rest. The English and Sanskrit names in this app follow it.',
      vi: 'Tài liệu tham chiếu mà mọi khoá đào tạo giáo viên dùng cho tên Sanskrit và hình chuẩn của các tư thế hiện đại: Chiến binh, Tam giác, Chó úp mặt, Bồ câu và những tư thế còn lại. Tên tiếng Anh và Sanskrit trong ứng dụng theo sách này.',
    },
  },
  {
    id: 'yoga-journal', covers: ['poses'],
    title: 'Yoga Journal pose library', by: 'Yoga Journal', url: 'https://www.yogajournal.com/poses/', licence: 'Free to read',
    note: {
      en: 'One page per pose with its Sanskrit name, how to get in, variations and cautions. Used to check that the cues and modifications here match what teachers commonly say.',
      vi: 'Mỗi tư thế một trang, với tên Sanskrit, cách vào thế, biến thể và lưu ý. Dùng để kiểm tra rằng câu cue và biến thể ở đây khớp với cách giáo viên thường nói.',
    },
  },
  // ── Ashtanga ──────────────────────────────────────────────────────────
  {
    id: 'sharath-yoga-centre', covers: ['ashtanga'],
    title: 'Sharath Yoga Centre, Mysuru', by: 'the official site of Paramaguru Sharath Jois, lineage holder of Ashtanga Yoga', url: 'https://sharathyogacentre.com/about-us/', licence: 'Free to read',
    note: {
      en: 'The home of the method as taught by K. Pattabhi Jois and his grandson Sharath Jois: how the series are learned one pose at a time in the Mysore style, and the authorised-teacher directory.',
      vi: 'Nơi của phương pháp như K. Pattabhi Jois và cháu ông là Sharath Jois giảng dạy: cách học các chuỗi từng tư thế một theo lối Mysore, và danh sách giáo viên được uỷ quyền.',
    },
  },
  {
    id: 'ashtangayoga-info', covers: ['ashtanga'],
    title: 'Primary Series: Yoga Chikitsa', by: 'AshtangaYoga.info (Dr Ronald Steiner)', url: 'https://www.ashtangayoga.info/ashtanga-yoga/primary-series-yoga-chikitsa/', licence: 'Free to read',
    note: {
      en: 'The pose-by-pose order of the primary series with its vinyasa counts: the reference for the positions, breaths and counts in this app.',
      vi: 'Thứ tự từng tư thế của chuỗi sơ cấp cùng số vinyasa: tài liệu tham chiếu cho vị trí, nhịp thở và số đếm trong ứng dụng này.',
    },
  },
  // ── Yin ───────────────────────────────────────────────────────────────
  {
    id: 'yinyoga', covers: ['yin', 'sequencing'],
    title: 'Yin Yoga asanas, and counter poses', by: 'Bernie Clark, yinyoga.com', url: 'https://yinyoga.com/yinsights/yin-yoga-asanas/', licence: 'Free to read',
    note: {
      en: 'The teacher who wrote the Yin textbooks. Each Yin pose in this app links to his page for it: what the hold reaches, how long to stay, the counterpose and the rebound.',
      vi: 'Người viết các giáo trình Yin. Mỗi tư thế Yin trong ứng dụng dẫn đến trang của ông về tư thế đó: thế giữ chạm đến đâu, giữ bao lâu, tư thế đối và dư âm.',
    },
  },
  // ── Sequencing ────────────────────────────────────────────────────────
  {
    id: 'sequencewiz', covers: ['sequencing'],
    title: 'Compensation postures, and sequencing in the Krishnamacharya tradition', by: 'Olga Kabel, sequencewiz.org', url: 'https://sequencewiz.org/2015/04/08/compensation-postures/', licence: 'Free to read',
    note: {
      en: 'The arc the Class Builder follows: prepare the body, build to a peak, then compensate with the shapes that undo it, before resting.',
      vi: 'Mạch mà phần Soạn bài theo: chuẩn bị cơ thể, đi đến tư thế đỉnh, rồi bù lại bằng những dáng ngược lại, trước khi nghỉ.',
    },
  },
  {
    id: 'stephens', covers: ['sequencing'],
    title: 'Yoga Sequencing: Designing Transformative Yoga Classes', by: 'Mark Stephens', year: 2012, url: null, licence: 'Book',
    note: {
      en: 'The standard book on building a class: the arc from warming to the peak to integration, preparing each part of a peak pose, and the counterposes that follow it.',
      vi: 'Cuốn sách chuẩn về cách soạn một lớp: mạch từ khởi động đến tư thế đỉnh rồi lắng lại, chuẩn bị từng phần cho tư thế đỉnh, và các tư thế bù theo sau.',
    },
  },
  // ── Safety ────────────────────────────────────────────────────────────
  {
    id: 'nccih', covers: ['safety'],
    title: 'Yoga: Effectiveness and Safety', by: 'National Center for Complementary and Integrative Health, US National Institutes of Health', year: 2023, url: 'https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety', licence: 'Public domain',
    note: {
      en: 'What the research says, and who needs modifications: knee and hip injuries, lumbar spine disease, severe high blood pressure, balance problems, glaucoma, and pregnancy. The safety lines and the cautions in the Class Builder follow it.',
      vi: 'Nghiên cứu nói gì, và ai cần điều chỉnh: chấn thương gối và hông, bệnh cột sống thắt lưng, cao huyết áp nặng, vấn đề thăng bằng, tăng nhãn áp, và thai kỳ. Lời nhắc an toàn và phần "cần chú ý" trong Soạn bài theo tài liệu này.',
    },
  },
  // ── Philosophy ────────────────────────────────────────────────────────
  {
    id: 'yoga-sutras', covers: ['philosophy'],
    title: 'The Yoga Sutras of Patanjali', by: 'Patañjali, translated by Charles Johnston', year: 1912, url: 'https://sacred-texts.com/hin/ysp/', licence: 'Public domain',
    note: {
      en: 'The thoughts for a class that quote Patañjali use this translation, old enough to be free. The Vietnamese under each quote is this app’s own rendering, not a published translation.',
      vi: 'Những lời dẫn cho lớp trích Patañjali dùng bản dịch này, đã đủ cũ để tự do sử dụng. Phần tiếng Việt dưới mỗi câu là cách diễn giải của ứng dụng, không phải bản dịch đã xuất bản.',
    },
  },
  {
    id: 'gita', covers: ['philosophy'],
    title: 'The Bhagavadgîtâ (Sacred Books of the East, vol. 8)', by: 'translated by Kâshinâth Trimbak Telang', year: 1882, url: 'https://sacred-texts.com/hin/sbe08/', licence: 'Public domain',
    note: {
      en: 'Chapter 2 on action without attachment and evenness of mind. Telang renders "yoga" as "devotion"; the Vietnamese says yoga.',
      vi: 'Chương 2 về hành động không bám víu và tâm bình thản. Telang dịch "yoga" là "devotion" (sự tận hiến); phần tiếng Việt giữ chữ yoga.',
    },
  },
  {
    id: 'monier-williams', covers: ['philosophy'],
    title: 'A Sanskrit-English Dictionary', by: 'Monier Monier-Williams (1899), Cologne Digital Sanskrit Dictionaries', url: 'https://www.sanskrit-lexicon.uni-koeln.de/scans/MWScan/2020/web/index.php', licence: 'Free to read',
    note: {
      en: 'The dictionary behind the meanings of the Sanskrit terms and pose names: what sthira, sukha, ujjāyī or kapota actually say.',
      vi: 'Cuốn từ điển đứng sau nghĩa của các thuật ngữ Sanskrit và tên tư thế: sthira, sukha, ujjāyī hay kapota thực sự nói gì.',
    },
  },
  // ── Meditation ────────────────────────────────────────────────────────
  {
    id: 'suttacentral', covers: ['meditation', 'vietnamese'],
    title: 'SuttaCentral: the Pali suttas', by: 'Bhikkhu Sujato (English, CC0) and HT Thích Minh Châu (Vietnamese)', url: 'https://suttacentral.net/', licence: 'CC0',
    note: {
      en: 'The Pali lines in the meditation thoughts and their English. Sujato’s translations are dedicated to the public domain (CC0); the same site carries Thích Minh Châu’s Vietnamese, the translation Vietnamese Buddhists read.',
      vi: 'Các câu Pali trong những lời dẫn về thiền và bản tiếng Anh. Bản dịch của Sujato được hiến vào phạm vi công cộng (CC0); cùng trang có bản Việt của HT Thích Minh Châu, bản dịch mà Phật tử Việt Nam đọc.',
    },
  },
  {
    id: 'phatgiao-dictionary', covers: ['vietnamese', 'meditation'],
    title: 'Từ điển Phật học online', by: 'Cổng thông tin Phật giáo, Giáo hội Phật giáo Việt Nam (the Vietnam Buddhist Sangha)', year: 2019, url: 'https://phatgiao.org.vn/tu-dien-phat-hoc-online.html', licence: 'Free to read',
    note: {
      en: 'The Sangha’s own dictionary, compiled from the Phật Quang and Đạo Uyển dictionaries among others. Every Sanskrit and Pali card that bridges to a Sino-Vietnamese term (vô thường, vô ngã, từ, nghiệp, pháp, thiền, luân xa) links to its entry here. The site welcomes copying without citation.',
      vi: 'Từ điển của chính Giáo hội, biên soạn từ Phật Quang Đại từ điển, Từ điển Đạo Uyển và các bộ khác. Mỗi thẻ Sanskrit và Pali nối đến một thuật ngữ Hán Việt (vô thường, vô ngã, từ, nghiệp, pháp, thiền, luân xa) dẫn đến mục từ tương ứng ở đây. Trang cho phép sao chép không cần trích dẫn.',
    },
  },
  {
    id: 'pts-ped', covers: ['meditation'],
    title: 'The Pali Text Society’s Pali-English Dictionary', by: 'T. W. Rhys Davids and William Stede (1921–25), Digital South Asia Library, University of Chicago', url: 'https://dsal.uchicago.edu/dictionaries/pali/', licence: 'Free to read',
    note: {
      en: 'The dictionary behind the Pali terms: anicca, dukkha, anattā, sati, mettā, vedanā, saṅkhāra.',
      vi: 'Cuốn từ điển đứng sau các thuật ngữ Pali: anicca, dukkha, anattā, sati, mettā, vedanā, saṅkhāra.',
    },
  },
  // ── Anatomy ───────────────────────────────────────────────────────────
  {
    id: 'openstax', covers: ['anatomy'],
    title: 'Anatomy and Physiology 2e', by: 'OpenStax, Rice University', year: 2022, url: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction', licence: 'CC BY-NC-SA 4.0',
    note: {
      en: 'The muscle and bone names, their actions, and figure 11.5, which the Anatomy tab’s figure is redrawn from. Access for free at openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction.',
      vi: 'Tên cơ và xương, chức năng của chúng, và hình 11.5 mà hình minh hoạ ở thẻ Cơ thể được vẽ lại từ đó. Đọc miễn phí tại openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction.',
    },
  },
  {
    id: 'grays', covers: ['anatomy'],
    title: 'Anatomy of the Human Body', by: 'Henry Gray, 20th edition (1918), Bartleby', year: 1918, url: 'https://www.bartleby.com/lit-hub/anatomy-of-the-human-body/', licence: 'Public domain',
    note: {
      en: '"Gray’s Anatomy": where each muscle attaches and what it does, in the words physiotherapists still use. The "does" line of every muscle was checked against it.',
      vi: '"Gray’s Anatomy": mỗi cơ bám vào đâu và làm gì, bằng ngôn ngữ mà chuyên viên vật lý trị liệu vẫn dùng. Dòng "chức năng" của mọi cơ được đối chiếu với sách này.',
    },
  },
  {
    id: 'figure-credit', covers: ['anatomy'],
    title: 'Figure credit: the muscle figure', by: 'redrawn from OpenStax figure 11.5 by Pk0001 (CC BY-SA 4.0), cleaned of its labels for this app', url: 'https://commons.wikimedia.org/wiki/File:1105_Anterior_and_Posterior_Views_of_Muscles_enko_png.svg', licence: 'CC BY-SA 4.0',
    note: {
      en: 'The licence of the redrawn figure asks for this credit. The skeleton is a public-domain drawing by Mariana Ruiz Villarreal.',
      vi: 'Giấy phép của hình vẽ lại yêu cầu ghi nhận này. Hình bộ xương là tranh vẽ thuộc phạm vi công cộng của Mariana Ruiz Villarreal.',
    },
  },
  // ── Written here ──────────────────────────────────────────────────────
  {
    id: 'own', covers: ['own'],
    title: 'Written for this app', by: 'Bowen, with AI help', url: null, licence: null,
    note: {
      en: 'Every cue, modification, safety line, Vietnamese translation and class plan was written for this app in the voice of a native teacher, then checked against the references on this page. Nothing is copied from a book or a website. If a line is wrong, use Suggest a fix on its card.',
      vi: 'Mọi câu cue, biến thể, lời nhắc an toàn, bản dịch tiếng Việt và bài soạn đều được viết riêng cho ứng dụng này bằng giọng của một giáo viên bản ngữ, rồi đối chiếu với các tài liệu trên trang này. Không câu nào chép từ sách hay trang web. Nếu một câu sai, hãy dùng Góp ý sửa trên thẻ đó.',
    },
  },
]

const byId = new Map(SOURCES.map((s) => [s.id, s]))
export const getSource = (id) => byId.get(id)

/**
 * What a pose rests on, most specific first: the texts and pages that
 * describe it (its `refs`: { source, ref, url? }, where `ref` is the verse
 * or the page title), then the references of the traditions it belongs
 * to. The cue text itself is `own`. Each item is a source with `ref` and
 * `url` filled in.
 */
export function sourcesFor(pose) {
  if (!pose) return []
  const out = []
  const add = (id, extra = {}) => { const s = byId.get(id); if (s && !out.some((x) => x.id === id && x.ref === extra.ref)) out.push({ ...s, ...extra }) }
  for (const r of pose.refs || []) add(r.source, { ref: r.ref, url: r.url || byId.get(r.source)?.url })
  if (pose.ashtanga) { add('sharath-yoga-centre'); add('ashtangayoga-info') }
  if (pose.yin && !(pose.refs || []).some((r) => r.source === 'yinyoga')) add('yinyoga')
  if (pose.styles.includes('vinyasa') || pose.styles.includes('ashtanga')) { add('light-on-yoga'); add('yoga-journal') }
  add('own')
  return out
}
