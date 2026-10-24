import { useEffect, useState } from 'react'

/** Lagos wall-clock time (WAT, UTC+1) as hh:mm:ss, ticking every second. */
function formatWat(now: number): string {
  const d = new Date(now + 3600e3)
  return [d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()]
    .map((n) => String(n).padStart(2, '0'))
    .join(':')
}

export function useClock(): string {
  const [time, setTime] = useState('--:--:--')
  useEffect(() => {
    const update = () => setTime(formatWat(Date.now()))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}
