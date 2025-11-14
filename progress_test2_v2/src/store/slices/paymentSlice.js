import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

// Helper function để filter và sort payments
const applyFiltersAndSort = (payments, filters, sortBy, userId) => {
    // Lọc theo userId nếu có (so sánh cả string và number)
    let filtered = payments.filter(payment => 
        payment.userId === userId || 
        payment.userId === String(userId) || 
        String(payment.userId) === String(userId)
    );

    // Lọc theo search (semester hoặc course name)
    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(payment =>
            payment.semester.toLowerCase().includes(searchLower) ||
            payment.courseName.toLowerCase().includes(searchLower)
        );
    }

    // Lọc theo semester
    if (filters.semester) {
        filtered = filtered.filter(payment => payment.semester === filters.semester);
    }

    // Lọc theo course
    if (filters.course) {
        filtered = filtered.filter(payment => payment.courseName === filters.course);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
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

    // Tính total amount
    const total = filtered.reduce((sum, payment) => sum + payment.amount, 0);

    return { filtered, total };
};

// Async thunks
export const fetchPayments = createAsyncThunk(
    'payment/fetchPayments',
    async (_, { rejectWithValue }) => {
        try {
            const payments = await api.getPayments();
            return payments;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addPayment = createAsyncThunk(
    'payment/addPayment',
    async ({ payment, userId }, { rejectWithValue }) => {
        try {
            const newPayment = await api.addPayment({
                ...payment,
                userId: userId,
            });
            return newPayment;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updatePayment = createAsyncThunk(
    'payment/updatePayment',
    async ({ id, payment, existingPayment, userId }, { rejectWithValue }) => {
        try {
            const paymentData = {
                ...existingPayment,
                ...payment,
                id: id,
                userId: existingPayment?.userId || userId,
            };
            const updatedPayment = await api.updatePayment(id, paymentData);
            return updatedPayment;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deletePayment = createAsyncThunk(
    'payment/deletePayment',
    async (id, { rejectWithValue }) => {
        try {
            await api.deletePayment(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    payments: [],
    filteredPayments: [],
    isLoading: false,
    error: null,
    filters: {
        search: '',
        semester: '',
        course: '',
    },
    sortBy: 'course_asc',
    totalAmount: 0,
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filters[action.payload.field] = action.payload.value;
        },
        setSort: (state, action) => {
            state.sortBy = action.payload;
        },
        applyFiltersAndSort: (state, action) => {
            const { payments, filters, sortBy, userId } = action.payload;
            const result = applyFiltersAndSort(payments, filters, sortBy, userId);
            state.filteredPayments = result.filtered;
            state.totalAmount = result.total;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch payments
            .addCase(fetchPayments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.payments = action.payload;
                state.error = null;
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Add payment
            .addCase(addPayment.fulfilled, (state, action) => {
                state.payments.push(action.payload);
            })
            // Update payment
            .addCase(updatePayment.fulfilled, (state, action) => {
                const index = state.payments.findIndex(
                    p => p.id === action.payload.id || 
                    p.id === String(action.payload.id) || 
                    String(p.id) === String(action.payload.id)
                );
                if (index !== -1) {
                    state.payments[index] = action.payload;
                }
            })
            // Delete payment
            .addCase(deletePayment.fulfilled, (state, action) => {
                state.payments = state.payments.filter(p => {
                    const isMatch = p.id === action.payload || 
                                   p.id === String(action.payload) || 
                                   String(p.id) === String(action.payload);
                    return !isMatch;
                });
            });
    },
});

export const { setFilter, setSort, applyFiltersAndSort: applyFiltersAndSortAction } = paymentSlice.actions;
export default paymentSlice.reducer;

