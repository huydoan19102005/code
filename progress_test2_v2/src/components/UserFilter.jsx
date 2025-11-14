import React, { useState } from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';

const UserFilter = ({ onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('id');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onFilterChange({
            searchTerm: value,
            roleFilter,
            statusFilter,
            sortBy
        });
    };

    const handleRoleFilterChange = (e) => {
        const value = e.target.value;
        setRoleFilter(value);
        onFilterChange({
            searchTerm,
            roleFilter: value,
            statusFilter,
            sortBy
        });
    };

    const handleStatusFilterChange = (e) => {
        const value = e.target.value;
        setStatusFilter(value);
        onFilterChange({
            searchTerm,
            roleFilter,
            statusFilter: value,
            sortBy
        });
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortBy(value);
        onFilterChange({
            searchTerm,
            roleFilter,
            statusFilter,
            sortBy: value
        });
    };

    return (
        <div className="mb-4 p-3 bg-light rounded">
            <Row>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Search</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Search by username or full name..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Select value={roleFilter} onChange={handleRoleFilterChange}>
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select value={statusFilter} onChange={handleStatusFilterChange}>
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="blocked">Blocked</option>
                            <option value="locked">Locked</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group>
                        <Form.Label>Sort By</Form.Label>
                        <Form.Select value={sortBy} onChange={handleSortChange}>
                            <option value="id">ID</option>
                            <option value="username">Username</option>
                            <option value="fullName">Full Name</option>
                            <option value="role">Role</option>
                            <option value="status">Status</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
};

export default UserFilter;

