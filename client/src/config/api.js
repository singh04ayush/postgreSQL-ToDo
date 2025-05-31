// API configuration
// Use local server during development
const API_URL = 'http://localhost:4000';

// Auth endpoints
const AUTH_ENDPOINTS = {
  LOGIN: `${API_URL}/api/auth/login`,
  REGISTER: `${API_URL}/api/auth/register`,
  VERIFY: `${API_URL}/api/auth/verify`
};

// Todo endpoints
const TODO_ENDPOINTS = {
  GET_ALL: `${API_URL}/api/todos`,
  CREATE: `${API_URL}/api/todos`,
  UPDATE: (id) => `${API_URL}/api/todos/${id}`,
  DELETE: (id) => `${API_URL}/api/todos/${id}`
};

export { API_URL, AUTH_ENDPOINTS, TODO_ENDPOINTS };
