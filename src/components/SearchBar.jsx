import usePokedexStore from '../store/usePokedexStore'

/**
 * Barra de búsqueda con diseño moderno.
 */
export default function SearchBar() {
    const searchQuery = usePokedexStore((s) => s.searchQuery)
    const setSearchQuery = usePokedexStore((s) => s.setSearchQuery)

    return (
        <div className="px-3 py-2">
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar Pokémon..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl text-sm
                     bg-gray-100 dark:bg-gray-800/80 
                     text-gray-800 dark:text-gray-200
                     placeholder-gray-400 dark:placeholder-gray-500
                     border border-gray-200 dark:border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500
                     transition-all duration-200"
                />
            </div>
        </div>
    )
}
