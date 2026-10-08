import { downwardDog } from './downward-dog.js'
import { warrior2 } from './warrior-2.js'
import { SEATED_POSES } from './seated/index.js'

/**
 * The Ashtanga primary series, in sequence order: Surya Namaskara A and B,
 * the standing sequence (this folder), the seated sequence (./seated), the
 * finishing sequence (this folder). Poses here that every Vinyasa class also
 * uses carry both styles.
 */
export const ASHTANGA_POSES = [downwardDog, warrior2, ...SEATED_POSES]
