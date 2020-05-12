import React, { useState, useEffect } from "react";

import Alakazam from "../assets/pokemon/alakazam.png";
import Blastoise from "../assets/pokemon/blastoise.png";
import Bulbasaur from "../assets/pokemon/bulbasaur.png";
import Charizard from "../assets/pokemon/charizard.png";
import Flareon from "../assets/pokemon/flareon.png";
import Gengar from "../assets/pokemon/gengar.png";
import Haunter from "../assets/pokemon/haunter.png";
import Pikachu from "../assets/pokemon/pikachu.png";
import Vileplume from "../assets/pokemon/vileplume.png";
import PokeCard from "../Components/PokeCard";

import "../Styles/pokemon.less";

const FetchExercise = () => {
  const pokemonNames = [
    "alakazam",
    "blastoise",
    "bulbasaur",
    "charizard",
    "flareon",
    "gengar",
    "haunter",
    "pikachu",
    "vileplume"
  ];
  const [pokemonList, setPokemonList] = useState({});
  const [isFetchDone, setIsFetchDone] = useState(false);

  const getImage = name => {
    switch (name) {
      case "alakazam":
        return Alakazam;
      case "blastoise":
        return Blastoise;
      case "bulbasaur":
        return Bulbasaur;
      case "charizard":
        return Charizard;
      case "flareon":
        return Flareon;
      case "gengar":
        return Gengar;
      case "haunter":
        return Haunter;
      case "pikachu":
        return Pikachu;
      case "vileplume":
        return Vileplume;
      default:
        return;
    }
  };

  useEffect(() => {
    if (!isFetchDone) {
      let listAux = {};
      Promise.all(
        pokemonNames.map(async pokemonName => {
          await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
            .then(res => res.json())
            .then(pokemon => {
              let pokAbility = pokemon.abilities.find(ab => !ab.is_hidden);
              let pokHiddenAb = pokemon.abilities.find(ab => ab.is_hidden);

              listAux = {
                ...listAux,
                [pokemonName]: {
                  hp: pokemon.stats[5].base_stat,
                  attack: pokemon.stats[4].base_stat,
                  defense: pokemon.stats[3].base_stat,
                  specialAttack: pokemon.stats[2].base_stat,
                  specialDefense: pokemon.stats[1].base_stat,
                  speed: pokemon.stats[0].base_stat,
                  height: pokemon.height,
                  weight: pokemon.weight,
                  type: pokemon.types[pokemon.types.length - 1].type.name,
                  ability: pokAbility ? pokAbility.ability : "--",
                  hiddenAbility: pokHiddenAb ? pokHiddenAb.ability : "--"
                }
              };
            });
        })
      ).then(() => {
        setPokemonList(listAux);
        setIsFetchDone(true);
      });
    }
  }, []);

  if (Object.keys(pokemonList).length === pokemonNames.length) {
    return (
      <>
        <h1>Pokémon Cards</h1>
        {pokemonNames.map((pokemon, index) => (
          <PokeCard
            index={index}
            pokemonInfo={pokemonList[pokemon]}
            imageSrc={getImage(pokemon)}
            name={pokemon}
          />
        ))}
      </>
    );
  } else return null;
};

export default FetchExercise;
