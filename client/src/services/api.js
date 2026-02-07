import axios from 'axios';

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_URL = `${apiBase}/api`;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },
    login: async (userData) => {
        const response = await api.post('/auth/login', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
    },
    getCurrentUser: async () => {
        // Optional: check valid token from backend
        const response = await api.get('/auth/me');
        return response.data;
    }
};

export const dealService = {
    getAllDeals: async () => {
        const response = await api.get('/deals');
        return response.data;
    },
    getDealById: async (id) => {
        const response = await api.get(`/deals/${id}`);
        return response.data;
    },
    createDeal: async (dealData) => {
        const response = await api.post('/deals', dealData);
        return response.data;
    },
    updateDeal: async (id, dealData) => {
        const response = await api.put(`/deals/${id}`, dealData);
        return response.data;
    },
    deleteDeal: async (id) => {
        const response = await api.delete(`/deals/${id}`);
        return response.data;
    }
}

export default api;
