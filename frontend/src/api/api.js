// Import axios to send HTTP requests from frontend to backend
import axios from "axios";

// Create one reusable API object.
// All backend API calls will start with this base URL.
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// This interceptor runs before every API request.
// It checks localStorage for the login token.
// If token exists, it adds it to the Authorization header.
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;