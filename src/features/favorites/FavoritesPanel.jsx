import { motion, AnimatePresence } from 'framer-motion'
import useFavorites from '../../hooks/useFavorites'
import usePokedexStore from '../../store/usePokedexStore'
import PokemonListItem from '../../components/ui/PokemonListItem'

/**
 * Panel lateral de favoritos.
 */
export default function FavoritesPanel() {
    const { favorites, toggleFavorite, clearFavorites } = useFavorites()
    const selectedPokemonName = usePokedexStore((s) => s.selectedPokemonName)
    const selectPokemon = usePokedexStore((s) => s.selectPokemon)

    const handleClick = (pokemon) => {
        selectPokemon(pokemon.name)
    }

    return (
        <motion.aside
            className="w-64 h-screen flex flex-col border-l border-gray-200 dark:border-gray-800
                 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl fixed right-0 top-0 z-30"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            {/* Header */}
            <div className="px-4 pt-5 pb-3 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <span className="text-yellow-400">★</span>
                    Favoritos
                    {favorites.length > 0 && (
                        <span className="text-xs font-normal text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                            {favorites.length}
                        </span>
                    )}
                </h2>
            </div>

            {/* Botón limpiar */}
            {favorites.length > 0 && (
                <div className="px-3 py-2">
                    <button
                        onClick={clearFavorites}
                        className="w-full text-xs py-1.5 rounded-lg text-red-400 hover:text-red-500
                       hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                    >
                        Limpiar favoritos
                    </button>
                </div>
            )}

            {/* Lista */}
            <div className="flex-1 overflow-y-auto">
                <AnimatePresence>
                    {favorites.length === 0 ? (
                        <motion.div
                            className="flex flex-col items-center justify-center h-full p-6 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p className="text-3xl mb-2">☆</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500">
                                No tienes favoritos aún
                            </p>
                            <p className="text-xs text-gray-300 dark:text-gray-600 mt-1">
                                Haz clic en ★ para añadir
                            </p>
                        </motion.div>
                    ) : (
                        favorites.map((pokemon) => (
                            <motion.div
                                key={pokemon.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                            >
                                <PokemonListItem
                                    pokemon={pokemon}
                                    isSelected={pokemon.name === selectedPokemonName}
                                    onClick={handleClick}
                                    onRemove={toggleFavorite}
                                />
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </motion.aside>
    )
}
