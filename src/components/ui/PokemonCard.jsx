import RetroHeart from './RetroHeart'
import TypeBadge from './TypeBadge'
import SpriteImg from './SpriteImg'
import { motion } from 'framer-motion'

export default function PokemonCard({ pokemon, types = [], isFav, onToggleFav, onSelect, hovered, onHover, isMobile = false }) {
  const h = hovered === pokemon.id
  const sz = isMobile ? 80 : 128

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 14px 40px rgba(0,0,0,0.5)' }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => onHover?.(pokemon.id)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => onSelect(pokemon.name)}
      className="relative cursor-pointer flex flex-col items-center gap-2"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: isMobile ? 18 : 24,
        padding: isMobile ? '14px 8px 12px' : '24px 16px 20px',
        boxShadow: h
          ? '0 16px 48px rgba(0,0,0,0.55)'
          : '0 8px 32px 0 rgba(0,0,0,0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        transition: 'transform .25s, box-shadow .25s',
        transform: h ? 'translateY(-6px)' : 'none',
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFav(pokemon.id) }}
        className="absolute bg-transparent border-0 cursor-pointer transition-all"
        style={{ top: isMobile ? 8 : 14, right: isMobile ? 8 : 14, opacity: isFav ? 1 : 0.55 }}
        title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        <RetroHeart filled={isFav} size={isMobile ? 18 : 24} />
      </button>

      <SpriteImg
        id={pokemon.id}
        size={sz}
        style={{
          marginTop: -16,
          filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.5))',
          transition: 'transform .3s',
          transform: h ? 'scale(1.08)' : 'none',
        }}
      />

      <span className="text-xs font-bold text-white/60" style={{ fontSize: isMobile ? 10 : 12 }}>
        #{String(pokemon.id).padStart(3, '0')}
      </span>
      <span className="text-base font-bold capitalize text-white text-center" style={{ fontSize: isMobile ? 13 : 17 }}>
        {pokemon.name.replace(/-/g, ' ')}
      </span>
      {types.length > 0 && (
        <div className="flex flex-wrap justify-center" style={{ gap: isMobile ? 3 : 6 }}>
          {types.map((t) => (
            <TypeBadge key={t} type={t} size={isMobile ? 'sm' : 'md'} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
