//UserTable.jsx hiển thị danh sách users dưới dạng bảng
import React from 'react';
import { Table, Button, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaEye, FaBan, FaUnlock } from 'react-icons/fa';
import ConfirmModal from './ConfirmModal';

const UserTable = ({ users, isLoading, error, onViewDetails, onBanAccount, onUnbanAccount }) => {
    const [showBanModal, setShowBanModal] = React.useState(false);
    const [showUnbanModal, setShowUnbanModal] = React.useState(false);
    const [userToBan, setUserToBan] = React.useState(null);
    const [userToUnban, setUserToUnban] = React.useState(null);

    // Handle ban account
    const handleBanClick = (user) => {
        setUserToBan(user);
        setShowBanModal(true);
    };

    const handleConfirmBan = async () => {
        if (userToBan) {
            await onBanAccount(userToBan.id);
            setShowBanModal(false);
            setUserToBan(null);
        }
    };

    const handleCancelBan = () => {
        setShowBanModal(false);
        setUserToBan(null);
    };

    // Handle unban account
    const handleUnbanClick = (user) => {
        setUserToUnban(user);
        setShowUnbanModal(true);
    };

    const handleConfirmUnban = async () => {
        if (userToUnban) {
            await onUnbanAccount(userToUnban.id);
            setShowUnbanModal(false);
            setUserToUnban(null);
        }
    };

    const handleCancelUnban = () => {
        setShowUnbanModal(false);
        setUserToUnban(null);
    };

    // Get badge variant for status
    const getStatusBadge = (status) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'blocked':
                return 'danger';
            case 'locked':
                return 'warning';
            default:
                return 'secondary';
        }
    };

    // Get badge variant for role
    const getRoleBadge = (role) => {
        return role === 'admin' ? 'primary' : 'info';
    };

    if (isLoading) {
        return (
            <Card>
                <Card.Body className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Card.Body>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <Card.Body>
                    <Alert variant="danger">{error}</Alert>
                </Card.Body>
            </Card>
        );
    }

    return (
        <>
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5">
                    User List
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Avatar</th>
                                <th>Username</th>
                                <th>Full Name</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>
                                            {user.avatar ? (
                                                <img
                                                    src={user.avatar}
                                                    alt={user.fullName}
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        objectFit: 'cover'
                                                    }}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        const fallback = e.target.parentElement.querySelector('.avatar-fallback');
                                                        if (fallback) fallback.style.display = 'block';
                                                    }}
                                                />
                                            ) : null}
                                            <div 
                                                className="avatar-fallback"
                                                style={{ 
                                                    display: user.avatar ? 'none' : 'block',
                                                    width: '40px', 
                                                    height: '40px', 
                                                    borderRadius: '50%', 
                                                    backgroundColor: '#6c757d', 
                                                    color: 'white',
                                                    textAlign: 'center', 
                                                    lineHeight: '40px',
                                                    fontSize: '16px',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {user.fullName?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                        </td>
                                        <td>{user.username}</td>
                                        <td>{user.fullName}</td>
                                        <td>
                                            <Badge bg={getRoleBadge(user.role)}>
                                                {user.role}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Badge bg={getStatusBadge(user.status)}>
                                                {user.status}
                                            </Badge>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Button
                                                    variant="info"
                                                    size="sm"
                                                    onClick={() => onViewDetails(user.id)}
                                                    title="View Details"
                                                >
                                                    <FaEye /> View Details
                                                </Button>
                                                {user.status === 'blocked' ? (
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        onClick={() => handleUnbanClick(user)}
                                                        title="Unban Account"
                                                    >
                                                        <FaUnlock /> Unban Account
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleBanClick(user)}
                                                        title="Ban Account"
                                                    >
                                                        <FaBan /> Ban Account
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* Ban Confirmation Modal */}
            <ConfirmModal
                show={showBanModal}
                title="Ban Account"
                message={`Are you sure you want to ban account "${userToBan?.username}"? This action will block the user from accessing the system.`}
                onConfirm={handleConfirmBan}
                onHide={handleCancelBan}
            />

            {/* Unban Confirmation Modal */}
            <ConfirmModal
                show={showUnbanModal}
                title="Unban Account"
                message={`Are you sure you want to unban account "${userToUnban?.username}"? This action will restore the user's access to the system.`}
                onConfirm={handleConfirmUnban}
                onHide={handleCancelUnban}
            />
        </>
    );
};

export default UserTable;

