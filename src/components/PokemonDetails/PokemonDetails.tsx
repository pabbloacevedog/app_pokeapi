import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { getSelectedPokemon } from "../../store/pokemon/pokemonSlice";
import "./PokemonDetails.css";
export const PokemonDetails = () => {
    const selectedPokemon = useAppSelector(getSelectedPokemon); // Almacena los datos del pokemon seleccionado

    if (!selectedPokemon) {
        return (
            <div className="pokemon-details">
                <h3 className="summary-title">
                    Selecciona un Pokémon para ver sus detalles.
                </h3>
            </div>
        );
    }

    return (
        <div className="pokemon-details-card">
            <h1 className="pokemon-name">
                {selectedPokemon.name.toUpperCase()}
            </h1>
            <img
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
                className="pokemon-image"
            />
            <div className="pokemon-info">
                <p>
                    <strong>ID:</strong> {selectedPokemon.id}
                </p>
                <p>
                    <strong>Experiencia Base:</strong>{" "}
                    {selectedPokemon.base_experience}
                </p>
                <p>
                    <strong>Altura:</strong> {selectedPokemon.height / 10} m
                </p>
                <p>
                    <strong>Peso:</strong> {selectedPokemon.weight / 10} kg
                </p>
                <p>
                    <strong>Tipo(s):</strong>{" "}
                    {selectedPokemon.types
                        .map((type) => type.type.name)
                        .join(", ")}
                </p>
                <p>
                    <strong>Habilidades:</strong>{" "}
                    {selectedPokemon.abilities
                        .map(
                            (ability: { ability: { name: string } }) =>
                                ability.ability.name
                        )
                        .join(", ")}
                </p>
            </div>
        </div>
    );
};
