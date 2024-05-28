// you didn't create it. check why this shit here

import React from 'react';

const SearchResult = ({ result }) => {
  return (
    <div>
      <h4>{result.Title}</h4>
      <p>Year: {result.Year}</p>
      <p>Type: {result.Type}</p>
    </div>
  );
};

export default SearchResult;
