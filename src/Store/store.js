import { createStore, compose, applyMiddleware } from "redux";
import { pokemonReducer } from "./reducers/index";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  pokemonReducer,
  composeEnhancer(applyMiddleware(thunk))
);

export const createStoreWithInitialState = initialState =>
  createStore(pokemonReducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
