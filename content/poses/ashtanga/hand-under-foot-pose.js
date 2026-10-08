export const handUnderFootPose = {
  id: 'hand-under-foot-pose',
  styles: ['ashtanga'],
  family: 'forward-fold',
  level: 'moderate',
  en: 'Hand Under Foot Pose',
  aka: ['Gorilla Pose'],
  sa: 'Pādahastāsana',
  say: 'pah-dah-hah-STAH-sah-nah',
  vi: 'Gập người, tay dưới bàn chân',

  ashtanga: {
    series: 'primary',
    section: 'standing',
    position: 11,
    vinyasas: 3,
    breaths: 5,
    drishti: 'nose',
    note: {
      en: 'Follows Pādāṅguṣṭhāsana without coming up: three vinyasas, with the state on dve, five breaths. The teacher counts “Inhale, hands under your feet, look up; dve, exhale, fold”, and after five breaths “Trīṇi, inhale, look up” before you come up to stand.',
      vi: 'Theo ngay sau Pādāṅguṣṭhāsana mà không đứng lên: ba vinyasa, trạng thái ở dve, năm nhịp thở. Giáo viên đếm “Hít vào, đặt tay dưới bàn chân, nhìn lên; dve, thở ra, gập người”, và sau năm nhịp thở “Trīṇi, hít vào, nhìn lên” trước khi bạn đứng dậy.',
    },
  },

  breath: {
    en: 'Inhale to look up with your hands under your feet. Exhale to fold, and stay for five breaths.',
    vi: 'Hít vào, nhìn lên với hai tay dưới bàn chân. Thở ra để gập người, và giữ năm nhịp thở.',
  },

  cues: [
    { id: 'hand-under-foot-pose__cue-1', kind: 'transition', en: 'Lift the front of your feet and slide your hands underneath, palms up.', vi: 'Nhấc phần trước bàn chân lên và luồn hai bàn tay xuống dưới, lòng bàn tay ngửa lên.' },
    { id: 'hand-under-foot-pose__cue-2', kind: 'alignment', en: 'Bring your toes all the way to your wrist creases.', vi: 'Đưa các ngón chân chạm tới nếp gấp cổ tay.' },
    { id: 'hand-under-foot-pose__cue-3', kind: 'alignment', en: 'Inhale, straighten your arms and look up.', vi: 'Hít vào, duỗi thẳng tay và nhìn lên.' },
    { id: 'hand-under-foot-pose__cue-4', kind: 'alignment', en: 'Exhale, bend your elbows out to the sides and fold deeper.', vi: 'Thở ra, mở khuỷu tay sang hai bên và gập sâu hơn.' },
    { id: 'hand-under-foot-pose__cue-5', kind: 'alignment', en: 'Shift your weight forward so your hips stay over your feet.', vi: 'Dồn trọng lượng về trước để hông nằm ngay trên bàn chân.' },
    { id: 'hand-under-foot-pose__cue-6', kind: 'soften', en: 'Let your wrists open slowly. Press down only as much as feels good.', vi: 'Để cổ tay mở ra từ từ. Chỉ ấn xuống ở mức bạn thấy dễ chịu.' },
    { id: 'hand-under-foot-pose__cue-7', kind: 'breath', en: 'Five breaths here. Let each exhale draw your belly in.', vi: 'Năm nhịp thở ở đây. Để mỗi hơi thở ra giúp bụng hóp vào.' },
    { id: 'hand-under-foot-pose__cue-8', kind: 'safety', en: 'If your wrists hurt, slide your hands out a little, or hold your ankles.', vi: 'Nếu cổ tay đau, rút tay ra một chút, hoặc nắm cổ chân.' },
    { id: 'hand-under-foot-pose__cue-9', kind: 'transition', en: 'Inhale, look up. Exhale, hands to your hips. Inhale, come all the way up.', vi: 'Hít vào, nhìn lên. Thở ra, đặt tay lên hông. Hít vào, đứng hẳn lên.' },
  ],

  modifications: [
    { id: 'hand-under-foot-pose__mod-1', en: 'Bend your knees deeply so your hands slide under easily.', vi: 'Chùng gối sâu để tay luồn xuống dễ dàng.', props: [] },
    { id: 'hand-under-foot-pose__mod-2', en: 'Hold the backs of your ankles instead.', vi: 'Nắm phía sau cổ chân thay vì luồn tay.', props: [] },
  ],

  safety: [
    { id: 'hand-under-foot-pose__safe-1', en: 'With a wrist injury, skip the hands under your feet and hold your ankles.', vi: 'Nếu cổ tay có chấn thương, bỏ qua bước luồn tay và nắm cổ chân.' },
    { id: 'hand-under-foot-pose__safe-2', en: 'With a lower back injury, keep your knees bent and come up with a flat back.', vi: 'Nếu lưng dưới có chấn thương, giữ gối chùng và đứng lên với lưng phẳng.' },
  ],

  muscles: { working: ['quadriceps', 'biceps-brachii'], lengthening: ['hamstrings', 'calves', 'forearm-flexors'] },
  joints: ['wrist', 'hip-joint', 'sit-bones', 'knee'],
  transitionsTo: ['triangle'],
  figure: 'hand-under-foot-pose',
}
