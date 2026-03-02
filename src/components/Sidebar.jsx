import { useCallback, useRef, useEffect } from 'react'
import { List } from 'react-window'
import { motion } from 'framer-motion'
import usePokemons from '../hooks/usePokemons'
import usePokedexStore from '../store/usePokedexStore'
import SearchBar from './SearchBar'
import TypeFilter from './TypeFilter'
import ThemeToggle from './layout/ThemeToggle'
import Skeleton from './ui/Skeleton'

/**
 * Componente de fila para react-window v2.
 * Recibe index, style, y las props custom via rowProps.
 */
function PokemonRow({ index, style, pokemons, selectedPokemonName, onSelect }) {
  const pokemon = pokemons[index]
  if (!pokemon) return null

  const isSelected = pokemon.name === selectedPokemonName
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`

  return (
    <div
      style={style}
      className={`
        flex items-center gap-3 px-3 py-1 cursor-pointer mx-2 rounded-lg
        transition-colors duration-200
        ${isSelected
          ? 'bg-indigo-600/20 dark:bg-indigo-500/30 border-l-3 border-indigo-500'
          : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
        }
      `}
      onClick={() => onSelect(pokemon.name)}
    >
      <img
        src={spriteUrl}
        alt={pokemon.name}
        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 p-0.5"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium capitalize text-gray-800 dark:text-gray-200 truncate block">
          {pokemon.name}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          #{String(pokemon.id).padStart(4, '0')}
        </span>
      </div>
    </div>
  )
}

/**
 * Sidebar virtualizado con búsqueda, filtros, y lista de Pokémon.
 */
export default function Sidebar() {
  const { pokemons, isLoading } = usePokemons()
  const selectedPokemonName = usePokedexStore((s) => s.selectedPokemonName)
  const selectPokemon = usePokedexStore((s) => s.selectPokemon)

  // Auto-seleccionar el primer Pokémon si no hay ninguno seleccionado
  useEffect(() => {
    if (!selectedPokemonName && pokemons.length > 0) {
      selectPokemon(pokemons[0].name)
    }
  }, [pokemons, selectedPokemonName, selectPokemon])

  return (
    <motion.aside
      className="w-72 h-screen flex flex-col border-r border-gray-200 dark:border-gray-800 
                 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl fixed left-0 top-0 z-30"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-5 pb-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Pokédex
        </h1>
        <ThemeToggle />
      </div>

      {/* Búsqueda y filtros */}
      <SearchBar />
      <TypeFilter />

      {/* Contador */}
      <div className="px-4 pb-2">
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {isLoading ? 'Cargando...' : `${pokemons.length} Pokémon`}
        </span>
      </div>

      {/* Lista virtualizada */}
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col gap-2 p-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2">
                <Skeleton width="40px" height="40px" rounded="rounded-full" />
                <Skeleton width="120px" height="1rem" />
              </div>
            ))}
          </div>
        ) : (
          <List
            rowComponent={PokemonRow}
            rowCount={pokemons.length}
            rowHeight={52}
            rowProps={{
              pokemons,
              selectedPokemonName,
              onSelect: selectPokemon,
            }}
            style={{ height: '100%', width: '100%' }}
          />
        )}
      </div>
    </motion.aside>
  )
}
