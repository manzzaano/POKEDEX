import usePokedexStore from '../store/usePokedexStore'
import useTypes from '../hooks/useTypes'
import { TYPE_NAMES } from './ui/TypeBadge'

/**
 * Filtro de tipos dinámico – carga los tipos desde la API.
 */
export default function TypeFilter() {
    const selectedType = usePokedexStore((s) => s.selectedType)
    const setSelectedType = usePokedexStore((s) => s.setSelectedType)
    const { data: types = [], isLoading } = useTypes()

    return (
        <div className="px-3 py-2">
            <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm
                   bg-gray-100 dark:bg-gray-800/80
                   text-gray-800 dark:text-gray-200
                   border border-gray-200 dark:border-gray-700
                   focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500
                   transition-all duration-200 cursor-pointer"
            >
                <option value="">Todos los tipos</option>
                {isLoading ? (
                    <option disabled>Cargando tipos...</option>
                ) : (
                    types.map((type) => (
                        <option key={type.name} value={type.name}>
                            {TYPE_NAMES[type.name] || type.name}
                        </option>
                    ))
                )}
            </select>
        </div>
    )
}
