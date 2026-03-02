/** Mapa de colores por tipo de Pokémon */
const TYPE_COLORS = {
    normal: 'bg-gray-400',
    fire: 'bg-orange-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-cyan-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-amber-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-amber-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-700',
    steel: 'bg-gray-400',
    fairy: 'bg-pink-300',
}

/** Traducciones de tipos */
const TYPE_NAMES = {
    normal: 'Normal',
    fire: 'Fuego',
    water: 'Agua',
    electric: 'Eléctrico',
    grass: 'Planta',
    ice: 'Hielo',
    fighting: 'Lucha',
    poison: 'Veneno',
    ground: 'Tierra',
    flying: 'Volador',
    psychic: 'Psíquico',
    bug: 'Bicho',
    rock: 'Roca',
    ghost: 'Fantasma',
    dragon: 'Dragón',
    dark: 'Siniestro',
    steel: 'Acero',
    fairy: 'Hada',
}

/**
 * Badge visual para un tipo de Pokémon.
 */
export default function TypeBadge({ type, size = 'md' }) {
    const colorClass = TYPE_COLORS[type] || 'bg-gray-500'
    const label = TYPE_NAMES[type] || type

    const sizeClasses = size === 'sm'
        ? 'px-2 py-0.5 text-xs'
        : 'px-3 py-1 text-sm'

    return (
        <span className={`${colorClass} ${sizeClasses} text-white font-semibold rounded-full capitalize inline-flex items-center shadow-sm`}>
            {label}
        </span>
    )
}

export { TYPE_COLORS, TYPE_NAMES }
