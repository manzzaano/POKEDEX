import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fetchPokemonDetail, fetchPokemonSpecies, fetchEvolutionChain } from '../../services/pokeApi'
import { getWeaknesses } from '../../data/typeChart'
import SpriteImg from '../../components/ui/SpriteImg'
import TypeBadge, { TYPE_COLORS, TYPE_NAMES } from '../../components/ui/TypeBadge'
import StatBar from '../../components/ui/StatBar'
import GenderDisplay from '../../components/ui/GenderDisplay'
import RetroHeart from '../../components/ui/RetroHeart'
import ShinyIcon from '../../components/ui/ShinyIcon'
import EvolutionSection from './EvolutionSection'
import FlavorTextSection from './FlavorTextSection'
import { getMoveName } from '../../data/moveNames'
import { getAbilityName } from '../../data/abilityNames'

function parseIdFromUrl(url) {
  return Number(url.split('/').filter(Boolean).pop())
}

export default function PokemonDetail({ pokemon, onClose, isFav, onToggleFav, onSelectPokemon, isMobile = false }) {
  if (!pokemon) return null

  const [isShiny, setIsShiny] = useState(false)

  const { data: detail, isLoading: detailLoading } = useQuery({
    queryKey: ['pokemon-detail', pokemon.name],
    queryFn: () => fetchPokemonDetail(pokemon.name),
    enabled: !!pokemon.name,
    staleTime: 1000 * 60 * 30,
  })

  const { data: species } = useQuery({
    queryKey: ['pokemon-species', pokemon.id],
    queryFn: () => fetchPokemonSpecies(pokemon.id),
    enabled: !!pokemon.id,
    staleTime: 1000 * 60 * 60,
  })

  const evolutionUrl = species?.evolution_chain?.url

  const { data: evolutionData } = useQuery({
    queryKey: ['evolution-chain', evolutionUrl],
    queryFn: () => fetchEvolutionChain(evolutionUrl),
    enabled: !!evolutionUrl,
    staleTime: 1000 * 60 * 60,
  })

  const primaryType = detail?.types?.[0]?.type?.name || 'normal'
  const primaryColor = TYPE_COLORS[primaryType] || '#888'

  const types = detail?.types?.map((t) => t.type.name) || []
  const stats = detail?.stats || []
  const moves = detail?.moves || []
  const weight = detail?.weight ?? 0
  const height = detail?.height ?? 0
  const abilities = detail?.abilities || []

  const genera = species?.genera?.find((g) => g.language?.name === 'es')?.genus || ''
  const genderRate = species?.gender_rate ?? -1
  const flavorEntries = species?.flavor_text_entries?.filter((f) => f.language?.name === 'es') || []

  const varieties = species?.varieties
    ?.filter((v) => v.pokemon.name !== pokemon.name)
    ?.map((v) => ({ name: v.pokemon.name, id: parseIdFromUrl(v.pokemon.url) })) || []

  const weaknesses = getWeaknesses(types)
  const statTotal = stats.reduce((s, st) => s + st.base_stat, 0)

  const statAbbr = (name) => {
    const map = { hp: 'PS', attack: 'ATQ', defense: 'DEF', 'special-attack': 'AT.ESP', 'special-defense': 'DF.ESP', speed: 'VEL' }
    return map[name] || name
  }

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={pokemon.name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'rgba(20,20,25,0.92)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: isMobile ? 20 : 32,
            padding: isMobile ? 20 : 40,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            maxWidth: isMobile ? '100vw' : 700,
            maxHeight: '92vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            position: 'relative',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 'calc(env(safe-area-inset-top, 0px) + 18px)', right: 22,
              background: 'none', border: 'none', color: '#fff',
              fontSize: 22, cursor: 'pointer', opacity: 0.5,
              zIndex: 10,
            }}
          >
            ✕
          </button>

          <button
            onClick={() => setIsShiny((s) => !s)}
            className="absolute bg-transparent border-0 cursor-pointer transition-all hover:scale-110"
            style={{ top: 'calc(env(safe-area-inset-top, 0px) + 21px)', right: 58, opacity: isShiny ? 1 : 0.55 }}
            title={isShiny ? 'Ver normal' : 'Ver shiny'}
          >
            <ShinyIcon active={isShiny} size={22} />
          </button>

          {/* ── Header: sprite + name + category ── */}
          <div
            style={{
              width: isMobile ? 140 : 200, height: isMobile ? 140 : 200, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `radial-gradient(circle, ${primaryColor}22 0%, transparent 70%)`,
              marginTop: isMobile ? -12 : -20,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`sprite-${pokemon.id}-${isShiny}`}
                initial={{ scale: 0.88, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.88, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{ display: 'flex' }}
              >
            <SpriteImg
              id={pokemon.id}
              sprites={detail?.sprites}
              size={isMobile ? 140 : 200}
              isShiny={isShiny}
              style={{ filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.5))', width: isMobile ? 120 : 180, height: isMobile ? 120 : 180 }}
            />
              </motion.div>
            </AnimatePresence>
          </div>

          <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
            #{String(pokemon.id).padStart(3, '0')}
          </span>

          <span style={{ fontSize: isMobile ? 18 : 26, fontWeight: 800, textTransform: 'capitalize', overflowWrap: 'break-word', textAlign: 'center' }}>
            {pokemon.name.replace(/-/g, ' ')}
          </span>

          {genera && (
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: -12 }}>
              Categoría: {genera}
            </span>
          )}

          {/* ── Types + fav ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {types.map((t) => (
              <TypeBadge key={t} type={t} />
            ))}
          </div>

          <button
            onClick={() => onToggleFav(pokemon.id)}
            className="absolute bg-transparent border-0 cursor-pointer transition-all hover:scale-110"
            style={{ top: 'calc(env(safe-area-inset-top, 0px) + 22px)', left: 22, opacity: isFav ? 1 : 0.55 }}
            title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <RetroHeart filled={isFav} size={28} />
          </button>

          {/* ── Info grid 4 cols ── */}
          <div style={{ width: '100%', display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 8 : 10 }}>
            {[
              { label: 'Altura', value: `${(height / 10).toFixed(1)} m` },
              { label: 'Peso', value: `${(weight / 10).toFixed(1)} kg` },
              {
                label: 'Sexo',
                render: () => <GenderDisplay genderRate={genderRate} />,
              },
              {
                label: 'Habilidad',
                render: () => {
                  const main = abilities[0]
                  if (!main) return <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>—</span>
                  return (
                    <span
                      style={{
                        fontSize: 11, fontWeight: 600, textTransform: 'capitalize',
                        padding: '3px 10px', borderRadius: 999,
                        background: main.is_hidden ? 'rgba(168,85,247,0.15)' : 'rgba(34,197,94,0.1)',
                        color: main.is_hidden ? '#c084fc' : '#86efac',
                        border: main.is_hidden ? '1px solid rgba(168,85,247,0.3)' : '1px solid rgba(34,197,94,0.25)',
                      }}
                    >
                      {getAbilityName(main.ability.name)}
                    </span>
                  )
                },
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14,
                  padding: '12px 8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                  {item.label}
                </span>
                {item.render ? item.render() : (
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* ── Stats ── */}
          {stats.length > 0 && (
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', margin: 0 }}>
                  PUNTOS DE BASE
                </h3>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
                  Total: {statTotal}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {stats.map((s) => (
                  <StatBar
                    key={s.stat.name}
                    label={statAbbr(s.stat.name)}
                    value={s.base_stat}
                    color={TYPE_COLORS[primaryType] || '#888'}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Weaknesses ── */}
          {weaknesses.length > 0 && (
            <div style={{ width: '100%' }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', marginBottom: 10 }}>
                DEBILIDADES
              </h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {weaknesses.map((w) => (
                  <span
                    key={w.type}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      background: (TYPE_COLORS[w.type] || '#888') + '33',
                      color: TYPE_COLORS[w.type] || '#aaa',
                      border: `1px solid ${(TYPE_COLORS[w.type] || '#888')}55`,
                    }}
                  >
                    {TYPE_NAMES[w.type] || w.type}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Description ── */}
          {flavorEntries.length > 0 && <FlavorTextSection entries={flavorEntries} />}

          {/* ── Evolutions ── */}
          {evolutionData?.chain && (
            <EvolutionSection
              chain={evolutionData.chain}
              pokemonId={pokemon.id}
              onSelect={onSelectPokemon || onClose}
            />
          )}

          {/* ── Variants ── */}
          {varieties.length > 0 && (
            <div style={{ width: '100%' }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', marginBottom: 10 }}>
                FORMAS
              </h3>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {varieties.map((v) => (
                  <motion.button
                    key={v.id}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSelectPokemon?.(v.name)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      cursor: 'pointer',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 16,
                      padding: '8px 12px',
                      color: '#fff',
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    }}
                  >
                    <SpriteImg id={v.id} size={64} style={{ borderRadius: '50%' }} />
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                      #{String(v.id).padStart(3, '0')}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'capitalize' }}>
                      {v.name.replace(/-/g, ' ')}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* ── Moves ── */}
          {moves.length > 0 && (
            <div style={{ width: '100%' }}>
              <h3 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', marginBottom: 10 }}>
                MOVIMIENTOS ({moves.length})
              </h3>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {moves.slice(0, 30).map((m) => {
                  const moveName = getMoveName(m.move.name)
                  return (
                    <span
                      key={m.move.name}
                      style={{
                        padding: isMobile ? '3px 8px' : '4px 10px',
                        borderRadius: 999,
                        fontSize: isMobile ? 10 : 11,
                        maxWidth: '100%',
                        overflowWrap: 'break-word',
                        textTransform: 'capitalize',
                        background: 'rgba(255,255,255,0.04)',
                        color: 'rgba(255,255,255,0.55)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {moveName}
                    </span>
                  )
                })}
                {moves.length > 30 && (
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', padding: '4px 10px' }}>
                    +{moves.length - 30} más
                  </span>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
