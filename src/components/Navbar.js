import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/styles.css";
import SearchBar from './SearchBar';

const Navbar = ({ onSearch }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchSubmit = (query) => {
    onSearch(query);
    navigate('/');
    setSearchOpen(false); 
  };

  const handleSuggestionClick = (movie) => {
    setSearchQuery(movie.Title);
    navigate('/', { state: { selectedMovie: movie } });
    setSearchOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar" ref={menuRef}>
      <div className="logo">
        <Link to="/" onClick={() => { setMenuOpen(false); window.location.reload(); }}>Movie Organizer</Link>
      </div>
      <div className="menu" onClick={toggleMenu}>Menu</div>
      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/basket" onClick={() => setMenuOpen(false)}>Basket</Link>
        {!searchOpen && (
          <div className="search-link" onClick={toggleSearch}>Search</div>
        )}
      </div>
      {searchOpen && (
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          onSuggestionClick={handleSuggestionClick} 
        />
      )}
    </nav>
  );
};

export default Navbar;
