import { motion } from 'framer-motion'

export default function Skeleton({ width = '100%', height = '1rem', rounded = 'rounded-md', className = '' }) {
    return (
        <motion.div
            className={`${rounded} ${className}`}
            style={{
                width,
                height,
                background: 'rgba(255,255,255,0.06)',
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
    )
}


