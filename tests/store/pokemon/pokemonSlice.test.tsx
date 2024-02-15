import { PokemonState } from "../../../src/types/types";
import pokemonReducer from "../../../src/store/pokemon/pokemonSlice";
import { fetchPokemons } from "../../../src/store/pokemon/pokemonApi";
describe("pokemon reducer", () => {
    const initialState: PokemonState = {
        list: [],
        status: "idle",
        error: null,
        selectedPokemon: null,
    };

    it("Test estado incial", () => {
        expect(pokemonReducer(undefined, { type: "unknown" })).toEqual(
            initialState
        );
    });

    test("Test petición api", () => {
        const actual = pokemonReducer(
            initialState,
            fetchPokemons.fulfilled(
                [{ name: "pikachu" }],
                "fetchPokemons",
                { limit: 20, offset: 0 }
            )
        );
        expect(actual.list).toEqual([{ name: "pikachu" }]);
        expect(actual.status).toBe("succeeded");
    });
});
