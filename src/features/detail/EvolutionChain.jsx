import { useQuery } from '@tanstack/react-query'
import { fetchPokemonSpecies, fetchEvolutionChain, fetchPokemonDetail } from '../../services/pokeApi'
import { motion } from 'framer-motion'
import Skeleton from '../../components/ui/Skeleton'
import usePokedexStore from '../../store/usePokedexStore'

/**
 * Extrae la cadena de evolución de forma recursiva.
 */
function parseChain(chain) {
    const result = []
    let current = chain

    while (current) {
        const id = current.species.url.split('/').filter(Boolean).pop()
        result.push({
            name: current.species.name,
            id: Number(id),
        })
        current = current.evolves_to?.[0] || null
    }

    return result
}

/**
 * Componente que muestra la cadena evolutiva del Pokémon.
 */
export default function EvolutionChain({ pokemonId }) {
    const selectPokemon = usePokedexStore((s) => s.selectPokemon)

    // 1. Obtener datos de especie
    const { data: species, isLoading: speciesLoading } = useQuery({
        queryKey: ['pokemon-species', pokemonId],
        queryFn: () => fetchPokemonSpecies(pokemonId),
        enabled: !!pokemonId,
        staleTime: 1000 * 60 * 30,
    })

    // 2. Obtener cadena evolutiva
    const { data: evolutionData, isLoading: evoLoading } = useQuery({
        queryKey: ['evolution-chain', species?.evolution_chain?.url],
        queryFn: () => fetchEvolutionChain(species.evolution_chain.url),
        enabled: !!species?.evolution_chain?.url,
        staleTime: 1000 * 60 * 60,
    })

    const isLoading = speciesLoading || evoLoading

    if (isLoading) {
        return (
            <div className="w-full">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    🔄 Evoluciones
                </h3>
                <div className="flex items-center justify-center gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Skeleton width="64px" height="64px" rounded="rounded-full" />
                            {i < 3 && <span className="text-gray-400">→</span>}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (!evolutionData) return null

    const chain = parseChain(evolutionData.chain)

    if (chain.length <= 1) {
        return (
            <div className="w-full">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    🔄 Evoluciones
                </h3>
                <p className="text-sm text-gray-400">
                    Este Pokémon no tiene evoluciones.
                </p>
            </div>
        )
    }

    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                🔄 Evoluciones
            </h3>
            <div className="flex items-center justify-center gap-2 flex-wrap">
                {chain.map((evo, index) => (
                    <div key={evo.name} className="flex items-center gap-2">
                        <motion.button
                            onClick={() => selectPokemon(evo.name)}
                            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200
                ${evo.id === pokemonId
                                    ? 'bg-indigo-500/10 dark:bg-indigo-500/20 ring-2 ring-indigo-500/30'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800/60'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`}
                                alt={evo.name}
                                className="w-16 h-16"
                            />
                            <span className="text-xs capitalize text-gray-600 dark:text-gray-400 font-medium">
                                {evo.name}
                            </span>
                        </motion.button>
                        {index < chain.length - 1 && (
                            <span className="text-xl text-gray-400 dark:text-gray-600">→</span>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
