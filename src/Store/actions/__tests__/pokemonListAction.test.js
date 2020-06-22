import {
  pokemonListAction,
  userType,
  fetchPokemonStart,
  fetchPokemonFailure,
  fetchPokemonSuccess,
  fetchPokemons
} from "../pokemonListAction";
import {
  ADD_POKEMON_LIST,
  USER_TYPE,
  FETCH_POKEMON_SUCCESS,
  FETCH_POKEMON_START,
  FETCH_POKEMON_FAILURE
} from "../../constants";

describe("pokemonListActionTest", () => {
  it("pokemonListAction", () => {
    const pokeList = [];
    const startId = "1";
    const endId = "2";

    expect(pokemonListAction(pokeList, startId, endId)).toEqual({
      type: ADD_POKEMON_LIST,
      pokeList,
      startId,
      endId
    });
  }),
    it("User Type", () => {
      const pokeType = "stone";

      expect(userType(pokeType)).toEqual({
        type: USER_TYPE,
        pokeType
      });
    });

  it("Sucess Fetch", () => {
    const list = {};
    const page = "1";
    const pokemonType = "Fire";
    expect(fetchPokemonSuccess(list, page, pokemonType)).toEqual({
      type: FETCH_POKEMON_SUCCESS,
      list: {},
      page: "1",
      pokemonType: "Fire"
    });
  });

  it("Start Fetch", () => {
    expect(fetchPokemonStart()).toEqual({
      type: FETCH_POKEMON_START
    });
  });

  it("Fetch Failure", () => {
    expect(fetchPokemonFailure("Error")).toEqual({
      type: FETCH_POKEMON_FAILURE,
      message: "Error"
    });
  });
});

describe("fetchPokemons", () => {
  it("success", async () => {
    const mockDispatch = jest.fn();
    function mockFetchPromise() {
      return Promise.resolve({
        json: () => ({
          name: "pikachu"
        })
      });
    }

    window.fetch = jest.fn(() => mockFetchPromise());

    await fetchPokemons()(mockDispatch);
    expect(window.fetch).toHaveBeenCalledTimes(300);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toBeCalledWith(fetchPokemonStart());
    expect(mockDispatch).toHaveBeenLastCalledWith({
      list: { pikachu: { name: "pikachu" } },
      page: "1",
      pokemonType: "All",
      type: FETCH_POKEMON_SUCCESS
    });
  });

  it("failure", async () => {
    const mockDispatch = jest.fn();
    function mockFetchPromise() {
      return Promise.reject("error");
    }

    window.fetch = jest.fn(() => mockFetchPromise());

    await fetchPokemons()(mockDispatch);
    expect(mockDispatch).toBeCalledWith(fetchPokemonStart());
    expect(mockDispatch).toHaveBeenLastCalledWith(fetchPokemonFailure("error"));
  });

  it("query string", async () => {
    const mockDispatch = jest.fn();
    function mockFetchPromise() {
      return Promise.resolve({
        json: () => ({
          name: "pikachu"
        })
      });
    }

    window.fetch = jest.fn(() => mockFetchPromise());

    await fetchPokemons('?type=eletric&page=2')(mockDispatch); 
    expect(mockDispatch).toHaveBeenLastCalledWith({
      list: { pikachu: { name: "pikachu" } },
      type: FETCH_POKEMON_SUCCESS, 
      pokemonType: 'eletric',
      page: '2'
    })
  })
});

    
