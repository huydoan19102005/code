//ViewUserDetailsModal.jsx hiển thị chi tiết user trong modal
import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
import * as api from '../services/api';

const ViewUserDetailsModal = ({ show, userId, onHide, onUserUpdated }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (show && userId) {
            fetchUserDetails();
        }
    }, [show, userId]);

    const fetchUserDetails = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const userData = await api.getUserById(userId);
            setUser(userData);
        } catch (err) {
            setError(err.message || 'Failed to load user details');
        } finally {
            setIsLoading(false);
        }
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

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : user ? (
                    <>
                        {user.avatar && (
                            <div className="text-center mb-3">
                                <img
                                    src={user.avatar}
                                    alt={user.fullName}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                        <Row className="mb-3">
                            <Col sm={4}>
                                <strong>ID:</strong>
                            </Col>
                            <Col sm={8}>
                                {user.id}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={4}>
                                <strong>Username:</strong>
                            </Col>
                            <Col sm={8}>
                                {user.username}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={4}>
                                <strong>Full Name:</strong>
                            </Col>
                            <Col sm={8}>
                                {user.fullName}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={4}>
                                <strong>Role:</strong>
                            </Col>
                            <Col sm={8}>
                                <Badge bg={getRoleBadge(user.role)}>
                                    {user.role}
                                </Badge>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={4}>
                                <strong>Status:</strong>
                            </Col>
                            <Col sm={8}>
                                <Badge bg={getStatusBadge(user.status)}>
                                    {user.status}
                                </Badge>
                            </Col>
                        </Row>
                        {user.email && (
                            <Row className="mb-3">
                                <Col sm={4}>
                                    <strong>Email:</strong>
                                </Col>
                                <Col sm={8}>
                                    {user.email}
                                </Col>
                            </Row>
                        )}
                    </>
                ) : null}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewUserDetailsModal;

