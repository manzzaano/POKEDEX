import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Activity } from 'lucide-react'
import { playSfx, SFX_CLICK } from '../../utils/sfx'
import usePokemonSpecies from '../../hooks/usePokemonSpecies'

export default function RotomAssistant({ pokemon }) {
    const { data: species, isLoading } = usePokemonSpecies(pokemon?.id)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    // Cancelar voz al cambiar de Pokémon o desmontar
    useEffect(() => {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
        return () => window.speechSynthesis.cancel()
    }, [pokemon?.id])

    const handleSpeak = () => {
        playSfx(SFX_CLICK)

        if (isSpeaking) {
            window.speechSynthesis.cancel()
            setIsSpeaking(false)
            return
        }

        if (!species) return

        // Buscar flavor_text en español, fallback a inglés
        const flavorEntry = species.flavor_text_entries?.find(
            (entry) => entry.language.name === 'es'
        ) || species.flavor_text_entries?.find(
            (entry) => entry.language.name === 'en'
        )

        if (flavorEntry) {
            const textToSpeak = flavorEntry.flavor_text.replace(/[\n\f]/g, ' ')
            const utterance = new SpeechSynthesisUtterance(textToSpeak)
            utterance.lang = flavorEntry.language.name === 'es' ? 'es-ES' : 'en-US'
            utterance.rate = 1.1
            utterance.pitch = 1.2
            utterance.onstart = () => setIsSpeaking(true)
            utterance.onend = () => setIsSpeaking(false)
            utterance.onerror = () => setIsSpeaking(false)
            window.speechSynthesis.speak(utterance)
        }
    }

    return (
        <motion.div
            className="relative flex items-center justify-end group z-50 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={handleSpeak}
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="mr-4 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full font-mono text-xs shadow-lg flex items-center gap-2"
                    >
                        {isLoading ? 'ANALIZANDO...' : isSpeaking ? 'DETENER LECTURA' : 'ANALIZAR DATOS DE ESPECIE'}
                        {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center relative overflow-hidden group-hover:bg-slate-700 transition-colors">
                <div className="absolute inset-0 bg-cyan-400/20 mix-blend-screen" />

                {isSpeaking ? (
                    <motion.div className="flex items-center justify-center gap-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-cyan-400 rounded-full"
                                animate={{ height: [4, 20, 4] }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <Activity className="text-cyan-400 w-6 h-6 animate-pulse" />
                )}

                {!isSpeaking && (
                    <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-white/80 blur-[1px]" />
                )}
            </div>
        </motion.div>
    )
}
