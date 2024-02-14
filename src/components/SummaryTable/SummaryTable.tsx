import React from "react";
import { Pokemon } from "../../types/types";
import "./SummaryTable.css";
//Formato de la props recibida
interface SummaryTableProps {
    pokemons: Pokemon[];
}

export const SummaryTable: React.FC<SummaryTableProps> = ({ pokemons }) => {
    // Calcula la cantidad de pokémons que inician con cada letra
    const summary = pokemons.reduce((acc, pokemon) => {
        const firstLetter = pokemon.name[0].toUpperCase();
        acc[firstLetter] = (acc[firstLetter] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Convierte el objeto de resumen en un array para ordenarlo
    const sortedSummary = Object.keys(summary)
        .sort()
        .map((letter) => ({
            letter,
            count: summary[letter],
        }));

    return (
        <div className="pokemon-summary">
            <h3 className="summary-title">
                Resumen de Pokémons por Letra Inicial
            </h3>
            <table className="summary-table">
                <thead>
                    <tr>
                        <th>Letra</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedSummary.map(({ letter, count }) => (
                        <tr key={letter}>
                            <td>{letter}</td>
                            <td>{count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
