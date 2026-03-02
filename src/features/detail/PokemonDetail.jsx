import { AnimatePresence, motion } from 'framer-motion'
import usePokemonDetail from '../../hooks/usePokemonDetail'
import usePokedexStore from '../../store/usePokedexStore'
import PokemonHeader from './PokemonHeader'
import PokemonTypes from './PokemonTypes'
import PokemonInfo from './PokemonInfo'
import PokemonStats from './PokemonStats'
import EvolutionChain from './EvolutionChain'
import { PokemonDetailSkeleton } from '../../components/ui/Skeleton'

/**
 * Contenedor principal de detalle del Pokémon.
 * Lazy-fetches los datos cuando se selecciona un Pokémon.
 */
export default function PokemonDetail() {
    const selectedPokemonName = usePokedexStore((s) => s.selectedPokemonName)
    const { data: pokemon, isLoading, error } = usePokemonDetail(selectedPokemonName)

    if (!selectedPokemonName) {
        return (
            <div className="flex-1 flex items-center justify-center h-screen">
                <div className="text-center text-gray-400 dark:text-gray-600">
                    <p className="text-6xl mb-4">🎮</p>
                    <p className="text-xl font-medium">Selecciona un Pokémon</p>
                    <p className="text-sm mt-1">Elige uno de la lista para ver sus detalles</p>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center h-screen">
                <PokemonDetailSkeleton />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center h-screen">
                <div className="text-center text-red-400">
                    <p className="text-4xl mb-3">⚠️</p>
                    <p className="font-medium">Error al cargar datos</p>
                    <p className="text-sm mt-1 text-gray-400">{error.message}</p>
                </div>
            </div>
        )
    }

    if (!pokemon) return null

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pokemon.name}
                className="flex-1 flex justify-center h-screen overflow-y-auto"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
            >
                <div className="w-full max-w-2xl p-6 flex flex-col items-center gap-6 pb-20">
                    <PokemonHeader pokemon={pokemon} />
                    <PokemonTypes types={pokemon.types} />
                    <PokemonInfo pokemon={pokemon} />
                    <PokemonStats stats={pokemon.stats} />
                    <EvolutionChain pokemonId={pokemon.id} />
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
