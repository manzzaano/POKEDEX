import { useQuery } from '@tanstack/react-query'
import { fetchPokemonList } from '../services/pokeApi'
import usePokedexStore from '../store/usePokedexStore'

const BASE_URL = 'https://pokeapi.co/api/v2'

const GENERATIONS = [
  { roman: 'I', start: 1, end: 151 },
  { roman: 'II', start: 152, end: 251 },
  { roman: 'III', start: 252, end: 386 },
  { roman: 'IV', start: 387, end: 493 },
  { roman: 'V', start: 494, end: 649 },
  { roman: 'VI', start: 650, end: 721 },
  { roman: 'VII', start: 722, end: 809 },
  { roman: 'VIII', start: 810, end: 905 },
  { roman: 'IX', start: 906, end: 1025 },
]

export default function usePokemons() {
    const searchQuery = usePokedexStore((s) => s.searchQuery)
    const selectedType = usePokedexStore((s) => s.selectedType)
    const selectedGeneration = usePokedexStore((s) => s.selectedGeneration)

    const {
        data: allPokemons = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['pokemon-list'],
        queryFn: fetchPokemonList,
        staleTime: 1000 * 60 * 60,
    })

    const { data: typePokemonNames, isFetching: typeLoading } = useQuery({
        queryKey: ['type-pokemon-names', selectedType],
        queryFn: async () => {
            const res = await fetch(`${BASE_URL}/type/${selectedType}`)
            if (!res.ok) return new Set()
            const data = await res.json()
            return new Set(data.pokemon.map((p) => p.pokemon.name))
        },
        enabled: !!selectedType,
        staleTime: 1000 * 60 * 60 * 24,
    })

    let filtered = allPokemons.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (selectedType && typePokemonNames && !typeLoading) {
        filtered = filtered.filter((p) => typePokemonNames.has(p.name))
    }

    if (selectedGeneration) {
        const gen = GENERATIONS.find((g) => g.roman === selectedGeneration)
        if (gen) {
            filtered = filtered.filter((p) => p.id >= gen.start && p.id <= gen.end)
        }
    }

    return {
        pokemons: filtered,
        allPokemons,
        isLoading,
        error,
        total: allPokemons.length,
        selectedType,
    }
}
