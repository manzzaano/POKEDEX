import { useEffect, useState, useCallback } from 'react'

const KEY = 'pokedex_favs'

const load = () => {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const persist = (favs) => {
  const id = typeof requestIdleCallback !== 'undefined'
    ? requestIdleCallback(() => {
        try { localStorage.setItem(KEY, JSON.stringify(favs)) } catch { /* localStorage no disponible */ }
      })
    : setTimeout(() => {
        try { localStorage.setItem(KEY, JSON.stringify(favs)) } catch { /* localStorage no disponible */ }
      }, 0)
  return () => {
    if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(id)
    else clearTimeout(id)
  }
}

export default function useFavorites() {
  const [favs, setFavs] = useState(load)

  useEffect(() => {
    const cancel = persist(favs)
    return cancel
  }, [favs])

  const toggle = useCallback((id) => {
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  }, [])

  const isFav = useCallback((id) => favs.includes(id), [favs])

  return { favs, toggle, isFav }
}
