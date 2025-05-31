import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { TODO_ENDPOINTS } from '../config/api';
import { showSuccessToast, showErrorToast } from '../utils/toast';
import './InputTodos.css';

const InputTodos = ({ setTodosChange }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(TODO_ENDPOINTS.CREATE, {
        description
      }, {
        headers: { token }
      });
      
      showSuccessToast("Task added successfully!");
      setDescription(""); // Clear input after submission
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

  return (
    <Fragment>
      <div className="title-container">
        <h1 className="text-center mt-5">
          <span className="typing-text">Task Master</span>
        </h1>
      </div>
      <form onSubmit={onSubmitForm} className="d-flex mt-5">
        <input 
          type="text" 
          className="form-control" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          placeholder="What needs to be done?"
          required
        />
        <button className="btn btn-success ml-2">
          <i className="fas fa-plus"></i> ADD
        </button>
      </form>
    </Fragment>
  );
};

export default InputTodos;
