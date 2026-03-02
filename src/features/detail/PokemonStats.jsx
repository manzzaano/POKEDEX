import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'

/** Nombres de stats traducidos */
const STAT_NAMES = {
    hp: 'PS',
    attack: 'Ataque',
    defense: 'Defensa',
    'special-attack': 'At. Esp.',
    'special-defense': 'Def. Esp.',
    speed: 'Velocidad',
}

/** Colores de cada stat para la barra de progreso */
const STAT_COLORS = {
    hp: '#ef4444',
    attack: '#f97316',
    defense: '#eab308',
    'special-attack': '#3b82f6',
    'special-defense': '#22c55e',
    speed: '#ec4899',
}

/**
 * Estadísticas de combate con gráfico radar de Recharts.
 */
export default function PokemonStats({ stats = [] }) {
    const chartData = stats.map((s) => ({
        stat: STAT_NAMES[s.stat.name] || s.stat.name,
        value: s.base_stat,
        fullMark: 255,
    }))

    const total = stats.reduce((sum, s) => sum + s.base_stat, 0)

    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                ⚔️ Estadísticas
                <span className="text-sm font-normal text-gray-400">
                    (Total: {total})
                </span>
            </h3>

            {/* Gráfico radar */}
            <div className="w-full h-64 mb-4">
                <ResponsiveContainer>
                    <RadarChart data={chartData}>
                        <PolarGrid stroke="#4b5563" strokeOpacity={0.3} />
                        <PolarAngleAxis
                            dataKey="stat"
                            tick={{ fill: '#9ca3af', fontSize: 11 }}
                        />
                        <PolarRadiusAxis
                            angle={30}
                            domain={[0, 255]}
                            tick={false}
                            axisLine={false}
                        />
                        <Radar
                            name="Stats"
                            dataKey="value"
                            stroke="#6366f1"
                            fill="#6366f1"
                            fillOpacity={0.3}
                            strokeWidth={2}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#f3f4f6',
                            }}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Barras de progreso */}
            <div className="space-y-2">
                {stats.map((s) => (
                    <div key={s.stat.name} className="flex items-center gap-3">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-20 text-right">
                            {STAT_NAMES[s.stat.name] || s.stat.name}
                        </span>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: STAT_COLORS[s.stat.name] || '#6366f1' }}
                                initial={{ width: 0 }}
                                animate={{ width: `${(s.base_stat / 255) * 100}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                            />
                        </div>
                        <span className="text-xs font-mono text-gray-600 dark:text-gray-300 w-8">
                            {s.base_stat}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
