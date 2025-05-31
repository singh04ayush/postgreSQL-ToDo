import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { TODO_ENDPOINTS } from '../config/api';
import { showSuccessToast, showErrorToast, showInfoToast } from '../utils/toast';
import './EditTodos.css';

const EditTodos = ({ todo, setTodosChange }) => {
  const [description, setDescription] = useState(todo.description);
  const [deadlineDate, setDeadlineDate] = useState(todo.deadline_date || "");
  const [deadlineTime, setDeadlineTime] = useState(todo.deadline_time || "");
  const [repeatFrequency, setRepeatFrequency] = useState(todo.repeat_frequency || "none");
  const [showModal, setShowModal] = useState(false);

  // Reset all form fields when todo changes
  useEffect(() => {
    setDescription(todo.description);
    setDeadlineDate(todo.deadline_date || "");
    setDeadlineTime(todo.deadline_time || "");
    setRepeatFrequency(todo.repeat_frequency || "none");
  }, [todo]);

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      showInfoToast("Updating task...");
      const token = localStorage.getItem('token');
      await axios.put(TODO_ENDPOINTS.UPDATE(todo.todo_id), {
        description,
        deadline_date: deadlineDate || null,
        deadline_time: deadlineTime || null,
        repeat_frequency: repeatFrequency
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
    // Reset all fields to original values when opening
    setDescription(todo.description);
    setDeadlineDate(todo.deadline_date || "");
    setDeadlineTime(todo.deadline_time || "");
    setRepeatFrequency(todo.repeat_frequency || "none");
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
              <form onSubmit={updateTask}>
                <div className="form-group mb-3">
                  <label htmlFor="description">Task Description:</label>
                  <input
                    type="text"
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                
                <div className="form-group mb-3">
                  <label htmlFor="deadlineDate">Deadline Date:</label>
                  <input
                    type="date"
                    id="deadlineDate"
                    className="form-control"
                    value={deadlineDate}
                    onChange={e => setDeadlineDate(e.target.value)}
                  />
                </div>
                
                <div className="form-group mb-3">
                  <label htmlFor="deadlineTime">Deadline Time:</label>
                  <input
                    type="time"
                    id="deadlineTime"
                    className="form-control"
                    value={deadlineTime}
                    onChange={e => setDeadlineTime(e.target.value)}
                  />
                </div>
                
                <div className="form-group mb-3">
                  <label htmlFor="repeatFrequency">Repeat:</label>
                  <select
                    id="repeatFrequency"
                    className="form-control"
                    value={repeatFrequency}
                    onChange={e => setRepeatFrequency(e.target.value)}
                  >
                    <option value="none">No Repeat</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
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
