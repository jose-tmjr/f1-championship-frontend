import axios from 'axios';

const http = axios.create({
  baseURL: '/api', //Using proxy configuration from vite.config.ts
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default http;
