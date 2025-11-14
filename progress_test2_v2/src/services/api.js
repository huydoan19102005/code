//api.js chứa các hàm gọi API tới JSON Server
import axios from 'axios';
// Cấu hình Base URL cho JSON Server
// Giả định JSON Server đang chạy trên cổng 3001 
const API = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = async () => {
    try {
        const response = await API.get('/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

// Payment APIs
export const getPayments = async () => {
    try {
        const response = await API.get('/payments');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch payments');
    }
};

export const getPaymentById = async (id) => {
    try {
        const response = await API.get(`/payments/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch payment');
    }
};

export const addPayment = async (payment) => {
    try {
        const response = await API.post('/payments', payment);
        return response.data;
    } catch (error) {
        throw new Error('Failed to add payment');
    }
};

export const updatePayment = async (id, payment) => {
    try {
        const response = await API.put(`/payments/${id}`, payment);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update payment');
    }
};

export const deletePayment = async (id) => {
    try {
        const response = await API.delete(`/payments/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete payment');
    }
};

// User APIs
export const getUserById = async (id) => {
    try {
        const response = await API.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user');
    }
};

export const updateUser = async (id, user) => {
    try {
        const response = await API.put(`/users/${id}`, user);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update user');
    }
};