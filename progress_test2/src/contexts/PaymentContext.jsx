//PaymentContext.jsx quản lý thanh toán bằng Context API và useReducer
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

// 1. Tạo Context
const PaymentContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialPaymentState = {
    payments: [],
    filteredPayments: [],
    isLoading: false,
    error: null,
    filters: {
        search: '',
        semester: '',
        course: '',
        sortBy: 'course_asc', // Default sort by course ascending
    },
    totalAmount: 0,
};

// 3. Tạo hàm reduce để quản lý các hành động liên quan đến payments
const paymentReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        case 'FETCH_SUCCESS':
            return { 
                ...state, 
                isLoading: false, 
                payments: action.payload, 
                error: null 
            };
        case 'FETCH_FAILURE':
            return { 
                ...state, 
                isLoading: false, 
                error: action.payload 
            };
        case 'SET_FILTERS':
            return {
                ...state,
                filters: { ...state.filters, ...action.payload },
            };
        case 'APPLY_FILTERS':
            // Apply filters and sorting
            let filtered = [...state.payments];
            
            // Filter by search (semester or course name)
            if (state.filters.search) {
                const searchLower = state.filters.search.toLowerCase();
                filtered = filtered.filter(
                    payment => 
                        payment.semester.toLowerCase().includes(searchLower) ||
                        payment.courseName.toLowerCase().includes(searchLower)
                );
            }
            
            // Filter by semester
            if (state.filters.semester) {
                filtered = filtered.filter(
                    payment => payment.semester === state.filters.semester
                );
            }
            
            // Filter by course
            if (state.filters.course) {
                filtered = filtered.filter(
                    payment => payment.courseName === state.filters.course
                );
            }
            
            // Sort
            filtered.sort((a, b) => {
                switch (state.filters.sortBy) {
                    case 'course_asc':
                        return a.courseName.localeCompare(b.courseName);
                    case 'course_desc':
                        return b.courseName.localeCompare(a.courseName);
                    case 'date_asc':
                        return new Date(a.date) - new Date(b.date);
                    case 'date_desc':
                        return new Date(b.date) - new Date(a.date);
                    case 'amount_asc':
                        return a.amount - b.amount;
                    case 'amount_desc':
                        return b.amount - a.amount;
                    default:
                        return 0;
                }
            });
            
            // Calculate total amount
            const totalAmount = filtered.reduce((sum, payment) => sum + payment.amount, 0);
            
            return {
                ...state,
                filteredPayments: filtered,
                totalAmount,
            };
        case 'ADD_PAYMENT':
            return {
                ...state,
                payments: [...state.payments, action.payload],
            };
        case 'UPDATE_PAYMENT':
            return {
                ...state,
                payments: state.payments.map(payment =>
                    payment.id === action.payload.id ? action.payload : payment
                ),
            };
        case 'DELETE_PAYMENT':
            return {
                ...state,
                payments: state.payments.filter(payment => payment.id !== action.payload),
            };
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        default:
            return state;
    }
};

// 4. Tạo PaymentProvider để cung cấp Context cho các component con
export const PaymentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);
    const { user } = useAuth();

    // Fetch all payments (filtered by userId if needed)
    const fetchPayments = async () => {
        dispatch({ type: 'FETCH_START' });
        try {
            const payments = await api.getPayments();
            // Filter by current user's payments
            const userPayments = user ? payments.filter(p => p.userId === user.id) : payments;
            dispatch({ type: 'FETCH_SUCCESS', payload: userPayments });
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
        }
    };

    // Fetch payments on mount and when user changes
    useEffect(() => {
        if (user) {
            fetchPayments();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // Apply filters whenever payments or filters change
    useEffect(() => {
        dispatch({ type: 'APPLY_FILTERS' });
    }, [state.payments, state.filters]);

    // Add new payment
    const addPayment = async (paymentData) => {
        dispatch({ type: 'FETCH_START' });
        try {
            const newPayment = {
                ...paymentData,
                userId: user?.id,
            };
            const createdPayment = await api.createPayment(newPayment);
            dispatch({ type: 'ADD_PAYMENT', payload: createdPayment });
            return { success: true, payment: createdPayment };
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
            return { success: false, error: error.message };
        }
    };

    // Update existing payment
    const updatePayment = async (id, paymentData) => {
        dispatch({ type: 'FETCH_START' });
        try {
            const updatedPayment = await api.updatePayment(id, paymentData);
            dispatch({ type: 'UPDATE_PAYMENT', payload: updatedPayment });
            return { success: true, payment: updatedPayment };
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
            return { success: false, error: error.message };
        }
    };

    // Delete payment
    const deletePayment = async (id) => {
        dispatch({ type: 'FETCH_START' });
        try {
            await api.deletePayment(id);
            dispatch({ type: 'DELETE_PAYMENT', payload: id });
            return { success: true };
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
            return { success: false, error: error.message };
        }
    };

    // Set filters
    const setFilters = (filters) => {
        dispatch({ type: 'SET_FILTERS', payload: filters });
    };

    // Clear error
    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    // Get unique semesters and courses for filter options
    const getUniqueSemesters = () => {
        return [...new Set(state.payments.map(p => p.semester))].sort();
    };

    const getUniqueCourses = () => {
        return [...new Set(state.payments.map(p => p.courseName))].sort();
    };

    // Context value
    const contextValue = {
        // State
        payments: state.filteredPayments,
        allPayments: state.payments,
        isLoading: state.isLoading,
        error: state.error,
        filters: state.filters,
        totalAmount: state.totalAmount,
        
        // Actions
        fetchPayments,
        addPayment,
        updatePayment,
        deletePayment,
        setFilters,
        clearError,
        getUniqueSemesters,
        getUniqueCourses,
    };

    return (
        <PaymentContext.Provider value={contextValue}>
            {children}
        </PaymentContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng PaymentContext dễ dàng hơn
export const usePayment = () => useContext(PaymentContext);

