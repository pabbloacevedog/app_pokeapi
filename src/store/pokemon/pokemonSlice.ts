import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemons, fetchPokemonDetails } from './pokemonApi';
import { RootState } from "../store";
import { PokemonState } from "../../types/types";
const initialState: PokemonState = {
    list: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    selectedPokemon: null,
};

const pokemonsSlice = createSlice({
    name: "pokemons",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload; // Almacena los datos de la tabla
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
                state.selectedPokemon = action.payload; // Almacenar los detalles del Pokémon seleccionado
            });
    },
});

export const selectAllPokemons = (state: RootState) => state.pokemon.list;
export const getPokemonsStatus = (state: RootState) => state.pokemon.status;
export const getSelectedPokemon = (state: RootState) => state.pokemon.selectedPokemon;

export default pokemonsSlice.reducer;
