import { client } from "../axios";

export const getPokemons = () => client({
    method: "GET",
    url: "/pokemons",
});

export const getPokemonsByName = (name) => client({
    method: "GET",
    url: `/pokemons/${name}`,
});