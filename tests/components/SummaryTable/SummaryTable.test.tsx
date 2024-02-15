import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SummaryTable } from "../../../src/components/SummaryTable/SummaryTable";

test("Renders Person component correctly", async () => {
    const mockPokemons = [
        { name: "Bulbasaur", url: "http://test.google.com" },
        { name: "Ivysaur", url: "http://test.google.com" },
        { name: "Venusaur", url: "http://test.google.com" },
        { name: "Charmander", url: "http://test.google.com" },
        { name: "Charmeleon", url: "http://test.google.com" },
        { name: "Charizard", url: "http://test.google.com" },
        { name: "Squirtle", url: "http://test.google.com" },
        { name: "Blastoise", url: "http://test.google.com" },
        { name: "Butterfree", url: "http://test.google.com" },
        { name: "Beedrill", url: "http://test.google.com" },
    ];

    const { getByText } = render(<SummaryTable pokemons={mockPokemons} />);

    expect(document.getElementsByTagName("table").length).toBe(1);

    expect(getByText("B")).toBeInTheDocument();
    expect(getByText("4")).toBeInTheDocument(); // Cuenta los pokemons que empiezan con B

});
