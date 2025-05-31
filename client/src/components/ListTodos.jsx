import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { TODO_ENDPOINTS } from '../config/api';
import { showSuccessToast, showErrorToast, showInfoToast } from '../utils/toast';
import EditTodos from './EditTodos';
import './ListTodos.css';

const ListTodos = ({ todos, setTodosChange }) => {
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(TODO_ENDPOINTS.GET_ALL, {
          headers: { token }
        });
        setAllTodos(response.data);
      } catch (err) {
        console.error(err.message);
        showErrorToast("Failed to load tasks. Please refresh the page.");
      }
    };

    fetchTodos();
  }, [setTodosChange]);

  const deleteTodo = async (id) => {
    try {
      showInfoToast("Deleting task...");
      const token = localStorage.getItem('token');
      await axios.delete(TODO_ENDPOINTS.DELETE(id), {
        headers: { token }
      });
      setAllTodos(allTodos.filter(todo => todo.todo_id !== id));
      showSuccessToast("Task deleted successfully!");
    } catch (err) {
      console.error(err.message);
      showErrorToast("Failed to delete task. Please try again.");
    }
  };


  // Helper function to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Helper function to format repeat frequency for display
  const formatRepeatFrequency = (frequency) => {
    if (!frequency || frequency === "none") return "";
    return frequency.charAt(0).toUpperCase() + frequency.slice(1);
  };

  return (
    <Fragment>
      <div className="todo-list-container mt-5">
        <div className="todo-list-header">
          <div className="header-description">Description</div>
          <div className="header-deadline">Deadline</div>
          <div className="header-repeat">Repeat</div>
          <div className="header-actions">
            <div className="header-edit">Edit</div>
            <div className="header-delete">Delete</div>
          </div>
        </div>

        {allTodos.length === 0 ? (
          <div className="empty-state-container">
            <div className="empty-state">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 5.5L5 7L7.5 4.5" stroke="#6c5ce7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.5 11.5L5 13L7.5 10.5" stroke="#6c5ce7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.5 17.5L5 19L7.5 16.5" stroke="#6c5ce7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11 6H20" stroke="#6c5ce7" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M11 12H20" stroke="#6c5ce7" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M11 18H20" stroke="#6c5ce7" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className="mt-3">No tasks yet. Add one above!</p>
            </div>
          </div>
        ) : (
          <div className="todo-items-container">
            {allTodos.map(todo => (
              <div key={todo.todo_id} className="todo-item">
                <div className="todo-description">{todo.description}</div>
                <div className="todo-deadline">
                  {todo.deadline_date && (
                    <span className="deadline">
                      {formatDate(todo.deadline_date)}
                      {todo.deadline_time && (
                        <span className="deadline-time"> {todo.deadline_time.substring(0, 5)}</span>
                      )}
                    </span>
                  )}
                </div>
                <div className="todo-repeat">
                  {formatRepeatFrequency(todo.repeat_frequency)}
                </div>
                <div className="todo-actions">
                  <div className="todo-edit">
                    <EditTodos todo={todo} setTodosChange={setTodosChange}/>
                  </div>
                  <div className="todo-delete">
                    <button 
                      onClick={() => deleteTodo(todo.todo_id)} 
                      className="icon-btn delete"
                      title="Delete task"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ListTodos;
