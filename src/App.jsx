import { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import PokemonDetail from './features/detail/PokemonDetail'
import FavoritesPanel from './features/favorites/FavoritesPanel'
import AnimatedBackground from './components/ui/AnimatedBackground'
import usePokedexStore from './store/usePokedexStore'

export default function App() {
  const theme = usePokedexStore((s) => s.theme)

  // Aplicar clase dark al html
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Fondo animado con Pokéballs */}
      <AnimatedBackground />

      {/* Sidebar izquierdo – Lista de Pokémon */}
      <Sidebar />

      {/* Contenido principal – Detalle del Pokémon */}
      <main className="ml-72 mr-64 flex-1">
        <PokemonDetail />
      </main>

      {/* Sidebar derecho – Favoritos */}
      <FavoritesPanel />
    </div>
  )
}
