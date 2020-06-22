import { ADD_POKEMON_LIST, USER_TYPE,FETCH_POKEMON_SUCCESS, FETCH_POKEMON_FAILURE, FETCH_POKEMON_START } from "../constants";

export const pokemonListAction = (pokeList, startId, endId) => ({
  type: ADD_POKEMON_LIST,
  pokeList,
  startId,
  endId
});

export const userType = pokeType => ({
  type: USER_TYPE,
  pokeType
});

export const fetchPokemonSuccess = (list, page, pokemonType) => ({
  type: FETCH_POKEMON_SUCCESS,
  list,
  page,
  pokemonType
})

export const fetchPokemonFailure = (error) => ({
  type: FETCH_POKEMON_FAILURE,
  message : error
});


export const fetchPokemonStart = () => ({
type: FETCH_POKEMON_START
});

export const fetchPokemons = (searchParams = location.search) => {
  return async dispatch => {
    let failure = false;
    let pokemonListAux = {};
    let params = new URLSearchParams(searchParams);
    let page = params.get("page") ? params.get("page") : "1"
    let type = params.get("type") ? params.get("type") : "All"
    dispatch(fetchPokemonStart());
    for (let id = 1; id <= 300; id++) {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res => res.json())
        .then(pokemon => {
          pokemonListAux = { ...pokemonListAux, [pokemon.name]: pokemon };
        }).catch(error => {
          dispatch(fetchPokemonFailure(error));
          failure = true
        });
    }
    failure ? null : dispatch(fetchPokemonSuccess(pokemonListAux, page, type));
  }
}
