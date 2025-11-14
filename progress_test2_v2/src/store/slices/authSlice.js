import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

// Khôi phục user từ localStorage
const getInitialState = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            return {
                isAuthenticated: true,
                user: user,
                isLoading: false,
                error: null,
            };
        } catch (error) {
            localStorage.removeItem('user');
        }
    }
    return {
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
    };
};

// Async thunk cho login
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ usernameOrEmail, password }, { rejectWithValue }) => {
        try {
            const accounts = await api.getUsers();
            const user = accounts.find(
                (acc) =>
                    (acc.username === usernameOrEmail || (acc.email && acc.email === usernameOrEmail)) &&
                    acc.password === password
            );

            if (user) {
                // Kiểm tra role và status: chỉ cho phép admin với status active
                if (user.role !== 'admin' || user.status !== 'active') {
                    return rejectWithValue('Tài khoản bị khóa, bạn không có quyền truy cập...');
                }
                // Lưu user vào localStorage
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            } else {
                return rejectWithValue('Invalid username/email or password!');
            }
        } catch (error) {
            return rejectWithValue(error.message || 'Login failed due to a network error.');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        logout: (state) => {
            localStorage.removeItem('user');
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        restoreUser: (state) => {
            const savedUser = localStorage.getItem('user');
            if (savedUser && !state.isAuthenticated) {
                try {
                    const user = JSON.parse(savedUser);
                    state.isAuthenticated = true;
                    state.user = user;
                } catch (error) {
                    localStorage.removeItem('user');
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, clearError, restoreUser } = authSlice.actions;
export default authSlice.reducer;

