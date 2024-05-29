import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import BasketPage from './components/BasketPage';
import ListDetailsPage from './components/ListDetailsPage';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/basket/:listName" element={<ListDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
