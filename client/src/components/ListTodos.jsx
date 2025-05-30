import React, { Fragment, useEffect, useState } from 'react';
import EditTodos from './EditTodos';
import './TodoList.css';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async id => {
    try {
      await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE"
      });
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:4000/todos");
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);


  return (
    <Fragment>
      <div className="todo-list-container mt-5">
        <div className="todo-list-header">
          <div className="header-description">Description</div>
          <div className="header-actions">
            <div className="header-edit">Edit</div>
            <div className="header-delete">Delete</div>
          </div>
        </div>

        {todos.length === 0 ? (
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
            {todos.map(todo => (
              <div key={todo.todo_id} className="todo-item">
                <div className="todo-description">{todo.description}</div>
                <div className="todo-actions">
                  <div className="todo-edit">
                    <EditTodos todo={todo} onUpdate={getTodos}/>
                  </div>
                  <div className="todo-delete">
                    <button 
                      onClick={() => deleteTodo(todo.todo_id)} 
                      className="icon-btn delete"
                      title="Delete task"
                    >
                      <i className="fas fa-trash-alt"></i>
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
