import { ASHTANGA_POSES } from './ashtanga/index.js'
import { VINYASA_POSES } from './vinyasa/index.js'
import { YIN_POSES } from './yin/index.js'

/**
 * The pose library. One folder per style owns its poses (see README.md in
 * this folder): a pose that belongs to several styles lives in one file and
 * lists them all in `styles`. Display order within a style is the order of
 * each folder's index; the Poses tab regroups as it needs.
 */
export const POSES = [...ASHTANGA_POSES, ...VINYASA_POSES, ...YIN_POSES]
