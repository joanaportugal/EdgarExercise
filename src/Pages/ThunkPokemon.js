import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  pokemonListAction,
  userType
} from "../Store/actions/pokemonListAction.js";
import { getAllPokemonsOnList } from "../Store/selectors";
import { Card } from "../Components/Card";

import "../Styles/pokemonFilter.less";

const ThunkPokemon = ({ startId, endId }) => {
  const dispatch = useDispatch();
  const pokemonList = useSelector(getAllPokemonsOnList);
  const typeList = [
    "All",
    "Normal",
    "Poison",
    "Electric",
    "Fire",
    "Water",
    "Rock",
    "Grass",
    "Fighting",
    "Psychic",
    "Ground",
    "Fairy"
  ];

  function getType(type, pokemonName) {
    switch (type) {
      case "speed":
        return pokemonList[pokemonName]?.stats[0]?.base_stat;
      case "specialDefense":
        return pokemonList[pokemonName]?.stats[1]?.base_stat;
      case "specialAttack":
        return pokemonList[pokemonName]?.stats[2]?.base_stat;
      case "defense":
        return pokemonList[pokemonName]?.stats[3]?.base_stat;
      case "attack":
        return pokemonList[pokemonName]?.stats[4]?.base_stat;
      case "hp":
        return pokemonList[pokemonName]?.stats[5]?.base_stat;
      case "weight":
        return pokemonList[pokemonName]?.weight;
      case "height":
        return pokemonList[pokemonName]?.height;
      case "type":
        return pokemonList[pokemonName]?.types[
          pokemonList[pokemonName]?.types.length - 1
        ]?.type?.name;
      default:
        return;
    }
  }

  function getAvailabity(type, pokemonName) {
    const ability = pokemonList[pokemonName]?.abilities?.find(
      ability =>
        (type == "Normal" && !ability.is_hidden) ||
        (type == "Hidden" && ability.is_hidden)
    );
    return ability?.ability?.name;
  }

  useEffect(() => {
    if (Object.keys(pokemonList).length !== 0) return;
    fetchPokemon(startId, endId);
  });

  return (
    <>
      <ul>
        {typeList.map((type, index) => (
          <li
            data-testid="option"
            key={index}
            onClick={() => dispatch(userType(type))}
          >
            {type}
          </li>
        ))}
      </ul>
      <div className="pokemonFilterList">
        {Object.keys(pokemonList).length !== 0 &&
          Object.keys(pokemonList).map((pokemon, index) => (
            <Card
              callbackAbility={() => null}
              key={index}
              info={{
                hp: getType("hp", pokemon),
                attack: getType("attack", pokemon),
                specialDefense: getType("specialDefense", pokemon),
                defense: getType("defense", pokemon),
                specialAttack: getType("specialAttack", pokemon),
                speed: getType("speed", pokemon),
                height: getType("height", pokemon),
                weight: getType("weight", pokemon),
                type: getType("type", pokemon)
              }}
              ability={{
                normal: getAvailabity("Normal", pokemon),
                hidden: getAvailabity("Hidden", pokemon)
              }}
              imageSrc={pokemonList[pokemon]?.sprites?.front_default}
              name={pokemon}
            />
          ))}
      </div>
    </>
  );
};

export default ThunkPokemon;
