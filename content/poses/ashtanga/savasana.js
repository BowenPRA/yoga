export const savasana = {
  id: 'savasana',
  styles: ['vinyasa', 'ashtanga', 'yin'],
  family: 'restorative',
  level: 'gentle',
  en: 'Savasana',
  aka: ['Corpse Pose', 'Final Rest'],
  sa: 'Śavāsana',
  say: 'shah-VAH-sah-nah',
  vi: 'Xác chết',

  ashtanga: {
    series: 'primary',
    section: 'finishing',
    position: 51,
    note: {
      en: 'The rest at the end of the practice, after the closing chant if your shala chants one: lie still with your eyes closed for at least ten minutes. There is no count; the teacher simply says “Take rest”.',
      vi: 'Phần nghỉ ở cuối buổi tập, sau câu tụng kết thúc nếu lớp của bạn có tụng: nằm yên, mắt khép lại, ít nhất mười phút. Không có nhịp đếm; giáo viên chỉ nói “Take rest”, nghĩa là hãy nghỉ ngơi.',
    },
  },
  yin: {
    holdMinutes: 8,
    target: ['spine'],
    note: {
      en: 'Eight minutes or longer at the end of a Yin class, completely still, so your body can take in the long holds. Nothing should strain: if your lower back aches, slide a bolster under your knees.',
      vi: 'Tám phút hoặc lâu hơn ở cuối lớp Yin, hoàn toàn tĩnh lặng, để cơ thể đón nhận những lần giữ thế dài. Không có gì phải gắng sức: nếu lưng dưới mỏi, kê gối ôm dưới đầu gối.',
    },
  },

  breath: {
    en: 'Let go of controlling your breath. Let it be natural and quiet.',
    vi: 'Buông bỏ việc điều khiển hơi thở. Để hơi thở tự nhiên và nhẹ nhàng.',
  },

  cues: [
    { id: 'savasana__cue-1', kind: 'transition', en: 'Lie down on your back, and let your legs fall open.', vi: 'Nằm ngửa, và để hai chân buông mở ra.' },
    { id: 'savasana__cue-2', kind: 'alignment', en: 'Rest your arms a little away from your body, palms facing up.', vi: 'Đặt hai tay cách thân một chút, lòng bàn tay ngửa lên.' },
    { id: 'savasana__cue-3', kind: 'alignment', en: 'Tuck your shoulder blades under, and lengthen the back of your neck.', vi: 'Thu hai bả vai xuống dưới, và kéo dài phía sau cổ.' },
    { id: 'savasana__cue-4', kind: 'alignment', en: 'Let your head rest in the middle, chin slightly down.', vi: 'Để đầu nằm ngay chính giữa, cằm hơi hạ xuống.' },
    { id: 'savasana__cue-5', kind: 'soften', en: 'Close your eyes, and let your whole body become heavy.', vi: 'Nhắm mắt lại, và để toàn bộ cơ thể trở nên nặng.' },
    { id: 'savasana__cue-6', kind: 'breath', en: 'Let your breath find its own rhythm.', vi: 'Để hơi thở tự tìm nhịp của nó.' },
    { id: 'savasana__cue-7', kind: 'safety', en: 'If your lower back feels tight, bend your knees, or rest them on a bolster.', vi: 'Nếu lưng dưới thấy căng, co gối lại, hoặc kê gối ôm dưới đầu gối.' },
    { id: 'savasana__cue-8', kind: 'transition', en: 'When you’re ready, deepen your breath, roll onto your right side, and slowly come up to sit.', vi: 'Khi bạn sẵn sàng, hít thở sâu hơn, lăn người sang bên phải, và từ từ ngồi dậy.' },
  ],

  modifications: [
    { id: 'savasana__mod-1', en: 'Place a bolster or a rolled blanket under your knees.', vi: 'Kê gối ôm hoặc chăn cuộn dưới đầu gối.', props: ['bolster', 'blanket'] },
    { id: 'savasana__mod-2', en: 'Rest your head on a folded blanket.', vi: 'Gối đầu lên chăn gấp.', props: ['blanket'] },
    { id: 'savasana__mod-3', en: 'Lie on your left side with a bolster between your knees.', vi: 'Nằm nghiêng bên trái với gối ôm kẹp giữa hai đầu gối.', props: ['bolster'] },
  ],

  safety: [
    { id: 'savasana__safe-1', en: 'From the middle of pregnancy, rest on your left side instead of flat on your back.', vi: 'Từ giữa thai kỳ, nằm nghiêng bên trái thay vì nằm ngửa.' },
    { id: 'savasana__safe-2', en: 'If you feel cold, cover yourself with a blanket. The body cools quickly at rest.', vi: 'Nếu thấy lạnh, hãy đắp chăn. Cơ thể nhanh lạnh khi nghỉ.' },
  ],

  muscles: { working: ['diaphragm'], lengthening: [] },
  joints: ['sacrum', 'shoulder-blades', 'cervical-spine'],
  transitionsTo: [],
  figure: 'savasana',
}
