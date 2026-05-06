import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import SocialLinks from './ui/SocialLinks'

const STARTERS = [
  [1, 4, 7],
  [152, 155, 158],
  [252, 255, 258],
  [387, 390, 393],
  [495, 498, 501],
  [650, 653, 656],
  [722, 725, 728],
  [810, 813, 816],
  [906, 909, 912],
]

const REGIONS = [
  { roman: 'I', name: 'Kanto',   gen: '1ª Gen',  start: 1, end: 151, color: '#ef4444' },
  { roman: 'II', name: 'Johto',  gen: '2ª Gen',  start: 152, end: 251, color: '#eab308' },
  { roman: 'III', name: 'Hoenn',  gen: '3ª Gen',  start: 252, end: 386, color: '#22c55e' },
  { roman: 'IV', name: 'Sinnoh',  gen: '4ª Gen',  start: 387, end: 493, color: '#3b82f6' },
  { roman: 'V', name: 'Teselia',  gen: '5ª Gen',  start: 494, end: 649, color: '#8b5cf6' },
  { roman: 'VI', name: 'Kalos',   gen: '6ª Gen',  start: 650, end: 721, color: '#ec4899' },
  { roman: 'VII', name: 'Alola',  gen: '7ª Gen',  start: 722, end: 809, color: '#f97316' },
  { roman: 'VIII', name: 'Galar',  gen: '8ª Gen',  start: 810, end: 905, color: '#06b6d4' },
  { roman: 'IX', name: 'Paldea',  gen: '9ª Gen',  start: 906, end: 1025, color: '#a855f7' },
]

const BASE = import.meta.env.BASE_URL
const ART = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
const FALL = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

function StarterSprite({ id }) {
  const [src, setSrc] = useState(ART(id))
  return (
    <div style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 65%)' }}>
      <img src={src} alt="" style={{ width: 60, height: 60, objectFit: 'contain', filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.4))' }} onError={() => setSrc(FALL(id))} />
    </div>
  )
}

export default function HomeScreen({ onSelectRegion }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [])

  return (
    <AnimatePresence>
      <motion.div key="home" ref={scrollRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto 0', width: '100%' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }} style={{ marginBottom: 28, textAlign: 'center' }}
        >
          <div style={{ minHeight: 'clamp(60px, 20vw, 95px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={`${BASE}pokecore-logo.png`}
              alt="Pokémon"
              style={{ width: 'min(320px, 80vw)', marginBottom: 8, filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.6))' }}
            />
          </div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', margin: '8px 0 0', fontWeight: 500 }}>
            Selecciona una región para explorar
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, maxWidth: 1100, width: '100%' }}
        >
          {REGIONS.map((r, gi) => (
            <motion.button
              key={r.roman} variants={cardVariants}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectRegion(r.roman)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                flex: '1 1 180px', maxWidth: 240, padding: '20px 12px 18px', borderRadius: 24,
                background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)', cursor: 'pointer',
                color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = r.color + '55'; e.currentTarget.style.boxShadow = `0 16px 48px ${r.color}18` }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)' }}
            >
              <div style={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
                {STARTERS[gi].map((sid) => <StarterSprite key={sid} id={sid} />)}
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: r.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>{r.gen}</span>
                <span style={{ display: 'block', fontSize: 20, fontWeight: 800 }}>{r.name}</span>
                <span style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.28)', marginTop: 2 }}>#{r.start} – #{r.end}</span>
              </div>
            </motion.button>
          ))}

          <motion.button
            variants={cardVariants} whileHover={{ scale: 1.04, y: -4 }} whileTap={{ scale: 0.97 }}
            onClick={() => onSelectRegion('')}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
              flex: '1 1 180px', maxWidth: 240, padding: '20px 12px 18px', borderRadius: 24,
              background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)', cursor: 'pointer',
              color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", minHeight: 210,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(255,255,255,0.04)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 65%)' }}>
                <img src={`${BASE}pokeball.png`} alt="" style={{ width: 48, height: 48, objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }} />
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>Todas</span>
              <span style={{ display: 'block', fontSize: 20, fontWeight: 800 }}>Nacional</span>
              <span style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.28)', marginTop: 2 }}>#1 – #1025</span>
            </div>
          </motion.button>
        </motion.div>

        <div style={{ marginTop: 28 }}>
          <SocialLinks />
        </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
