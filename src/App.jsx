import { useState, useEffect } from 'react'
import { Search, ArrowLeft } from 'lucide-react'
import usePokemons from './hooks/usePokemons'
import useFavorites from './hooks/useFavorites'
import usePokedexStore from './store/usePokedexStore'
import TypeFilter from './components/TypeFilter'
import HomeScreen from './components/HomeScreen'
import PokemonCard from './components/ui/PokemonCard'
import PokemonDetail from './features/detail/PokemonDetail'
import SpriteImg from './components/ui/SpriteImg'
import Skeleton from './components/ui/Skeleton'

const GENERATIONS = [
  { roman: 'I', name: 'Kanto', start: 1, end: 151 },
  { roman: 'II', name: 'Johto', start: 152, end: 251 },
  { roman: 'III', name: 'Hoenn', start: 252, end: 386 },
  { roman: 'IV', name: 'Sinnoh', start: 387, end: 493 },
  { roman: 'V', name: 'Teselia', start: 494, end: 649 },
  { roman: 'VI', name: 'Kalos', start: 650, end: 721 },
  { roman: 'VII', name: 'Alola', start: 722, end: 809 },
  { roman: 'VIII', name: 'Galar', start: 810, end: 905 },
  { roman: 'IX', name: 'Paldea', start: 906, end: 1025 },
]

const REGION_NAMES = Object.fromEntries(GENERATIONS.map((g) => [g.roman, g.name]))

export default function App() {
  const { pokemons, allPokemons, isLoading } = usePokemons()
  const { favs, toggle, isFav } = useFavorites()
  const currentView = usePokedexStore((s) => s.currentView)
  const searchQuery = usePokedexStore((s) => s.searchQuery)
  const setSearchQuery = usePokedexStore((s) => s.setSearchQuery)
  const selectedPokemonName = usePokedexStore((s) => s.selectedPokemonName)
  const selectPokemon = usePokedexStore((s) => s.selectPokemon)
  const selectedGeneration = usePokedexStore((s) => s.selectedGeneration)
  const setSelectedGeneration = usePokedexStore((s) => s.setSelectedGeneration)

  const [hoveredId, setHoveredId] = useState(null)
  const [selectedDetail, setSelectedDetail] = useState(null)

  useEffect(() => {
    if (selectedPokemonName) {
      const found = allPokemons.find((p) => p.name === selectedPokemonName)
      setSelectedDetail(found || null)
    } else {
      setSelectedDetail(null)
    }
  }, [selectedPokemonName, allPokemons])

  const favList = allPokemons.filter((p) => {
    if (!favs.includes(p.id)) return false
    if (selectedGeneration) {
      const gen = GENERATIONS.find((g) => g.roman === selectedGeneration)
      if (gen && (p.id < gen.start || p.id > gen.end)) return false
    }
    return true
  })

  if (currentView !== 'pokedex') {
    return (
      <div style={{ display: 'flex', height: '100vh' }}>
        <HomeScreen onSelectRegion={setSelectedGeneration} />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside
        style={{
          width: 260,
          minWidth: 260,
          height: '100%',
          padding: '28px 20px',
          background: 'rgba(255,255,255,0.04)',
          borderRight: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          overflowY: 'auto',
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 4,
          }}
        >
          ★ Favoritos ({favList.length})
        </span>
        {favList.length === 0 && (
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
            Haz clic en el corazón de una tarjeta para agregar favoritos.
          </span>
        )}
        {favList.map((p) => (
          <div
            key={p.id}
            onClick={() => selectPokemon(p.name)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.04)',
              cursor: 'pointer',
              transition: 'background .2s',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <SpriteImg id={p.id} size={36} style={{ borderRadius: '50%' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 600, textTransform: 'capitalize' }}>
                {p.name.replace(/-/g, ' ')}
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
                #{String(p.id).padStart(3, '0')}
              </span>
            </div>
          </div>
        ))}
      </aside>

      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <header
          style={{
            padding: '28px 36px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => usePokedexStore.setState({ currentView: 'home', selectedGeneration: '' })}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 9999,
                padding: '8px 12px',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              <ArrowLeft size={14} />
            </button>
            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
              Pokédex
              {selectedGeneration && (
                <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, margin: '0 6px' }}>·</span>
              )}
              {selectedGeneration && (
                <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                  {REGION_NAMES[selectedGeneration]}
                </span>
              )}
            </h1>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute', left: 16, top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255,255,255,0.35)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o número…"
                style={{
                  width: '100%',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 9999,
                  padding: '14px 24px 14px 42px',
                  color: '#fff',
                  fontSize: 15,
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  outline: 'none',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              />
            </div>
          </div>
          <TypeFilter />
        </header>

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '8px 36px 36px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            alignContent: 'start',
          }}
        >
          {isLoading
            ? Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 24,
                    padding: 24,
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <Skeleton width="120px" height="120px" rounded="rounded-2xl" />
                  <Skeleton width="60px" height="14px" />
                  <Skeleton width="90px" height="18px" />
                </div>
              ))
            : pokemons.map((p) => (
                <PokemonCard
                  key={p.id}
                  pokemon={p}
                  types={p.types || []}
                  isFav={isFav(p.id)}
                  onToggleFav={toggle}
                  onSelect={selectPokemon}
                  hovered={hoveredId === p.id}
                  onHover={setHoveredId}
                />
              ))}
          {!isLoading && pokemons.length === 0 && (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: 60,
                color: 'rgba(255,255,255,0.6)',
                fontSize: 16,
              }}
            >
              No se encontraron Pokémon.
            </div>
          )}
        </div>
      </main>

      {selectedDetail && (
        <PokemonDetail
          pokemon={selectedDetail}
          onClose={() => selectPokemon(null)}
          isFav={isFav(selectedDetail.id)}
          onToggleFav={toggle}
          onSelectPokemon={selectPokemon}
        />
      )}
    </div>
  )
}
