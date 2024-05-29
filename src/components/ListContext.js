import React, { createContext, useState } from 'react';

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState([]);

  const createList = (listName, movie) => {
    if (lists.some(list => list.name === listName)) {
      console.error('List with the same name already exists.');
      return;
    }

    const newList = {
      name: listName,
      movies: [movie],
    };
    setLists(prevLists => [...prevLists, newList]);
  };

  const addMovieToList = (listName, movie) => {
    setLists(prevLists => {
      return prevLists.map(list => {
        if (list.name === listName && !list.movies.some(m => m.Title === movie.Title)) {
          return {
            ...list,
            movies: [...list.movies, movie],
          };
        }
        return list;
      });
    });
  };

  const removeMovieFromList = (listName, movieToRemove) => {
    setLists(prevLists => {
      return prevLists.map(list => {
        if (list.name === listName) {
          const updatedMovies = list.movies.filter(movie => movie !== movieToRemove);
          if (updatedMovies.length === 0) {
            return null;
          }
          return {
            ...list,
            movies: updatedMovies,
          };
        }
        return list;
      }).filter(Boolean);
    });
  };

  return (
    <ListContext.Provider value={{ lists, setLists, createList, addMovieToList, removeMovieFromList }}>
      {children}
    </ListContext.Provider>
  );
};
