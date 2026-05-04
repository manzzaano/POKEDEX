import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import useBreakpoint from '../hooks/useBreakpoint'
import CleanLogo from './ui/CleanLogo'

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

function StarterSprite({ id, size = 72 }) {
  const [src, setSrc] = useState(ART(id))
  return (
    <div
      style={{
        width: size, height: size, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)',
      }}
    >
      <img
        src={src}
        alt=""
        style={{ width: size - 4, height: size - 4, objectFit: 'contain', filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.4))' }}
        onError={() => setSrc(FALL(id))}
      />
    </div>
  )
}

export default function HomeScreen({ onSelectRegion }) {
  const bp = useBreakpoint()
  const isMobile = bp === 'xs'
  const isTablet = bp === 'sm'

  const cols = isMobile ? 2 : isTablet ? 3 : 5
  const cardPad = isMobile ? '16px 8px 14px' : isTablet ? '20px 10px 16px' : '24px 14px 20px'
  const cardWidth = isMobile ? '100%' : isTablet ? 200 : 240
  const cardGap = isMobile ? 10 : isTablet ? 16 : 22
  const logoW = isMobile ? 'clamp(180px, 70vw, 280px)' : 360
  const spriteSz = isMobile ? 50 : isTablet ? 60 : 72
  const titleSz = isMobile ? 32 : isTablet ? 40 : 48
  const subtitleSz = isMobile ? 13 : 16
  const nameSz = isMobile ? 16 : isTablet ? 18 : 22

  return (
    <AnimatePresence>
      <motion.div
        key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '20px 12px' : '36px 56px', overflowY: 'auto' }}
      >
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }} style={{ marginBottom: isMobile ? 24 : 36, textAlign: 'center' }}
        >
          <CleanLogo
            src={`${BASE}pokemon-logo.png`}
            width={typeof logoW === 'number' ? logoW : undefined}
            style={{ marginBottom: 8, filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.6))', maxWidth: '100%' }}
            responsive={typeof logoW === 'string' ? logoW : undefined}
          />
          <p style={{ fontSize: subtitleSz, color: 'rgba(255,255,255,0.35)', margin: '8px 0 0', fontWeight: 500 }}>
            Selecciona una región para explorar
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: cardGap, maxWidth: 1200, width: '100%' }}
        >
          {REGIONS.map((r, gi) => (
            <motion.button
              key={r.roman} variants={cardVariants}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectRegion(r.roman)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 8 : 12,
                width: cardWidth, flex: isMobile ? '1 1 140px' : '0 0 auto',
                padding: cardPad, borderRadius: 24,
                background: 'rgba(255,255,255,0.035)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)', cursor: 'pointer',
                color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = r.color + '55'
                e.currentTarget.style.boxShadow = `0 16px 48px ${r.color}18`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'
              }}
            >
              <div style={{ display: 'flex', gap: isMobile ? 3 : 6, alignItems: 'center', justifyContent: 'center' }}>
                {STARTERS[gi].map((sid) => (
                  <StarterSprite key={sid} id={sid} size={spriteSz} />
                ))}
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: isMobile ? 9 : 11, fontWeight: 700, color: r.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>
                  {r.gen}
                </span>
                <span style={{ display: 'block', fontSize: nameSz, fontWeight: 800 }}>
                  {r.name}
                </span>
                <span style={{ display: 'block', fontSize: isMobile ? 10 : 12, color: 'rgba(255,255,255,0.28)', marginTop: 2 }}>
                  #{r.start} – #{r.end}
                </span>
              </div>
            </motion.button>
          ))}

          <motion.button
            variants={cardVariants}
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelectRegion('')}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 8 : 12,
              width: cardWidth, flex: isMobile ? '1 1 140px' : '0 0 auto',
              padding: cardPad, borderRadius: 24,
              background: 'rgba(255,255,255,0.035)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)', cursor: 'pointer',
              color: '#fff', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              minHeight: isMobile ? 190 : 272,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(255,255,255,0.04)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'
            }}
          >
            <div style={{ display: 'flex', gap: isMobile ? 3 : 6, alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: spriteSz, height: spriteSz, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)' }}>
                <img src={`${BASE}pokeball.png`} alt="" style={{ width: spriteSz - 16, height: spriteSz - 16, objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }} />
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: isMobile ? 9 : 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>Todas</span>
              <span style={{ display: 'block', fontSize: nameSz, fontWeight: 800 }}>Nacional</span>
              <span style={{ display: 'block', fontSize: isMobile ? 10 : 12, color: 'rgba(255,255,255,0.28)', marginTop: 2 }}>#1 – #1025</span>
            </div>
          </motion.button>
        </motion.div>

        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.12)', marginTop: isMobile ? 24 : 40, textAlign: 'center' }}>
          Desarrollado por Ismael Manzano León
        </p>
      </motion.div>
    </AnimatePresence>
  )
}
