import { motion } from 'framer-motion'

export default function StatBar({ label, value, max = 255, color = '#888' }) {
  const pct = Math.min(100, (value / max) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', alignItems: 'center', gap: 10 }}
    >
      <span style={{
        width: 42, fontSize: 11, fontWeight: 700,
        color: 'rgba(255,255,255,0.5)', textAlign: 'right',
        flexShrink: 0, letterSpacing: '0.04em',
      }}>
        {label}
      </span>
      <div style={{
        flex: 1, height: 10, borderRadius: 99,
        background: 'rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            height: '100%', borderRadius: 99,
            background: `linear-gradient(90deg, ${color}, ${color}cc, ${color}66)`,
            boxShadow: `0 0 10px ${color}44`,
          }}
        />
      </div>
      <span style={{
        width: 30, fontSize: 12, fontWeight: 700,
        color: 'rgba(255,255,255,0.8)', textAlign: 'right',
        flexShrink: 0,
      }}>
        {value}
      </span>
    </motion.div>
  )
}
