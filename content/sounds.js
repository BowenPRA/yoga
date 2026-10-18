/**
 * Sounds: pronunciation drills on the five targets for Vietnamese speakers
 * (CLAUDE.md, "Pronunciation targets"), for the Speech tab's third mode.
 *
 * Each set is one target: final sounds, consonant clusters, th, word stress,
 * long and short vowels. Its items run from single words to whole cues, and
 * are built first from lines that already have audio (a term, a plain phrase,
 * a pose name, a cue), so most of them play today. A word the drill needs and
 * no content says (the other half of a minimal pair, a short carrier line)
 * is a new line `sound__<slug>`; scripts/export-clips.mjs adds those to
 * clips.json with kind "sound", and the app shows the word without a voice
 * until its clip is made.
 *
 * A set:  { id, title: {en, vi}, note: {en, vi}, sample, items }
 *   note    the trap in her terms, one or two sentences
 *   sample  a few of its words, for the card
 * An item:
 *   id      stable; her "said" mark hangs off it, so never change it
 *   clip    an existing clip id, or a new `sound__<slug>` line
 *   en      what she says; for an existing clip, exactly what the clip says
 *   vi      what it means
 *   focus   the letters to listen for, each found in `en` in this order
 *           (so "th", "th" marks the first two th's)
 *   say     a respelling, the stressed syllable in capitals (every stress
 *           item has one)
 *   tip     { en, vi }: the trap in this word, one or two short sentences
 *   vs      optional, the other word of a minimal pair:
 *           { clip, en, vi, focus, say }; she says both
 * The Vietnamese addresses her as "bạn", never em / cậu / chị / anh.
 * `node scripts/check-content.mjs` checks all of this.
 */

export const SOUND_CLIP = /^sound__[a-z0-9]+(-[a-z0-9]+)*$/

export const SOUNDS = [
  {
    id: 'endings',
    title: { en: 'Final sounds', vi: 'Âm cuối' },
    sample: 'hips · knees · rest · -ed',
    note: {
      en: 'Vietnamese closes final sounds like p and t without releasing them, and has no -s or -ed ending, so “hips” slips into “hip” and “stacked” into “stack”. In English the ending carries meaning (more than one, the past, or another word), so let it be heard.',
      vi: 'Âm cuối tiếng Việt như “p”, “t” được ngậm lại, và tiếng Việt không có đuôi -s hay -ed, nên “hips” dễ thành “hip”, “stacked” thành “stack”. Trong tiếng Anh, âm cuối mang nghĩa (số nhiều, quá khứ, hay một từ khác), nên hãy để nó bật ra thành tiếng.',
    },
    items: [
      {
        id: 'endings-hips', clip: 'pelvis__plain', en: 'your hips', vi: 'hông của bạn', focus: ['ps'], say: 'yor HIPS',
        tip: { en: 'Both final sounds, p and s, must be heard: hip-s. Drop the s and it is only one hip.', vi: 'Hai âm cuối “p” và “s” đều phải nghe được: hip-s. Bỏ “s” là chỉ còn một bên hông.' },
      },
      {
        id: 'endings-knees', clip: 'sound__knees', en: 'knees', vi: 'hai đầu gối', focus: ['s'], say: 'NEEZ',
        tip: { en: 'The plural ends in a buzzing z, like a bee: neez. Without it, students hear one knee.', vi: 'Số nhiều kết thúc bằng âm “z” rung nhẹ như tiếng ong: neez. Thiếu nó, học viên nghe thành một đầu gối.' },
        vs: { clip: 'knee', en: 'knee', vi: 'đầu gối', focus: ['ee'], say: 'NEE' },
      },
      {
        id: 'endings-ribs', clip: 'ribs', en: 'ribs', vi: 'xương sườn', focus: ['bs'], say: 'RIBZ',
        tip: { en: 'Close your lips for the b, then buzz into z: rib-z. Not “rip”.', vi: 'Khép môi cho “b” rồi rung ra “z”: rib-z. Đừng đọc thành “ríp”.' },
      },
      {
        id: 'endings-calves', clip: 'calves', en: 'calves', vi: 'bắp chân', focus: ['ves'], say: 'KAHVZ',
        tip: { en: 'The l is silent. Top teeth on your lower lip for the v, then buzz the z: kahv-z.', vi: 'Chữ “l” câm. Răng trên chạm môi dưới cho “v”, rồi rung “z”: kahv-z.' },
      },
      {
        id: 'endings-shoulder-blades', clip: 'shoulder-blades', en: 'shoulder blades', vi: 'bả vai', focus: ['des'], say: 'SHOHL-der BLAYDZ',
        tip: { en: '“Blades” ends in d and z together: blayd-z. Keep both.', vi: '“Blades” kết thúc bằng “d” và “z” liền nhau: blayd-z. Giữ cả hai.' },
      },
      {
        id: 'endings-childs-pose', clip: 'child-pose__en', en: 'Child’s Pose', vi: 'tư thế Em bé', focus: ['ld’s'], say: 'CHYLDZ POHZ',
        tip: { en: 'Three final sounds, l-d-z, before “Pose”: chyld-z pohz. Not “chai po”.', vi: 'Ba âm cuối “l-d-z” liền nhau trước khi sang “Pose”: chyld-z pohz. Đừng nói “chai pô”.' },
      },
      {
        id: 'endings-hip-points', clip: 'hip-points', en: 'hip points', vi: 'hai mỏm xương phía trước hông', focus: ['p', 'nts'], say: 'HIP POYNTS',
        tip: { en: 'Keep the p of “hip”, then the whole “nts” at the end: poynt-s. Not “poin”.', vi: 'Giữ “p” cuối của “hip”, rồi cả cụm “nts” ở cuối: poynt-s. Không phải “poin”.' },
      },
      {
        id: 'endings-wrists', clip: 'wrist__cue-3', en: 'Stack your shoulders over your wrists.', vi: 'Đặt vai thẳng trên cổ tay.', focus: ['rs', 'sts'],
        tip: { en: 'The “-sts” of “wrists” is the hardest ending: rist-s. Go slowly and keep the t in the middle. “Shoulders” ends in z.', vi: 'Đuôi “-sts” của “wrists” khó nhất: rist-s. Nói chậm, đừng nuốt “t” ở giữa. “Shoulders” kết thúc bằng “z”.' },
      },
      {
        id: 'endings-rest', clip: 'heel__cue-3', en: 'Sit back toward your heels and let the hips rest.', vi: 'Ngồi lùi về gót chân và để hông nghỉ.', focus: ['ls', 'ps', 'st'],
        tip: { en: 'Three endings in one cue: heel-z, hip-s, re-st. Say it slowly first, then at the pace of the model.', vi: 'Ba âm cuối trong một câu: heel-z, hip-s, re-st. Nói chậm trước, rồi nói theo nhịp của giọng mẫu.' },
      },
      {
        id: 'endings-turned', clip: 'wide-legged-fold__cue-1', en: 'Step your feet wide apart, toes turned slightly in.', vi: 'Bước hai chân thật rộng, mũi chân hơi xoay vào trong.', focus: ['es', 'ned'],
        tip: { en: 'After a voiced sound like n, “-ed” is just a light d: turnd, with no extra syllable. “Toes” ends in z.', vi: 'Sau âm rung như “n”, đuôi “-ed” chỉ là một “d” nhẹ: turnd, không thêm âm tiết. “Toes” kết thúc bằng “z”.' },
      },
      {
        id: 'endings-stacked', clip: 'sleeping-swan__mod-2', en: 'Rest your forehead on a block or on your stacked fists.', vi: 'Tựa trán lên gạch hoặc lên hai nắm tay chồng lên nhau.', focus: ['cked', 'sts'],
        tip: { en: 'After k, “-ed” sounds like t: stackt. Then “fists” with its “-sts”: stackt fist-s.', vi: 'Sau “k”, đuôi “-ed” đọc thành “t”: stackt. Rồi “fists” với đuôi “-sts”: stackt fist-s.' },
      },
      {
        id: 'endings-folded', clip: 'butterfly__cue-1', en: 'Sit on a folded blanket, and bring the soles of your feet together.', vi: 'Ngồi trên chăn gấp, và áp hai gan bàn chân vào nhau.', focus: ['ded', 'les'],
        tip: { en: 'After d or t, “-ed” becomes its own syllable: FOHL-did. “Soles” ends in z.', vi: 'Sau “d” hoặc “t”, đuôi “-ed” thành một âm tiết riêng: FOHL-did. “Soles” kết thúc bằng “z”.' },
      },
    ],
  },

  {
    id: 'clusters',
    title: { en: 'Consonant clusters', vi: 'Cụm phụ âm' },
    sample: 'stretch · spine · strength · twist',
    note: {
      en: 'Vietnamese never puts two consonants side by side, so a Vietnamese speaker tends to slip a vowel between them (“suh-tretch”) or drop one (“tretch”). In English “str” is one quick run: the consonants join straight on, with no vowel in between.',
      vi: 'Tiếng Việt không đặt hai phụ âm liền nhau, nên người Việt hay chèn một âm “ơ” vào giữa (“sờ-trét”) hoặc bỏ bớt một âm (“trét”). Trong tiếng Anh, “str” là một hơi liền: các phụ âm nối thẳng vào nhau, không có nguyên âm nào chen vào.',
    },
    items: [
      {
        id: 'clusters-twist', clip: 'rotation__plain', en: 'twist, turn', vi: 'vặn, xoay', focus: ['tw', 'st'], say: 'TWIST, TERN',
        tip: { en: '“tw”: round your lips from the start, as if about to say “oo”, then release the t. It ends in “st”: twist, not “twis”.', vi: '“tw”: tròn môi ngay từ đầu như sắp nói “u”, rồi bật “t”. Cuối từ có “st”: twist, không phải “tuýt”.' },
      },
      {
        id: 'clusters-stretch', clip: 'sound__stretch', en: 'stretch', vi: 'kéo giãn', focus: ['str', 'tch'], say: 'STRECH',
        tip: { en: 'Three consonants, s-t-r, in one run, with no vowel between them. End on a clearly released “ch”.', vi: 'Ba phụ âm “s-t-r” đi liền một hơi, không có “ơ” ở giữa. Kết thúc bằng “ch” bật rõ, đừng nuốt mất.' },
      },
      {
        id: 'clusters-spread', clip: 'toes__cue-1', en: 'Spread your toes wide.', vi: 'Xoè rộng các ngón chân.', focus: ['Spr'],
        tip: { en: '“spr”: close your lips for the p and go straight into the r, with no vowel after the s.', vi: '“spr”: khép môi cho “p” rồi bật thẳng vào “r”, không có “ơ” sau “s”.' },
      },
      {
        id: 'clusters-stretch-your-spine', clip: 'sound__stretch-your-spine', en: 'Stretch your spine.', vi: 'Kéo giãn cột sống.', focus: ['Str', 'tch', 'sp'],
        tip: { en: 'Two clusters at the start of a word, “str” and “sp”. Begin the s as a soft hiss, then join straight onto the next consonant.', vi: 'Hai cụm ở đầu từ, “str” và “sp”. Bắt đầu “s” như một tiếng xì nhẹ, rồi nối thẳng sang phụ âm sau.' },
      },
      {
        id: 'clusters-shoulders', clip: 'trapezius__cue-1', en: 'Relax your shoulders away from your ears.', vi: 'Thả vai xuống, xa khỏi tai.', focus: ['x', 'ld', 'rs'],
        tip: { en: '“Relax” ends in “ks”. “Shoulders” has “ld” in the middle (tongue on the ridge for the l, then d) and “rz” at the end: SHOHL-derz.', vi: '“Relax” kết thúc bằng “ks”. “Shoulders” có “ld” ở giữa (lưỡi chạm nướu cho “l”, rồi “d”) và “rz” ở cuối: SHOHL-derz.' },
      },
      {
        id: 'clusters-strength', clip: 'sound__strength', en: 'strength', vi: 'sức mạnh', focus: ['str', 'ngth'], say: 'STRENGTH',
        tip: { en: 'Two clusters in one word: “str” at the start, “ngth” at the end. Finish with your tongue between your teeth for the th.', vi: 'Hai cụm trong một từ: “str” ở đầu, “ngth” ở cuối. Kết thúc với đầu lưỡi giữa hai hàm răng cho “th”.' },
      },
      {
        id: 'clusters-plank', clip: 'plank__en', en: 'Plank Pose', vi: 'tư thế Tấm ván', focus: ['Pl', 'nk'], say: 'PLANK POHZ',
        tip: { en: '“pl” together at the start (not “puh-lank”) and “nk” at the end: plank.', vi: '“pl” liền ở đầu (không phải “pờ-lank”) và “nk” ở cuối: plank.' },
      },
      {
        id: 'clusters-triangle', clip: 'triangle__en', en: 'Triangle Pose', vi: 'tư thế Tam giác', focus: ['Tr', 'ngle'], say: 'TRY-ang-gul POHZ',
        tip: { en: '“tr” together, not “tuh-rye”. The end, “-ngle”, is ng then a light “gul”.', vi: '“tr” liền, không phải “tờ-rai”. Phần cuối “-ngle” là “ng” rồi “gul” nhẹ: TRY-ang-gul.' },
      },
      {
        id: 'clusters-squeeze', clip: 'hip-adductors__cue-1', en: 'Squeeze the block between your thighs.', vi: 'Kẹp viên gạch giữa hai đùi.', focus: ['Squ', 'bl'],
        tip: { en: '“Squeeze” opens with three sounds, s-k-w, in one run. “Block”: “bl” together, with no vowel in between.', vi: '“Squeeze” mở đầu bằng ba âm “s-k-w” liền nhau. “Block”: “bl” liền, không có “ơ” chen vào.' },
      },
      {
        id: 'clusters-straighten', clip: 'extension__cue-1', en: 'Straighten your front leg and lift your chest.', vi: 'Duỗi thẳng chân trước và nâng ngực.', focus: ['Str', 'fr', 'ft', 'st'],
        tip: { en: 'Clusters at the start (“str”, “fr”) and at the end (“ft”, “st”). Keep the final t of “lift” and “chest”.', vi: 'Cụm ở đầu từ (“str”, “fr”) và cụm ở cuối (“ft”, “st”). Giữ âm “t” cuối của “lift” và “chest”.' },
      },
      {
        id: 'clusters-flex-press', clip: 'dorsiflexion__cue-2', en: 'Flex your feet and press through your heels.', vi: 'Gập bàn chân và ấn qua gót.', focus: ['Fl', 'pr', 'thr'],
        tip: { en: 'Three clusters: “fl”, “pr”, “thr”. For “thr”, tongue between your teeth for the th, then pull it back quickly for the r.', vi: 'Ba cụm: “fl”, “pr”, “thr”. Với “thr”, đặt lưỡi giữa răng cho “th” rồi kéo nhanh vào trong cho “r”.' },
      },
      {
        id: 'clusters-glutes', clip: 'gluteus-maximus__cue-2', en: 'In Bridge, keep the glutes working but not clenched.', vi: 'Trong Cây cầu, giữ cơ mông làm việc nhưng không siết chặt.', focus: ['Br', 'gl', 'cl', 'nched'],
        tip: { en: '“br”, “gl”, “cl” at the start of words, and “nched” at the end: klencht. Four clusters in one cue.', vi: '“br”, “gl”, “cl” ở đầu từ, và “nched” ở cuối: klencht. Bốn cụm trong một câu cue.' },
      },
    ],
  },

  {
    id: 'th',
    title: { en: 'The th sound', vi: 'Âm th' },
    sample: 'breathe · thigh · thumb',
    note: {
      en: 'Vietnamese “th” is an aspirated t, so “thigh” comes out as “tie” and “three” as “tree”. The English th puts the tip of your tongue lightly between your teeth and lets the air through: voiceless in “thigh”, a soft buzz in “breathe” and “the”.',
      vi: '“Th” tiếng Việt là âm “t” bật hơi, nên “thigh” dễ thành “tai”, “three” thành “tri”. “Th” tiếng Anh cần đầu lưỡi đặt nhẹ giữa hai hàm răng rồi cho hơi đi qua: không rung trong “thigh”, rung nhẹ trong “breathe” và “the”.',
    },
    items: [
      {
        id: 'th-thigh-bone', clip: 'femur', en: 'thigh bone', vi: 'xương đùi', focus: ['th'], say: 'THY bohn',
        tip: { en: 'Tongue tip between your teeth and a gentle stream of air: th-igh. Not “tie bone”.', vi: 'Đầu lưỡi giữa hai hàm răng, thổi hơi nhẹ: th-igh. Không đọc thành “tai bôn”.' },
      },
      {
        id: 'th-thigh-tie', clip: 'sound__thigh', en: 'thigh', vi: 'đùi', focus: ['th'], say: 'THY',
        tip: { en: 'The two words differ only in the first sound. “Thigh”: tongue between the teeth, air through the gap. “Tie”: tongue on the ridge behind the top teeth, then release.', vi: 'Hai từ chỉ khác âm đầu. “Thigh”: lưỡi giữa răng, hơi đi qua khe. “Tie”: lưỡi chạm nướu sau răng trên rồi bật ra.' },
        vs: { clip: 'sound__tie', en: 'tie', vi: 'buộc, thắt', focus: ['t'], say: 'TY' },
      },
      {
        id: 'th-three-tree', clip: 'sound__three', en: 'three', vi: 'số ba', focus: ['th'], say: 'THREE',
        tip: { en: '“Three” and “tree” (as in Tree Pose) differ only in the first sound. Counting breaths needs “three”: tongue between the teeth first, then the r.', vi: '“Three” (số ba) và “tree” (cái cây, như Tree Pose) chỉ khác âm đầu. Đếm hơi thở cần “three”: lưỡi giữa răng trước, rồi mới đến “r”.' },
        vs: { clip: 'sound__tree', en: 'tree', vi: 'cái cây', focus: ['t'], say: 'TREE' },
      },
      {
        id: 'th-thumb', clip: 'sound__thumb', en: 'thumb', vi: 'ngón tay cái', focus: ['th'], say: 'THUM',
        tip: { en: 'A th at the start, and the final b is silent: thum. The plural, “thumbs”, is thumz.', vi: 'Âm “th” ở đầu, và chữ “b” cuối câm: thum. Số nhiều “thumbs” đọc là thumz.' },
      },
      {
        id: 'th-thighs-together', clip: 'adduction__cue-1', en: 'Squeeze your inner thighs together.', vi: 'Kẹp mặt trong hai đùi vào nhau.', focus: ['th', 'th'],
        tip: { en: 'Two kinds of th: “thighs” is voiceless, “together” buzzes softly in your throat. Your tongue goes between your teeth both times.', vi: 'Hai kiểu “th”: “thighs” không rung, “together” rung nhẹ ở cổ họng. Cả hai lần, lưỡi đều đặt giữa hai hàm răng.' },
      },
      {
        id: 'th-teeth', clip: 'jaw__cue-1', en: 'Unclench your jaw; let your teeth part slightly.', vi: 'Thả hàm; để hai hàm răng hơi tách ra.', focus: ['th'],
        tip: { en: 'The th at the end of “teeth”: finish with your tongue tip touching your teeth, not cut short into “teet”.', vi: '“th” ở cuối từ “teeth”: kết thúc với đầu lưỡi chạm nhẹ vào răng, đừng cắt ngắn thành “tít”.' },
      },
      {
        id: 'th-both', clip: 'quadratus-lumborum__cue-2', en: 'Keep both hips level as you reach over to the side.', vi: 'Giữ hai hông ngang bằng khi bạn vươn sang bên.', focus: ['th', 'th'],
        tip: { en: '“Both” ends in a voiceless th; said with a t it sounds like “boat”. “The” buzzes softly.', vi: '“Both” kết thúc bằng “th” không rung; đọc thành “t” thì nghe như “boat” (con thuyền). “The” thì rung nhẹ.' },
      },
      {
        id: 'th-breathe-into', clip: 'gluteus-medius__cue-3', en: 'In Shoelace, breathe into the outer hip.', vi: 'Trong tư thế Dây giày, thở vào phần hông ngoài.', focus: ['th', 'th'],
        tip: { en: '“Breathe” and “the” both have the buzzing th. Hold your tongue between your teeth a moment so it hums; not “breed”, not “duh”.', vi: '“Breathe” và “the” đều có “th” rung. Giữ lưỡi giữa răng một chút cho nó kêu nhẹ, đừng thành “brít” hay “đờ”.' },
      },
      {
        id: 'th-through-the-crown', clip: 'crown__cue-1', en: 'Lengthen through the crown of your head.', vi: 'Kéo dài lên qua đỉnh đầu.', focus: ['th', 'th', 'th'],
        tip: { en: 'Three th sounds in a row: “lengthen” and “through” are voiceless, “the” buzzes. Go slowly so your tongue has time to move.', vi: 'Ba lần “th” liền nhau: “lengthen” và “through” không rung, “the” rung. Nói chậm để lưỡi kịp ra vào.' },
      },
      {
        id: 'th-five-breaths', clip: 'warrior-2__cue-7', en: 'Stay here for five breaths.', vi: 'Giữ ở đây trong năm nhịp thở.', focus: ['ths'],
        tip: { en: '“Breaths” ends in th then s: tongue between your teeth, then back for the s. Slowly: breth-s.', vi: '“Breaths” kết thúc bằng “th” rồi “s”: lưỡi giữa răng, rồi rút vào cho “s”. Nói chậm: breth-s.' },
      },
      {
        id: 'th-thoracic', clip: 'thoracic-spine', en: 'thoracic spine', vi: 'đốt sống ngực (lưng trên)', focus: ['th'], say: 'thor-AS-ik SPYN',
        tip: { en: 'A voiceless th at the start, then the stress falls on “AS”. With students, “your upper back” is easier.', vi: '“th” không rung ở đầu, rồi trọng âm rơi vào “AS”. Với học viên, nói “your upper back” dễ hơn.' },
      },
    ],
  },

  {
    id: 'stress',
    title: { en: 'Word stress', vi: 'Trọng âm' },
    sample: 'HAM-strings · KWOD-ri-seps · ab-DOM-i-nis',
    note: {
      en: 'In Vietnamese every syllable carries its own tone and the same weight, so “hamstrings” comes out evenly, syllable by syllable. English leans on one syllable: louder, longer, higher; the others go small and quick.',
      vi: 'Tiếng Việt mỗi âm tiết mang một thanh và nặng như nhau, nên “hamstrings” dễ thành “ham-xờ-trinh” đều đều. Tiếng Anh dồn sức vào một âm tiết: nói nó to hơn, dài hơn, cao hơn; các âm tiết còn lại nhỏ và nhanh.',
    },
    items: [
      {
        id: 'stress-hamstrings', clip: 'hamstrings', en: 'hamstrings', vi: 'cơ đùi sau', focus: ['ham'], say: 'HAM-strings',
        tip: { en: 'Lean on “HAM”, then “strings” small and quick, keeping the “str” and the final “ngz”.', vi: 'Nhấn “HAM”, rồi “strings” nhỏ và nhanh, giữ cả cụm “str” và “ngz” ở cuối.' },
      },
      {
        id: 'stress-quadriceps', clip: 'quadriceps', en: 'quadriceps', vi: 'cơ tứ đầu đùi', focus: ['quad'], say: 'KWOD-ri-seps',
        tip: { en: 'Lean on the first syllable, “KWOD”. The “ri” is almost swallowed; “seps” ends in a clear “ps”.', vi: 'Nhấn âm đầu “KWOD”. “ri” gần như nuốt mất, “seps” kết thúc bằng “ps” rõ ràng.' },
      },
      {
        id: 'stress-abdominis', clip: 'rectus-abdominis', en: 'rectus abdominis', vi: 'cơ thẳng bụng', focus: ['rec', 'dom'], say: 'REK-tus ab-DOM-i-nis',
        tip: { en: 'Two words, two stresses: “REK” and “DOM”. The same “DOM” as in “abdominal” (ab-DOM-i-nal).', vi: 'Hai từ, hai chỗ nhấn: “REK” và “DOM”. Cũng “DOM” đó trong “abdominal” (ab-DOM-i-nal).' },
      },
      {
        id: 'stress-sacrum', clip: 'sacrum', en: 'sacrum', vi: 'xương cùng', focus: ['sa'], say: 'SAY-krum',
        tip: { en: 'Lean on “SAY”, long as in “say”. “krum” is light; keep the final m.', vi: 'Nhấn “SAY”, kéo dài như từ “say”. “krum” nhẹ, giữ âm “m” cuối.' },
      },
      {
        id: 'stress-pelvis', clip: 'pelvis', en: 'pelvis', vi: 'khung chậu', focus: ['pel'], say: 'PEL-vis',
        tip: { en: 'Lean on “PEL”, then a short “vis” with a clear final s. Not “pen-veet”.', vi: 'Nhấn “PEL”, rồi “vis” ngắn với “s” cuối rõ. Đừng đọc “pen-vít”.' },
      },
      {
        id: 'stress-diaphragm', clip: 'diaphragm', en: 'diaphragm', vi: 'cơ hoành', focus: ['di'], say: 'DY-uh-fram',
        tip: { en: 'Lean on “DY”; the “uh” nearly disappears and the g is silent: DY-uh-fram.', vi: 'Nhấn “DY”; “uh” gần như biến mất, chữ “g” câm: DY-uh-fram.' },
      },
      {
        id: 'stress-trapezius', clip: 'trapezius', en: 'trapezius', vi: 'cơ thang', focus: ['pe'], say: 'tra-PEE-zee-us',
        tip: { en: 'The stress is on the second syllable, “PEE”, long and high. The “tra” at the start is small and quick.', vi: 'Trọng âm ở âm tiết thứ hai, “PEE”, dài và cao. “tra” ở đầu nhỏ và nhanh.' },
      },
      {
        id: 'stress-abduction', clip: 'abduction', en: 'abduction', vi: 'dạng (đưa ra xa thân)', focus: ['duc'], say: 'ab-DUK-shun',
        tip: { en: 'Lean on “DUK”. A word ending in “-tion” stresses the syllable just before it: ab-DUK-shun, roh-TAY-shun.', vi: 'Nhấn “DUK”. Từ có đuôi “-tion” luôn nhấn âm tiết ngay trước nó: ab-DUK-shun, roh-TAY-shun.' },
      },
      {
        id: 'stress-rotation', clip: 'rotation', en: 'rotation', vi: 'xoay', focus: ['ta'], say: 'roh-TAY-shun',
        tip: { en: 'Like every “-tion” word: stress the syllable just before it, “TAY”.', vi: 'Như mọi từ đuôi “-tion”: nhấn âm tiết ngay trước nó, “TAY”.' },
      },
      {
        id: 'stress-piriformis', clip: 'piriformis', en: 'piriformis', vi: 'cơ hình lê', focus: ['for'], say: 'pir-i-FOR-mis',
        tip: { en: 'The stress falls on the third syllable, “FOR”. The first two, “pir-i”, are light and quick.', vi: 'Trọng âm rơi vào âm tiết thứ ba, “FOR”. Hai âm đầu “pir-i” nhẹ và nhanh.' },
      },
      {
        id: 'stress-savasana', clip: 'savasana__en', en: 'Savasana', vi: 'tư thế Xác chết', focus: ['va'], say: 'shah-VAH-sah-nah',
        tip: { en: 'In the studio, lean on “VAH”: shah-VAH-sah-nah. The other syllables stay light; do not give each one the same weight.', vi: 'Trong phòng tập, nhấn “VAH”: shah-VAH-sah-nah. Các âm khác nhẹ, đừng đọc đều từng tiếng.' },
      },
      {
        id: 'stress-chaturanga', clip: 'chaturanga__en', en: 'Chaturanga', vi: 'Chống đẩy thấp', focus: ['ran'], say: 'chah-too-RANG-gah',
        tip: { en: 'Lean on “RANG”, the third syllable. The first two, “chah-too”, are quick and light.', vi: 'Nhấn “RANG”, âm tiết thứ ba. Hai âm đầu “chah-too” nhanh và nhẹ.' },
      },
    ],
  },

  {
    id: 'vowels',
    title: { en: 'Long and short vowels', vi: 'Nguyên âm dài và ngắn' },
    sample: 'heel / hill · hip / heap · feet / fit',
    note: {
      en: 'Vietnamese does not use the length of a vowel to tell words apart, so “heel” and “hill” easily sound the same. The long ee: lips spread as in a smile, and held. The short i: mouth relaxed, quick, leaning a little toward “e”.',
      vi: 'Tiếng Việt không dùng độ dài nguyên âm để phân biệt nghĩa, nên “heel” (gót chân) và “hill” (ngọn đồi) dễ nghe như nhau. Âm “ee” dài: căng môi như đang cười và kéo dài. Âm “i” ngắn: thả lỏng miệng, nói nhanh, hơi ngả về “ê”.',
    },
    items: [
      {
        id: 'vowels-heel-hill', clip: 'heel', en: 'heel', vi: 'gót chân', focus: ['ee'], say: 'HEEL',
        tip: { en: '“Heel” is long, lips spread as in a smile; “hill” is short and relaxed. Both keep the final l.', vi: '“Heel” kéo dài, môi căng như cười; “hill” ngắn và thả lỏng. Cả hai giữ âm “l” cuối.' },
        vs: { clip: 'sound__hill', en: 'hill', vi: 'ngọn đồi', focus: ['i'], say: 'HIL' },
      },
      {
        id: 'vowels-hip-heap', clip: 'sound__hip', en: 'hip', vi: 'hông', focus: ['i'], say: 'HIP',
        tip: { en: '“Hip” is short and crisp, with its final p. Stretch it into “heap” and it means a pile.', vi: '“Hip” ngắn và gọn, giữ âm “p” cuối. Kéo dài thành “heap” thì nghe như “một đống”.' },
        vs: { clip: 'sound__heap', en: 'heap', vi: 'một đống', focus: ['ea'], say: 'HEEP' },
      },
      {
        id: 'vowels-feet-fit', clip: 'sound__feet', en: 'feet', vi: 'bàn chân (số nhiều)', focus: ['ee'], say: 'FEET',
        tip: { en: '“Feet” is long, “fit” is short. Both end in a light but audible t.', vi: '“Feet” dài, “fit” ngắn. Cả hai kết thúc bằng âm “t” nhẹ nhưng vẫn nghe được.' },
        vs: { clip: 'sound__fit', en: 'fit', vi: 'vừa vặn; khoẻ mạnh', focus: ['i'], say: 'FIT' },
      },
      {
        id: 'vowels-seat-sit', clip: 'gluteus-maximus__plain', en: 'your seat', vi: 'cơ mông của bạn', focus: ['ea'], say: 'yor SEET',
        tip: { en: 'In class, “your seat” is the glutes and “sit” is to sit down. Long or short decides which word students hear.', vi: 'Trong lớp, “your seat” là cơ mông, còn “sit” là ngồi xuống. Âm dài hay ngắn quyết định học viên nghe thấy từ nào.' },
        vs: { clip: 'sound__sit', en: 'sit', vi: 'ngồi', focus: ['i'], say: 'SIT' },
      },
      {
        id: 'vowels-feel-fill', clip: 'sound__feel', en: 'feel', vi: 'cảm nhận', focus: ['ee'], say: 'FEEL',
        tip: { en: '“Feel the stretch” and “fill your lungs” are both everyday cues; they differ only in the length of the vowel.', vi: '“Feel the stretch” và “fill your lungs” đều là câu cue rất hay dùng, chỉ khác độ dài nguyên âm.' },
        vs: { clip: 'sound__fill', en: 'fill', vi: 'làm đầy', focus: ['i'], say: 'FIL' },
      },
      {
        id: 'vowels-breathe-breath', clip: 'sound__breathe', en: 'breathe', vi: 'thở (động từ)', focus: ['ea', 'th'], say: 'BREETH',
        tip: { en: '“Breathe” (the verb): a long ee and a buzzing th; the final e is silent. “Breath” (the noun): a short e and a voiceless th.', vi: '“Breathe” (động từ): “ee” dài và “th” rung, chữ “e” cuối câm. “Breath” (danh từ): “e” ngắn và “th” không rung.' },
        vs: { clip: 'sound__breath', en: 'breath', vi: 'hơi thở (danh từ)', focus: ['ea', 'th'], say: 'BRETH' },
      },
      {
        id: 'vowels-deep-hip', clip: 'deep-rotators', en: 'deep hip rotators', vi: 'các cơ xoay sâu của hông', focus: ['ee', 'i'], say: 'DEEP HIP ROH-tay-terz',
        tip: { en: 'One long, one short, side by side: “deep” is held, “hip” is crisp. Listen to the model and keep that difference.', vi: 'Một dài, một ngắn ngay cạnh nhau: “deep” kéo dài, “hip” gọn. Nghe giọng mẫu và giữ đúng sự khác biệt đó.' },
      },
      {
        id: 'vowels-kneecaps', clip: 'kneecap__cue-1', en: 'Lift your kneecaps to engage your thighs.', vi: 'Nâng xương bánh chè để kích hoạt đùi.', focus: ['i', 'ee'],
        tip: { en: '“Lift” is short; “kneecaps” opens with a long ee (the k is silent).', vi: '“Lift” ngắn; “kneecaps” mở đầu bằng “ee” dài (chữ “k” câm).' },
      },
      {
        id: 'vowels-sit-heels-feel', clip: 'quadriceps__cue-2', en: 'In Chair, sit back into your heels and feel your thighs working.', vi: 'Trong Cái ghế, ngồi lùi về gót chân và cảm nhận đùi đang làm việc.', focus: ['it', 'ee', 'ee'],
        tip: { en: 'Short, long, long: “sit”, “heels”, “feel”. Listen to the model, then follow that rhythm.', vi: 'Ngắn, dài, dài: “sit”, “heels”, “feel”. Nghe giọng mẫu rồi nói theo đúng nhịp đó.' },
      },
      {
        id: 'vowels-breathe-ribs', clip: 'ribs__cue-2', en: 'Breathe into your side ribs and the back of your ribs.', vi: 'Thở vào hai bên sườn và phía sau lồng ngực.', focus: ['ea', 'ib', 'ib'],
        tip: { en: '“Breathe” is long, “ribs” short, twice. Keep the final “bz” of “ribs”.', vi: '“Breathe” dài, “ribs” ngắn, hai lần. Giữ cả “bz” cuối của “ribs”.' },
      },
    ],
  },
]

const SET_BY_ID = new Map(SOUNDS.map((s) => [s.id, s]))
export const getSoundSet = (id) => SET_BY_ID.get(id)

/** The focus as a list, whether it was written as one string or several. */
export const focusList = (focus) => (Array.isArray(focus) ? focus : focus ? [focus] : [])

/**
 * Where each focus sits in the text: [[start, end], ...] in order, each
 * found after the one before (case-insensitive), or null when one is
 * missing. The UI marks these; the checker rejects a null.
 */
export function focusRanges(text, focus) {
  const lower = String(text || '').toLowerCase()
  const out = []
  let from = 0
  for (const f of focusList(focus)) {
    const at = lower.indexOf(String(f).toLowerCase(), from)
    if (at < 0 || !f) return null
    out.push([at, at + f.length])
    from = at + f.length
  }
  return out
}

/**
 * The new lines the sets need, for scripts/export-clips.mjs: one clip per
 * `sound__*` id, with kind "sound" (the audio generator's delivery for it).
 */
export function soundClips() {
  const seen = new Map()
  for (const set of SOUNDS) {
    for (const it of set.items) {
      for (const line of [it, it.vs].filter(Boolean)) {
        if (SOUND_CLIP.test(line.clip) && !seen.has(line.clip)) seen.set(line.clip, { id: line.clip, text: line.en, lang: 'en', kind: 'sound' })
      }
    }
  }
  return [...seen.values()]
}

/** Every clip a set plays, its own and its pairs', in order. */
export const soundSetClips = (set) => set.items.flatMap((it) => [it.clip, it.vs?.clip].filter(Boolean))
