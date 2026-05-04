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

export default function useFavorites() {
    const [favs, setFavs] = useState(load)

    useEffect(() => {
        try { localStorage.setItem(KEY, JSON.stringify(favs)) } catch {}
    }, [favs])

    const toggle = useCallback((id) => {
        setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
    }, [])

    const isFav = useCallback((id) => favs.includes(id), [favs])

    return { favs, toggle, isFav }
}
