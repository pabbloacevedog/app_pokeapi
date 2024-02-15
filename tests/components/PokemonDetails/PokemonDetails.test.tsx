
import { PokemonDetails } from "../../../src/components/PokemonDetails/PokemonDetails";
import React from "react";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import thunk from "redux-thunk";
// Crea el mock del store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock de un pokemon seleccionado
const initialState = {
    pokemon: {
        selectedPokemon: {
            id: 1,
            name: "bulbasaur",
            sprites: {
                front_default: "http://example.com/bulbasaur.png",
            },
            base_experience: 64,
            height: 7,
            weight: 69,
            types: [
                { type: { name: "grass" } },
                { type: { name: "poison" } },
            ],
            abilities: [
                { ability: { name: "overgrow" } },
                { ability: { name: "chlorophyll" } },
            ],
        },
    },
};

describe("PokemonDetails Component", () => {
    let store;

    beforeEach(() => {
        // Configura el store con el estado inicial para cada test
        store = mockStore(initialState);
    });

    test("Muestra el detalle de pokemon cuando se selecciona uno de la tabla", () => {
        render(
            <Provider store={store}>
                <PokemonDetails />
            </Provider>
        );

        expect(screen.getByText("BULBASAUR")).toBeInTheDocument();
        expect(screen.getByText("ID: 1")).toBeInTheDocument();
        expect(screen.getByText("Experiencia Base: 64")).toBeInTheDocument();
        expect(screen.getByText("Altura: 0.7 m")).toBeInTheDocument();
        expect(screen.getByText("Peso: 6.9 kg")).toBeInTheDocument();
        expect(screen.getByText("Tipo(s): grass, poison")).toBeInTheDocument();
        expect(screen.getByText("Habilidades: overgrow, chlorophyll")).toBeInTheDocument();
        expect(screen.getByRole("img", { name: /bulbasaur/i })).toHaveAttribute("src", "http://example.com/bulbasaur.png");
    });

    test("Muestra un mensaje cuando no se selecciona ninguno", () => {
        // Configura el store sin pokemon seleccionado
        const noSelectedPokemonState = {
            ...initialState,
            pokemon: { ...initialState.pokemon, selectedPokemon: null },
        };
        const noPokemonStore = mockStore(noSelectedPokemonState);

        render(
            <Provider store={noPokemonStore}>
                <PokemonDetails />
            </Provider>
        );

        expect(screen.getByText(/Selecciona un Pokémon para ver sus detalles./i)).toBeInTheDocument();
    });
});
