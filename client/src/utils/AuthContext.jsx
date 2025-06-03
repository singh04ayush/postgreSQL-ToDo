import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AUTH_ENDPOINTS } from '../config/api';
import { showErrorToast, showSuccessToast } from './toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    showSuccessToast("Logged out successfully!");
    // Note: Navigation will be handled by the protected route in App.jsx
    // which will redirect to login when isAuthenticated becomes false
  };

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      const response = await axios.get(AUTH_ENDPOINTS.VERIFY, {
        headers: { token }
      });

      if (response.data.user) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      
      if (!response.data.user) {
        // If server responds but user is not authenticated
        localStorage.removeItem('token');
      }
    } catch (err) {
      console.error(err.message);
      setIsAuthenticated(false);
      localStorage.removeItem('token'); // Clear invalid token
      
      // Only show error toast if it's not the initial page load
      if (!isLoading) {
        showErrorToast("Authentication failed. Please login again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth, isLoading, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
