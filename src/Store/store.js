import { createStore } from "redux";
import { pokemonReducer } from "./reducers/index";

const store = createStore(
  pokemonReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const createStoreWithInitialState = (initialState) => createStore(pokemonReducer, initialState)

export default store;
