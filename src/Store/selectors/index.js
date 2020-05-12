import { createSelector } from "reselect";

export const getCurrentPage = (state) => state.url?.current;

export const getPokemonID = createSelector(
    getCurrentPage, 
    page => {
    const url = page;
    if (!url) return null;
    const urlSplitted = url.split("/");
    return urlSplitted[1] === "reduxexercise" ? urlSplitted[2] : null;
});

export const getPokemons = state => state.pokemonList;

export const getPokemonById = createSelector(
    getPokemons,
    getPokemonID,
    (pokemons, id) => {
        const pokemonKey = Object.keys(pokemons).find(pokemon =>
            pokemons[pokemon].id == id)
        return pokemonKey ? pokemons[pokemonKey] : null
    }

);

export const getStartId = state => state.list.startId;

export const getEndId = state => state.list.endId; 

export const getType =  state => state.list.type;

export const getAllPokemonsByType = createSelector(
    getType,
    getPokemons,
    (selectedType, pokemons) => {
        if(selectedType === 'All') return pokemons
        let aux = {}
        Object.keys(pokemons).forEach( pokemonName => {
        if(pokemons[pokemonName].types.find(type => 
            type.type.name.toUpperCase() === selectedType.toUpperCase()
    )){
            aux = {...aux, [pokemonName] : pokemons[pokemonName]}
        }
      })
        return aux;
    }
)

export const getAllPokemonsOnList = createSelector(
    getAllPokemonsByType,
    getStartId, 
    getEndId,
    (pokemonsList, startId, endId) => {
        let aux = {}
        Object.keys(pokemonsList).forEach((pokemonName) => {
            if( pokemonsList[pokemonName].id >= startId && pokemonsList[pokemonName].id <= endId){
                aux = {...aux, [pokemonName]: pokemonsList[pokemonName]}
            } 
        })
        return aux;
    }
)