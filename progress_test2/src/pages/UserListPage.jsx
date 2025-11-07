//UserListPage.jsx là trang quản lý danh sách users
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import ViewUserDetailsModal from '../components/ViewUserDetailsModal';
import * as api from '../services/api';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        role: '',
        status: '',
        sortBy: 'id_asc'
    });
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const usersData = await api.getUsers();
                setUsers(usersData);
            } catch (err) {
                setError(err.message || 'Failed to load users');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filter and sort users
    useEffect(() => {
        let filtered = [...users];

        // Apply search filter
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(
                user =>
                    user.username.toLowerCase().includes(searchTerm) ||
                    user.fullName.toLowerCase().includes(searchTerm)
            );
        }

        // Apply role filter
        if (filters.role) {
            filtered = filtered.filter(user => user.role === filters.role);
        }

        // Apply status filter
        if (filters.status) {
            filtered = filtered.filter(user => user.status === filters.status);
        }

        // Apply sorting
        if (filters.sortBy) {
            const [field, order] = filters.sortBy.split('_');
            filtered.sort((a, b) => {
                let aValue = a[field];
                let bValue = b[field];

                // Handle string comparison
                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                if (order === 'asc') {
                    return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                } else {
                    return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
                }
            });
        }

        setFilteredUsers(filtered);
    }, [users, filters]);

    // Handle filter change
    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle view details
    const handleViewDetails = (userId) => {
        setSelectedUserId(userId);
        setShowDetailsModal(true);
    };

    // Handle ban account
    const handleBanAccount = async (userId) => {
        try {
            // Find the user to update
            const user = users.find(u => u.id === userId);
            if (!user) {
                alert('User not found');
                return;
            }

            // Update user status to blocked
            const updatedUser = { ...user, status: 'blocked' };
            await api.updateUser(userId, updatedUser);

            // Update local state
            setUsers(prevUsers =>
                prevUsers.map(u => (u.id === userId ? updatedUser : u))
            );

            alert(`Account "${user.username}" has been banned successfully.`);
        } catch (err) {
            alert(`Failed to ban account: ${err.message}`);
        }
    };

    // Handle unban account
    const handleUnbanAccount = async (userId) => {
        try {
            // Find the user to update
            const user = users.find(u => u.id === userId);
            if (!user) {
                alert('User not found');
                return;
            }

            // Update user status to active
            const updatedUser = { ...user, status: 'active' };
            await api.updateUser(userId, updatedUser);

            // Update local state
            setUsers(prevUsers =>
                prevUsers.map(u => (u.id === userId ? updatedUser : u))
            );

            alert(`Account "${user.username}" has been unbanned successfully.`);
        } catch (err) {
            alert(`Failed to unban account: ${err.message}`);
        }
    };

    // Close details modal
    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
        setSelectedUserId(null);
    };

    return (
        <>
            <NavigationHeader />
            <Container className="mt-4">
                <UserFilter filters={filters} onFilterChange={handleFilterChange} />
                <UserTable
                    users={filteredUsers}
                    isLoading={isLoading}
                    error={error}
                    onViewDetails={handleViewDetails}
                    onBanAccount={handleBanAccount}
                    onUnbanAccount={handleUnbanAccount}
                />
            </Container>

            {/* View User Details Modal */}
            {selectedUserId && (
                <ViewUserDetailsModal
                    show={showDetailsModal}
                    userId={selectedUserId}
                    onHide={handleCloseDetailsModal}
                    onUserUpdated={() => {
                        // Refresh users after update
                        const refreshUsers = async () => {
                            try {
                                const usersData = await api.getUsers();
                                setUsers(usersData);
                            } catch (err) {
                                console.error('Failed to refresh users:', err);
                            }
                        };
                        refreshUsers();
                    }}
                />
            )}
        </>
    );
};

export default UserListPage;

