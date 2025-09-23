import React from 'react';
import { useState } from 'react';
import "./Filtros.css"

export default function Filtros({ setTipoSeleccionado, tipoSeleccionado }) {
    const [mostrarSelect, setMostrarSelect] = useState(false);

    const handleCheckboxChange = (e) => {
        setMostrarSelect(e.target.checked);
        if (!e.target.checked) {
            setTipoSeleccionado("");
        }
    };

    const handleSelectChange = (e) => {
        setTipoSeleccionado(e.target.value);
    };

    return (
        <div className="filtro-tipo">
            <div className="checkbox-container">
                <label htmlFor="filtro-tipo">
                    Filtrar por tipo
                </label>
                <input
                    type="checkbox"
                    id="filtro-tipo"
                    checked={mostrarSelect}
                    onChange={handleCheckboxChange}
                />
            </div>

            {mostrarSelect && (
                <select
                    name="tipo"
                    id="tipo"
                    value={tipoSeleccionado}
                    onChange={handleSelectChange}
                >
                    <option value="">Selecciona un tipo</option>
                    <option value="fire">Fuego</option>
                    <option value="water">Agua</option>
                    <option value="grass">Planta</option>
                    <option value="electric">Eléctrico</option>
                    <option value="bug">Bicho</option>
                    <option value="normal">Normal</option>
                    <option value="poison">Veneno</option>
                    <option value="ghost">Fantasma</option>
                    <option value="psychic">Psíquico</option>
                    <option value="fighting">Lucha</option>
                </select>
            )}
        </div>
    );
}

