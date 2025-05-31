import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AUTH_ENDPOINTS } from '../config/api';
import { showSuccessToast, showErrorToast, showInfoToast } from '../utils/toast';
import '../styles/Login.css';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      showInfoToast("Creating your account...");
      const response = await axios.post(AUTH_ENDPOINTS.REGISTER, {
        email,
        password
      });
      
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      
      // Set auth to true
      setAuth(true);
      
      // Show success toast
      showSuccessToast("Registration successful!");
      
      // Redirect to dashboard
      navigate('/');
    } catch (err) {
      console.error(err.response?.data || err.message);
      const errorMessage = err.response?.data?.msg || "Registration failed. Please try again.";
      setError(errorMessage);
      showErrorToast(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <img src="/assets/login-illustration.svg" alt="Register" />
        </div>
        <div className="login-right">
          <h2>Create your account</h2>
          
          <form onSubmit={onSubmitForm}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
                required
              />
              <span className="input-icon">✉️</span>
            </div>
            
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
                required
              />
              <span className="input-icon">🔒</span>
            </div>
            
            <button type="submit" className="login-btn">Register</button>
          </form>
          
          <p className="signup-link">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
