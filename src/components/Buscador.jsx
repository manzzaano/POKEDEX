import { useState } from "react";
import "./Buscador.css";

export default function Buscador({ setConsultaBusqueda }) {
    const [consulta, setConsulta] = useState("");

    const manejarCambio = (e) => {
        setConsulta(e.target.value);
        setConsultaBusqueda(e.target.value);
    };

    return (
        <div className="buscador-container">
            <input
                type="text"
                className="search-input"
                placeholder="Buscar Pokémon..."
                value={consulta}
                onChange={manejarCambio}
            />
        </div>
    );
}
