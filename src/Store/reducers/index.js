import { ADD_POKEMON, USER_NAVIGATION, ADD_POKEMON_LIST, USER_TYPE } from "../constants";

const initialState = {
    url: { current: null, previous: null },
    list: { startId: null, endId: null, type: 'All' },
    pokemonList: {}
};

export function pokemonReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POKEMON:
            return {
                ...state,
                pokemonList: {...state.pokemonList, [action.name]: action.pokemon }
            };
        case USER_NAVIGATION:
            return {
                ...state,
                url: {
                    current: action.url,
                    previous: state.url.current
                }
            };
        case ADD_POKEMON_LIST:
            return {
                ...state,
                list: {
                    ...state.list,
                    startId: action.startId,
                    endId: action.endId,
                },
                pokemonList: {
                    ...state.pokemonList,
                    ...action.pokeList
                }
            }
        case USER_TYPE:
            return {
                ...state,
                list: {
                    ...state.list,
                    type: action.pokeType
                }
            }
        default:
            return state;
    }
}