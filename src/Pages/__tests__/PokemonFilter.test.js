import PokemonFilter from "../PokemonFilter";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import { createStoreWithInitialState } from "../../Store/store";
import * as actions from "../../Store/actions/pokemonListAction";

jest.spyOn(actions, "userType");

const state = {
  pokemonList: {
    pikachu: {
      id: 15,
      types: [{ type: { name: "electric" } }],
      stats: [
        {
          base_stat: 90,
          effort: 2,
          stat: {
            name: "speed",
            url: "https://pokeapi.co/api/v2/stat/6/"
          }
        },
        {
          base_stat: 50,
          effort: 0,
          stat: {
            name: "special-defense",
            url: "https://pokeapi.co/api/v2/stat/5/"
          }
        },
        {
          base_stat: 50,
          effort: 0,
          stat: {
            name: "special-attack",
            url: "https://pokeapi.co/api/v2/stat/4/"
          }
        },
        {
          base_stat: 40,
          effort: 0,
          stat: {
            name: "defense",
            url: "https://pokeapi.co/api/v2/stat/3/"
          }
        },
        {
          base_stat: 55,
          effort: 0,
          stat: {
            name: "attack",
            url: "https://pokeapi.co/api/v2/stat/2/"
          }
        },
        {
          base_stat: 35,
          effort: 0,
          stat: {
            name: "hp",
            url: "https://pokeapi.co/api/v2/stat/1/"
          }
        }
      ]
    },
    charizard: {
      id: 60,
      types: [{ type: { name: "fire" } }],
      stats: [
        {
          base_stat: 90,
          effort: 2,
          stat: {
            name: "speed",
            url: "https://pokeapi.co/api/v2/stat/6/"
          }
        },
        {
          base_stat: 50,
          effort: 0,
          stat: {
            name: "special-defense",
            url: "https://pokeapi.co/api/v2/stat/5/"
          }
        },
        {
          base_stat: 50,
          effort: 0,
          stat: {
            name: "special-attack",
            url: "https://pokeapi.co/api/v2/stat/4/"
          }
        },
        {
          base_stat: 40,
          effort: 0,
          stat: {
            name: "defense",
            url: "https://pokeapi.co/api/v2/stat/3/"
          }
        },
        {
          base_stat: 55,
          effort: 0,
          stat: {
            name: "attack",
            url: "https://pokeapi.co/api/v2/stat/2/"
          }
        },
        {
          base_stat: 35,
          effort: 0,
          stat: {
            name: "hp",
            url: "https://pokeapi.co/api/v2/stat/1/"
          }
        }
      ]
    }
  },
  list: {
    startId: 10,
    endId: 80,
    type: "All"
  }
};

const store = createStoreWithInitialState(state);

describe("PokemonFilter", () => {
  it("component renders 2 card", () => {
    const { getByTestId, getAllByTestId, rerender } = render(
      <Provider store={store}>
        <PokemonFilter startId={null} endId={null} />
      </Provider>
    );

    expect(getAllByTestId("card").length).toBe(2);

    fireEvent.click(getAllByTestId("option")[3]);

    rerender(
      <Provider store={store}>
        <PokemonFilter startId={null} endId={null} />
      </Provider>
    );

    expect(actions.userType).toHaveBeenNthCalledWith(1, "Electric");

    expect(getAllByTestId("card").length).toBe(1);
  });

  it("snapshot", () => {
    const { container } = render(
      <Provider store={store}>
        <PokemonFilter startId={10} endId={20} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
