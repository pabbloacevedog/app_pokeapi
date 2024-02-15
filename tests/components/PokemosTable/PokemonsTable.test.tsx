import React from "react";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { PokemonsTable } from "../../../src/components/PokemonsTable/PokemonsTable";
import { fetchPokemons } from "../../../src/store/pokemon/pokemonApi";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("PokemonsTable Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            pokemon: {
                list: [],
                status: 'idle',
                error: null,
            },
        });
        store.dispatch = jest.fn(); // Mock del dispatch 
    });

    test("Hace la petición para la lista de pokemons", () => {
        render(
            <Provider store={store}>
                <PokemonsTable />
            </Provider>
        );

        // Verificar si fetchPokemons ha sido despachada
        expect(store.dispatch).toHaveBeenCalledWith(fetchPokemons({ limit: 20, offset: 0 }));
    });

    test("Renderriza la tabbla sin erroers", () => {
        render(
            <Provider store={store}>
                <PokemonsTable />
            </Provider>
        );

        expect(screen.getByRole("table")).toBeInTheDocument();
    });
});
