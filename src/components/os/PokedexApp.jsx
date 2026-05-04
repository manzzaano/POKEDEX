import { motion, AnimatePresence } from 'framer-motion'
import usePokedexStore from '../../store/usePokedexStore'
import { X, Minus, Square } from 'lucide-react'
import { playSfx, SFX_CLICK, SFX_OPEN } from '../../utils/sfx'
import { useEffect } from 'react'

import PokemonGallery from './PokemonGallery'
import PokemonScanner from './PokemonScanner'

export default function PokedexApp() {
    const isAppOpen = usePokedexStore((s) => s.isAppOpen)
    const closeApp = usePokedexStore((s) => s.closeApp)

    useEffect(() => {
        if (isAppOpen) {
            playSfx(SFX_OPEN)
        }
    }, [isAppOpen])

    return (
        <AnimatePresence>
            {isAppOpen && (
                <motion.div
                    className="absolute z-40 bg-slate-900/40 backdrop-blur-2xl border border-cyan-500/50 rounded-2xl shadow-[0_0_50px_-10px_rgba(6,182,212,0.4)] overflow-hidden flex flex-col pointer-events-auto"
                    style={{
                        width: '90vw',
                        height: '85vh',
                        maxWidth: '1400px',
                        maxHeight: '900px'
                    }}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    {/* Window Title Bar */}
                    <div className="h-10 bg-slate-900/60 border-b border-cyan-800/40 flex items-center justify-between px-4 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                            </div>
                            <span className="text-cyan-400 font-mono text-sm tracking-widest font-bold">POKÉDEX DB // ROTOM.OS</span>
                        </div>

                        {/* Window Controls */}
                        <div className="flex items-center gap-3">
                            <button className="text-slate-500 hover:text-cyan-400 transition-colors">
                                <Minus size={16} />
                            </button>
                            <button className="text-slate-500 hover:text-cyan-400 transition-colors">
                                <Square size={14} />
                            </button>
                            <button
                                className="text-slate-500 hover:text-red-400 transition-colors"
                                onClick={() => {
                                    playSfx(SFX_CLICK)
                                    closeApp()
                                }}
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* App Content */}
                    <div className="flex-1 flex overflow-hidden">
                        {/* Left Side: Gallery (Will replace Sidebar) */}
                        <div className="w-1/3 min-w-[320px] max-w-[400px] border-r border-cyan-900/30 bg-slate-950/40 relative">
                            {/* Decorative Edge Glow */}
                            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />
                            <PokemonGallery />
                        </div>

                        {/* Right Side: Scanner (Will replace PokemonDetail) */}
                        <div className="flex-1 bg-slate-950/20 relative overflow-hidden">
                            {/* Decorative Scanner Lines */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                            <PokemonScanner />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
