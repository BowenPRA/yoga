import { hipLesson } from './hip.js'
import { kneeLesson } from './knee.js'
import { spineLesson } from './spine.js'
import { shoulderLesson } from './shoulder.js'
import { armLesson } from './arm.js'
import { footLesson } from './foot.js'
import { breathLesson } from './breath.js'

/**
 * Lessons by body region, in the order she should meet them. A region with
 * no `slides` yet is listed but not openable. One file per lesson.
 */
export const LESSONS = [hipLesson, kneeLesson, spineLesson, shoulderLesson, armLesson, footLesson, breathLesson]
