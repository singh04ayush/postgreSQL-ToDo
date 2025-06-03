import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AUTH_ENDPOINTS } from '../config/api';
import { showSuccessToast, showErrorToast, showInfoToast } from '../utils/toast';
import '../styles/Login.css';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    github_url: "",
    linkedin_url: "",
    instagram_url: "",
    portfolio_url: ""
  });
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { email, password, github_url, linkedin_url, instagram_url, portfolio_url } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      showInfoToast("Creating your account...");
      const response = await axios.post(AUTH_ENDPOINTS.REGISTER, {
        email,
        password,
        github_url: github_url || null,
        linkedin_url: linkedin_url || null,
        instagram_url: instagram_url || null,
        portfolio_url: portfolio_url || null
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
            
            <div className="social-links-toggle">
              <button 
                type="button" 
                className="toggle-btn" 
                onClick={() => setShowSocialLinks(!showSocialLinks)}
              >
                {showSocialLinks ? 'Hide Social Links' : 'Add Social Links (Optional)'}
              </button>
            </div>
            
            {showSocialLinks && (
              <div className="social-links-section">
                <div className="input-group">
                  <input
                    type="url"
                    name="github_url"
                    placeholder="GitHub URL"
                    value={github_url}
                    onChange={onChange}
                  />
                  <span className="input-icon">🐙</span>
                </div>
                
                <div className="input-group">
                  <input
                    type="url"
                    name="linkedin_url"
                    placeholder="LinkedIn URL"
                    value={linkedin_url}
                    onChange={onChange}
                  />
                  <span className="input-icon">💼</span>
                </div>
                
                <div className="input-group">
                  <input
                    type="url"
                    name="instagram_url"
                    placeholder="Instagram URL"
                    value={instagram_url}
                    onChange={onChange}
                  />
                  <span className="input-icon">📸</span>
                </div>
                
                <div className="input-group">
                  <input
                    type="url"
                    name="portfolio_url"
                    placeholder="Portfolio URL"
                    value={portfolio_url}
                    onChange={onChange}
                  />
                  <span className="input-icon">🌐</span>
                </div>
              </div>
            )}
            
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
