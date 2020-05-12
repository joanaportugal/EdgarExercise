import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPokemonById, getPokemonID, getCurrentPage } from "../Store/selectors";
import PokeCard from "../Components/PokeCard";
import pokemonAction from "../Store/actions/pokemonAction";
import navigationAction from "../Store/actions/navigationAction";
import {Link} from "react-router-dom";

const ReduxExercise = (props) => {
    const {pokemonInfo, addPokemon, id, currentUrl, navigate} = props;

    const urlBuilder = (type) => {
      let auxid = parseInt(id)
        switch (type) {
          case "previous": {
            if (auxid === 1) auxid = 2;
            return  `/reduxexercise/${auxid - 1}`;
          }
          case "next":
            return `/reduxexercise/${auxid + 1}`;
        }
      }; 


    function getType(type) {
        if (!Object.keys(pokemonInfo).length) return;
        switch (type) {
          case "speed":
            return pokemonInfo?.stats[0]?.base_stat;
          case "specialDefense":
            return pokemonInfo?.stats[1]?.base_stat;
          case "specialAttack":
            return pokemonInfo?.stats[2]?.base_stat;
          case "defense":
            return pokemonInfo?.stats[3]?.base_stat;
          case "attack":
            return pokemonInfo?.stats[4]?.base_stat;
          case "hp":
            return pokemonInfo?.stats[5]?.base_stat;
          case "weight":
            return pokemonInfo?.weight;
          case "height":
            return pokemonInfo?.height;
          case "type":
            return pokemonInfo?.types[pokemonInfo?.types.length - 1]?.type?.name;
          default:
            return;
        }
      }

      function getAvailabity(type) {
        const ability = pokemonInfo?.abilities?.find(
          ability =>
            (type == "Normal" && !ability.is_hidden) ||
            (type == "Hidden" && ability.is_hidden)
        );
    
        return ability?.ability;
      }

    useEffect(() => {
      if(!currentUrl) navigate(window.location.pathname);
        if(pokemonInfo) return;

        fetchPokemon();

    }, [pokemonInfo, currentUrl]);
    

    function fetchPokemon(){
      if(id){
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => res.json())
            .then(pokemon => {
                addPokemon(pokemon.name, {...pokemon})
            });
          }
    }

    if(pokemonInfo){
   return ( 
    <>
        <h1> Redux Pokemon Exercise </h1> 
        <PokeCard
        name = { pokemonInfo.name }
        pokemonInfo={{
            speed: getType("speed"),
            specialDefense: getType("specialDefense"),
            specialAttack: getType("specialAttack"),
            defense: getType("defense"),
            weight: getType("weight"),
            height: getType("height"),
            type: getType("type"),
            
            attack: getType("attack"),
            hp: getType("hp"),
            ability: getAvailabity("Normal"),
            hiddenAbility: getAvailabity("Hidden")
          }}
        imageSrc = { pokemonInfo?.sprites?.front_default  }/>
        <button><Link to={urlBuilder('previous')} onClick={()=>navigate(urlBuilder('previous'))}>Previous</Link></button>
        <button><Link to={urlBuilder('next')} onClick={()=>navigate(urlBuilder('next'))}>Next</Link></button>
    </>
    );
        }
        else return null
};

const mapStateToProps = state => {
    return { pokemonInfo: getPokemonById(state), id: getPokemonID(state), currentUrl: getCurrentPage(state) };
};
const mapDispatchToProps = dispatch => {
    return {
    addPokemon:(name, pokemon) => dispatch(pokemonAction(name, pokemon)),
    navigate: (url) => dispatch(navigationAction(url))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxExercise);
