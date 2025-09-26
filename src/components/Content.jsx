/* eslint-disable react/prop-types */
import { useEffect } from "react";
import BotonesNav from "./BotonesNav";
import "./Content.css";

export default function Content({
  pokemonSelected,
  setPokemonSelected,
  marcarDesmarcarFav,
  listFavs = [],
  indicePokemon = 0,
  setIndicePokemon,
  pokemonFiltrados = [],
  detallesPokemon = {},
}) {
  const detalles =
    pokemonSelected?.name && detallesPokemon[pokemonSelected.name]
      ? detallesPokemon[pokemonSelected.name]
      : pokemonSelected || {};

  const {
    name,
    id,
    types = [],
    order = 0,
    weight = 0,
    height = 0,
    abilities = [],
    stats = [],
    moves = [],
  } = detalles;

  const isFavorito = name && listFavs.some((p) => p.name === name);

  const addFav = () => {
    if (!name) return;
    marcarDesmarcarFav(detalles);
  };

  useEffect(() => {
    if (pokemonFiltrados.length === 0) return;

    const seleccionado = pokemonFiltrados[indicePokemon];
    if (!seleccionado) return;

    setPokemonSelected(
      detallesPokemon[seleccionado.name] || seleccionado
    );
  }, [indicePokemon, pokemonFiltrados, detallesPokemon, setPokemonSelected]);

  if (!name) return <p>Cargando...</p>;

  return (
    <main className="content">
      <div className="pokemon-card">
        <BotonesNav
          indicePokemon={indicePokemon}
          setIndicePokemon={setIndicePokemon}
          pokemonFiltrados={pokemonFiltrados}
        />
        <h2 className="pokemon-name">
          {name}
          <button
            className={isFavorito ? "star-fav" : "star-empty"}
            onClick={addFav}
          >
            {isFavorito ? "★" : "☆"}
          </button>
        </h2>
        <img
          src={`https://img.pokemondb.net/artwork/${name}.jpg`}
          alt={name}
          className="pokemon-image"
        />
        <p className="pokemon-shiny">
          Shiny
          <br />
          {id != null && (
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`}
              alt={name}
            />
          )}
        </p>
        <p className="pokemon-type">
          Tipo: {types.map((t) => t.type.name).join(", ")}
        </p>
        <p className="pokemon-order">Orden: {order}</p>
        <p className="pokemon-weight">Peso: {weight / 10} kg</p>
        <p className="pokemon-height">Altura: {height / 10} m</p>
        <p className="pokemon-abilities">
          Habilidades: {abilities.map((a) => a.ability.name).join(", ")}
        </p>
        <p className="pokemon-stats">
          Stats: {stats.map((s) => `${s.stat.name}: ${s.base_stat}`).join(", ")}
        </p>
        <p className="pokemon-moves">
          Movimientos: {moves.map((m) => m.move.name).join(", ")}
        </p>
      </div>
    </main>
  );
}
