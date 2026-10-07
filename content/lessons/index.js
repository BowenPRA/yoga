import { hipLesson } from './hip.js'

/**
 * Lessons by body region, in the order she should meet them. A region with
 * no `slides` yet is listed but not openable.
 */
export const LESSONS = [
  hipLesson,
  { id: 'knee', region: 'leg', title: { en: 'Knee and lower leg', vi: 'Đầu gối và cẳng chân' } },
  { id: 'spine', region: 'spine', title: { en: 'Spine and trunk', vi: 'Cột sống và thân' } },
  { id: 'shoulder', region: 'shoulder-girdle', title: { en: 'Shoulder girdle', vi: 'Vai' } },
  { id: 'arm', region: 'arm', title: { en: 'Arm and hand', vi: 'Tay và bàn tay' } },
  { id: 'foot', region: 'foot', title: { en: 'Foot', vi: 'Bàn chân' } },
  { id: 'breath', region: 'trunk', title: { en: 'Breath', vi: 'Hơi thở' } },
]
