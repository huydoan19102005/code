import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../services/api';

// Async thunks
export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const users = await api.getUsers();
            return users;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ id, user }, { rejectWithValue }) => {
        try {
            const updatedUser = await api.updateUser(id, user);
            return updatedUser;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUserById = createAsyncThunk(
    'user/getUserById',
    async (id, { rejectWithValue }) => {
        try {
            const user = await api.getUserById(id);
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    users: [],
    filteredUsers: [],
    selectedUser: null,
    isLoading: false,
    error: null,
    filters: {
        searchTerm: '',
        roleFilter: 'all',
        statusFilter: 'all',
    },
    sortBy: 'id',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserFilter: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setUserSort: (state, action) => {
            state.sortBy = action.payload;
        },
        applyUserFilters: (state, action) => {
            const { users, filters, sortBy } = action.payload;
            let filtered = [...users];

            // Search filter
            if (filters.searchTerm) {
                const searchLower = filters.searchTerm.toLowerCase();
                filtered = filtered.filter(
                    (user) =>
                        user.username.toLowerCase().includes(searchLower) ||
                        user.fullName.toLowerCase().includes(searchLower)
                );
            }

            // Role filter
            if (filters.roleFilter !== 'all') {
                filtered = filtered.filter((user) => user.role === filters.roleFilter);
            }

            // Status filter
            if (filters.statusFilter !== 'all') {
                filtered = filtered.filter((user) => user.status === filters.statusFilter);
            }

            // Sort
            filtered.sort((a, b) => {
                switch (sortBy) {
                    case 'username':
                        return a.username.localeCompare(b.username);
                    case 'fullName':
                        return a.fullName.localeCompare(b.fullName);
                    case 'role':
                        return a.role.localeCompare(b.role);
                    case 'status':
                        return a.status.localeCompare(b.status);
                    case 'id':
                    default:
                        return parseInt(a.id) - parseInt(b.id);
                }
            });

            state.filteredUsers = filtered;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch users
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
                state.error = null;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update user
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(u => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            // Get user by id
            .addCase(getUserById.fulfilled, (state, action) => {
                state.selectedUser = action.payload;
            });
    },
});

export const { 
    setUserFilter, 
    setUserSort, 
    applyUserFilters, 
    setSelectedUser, 
    clearSelectedUser 
} = userSlice.actions;
export default userSlice.reducer;

