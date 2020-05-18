import { pokemonListAction, userType } from "../pokemonListAction";

describe("pokemonListActionTest", () => {
  it("pokemonListAction", () => {
    const pokeList = [];
    const startId = "1";
    const endId = "2";

    expect(pokemonListAction(pokeList, startId, endId)).toEqual({
      type: "ADD_POKEMON_LIST",
      pokeList,
      startId,
      endId
    });
  }),
    it("User Type", () => {
      const pokeType = "stone";

      expect(userType(pokeType)).toEqual({
        type: "USER_TYPE",
        pokeType
      });
    });
});
