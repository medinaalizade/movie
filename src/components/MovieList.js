// check wtf wrong with handleAddMovie

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createList, addMovieToList, addToBasket } from '../features/movieSlice';
import "../styles/MovieList";

const MovieList = () => {
  const [listName, setListName] = useState('');
  const [selectedListId, setSelectedListId] = useState(null);
  const lists = useSelector(state => state.movies.lists);
  const dispatch = useDispatch();

  const handleCreateList = () => {
    if (listName) {
      dispatch(createList(listName));
      setListName('');
    }
  };

  const handleAddMovie = (movie) => {
    if (selectedListId) {
      console.log('Adding movie to list:', selectedListId, movie); // Debugging line
      dispatch(addMovieToList({ listId: selectedListId, movie }));
    } else {
      console.error('No list selected.');
    }
  };

  const handleAddToBasket = (listId) => {
    dispatch(addToBasket(listId));
  };

  return (
    <div className="movie-list-container">
      <h2>Create a New List</h2>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="List Name"
      />
      <button onClick={handleCreateList}>Create List</button>
      
      <h2>Existing Lists</h2>
      <select onChange={(e) => setSelectedListId(Number(e.target.value))}>
        <option value="">Select a list</option>
        {lists.map(list => (
          <option key={list.id} value={list.id}>{list.name}</option>
        ))}
      </select>

      <h2>Your Lists</h2>
      {lists.map(list => (
        <div key={list.id} className="list">
          <h3>{list.name}</h3>
          <ul>
            {list.movies.map(movie => (
              <li key={movie.imdbID}>{movie.Title}</li>
            ))}
          </ul>
          <button onClick={() => handleAddToBasket(list.id)}>Add to Basket</button>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
