import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface FetchPokemonsArgs {
    limit: number;
    offset: number;
}
// fectch para traer los datos de la lista
export const fetchPokemons = createAsyncThunk(
    "pokemons/fetchPokemons",
    async ({ limit, offset }: FetchPokemonsArgs, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_URL_POKEAPI}`,
                {
                    params: { limit, offset },
                }
            );
            return response.data.results;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue((error as Error).message);
            }
        }
    }
);
//fetch para traer el detalle de cada pokemon
export const fetchPokemonDetails = createAsyncThunk(
    "pokemons/fetchPokemonDetails",
    async (pokemonUrl: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(pokemonUrl);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data);
            } else {
                return rejectWithValue((error as Error).message);
            }
        }
    }
);
