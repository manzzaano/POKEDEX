import { useMemo } from 'react'

/**
 * SVG inline de una Pokéball simplificada.
 * Se usa como data URI para evitar peticiones de red.
 */
const POKEBALL_SVG = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" stroke-width="4"/>
  <path d="M2,50 H98" stroke="currentColor" stroke-width="4"/>
  <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" stroke-width="4"/>
  <circle cx="50" cy="50" r="7" fill="currentColor"/>
</svg>
`)}`

/**
 * Genera configuraciones aleatorias para las Pokéballs flotantes.
 * Se memorizan para no recalcular en cada render.
 */
function generateBalls(count) {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        size: 20 + Math.random() * 40,              // 20-60px
        left: Math.random() * 100,                    // 0-100% horizontal
        delay: Math.random() * 20,                    // 0-20s delay
        duration: 25 + Math.random() * 35,            // 25-60s por ciclo
        startY: 100 + Math.random() * 20,             // empieza fuera de pantalla abajo
        drift: -30 + Math.random() * 60,              // desplazamiento horizontal ±30%
        rotate: Math.random() * 360,                  // rotación inicial
        rotateDelta: 90 + Math.random() * 270,        // cuánto rota en el recorrido
    }))
}

/**
 * Fondo animado con Pokéballs flotantes.
 * - CSS puro (@keyframes inline via style)
 * - Opacidad 10-12%
 * - z-index: -1, pointer-events: none
 * - Máximo 15 elementos
 */
export default function AnimatedBackground() {
    const balls = useMemo(() => generateBalls(15), [])

    return (
        <div
            className="fixed inset-0 overflow-hidden"
            style={{ zIndex: -1, pointerEvents: 'none' }}
            aria-hidden="true"
        >
            {/* Definición de keyframes global */}
            <style>{`
        @keyframes pokeball-float {
          0% {
            transform: translateY(0) translateX(0) rotate(var(--rotate-start));
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) translateX(var(--drift)) rotate(calc(var(--rotate-start) + var(--rotate-delta)));
            opacity: 0;
          }
        }
      `}</style>

            {balls.map((ball) => (
                <div
                    key={ball.id}
                    className="absolute text-gray-500 dark:text-gray-400"
                    style={{
                        width: `${ball.size}px`,
                        height: `${ball.size}px`,
                        left: `${ball.left}%`,
                        top: `${ball.startY}%`,
                        opacity: 0.12,
                        '--rotate-start': `${ball.rotate}deg`,
                        '--rotate-delta': `${ball.rotateDelta}deg`,
                        '--drift': `${ball.drift}px`,
                        animation: `pokeball-float ${ball.duration}s ${ball.delay}s linear infinite`,
                        willChange: 'transform, opacity',
                    }}
                >
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="3" />
                        <path d="M2,50 H42" stroke="currentColor" strokeWidth="3" />
                        <path d="M58,50 H98" stroke="currentColor" strokeWidth="3" />
                        <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="3" />
                        <circle cx="50" cy="50" r="5" fill="currentColor" />
                    </svg>
                </div>
            ))}
        </div>
    )
}
