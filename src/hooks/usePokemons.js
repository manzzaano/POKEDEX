import { useQuery } from '@tanstack/react-query'
import { fetchPokemonList } from '../services/pokeApi'
import usePokedexStore from '../store/usePokedexStore'

/**
 * Hook para obtener la lista de Pokémon filtrada por búsqueda y tipo.
 * Solo descarga la lista base (nombre + id), sin detalles.
 */
export default function usePokemons() {
    const searchQuery = usePokedexStore((s) => s.searchQuery)
    const selectedType = usePokedexStore((s) => s.selectedType)

    const {
        data: allPokemons = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['pokemon-list'],
        queryFn: fetchPokemonList,
        staleTime: 1000 * 60 * 60, // 1 hora de caché
    })

    // Filtrado por nombre (siempre se puede aplicar sin detalles)
    const filtered = allPokemons.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return {
        pokemons: filtered,
        isLoading,
        error,
        total: allPokemons.length,
        selectedType,
    }
}
