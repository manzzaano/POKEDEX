/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import BotonesNav from "./BotonesNav";
import "./Content.css";

export default function Content({
  pokemonSelected,
  setPokemonSelected,
  pokemonData,
  marcarDesmarcarFav,
  listFavs,
  indicePokemon,
  setIndicePokemon,
  pokemonFiltrados
}) {
  const isFavorito = listFavs.some((p) => p.name === pokemonSelected.name);

  //Añadir objeto pokemon a la lista
  const addFav = (pokemon) => {
    pokemonData.forEach(p => {
      if (p.name === pokemon.name) {
        marcarDesmarcarFav(p);
      }
    });
  }

  useEffect(() => {
    if (pokemonFiltrados.length > 0) {
      setPokemonSelected(pokemonFiltrados[indicePokemon]);
    }
  }, [indicePokemon, pokemonFiltrados, setPokemonSelected]);

  return (
    <main className="content">
      {pokemonSelected ? (
        <div className="pokemon-card">
          <BotonesNav
            indicePokemon={indicePokemon}
            setIndicePokemon={setIndicePokemon}
            pokemonFiltrados={pokemonFiltrados}
          />
          <h2 className="pokemon-name">
            {pokemonSelected.name}
            <button
              className={isFavorito ? "star-fav" : "star-empty"}
              onClick={() => addFav(pokemonSelected)}
            >
              {isFavorito ? "★" : "☆"}
            </button>
          </h2>
          <img
            src={`https://img.pokemondb.net/artwork/${pokemonSelected.name}.jpg`}
            alt={pokemonSelected.name}
            className="pokemon-image"
          />
          <p className="pokemon-shiny">
            Shiny
            <br />
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonSelected.id}.png`}
              alt={pokemonSelected.name}
            />
          </p>
          <p className="pokemon-type">
            Tipo:{" "}
            {Array.isArray(pokemonSelected.types)
              ? pokemonSelected.types.map((t) => t.type.name).join(", ")
              : ""}
          </p>
          <p className="pokemon-height">
            Orden: {pokemonSelected.order}
          </p>
          <p className="pokemon-weight">
            Peso: {pokemonSelected.weight / 10} kg
          </p>

          <p className="pokemon-height">
            Altura: {pokemonSelected.height / 10} m
          </p>
          <p className="pokemon-abilities">
            Habilidades:
            {Array.isArray(pokemonSelected.abilities)
              ? pokemonSelected.abilities.map((a) => a.ability.name).join(", ")
              : ""}
          </p>
          <p className="pokemon-stats">
            Stats:
            {Array.isArray(pokemonSelected.stats)
              ? pokemonSelected.stats
                .map((s) => `${s.stat.name}: ${s.base_stat}`)
                .join(", ")
              : ""}
          </p>
          <p className="pokemon-moves">
            Movimientos:
            {Array.isArray(pokemonSelected.stats)
              ? pokemonSelected.moves?.map((m) => m.move.name).join(", ")
              : ""}
          </p>
        </div>
      ) : (
        "Cargando..."
      )}
    </main>
  );
}