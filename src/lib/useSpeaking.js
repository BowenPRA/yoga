import { useEffect, useState } from 'react'
import { audio } from './audio.js'

/** The id of the clip playing right now, or null. */
export function useSpeaking() {
  const [id, setId] = useState(null)
  useEffect(() => audio.subscribe(setId), [])
  return id
}
