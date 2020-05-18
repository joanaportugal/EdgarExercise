import pokemonAction from "../pokemonAction";
import { ADD_POKEMON } from "../../constants";

describe("pokemonActionTest", () => {
  it("navigationAction", () => {
    const name = "Pedro";
    const pokemon = {
      id: 10,
      name: "Pedro",
      type: "Fire"
    };

    expect(pokemonAction(name, pokemon)).toEqual({
      type: ADD_POKEMON,
      name: "Pedro",
      pokemon
    });
  });
});
