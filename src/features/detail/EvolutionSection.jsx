import { motion } from 'framer-motion'
import SpriteImg from '../../components/ui/SpriteImg'
import TypeBadge from '../../components/ui/TypeBadge'

function parseChain(chain) {
  const result = []
  let current = chain
  while (current) {
    const id = Number(current.species.url.split('/').filter(Boolean).pop())
    result.push({ name: current.species.name, id })
    current = current.evolves_to?.[0] || null
  }
  return result
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.3 } }),
}

export default function EvolutionSection({ chain, pokemonId, onSelect }) {
  const evos = chain ? parseChain(chain) : []

  return (
    <div style={{ width: '100%' }}>
      <h3 style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', marginBottom: 12 }}>
        EVOLUCIONES
      </h3>

      {evos.length <= 1 ? (
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0 }}>Este Pokémon no evoluciona.</p>
      ) : (
        <div
          style={{
            background: `repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.012) 6px, rgba(255,255,255,0.012) 12px)`,
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '24px 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
            {evos.map((evo, i) => (
              <motion.div
                key={evo.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                {i > 0 && (
                  <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.25)', fontWeight: 700 }}>›</span>
                )}
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onSelect(evo.name)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    cursor: 'pointer',
                    background: evo.id === pokemonId ? 'rgba(255,255,255,0.06)' : 'transparent',
                    border: evo.id === pokemonId ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                    borderRadius: 16,
                    padding: '8px 12px',
                    transition: 'background .2s, border .2s',
                  }}
                >
                  <SpriteImg id={evo.id} size={72} style={{ borderRadius: '50%' }} />
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                    #{String(evo.id).padStart(3, '0')}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)', textTransform: 'capitalize' }}>
                    {evo.name.replace(/-/g, ' ')}
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export { parseChain }
