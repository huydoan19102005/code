import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication API
export const authAPI = {
  login: async (username, password) => {
    const response = await api.get('/users');
    // Filter on client side since json-server may not handle multiple params well
    const users = response.data.filter(
      (u) => u.username === username && u.password === password
    );
    return users;
  },
};

// Expenses API
export const expensesAPI = {
  // Get all expenses for a user
  getExpensesByUserId: async (userId) => {
    const response = await api.get('/expenses');
    // Filter by userId on client side
    const expenses = response.data.filter((exp) => exp.userId === userId.toString());
    return expenses;
  },

  // Add new expense
  addExpense: async (expense) => {
    const response = await api.post('/expenses', expense);
    return response.data;
  },

  // Update expense
  updateExpense: async (id, expense) => {
    const response = await api.put(`/expenses/${id}`, expense);
    return response.data;
  },

  // Delete expense
  deleteExpense: async (id) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  },
};

export default api;

