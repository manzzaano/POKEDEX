import { useState, useEffect } from 'react'

export default function useBreakpoint() {
  const [bp, setBp] = useState(() => getBp())

  useEffect(() => {
    const xs = window.matchMedia('(max-width: 639px)')
    const sm = window.matchMedia('(min-width: 640px) and (max-width: 1023px)')

    const update = () => setBp(getBp())
    xs.addEventListener('change', update)
    sm.addEventListener('change', update)
    return () => {
      xs.removeEventListener('change', update)
      sm.removeEventListener('change', update)
    }
  }, [])

  return bp
}

function getBp() {
  if (typeof window === 'undefined') return 'lg'
  const w = window.innerWidth
  if (w < 640) return 'xs'
  if (w < 1024) return 'sm'
  return 'lg'
}
