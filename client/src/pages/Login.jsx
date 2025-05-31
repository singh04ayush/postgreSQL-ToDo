import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AUTH_ENDPOINTS } from '../config/api';
import { showSuccessToast, showErrorToast, showInfoToast } from '../utils/toast';
import '../styles/Login.css';

const Login = ({ setAuth }) => {
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
      showInfoToast("Logging in...");
      const response = await axios.post(AUTH_ENDPOINTS.LOGIN, {
        email,
        password
      });
      
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      
      // Set auth to true
      setAuth(true);
      
      // Show success toast
      showSuccessToast("Login successful!");
      
      // Redirect to dashboard
      navigate('/');
    } catch (err) {
      console.error(err.response?.data || err.message);
      const errorMessage = err.response?.data?.msg || "Login failed. Please try again.";
      setError(errorMessage);
      showErrorToast(errorMessage);
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google OAuth login
    alert("Google login functionality to be implemented");
  };

  const handleFacebookLogin = () => {
    // Implement Facebook OAuth login
    alert("Facebook login functionality to be implemented");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <img src="/assets/login-illustration.svg" alt="Login" />
        </div>
        <div className="login-right">
          <h2>Welcome back to <span className="highlight">school</span>,</h2>
          
          <div className="social-login">
            <button className="google-btn" onClick={handleGoogleLogin}>
              <img src="/assets/google-icon.svg" alt="Google" />
              Google
            </button>
            <button className="facebook-btn" onClick={handleFacebookLogin}>
              <img src="/assets/facebook-icon.svg" alt="Facebook" />
              Facebook
            </button>
          </div>
          
          <div className="divider">
            <span>OR</span>
          </div>
          
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
            
            <button type="submit" className="login-btn">Login</button>
          </form>
          
          <p className="signup-link">
            Don't have account? <Link to="/register">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
