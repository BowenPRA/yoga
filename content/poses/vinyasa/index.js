// Warm-up on the mat
import { childPose } from './child-pose.js'
import { catPose } from './cat-pose.js'
import { cowPose } from './cow-pose.js'
import { puppyPose } from './puppy-pose.js'
// Core
import { plank } from './plank.js'
import { forearmPlank } from './forearm-plank.js'
import { sidePlank } from './side-plank.js'
// Standing
import { lowLunge } from './low-lunge.js'
import { crescentLunge } from './crescent-lunge.js'
import { reverseWarrior } from './reverse-warrior.js'
import { humbleWarrior } from './humble-warrior.js'
import { goddessPose } from './goddess-pose.js'
import { sideBend } from './side-bend.js'
// Balance
import { treePose } from './tree-pose.js'
import { eaglePose } from './eagle-pose.js'
import { warrior3 } from './warrior-3.js'
import { halfMoon } from './half-moon.js'
import { dancerPose } from './dancer-pose.js'
// Arm balance and inversions
import { crowPose } from './crow-pose.js'
import { dolphinPose } from './dolphin-pose.js'
import { handstand } from './handstand.js'
// Backbends
import { cobra } from './cobra.js'
import { locustPose } from './locust-pose.js'
import { bowPose } from './bow-pose.js'
import { camelPose } from './camel-pose.js'
import { bridgePose } from './bridge-pose.js'
import { wildThing } from './wild-thing.js'
// Hip openers and forward folds
import { lizardPose } from './lizard-pose.js'
import { halfSplits } from './half-splits.js'
import { pigeon } from './pigeon.js'
import { malasana } from './malasana.js'
import { figureFour } from './figure-four.js'
import { happyBaby } from './happy-baby.js'
import { reclinedBoundAngle } from './reclined-bound-angle.js'
// Seated
import { heroPose } from './hero-pose.js'
import { reclinedHero } from './reclined-hero.js'
import { gatePose } from './gate-pose.js'
import { cowFacePose } from './cow-face-pose.js'
// Twists
import { threadTheNeedle } from './thread-the-needle.js'
import { seatedTwist } from './seated-twist.js'
import { supineTwist } from './supine-twist.js'

/**
 * Poses common in Vinyasa classes that are not part of the Ashtanga primary
 * series (those live in ../ashtanga). Grouped by family in display order,
 * which follows the arc of a class: warm-up on the mat, core, standing,
 * balance, arm balance and inversions, backbends, hip openers, seated,
 * twists.
 */
export const VINYASA_POSES = [
  // restorative (warm-up)
  childPose, catPose, cowPose, puppyPose,
  // core
  plank, forearmPlank, sidePlank,
  // standing
  lowLunge, crescentLunge, reverseWarrior, humbleWarrior, goddessPose, sideBend,
  // balance
  treePose, eaglePose, warrior3, halfMoon, dancerPose,
  // arm-balance, inversion
  crowPose, dolphinPose, handstand,
  // backbend
  cobra, locustPose, bowPose, camelPose, bridgePose, wildThing,
  // hip-opener, forward-fold
  lizardPose, halfSplits, pigeon, malasana, figureFour, happyBaby, reclinedBoundAngle,
  // seated
  heroPose, reclinedHero, gatePose, cowFacePose,
  // twist
  threadTheNeedle, seatedTwist, supineTwist,
]
