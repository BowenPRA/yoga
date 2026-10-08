export const boundLotus = {
  id: 'bound-lotus',
  styles: ['ashtanga'],
  family: 'seated',
  level: 'strong',
  en: 'Bound Lotus',
  aka: ['Yoga Mudra'],
  sa: 'Baddha Padmāsana, Yoga Mudrā',
  say: 'BAH-dah pad-MAH-sah-nah, YOH-gah MOO-drah',
  vi: 'Hoa sen khoá tay',
  saNote: {
    en: 'Baddha Padmāsana is the bound lotus; Yoga Mudrā, the “seal of yoga”, is the same bind folded forward.',
    vi: 'Baddha Padmāsana là hoa sen khoá tay; Yoga Mudrā, “ấn của yoga”, là cùng thế khoá ấy khi gập người về trước.',
  },

  ashtanga: {
    series: 'primary',
    section: 'finishing',
    position: 48,
    breaths: 10,
    drishti: 'nose',
    note: {
      en: 'The first of the last three seated poses: bind your feet from behind in lotus, Baddha Padmāsana, then fold forward into Yoga Mudrā for ten breaths. The teacher says “Inhale, Baddha Padmāsana; exhale, Yoga Mudrā” and counts ten.',
      vi: 'Tư thế đầu tiên trong ba tư thế ngồi cuối cùng: khoá bàn chân từ phía sau trong hoa sen, Baddha Padmāsana, rồi gập người về trước vào Yoga Mudrā trong mười nhịp thở. Giáo viên nói “Hít vào, Baddha Padmāsana; thở ra, Yoga Mudrā” và đếm mười nhịp.',
    },
  },

  breath: {
    en: 'Inhale to bind and lift your chest. Exhale to fold. Stay for ten breaths.',
    vi: 'Hít vào để khoá tay và nâng ngực. Thở ra để gập người. Giữ mười nhịp thở.',
  },

  cues: [
    { id: 'bound-lotus__cue-1', kind: 'transition', en: 'Sit in full lotus, right foot first, then left.', vi: 'Ngồi hoa sen trọn vẹn, bàn chân phải trước, rồi đến bàn chân trái.' },
    { id: 'bound-lotus__cue-2', kind: 'alignment', en: 'Wrap your left arm behind your back and catch your left big toe.', vi: 'Vòng tay trái ra sau lưng và nắm ngón chân cái trái.' },
    { id: 'bound-lotus__cue-3', kind: 'alignment', en: 'Then wrap your right arm behind and catch your right big toe.', vi: 'Rồi vòng tay phải ra sau và nắm ngón chân cái phải.' },
    { id: 'bound-lotus__cue-4', kind: 'alignment', en: 'Inhale, lift your chest and draw your shoulder blades together.', vi: 'Hít vào, nâng ngực và kéo hai bả vai lại gần nhau.' },
    { id: 'bound-lotus__cue-5', kind: 'transition', en: 'Exhale, fold forward and bring your forehead or chin toward the floor.', vi: 'Thở ra, gập người về trước và đưa trán hoặc cằm về phía sàn.' },
    { id: 'bound-lotus__cue-6', kind: 'soften', en: 'Let your shoulders relax around the bind.', vi: 'Để vai thả lỏng quanh thế khoá.' },
    { id: 'bound-lotus__cue-7', kind: 'breath', en: 'Stay for ten breaths, slow and quiet.', vi: 'Giữ mười nhịp thở, chậm và nhẹ.' },
    { id: 'bound-lotus__cue-8', kind: 'safety', en: 'If your knees hurt, release the lotus straight away.', vi: 'Nếu gối đau, thả hoa sen ra ngay.' },
    { id: 'bound-lotus__cue-9', kind: 'transition', en: 'Inhale, come up, and release your hands to your knees.', vi: 'Hít vào, ngồi dậy, và thả hai tay đặt lên gối.' },
  ],

  modifications: [
    { id: 'bound-lotus__mod-1', en: 'Sit in half lotus, or simply cross-legged.', vi: 'Ngồi nửa hoa sen, hoặc đơn giản là ngồi xếp bằng.', props: [] },
    { id: 'bound-lotus__mod-2', en: 'Hold a strap behind your back, or hold your elbows, instead of your toes.', vi: 'Cầm một sợi dây sau lưng, hoặc nắm khuỷu tay, thay vì nắm ngón chân.', props: ['strap'] },
    { id: 'bound-lotus__mod-3', en: 'Sit on a folded blanket so your knees can drop.', vi: 'Ngồi trên chăn gấp để gối có thể hạ xuống.', props: ['blanket'] },
  ],

  safety: [
    { id: 'bound-lotus__safe-1', en: 'Never force lotus. Pain in your knee or ankle means come out.', vi: 'Đừng bao giờ ép hoa sen. Đau ở gối hoặc cổ chân nghĩa là cần thoát ra.' },
    { id: 'bound-lotus__safe-2', en: 'In pregnancy, sit cross-legged and skip the forward fold.', vi: 'Khi mang thai, ngồi xếp bằng và bỏ qua bước gập người.' },
  ],

  muscles: { working: ['rhomboids', 'deep-rotators'], lengthening: ['pectoralis-major', 'erector-spinae'] },
  joints: ['hip-joint', 'knee', 'ankle', 'shoulder-joint'],
  transitionsTo: ['lotus'],
  figure: 'bound-lotus',
}
