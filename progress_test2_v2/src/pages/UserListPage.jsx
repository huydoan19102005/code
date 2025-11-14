import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import NavigationHeader from '../components/NavigationHeader';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import * as api from '../services/api';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const usersData = await api.getUsers();
            setUsers(usersData);
            setFilteredUsers(usersData);
        } catch (err) {
            setError('Failed to load users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filters) => {
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
            switch (filters.sortBy) {
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

        setFilteredUsers(filtered);
    };

    const handleBanUser = async (userId) => {
        try {
            const user = users.find((u) => u.id === userId);
            if (!user) return;

            const updatedUser = {
                ...user,
                status: 'blocked'
            };

            await api.updateUser(userId, updatedUser);
            await loadUsers(); // Reload users to reflect changes
        } catch (err) {
            setError('Failed to ban user');
            console.error(err);
        }
    };

    const handleViewDetails = async (userId) => {
        try {
            const user = await api.getUserById(userId);
            setSelectedUser(user);
            setShowDetailsModal(true);
        } catch (err) {
            setError('Failed to load user details');
            console.error(err);
        }
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
        setSelectedUser(null);
    };

    if (loading) {
        return (
            <>
                <NavigationHeader />
                <Container className="mt-4">
                    <div className="text-center">
                        <p>Loading users...</p>
                    </div>
                </Container>
            </>
        );
    }

    return (
        <>
            <NavigationHeader />
            <Container className="mt-4">
                <h2 className="mb-4">User Management</h2>
                
                {error && (
                    <Alert variant="danger" dismissible onClose={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                <UserFilter onFilterChange={handleFilterChange} />
                <UserTable
                    users={filteredUsers}
                    onBanUser={handleBanUser}
                    onViewDetails={handleViewDetails}
                />

                <ConfirmModal
                    show={showDetailsModal}
                    title="User Details"
                    message={
                        selectedUser ? (
                            <div>
                                <div className="text-center mb-3">
                                    {selectedUser.avatar ? (
                                        <img
                                            src={selectedUser.avatar}
                                            alt={selectedUser.fullName}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                borderRadius: '50%',
                                                objectFit: 'cover',
                                                border: '3px solid #007bff'
                                            }}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                const fallback = e.target.nextElementSibling;
                                                if (fallback) fallback.style.display = 'block';
                                            }}
                                        />
                                    ) : null}
                                    <div
                                        style={{
                                            display: selectedUser.avatar ? 'none' : 'inline-block',
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            backgroundColor: '#6c757d',
                                            color: 'white',
                                            textAlign: 'center',
                                            lineHeight: '100px',
                                            fontSize: '36px',
                                            fontWeight: 'bold',
                                            margin: '0 auto'
                                        }}
                                    >
                                        {selectedUser.fullName?.charAt(0)?.toUpperCase() || selectedUser.username?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                </div>
                                <p><strong>ID:</strong> {selectedUser.id}</p>
                                <p><strong>Username:</strong> {selectedUser.username}</p>
                                <p><strong>Full Name:</strong> {selectedUser.fullName}</p>
                                <p><strong>Role:</strong> {selectedUser.role}</p>
                                <p><strong>Status:</strong> {selectedUser.status}</p>
                                {selectedUser.email && (
                                    <p><strong>Email:</strong> {selectedUser.email}</p>
                                )}
                            </div>
                        ) : null
                    }
                    onConfirm={handleCloseDetailsModal}
                    onHide={handleCloseDetailsModal}
                    confirmText="Close"
                    cancelText=""
                />
            </Container>
        </>
    );
};

export default UserListPage;

