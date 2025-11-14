import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import paymentReducer from './slices/paymentSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        payment: paymentReducer,
        user: userReducer,
    },
});

