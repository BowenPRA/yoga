export const revolvedSideAngle = {
  id: 'revolved-side-angle',
  styles: ['vinyasa', 'ashtanga'],
  family: 'twist',
  level: 'strong',
  en: 'Revolved Side Angle',
  aka: ['Twisted Side Angle'],
  sa: 'Parivṛtta Pārśvakoṇāsana',
  say: 'pah-ree-VRIT-tah parsh-vah-koh-NAH-sah-nah',
  vi: 'Góc nghiêng vặn',

  ashtanga: {
    series: 'primary',
    section: 'standing',
    position: 15,
    vinyasas: 5,
    breaths: 5,
    drishti: 'hand',
    note: {
      en: 'Five vinyasas, the right side on dve and the left on catvāri, five breaths each; the last of the four poses that turn side to side before Prasārita Pādottānāsana. The teacher counts “Ekam, inhale, turn to the right; dve, exhale, Parivṛtta Pārśvakoṇāsana”.',
      vi: 'Năm vinyasa, bên phải ở dve và bên trái ở catvāri, năm nhịp thở mỗi bên; tư thế cuối trong bốn tư thế đổi bên trước Prasārita Pādottānāsana. Giáo viên đếm “Ekam, hít vào, xoay sang phải; dve, thở ra, Parivṛtta Pārśvakoṇāsana”.',
    },
  },

  breath: {
    en: 'Inhale to lengthen. Exhale to twist and place your hand down. Stay for five breaths.',
    vi: 'Hít vào để kéo dài. Thở ra để vặn và đặt tay xuống. Giữ năm nhịp thở.',
  },

  cues: [
    { id: 'revolved-side-angle__cue-1', kind: 'transition', en: 'Turn to the right, turn your back foot in, and bend your front knee.', vi: 'Xoay sang phải, xoay bàn chân sau vào trong, và gập gối trước.' },
    { id: 'revolved-side-angle__cue-2', kind: 'transition', en: 'Exhale, twist and bring your left shoulder outside your right knee.', vi: 'Thở ra, vặn người và đưa vai trái ra ngoài gối phải.' },
    { id: 'revolved-side-angle__cue-3', kind: 'alignment', en: 'Place your left hand on the floor, outside your right foot.', vi: 'Đặt bàn tay trái xuống sàn, phía ngoài bàn chân phải.' },
    { id: 'revolved-side-angle__cue-4', kind: 'alignment', en: 'Keep your back leg straight and press your back heel down.', vi: 'Giữ chân sau thẳng và ấn gót chân sau xuống.' },
    { id: 'revolved-side-angle__cue-5', kind: 'alignment', en: 'Reach your right arm over your ear and turn your chest up.', vi: 'Vươn tay phải qua tai và xoay ngực lên trên.' },
    { id: 'revolved-side-angle__cue-6', kind: 'soften', en: 'Lengthen first, then let the twist grow from your belly.', vi: 'Kéo dài trước, rồi để động tác vặn lan ra từ bụng.' },
    { id: 'revolved-side-angle__cue-7', kind: 'breath', en: 'Stay for five breaths. If your breath gets short, twist less.', vi: 'Giữ năm nhịp thở. Nếu hơi thở bị ngắn lại, vặn ít đi.' },
    { id: 'revolved-side-angle__cue-8', kind: 'safety', en: 'Keep your front knee over your ankle as you twist.', vi: 'Giữ gối trước thẳng trên cổ chân khi bạn vặn.' },
    { id: 'revolved-side-angle__cue-9', kind: 'transition', en: 'Inhale, come up, and turn to the left.', vi: 'Hít vào, đứng lên, và xoay sang trái.' },
  ],

  modifications: [
    { id: 'revolved-side-angle__mod-1', en: 'Lower your back knee to the mat, and bring your hands together with your elbow outside your knee.', vi: 'Hạ gối sau xuống thảm, và chắp hai tay với khuỷu tay đặt ở phía ngoài gối.', props: [] },
    { id: 'revolved-side-angle__mod-2', en: 'Put a block under your bottom hand, inside or outside your foot.', vi: 'Kê một viên gạch dưới bàn tay phía dưới, ở phía trong hoặc phía ngoài bàn chân.', props: ['block'] },
    { id: 'revolved-side-angle__mod-3', en: 'Lift your back heel if it won’t stay down.', vi: 'Nhấc gót chân sau lên nếu gót không giữ được trên sàn.', props: [] },
  ],

  safety: [
    { id: 'revolved-side-angle__safe-1', en: 'With a lower back or sacrum problem, twist gently with your hands together at your chest.', vi: 'Nếu lưng dưới hoặc xương cùng có vấn đề, vặn nhẹ với hai tay chắp trước ngực.' },
    { id: 'revolved-side-angle__safe-2', en: 'With a knee injury, bend your front knee less.', vi: 'Nếu gối có chấn thương, gập gối trước ít lại.' },
    { id: 'revolved-side-angle__safe-3', en: 'In pregnancy, skip deep twists. Take Extended Side Angle again instead.', vi: 'Khi mang thai, bỏ qua các tư thế vặn sâu. Tập lại Góc nghiêng mở rộng thay thế.' },
  ],

  muscles: {
    working: ['quadriceps', 'external-oblique', 'internal-oblique'],
    lengthening: ['iliopsoas', 'calves'],
  },
  joints: ['knee', 'hip-joint', 'thoracic-spine', 'ankle'],
  transitionsTo: ['wide-legged-fold'],
  figure: 'revolved-side-angle',
}
