import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { expensesAPI } from '../services/api';

const ExpensesContext = createContext();

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpensesProvider');
  }
  return context;
};

const initialState = {
  expenses: [],
  loading: false,
  error: null,
  selectedCategory: 'All categories',
  editingExpense: null,
};

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'FETCH_EXPENSES_SUCCESS':
      return { ...state, expenses: action.payload, loading: false, error: null };
    case 'ADD_EXPENSE_SUCCESS':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'UPDATE_EXPENSE_SUCCESS':
      return {
        ...state,
        expenses: state.expenses.map((exp) =>
          exp.id === action.payload.id ? action.payload : exp
        ),
      };
    case 'DELETE_EXPENSE_SUCCESS':
      return {
        ...state,
        expenses: state.expenses.filter((exp) => exp.id !== action.payload),
      };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_EDITING_EXPENSE':
      return { ...state, editingExpense: action.payload };
    default:
      return state;
  }
};

export const ExpensesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expensesReducer, initialState);

  const fetchExpenses = async (userId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await expensesAPI.getExpensesByUserId(userId);
      dispatch({ type: 'FETCH_EXPENSES_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const addExpense = async (expense) => {
    try {
      const data = await expensesAPI.addExpense(expense);
      dispatch({ type: 'ADD_EXPENSE_SUCCESS', payload: data });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false };
    }
  };

  const updateExpense = async (id, expense) => {
    try {
      const data = await expensesAPI.updateExpense(id, expense);
      dispatch({ type: 'UPDATE_EXPENSE_SUCCESS', payload: data });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false };
    }
  };

  const deleteExpense = async (id) => {
    try {
      await expensesAPI.deleteExpense(id);
      dispatch({ type: 'DELETE_EXPENSE_SUCCESS', payload: id });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false };
    }
  };

  const setSelectedCategory = (category) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
  };

  const setEditingExpense = (expenseId) => {
    dispatch({ type: 'SET_EDITING_EXPENSE', payload: expenseId });
  };

  const value = {
    ...state,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    setSelectedCategory,
    setEditingExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

