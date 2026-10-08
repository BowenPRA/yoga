// Surya Namaskara A
import { mountainPose } from './mountain-pose.js'
import { upwardSalute } from './upward-salute.js'
import { standingForwardFold } from './standing-forward-fold.js'
import { halfLift } from './half-lift.js'
import { chaturanga } from './chaturanga.js'
import { upwardDog } from './upward-dog.js'
import { downwardDog } from './downward-dog.js'
// Surya Namaskara B
import { chairPose } from './chair-pose.js'
import { warrior1 } from './warrior-1.js'
// Standing sequence
import { bigToePose } from './big-toe-pose.js'
import { handUnderFootPose } from './hand-under-foot-pose.js'
import { triangle } from './triangle.js'
import { revolvedTriangle } from './revolved-triangle.js'
import { extendedSideAngle } from './extended-side-angle.js'
import { revolvedSideAngle } from './revolved-side-angle.js'
import { wideLeggedFold } from './wide-legged-fold.js'
import { pyramidPose } from './pyramid-pose.js'
import { standingHandToToe } from './standing-hand-to-toe.js'
import { halfBoundLotusStanding } from './half-bound-lotus-standing.js'
import { warrior2 } from './warrior-2.js'
// Seated sequence (positions 21 to 39)
import { SEATED_POSES } from './seated/index.js'
// Finishing sequence
import { wheelPose } from './wheel-pose.js'
import { shoulderstand } from './shoulderstand.js'
import { plowPose } from './plow-pose.js'
import { earPressurePose } from './ear-pressure-pose.js'
import { lotusInShoulderstand } from './lotus-in-shoulderstand.js'
import { fishPose } from './fish-pose.js'
import { extendedLegPose } from './extended-leg-pose.js'
import { headstand } from './headstand.js'
import { boundLotus } from './bound-lotus.js'
import { lotus } from './lotus.js'
import { upliftingPose } from './uplifting-pose.js'
import { savasana } from './savasana.js'

/**
 * The Ashtanga primary series, in sequence order: Surya Namaskara A and B,
 * the standing sequence (this folder), the seated sequence (./seated), the
 * finishing sequence (this folder). Poses here that every Vinyasa class also
 * uses carry both styles. A pose that recurs in the series (Downward Dog,
 * Chair, Warrior I) appears once, at its first appearance; its note names
 * the later ones.
 */
export const ASHTANGA_POSES = [
  // Surya Namaskara A (positions 1 to 7)
  mountainPose, upwardSalute, standingForwardFold, halfLift, chaturanga, upwardDog, downwardDog,
  // Surya Namaskara B (8, 9)
  chairPose, warrior1,
  // Standing (10 to 20)
  bigToePose, handUnderFootPose, triangle, revolvedTriangle, extendedSideAngle, revolvedSideAngle,
  wideLeggedFold, pyramidPose, standingHandToToe, halfBoundLotusStanding, warrior2,
  // Seated (21 to 39)
  ...SEATED_POSES,
  // Finishing (40 to 51)
  wheelPose, shoulderstand, plowPose, earPressurePose, lotusInShoulderstand, fishPose, extendedLegPose,
  headstand, boundLotus, lotus, upliftingPose, savasana,
]
