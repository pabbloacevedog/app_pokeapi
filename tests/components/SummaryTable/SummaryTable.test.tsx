import React from "react";
import { render, screen } from "@testing-library/react";
import { SummaryTable } from "../../../src/components/SummaryTable/SummaryTable";
import '@testing-library/jest-dom/extend-expect';

describe("SummaryTable Component", () => {
    const mockPokemons = [
        { name: "Bulbasaur", url: "http://test.google.com"},
        { name: "Ivysaur", url: "http://test.google.com" },
        { name: "Venusaur" , url: "http://test.google.com"},
        { name: "Charmander", url: "http://test.google.com" },
        { name: "Charmeleon", url: "http://test.google.com" },
        { name: "Charizard", url: "http://test.google.com" },
        { name: "Squirtle", url: "http://test.google.com" },
        { name: "Blastoise", url: "http://test.google.com" },
        { name: "Butterfree", url: "http://test.google.com" },
        { name: "Beedrill", url: "http://test.google.com" },
    ];

    test("renders summary table correctly", () => {
        render(<SummaryTable pokemons={mockPokemons} />);

        // Verifica el título del resumen
        expect(screen.getByText("Resumen de Pokémons por Letra Inicial")).toBeInTheDocument();

        // Verifica la presencia de la tabla
        expect(screen.getByRole("table")).toBeInTheDocument();

        // Verifica las letras iniciales y sus cantidades
        expect(screen.getByText("B")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument(); // Bulbasaur, Blastoise, Beedrill

        expect(screen.getByText("I")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument(); // Ivysaur

        expect(screen.getByText("V")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument(); // Venusaur

        expect(screen.getByText("C")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument(); // Charmander, Charmeleon, Charizard

        expect(screen.getByText("S")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument(); // Squirtle

        expect(screen.getByText("B")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument(); // Butterfree, Beedrill 

    });
});
