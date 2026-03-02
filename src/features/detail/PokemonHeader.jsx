import { motion } from 'framer-motion'
import useFavorites from '../../hooks/useFavorites'
import { useState, useRef } from 'react'

/**
 * Cabecera del detalle: nombre, imagen artwork, shiny, favorito, cry audio.
 */
export default function PokemonHeader({ pokemon }) {
    const { toggleFavorite, isFavorite } = useFavorites()
    const [showShiny, setShowShiny] = useState(false)
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const fav = isFavorite(pokemon.name)

    const artworkUrl = pokemon.sprites?.other?.['official-artwork']?.front_default
        || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`

    const shinyUrl = pokemon.sprites?.front_shiny
        || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`

    const cryUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`

    const playCry = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
            setIsPlaying(true)
        }
    }

    return (
        <div className="flex flex-col items-center gap-3">
            {/* Nombre y número */}
            <div className="flex items-center gap-3">
                <motion.h2
                    className="text-3xl font-bold capitalize text-gray-900 dark:text-white"
                    key={pokemon.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {pokemon.name}
                </motion.h2>
                <span className="text-lg font-mono text-gray-400 dark:text-gray-500">
                    #{String(pokemon.id).padStart(4, '0')}
                </span>
            </div>

            {/* Imagen principal */}
            <motion.div
                className="relative group"
                key={`img-${pokemon.id}-${showShiny}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
                <img
                    src={showShiny ? shinyUrl : artworkUrl}
                    alt={pokemon.name}
                    className="w-64 h-64 object-contain drop-shadow-2xl"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/20 transition-all duration-500" />
            </motion.div>

            {/* Botones de acción */}
            <div className="flex items-center gap-3">
                {/* Botón favorito */}
                <motion.button
                    onClick={() => toggleFavorite(pokemon)}
                    className={`text-2xl p-2 rounded-full transition-colors duration-200
            ${fav
                            ? 'text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20'
                            : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10'
                        }`}
                    whileTap={{ scale: 0.85 }}
                    title={fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                >
                    {fav ? '★' : '☆'}
                </motion.button>

                {/* Botón shiny */}
                <motion.button
                    onClick={() => setShowShiny(!showShiny)}
                    className={`text-sm px-3 py-1.5 rounded-full font-medium transition-all duration-200
            ${showShiny
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-amber-500/10 hover:text-amber-400'
                        }`}
                    whileTap={{ scale: 0.95 }}
                >
                    ✨ {showShiny ? 'Normal' : 'Shiny'}
                </motion.button>

                {/* Botón cry (audio) */}
                <motion.button
                    onClick={playCry}
                    className={`text-sm px-3 py-1.5 rounded-full font-medium transition-all duration-200
            ${isPlaying
                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-indigo-500/10 hover:text-indigo-400'
                        }`}
                    whileTap={{ scale: 0.95 }}
                    title="Reproducir grito del Pokémon"
                >
                    🔊 Cry
                </motion.button>
                <audio
                    ref={audioRef}
                    src={cryUrl}
                    onEnded={() => setIsPlaying(false)}
                    onError={() => setIsPlaying(false)}
                />
            </div>
        </div>
    )
}
