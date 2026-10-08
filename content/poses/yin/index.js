import { swan } from './swan.js'
import { sleepingSwan } from './sleeping-swan.js'
import { shoelace } from './shoelace.js'
import { square } from './square.js'
import { dragon } from './dragon.js'
import { frog } from './frog.js'
import { butterfly } from './butterfly.js'
import { halfButterfly } from './half-butterfly.js'
import { dragonfly } from './dragonfly.js'
import { deer } from './deer.js'
import { catPullingItsTail } from './cat-pulling-its-tail.js'
import { caterpillar } from './caterpillar.js'
import { snail } from './snail.js'
import { sphinx } from './sphinx.js'
import { seal } from './seal.js'
import { meltingHeart } from './melting-heart.js'
import { bananasana } from './bananasana.js'
import { reclinedTwist } from './reclined-twist.js'
import { saddle } from './saddle.js'
import { halfSaddle } from './half-saddle.js'
import { toeSquat } from './toe-squat.js'
import { ankleStretch } from './ankle-stretch.js'
import { squat } from './squat.js'
import { dangling } from './dangling.js'
import { supportedFish } from './supported-fish.js'
import { legsUpTheWall } from './legs-up-the-wall.js'

/**
 * Yin poses under their Yin names, grouped by the area they mainly target,
 * in display order. Within a group, a pose that usually leads into another
 * comes first (Swan before Sleeping Swan, Sphinx before Seal, Toe Squat
 * before Ankle Stretch).
 */
export const YIN_AREAS = [
  {
    id: 'hips',
    title: { en: 'Hips', vi: 'Hông' },
    poses: [swan, sleepingSwan, shoelace, square, dragon, frog, butterfly, halfButterfly, dragonfly, deer, catPullingItsTail],
  },
  {
    id: 'spine',
    title: { en: 'Spine', vi: 'Cột sống' },
    poses: [caterpillar, snail, sphinx, seal, meltingHeart, bananasana, reclinedTwist, saddle, halfSaddle],
  },
  {
    id: 'legs-feet',
    title: { en: 'Legs and feet', vi: 'Chân và bàn chân' },
    poses: [toeSquat, ankleStretch, squat, dangling],
  },
  {
    id: 'rest',
    title: { en: 'Rest', vi: 'Nghỉ ngơi' },
    poses: [supportedFish, legsUpTheWall],
  },
]

/** Every Yin pose, in the order of YIN_AREAS. */
export const YIN_POSES = YIN_AREAS.flatMap((a) => a.poses)
