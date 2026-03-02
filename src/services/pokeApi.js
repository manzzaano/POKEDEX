const BASE_URL = 'https://pokeapi.co/api/v2'

/**
 * Obtiene la lista completa de Pokémon (solo nombre + url).
 * Devuelve un array con { name, id, url }.
 */
export async function fetchPokemonList() {
    const res = await fetch(`${BASE_URL}/pokemon?limit=10000`)
    if (!res.ok) throw new Error('Error al obtener la lista de Pokémon')
    const data = await res.json()
    return data.results.map((pokemon) => ({
        name: pokemon.name,
        id: Number(pokemon.url.split('/').filter(Boolean).pop()),
        url: pokemon.url,
    }))
}

/**
 * Obtiene los detalles completos de un Pokémon por nombre o ID.
 */
export async function fetchPokemonDetail(nameOrId) {
    const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`)
    if (!res.ok) throw new Error(`Error al obtener detalles de ${nameOrId}`)
    return res.json()
}

/**
 * Obtiene los datos de especie de un Pokémon (para cadena evolutiva).
 */
export async function fetchPokemonSpecies(id) {
    const res = await fetch(`${BASE_URL}/pokemon-species/${id}`)
    if (!res.ok) throw new Error(`Error al obtener especie de ${id}`)
    return res.json()
}

/**
 * Obtiene la cadena evolutiva completa desde su URL.
 */
export async function fetchEvolutionChain(url) {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Error al obtener cadena evolutiva')
    return res.json()
}

/**
 * Obtiene todos los tipos de Pokémon disponibles.
 */
export async function fetchTypes() {
    const res = await fetch(`${BASE_URL}/type`)
    if (!res.ok) throw new Error('Error al obtener tipos')
    const data = await res.json()
    // Filtramos tipos "unknown" y "shadow" que no son tipos reales de Pokémon
    return data.results.filter(
        (t) => !['unknown', 'shadow'].includes(t.name)
    )
}
