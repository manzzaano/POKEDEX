# Pokédex Dark Glassmorphism — IML

Pokédex interactiva construida con **React 19**, **Vite** y **Tailwind CSS v4**, consumiendo la [PokéAPI](https://pokeapi.co/) para mostrar **todos los Pokémon de todas las generaciones**.

## ✨ Características

- **Catálogo completo** — Todos los Pokémon de todas las generaciones (1000+).
- **Búsqueda en tiempo real** — Filtra por nombre o número.
- **Filtro por tipo** — Pills interactivos con los 18 tipos de Pokémon.
- **Favoritos** — Guarda tus Pokémon favoritos en localStorage.
- **Estilo Dark Glassmorphism** — Efectos de blur, glass y glows ambient.
- **Diseño responsive** — Adaptable a cualquier pantalla.
- **Detalles completos** — Estadísticas, habilidades, movimientos y cadena evolutiva.
- **Virtualización** — Lista optimizada con `react-window` para máximo rendimiento.

## 🚀 Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 | UI declarativa |
| Vite 6 | Build tool |
| Tailwind CSS v4 | Estilos utilitarios |
| TanStack Query v5 | Caché y fetching de datos |
| Zustand | Estado global |
| Framer Motion | Animaciones |
| React Window | Lista virtualizada |
| PokéAPI | Datos de Pokémon |

## ▶️ Ejecución local

```bash
git clone https://github.com/manzzaano/POKEDEX.git
cd POKEDEX
npm install
npm run dev
```

## 🚢 Deploy en GitHub Pages

El proyecto está configurado para desplegar en GitHub Pages con `gh-pages`.

```bash
npm run deploy
```

Esto ejecuta `vite build` (con `base: '/POKEDEX/'`) y publica la carpeta `dist/` en la rama `gh-pages`.

> Asegúrate de que en los ajustes del repo GitHub Pages apunte a la rama `gh-pages` con carpeta `/ (root)`.

## 📁 Estructura

```
src/
├── App.jsx                  # Layout principal dark glassmorphism
├── main.jsx                 # Entry point (React + QueryClient)
├── index.css                # Tailwind + glass-* utilities + tema
│
├── components/
│   ├── SearchBar.jsx        # Barra de búsqueda glass-input
│   ├── TypeFilter.jsx       # Filtro por tipo (pills)
│   ├── Sidebar.jsx          # Panel lateral con lista virtualizada
│   └── ui/
│       ├── PokemonCard.jsx  # Tarjeta glass-card
│       ├── PokemonListItem.jsx
│       ├── TypeBadge.jsx    # Badge dinámico por tipo
│       └── Skeleton.jsx     # Esqueletos de carga
│
├── features/detail/
│   ├── PokemonDetail.jsx    # Contenedor de detalle
│   ├── PokemonHeader.jsx    # Sprite + nombre
│   ├── PokemonTypes.jsx     # Badges de tipos
│   ├── PokemonInfo.jsx      # Peso, altura, habilidades, movimientos
│   ├── PokemonStats.jsx     # Barras de estadísticas
│   └── EvolutionChain.jsx   # Cadena evolutiva
│
├── hooks/                   # Custom hooks (TanStack Query)
├── services/pokeApi.js      # Cliente de la PokéAPI
├── store/usePokedexStore.js # Estado global con Zustand
└── utils/sfx.js             # Sistema de sonidos
```

---

Desarrollado durante prácticas de 1º DAM en **IES Gregorio Prieto**.
