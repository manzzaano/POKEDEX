import usePokedexStore from '../store/usePokedexStore'

/**
 * Hook para gestionar favoritos.
 * Abstrae la lógica del store de Zustand.
 */
export default function useFavorites() {
    const favorites = usePokedexStore((s) => s.favorites)
    const toggleFavorite = usePokedexStore((s) => s.toggleFavorite)
    const isFavorite = usePokedexStore((s) => s.isFavorite)
    const clearFavorites = usePokedexStore((s) => s.clearFavorites)

    return {
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
    }
}
