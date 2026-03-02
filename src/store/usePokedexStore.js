import { create } from 'zustand'

// Leer favoritos iniciales de localStorage
const loadFavorites = () => {
    try {
        const stored = localStorage.getItem('pokedex-favorites')
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
}

// Persistir favoritos en localStorage
const saveFavorites = (favorites) => {
    localStorage.setItem('pokedex-favorites', JSON.stringify(favorites))
}

// Leer tema de localStorage
const loadTheme = () => {
    try {
        return localStorage.getItem('pokedex-theme') || 'dark'
    } catch {
        return 'dark'
    }
}

const usePokedexStore = create((set, get) => ({
    // --- Pokémon seleccionado ---
    selectedPokemonName: null,
    selectPokemon: (name) => set({ selectedPokemonName: name }),

    // --- Búsqueda ---
    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),

    // --- Filtro de tipo ---
    selectedType: '',
    setSelectedType: (type) => set({ selectedType: type }),

    // --- Favoritos ---
    favorites: loadFavorites(),

    toggleFavorite: (pokemon) => {
        const { favorites } = get()
        const exists = favorites.some((f) => f.name === pokemon.name)
        const updated = exists
            ? favorites.filter((f) => f.name !== pokemon.name)
            : [...favorites, { name: pokemon.name, id: pokemon.id }]
        saveFavorites(updated)
        set({ favorites: updated })
    },

    isFavorite: (name) => {
        return get().favorites.some((f) => f.name === name)
    },

    clearFavorites: () => {
        saveFavorites([])
        set({ favorites: [] })
    },

    // --- Tema ---
    theme: loadTheme(),
    toggleTheme: () => {
        const newTheme = get().theme === 'dark' ? 'light' : 'dark'
        localStorage.setItem('pokedex-theme', newTheme)
        set({ theme: newTheme })
    },
}))

export default usePokedexStore
