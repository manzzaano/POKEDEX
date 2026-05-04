import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { List } from 'react-window'
import usePokemons from '../../hooks/usePokemons'
import usePokedexStore from '../../store/usePokedexStore'
import SearchBar from '../SearchBar'
import TypeFilter from '../TypeFilter'
import { playSfx, SFX_HOVER, SFX_CLICK } from '../../utils/sfx'

function CustomSkeleton() {
    return (
        <div className="flex animate-pulse items-center gap-3 px-3 py-2 border-b border-cyan-900/10">
            <div className="w-10 h-10 rounded-full bg-cyan-900/20" />
            <div className="w-24 h-4 bg-cyan-900/20 rounded-md" />
        </div>
    )
}

/**
 * Fila individual para react-window v2.
 * Recibe index, style, y props custom vía rowProps.
 */
function PokemonRow({ index, style, pokemons, selectedPokemonName, onSelect }) {
    const pokemon = pokemons[index]
    if (!pokemon) return null

    const isSelected = pokemon.name === selectedPokemonName
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`

    return (
        <div style={style} className="px-2 py-1">
            <div
                className={`
                    w-full h-full flex items-center gap-3 px-3 rounded-lg cursor-pointer
                    transition-all duration-200 border
                    ${isSelected
                        ? 'bg-cyan-900/40 border-cyan-400 shadow-[inset_0_0_15px_rgba(6,182,212,0.3)]'
                        : 'bg-transparent border-transparent hover:bg-slate-800/50 hover:border-cyan-800/50'
                    }
                `}
                onClick={() => {
                    playSfx(SFX_CLICK)
                    onSelect(pokemon.name)
                }}
                onMouseEnter={() => playSfx(SFX_HOVER)}
            >
                {/* Sprite holográfico */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                    {isSelected && (
                        <motion.div
                            layoutId="selected-glow"
                            className="absolute inset-0 bg-cyan-500/20 rounded-full blur-md"
                        />
                    )}
                    <img
                        src={spriteUrl}
                        alt={pokemon.name}
                        className={`w-10 h-10 relative z-10 transition-all duration-300
                            ${isSelected ? 'scale-125 saturate-150' : 'grayscale opacity-70 hover:grayscale-0 hover:opacity-100'}`}
                        loading="lazy"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <span className={`text-sm font-mono font-bold capitalize truncate block transition-colors ${isSelected ? 'text-cyan-400' : 'text-slate-300'}`}>
                        {pokemon.name}
                    </span>
                    <span className="text-xs font-mono text-cyan-600/70">
                        Nº {String(pokemon.id).padStart(4, '0')}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default function PokemonGallery() {
    const { pokemons, isLoading } = usePokemons()
    const selectedPokemonName = usePokedexStore((s) => s.selectedPokemonName)
    const selectPokemon = usePokedexStore((s) => s.selectPokemon)

    useEffect(() => {
        if (!selectedPokemonName && pokemons.length > 0) {
            selectPokemon(pokemons[0].name)
        }
    }, [pokemons, selectedPokemonName, selectPokemon])

    return (
        <div className="w-full h-full flex flex-col pt-2">
            {/* Búsqueda y filtros */}
            <div className="px-4 pb-4 space-y-4 border-b border-cyan-900/30 shrink-0">
                <SearchBar />
                <TypeFilter />
                <div className="flex justify-between items-center text-xs font-mono text-cyan-500/60 uppercase">
                    <span>Base de datos</span>
                    <span>{isLoading ? 'Escaneando...' : `${pokemons.length} Entradas`}</span>
                </div>
            </div>

            {/* Lista virtualizada */}
            <div className="flex-1 w-full overflow-hidden relative">
                <div className="absolute top-0 w-full h-4 bg-gradient-to-b from-slate-950/40 to-transparent z-10 pointer-events-none" />
                <div className="absolute bottom-0 w-full h-4 bg-gradient-to-t from-slate-950/40 to-transparent z-10 pointer-events-none" />

                {isLoading ? (
                    <div className="flex flex-col h-full overflow-y-auto">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <CustomSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <List
                        rowComponent={PokemonRow}
                        rowCount={pokemons.length}
                        rowHeight={64}
                        rowProps={{
                            pokemons,
                            selectedPokemonName,
                            onSelect: selectPokemon,
                        }}
                        style={{ height: '100%', width: '100%' }}
                    />
                )}
            </div>
        </div>
    )
}
