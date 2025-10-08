import axios from 'axios';

// Base URL for the Django REST Framework API
const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
