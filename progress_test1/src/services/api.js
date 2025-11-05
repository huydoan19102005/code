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

// User APIs
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

export const createPayment = async (paymentData) => {
    try {
        const response = await API.post('/payments', paymentData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create payment');
    }
};

export const updatePayment = async (id, paymentData) => {
    try {
        const response = await API.put(`/payments/${id}`, paymentData);
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

