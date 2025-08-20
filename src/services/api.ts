import axios from 'axios';
import { config, validateEnvironment } from '../config/env';

// Validate environment variables on initialization
validateEnvironment();

const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging in development
if (config.enableDebug) {
  api.interceptors.request.use(
    (config) => {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
      return config;
    },
    (error) => {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    }
  );
}

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    if (config.enableDebug) {
      console.log('API Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    if (config.enableDebug) {
      console.error('API Response Error:', error.response?.status, error.config?.url, error.message);
    }
    
    // Handle common error scenarios
    if (error.response?.status === 404) {
      console.warn('Resource not found:', error.config?.url);
    } else if (error.response?.status >= 500) {
      console.error('Server error:', error.response?.status);
    }
    
    return Promise.reject(error);
  }
);

export default api;
