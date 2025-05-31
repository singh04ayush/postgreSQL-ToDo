import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { TODO_ENDPOINTS } from '../config/api';
import { showSuccessToast, showErrorToast, showInfoToast } from '../utils/toast';
import './InputTodos.css';

const InputTodos = ({ setTodosChange }) => {
  const [description, setDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [repeatFrequency, setRepeatFrequency] = useState("none");
  const [showScheduleOptions, setShowScheduleOptions] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      showInfoToast("Adding task...");
      const token = localStorage.getItem('token');
      
      await axios.post(TODO_ENDPOINTS.CREATE, {
        description,
        deadline_date: deadlineDate || null,
        deadline_time: deadlineTime || null,
        repeat_frequency: repeatFrequency
      }, {
        headers: { token }
      });
      
      showSuccessToast("Task added successfully!");
      
      // Clear form after submission
      setDescription("");
      setDeadlineDate("");
      setDeadlineTime("");
      setRepeatFrequency("none");
      setShowScheduleOptions(false);
      
      setTodosChange(); // Refresh the todo list
    } catch (error) {
      console.error(error.message);
      showErrorToast("Failed to add task. Please try again.");
    }
  };

  // Text animation effect for the title
  useEffect(() => {
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
      letter.style.animationDelay = `${index * 0.1}s`;
    });
  }, []);

  const toggleScheduleOptions = () => {
    setShowScheduleOptions(!showScheduleOptions);
  };

  return (
    <Fragment>
      <div className="title-container">
        <h1 className="text-center mt-5">
          <span className="typing-text">Task Master</span>
        </h1>
      </div>
      <form onSubmit={onSubmitForm} className="mt-5">
        <div className="d-flex mb-3">
          <input 
            type="text" 
            className="form-control" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            placeholder="What needs to be done?"
            required
          />
          <button 
            type="button" 
            className="btn btn-outline-primary ml-2" 
            onClick={toggleScheduleOptions}
            title="Set deadline and repeat options"
          >
            <i className="fas fa-calendar-alt"></i>
          </button>
          <button type="submit" className="btn btn-success ml-2">
            <i className="fas fa-plus"></i> ADD
          </button>
        </div>
        
        {showScheduleOptions && (
          <div className="schedule-options p-3 mb-3 border rounded">
            <h5 className="mb-3">Task Schedule</h5>
            <div className="row">
              <div className="col-md-4 mb-2">
                <label htmlFor="deadlineDate">Deadline Date:</label>
                <input
                  type="date"
                  id="deadlineDate"
                  className="form-control"
                  value={deadlineDate}
                  onChange={e => setDeadlineDate(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-2">
                <label htmlFor="deadlineTime">Deadline Time:</label>
                <input
                  type="time"
                  id="deadlineTime"
                  className="form-control"
                  value={deadlineTime}
                  onChange={e => setDeadlineTime(e.target.value)}
                />
              </div>
              <div className="col-md-4 mb-2">
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
            </div>
          </div>
        )}
      </form>
    </Fragment>
  );
};

export default InputTodos;
