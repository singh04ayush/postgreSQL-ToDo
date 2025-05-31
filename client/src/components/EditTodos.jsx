import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { TODO_ENDPOINTS } from '../config/api';
import { showSuccessToast, showErrorToast, showInfoToast } from '../utils/toast';
import './EditTodos.css';

const EditTodos = ({ todo, setTodosChange }) => {
  const [description, setDescription] = useState(todo.description);
  const [showModal, setShowModal] = useState(false);

  // Reset description when todo changes
  useEffect(() => {
    setDescription(todo.description);
  }, [todo.description]);

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      showInfoToast("Updating task...");
      const token = localStorage.getItem('token');
      await axios.put(TODO_ENDPOINTS.UPDATE(todo.todo_id), {
        description
      }, {
        headers: { token }
      });
      
      setShowModal(false);
      setTodosChange();
      showSuccessToast("Task updated successfully!");
    } catch (err) {
      console.error(err.message);
      showErrorToast("Failed to update task. Please try again.");
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
        <img src="/assets/icons8-edit.svg" alt="Edit" width="16" height="16" />
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
