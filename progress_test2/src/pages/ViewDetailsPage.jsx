//ViewDetailsPage.jsx là trang xem chi tiết payment
import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { usePayment } from '../contexts/PaymentContext';
import NavigationHeader from '../components/NavigationHeader';
import * as api from '../services/api';

const ViewDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { payments } = usePayment();
    const [payment, setPayment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayment = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Try to get from context first
                const paymentFromContext = payments.find(p => p.id === id);
                if (paymentFromContext) {
                    setPayment(paymentFromContext);
                } else {
                    // If not in context, fetch from API
                    const paymentData = await api.getPaymentById(id);
                    setPayment(paymentData);
                }
                setIsLoading(false);
            } catch (err) {
                setError(err.message || 'Failed to load payment details');
                setIsLoading(false);
            }
        };

        if (id) {
            fetchPayment();
        }
    }, [id, payments]);

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (isLoading) {
        return (
            <>
                <NavigationHeader />
                <Container className="mt-4">
                    <Card>
                        <Card.Body className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        );
    }

    if (error || !payment) {
        return (
            <>
                <NavigationHeader />
                <Container className="mt-4">
                    <Card>
                        <Card.Body>
                            <Alert variant="danger">
                                {error || 'Payment not found'}
                            </Alert>
                            <Button variant="primary" onClick={() => navigate('/home')}>
                                Back to Dashboard
                            </Button>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        );
    }

    return (
        <>
            <NavigationHeader />
            <Container className="mt-4">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8}>
                        <Card className="shadow-sm">
                            <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
                                <span>Payment Details</span>
                                <div className="d-flex gap-2">
                                    <Button
                                        variant="warning"
                                        onClick={() => navigate(`/payments/${id}/edit`)}
                                    >
                                        Edit
                                    </Button>
                                    <Button variant="secondary" onClick={() => navigate('/home')}>
                                        Back
                                    </Button>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Row className="mb-3">
                                    <Col sm={4}>
                                        <strong>Semester:</strong>
                                    </Col>
                                    <Col sm={8}>
                                        {payment.semester || 'N/A'}
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col sm={4}>
                                        <strong>Course Name:</strong>
                                    </Col>
                                    <Col sm={8}>
                                        {payment.courseName || 'N/A'}
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col sm={4}>
                                        <strong>Amount:</strong>
                                    </Col>
                                    <Col sm={8}>
                                        {formatCurrency(payment.amount)}
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col sm={4}>
                                        <strong>Date:</strong>
                                    </Col>
                                    <Col sm={8}>
                                        {formatDate(payment.date)}
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col sm={4}>
                                        <strong>Payment ID:</strong>
                                    </Col>
                                    <Col sm={8}>
                                        {payment.id}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ViewDetailsPage;

