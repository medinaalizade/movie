// import React, { useContext, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ListContext } from './ListContext';
// import "../styles/ListDetailPage.css"

// const ListDetailsPage = () => {
//   const { listName } = useParams();
//   const navigate = useNavigate();
//   const { lists, setLists } = useContext(ListContext);

//   const list = lists.find(list => list.name === listName);
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedList, setUpdatedList] = useState(list);

//   if (!list) {
//     return <p>List not found!</p>;
//   }

//   const handleRemoveMovie = (movieToRemove) => {
//     const updatedMovies = updatedList.movies.filter(movie => movie.Title !== movieToRemove.Title);
//     setUpdatedList({ ...updatedList, movies: updatedMovies });
//   };

//   const handleDeleteList = () => {
//     setLists(prevLists => prevLists.filter(list => list.name !== listName));
//     navigate('/basket');
//   };

//   const handleSaveChanges = () => {
//     if (JSON.stringify(updatedList.movies) !== JSON.stringify(list.movies)) {
//       setLists(prevLists => prevLists.map(prevList => {
//         if (prevList.name === listName) {
//           return updatedList;
//         }
//         return prevList;
//       }));
//     }
//     setIsEditing(false);
//     navigate(`/basket/${listName}`);
//   };

//   return (
//     <div className="container">
//       <h1>{list.name}</h1>
//       {updatedList.movies.map(movie => (
//         <div key={movie.Title} className="list-item">
//           <p className="list-item-title">{movie.Title}</p>
//           {isEditing && (
//             <button className="delete-movie-button" onClick={() => handleRemoveMovie(movie)}>X</button>
//           )}
//         </div>
//       ))}
//       {isEditing ? (
//         <>
//           <button className="delete-list-button" onClick={handleDeleteList}>Delete List</button>
//           <button className="save-changes-button" onClick={handleSaveChanges}>Save Changes</button>
//         </>
//       ) : (
//         <button className="edit-list-button" onClick={() => setIsEditing(true)}>Edit</button>
//       )}
//     </div>
//   );
// };

// export default ListDetailsPage;

import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ListContext } from './ListContext';
import "../styles/ListDetailPage.css"

const ListDetailsPage = () => {
  const { listName } = useParams();
  const navigate = useNavigate();
  const { lists, setLists } = useContext(ListContext);

  const list = lists.find(list => list.name === listName);
  const [isEditing, setIsEditing] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [updatedList, setUpdatedList] = useState(list);
  const [newListName, setNewListName] = useState(listName);

  if (!list) {
    return <p>List not found!</p>;
  }

  const handleRemoveMovie = (movieToRemove) => {
    const updatedMovies = updatedList.movies.filter(movie => movie.Title !== movieToRemove.Title);
    setUpdatedList({ ...updatedList, movies: updatedMovies });
  };

  const handleDeleteList = () => {
    setLists(prevLists => prevLists.filter(list => list.name !== listName));
    navigate('/basket');
  };

  const handleSaveChanges = () => {
    setLists(prevLists => prevLists.map(prevList => {
      if (prevList.name === listName) {
        return { ...updatedList, name: newListName };
      }
      return prevList;
    }));
    setIsEditing(false);
    setIsRenaming(false);
    navigate(`/basket/${newListName}`);
  };

  const handleRename = () => {
    setIsRenaming(true);
  };

  const handleNameChange = (e) => {
    setNewListName(e.target.value);
  };

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate('/basket')}>Back</button>
      <h1>
        {isRenaming ? (
          <input
            type="text"
            value={newListName}
            onChange={handleNameChange}
            className="rename-input"
          />
        ) : (
          list.name
        )}
      </h1>
      {isEditing && !isRenaming && (
        <button className="rename-list-button" onClick={handleRename}>Rename</button>
      )}
      {updatedList.movies.map(movie => (
        <div key={movie.Title} className="list-item">
          <p className="list-item-title">{movie.Title}</p>
          {isEditing && (
            <button className="delete-movie-button" onClick={() => handleRemoveMovie(movie)}>X</button>
          )}
        </div>
      ))}
      <div className="button-group">
        {isEditing ? (
          <>
            <button className="delete-list-button" onClick={handleDeleteList}>Delete List</button>
            <button className="save-changes-button" onClick={handleSaveChanges}>Save Changes</button>
          </>
        ) : (
          <button className="edit-list-button" onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default ListDetailsPage;
