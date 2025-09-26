import "./App.css";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import Favoritos from "./components/Favoritos";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [pokemonSelected, setPokemonSelected] = useState({});
  const [pokemonData, setPokemonData] = useState([]);
  const [detallesPokemon, setDetallesPokemon] = useState({});
  const [listFavs, setListFavs] = useState([]);
  const [consultaBusqueda, setConsultaBusqueda] = useState("");
  const [indicePokemon, setIndicePokemon] = useState(0);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");

  // Cargar los 151 Pokémon y sus detallesx
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        const lista = response.data.results.map((pokemon) => ({
          ...pokemon,
          id: pokemon.url.split("/")[6],
        }));
        setPokemonData(lista);
        updatePokemon(lista[0]);

        // Cargar detalles de todos los Pokémon (solo una vez)
        lista.forEach((p) => {
          axios.get(p.url).then((res) => {
            setDetallesPokemon((prev) => ({
              ...prev,
              [p.name]: res.data,
            }));
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    // Leer favoritos
    const favsGuardados = localStorage.getItem("favoritos");
    if (favsGuardados) {
      setListFavs(JSON.parse(favsGuardados));
    }
  }, []);

  const updatePokemon = (pokemon) => {
    axios
      .get(pokemon.url)
      .then((response) => {
        setPokemonSelected(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleClick = (pokemon) => {
    updatePokemon(pokemon);
    const index = pokemonFiltrados.findIndex((p) => p.name === pokemon.name);
    setIndicePokemon(index);
  };

  const marcarDesmarcarFav = (pokemon) => {
    const existe = listFavs.some((p) => p.name === pokemon.name);
    const nuevaLista = existe
      ? listFavs.filter((p) => p.name !== pokemon.name)
      : [...listFavs, pokemon];

    setListFavs(nuevaLista);
    localStorage.setItem("favoritos", JSON.stringify(nuevaLista));
  };

  // Filtrado por nombre y tipo usando detalles cargados previamente
  const pokemonFiltrados = pokemonData.filter((pokemon) => {
    const coincideNombre = pokemon.name
      .toLowerCase()
      .includes(consultaBusqueda.toLowerCase());
    if (!tipoSeleccionado) return coincideNombre;

    const detalles = detallesPokemon[pokemon.name];
    if (!detalles) return false;

    const tipos = detalles.types.map((t) => t.type.name);
    return coincideNombre && tipos.includes(tipoSeleccionado);
  });

  return (
    <div className="app-container">
      <Sidebar
        pokemonSelected={pokemonSelected}
        handleClick={handleClick}
        setConsultaBusqueda={setConsultaBusqueda}
        pokemonFiltrados={pokemonFiltrados}
        tipoSeleccionado={tipoSeleccionado}
        setTipoSeleccionado={setTipoSeleccionado}
        updatePokemon={updatePokemon}
      />
      <Favoritos
        listFavs={listFavs}
        setListFavs={setListFavs}
        pokemonSelected={pokemonSelected}
        handleClick={handleClick}
        marcarDesmarcarFav={marcarDesmarcarFav}
      />
      <div className="main-container">
        <Content
          pokemonSelected={pokemonSelected}
          setPokemonSelected={setPokemonSelected}
          pokemonData={pokemonData}
          marcarDesmarcarFav={marcarDesmarcarFav}
          listFavs={listFavs}
          indicePokemon={indicePokemon}
          setIndicePokemon={setIndicePokemon}
          pokemonFiltrados={pokemonFiltrados}
          detallesPokemon={detallesPokemon}
        />
      </div>
    </div>
  );
}
