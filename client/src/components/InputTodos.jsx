import React, { Fragment, useState, useEffect } from 'react';
import './InputTodos.css';
import { API_URL } from '../config/api';

const InputTodos = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const body = { description };
      await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      setDescription(""); // Clear input after submission
      window.location = '/';
    } catch (error) {
      console.error(error.message);
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
