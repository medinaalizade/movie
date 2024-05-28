import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: [],
  basket: []
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    createList: (state, action) => {
      state.lists.push({ id: state.lists.length + 1, name: action.payload, movies: [] });
    },
    addMovieToList: (state, action) => {
      const { listId, movie } = action.payload;
      const list = state.lists.find(list => list.id === listId);
      if (list) {
        list.movies.push(movie);
      }
    },
    addToBasket: (state, action) => {
      const list = state.lists.find(list => list.id === action.payload);
      if (list) {
        state.basket.push(list);
      }
    }
  }
});

export const { createList, addMovieToList, addToBasket } = movieSlice.actions;
export default movieSlice.reducer;
