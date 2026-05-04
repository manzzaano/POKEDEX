import { AnimatePresence, motion } from 'framer-motion'
import usePokemonDetail from '../../hooks/usePokemonDetail'
import usePokedexStore from '../../store/usePokedexStore'
import PokemonHeader from '../../features/detail/PokemonHeader'
import PokemonTypes from '../../features/detail/PokemonTypes'
import PokemonInfo from '../../features/detail/PokemonInfo'
import PokemonStats from '../../features/detail/PokemonStats'
import EvolutionChain from '../../features/detail/EvolutionChain'
import RotomAssistant from './RotomAssistant'
import { playSfx, SFX_SCAN } from '../../utils/sfx'
import { useEffect } from 'react'

export default function PokemonScanner() {
    const selectedPokemonName = usePokedexStore((s) => s.selectedPokemonName)
    const { data: pokemon, isLoading, error } = usePokemonDetail(selectedPokemonName)

    useEffect(() => {
        if (selectedPokemonName && !isLoading) {
            playSfx(SFX_SCAN)
        }
    }, [selectedPokemonName, isLoading])

    if (!selectedPokemonName) {
        return (
            <div className="flex-1 flex items-center justify-center h-full w-full">
                <div className="text-center font-mono text-cyan-500/50 blink">
                    [ ESPERANDO SELECCIÓN DE OBJETIVO ]
                </div>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center h-full w-full">
                <div className="w-32 h-32 rounded-full border border-cyan-500/30 flex items-center justify-center relative mb-4">
                    <motion.div
                        className="absolute inset-0 rounded-full border-t border-cyan-400"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="text-cyan-500 font-mono text-xs text-center">SCANNING</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex-1 flex items-center justify-center h-full w-full">
                <div className="text-center font-mono text-red-500 bg-red-950/30 border border-red-500/50 p-4 rounded bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(239,68,68,0.1)_10px,rgba(239,68,68,0.1)_20px)]">
                    [ ERROR EN LA BASE DE DATOS ]
                    <br />
                    <span className="text-xs text-red-400/80 mt-2 block">{error.message}</span>
                </div>
            </div>
        )
    }

    if (!pokemon) return null

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pokemon.name}
                className="w-full h-full flex overflow-hidden relative"
                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98, x: -20 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
            >
                {/* 3D Holographic Model Viewer Placeholder */}
                <div className="w-2/5 border-r border-cyan-900/30 relative flex items-center justify-center pt-10 pb-20">
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent mix-blend-screen pointer-events-none" />

                    {/* Glowing platform */}
                    <motion.div
                        className="absolute bottom-[20%] w-64 h-16 rounded-full bg-cyan-500/5 border border-cyan-400/30"
                        style={{ transform: 'rotateX(70deg)' }}
                        animate={{
                            boxShadow: ['0 0 20px rgba(6,182,212,0.2)', '0 0 50px rgba(6,182,212,0.4)', '0 0 20px rgba(6,182,212,0.2)']
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Laser Scanner Effect */}
                    <motion.div
                        className="absolute w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,1)] z-20 pointer-events-none"
                        animate={{ top: ['20%', '80%', '20%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* Floating Pokemon */}
                    <motion.img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                        alt={pokemon.name}
                        className="w-64 h-64 object-contain relative z-10 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                        initial={{ y: 0 }}
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* Data overlay */}
                    <div className="absolute top-4 left-4 font-mono text-cyan-500/60 text-xs">
                        ID: {String(pokemon.id).padStart(4, '0')}
                        <br />
                        CAT: MONSTER
                    </div>

                    <div className="absolute top-4 right-4 font-mono text-cyan-500/60 text-xs text-right">
                        H: {pokemon.height / 10}m
                        <br />
                        W: {pokemon.weight / 10}kg
                    </div>
                </div>

                {/* Data Panel */}
                <div className="w-3/5 h-full overflow-y-auto overflow-x-hidden custom-scrollbar bg-slate-900/40 p-6 space-y-8 relative">
                    <div className="absolute top-0 right-0 p-4 z-10">
                        {/* We will place the RotomAssistant here */}
                        <RotomAssistant pokemon={pokemon} />
                    </div>

                    <PokemonHeader pokemon={pokemon} />

                    <div className="grid grid-cols-2 gap-4">
                        <PokemonTypes types={pokemon.types} />
                    </div>

                    <PokemonInfo pokemon={pokemon} />
                    <PokemonStats stats={pokemon.stats} />
                    <EvolutionChain pokemonId={pokemon.id} />
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
