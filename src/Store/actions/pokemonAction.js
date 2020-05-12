import { ADD_POKEMON } from "../constants";

const pokemonAction = (name, pokemon) => ({
    type: ADD_POKEMON,
    name,
    pokemon
});

export default pokemonAction;