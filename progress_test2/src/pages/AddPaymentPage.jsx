//AddPaymentPage.jsx là trang thêm payment mới
import React, { useReducer, useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../components/NavigationHeader';
import ConfirmModal from '../components/ConfirmModal';

// Initial form state
const initialFormState = {
    formData: {
        semester: '',
        courseName: '',
        amount: '',
        date: new Date().toISOString().split('T')[0], // Today's date
    },
    errors: {},
    showSuccessModal: false,
};

// Form reducer
function formReducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value,
                },
            };
        case 'SET_ERROR':
            return {
                ...state,
                errors: { ...state.errors, [action.field]: action.message },
            };
        case 'CLEAR_ERROR':
            const { [action.field]: removed, ...restErrors } = state.errors;
            return {
                ...state,
                errors: restErrors,
            };
        case 'SET_ERRORS':
            return {
                ...state,
                errors: action.errors,
            };
        case 'SHOW_SUCCESS_MODAL':
            return {
                ...state,
                showSuccessModal: true,
            };
        case 'HIDE_SUCCESS_MODAL':
            return {
                ...state,
                showSuccessModal: false,
            };
        case 'RESET_FORM':
            return initialFormState;
        default:
            return state;
    }
}

const AddPaymentPage = () => {
    const navigate = useNavigate();
    const { addPayment, isLoading, error } = usePayment();
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'SET_FIELD', field: name, value });

        // Clear error for this field
        if (formState.errors[name]) {
            dispatch({ type: 'CLEAR_ERROR', field: name });
        }

        // Real-time validation
        let message = '';
        if (name === 'semester' && !value.trim()) {
            message = 'Semester is required.';
        } else if (name === 'courseName' && !value.trim()) {
            message = 'Course name is required.';
        } else if (name === 'amount') {
            if (!value.trim()) {
                message = 'Amount is required.';
            } else if (isNaN(value) || parseFloat(value) <= 0) {
                message = 'Amount must be a positive number.';
            }
        } else if (name === 'date' && !value.trim()) {
            message = 'Date is required.';
        }

        if (message) {
            dispatch({ type: 'SET_ERROR', field: name, message });
        }
    };

    // Validate form
    const validateForm = () => {
        const errors = {};
        const { semester, courseName, amount, date } = formState.formData;

        if (!semester.trim()) {
            errors.semester = 'Semester is required.';
        }
        if (!courseName.trim()) {
            errors.courseName = 'Course name is required.';
        }
        if (!amount.trim()) {
            errors.amount = 'Amount is required.';
        } else if (isNaN(amount) || parseFloat(amount) <= 0) {
            errors.amount = 'Amount must be a positive number.';
        }
        if (!date.trim()) {
            errors.date = 'Date is required.';
        }

        return errors;
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        dispatch({ type: 'SET_ERRORS', errors: validationErrors });

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const paymentData = {
                semester: formState.formData.semester.trim(),
                courseName: formState.formData.courseName.trim(),
                amount: parseFloat(formState.formData.amount),
                date: formState.formData.date,
            };

            const result = await addPayment(paymentData);

            if (result.success) {
                dispatch({ type: 'SHOW_SUCCESS_MODAL' });
            } else {
                alert(`Failed to add payment: ${result.error}`);
            }
        } catch (err) {
            console.error('Add payment error:', err);
            alert('An error occurred while adding the payment.');
        }
    };

    // Handle reset
    const handleReset = () => {
        dispatch({ type: 'RESET_FORM' });
    };

    // Handle close success modal
    const handleCloseSuccessModal = () => {
        dispatch({ type: 'HIDE_SUCCESS_MODAL' });
        dispatch({ type: 'RESET_FORM' });
        navigate('/home');
    };

    // Handle cancel
    const handleCancel = () => {
        navigate('/home');
    };

    return (
        <>
            <NavigationHeader />
            <Container className="mt-4">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8}>
                        <Card>
                            <Card.Header>
                                <h3 className="text-center mb-0">Add New Payment</h3>
                            </Card.Header>
                            <Card.Body>
                                {error && (
                                    <Alert variant="danger" className="mb-3" dismissible>
                                        {error}
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit} noValidate>
                                    <Form.Group controlId="semester" className="mb-3">
                                        <Form.Label>Semester *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="semester"
                                            value={formState.formData.semester}
                                            onChange={handleChange}
                                            isInvalid={!!formState.errors.semester}
                                            placeholder="e.g., Fall 2025"
                                            disabled={isLoading}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formState.errors.semester}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="courseName" className="mb-3">
                                        <Form.Label>Course Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="courseName"
                                            value={formState.formData.courseName}
                                            onChange={handleChange}
                                            isInvalid={!!formState.errors.courseName}
                                            placeholder="e.g., Web Development"
                                            disabled={isLoading}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formState.errors.courseName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="amount" className="mb-3">
                                        <Form.Label>Amount (VND) *</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="amount"
                                            value={formState.formData.amount}
                                            onChange={handleChange}
                                            isInvalid={!!formState.errors.amount}
                                            placeholder="e.g., 3500000"
                                            min="0"
                                            step="1000"
                                            disabled={isLoading}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formState.errors.amount}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="date" className="mb-3">
                                        <Form.Label>Date *</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={formState.formData.date}
                                            onChange={handleChange}
                                            isInvalid={!!formState.errors.date}
                                            disabled={isLoading}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formState.errors.date}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            style={{ flex: 1 }}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Spinner
                                                        size="sm"
                                                        animation="border"
                                                        role="status"
                                                        className="me-2"
                                                    />
                                                    Adding...
                                                </>
                                            ) : (
                                                'Add Payment'
                                            )}
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            type="button"
                                            style={{ flex: 1 }}
                                            onClick={handleReset}
                                            disabled={isLoading}
                                        >
                                            Reset
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            type="button"
                                            style={{ flex: 1 }}
                                            onClick={handleCancel}
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Success Modal */}
                <ConfirmModal
                    show={formState.showSuccessModal}
                    title="Payment Added Successfully!"
                    message="The payment has been added successfully."
                    onConfirm={handleCloseSuccessModal}
                    onHide={handleCloseSuccessModal}
                />
            </Container>
        </>
    );
};

export default AddPaymentPage;

