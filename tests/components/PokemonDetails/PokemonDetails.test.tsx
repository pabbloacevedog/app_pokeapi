import { Provider } from 'react-redux';
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { PokemonDetails } from "../../../src/components/PokemonDetails/PokemonDetails";

// Se agrega esta linea de codigo porque jest considera un error el import.meta.VARRIALBLE_ENV
jest.mock("../../../config/config", () => ({
    VITE_URL_IMG_DEFAULT: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/",
}));

const mockStore = configureMockStore();
const store = mockStore({
    pokemon: {
        selectedPokemon: {
            name: "Bulbasaur",
            sprites: {
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            },
            id: 1,
            types: [
                {
                    type: { name: "grass" },
                },
                {
                    type: { name: "poison" },
                },
            ],
            abilities: [
                { ability: { name: "overgrow" }, is_hidden: false },
                { ability: { name: "chlorophyll" }, is_hidden: true },
            ],
            height: 7,
            weight: 69,
            base_experience: 64,
        },
        status: "succeeded",
        error: null,
    },
});

describe("PokemonDetails Component", () => {
    test("Renders Pokemon details correctly", () => {
        render(
            <Provider store={store}>
                <PokemonDetails />
            </Provider>
        );

        // Valida que el componente muestre los detalles del Pokemon seleccionado
        expect(screen.getByText("BULBASAUR")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument(); //ID:
        expect(screen.getByText("grass, poison")).toBeInTheDocument(); //Tipo(s):
        expect(screen.getByText("overgrow, chlorophyll")).toBeInTheDocument(); //Habilidades:
        expect(screen.getByText("0.7 m")).toBeInTheDocument();//Altura:
        expect(screen.getByText("6.9 kg")).toBeInTheDocument();//Peso:
        expect(screen.getByText("64")).toBeInTheDocument(); //Experiencia Base:
        // Valida que la imagen se muestre
        expect(screen.getByRole("img")).toHaveAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png");
    });
});

test("demo", () => {
    expect(true).toBe(true);
});
