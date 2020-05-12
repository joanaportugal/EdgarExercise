import { ADD_POKEMON_LIST, USER_TYPE } from "../constants";

export const pokemonListAction = (pokeList, startId, endId) => ({
    type: ADD_POKEMON_LIST,
    pokeList,
    startId,
    endId
});

export const userType = (pokeType) => ({
    type: USER_TYPE,
    pokeType
});