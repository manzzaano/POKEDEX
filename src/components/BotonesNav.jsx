import React from "react";
import "./BotonesNav.css";

export default function BotonesNav({ indicePokemon, setIndicePokemon, pokemonFiltrados }) {

    const cambiarPokemon = (nuevoIndice) => {
        if (nuevoIndice >= 0 && nuevoIndice < pokemonFiltrados.length) {
            setIndicePokemon(nuevoIndice);
        }
    };

    return (
        <div className="pagination-buttons">
            <button
                className="btn-nav"
                onClick={() => cambiarPokemon(indicePokemon - 1)}
                disabled={indicePokemon === 0}
            >
                Anterior
            </button>
            <button
                className="btn-nav"
                onClick={() => cambiarPokemon(indicePokemon + 1)}
                disabled={indicePokemon === pokemonFiltrados.length - 1} 
            >
                Siguiente
            </button>
        </div>
    );
}
