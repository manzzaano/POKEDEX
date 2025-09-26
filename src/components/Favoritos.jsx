import "./Favoritos.css";

export default function Favoritos({
  listFavs,
  setListFavs,
  pokemonSelected,
  handleClick,
  marcarDesmarcarFav,
}) {
  //Limpiar lista de favoritos
  const limpiarFavs = () => {
    setListFavs([]);
    localStorage.setItem("favoritos", JSON.stringify([]));
  };

  return (
    <aside className="sidebar-favs">
      <h1 className="logo">Favoritos ★</h1>
      <nav>
        {listFavs.length > 0 ? (
          <button
            className="btn-clear-list"
            type="button"
            onClick={limpiarFavs}
          >
            Limpiar lista de favoritos
          </button>
        ) : (
          ""
        )}
        <ul>
          {listFavs && listFavs.length > 0 ? (
            listFavs.map(
              (pokemon) =>
                pokemon &&
                pokemon.id != null &&
                pokemon.name && (
                  <li
                    className={
                      pokemonSelected && pokemon.name === pokemonSelected.name
                        ? "nav-item-fav selected"
                        : "nav-item-fav"
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
                    <button
                      className="btn-remove-fav"
                      onClick={(e) => {
                        e.stopPropagation(); // evita que se dispare el handleClick del li
                        marcarDesmarcarFav(pokemon);
                      }}
                    >
                      ✕
                    </button>
                  </li>
                )
            )
          ) : (
            <p className="p-message">
              No hay ningún Pokémon marcado como favorito...
            </p>
          )}
        </ul>
      </nav>
    </aside>
  );
}
