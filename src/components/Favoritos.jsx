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
    }

    return (
        <aside className="sidebar-favs">
            <h1 className="logo">Favoritos ★</h1>
            <nav>
                {listFavs.length > 0 ? (
                <button className="btn-clear-list" type="button" onClick={limpiarFavs}>Limpiar lista de favoritos</button>
                ) : ""}
                <ul>
                    {
                        (listFavs.length > 0)
                            ? listFavs.map((pokemon) =>
                            (
                                <li
                                    className={
                                        pokemon.name === pokemonSelected.name
                                            ? "nav-item-fav selected"
                                            : "nav-item-fav"
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
                                    <button
                                        className="btn-remove-fav"
                                        onClick={() => marcarDesmarcarFav(pokemon)}
                                    >
                                        ✕
                                    </button>
                                </li>
                            )
                            )
                            : <p className="p-message">No hay ningun pokemon marcado como favorito...</p>
                    }
                </ul>
            </nav>
        </aside>
    );
}