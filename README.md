<div align="center">
  <img src="public/pokecore-logo.png" alt="Pokédex Logo" width="360" />
  
  ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
  ![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
  ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss)
  ![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=reactquery)
  ![Zustand](https://img.shields.io/badge/Zustand-state-8B5CF6)
  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-animations-0055FF?logo=framer)
  
  **Pokédex interactiva** con todos los Pokémon de todas las generaciones · 100% en español
</div>

---

## Características

<table>
<tr>
<td width="50%">

### Selección por región
Elige entre **Kanto, Johto, Hoenn, Sinnoh, Teselia, Kalos, Alola, Galar y Paldea** con los 3 iniciales de cada generación como vista previa.

### Catálogo completo
**1025 Pokémon** con búsqueda instantánea por nombre o número.

### Filtro por tipo
**18 tipos** con colores dinámicos, nombres en español y pills interactivas.

### Favoritos persistentes
Sidebar lateral con tus Pokémon favoritos guardados en `localStorage`.

</td>
<td width="50%">

### Detalle completo
Modal glass con **sprite oficial**, stats animadas, debilidades, habilidades (ocultas visibles), peso/altura, género, flavor text por versión, cadena evolutiva, variantes y movimientos (~600 en español).

### Toggle shiny
Icono pixel-art retro. Cascada de fallback: `official-artwork` → `home` → `front_default`.

### Diseño responsive
Mobile-first con sidebar colapsable, grid fluido (2→3→4 columnas) y tipografía escalable.

### Animaciones suaves
Transiciones entre regiones, evoluciones y modales con **Framer Motion**.

</td>
</tr>
</table>

## Tecnologías
<div align="center">
  
| Tecnología | Uso |
|---|---|
| **React 19** | UI declarativa con hooks |
| **Vite 6** | Build tool ultrarrápido |
| **Tailwind CSS v4** | Estilos utilitarios + tema oscuro |
| **TanStack Query v5** | Caché, prefetch y fetching de datos |
| **Zustand** | Estado global ligero |
| **Framer Motion** | Animaciones fluidas |
| **Lucide React** | Iconografía |
| **PokéAPI** | Datos de Pokémon |

</div>

## Ejecución local

```bash
git clone https://github.com/manzzaano/POKEDEX.git
cd POKEDEX
npm install
npm run dev
```

## Desplegar en GitHub Pages

```bash
npm run deploy
```

> En **Settings → Pages** del repositorio, selecciona la rama `gh-pages` y la carpeta `/ (root)`.

## Estructura del proyecto

```
src/
├── App.jsx                         # Layout: sidebar favs + header + grid + modal
├── main.jsx                        # Entry point
├── index.css                       # Tema oscuro + glows decorativos
│
├── components/
│   ├── HomeScreen.jsx              # Selector visual de región
│   ├── TypeFilter.jsx              # Filtro de tipos (18 botones)
│   └── ui/
│       ├── PokemonCard.jsx         # Tarjeta glass con sprite + fav
│       ├── SpriteImg.jsx           # Imagen con fallback en cascada
│       ├── StatBar.jsx             # Barras de stats animadas
│       ├── TypeBadge.jsx           # Badge de tipo con color dinámico
│       ├── GenderDisplay.jsx       # Indicador ♂ / ♀ / sin género
│       ├── RetroHeart.jsx          # Corazón pixel-art 8×8
│       ├── ShinyIcon.jsx           # Icono shiny pixel-art
│       ├── CleanLogo.jsx           # Logo con procesado canvas
│       └── Skeleton.jsx            # Skeleton loader animado
│
├── features/detail/
│   ├── PokemonDetail.jsx           # Modal completo de detalle
│   ├── EvolutionSection.jsx        # Cadena evolutiva horizontal
│   └── FlavorTextSection.jsx       # Selector de flavor text por versión
│
├── hooks/
│   ├── usePokemons.js              # Fetch paginado con filtro región
│   ├── usePokemonDetail.js         # Fetch detalle individual
│   ├── useFavorites.js             # Persistencia en localStorage
│   └── useTypes.js                 # Lista de tipos desde la API
│
├── services/pokeApi.js             # Cliente HTTP para PokéAPI
├── store/usePokedexStore.js        # Estado global con Zustand
└── data/
    ├── typeChart.js                # Matriz de efectividad 18×18
    ├── moveNames.js                # Traducciones de movimientos
    └── abilityNames.js             # Traducciones de habilidades
```

---

<div align="center">
  <sub>Desarrollado por <strong>Ismael Manzano León</strong> · 1º DAM 2024-25</sub>
</div>
