import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filmReducerDetails: null,
  peopleReducerDetails: null,
  planetReducerDetails:null,
};

const FilmReducer = createSlice({
  name: 'film',
  initialState,
  reducers: {
    storeFilmReducerData(state, action) {
      state.filmReducerDetails = action.payload;
    },
    storePeopleReducerData(state, action) {
      state.peopleReducerDetails = action.payload;
    },
    storePlanetsReducerData(state, action) {
      state.planetReducerDetails = action.payload;
    },
  },
});

export const {storeFilmReducerData, storePeopleReducerData} = FilmReducer.actions;
export default FilmReducer.reducer;
