/**
 * Where the app's content comes from, so she can say "this comes from
 * somewhere". Every entry is free to read online; `licence` says what may be
 * reused and on what terms. A pose file names its Wikipedia article in
 * `wiki`; a concept card in content/phrases.js names its own `source`; a
 * thought for a class (content/themes.js) names the text it quotes.
 *
 * What is NOT taken from anywhere: the cues, modifications, safety lines,
 * the Vietnamese, and the class plans. Those were written for this app in the
 * register of a native teacher, checked against the references below, and
 * are corrected through "Suggest a fix". The `own` entry says so on the page.
 *
 * An entry: { id, covers: [area], title, by, year?, url, licence, note: { en, vi } }
 *   covers   'poses' | 'ashtanga' | 'yin' | 'sequencing' | 'philosophy' | 'meditation' | 'vietnamese' | 'anatomy' | 'own'
 *   licence  'CC BY-SA 4.0' | 'CC BY-NC-SA 4.0' | 'CC0' | 'Public domain' | 'Free to read'
 *            ("Free to read" is copyrighted text that anyone can open and cite, but not copy)
 */
export const AREAS = ['poses', 'ashtanga', 'yin', 'sequencing', 'philosophy', 'meditation', 'vietnamese', 'anatomy', 'own']

export const SOURCES = [
  {
    id: 'wikipedia-asanas', covers: ['poses'],
    title: 'List of asanas', by: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/List_of_asanas', licence: 'CC BY-SA 4.0',
    note: {
      en: 'The names, Sanskrit spellings and types of about a hundred poses, with the oldest text each one appears in. Its Yin Yoga column maps the Yin names to their hatha equivalents.',
      vi: 'Tên, cách viết Sanskrit và loại của khoảng một trăm tư thế, cùng văn bản cổ nhất ghi lại từng tư thế. Cột Yin Yoga đối chiếu tên Yin với tư thế hatha tương ứng.',
    },
  },
  {
    id: 'wikipedia', covers: ['poses'],
    title: 'Wikipedia, one article per pose', by: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Asana', licence: 'CC BY-SA 4.0',
    note: {
      en: 'Most poses link to their own article: what the name means, where the pose comes from, and its usual variations.',
      vi: 'Hầu hết tư thế dẫn đến bài viết riêng: nghĩa của tên, tư thế có từ đâu, và các biến thể thường gặp.',
    },
  },
  {
    id: 'wikipedia-ashtanga', covers: ['ashtanga'],
    title: 'Ashtanga vinyasa yoga', by: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Ashtanga_vinyasa_yoga', licence: 'CC BY-SA 4.0',
    note: {
      en: 'The shape of the practice: five Sun Salutations A and five B, the standing sequence, the primary series (Yoga Chikitsa), the finishing poses, five breaths a pose, and the Mysore style. How it came from Krishnamacharya to K. Pattabhi Jois.',
      vi: 'Hình hài của buổi tập: năm vòng Chào mặt trời A và năm vòng B, chuỗi đứng, chuỗi sơ cấp (Yoga Chikitsa), chuỗi kết thúc, năm nhịp thở mỗi tư thế, và lối tập Mysore. Phương pháp truyền từ Krishnamacharya đến K. Pattabhi Jois.',
    },
  },
  {
    id: 'wikipedia-surya', covers: ['ashtanga', 'poses'],
    title: 'Surya Namaskar', by: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Surya_Namaskar', licence: 'CC BY-SA 4.0',
    note: {
      en: 'The order of Sun Salutation A and B as Ashtanga teaches them, and where the sequence came from (Aundh in the 1920s, then Krishnamacharya in Mysore).',
      vi: 'Thứ tự Chào mặt trời A và B theo cách Ashtanga dạy, và chuỗi này có từ đâu (Aundh những năm 1920, rồi Krishnamacharya ở Mysore).',
    },
  },
  {
    id: 'ashtangayoga-info', covers: ['ashtanga'],
    title: 'Primary Series: Yoga Chikitsa', by: 'AshtangaYoga.info (Ronald Steiner)', url: 'https://www.ashtangayoga.info/ashtanga-yoga/primary-series-yoga-chikitsa/', licence: 'Free to read',
    note: {
      en: 'The pose-by-pose order of the primary series with its vinyasa counts: the reference for the positions, breaths and counts in this app.',
      vi: 'Thứ tự từng tư thế của chuỗi sơ cấp cùng số vinyasa: tài liệu tham chiếu cho vị trí, nhịp thở và số đếm trong ứng dụng này.',
    },
  },
  {
    id: 'wikipedia-yin', covers: ['yin'],
    title: 'Yin Yoga', by: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Yin_Yoga', licence: 'CC BY-SA 4.0',
    note: {
      en: 'Where Yin comes from (Paulie Zink, Paul Grilley, Sarah Powers), why the holds are long and passive, and which hatha poses the Yin names correspond to.',
      vi: 'Yin có từ đâu (Paulie Zink, Paul Grilley, Sarah Powers), vì sao giữ thế lâu và thụ động, và tên Yin tương ứng với tư thế hatha nào.',
    },
  },
  {
    id: 'yinyoga', covers: ['yin', 'sequencing'],
    title: 'Yin Yoga asanas, and counter poses', by: 'Bernie Clark, yinyoga.com', url: 'https://yinyoga.com/yinsights/yin-yoga-asanas/', licence: 'Free to read',
    note: {
      en: 'The Yin pose names this app uses, what each hold reaches, how long to stay, and the rules for counterposes and the rebound (yinyoga.com/yinsights/counter-poses).',
      vi: 'Tên các tư thế Yin mà ứng dụng dùng, mỗi thế giữ chạm đến đâu, giữ bao lâu, và quy tắc tư thế đối và dư âm (yinyoga.com/yinsights/counter-poses).',
    },
  },
  {
    id: 'sequencewiz', covers: ['sequencing'],
    title: 'Compensation postures, and sequencing in the Krishnamacharya tradition', by: 'Olga Kabel, sequencewiz.org', url: 'https://sequencewiz.org/2015/04/08/compensation-postures/', licence: 'Free to read',
    note: {
      en: 'The arc the Class Builder follows: prepare the body, build to a peak, then compensate with the shapes that undo it, before resting.',
      vi: 'Mạch mà phần Soạn bài theo: chuẩn bị cơ thể, đi đến tư thế đỉnh, rồi bù lại bằng những dáng ngược lại, trước khi nghỉ.',
    },
  },
  {
    id: 'yoga-sutras', covers: ['philosophy'],
    title: 'The Yoga Sutras of Patanjali', by: 'Patañjali, translated by Charles Johnston', year: 1912, url: 'https://sacred-texts.com/hin/ysp/', licence: 'Public domain',
    note: {
      en: 'The thoughts for a class that quote Patañjali use this translation, old enough to be free. The Vietnamese under each quote is this app’s own rendering, not a published translation.',
      vi: 'Những lời dẫn cho lớp trích Patañjali dùng bản dịch này, đã đủ cũ để tự do sử dụng. Phần tiếng Việt dưới mỗi câu là cách diễn giải của ứng dụng, không phải bản dịch đã xuất bản.',
    },
  },
  {
    id: 'hatha-pradipika', covers: ['philosophy'],
    title: 'Hatha Yoga Pradipika', by: 'Svātmārāma, translated by Pancham Sinh', year: 1914, url: 'https://sacred-texts.com/hin/hyp/', licence: 'Public domain',
    note: {
      en: 'The oldest surviving manual of hatha yoga: āsana first, then breath. Quoted in the thoughts for a class.',
      vi: 'Cẩm nang hatha yoga cổ nhất còn lại: āsana trước, rồi đến hơi thở. Được trích trong những lời dẫn cho lớp.',
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
    id: 'suttacentral', covers: ['meditation'],
    title: 'SuttaCentral: the Pali suttas in Bhikkhu Sujato’s translation', by: 'SuttaCentral', url: 'https://suttacentral.net/', licence: 'CC0',
    note: {
      en: 'The Pali lines in the meditation thoughts and their English. Sujato’s translations are dedicated to the public domain (CC0); the site also carries Thích Minh Châu’s Vietnamese.',
      vi: 'Các câu Pali trong những lời dẫn về thiền và bản tiếng Anh. Bản dịch của Sujato được hiến vào phạm vi công cộng (CC0); trang này cũng có bản Việt của HT Thích Minh Châu.',
    },
  },
  {
    id: 'vi-wikipedia', covers: ['vietnamese', 'meditation'],
    title: 'Wikipedia tiếng Việt', by: 'Wikipedia', url: 'https://vi.wikipedia.org/', licence: 'CC BY-SA 4.0',
    note: {
      en: 'The Sino-Vietnamese Buddhist terms the Sanskrit and Pali cards bridge to (vô thường, vô ngã, từ, nghiệp, pháp, thiền, luân xa) were checked here; each card links to its article.',
      vi: 'Các thuật ngữ Phật giáo Hán Việt mà thẻ Sanskrit và Pali nối đến (vô thường, vô ngã, từ, nghiệp, pháp, thiền, luân xa) được đối chiếu ở đây; mỗi thẻ dẫn đến bài viết tương ứng.',
    },
  },
  {
    id: 'openstax', covers: ['anatomy'],
    title: 'Anatomy and Physiology 2e', by: 'OpenStax, Rice University', year: 2022, url: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction', licence: 'CC BY-NC-SA 4.0',
    note: {
      en: 'The muscle and bone names, their actions, and the figure the Anatomy tab is built on. Access for free at openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction.',
      vi: 'Tên cơ và xương, chức năng của chúng, và hình minh hoạ mà thẻ Cơ thể dựa trên. Đọc miễn phí tại openstax.org/books/anatomy-and-physiology-2e/pages/1-introduction.',
    },
  },
  {
    id: 'commons-muscles', covers: ['anatomy'],
    title: 'Anterior and posterior views of muscles (figure 11.5)', by: 'Pk0001 after OpenStax, Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:1105_Anterior_and_Posterior_Views_of_Muscles_enko_png.svg', licence: 'CC BY-SA 4.0',
    note: {
      en: 'The muscle figure she taps, redrawn from the OpenStax plate and cleaned of its leader lines for this app.',
      vi: 'Hình cơ bắp mà bạn chạm vào, vẽ lại từ hình của OpenStax và được xoá các đường chỉ dẫn cho ứng dụng này.',
    },
  },
  {
    id: 'commons-skeleton', covers: ['anatomy'],
    title: 'Human skeleton, front and back', by: 'Mariana Ruiz Villarreal (LadyofHats), Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Human_skeleton_front_en.svg', licence: 'Public domain',
    note: {
      en: 'The skeleton figure on the Bones tab.',
      vi: 'Hình bộ xương ở mục Xương.',
    },
  },
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

const SURYA = new Set(['mountain-pose', 'upward-salute', 'standing-forward-fold', 'half-lift', 'chaturanga', 'upward-dog', 'downward-dog', 'chair-pose', 'warrior-1'])

/**
 * What a pose rests on, most specific first: its own Wikipedia article (the
 * `wiki` title in its file), the list of asanas, and the references for the
 * traditions it belongs to. The cue text itself is `own`.
 */
export function sourcesFor(pose) {
  if (!pose) return []
  const out = []
  if (pose.wiki) out.push({ ...byId.get('wikipedia'), page: pose.wiki.replace(/_/g, ' '), url: `https://en.wikipedia.org/wiki/${encodeURIComponent(pose.wiki)}` })
  out.push(byId.get('wikipedia-asanas'))
  if (pose.family === 'sun-salutation' || SURYA.has(pose.id)) out.push(byId.get('wikipedia-surya'))
  if (pose.ashtanga) out.push(byId.get('wikipedia-ashtanga'), byId.get('ashtangayoga-info'))
  if (pose.yin) out.push(byId.get('wikipedia-yin'), byId.get('yinyoga'))
  out.push(byId.get('own'))
  return out.filter(Boolean)
}
