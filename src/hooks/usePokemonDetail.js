import { useQuery } from '@tanstack/react-query'
import { fetchPokemonDetail } from '../services/pokeApi'

/**
 * Hook para obtener los detalles de un Pokémon bajo demanda (lazy fetching).
 * Solo hace la petición cuando se proporciona un nombre.
 */
export default function usePokemonDetail(name) {
    return useQuery({
        queryKey: ['pokemon-detail', name],
        queryFn: () => fetchPokemonDetail(name),
        enabled: !!name,
        staleTime: 1000 * 60 * 30, // 30 min de caché
    })
}
