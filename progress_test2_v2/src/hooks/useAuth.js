import { useAppSelector, useAppDispatch } from '../store/hooks';
import { loginUser, logout, clearError, restoreUser } from '../store/slices/authSlice';
import { useEffect } from 'react';

// Custom hook để thay thế useAuth từ AuthContext
export const useAuth = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state) => state.auth);

    // Restore user từ localStorage khi component mount
    useEffect(() => {
        dispatch(restoreUser());
    }, [dispatch]);

    return {
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        loading: auth.isLoading,
        error: auth.error,
        login: async ({ usernameOrEmail, password }) => {
            const result = await dispatch(loginUser({ usernameOrEmail, password }));
            if (loginUser.fulfilled.match(result)) {
                return { success: true, user: result.payload };
            } else {
                return { success: false, error: result.payload };
            }
        },
        logout: () => dispatch(logout()),
        clearError: () => dispatch(clearError()),
    };
};

