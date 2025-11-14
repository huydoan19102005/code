//ViewPaymentDetailsPage.jsx - Trang xem chi tiết payment
import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { usePayment } from '../hooks/usePayment';
import NavigationHeader from '../components/NavigationHeader';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import ConfirmModal from '../components/ConfirmModal';

const ViewPaymentDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { allPayments, deletePayment } = usePayment();
    const [payment, setPayment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        // Tìm payment từ danh sách (so sánh cả string và number)
        const foundPayment = allPayments.find(p => 
            p.id === id || 
            p.id === String(id) || 
            String(p.id) === String(id)
        );
        if (foundPayment) {
            setPayment(foundPayment);
        }
        setIsLoading(false);
    }, [id, allPayments]);

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleEdit = () => {
        navigate(`/payment/${id}/edit`);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (payment) {
            const result = await deletePayment(payment.id);
            if (result.success) {
                navigate('/home');
            } else {
                alert(result.error || 'Failed to delete payment');
                setShowDeleteModal(false);
            }
        }
    };

    if (isLoading) {
        return (
            <>
                <NavigationHeader />
                <Container className="mt-4">
                    <div className="text-center">
                        <Spinner animation="border" role="status" />
                        <p className="mt-2">Loading...</p>
                    </div>
                </Container>
            </>
        );
    }

    if (!payment) {
        return (
            <>
                <NavigationHeader />
                <Container className="mt-4">
                    <Alert variant="danger">
                        Payment not found!
                    </Alert>
                    <Button variant="primary" onClick={() => navigate('/home')}>
                        <FaArrowLeft className="me-2" />
                        Back to Home
                    </Button>
                </Container>
            </>
        );
    }

    return (
        <>
            <NavigationHeader />
            <Container className="mt-4">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8} lg={6}>
                        <Card>
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <h4 className="mb-0">Payment Details</h4>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => navigate('/home')}
                                >
                                    <FaArrowLeft className="me-1" />
                                    Back
                                </Button>
                            </Card.Header>
                            <Card.Body>
                                <div className="mb-3">
                                    <strong>Payment ID:</strong>
                                    <p className="text-muted">{payment.id}</p>
                                </div>

                                <div className="mb-3">
                                    <strong>Semester:</strong>
                                    <p>
                                        <Badge bg="info" className="fs-6">
                                            {payment.semester}
                                        </Badge>
                                    </p>
                                </div>

                                <div className="mb-3">
                                    <strong>Course Name:</strong>
                                    <p className="text-muted fs-5">{payment.courseName}</p>
                                </div>

                                <div className="mb-3">
                                    <strong>Amount:</strong>
                                    <p className="text-muted fs-4 fw-bold text-primary">
                                        {formatAmount(payment.amount)}
                                    </p>
                                </div>

                                <div className="mb-3">
                                    <strong>Date:</strong>
                                    <p className="text-muted">{formatDate(payment.date)}</p>
                                </div>

                                <hr />

                                <div className="d-flex gap-2 justify-content-end">
                                    <Button
                                        variant="warning"
                                        onClick={handleEdit}
                                    >
                                        <FaEdit className="me-2" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={handleDeleteClick}
                                    >
                                        <FaTrash className="me-2" />
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <ConfirmModal
                show={showDeleteModal}
                title="Confirm Delete"
                message={`Are you sure you want to delete payment for "${payment?.courseName}"?`}
                onConfirm={handleConfirmDelete}
                onHide={() => setShowDeleteModal(false)}
                confirmText="Delete"
                confirmVariant="danger"
            />
        </>
    );
};

export default ViewPaymentDetailsPage;
