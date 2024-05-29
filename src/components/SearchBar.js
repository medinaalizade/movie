import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "../styles/SearchBar.css";

const apiKey = '1d3b1477';
const apiURL = `http://www.omdbapi.com/?apikey=${apiKey}`;

const SearchBar = ({ searchQuery, setSearchQuery, onSearchSubmit, onSuggestionClick }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length > 2) {
        try {
          const response = await axios.get(`${apiURL}&s=${searchQuery}`);
          if (response.data.Response === 'True') {
            setSuggestions(response.data.Search);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error('Error fetching search suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchQuery]);

  const handleSuggestionClick = (movie) => {
    onSuggestionClick(movie);
    setSearchQuery(movie.Title);
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedSuggestionIndex(-1);
  };

  const handleClearInput = () => {
    setSearchQuery('');
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSuggestionIndex >= 0) {
        handleSuggestionClick(suggestions[selectedSuggestionIndex]);
      } else {
        onSearchSubmit(searchQuery);
        setSuggestions([]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
    setSuggestions([]);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-bar" autoComplete="off">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
        {searchQuery && (
          <button type="button" className="clear-button" onClick={handleClearInput}>
            X
          </button>
        )}
        <button type="submit" className='search'>Search</button>
      </form>
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((movie, index) => (
            <div
              key={movie.imdbID}
              className={`suggestion-item ${index === selectedSuggestionIndex ? 'selected' : ''}`}
              onClick={() => handleSuggestionClick(movie)}
              onMouseEnter={() => setSelectedSuggestionIndex(index)}
            >
              {movie.Title} ({movie.Year})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
