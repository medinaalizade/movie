import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ListModal from './ListModal';
import { ListContext } from './ListContext';
import '../styles/HomePage.css';
import { useLocation } from 'react-router-dom';

const apiKey = '1d3b1477';
const apiURL = `http://www.omdbapi.com/?apikey=${apiKey}`;

const HomePage = ({ searchQuery }) => {
  const { lists, addMovieToList, createList } = useContext(ListContext);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMovieDetailsModalOpen, setIsMovieDetailsModalOpen] = useState(false);
  const [movieToAdd, setMovieToAdd] = useState(null);
  const [notFound, setNotFound] = useState(false); 

  const location = useLocation();
  const selectedMovieFromLocation = location.state?.selectedMovie;

  useEffect(() => {
    const fetchMovies = async () => {
      if (searchQuery || selectedMovieFromLocation) {
        const query = searchQuery || selectedMovieFromLocation.Title;
        try {
          const response = await axios.get(`${apiURL}&s=${query}`);
          if (response.data.Response === 'True') {
            setMovies(response.data.Search.filter(movie => movie.Poster !== 'N/A' && movie.Type === 'movie'));
            setNotFound(false); 
          } else {
            setMovies([]);
            setNotFound(true); 
          }
        } catch (error) {
          console.error('Error searching movies:', error);
        }
      } else {
        fetchDefaultMovies();
      }
    };

    fetchMovies();
  }, [searchQuery, selectedMovieFromLocation]);

  const fetchDefaultMovies = async () => {
    const movieTitles = [
      'Inception', 'The Matrix', 'Interstellar', 'The Dark Knight', 'Pulp Fiction',
      'Forrest Gump', 'The Shawshank Redemption', 'Fight Club', 'The Godfather',
      'The Lord of the Rings', 'Star Wars', 'The Avengers', 'Titanic', 'Jurassic Park',
      'Harry Potter', 'The Lion King', 'Toy Story', 'Finding Nemo', 'The Incredibles',
      'Frozen'
    ];

    try {
      const moviePromises = movieTitles.map(title =>
        axios.get(`${apiURL}&t=${title}`)
      );
      const movieResponses = await Promise.all(moviePromises);
      const fetchedMovies = movieResponses
        .map(response => response.data)
        .filter(movie => movie.Response === 'True' && movie.Poster !== 'N/A');
      setMovies(fetchedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const viewDetails = async (movie) => {
    try {
      const response = await axios.get(`${apiURL}&i=${movie.imdbID}`);
      if (response.data.Response === 'True') {
        setSelectedMovie(response.data);
        setIsMovieDetailsModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleAddMovieToList = (movie) => {
    setMovieToAdd(movie);
    setIsModalOpen(true);
  };

  const handleCreateList = (listName) => {
    createList(listName, movieToAdd);
    setIsModalOpen(false);
  };

  const handleAddToList = (listName) => {
    addMovieToList(listName, movieToAdd);
    setIsModalOpen(false);
  };

  const closeMovieDetailsModal = () => {
    setIsMovieDetailsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="home-page">
      <div className="movie-grid-container">
        <div className="movie-grid">
          {notFound && <p>No movies found for "{searchQuery}"</p>}
          {!notFound && movies.map(movie => (
            <div key={movie.imdbID} className="movie-card">
              <img src={movie.Poster} alt={movie.Title} />
              <h4>{movie.Title}</h4>
              <p>Year: {movie.Year}</p>
              <p>Country: {movie.Country}</p>
              <div className='movie-btns'>
                <button onClick={() => viewDetails(movie)}>View Details</button>
                <button onClick={() => handleAddMovieToList(movie)}>Add to List</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isMovieDetailsModalOpen && (
        <div className={`modal ${isMovieDetailsModalOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <button className="close-button" onClick={closeMovieDetailsModal}>Close</button>
            {selectedMovie && (
              <div className="movie-details">
                <div className='left'>
                  <h3>{selectedMovie.Title}</h3>
                  <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
                </div>
                <div className='right'> 
                  <p><strong>Year:</strong> {selectedMovie.Year}</p>
                  <p><strong>Released:</strong> {selectedMovie.Released}</p>
                  <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
                  <p><strong>Director:</strong> {selectedMovie.Director}</p>
                  <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
                  <p><strong>Language:</strong> {selectedMovie.Language}</p>
                  <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
                  <p><strong>Ratings:</strong></p>
                  <ul>
                    {selectedMovie.Ratings.map((rating, index) => (
                      <li key={index}><strong>{rating.Source}:</strong> {rating.Value}</li>
                    ))}
                  </ul>
                  <a href={`https://www.imdb.com/title/${selectedMovie.imdbID}`} target="_blank" rel="noopener noreferrer">View on IMDB</a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {isModalOpen && (
        <ListModal
          lists={lists}
          onClose={() => setIsModalOpen(false)}
          onAddMovieToList={handleAddToList}
          onCreateList={handleCreateList}
        />
      )}
    </div>
);
};
export default HomePage;