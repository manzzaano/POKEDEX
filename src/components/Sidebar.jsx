/* eslint-disable react/prop-types */
import Buscador from "./Buscador";
import Filtros from "./Filtros";
import "./Sidebar.css";

export default function Sidebar({
  pokemonSelected,
  handleClick,
  setConsultaBusqueda,
  pokemonFiltrados,
  tipoSeleccionado,
  setTipoSeleccionado
}) {

  return (
    <aside className="sidebar">
      <h1 className="logo">Pokedex</h1>
      <Buscador setConsultaBusqueda={setConsultaBusqueda} />
      <Filtros tipoSeleccionado={tipoSeleccionado}
        setTipoSeleccionado={setTipoSeleccionado} />
      <nav>
        <ul>
          {pokemonFiltrados.map((pokemon) => (
            <li
              className={
                pokemon.name === pokemonSelected.name
                  ? "nav-item selected"
                  : "nav-item"
              }
              key={pokemon.name}
              label={pokemon.name}
              onClick={() => handleClick(pokemon)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
                className="pokemon-icon"
              />
              <span>{pokemon.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}