import {
    fetchPokemons,
    fetchPokemonDetails,
} from "../../../src/store/pokemon/pokemonApi";
import pokemonReducer from "../../../src/store/pokemon/pokemonSlice";
import { configureStore } from "@reduxjs/toolkit";

// Mock del módulo axios
jest.mock("axios");
import axios from "axios";
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Se agrega esta linea de codigo porque jest considera un error el import.meta.VARRIALBLE_ENV
jest.mock("../../../config/config", () => ({
    VITE_URL_POKEAPI: "https://pokeapi.co/api/v2/pokemon",
    VITE_URL_IMG_DEFAULT:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
}));
// Helper para configurar el store de prueba
function setupStore() {
    return configureStore({ reducer: { pokemons: pokemonReducer } });
}
describe("pokemonsSlice con acciones asíncronas", () => {
    beforeEach(() => {
        // Limpia las llamadas anteriores antes de cada prueba
        mockedAxios.get.mockReset();
    });

    it("debe manejar fetchPokemons.fulfilled", async () => {
        const mockPokemons = [
            { name: "Pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
        ];
        mockedAxios.get.mockResolvedValueOnce({
            data: { results: mockPokemons },
        });
        const store = setupStore();

        await store.dispatch(fetchPokemons({ limit: 10, offset: 0 }));

        expect(store.getState().pokemons.list).toEqual(mockPokemons);
        expect(store.getState().pokemons.status).toEqual("succeeded");
    });

    it("debe manejar fetchPokemons.rejected", async () => {
        const errorMessage = "Rejected";
        mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));
        const store = setupStore();

        await store.dispatch(fetchPokemons({ limit: 10, offset: 0 }));

        expect(store.getState().pokemons.status).toEqual("failed");
        expect(store.getState().pokemons.error).toEqual(errorMessage);
    });

    it("debe manejar fetchPokemonDetails.fulfilled", async () => {
        const mockPokemonDetails = {
            name: "Pikachu",
            id: 25,
            types: [{ type: { name: "electric" } }],
        };
        mockedAxios.get.mockResolvedValueOnce({ data: mockPokemonDetails });
        const store = setupStore();

        await store.dispatch(
            fetchPokemonDetails("https://pokeapi.co/api/v2/pokemon/25/")
        );

        expect(store.getState().pokemons.selectedPokemon).toEqual(
            mockPokemonDetails
        );
        expect(store.getState().pokemons.status).toEqual("idle");
    });

    it("debe manejar fetchPokemonDetails.rejected", async () => {
        const errorMessage = "Rejected";
        mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));
        const store = setupStore();

        await store.dispatch(
            fetchPokemonDetails("https://pokeapi.co/api/v2/pokemon/25/")
        );

        expect(store.getState().pokemons.status).toEqual("idle");
        expect(store.getState().pokemons.error).toEqual(null);
    });
});
