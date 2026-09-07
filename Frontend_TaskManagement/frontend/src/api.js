import axios from 'axios';

// Paste your backend API base URL here:
export const API_URL = 'http://localhost:8080/api/tasks'; // <-- CHANGE to your backend

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

export default api;
