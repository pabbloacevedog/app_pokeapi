import { fetchPokemonDetails, fetchPokemons } from "../../../src/store/pokemon/pokemonApi";
import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../../../src/store/pokemon/pokemonSlice";
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('pokemonApi', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                pokemon: pokemonReducer,
            },
        });
    });

    test('fetchPokemons envía la acción si funciona correctamente', async () => {
        const mockPokemons = [{ name: 'bulbasaur' }, { name: 'charmander' }];
        mockedAxios.get.mockResolvedValue({ data: { results: mockPokemons } });

        await store.dispatch(fetchPokemons({ limit: 10, offset: 0 }));

        const state = store.getState().pokemon;
        expect(state.entities).toEqual(mockPokemons);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.VITE_URL_POKEAPI}`, { params: { limit: 10, offset: 0 } });
    });

    test('fetchPokemonDetails envía la acción si funciona correctamente', async () => {
        const mockPokemonDetails = { name: 'bulbasaur', height: 7, weight: 69 };
        mockedAxios.get.mockResolvedValue({ data: mockPokemonDetails });

        await store.dispatch(fetchPokemonDetails('https://pokeapi.co/api/v2/pokemon/1'));

        const state = store.getState().pokemon;
        
        expect(state.details).toEqual(mockPokemonDetails);
        expect(mockedAxios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1');
    });
});
