//PaymentTable.jsx hiển thị danh sách payments dưới dạng bảng
import React from 'react';
import { Table, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import ConfirmModal from './ConfirmModal';

const PaymentTable = () => {
    const { payments, isLoading, error, totalAmount, deletePayment } = usePayment();
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [paymentToDelete, setPaymentToDelete] = React.useState(null);

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
            month: '2-digit',
            day: '2-digit',
        });
    };

    // Handle view details
    const handleViewDetails = (paymentId) => {
        navigate(`/payments/${paymentId}`);
    };

    // Handle edit
    const handleEdit = (paymentId) => {
        navigate(`/payments/${paymentId}/edit`);
    };

    // Handle delete
    const handleDeleteClick = (paymentId) => {
        setPaymentToDelete(paymentId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (paymentToDelete) {
            const result = await deletePayment(paymentToDelete);
            if (result.success) {
                setShowDeleteModal(false);
                setPaymentToDelete(null);
            } else {
                alert(`Failed to delete payment: ${result.error}`);
            }
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setPaymentToDelete(null);
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
                <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                    <span>Payment List</span>
                    <Button variant="primary" onClick={() => navigate('/payments/add')}>
                        Add New Payment
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Semester</th>
                                <th>Course</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No payments found
                                    </td>
                                </tr>
                            ) : (
                                payments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td>{payment.semester}</td>
                                        <td>{payment.courseName}</td>
                                        <td>{formatCurrency(payment.amount)}</td>
                                        <td>{formatDate(payment.date)}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Button
                                                    variant="info"
                                                    size="sm"
                                                    onClick={() => handleViewDetails(payment.id)}
                                                    title="View Details"
                                                >
                                                    <FaEye />
                                                </Button>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    onClick={() => handleEdit(payment.id)}
                                                    title="Edit"
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteClick(payment.id)}
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="3" className="text-end">Total Amount:</th>
                                <th>{formatCurrency(totalAmount)}</th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </Table>
                </Card.Body>
            </Card>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                show={showDeleteModal}
                title="Delete Payment"
                message="Are you sure you want to delete this payment? This action cannot be undone."
                onConfirm={handleConfirmDelete}
                onHide={handleCancelDelete}
            />
        </>
    );
};

export default PaymentTable;

