import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { PokemonsTable } from "../../../src/components/PokemonsTable/PokemonsTable";
import configureMockStore from "redux-mock-store";
// Se agrega esta linea de codigo porque jest considera un error el import.meta.VARRIALBLE_ENV
jest.mock("../../../config/config", () => ({
    VITE_URL_POKEAPI: "https://pokeapi.co/api/v2/pokemon",
    VITE_URL_IMG_DEFAULT:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
}));

test("Renderiza la tabla sin errores", () => {
    const mockStore = configureMockStore();
    const store = mockStore({
        pokemon: {
            list: [
                {
                    name: "Pikachu",
                    url: "https://pokeapi.co/api/v2/pokemon/25/",
                },
                {
                    name: "Charmander",
                    url: "https://pokeapi.co/api/v2/pokemon/4/",
                },
            ],
            status: "succeeded",
            error: null,
        },
    });
    store.dispatch = jest.fn(); // Mock del dispatch
    const { getByText } = render(
        <Provider store={store}>
            <PokemonsTable />
        </Provider>
    );
    //Revisa que los nombres de los pokemons se rendericen
    expect(getByText("Pikachu")).toBeInTheDocument();
    expect(getByText("Charmander")).toBeInTheDocument();
});
