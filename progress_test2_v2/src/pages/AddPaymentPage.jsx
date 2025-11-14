//AddPaymentPage.jsx - Trang thêm payment mới
import React, { useReducer } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePayment } from '../hooks/usePayment';
import NavigationHeader from '../components/NavigationHeader';
import ConfirmModal from '../components/ConfirmModal';

const initialFormState = {
    formData: {
        semester: '',
        courseName: '',
        amount: '',
        date: new Date().toISOString().split('T')[0], // Ngày hiện tại
    },
    errors: {},
    showSuccessModal: false,
    isLoading: false,
};

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
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.value,
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
            return {
                ...initialFormState,
                formData: {
                    ...initialFormState.formData,
                    date: new Date().toISOString().split('T')[0],
                },
            };
        default:
            return state;
    }
}

const AddPaymentPage = () => {
    const navigate = useNavigate();
    const { addPayment } = usePayment();
    const [formState, dispatch] = useReducer(formReducer, initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'SET_FIELD', field: name, value });

        // Clear error khi user nhập
        if (formState.errors[name]) {
            dispatch({ type: 'CLEAR_ERROR', field: name });
        }

        // Validation real-time
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
        } else if (name === 'date' && !value) {
            message = 'Date is required.';
        }

        if (message) {
            dispatch({ type: 'SET_ERROR', field: name, message });
        }
    };

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
        if (!date) {
            errors.date = 'Date is required.';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        dispatch({ type: 'SET_ERRORS', errors: validationErrors });

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        dispatch({ type: 'SET_LOADING', value: true });

        try {
            const paymentData = {
                semester: formState.formData.semester.trim(),
                courseName: formState.formData.courseName.trim(),
                amount: parseFloat(formState.formData.amount),
                date: formState.formData.date,
            };

            const result = await addPayment(paymentData);

            if (result.success) {
                dispatch({ type: 'SET_LOADING', value: false });
                dispatch({ type: 'SHOW_SUCCESS_MODAL' });
            } else {
                dispatch({ type: 'SET_LOADING', value: false });
                alert(result.error || 'Failed to add payment');
            }
        } catch (error) {
            dispatch({ type: 'SET_LOADING', value: false });
            alert('An error occurred. Please try again.');
        }
    };

    const handleReset = () => {
        dispatch({ type: 'RESET_FORM' });
    };

    const handleCloseSuccessModal = () => {
        dispatch({ type: 'HIDE_SUCCESS_MODAL' });
        navigate('/home');
    };

    return (
        <>
            <NavigationHeader />
            <Container className="mt-4">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8} lg={6}>
                        <Card>
                            <Card.Header>
                                <h3 className="text-center mb-0">Add New Payment</h3>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit} noValidate>
                                    <Form.Group controlId="semester" className="mb-3">
                                        <Form.Label>Semester <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="semester"
                                            value={formState.formData.semester}
                                            onChange={handleChange}
                                            isInvalid={!!formState.errors.semester}
                                            placeholder="e.g., Fall 2025"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formState.errors.semester}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="courseName" className="mb-3">
                                        <Form.Label>Course Name <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="courseName"
                                            value={formState.formData.courseName}
                                            onChange={handleChange}
                                            isInvalid={!!formState.errors.courseName}
                                            placeholder="e.g., Web Development"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formState.errors.courseName}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="amount" className="mb-3">
                                        <Form.Label>Amount (VND) <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="amount"
                                            value={formState.formData.amount}
                                            onChange={handleChange}
                                            isInvalid={!!formState.errors.amount}
                                            placeholder="e.g., 3500000"
                                            min="0"
                                            step="1000"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formState.errors.amount}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="date" className="mb-3">
                                        <Form.Label>Date <span className="text-danger">*</span></Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={formState.formData.date}
                                            onChange={handleChange}
                                            isInvalid={!!formState.errors.date}
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
                                            disabled={formState.isLoading}
                                        >
                                            {formState.isLoading ? (
                                                <>
                                                    <Spinner size="sm" animation="border" role="status" className="me-2" />
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
                                            disabled={formState.isLoading}
                                        >
                                            Reset
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            type="button"
                                            onClick={() => navigate('/home')}
                                            disabled={formState.isLoading}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <ConfirmModal
                show={formState.showSuccessModal}
                title="Success!"
                message="Payment has been added successfully!"
                onConfirm={handleCloseSuccessModal}
                onHide={handleCloseSuccessModal}
                confirmText="OK"
            />
        </>
    );
};

export default AddPaymentPage;
