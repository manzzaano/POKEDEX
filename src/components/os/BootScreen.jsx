import { motion, AnimatePresence } from 'framer-motion'
import usePokedexStore from '../../store/usePokedexStore'
import { playSfx, SFX_CLICK, SFX_BEEP } from '../../utils/sfx'

export default function BootScreen() {
    const bootSystem = usePokedexStore((s) => s.bootSystem)

    const handleBoot = () => {
        playSfx(SFX_CLICK)
        setTimeout(() => playSfx(SFX_BEEP), 300)
        bootSystem()
    }

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                {/* Holographic grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

                <motion.div
                    className="relative z-10 flex flex-col items-center gap-8 cursor-pointer group"
                    onClick={handleBoot}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {/* Rotom Eye / Core */}
                    <motion.div
                        className="w-32 h-32 rounded-full border-2 border-cyan-500/50 flex items-center justify-center relative shadow-[0_0_50px_-10px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_80px_-10px_rgba(6,182,212,0.8)] transition-shadow duration-500"
                        animate={{
                            boxShadow: ['0 0 50px -10px rgba(6,182,212,0.5)', '0 0 80px -10px rgba(6,182,212,0.8)', '0 0 50px -10px rgba(6,182,212,0.5)']
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* Inner glowing core */}
                        <div className="w-16 h-16 rounded-full bg-cyan-400 blur-md absolute opacity-60" />
                        <div className="w-12 h-12 rounded-full border-4 border-cyan-200 bg-cyan-500 relative z-10 overflow-hidden">
                            {/* Reflection on the eye */}
                            <div className="absolute top-1 left-2 w-4 h-4 bg-white/60 rounded-full blur-[1px]" />
                        </div>

                        {/* Scanning ring */}
                        <motion.div
                            className="absolute inset-[-4px] rounded-full border border-cyan-400/30 border-t-cyan-400"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>

                    <div className="text-center space-y-2">
                        <motion.h1
                            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-[0.2em] uppercase font-mono"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            RotomOS
                        </motion.h1>
                        <p className="text-cyan-600/60 font-mono text-sm tracking-widest group-hover:text-cyan-400/80 transition-colors">
                            HAZ CLIC PARA INICIAR
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
