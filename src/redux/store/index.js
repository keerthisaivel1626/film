import { configureStore } from "@reduxjs/toolkit";
import FilmReducer from '../reducers/FilmReducer';
const reducer = {
  FilmReducer: FilmReducer,

};

export const store = configureStore({ reducer });
