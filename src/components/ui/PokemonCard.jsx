import RetroHeart from './RetroHeart'
import TypeBadge from './TypeBadge'
import SpriteImg from './SpriteImg'
import { motion } from 'framer-motion'
import { useQueryClient } from '@tanstack/react-query'
import { fetchPokemonDetail } from '../../services/pokeApi'

export default function PokemonCard({ pokemon, types = [], isFav, onToggleFav, onSelect, hovered, onHover }) {
  const h = hovered === pokemon.id
  const queryClient = useQueryClient()

  const handleMouseEnter = () => {
    onHover?.(pokemon.id)
    queryClient.prefetchQuery({
      queryKey: ['pokemon-detail', pokemon.name],
      queryFn: () => fetchPokemonDetail(pokemon.name),
      staleTime: 1000 * 60 * 30,
    })
  }

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 14px 40px rgba(0,0,0,0.5)' }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => onSelect(pokemon.name)}
      className="relative cursor-pointer flex flex-col items-center gap-2"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 20,
        padding: '16px 10px 14px',
        boxShadow: h ? '0 16px 48px rgba(0,0,0,0.55)' : '0 8px 32px 0 rgba(0,0,0,0.4)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        transform: h ? 'translateY(-6px)' : 'none',
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFav(pokemon.id) }}
        className="absolute bg-transparent border-0 cursor-pointer transition-all"
        style={{ top: 10, right: 10, opacity: isFav ? 1 : 0.55 }}
        title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        <RetroHeart filled={isFav} size={20} />
      </button>

      <SpriteImg
        id={pokemon.id}
        size={100}
        style={{
          marginTop: -14,
          filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.5))',
          transform: h ? 'scale(1.08)' : 'none',
        }}
      />

      <span className="text-xs font-bold text-white/60" style={{ fontSize: 11 }}>
        #{String(pokemon.id).padStart(3, '0')}
      </span>
      <span className="text-base font-bold capitalize text-white text-center" style={{ fontSize: 14 }}>
        {pokemon.name.replace(/-/g, ' ')}
      </span>
      {types.length > 0 && (
        <div className="flex flex-wrap justify-center" style={{ gap: 4 }}>
          {types.map((t) => (
            <TypeBadge key={t} type={t} size="sm" />
          ))}
        </div>
      )}
    </motion.div>
  )
}
