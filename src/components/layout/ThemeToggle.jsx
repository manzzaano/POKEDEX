import { motion } from 'framer-motion'
import usePokedexStore from '../../store/usePokedexStore'

/**
 * Toggle para alternar entre modo claro y oscuro.
 */
export default function ThemeToggle() {
    const theme = usePokedexStore((s) => s.theme)
    const toggleTheme = usePokedexStore((s) => s.toggleTheme)

    return (
        <button
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-600 
                 transition-colors duration-300 flex items-center px-1"
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
            <motion.div
                className="w-5 h-5 rounded-full bg-white dark:bg-indigo-400 shadow-md flex items-center justify-center text-xs"
                animate={{ x: theme === 'dark' ? 24 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
                {theme === 'dark' ? '🌙' : '☀️'}
            </motion.div>
        </button>
    )
}
