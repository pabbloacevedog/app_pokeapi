// src/pages/PrincipalPage.tsx
import React from "react";
import { PokemonsTable } from "../components/PokemonsTable/PokemonsTable";
import { PokemonDetails } from "../components/PokemonDetails/PokemonDetails";
import { SummaryTable } from "../components/SummaryTable/SummaryTable";
import { useAppSelector } from "../hooks/reduxHooks";
import "./PrincipalPage.css";
export const PrincipalPage = () => {
    const pokemons = useAppSelector((state) => state.pokemon.list);
    return (
        <div className="principal-page">
            <PokemonsTable />
            <div className="container-details">
                <PokemonDetails />
                <SummaryTable pokemons={pokemons} />
            </div>
        </div>
    );
};
