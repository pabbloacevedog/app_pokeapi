import React, { useState, useEffect, ChangeEvent } from "react";
import {
    selectAllPokemons,
    getPokemonsStatus,
} from "../../store/pokemon/pokemonSlice";
import { fetchPokemonDetails } from "../../store/pokemon/pokemonApi";
import { fetchPokemons } from "../../store/pokemon/pokemonApi";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import "./PokemonsTable.css";
import { VITE_URL_IMG_DEFAULT } from '../../../config/config.js';
export const PokemonsTable = () => {
    const dispatch = useAppDispatch(); // hooks personalizado para hacer llamadas a la Api de pokeapi
    const allPokemons = useAppSelector(selectAllPokemons); // almacena la lista de pokemons
    const status = useAppSelector(getPokemonsStatus); // almacena el estado de la llamada
    const [itemsPerPage, setItemsPerPage] = useState<number>(20); // state para el numero de filas por pagina
    const [currentPage, setCurrentPage] = useState<number>(1); // state para la pagina actual
    const [selectedPokemonUrl, setSelectedPokemonUrl] = useState(""); // state para el pokemon seleccionado
    const [search, setSearch] = useState(""); // Estado para la búsqueda
    const [filteredPokemons, setFilteredPokemons] = useState(allPokemons); // state que contiene la lista para realizar la busqueda
    const [initialLoad, setInitialLoad] = useState<boolean>(true); // bandera para evitar más de una llamada al montar el componente

    // useEfffect para prevenir la ejecución en el montaje inicial del componente
    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
            return;
        }
        const offset = (currentPage - 1) * itemsPerPage;
        console.log("LLamada a la api cuando se cambia el número de filas por pagina", {
            itemsPerPage,
            currentPage,
        });
        dispatch(fetchPokemons({ limit: itemsPerPage, offset }));
    }, [currentPage, itemsPerPage, dispatch]);

    // useEffect que maneja la carga inicial de datos separadamente
    useEffect(() => {
        if (!initialLoad) {
            const offset = (currentPage - 1) * itemsPerPage;
            console.log("LLamada inicial");
            dispatch(fetchPokemons({ limit: itemsPerPage, offset }));
            setInitialLoad(true);
        }
    }, [initialLoad]);

    // useEffect para cargar los detalles del pokemon seleccionado
    useEffect(() => {
        if (selectedPokemonUrl) {
            dispatch(fetchPokemonDetails(selectedPokemonUrl));
        }
    }, [selectedPokemonUrl, dispatch]);
    const handleRowClick = (pokemonUrl: string) => {
        setSelectedPokemonUrl(pokemonUrl);
    };
    // useEffect para filtrar los pokémons cuando el valor de búsqueda cambia
    useEffect(() => {
        if (search) {
            const lowercasedSearch = search.toLowerCase();
            const filtered = allPokemons.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(lowercasedSearch)
            );
            setFilteredPokemons(filtered);
        } else {
            setFilteredPokemons(allPokemons); // Si no hay búsqueda, mostrar todos
        }
    }, [search, allPokemons]);

    // Función para setear los datos del input
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };
    // Función para extraer el ID del Pokémon de la URL para luego cargar la imagen
    const extractPokemonIdFromUrl = (url: string) => {
        const idPattern = /\/pokemon\/(\d+)\/?$/;
        const match = url.match(idPattern);
        return match ? match[1] : "N/A";
    };
    const handleItemsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setItemsPerPage(Number(event.target.value));
    };
    // URL base para las imágenes de los Pokémon desde las variables de entorno
    const baseUrlForImages = VITE_URL_IMG_DEFAULT;

    return (
        <div className="pokemons-container">
            <div className="table-controls">
                <input
                    type="text"
                    placeholder="Buscar Pokémon..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <h2 className="table-title">Lista de Pokémons</h2>
                <div>
                    <select
                        value={itemsPerPage.toString()}
                        onChange={handleItemsPerPageChange}
                        className="search-input"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    {/* Aquí iría el resto de tu componente, como la tabla de Pokémon */}
                </div>
                <div className="pagination-controls">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span>{currentPage}</span>
                    <button onClick={() => setCurrentPage((prev) => prev + 1)}>
                        Siguiente
                    </button>
                </div>
            </div>
            {status === "loading" && <div>Loading...</div>}
            {status === "succeeded" && (
                <table className="pokemons-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPokemons.map((pokemon) => (
                            <tr
                                key={pokemon.name}
                                onClick={() => handleRowClick(pokemon.url)}
                                className={
                                    selectedPokemonUrl === pokemon.url
                                        ? "selected-row"
                                        : ""
                                }
                            >
                                <td>{extractPokemonIdFromUrl(pokemon.url)}</td>
                                <td>{pokemon.name}</td>
                                <td className="pokemon-img">
                                    <img
                                        src={`${baseUrlForImages}${extractPokemonIdFromUrl(
                                            pokemon.url
                                        )}.png`}
                                        alt={pokemon.name}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {status === "failed" && <div>Error loading pokémons</div>}
        </div>
    );
};
