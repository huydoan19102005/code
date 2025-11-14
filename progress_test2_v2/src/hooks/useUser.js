import { useAppSelector, useAppDispatch } from '../store/hooks';
import { 
    fetchUsers, 
    updateUser, 
    getUserById,
    setUserFilter,
    setUserSort,
    applyUserFilters,
    setSelectedUser,
    clearSelectedUser
} from '../store/slices/userSlice';
import { useEffect } from 'react';

// Custom hook để quản lý users với Redux
export const useUser = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    // Fetch users khi component mount
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // Áp dụng filters khi users, filters, hoặc sortBy thay đổi
    useEffect(() => {
        if (user.users.length > 0) {
            dispatch(applyUserFilters({
                users: user.users,
                filters: user.filters,
                sortBy: user.sortBy
            }));
        }
    }, [dispatch, user.users, user.filters, user.sortBy]);

    return {
        // State
        users: user.filteredUsers,
        allUsers: user.users,
        selectedUser: user.selectedUser,
        isLoading: user.isLoading,
        error: user.error,
        filters: user.filters,
        sortBy: user.sortBy,

        // Actions
        fetchUsers: () => dispatch(fetchUsers()),
        updateUser: async (id, userData) => {
            const result = await dispatch(updateUser({ id, user: userData }));
            if (updateUser.fulfilled.match(result)) {
                return { success: true, user: result.payload };
            } else {
                return { success: false, error: result.payload };
            }
        },
        getUserById: async (id) => {
            const result = await dispatch(getUserById(id));
            if (getUserById.fulfilled.match(result)) {
                return { success: true, user: result.payload };
            } else {
                return { success: false, error: result.payload };
            }
        },
        setFilter: (filters) => dispatch(setUserFilter(filters)),
        setSort: (sortBy) => dispatch(setUserSort(sortBy)),
        setSelectedUser: (user) => dispatch(setSelectedUser(user)),
        clearSelectedUser: () => dispatch(clearSelectedUser()),
    };
};

