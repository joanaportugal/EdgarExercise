import {
  getPokemonID,
  getAllPokemonsByType,
  getPokemonById,
  getAllPokemonsOnList
} from "../index";

const initialState = {
  pokemonList: {
    pikachu: {
      id: 15,
      types: [{ type: { name: "electric" } }]
    },
    bulbasaur: {
      id: 40,
      types: [{ type: { name: "leaf" } }, { type: { name: "normal" } }]
    },
    charizard: {
      id: 60,
      types: [{ type: { name: "fire" } }, { type: { name: "normal" } }]
    }
  },
  url: {
    current: "/reduxexercise/15"
  },
  list: {
    start: 10,
    end: 40,
    type: "All"
  }
};

describe("getPokemonId", () => {
  const url = initialState.url.current;
  it("returns 15", () => {
    expect(getPokemonID(initialState)).toEqual("15");
  });

  it("return 40", () => {
    const state = {
      ...initialState,
      url: {
        current: "/reduxexercise/40"
      }
    };
    expect(getPokemonID(state)).toEqual("40");
  });
});

describe("getPokemonById", () => {
  it("returns Pikachu", () => {
    expect(getPokemonById(initialState)).toEqual(
      initialState.pokemonList.pikachu
    );
  });

  it("returns Charizard", () => {
    const state = {
      ...initialState,
      url: {
        current: "/reduxexercise/60"
      }
    };
    expect(getPokemonById(state)).toEqual(initialState.pokemonList.charizard);
  });
});

describe("getAllPokemonsByType", () => {
  it("typeAll", () => {
    const state = initialState;
    const list = initialState.pokemonList;

    expect(getAllPokemonsByType(state)).toEqual(list);
  });

  it("typeFire", () => {
    const state = {
      ...initialState,
      list: {
        type: "Fire"
      }
    };
    const list = initialState.pokemonList.charizard;

    expect(getAllPokemonsByType(state)).toEqual({ charizard: list });
  });
});

describe("getAllPokemonsOnList", () => {
  it("returns 2 pokemons", () => {
    const state = {
      ...initialState,
      list: {
        startId: 10,
        endId: 40,
        type: "All"
      }
    };

    expect(Object.keys(getAllPokemonsOnList(state)).length).toBe(2);
  });

  it("returns all pokemons", () => {
    const state = {
      ...initialState,
      list: {
        startId: 15,
        endId: 60,
        type: "All"
      }
    };

    expect(Object.keys(getAllPokemonsOnList(state)).length).toBe(
      Object.keys(state.pokemonList).length
    );
  });
});
