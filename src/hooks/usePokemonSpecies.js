import { useQuery } from '@tanstack/react-query'
import { fetchPokemonSpecies } from '../services/pokeApi'

/**
 * Hook para obtener los datos de especie de un Pokémon.
 * Comparte caché con EvolutionChain (misma queryKey).
 */
export default function usePokemonSpecies(id) {
    return useQuery({
        queryKey: ['pokemon-species', id],
        queryFn: () => fetchPokemonSpecies(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 30, // 30 min de caché
    })
}
