import { create } from 'zustand'

const usePokedexStore = create((set) => ({
    currentView: 'home',

    selectedPokemonName: null,
    selectPokemon: (name) => set({ selectedPokemonName: name }),
    closeDetail: () => set({ selectedPokemonName: null }),

    searchQuery: '',
    setSearchQuery: (query) => set({ searchQuery: query }),

    selectedType: '',
    setSelectedType: (type) => set({ selectedType: type }),

    selectedGeneration: '',
    setSelectedGeneration: (gen) => set({ selectedGeneration: gen, currentView: 'pokedex' }),

    showFavSidebar: false,
    toggleFavSidebar: () => set((s) => ({ showFavSidebar: !s.showFavSidebar })),
}))

export default usePokedexStore
