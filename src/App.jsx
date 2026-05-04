import { useState, useEffect } from 'react'
import { Search, ArrowLeft, Star } from 'lucide-react'
import usePokemons from './hooks/usePokemons'
import useFavorites from './hooks/useFavorites'
import usePokedexStore from './store/usePokedexStore'
import useBreakpoint from './hooks/useBreakpoint'
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
  const bp = useBreakpoint()
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
  const [showMobileFavs, setShowMobileFavs] = useState(false)

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
        <div style={{ display: 'flex', height: '100dvh' }}>
        <HomeScreen onSelectRegion={setSelectedGeneration} />
      </div>
    )
  }

  const isMobile = bp === 'xs'
  const padding = isMobile ? 16 : 36
  const titleSize = isMobile ? 20 : 28
  const gridCols = bp === 'xs' ? 2 : bp === 'sm' ? 3 : 4
  const sidebarOpen = bp !== 'xs' || showMobileFavs

  return (
    <div style={{ display: 'flex', height: '100dvh' }}>
      {sidebarOpen && !isMobile && (
        <aside
          style={{
            width: bp === 'sm' ? 200 : 260,
            minWidth: bp === 'sm' ? 200 : 260,
            height: '100%',
            padding: bp === 'sm' ? '20px 14px' : '28px 20px',
            background: 'rgba(255,255,255,0.04)',
            borderRight: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            overflowY: 'auto',
          }}
        >
          <span style={{
            fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: 4,
          }}>
            ★ Favoritos ({favList.length})
          </span>
          {favList.length === 0 && (
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
              Haz clic en el corazón de una tarjeta para agregar favoritos.
            </span>
          )}
          {favList.map((p) => (
            <div
              key={p.id}
              onClick={() => { selectPokemon(p.name); if (isMobile) setShowMobileFavs(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 10px', borderRadius: 14,
                background: 'rgba(255,255,255,0.04)', cursor: 'pointer',
                transition: 'background .2s',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <SpriteImg id={p.id} size={bp === 'sm' ? 30 : 36} style={{ borderRadius: '50%' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                <span style={{ fontSize: bp === 'sm' ? 12 : 14, fontWeight: 600, textTransform: 'capitalize', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.name.replace(/-/g, ' ')}
                </span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>
                  #{String(p.id).padStart(3, '0')}
                </span>
              </div>
            </div>
          ))}
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.1)', textAlign: 'center', marginTop: 'auto', paddingTop: 16 }}>
            Ismael Manzano León
          </span>
        </aside>
      )}

      {showMobileFavs && isMobile && (
        <div
          onClick={() => setShowMobileFavs(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 50 }}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed', left: 0, top: 0, bottom: 0,
              width: 260, padding: '24px 16px',
              background: 'rgba(18,18,22,0.95)',
              borderRight: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column', gap: 12,
              overflowY: 'auto', zIndex: 51,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)' }}>
                ★ Favoritos
              </span>
              <button onClick={() => setShowMobileFavs(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', opacity: 0.5 }}>✕</button>
            </div>
            {favList.length === 0 && (
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                Haz clic en el corazón de una tarjeta para agregar favoritos.
              </span>
            )}
            {favList.map((p) => (
              <div
                key={p.id}
                onClick={() => { selectPokemon(p.name); setShowMobileFavs(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
                  borderRadius: 14, background: 'rgba(255,255,255,0.04)', cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <SpriteImg id={p.id} size={36} style={{ borderRadius: '50%' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, textTransform: 'capitalize', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.name.replace(/-/g, ' ')}
                  </span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>
                    #{String(p.id).padStart(3, '0')}
                  </span>
                </div>
              </div>
            ))}
          </aside>
        </div>
      )}

      <main
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
            height: '100%', overflow: 'hidden',
        }}
      >
        <header style={{ padding: isMobile ? '16px 16px 12px' : '28px 36px 20px', display: 'flex', flexDirection: 'column', gap: isMobile ? 8 : 16 }}>
          <div style={{ display: 'flex', gap: isMobile ? 8 : 12, alignItems: 'center' }}>
            <button
              onClick={() => usePokedexStore.setState({ currentView: 'home', selectedGeneration: '' })}
              style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 9999, padding: isMobile ? '6px 8px' : '8px 12px',
                color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4,
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: isMobile ? 10 : 12, fontWeight: 600,
              }}
            >
              <ArrowLeft size={isMobile ? 12 : 14} />
            </button>
            <h1 style={{ fontSize: titleSize, fontWeight: 800, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
              Pokédex
              {selectedGeneration && (
                <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, margin: '0 4px' }}>·</span>
              )}
              {selectedGeneration && (
                <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: isMobile ? 14 : 20 }}>
                  {REGION_NAMES[selectedGeneration]}
                </span>
              )}
            </h1>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search
                size={isMobile ? 14 : 16}
                style={{
                  position: 'absolute', left: isMobile ? 10 : 16, top: '50%',
                  transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar…"
                style={{
                  width: '100%', background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.12)', borderRadius: 9999,
                  padding: isMobile ? '12px 12px 12px 28px' : '14px 24px 14px 42px',
                  color: '#fff', fontSize: isMobile ? 13 : 15,
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", outline: 'none',
                  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                }}
              />
            </div>
            {isMobile && (
              <button
                onClick={() => setShowMobileFavs(true)}
                style={{
                  background: favList.length > 0 ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9999,
                  padding: '8px 10px', color: favList.length > 0 ? '#ef4444' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: 11, fontWeight: 600,
                }}
              >
                <Star size={14} fill={favList.length > 0 ? '#ef4444' : 'transparent'} />
                {favList.length}
              </button>
            )}
          </div>
          <TypeFilter />
        </header>

        <div
          style={{
            flex: 1, overflowY: 'auto',
            padding: isMobile ? '4px 12px 24px' : '8px 36px 36px',
            display: 'grid',
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gap: isMobile ? 12 : 24, alignContent: 'start',
          }}
        >
          {isLoading
            ? Array.from({ length: gridCols * 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: isMobile ? 18 : 24,
                    padding: isMobile ? 12 : 24,
                    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 8 : 12,
                  }}
                >
                  <Skeleton width={isMobile ? '80px' : '120px'} height={isMobile ? '80px' : '120px'} rounded="rounded-2xl" />
                  <Skeleton width={isMobile ? '40px' : '60px'} height="14px" />
                  <Skeleton width={isMobile ? '60px' : '90px'} height="18px" />
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
                  isMobile={bp === 'xs'}
                />
              ))}
          {!isLoading && pokemons.length === 0 && (
            <div
              style={{
                gridColumn: '1 / -1', textAlign: 'center',
                padding: isMobile ? 32 : 60,
                color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 14 : 16,
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
          isMobile={bp === 'xs'}
        />
      )}
    </div>
  )
}
