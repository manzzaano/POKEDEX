const BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemonList() {
    const res = await fetch(`${BASE_URL}/pokemon?limit=100000`)
    if (!res.ok) throw new Error('Error al obtener la lista de Pokémon')
    const data = await res.json()
    return data.results.map((pokemon) => ({
        name: pokemon.name,
        id: Number(pokemon.url.split('/').filter(Boolean).pop()),
        url: pokemon.url,
    }))
}

export async function fetchPokemonDetail(nameOrId) {
    const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`)
    if (!res.ok) throw new Error(`Error al obtener detalles de ${nameOrId}`)
    return res.json()
}

export async function fetchPokemonSpecies(id) {
    const res = await fetch(`${BASE_URL}/pokemon-species/${id}`)
    if (!res.ok) throw new Error(`Error al obtener especie de ${id}`)
    return res.json()
}

export async function fetchEvolutionChain(url) {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Error al obtener cadena evolutiva')
    return res.json()
}

export async function fetchTypes() {
    const res = await fetch(`${BASE_URL}/type`)
    if (!res.ok) throw new Error('Error al obtener tipos')
    const data = await res.json()
    return data.results.filter(
        (t) => !['unknown', 'shadow', 'stellar'].includes(t.name)
    )
}

export async function fetchTypeIndex() {
    const list = await fetchTypes()
    const results = await Promise.all(
        list.map(async (t) => {
            const res = await fetch(`${BASE_URL}/type/${t.name}`)
            if (!res.ok) return { type: t.name, pokemon: [] }
            const data = await res.json()
            return {
                type: t.name,
                pokemon: data.pokemon.map((p) => p.pokemon.name),
            }
        })
    )
    const byPokemon = new Map()
    for (const { type, pokemon } of results) {
        for (const name of pokemon) {
            if (!byPokemon.has(name)) byPokemon.set(name, [])
            byPokemon.get(name).push(type)
        }
    }
    const byType = new Map(results.map((r) => [r.type, new Set(r.pokemon)]))
    return { byPokemon, byType }
}
