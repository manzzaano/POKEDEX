import { useQuery } from '@tanstack/react-query'
import { fetchTypeIndex } from '../services/pokeApi'

export default function useTypeIndex() {
    return useQuery({
        queryKey: ['pokemon-type-index'],
        queryFn: fetchTypeIndex,
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
    })
}
