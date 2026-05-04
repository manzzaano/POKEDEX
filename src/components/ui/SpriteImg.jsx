import { useState, useEffect } from 'react'

const PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3"/><text x="100" y="108" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="48">?</text></svg>'
)

export default function SpriteImg({ id, sprites, size = 200, isShiny = false, style, ...props }) {
  const [tier, setTier] = useState(0)
  const [src, setSrc] = useState('')

  useEffect(() => {
    setTier(0)
    const art = sprites?.other?.['official-artwork']
    const home = sprites?.other?.home
    let initial
    if (isShiny) {
      initial = art?.front_shiny
        || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`
    } else {
      initial = art?.front_default
        || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    }
    setSrc(initial || PLACEHOLDER)
  }, [id, isShiny, sprites])

  const handleError = () => {
    const art = sprites?.other?.['official-artwork']
    const home = sprites?.other?.home
    const next = tier + 1
    setTier(next)

    if (isShiny) {
      if (next === 1) setSrc(home?.front_shiny || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${id}.png`)
      else if (next === 2) setSrc(sprites?.front_shiny || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`)
      else setSrc(PLACEHOLDER)
    } else {
      if (next === 1) setSrc(home?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`)
      else if (next === 2) setSrc(sprites?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`)
      else setSrc(PLACEHOLDER)
    }
  }

  return (
    <img
      src={src}
      alt=""
      onError={handleError}
      width={size}
      height={size}
      loading="lazy"
      style={{ objectFit: 'contain', ...style }}
      {...props}
    />
  )
}
