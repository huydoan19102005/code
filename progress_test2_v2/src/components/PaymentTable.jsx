//PaymentTable.jsx hiển thị danh sách thanh toán và tổng số tiền
import React, { useState } from 'react';
import { Table, Card, Badge, Spinner, Button, ButtonGroup } from 'react-bootstrap';
import { usePayment } from '../hooks/usePayment';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const PaymentTable = () => {
    const { payments, totalAmount, isLoading, deletePayment } = usePayment();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    // Format số tiền
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    // Format ngày
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    // Xử lý View Details
    const handleViewDetails = (paymentId) => {
        navigate(`/payment/${paymentId}`);
    };

    // Xử lý Edit
    const handleEdit = (paymentId) => {
        navigate(`/payment/${paymentId}/edit`);
    };

    // Xử lý Delete
    const handleDeleteClick = (payment) => {
        setSelectedPayment(payment);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedPayment) {
            const result = await deletePayment(selectedPayment.id);
            if (result.success) {
                setShowDeleteModal(false);
                setSelectedPayment(null);
            }
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedPayment(null);
    };

    if (isLoading) {
        return (
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <div className="text-center">
                        <Spinner animation="border" role="status" className="me-2" />
                        Loading...
                    </div>
                </Card.Body>
            </Card>
        );
    }

    return (
        <>
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                    <span>Payment List</span>
                    <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => navigate('/payment/add')}
                    >
                        + Add Payment
                    </Button>
                </Card.Header>
                <Card.Body>
                    {payments.length === 0 ? (
                        <div className="text-center text-muted py-4">
                            No payments found
                        </div>
                    ) : (
                        <>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Semester</th>
                                        <th>Course</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment, index) => (
                                        <tr key={payment.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Badge bg="info">{payment.semester}</Badge>
                                            </td>
                                            <td>{payment.courseName}</td>
                                            <td className="text-end fw-bold">
                                                {formatAmount(payment.amount)}
                                            </td>
                                            <td>{formatDate(payment.date)}</td>
                                            <td>
                                                <ButtonGroup size="sm">
                                                    <Button
                                                        variant="outline-primary"
                                                        onClick={() => handleViewDetails(payment.id)}
                                                        title="View Details"
                                                    >
                                                        <FaEye />
                                                    </Button>
                                                    <Button
                                                        variant="outline-warning"
                                                        onClick={() => handleEdit(payment.id)}
                                                        title="Edit"
                                                    >
                                                        <FaEdit />
                                                    </Button>
                                                    <Button
                                                        variant="outline-danger"
                                                        onClick={() => handleDeleteClick(payment)}
                                                        title="Delete"
                                                    >
                                                        <FaTrash />
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="table-primary">
                                        <td colSpan="3" className="text-end fw-bold">
                                            Total Amount:
                                        </td>
                                        <td className="text-end fw-bold fs-5">
                                            {formatAmount(totalAmount)}
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </>
                    )}
                </Card.Body>
            </Card>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                show={showDeleteModal}
                title="Confirm Delete"
                message={`Are you sure you want to delete payment for "${selectedPayment?.courseName}"?`}
                onConfirm={handleConfirmDelete}
                onHide={handleCancelDelete}
                confirmText="Delete"
                confirmVariant="danger"
            />
        </>
    );
};

export default PaymentTable;
