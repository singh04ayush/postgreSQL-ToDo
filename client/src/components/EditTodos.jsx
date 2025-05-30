import React, { Fragment, useState, useEffect } from 'react';
import './EditTodos.css';
import { API_URL } from '../config/api';

const EditTodos = ({ todo, onUpdate }) => {
  const [description, setDescription] = useState(todo.description);
  const [showModal, setShowModal] = useState(false);

  // Reset description when todo changes
  useEffect(() => {
    setDescription(todo.description);
  }, [todo.description]);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(`${API_URL}/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setShowModal(false);
        if (onUpdate) onUpdate();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const openModal = () => {
    setDescription(todo.description); // Reset to original value when opening
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Fragment>
      <button 
        onClick={openModal} 
        className="icon-btn edit"
        title="Edit task"
      >
        <i className="fas fa-edit"></i>
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="edit-modal" onClick={handleModalClick}>
            <div className="modal-header">
              <h3>Edit Todo</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={updateDescription}>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  autoFocus
                />
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EditTodos;
