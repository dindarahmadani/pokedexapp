import { client } from "../axios";

export const getPokemons = () => client({
    method: "GET",
    url: "/pokemons",
});

export const getPokemonsByName = (name) => client({
    method: "GET",
    url: `/pokemons/${name}`,
});

export const addPokemonToCollection = (user_id, pokemon_id) => client ({
    method: "POST",
    url: "/pokemons/collection",
    data: {
        user_id: user_id,
        pokemon_id: pokemon_id,
      },

});

