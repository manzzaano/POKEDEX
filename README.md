# Pokédex

Pokédex interactiva con **React 19**, **Vite** y **Tailwind CSS v4**, consumiendo la [PokéAPI](https://pokeapi.co/) con todos los Pokémon de todas las generaciones.

## Características

- **Pantalla de regiones** — Selección visual con los 3 iniciales de cada generación
- **Catálogo completo** — 1025 Pokémon con búsqueda por nombre/número
- **Filtro por tipo** — Pills con los 18 tipos, colores dinámicos y nombres en español
- **Favoritos** — Sidebar lateral con filtro por región, persistencia en localStorage
- **Detalle modal** — Sprite oficial, stats con barras animadas, debilidades, habilidades, peso, altura, sexo, descripción (flavor text), cadena evolutiva horizontal, variantes, movimientos (~600 traducidos al español)
- **Toggle shiny** — Icono pixel-art retro, cascada de fallback official-artwork → home → front_default
- **Idioma español** — Toda la interfaz, tipos, habilidades y movimientos en español
- **Diseño responsive** — Adaptado a móvil, tablet y escritorio con sidebar colapsable
- **Animaciones** — Transiciones suaves entre regiones/evoluciones con Framer Motion

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 | UI declarativa |
| Vite 6 | Build tool |
| Tailwind CSS v4 | Estilos utilitarios |
| TanStack Query v5 | Caché y fetching de datos |
| Zustand | Estado global |
| Framer Motion | Animaciones |
| Lucide React | Iconos |
| PokéAPI | Datos de Pokémon |

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

> En Settings → Pages del repo, selecciona `gh-pages` → `/ (root)`.

## Estructura

```
src/
├── App.jsx                         # Layout: sidebar favs + header + grid + modal
├── main.jsx                        # Entry point
├── index.css                       # Tema + glows
│
├── components/
│   ├── HomeScreen.jsx              # Selector de región
│   ├── TypeFilter.jsx              # Filtro por tipo
│   └── ui/
│       ├── PokemonCard.jsx         # Tarjeta glass con sprite
│       ├── SpriteImg.jsx           # Imagen con fallback en cascada
│       ├── StatBar.jsx             # Barras de stats animadas
│       ├── TypeBadge.jsx           # Badge de tipo
│       ├── GenderDisplay.jsx       # Iconos ♂/♀
│       ├── RetroHeart.jsx          # Corazón pixel-art
│       ├── ShinyIcon.jsx           # Icono shiny pixel-art
│       └── CleanLogo.jsx           # Logo con procesado canvas
│
├── features/detail/
│   ├── PokemonDetail.jsx           # Modal completo
│   ├── EvolutionSection.jsx        # Cadena evolutiva
│   └── FlavorTextSection.jsx       # Selector de flavor text
│
├── hooks/                          # Custom hooks
├── services/pokeApi.js             # Cliente PokéAPI
├── store/usePokedexStore.js        # Estado global
└── data/                           # Datos estáticos
    ├── typeChart.js                # Efectividad 18×18
    ├── moveNames.js                # Movimientos en español
    └── abilityNames.js             # Habilidades en español
```

---

Desarrollado por **Ismael Manzano León**
