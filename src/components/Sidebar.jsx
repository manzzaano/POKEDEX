import { useEffect } from "react";
import Buscador from "./Buscador";
import Filtros from "./Filtros";
import "./Sidebar.css";

export default function Sidebar({
  pokemonSelected,
  handleClick,
  setConsultaBusqueda,
  pokemonFiltrados,
  tipoSeleccionado,
  setTipoSeleccionado,
  updatePokemon,
}) {
  const actualizarSelFiltrado = () => {
    if (pokemonFiltrados.length > 0 && !pokemonSelected.name) {
      updatePokemon(pokemonFiltrados(0));
    }
  };

  return (
    <aside className="sidebar">
      <h1 className="logo">Pokedex</h1>
      <Buscador setConsultaBusqueda={setConsultaBusqueda} />
      <Filtros
        tipoSeleccionado={tipoSeleccionado}
        setTipoSeleccionado={setTipoSeleccionado}
      />
      <nav>
        <ul>
          {pokemonFiltrados &&
            pokemonFiltrados.length > 0 &&
            pokemonFiltrados.map((pokemon) =>
              pokemon && pokemon.id != null && pokemon.name ? ( // comprobamos que exista y tenga id y name
                <li
                  className={
                    pokemonSelected && pokemon.name === pokemonSelected.name
                      ? "nav-item selected"
                      : "nav-item"
                  }
                  key={pokemon.name}
                  onClick={() => handleClick(pokemon)}
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={pokemon.name}
                    className="pokemon-icon"
                  />
                  <span>{pokemon.name}</span>
                </li>
              ) : null
            )}
        </ul>
      </nav>
    </aside>
  );
}
