import TypeBadge from '../../components/ui/TypeBadge'
import { motion } from 'framer-motion'

/**
 * Muestra los tipos del Pokémon como badges con color.
 */
export default function PokemonTypes({ types = [] }) {
    return (
        <motion.div
            className="flex items-center gap-2 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
        >
            {types.map((t) => (
                <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
        </motion.div>
    )
}
