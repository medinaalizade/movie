import React, { createContext, useState } from 'react';

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState([]);

  const createList = (listName, movie) => {
    const newList = {
      name: listName,
      movies: [movie],
    };
    setLists(prevLists => [...prevLists, newList]);
  };

  const addMovieToList = (listName, movie) => {
    setLists(prevLists => {
      return prevLists.map(list => {
        if (list.name === listName) {
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
            // If the list becomes empty, remove it from the lists array
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

