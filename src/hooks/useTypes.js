import { useQuery } from '@tanstack/react-query'
import { fetchTypes } from '../services/pokeApi'

/**
 * Hook para obtener la lista de tipos de Pokémon desde la API.
 */
export default function useTypes() {
    return useQuery({
        queryKey: ['pokemon-types'],
        queryFn: fetchTypes,
        staleTime: 1000 * 60 * 60 * 24, // 24h de caché (los tipos no cambian)
    })
}
