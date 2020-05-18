import { pokemonReducer } from "../index";

import navigationAction from "../../actions/navigationAction";
import pokemonAction from "../../actions/pokemonAction";
import { pokemonListAction, userType } from "../../actions/pokemonListAction";

const state = {
  url: { current: null, previous: null },
  list: { startId: null, endId: null, type: "All" },
  pokemonList: {}
};

describe("Gallery reducer tests", () => {
  it("Initial state", () => {
    const initial = state;

    expect(pokemonReducer(undefined, "initial")).toEqual(initial);
  });

  it("Add Pokemon", () => {
    const pokemon = { param1: "param1", param2: "param2" };
    const stateAdd = pokemonReducer(undefined, pokemonAction("nome", pokemon));

    expect(stateAdd).toEqual({
      ...state,
      pokemonList: {
        ...state.pokemonList,
        nome: { param1: "param1", param2: "param2" }
      }
    });
  });

  it("User Navigation", () => {
    const stateNav = pokemonReducer(
      undefined,
      navigationAction("www.google.com")
    );

    expect(stateNav).toEqual({
      ...state,
      url: {
        current: "www.google.com",
        previous: null
      }
    });
  });

  it("Add Pokemon List", () => {
    const stateAddPokemon = pokemonReducer(
      undefined,
      pokemonListAction({}, 1, 10)
    );

    expect(stateAddPokemon).toEqual({
      ...state,
      list: {
        ...state.list,
        startId: 1,
        endId: 10
      }
    });
  });

  it("User Type", () => {
    const stateUser = pokemonReducer(undefined, userType("normal"));

    expect(stateUser).toEqual({
      ...state,
      list: {
        ...state.list,
        type: "normal"
      }
    });
  });
});
