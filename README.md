# Pokédex — Dark Glassmorphism

Pokédex interactiva con **React 19**, **Vite** y **Tailwind CSS v4**, consumiendo la [PokéAPI](https://pokeapi.co/) con todos los Pokémon de todas las generaciones.

## Características

- **Pantalla de regiones** — Selección visual con los 3 iniciales de cada generación
- **Catálogo completo** — 1025 Pokémon con búsqueda por nombre/número
- **Filtro por tipo** — Pills con los 18 tipos, colores dinámicos y nombres en español
- **Favoritos** — Sidebar lateral con filtro por región, persistencia en localStorage
- **Detalle modal** — Sprite oficial, stats con barras animadas, debilidades, habilidades, peso, altura, sexo, descripción (flavor text), cadena evolutiva horizontal, variantes, movimientos (~600 traducidos al español)
- **Toggle shiny** — Icono pixel-art retro, cascada de fallback official-artwork → home → front_default
- **Idioma español** — Toda la interfaz, tipos, habilidades y movimientos en español
- **Estilo Dark Glassmorphism** — Fondo #050505, backdrop-blur 16px, glows ambientales, tipografía Plus Jakarta Sans
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
| Lucide React | Iconos (Search, ArrowLeft) |
| PokéAPI | Datos de Pokémon |

## Ejecución local

```bash
git clone https://github.com/manzzaano/POKEDEX.git
cd POKEDEX
npm install
npm run dev
```

## Desplegar en GitHub Pages

El proyecto está configurado con `base: '/POKEDEX/'` en producción y scripts `predeploy`/`deploy`.

```bash
npm run deploy
```

Esto genera la build de producción y publica la carpeta `dist/` en la rama `gh-pages`.

> En los ajustes del repositorio en GitHub, ve a **Settings → Pages** y selecciona:
> - **Source**: Deploy from a branch
> - **Branch**: `gh-pages` → `/ (root)`
> - Haz clic en **Save**
>
> La URL será: `https://manzzaano.github.io/POKEDEX/`

## Estructura

```
src/
├── App.jsx                         # Layout: sidebar favs + header + grid + modal
├── main.jsx                        # Entry point (React + QueryClient)
├── index.css                       # Tailwind + glass theme + glows
│
├── components/
│   ├── HomeScreen.jsx              # Pantalla inicial de selección de región
│   ├── TypeFilter.jsx              # Pills de filtro por tipo
│   └── ui/
│       ├── PokemonCard.jsx         # Tarjeta glass con sprite + corazón retro
│       ├── SpriteImg.jsx           # Imagen con cascada de 3 fallbacks
│       ├── StatBar.jsx             # Barras de stats animadas
│       ├── TypeBadge.jsx           # Badge de tipo con colores dinámicos
│       ├── GenderDisplay.jsx       # Iconos ♂/♀ SVG + barra de proporción
│       ├── RetroHeart.jsx          # Corazón pixel-art para favoritos
│       ├── ShinyIcon.jsx           # Icono shiny pixel-art retro
│       ├── CleanLogo.jsx           # Procesador canvas para logo sin fondo
│       └── Skeleton.jsx            # Esqueletos de carga
│
├── features/detail/
│   ├── PokemonDetail.jsx           # Modal completo con todas las secciones
│   ├── EvolutionSection.jsx        # Cadena evolutiva horizontal con hover
│   └── FlavorTextSection.jsx       # Selector de versión para flavor text
│
├── hooks/                          # Custom hooks (TanStack Query)
├── services/pokeApi.js             # Cliente de la PokéAPI
├── store/usePokedexStore.js        # Estado global con Zustand
├── data/                           # Datos estáticos
│   ├── typeChart.js                # Tabla de efectividad 18×18
│   ├── moveNames.js                # ~600 nombres de movimientos en español
│   └── abilityNames.js             # ~270 nombres de habilidades en español
└── utils/sfx.js                    # Sistema de sonidos
```

---

Desarrollado durante prácticas de 1º DAM en **IES Gregorio Prieto**.
