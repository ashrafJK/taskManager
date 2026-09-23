import axios from 'axios';

// Base API URL with env variable fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

const api = axios.create({
  baseURL: API_URL,
});

export default api;
