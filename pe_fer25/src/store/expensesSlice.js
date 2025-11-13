import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { expensesAPI } from '../services/api';

// Async thunks
export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async (userId) => {
    const data = await expensesAPI.getExpensesByUserId(userId);
    return data;
  }
);

export const addExpenseAsync = createAsyncThunk(
  'expenses/addExpense',
  async (expense) => {
    const data = await expensesAPI.addExpense(expense);
    return data;
  }
);

export const updateExpenseAsync = createAsyncThunk(
  'expenses/updateExpense',
  async ({ id, expense }) => {
    const data = await expensesAPI.updateExpense(id, expense);
    return data;
  }
);

export const deleteExpenseAsync = createAsyncThunk(
  'expenses/deleteExpense',
  async (id) => {
    await expensesAPI.deleteExpense(id);
    return id;
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    expenses: [],
    loading: false,
    error: null,
    selectedCategory: 'All categories',
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setEditingExpense: (state, action) => {
      state.editingExpense = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch expenses
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add expense
      .addCase(addExpenseAsync.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })
      // Update expense
      .addCase(updateExpenseAsync.fulfilled, (state, action) => {
        const index = state.expenses.findIndex(
          (exp) => exp.id === action.payload.id
        );
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      // Delete expense
      .addCase(deleteExpenseAsync.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(
          (exp) => exp.id !== action.payload
        );
      });
  },
});

export const { setSelectedCategory, setEditingExpense } = expensesSlice.actions;
export default expensesSlice.reducer;

