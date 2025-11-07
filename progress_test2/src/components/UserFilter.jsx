import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';

const UserFilter = ({ filters, onFilterChange }) => {
    return (
        <Card className="mb-4 shadow-sm">
            <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
            <Card.Body>
                <Form>
                    <Row className="g-3">
                        {/* Search by username or fullName */}
                        <Col xs={12} lg={4}>
                            <Form.Group>
                                <Form.Label>Tìm kiếm (Username/Full Name)</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Search by username or full name"
                                    value={filters.search || ''}
                                    onChange={(e) => onFilterChange('search', e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        
                        {/* Filter by Role */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Role</Form.Label>
                                <Form.Select
                                    value={filters.role || ''}
                                    onChange={(e) => onFilterChange('role', e.target.value)}
                                >
                                    <option value="">All Roles</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Filter by Status */}
                        <Col xs={6} md={4} lg={2}>
                            <Form.Group>
                                <Form.Label>Lọc theo Status</Form.Label>
                                <Form.Select
                                    value={filters.status || ''}
                                    onChange={(e) => onFilterChange('status', e.target.value)}
                                >
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="blocked">Blocked</option>
                                    <option value="locked">Locked</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        
                        {/* Sorting */}
                        <Col xs={12} md={4} lg={4}>
                            <Form.Group>
                                <Form.Label>Sắp xếp theo:</Form.Label>
                                <Form.Select
                                    value={filters.sortBy || 'id_asc'}
                                    onChange={(e) => onFilterChange('sortBy', e.target.value)}
                                >
                                    <option value="id_asc">ID ascending</option>
                                    <option value="id_desc">ID descending</option>
                                    <option value="username_asc">Username ascending</option>
                                    <option value="username_desc">Username descending</option>
                                    <option value="fullName_asc">Full Name ascending</option>
                                    <option value="fullName_desc">Full Name descending</option>
                                    <option value="role_asc">Role ascending</option>
                                    <option value="role_desc">Role descending</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default UserFilter;

