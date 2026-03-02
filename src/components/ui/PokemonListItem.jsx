import { motion } from 'framer-motion'
import usePokedexStore from '../../store/usePokedexStore'

/**
 * Item de Pokémon reutilizable para Sidebar y Favoritos.
 */
export default function PokemonListItem({ pokemon, isSelected, onClick, onRemove, style }) {
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`

    return (
        <motion.div
            style={style}
            className={`
        flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg mx-2
        transition-colors duration-200 group
        ${isSelected
                    ? 'bg-indigo-600/20 dark:bg-indigo-500/30 border-l-3 border-indigo-500'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                }
      `}
            onClick={() => onClick(pokemon)}
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
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
            {onRemove && (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onRemove(pokemon)
                    }}
                    className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500
                     transition-opacity duration-200 text-lg leading-none p-1"
                    title="Quitar de favoritos"
                >
                    ✕
                </button>
            )}
        </motion.div>
    )
}
