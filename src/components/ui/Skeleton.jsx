import { motion } from 'framer-motion'

/**
 * Componente Skeleton genérico para estados de carga.
 * Soporta formas: rectangle, circle, text.
 */
export default function Skeleton({ width = '100%', height = '1rem', rounded = 'rounded-md', className = '' }) {
    return (
        <motion.div
            className={`bg-gray-300 dark:bg-gray-700 ${rounded} ${className}`}
            style={{ width, height }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
    )
}

/** Skeleton para una tarjeta completa de detalle de Pokémon */
export function PokemonDetailSkeleton() {
    return (
        <div className="flex flex-col items-center gap-4 p-6 w-full max-w-lg">
            <Skeleton width="60%" height="2rem" rounded="rounded-lg" />
            <Skeleton width="256px" height="256px" rounded="rounded-2xl" />
            <div className="flex gap-2">
                <Skeleton width="80px" height="28px" rounded="rounded-full" />
                <Skeleton width="80px" height="28px" rounded="rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-3 w-full">
                <Skeleton height="1.2rem" />
                <Skeleton height="1.2rem" />
                <Skeleton height="1.2rem" />
                <Skeleton height="1.2rem" />
            </div>
            <Skeleton width="100%" height="200px" rounded="rounded-xl" />
        </div>
    )
}

/** Skeleton para un item de lista */
export function ListItemSkeleton() {
    return (
        <div className="flex items-center gap-3 px-3 py-2">
            <Skeleton width="40px" height="40px" rounded="rounded-full" />
            <Skeleton width="120px" height="1rem" />
        </div>
    )
}
