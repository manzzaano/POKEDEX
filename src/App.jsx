import { useState, useEffect } from 'react'
import { Search, ArrowLeft, Menu, X } from 'lucide-react'
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
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
      <div className="flex h-dvh">
        <HomeScreen onSelectRegion={setSelectedGeneration} />
      </div>
    )
  }

  return (
    <div className="flex h-dvh">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:relative z-50 flex flex-col gap-2.5 p-5 h-full bg-[rgba(255,255,255,0.04)] border-r border-white/12 backdrop-blur-[16px] overflow-y-auto transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ width: 220, minWidth: 220 }}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden bg-transparent border-0 text-white/50 cursor-pointer self-end p-1"
        >
          <X size={18} />
        </button>
        <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>
          ★ Favoritos ({favList.length})
        </span>
        {favList.length === 0 && (
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
            Haz clic en el corazón de una tarjeta para agregar favoritos.
          </span>
        )}
        {favList.map((p) => (
          <div
            key={p.id}
            onClick={() => selectPokemon(p.name)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px',
              borderRadius: 12, background: 'rgba(255,255,255,0.04)', cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <SpriteImg id={p.id} size={32} style={{ borderRadius: '50%' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
              <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'capitalize', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {p.name.replace(/-/g, ' ')}
              </span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>
                #{String(p.id).padStart(3, '0')}
              </span>
            </div>
          </div>
        ))}
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.08)', textAlign: 'center', marginTop: 'auto', paddingTop: 12 }}>
          Ismael Manzano León
        </span>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex flex-col gap-3 px-4 py-3 md:px-6 md:py-5">
          <div className="flex gap-2.5 items-center flex-wrap">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden bg-white/6 border border-white/10 rounded-full p-2 text-white/60 cursor-pointer flex items-center justify-center"
              style={{ minWidth: 36, minHeight: 36 }}
            >
              <Menu size={18} />
            </button>
            <button
              onClick={() => usePokedexStore.setState({ currentView: 'home', selectedGeneration: '' })}
              style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 9999, padding: '6px 10px', color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2,
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 12, fontWeight: 600,
              }}
            >
              <ArrowLeft size={14} />
            </button>
            <h1 className="text-lg md:text-2xl font-extrabold tracking-[-0.02em] whitespace-nowrap" style={{ fontSize: 'clamp(18px, 4vw, 24px)' }}>
              Pokédex
              {selectedGeneration && <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, margin: '0 4px' }}>·</span>}
              {selectedGeneration && <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: 'clamp(14px, 3vw, 18px)' }}>{REGION_NAMES[selectedGeneration]}</span>}
            </h1>
            <div style={{ flex: 1, position: 'relative', minWidth: 160 }}>
              <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)', pointerEvents: 'none' }} />
              <input
                type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar…"
                style={{
                  width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 9999, padding: '12px 16px 12px 36px', color: '#fff', fontSize: 14,
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", outline: 'none',
                  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                }}
              />
            </div>
          </div>
          <TypeFilter />
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 flex-1 overflow-y-auto content-start px-4 pb-6 md:px-6">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 20, padding: 16,
                  backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                }}>
                  <Skeleton width="100px" height="100px" rounded="rounded-2xl" />
                  <Skeleton width="50px" height="12px" />
                  <Skeleton width="80px" height="16px" />
                </div>
              ))
            : pokemons.map((p) => (
                <PokemonCard
                  key={p.id} pokemon={p} types={p.types || []}
                  isFav={isFav(p.id)} onToggleFav={toggle} onSelect={selectPokemon}
                  hovered={hoveredId === p.id} onHover={setHoveredId}
                />
              ))}
          {!isLoading && pokemons.length === 0 && (
            <div className="col-span-full text-center py-10 text-white/60 text-sm">
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
