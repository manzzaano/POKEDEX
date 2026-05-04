/**
 * Sistema de efectos de sonido (SFX) para la UI.
 *
 * Para activar los sonidos, simplemente asigna la ruta de tu archivo
 * .mp3 o .wav a cada constante correspondiente.
 * Ejemplo: export const SFX_HOVER = '/sounds/hover.mp3'
 */

// ─── Rutas de archivos de sonido (rellena con tus archivos) ───
export const SFX_HOVER = ''   // Sonido al pasar el ratón sobre un elemento
export const SFX_CLICK = ''   // Sonido al hacer clic en un elemento
export const SFX_SCAN = ''   // Sonido del escaneo láser holográfico
export const SFX_OPEN = ''   // Sonido al abrir/seleccionar un Pokémon
export const SFX_BEEP = ''   // Bip genérico de interfaz

// ─── Volumen global (0.0 a 1.0) ───
const SFX_VOLUME = 0.3

/**
 * Reproduce un efecto de sonido.
 * Si la ruta está vacía, no hace nada (fail-safe).
 * @param {string} src - Ruta del archivo de audio
 * @param {number} [volume] - Volumen opcional (0.0 - 1.0)
 */
export function playSfx(src, volume = SFX_VOLUME) {
    if (!src) return
    try {
        const audio = new Audio(src)
        audio.volume = volume
        audio.play().catch(() => {
            // Silenciar errores de autoplay del navegador
        })
    } catch {
        // Fail-safe: nunca romper la UI por un sonido
    }
}
