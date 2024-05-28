import React, { useState } from 'react';
import '../styles/ListModal.css';

const ListModal = ({ lists, onClose, onAddMovieToList, onCreateList }) => {
  const [newListName, setNewListName] = useState('');

  const handleCreateList = () => {
    if (newListName.trim()) {
      onCreateList(newListName);
      setNewListName('');
    }
  };

  return (
    <div className="modal open">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h3>Add to List</h3>
        <div>
          <h4>Existing Lists</h4>
          <ul>
            {lists.map((list) => (
              <li key={list.name}>
                <button onClick={() => onAddMovieToList(list.name)}>{list.name}</button>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div>
          <h4>Create New List</h4>
          <div className="create-list-container">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="New List Name"
            />
            <button onClick={handleCreateList}>Create</button>
          </div>
          {newListName && (
            <ul>
              <li className="new-list-item">{newListName}</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListModal;
