import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';
import { TODO_ENDPOINTS, AUTH_ENDPOINTS } from '../config/api';
import InputTodos from './InputTodos';
import ListTodos from './ListTodos';
import './Dashboard.css';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const getTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(TODO_ENDPOINTS.GET_ALL, {
        headers: { token }
      });
      setTodos(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(AUTH_ENDPOINTS.VERIFY, {
        headers: { token }
      });
      setUser(response.data.user);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/login');
  };

  useEffect(() => {
    getTodos();
    getUser();
  }, []);

  return (
    <div className="container">
      <div className="dashboard-header">
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
      <InputTodos setTodosChange={getTodos} />
      <ListTodos todos={todos} setTodosChange={getTodos} />
    </div>
  );
};

export default Dashboard;
