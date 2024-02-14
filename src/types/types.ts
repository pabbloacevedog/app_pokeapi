export interface Pokemon {
    name: string;
    url: string;
}
export interface PokemonState {
    list: Pokemon[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null | undefined;
    selectedPokemon: PokemonDetails | null;
}
export interface Ability {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export interface Type {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface Sprite {
    front_default: string;
}

export interface PokemonDetails {
    base_experience: number;
    height: number;
    weight: number;
    abilities: Ability[];
    id: number;
    name: string;
    sprites: Sprite;
    types: Type[];
}
export interface IPokemon {
    name: string;
    url: string;
}
