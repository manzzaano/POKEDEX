import RetroHeart from './RetroHeart'
import TypeBadge from './TypeBadge'
import SpriteImg from './SpriteImg'

export default function PokemonCard({ pokemon, types = [], isFav, onToggleFav, onSelect, hovered, onHover }) {
  const h = hovered === pokemon.id

  return (
    <div
      onMouseEnter={() => onHover?.(pokemon.id)}
      onMouseLeave={() => onHover?.(null)}
      onClick={() => onSelect(pokemon.name)}
      className="relative cursor-pointer flex flex-col items-center gap-2 p-6"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 24,
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
        onClick={(e) => {
          e.stopPropagation()
          onToggleFav(pokemon.id)
        }}
        className="absolute top-3.5 right-3.5 bg-transparent border-0 cursor-pointer transition-all hover:scale-110"
        style={{ opacity: isFav ? 1 : 0.55 }}
        title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        <RetroHeart filled={isFav} size={24} />
      </button>

      <SpriteImg
        id={pokemon.id}
        size={128}
        style={{
          marginTop: -20,
          filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.5))',
          transition: 'transform .3s',
          transform: h ? 'scale(1.08)' : 'none',
        }}
      />

      <span className="text-xs font-bold text-white/60">
        #{String(pokemon.id).padStart(3, '0')}
      </span>
      <span className="text-base font-bold capitalize text-white text-center">
        {pokemon.name.replace(/-/g, ' ')}
      </span>
      {types.length > 0 && (
        <div className="flex gap-1.5 flex-wrap justify-center">
          {types.map((t) => (
            <TypeBadge key={t} type={t} />
          ))}
        </div>
      )}
    </div>
  )
}
