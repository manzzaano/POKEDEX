import { useState, useEffect, useRef } from 'react'

const PLACEHOLDER = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3"/><text x="100" y="108" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="48">?</text></svg>'
)

export default function SpriteImg({ id, sprites, size = 200, isShiny = false, style, onLoad, ...props }) {
  const [phase, setPhase] = useState('loading')
  const [src, setSrc] = useState('')
  const hiResLoaded = useRef(false)

  useEffect(() => {
    setPhase('loading')
    hiResLoaded.current = false

    const art = sprites?.other?.['official-artwork']
    const home = sprites?.other?.home
    const front = sprites?.front_default
    const frontShiny = sprites?.front_shiny

    if (isShiny) {
      const lowSrc = frontShiny || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
      const img = new Image()
      img.onload = () => { setSrc(lowSrc); setPhase('lowres'); loadHiRes() }
      img.onerror = () => { setSrc(PLACEHOLDER); setPhase('lowres') }
      img.src = lowSrc
    } else {
      const lowSrc = front || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      const img = new Image()
      img.onload = () => { setSrc(lowSrc); setPhase('lowres'); loadHiRes() }
      img.onerror = () => { setSrc(PLACEHOLDER); setPhase('lowres') }
      img.src = lowSrc
    }

    function loadHiRes() {
      let hiSrc
      if (isShiny) {
        hiSrc = art?.front_shiny
          || home?.front_shiny
          || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`
      } else {
        hiSrc = art?.front_default
          || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      }
      const hi = new Image()
      hi.onload = () => {
        if (!hiResLoaded.current) {
          hiResLoaded.current = true
          setSrc(hiSrc)
          setPhase('hires')
          onLoad?.()
        }
      }
      hi.onerror = () => {
        if (!hiResLoaded.current) {
          hiResLoaded.current = true
          setPhase('hires')
          onLoad?.()
        }
      }
      hi.src = hiSrc
    }
  }, [id, isShiny])

  return (
    <img
      src={src || PLACEHOLDER}
      alt=""
      style={{
        width: size,
        maxWidth: '100%',
        height: 'auto',
        aspectRatio: '1 / 1',
        objectFit: 'contain',
        transition: 'opacity 0.35s ease',
        opacity: phase === 'hires' ? 1 : phase === 'lowres' ? 0.55 : 0,
        ...style,
      }}
      {...props}
    />
  )
}
