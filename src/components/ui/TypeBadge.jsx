const TYPE_COLORS = {
    fire: '#F08030', water: '#6890F0', grass: '#78C850', electric: '#F8D030',
    psychic: '#F85888', ice: '#98D8D8', dragon: '#7038F8', dark: '#705848',
    fairy: '#EE99AC', fighting: '#C03028', poison: '#A040A0', ground: '#E0C068',
    rock: '#B8A038', bug: '#A8B820', ghost: '#705898', steel: '#B8B8D0',
    flying: '#A890F0', normal: '#A8A878',
}

const TYPE_NAMES = {
    normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Eléctrico',
    grass: 'Planta', ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno',
    ground: 'Tierra', flying: 'Volador', psychic: 'Psíquico', bug: 'Bicho',
    rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragón', dark: 'Siniestro',
    steel: 'Acero', fairy: 'Hada',
}

export default function TypeBadge({ type, size = 'md' }) {
    const color = TYPE_COLORS[type] || '#888'
    const label = TYPE_NAMES[type] || type
    const padding = size === 'sm' ? '2px 8px' : '3px 10px'
    const fontSize = size === 'sm' ? 10 : 11

    return (
        <span
            style={{
                padding,
                fontSize,
                borderRadius: 999,
                fontWeight: 700,
                background: color + '33',
                color,
                textTransform: 'capitalize',
                border: `1px solid ${color}55`,
                display: 'inline-flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
            }}
        >
            {label}
        </span>
    )
}

export { TYPE_COLORS, TYPE_NAMES }
