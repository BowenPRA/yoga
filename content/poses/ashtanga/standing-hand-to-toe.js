export const standingHandToToe = {
  id: 'standing-hand-to-toe',
  styles: ['ashtanga'],
  family: 'balance',
  level: 'strong',
  en: 'Extended Hand-to-Big-Toe Pose',
  aka: ['Standing Hand to Big Toe'],
  sa: 'Utthita Hasta Pādāṅguṣṭhāsana',
  say: 'oo-TEE-tah HAH-stah pah-dahn-goosh-TAH-sah-nah',
  vi: 'Đứng một chân nắm ngón chân cái',

  ashtanga: {
    series: 'primary',
    section: 'standing',
    position: 18,
    vinyasas: 14,
    breaths: 5,
    drishti: 'toes',
    note: {
      en: 'Fourteen vinyasas, seven to each side, in three parts of five breaths each: forward with your chin to your shin, out to the side looking over your opposite shoulder, then forward again with your hands on your hips. The teacher counts “Ekam, inhale, lift your right leg; dve, exhale, fold”.',
      vi: 'Mười bốn vinyasa, bảy cho mỗi bên, gồm ba phần, mỗi phần năm nhịp thở: chân ra trước với cằm hướng về ống chân, chân sang bên với mắt nhìn qua vai bên kia, rồi chân ra trước lần nữa với hai tay chống hông. Giáo viên đếm “Ekam, hít vào, nâng chân phải; dve, thở ra, gập người”.',
    },
  },

  breath: {
    en: 'Exhale to fold over your lifted leg, and inhale to lift your head. Five breaths in each of the three parts.',
    vi: 'Thở ra để gập người trên chân đang nâng, và hít vào để nâng đầu lên. Năm nhịp thở ở mỗi phần trong ba phần.',
  },

  cues: [
    { id: 'standing-hand-to-toe__cue-1', kind: 'transition', en: 'Shift your weight onto your left foot, and catch your right big toe with your first two fingers.', vi: 'Dồn trọng lượng sang bàn chân trái, và móc ngón chân cái phải bằng ngón trỏ và ngón giữa.' },
    { id: 'standing-hand-to-toe__cue-2', kind: 'alignment', en: 'Inhale, straighten your right leg forward, left hand on your hip.', vi: 'Hít vào, duỗi thẳng chân phải về trước, tay trái chống hông.' },
    { id: 'standing-hand-to-toe__cue-3', kind: 'alignment', en: 'Exhale, fold, and bring your chin toward your shin.', vi: 'Thở ra, gập người, và đưa cằm về phía ống chân.' },
    { id: 'standing-hand-to-toe__cue-4', kind: 'alignment', en: 'Take your leg out to the side, and look over your left shoulder.', vi: 'Đưa chân sang bên, và nhìn qua vai trái.' },
    { id: 'standing-hand-to-toe__cue-5', kind: 'alignment', en: 'Bring your leg back to the centre, hands on your hips, and hold it up on its own.', vi: 'Đưa chân về giữa, hai tay chống hông, và tự giữ chân ở trên.' },
    { id: 'standing-hand-to-toe__cue-6', kind: 'soften', en: 'Keep your standing leg strong and your shoulders soft.', vi: 'Giữ chân trụ vững và vai thả lỏng.' },
    { id: 'standing-hand-to-toe__cue-7', kind: 'breath', en: 'Five breaths in each part. If you wobble, keep breathing.', vi: 'Năm nhịp thở ở mỗi phần. Nếu bạn chao đảo, cứ tiếp tục thở.' },
    { id: 'standing-hand-to-toe__cue-8', kind: 'safety', en: 'Bend your lifted knee if the back of your leg pulls hard.', vi: 'Chùng gối của chân đang nâng nếu mặt sau chân bị kéo mạnh.' },
    { id: 'standing-hand-to-toe__cue-9', kind: 'transition', en: 'Exhale, lower your leg, and come back to Samasthiti.', vi: 'Thở ra, hạ chân xuống, và trở về Samasthiti.' },
  ],

  modifications: [
    { id: 'standing-hand-to-toe__mod-1', en: 'Loop a strap around the ball of your lifted foot.', vi: 'Vòng dây tập quanh gốc ngón chân của bàn chân đang nâng.', props: ['strap'] },
    { id: 'standing-hand-to-toe__mod-2', en: 'Hold your bent knee instead of your toe.', vi: 'Ôm gối đang gập thay vì nắm ngón chân.', props: [] },
    { id: 'standing-hand-to-toe__mod-3', en: 'Stand beside a wall and touch it with your free hand for balance.', vi: 'Đứng cạnh tường và chạm tay còn lại vào tường để giữ thăng bằng.', props: ['wall'] },
  ],

  safety: [
    { id: 'standing-hand-to-toe__safe-1', en: 'Keep your standing knee straight, but not locked.', vi: 'Giữ gối chân trụ thẳng, nhưng không khoá gối.' },
    { id: 'standing-hand-to-toe__safe-2', en: 'With a lower back injury, keep your lifted knee bent and your back upright, and skip the fold.', vi: 'Nếu lưng dưới có chấn thương, giữ gối chân nâng chùng và lưng thẳng, và bỏ qua bước gập người.' },
    { id: 'standing-hand-to-toe__safe-3', en: 'In pregnancy, use the wall and the strap, and skip the fold.', vi: 'Khi mang thai, dùng tường và dây tập, và bỏ qua bước gập người.' },
  ],

  muscles: {
    working: ['quadriceps', 'gluteus-medius', 'iliopsoas'],
    lengthening: ['hamstrings', 'hip-adductors'],
  },
  joints: ['hip-joint', 'knee', 'ankle', 'pelvis'],
  transitionsTo: ['half-bound-lotus-standing'],
  figure: 'standing-hand-to-toe',
}
