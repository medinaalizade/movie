import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { ListContext } from './ListContext';
import '../styles/BasketPage.css';

const BasketPage = () => {
  const { lists } = useContext(ListContext);

  return (
    <div className="container">
      <h1 className='heading'>My Basket</h1>
      {lists.length === 0 ? (
        <p className='message'>No lists created yet!</p>
      ) : (
        lists.map(list => (
          <Link to={`/basket/${list.name}`} key={list.name} className="list-link">
            <div className="list-container">
              <h2 className="list-header">{list.name}</h2>
              {list.movies.map(movie => (
                <div key={movie.Title} className="list-item">
                  <p className="list-item-title">{movie.Title}</p>
                </div>
              ))}
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default BasketPage;
