import { motion } from 'framer-motion'
import usePokedexStore from '../../store/usePokedexStore'
import { Aperture, Settings, Map, Database } from 'lucide-react'
import { playSfx, SFX_HOVER, SFX_CLICK } from '../../utils/sfx'

export default function Desktop({ children }) {
    const isAppOpen = usePokedexStore((s) => s.isAppOpen)
    const openApp = usePokedexStore((s) => s.openApp)

    const apps = [
        { id: 'pokedex', name: 'Pokédex', icon: Database, action: openApp, active: isAppOpen, color: 'text-cyan-400' },
        { id: 'map', name: 'Mapa', icon: Map, action: () => { }, active: false, color: 'text-emerald-400' },
        { id: 'camera', name: 'Cámara', icon: Aperture, action: () => { }, active: false, color: 'text-amber-400' },
        { id: 'settings', name: 'Ajustes', icon: Settings, action: () => { }, active: false, color: 'text-slate-400' },
    ]

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans text-slate-200">
            {/* Desktop Grid Lines (Cyan tint) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

            {/* Top Bar (Status) */}
            <header className="absolute top-0 w-full h-8 bg-slate-900/40 backdrop-blur-md border-b border-cyan-900/30 flex items-center justify-between px-4 z-20 font-mono text-xs text-cyan-500/80">
                <div className="flex items-center gap-3">
                    <span className="font-bold text-cyan-400">RotomOS v2.0</span>
                    <span>|</span>
                    <span>Conexión Estable</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>100% 🔋</span>
                    <span>{new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </header>

            {/* Main Surface for Apps */}
            <main className="absolute inset-0 pt-8 pb-24 z-10 flex items-center justify-center">
                {children}
            </main>

            {/* macOS Style Dock */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
            >
                <div className="flex items-end gap-4 px-6 py-3 bg-slate-900/60 backdrop-blur-xl border border-cyan-800/40 rounded-3xl shadow-[0_0_30px_-5px_rgba(6,182,212,0.2)]">
                    {apps.map((app) => (
                        <div key={app.id} className="relative group flex flex-col items-center">
                            <motion.button
                                onClick={() => {
                                    playSfx(SFX_CLICK)
                                    app.action()
                                }}
                                onMouseEnter={() => playSfx(SFX_HOVER)}
                                whileHover={{ scale: 1.2, y: -10 }}
                                whileTap={{ scale: 0.9 }}
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 relative overflow-hidden ${app.active
                                    ? 'bg-slate-800 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                                    : 'bg-slate-800/80 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800'
                                    }`}
                            >
                                {/* App Icon Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                                <app.icon className={`w-7 h-7 ${app.color} relative z-10`} strokeWidth={app.active ? 2.5 : 2} />
                            </motion.button>

                            {/* Active Indicator dot */}
                            {app.active && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                                />
                            )}

                            {/* Tooltip */}
                            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 bg-slate-800/90 text-slate-200 text-xs rounded-lg border border-slate-700/50 pointer-events-none whitespace-nowrap shadow-lg backdrop-blur-md">
                                {app.name}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

        </div>
    )
}
