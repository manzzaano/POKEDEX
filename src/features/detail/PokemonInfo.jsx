import { motion } from 'framer-motion'

/**
 * Información general del Pokémon: peso, altura, habilidades.
 */
export default function PokemonInfo({ pokemon }) {
    const { weight = 0, height = 0, abilities = [], moves = [] } = pokemon

    return (
        <motion.div
            className="w-full space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
        >
            {/* Datos físicos */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-100 dark:bg-gray-800/60 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Peso</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {(weight / 10).toFixed(1)} <span className="text-sm font-normal text-gray-400">kg</span>
                    </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800/60 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Altura</p>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {(height / 10).toFixed(1)} <span className="text-sm font-normal text-gray-400">m</span>
                    </p>
                </div>
            </div>

            {/* Habilidades */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                    🎯 Habilidades
                </h3>
                <div className="flex flex-wrap gap-2">
                    {abilities.map((a) => (
                        <span
                            key={a.ability.name}
                            className={`px-3 py-1 rounded-lg text-sm capitalize
                ${a.is_hidden
                                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            {a.ability.name.replace('-', ' ')}
                            {a.is_hidden && (
                                <span className="ml-1 text-xs opacity-60">(oculta)</span>
                            )}
                        </span>
                    ))}
                </div>
            </div>

            {/* Movimientos (solo primeros 10) */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                    💫 Movimientos
                    <span className="text-sm font-normal text-gray-400">
                        ({moves.length} total)
                    </span>
                </h3>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-2">
                    {moves.slice(0, 20).map((m) => (
                        <span
                            key={m.move.name}
                            className="px-2 py-0.5 rounded-md text-xs capitalize
                         bg-gray-100 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400"
                        >
                            {m.move.name.replace('-', ' ')}
                        </span>
                    ))}
                    {moves.length > 20 && (
                        <span className="px-2 py-0.5 text-xs text-gray-400">
                            +{moves.length - 20} más
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
