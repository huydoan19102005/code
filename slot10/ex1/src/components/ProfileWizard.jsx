import React, { useState } from 'react';
import {
    Modal,
    Form,
    Button,
    Row,
    Col,
    InputGroup,
    FormControl as BootstrapFormControl,
    ProgressBar,
    Nav,
    Tab,
    Tabs
} from 'react-bootstrap';

const ProfileWizard = () => {
    const [show, setShow] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        // About Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        age: '',
        avatar: null,
        // Account Information
        username: '',
        password: '',
        confirmPassword: '',
        secretQuestion: '',
        answer: '',
        // Address Information
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });
    const [errors, setErrors] = useState({});

    const steps = ['About', 'Account', 'Address'];
    const progress = ((currentStep + 1) / steps.length) * 100;

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 0) { // About step
            if (!formData.firstName) newErrors.firstName = 'First name is required';
            if (!formData.lastName) newErrors.lastName = 'Last name is required';
            if (!formData.email) newErrors.email = 'Email is required';
            if (!formData.phone) newErrors.phone = 'Phone is required';
            if (!formData.age) newErrors.age = 'Age is required';
        } else if (step === 1) { // Account step
            if (!formData.username) newErrors.username = 'Username is required';
            if (!formData.password) newErrors.password = 'Password is required';
            if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
            if (!formData.secretQuestion) newErrors.secretQuestion = 'Secret question is required';
            if (!formData.answer) newErrors.answer = 'Answer is required';
        } else if (step === 2) { // Address step
            if (!formData.street) newErrors.street = 'Street is required';
            if (!formData.city) newErrors.city = 'City is required';
            if (!formData.state) newErrors.state = 'State is required';
            if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
            if (!formData.country) newErrors.country = 'Country is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
        }
    };

    const handlePrevious = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };
    const handleFinish = () => {
        if (validateStep(currentStep)) {
            alert('Profile created successfully!\nData: ' + JSON.stringify(formData, null, 2));
            setShow(false);
        }
    };

    const handleClose = () => setShow(false);

    const secretQuestions = [
        "What is your first pet's name?",
        "What was your first car?",
        "What is your mother's maiden name?",
        "What city were you born in?",
        "What is your favorite movie?"
    ];

    const countries = [
        "Vietnam", "United States", "United Kingdom", "Japan", "South Korea", "France", "Germany"
    ];

    const renderAboutStep = () => (
        <div>
            <h5 className="mb-3">
                <i className="bi bi-person-fill text-primary me-2"></i>
                About Information
            </h5>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name *</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>👤</InputGroup.Text>
                            <BootstrapFormControl
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter your first name"
                                isInvalid={!!errors.firstName}
                            />
                        </InputGroup>
                        {errors.firstName && (
                            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name *</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>👤</InputGroup.Text>
                            <BootstrapFormControl
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Enter your last name"
                                isInvalid={!!errors.lastName}
                            />
                        </InputGroup>
                        {errors.lastName && (
                            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <InputGroup>
                    <InputGroup.Text>✉️</InputGroup.Text>
                    <BootstrapFormControl
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        isInvalid={!!errors.email}
                    />
                </InputGroup>
                {errors.email && (
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Phone *</Form.Label>
                <InputGroup>
                    <InputGroup.Text>📞</InputGroup.Text>
                    <BootstrapFormControl
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        isInvalid={!!errors.phone}
                    />
                </InputGroup>
                {errors.phone && (
                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Age *</Form.Label>
                <BootstrapFormControl
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                    isInvalid={!!errors.age}
                />
                {errors.age && (
                    <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Avatar</Form.Label>
                <InputGroup>
                    <InputGroup.Text>👤</InputGroup.Text>
                    <BootstrapFormControl
                        type="file"
                        name="avatar"
                        onChange={handleInputChange}
                        accept="image/*"
                    />
                </InputGroup>
            </Form.Group>
        </div>
    );

    const renderAccountStep = () => (
        <div>
            <h5 className="mb-3">
                <i className="bi bi-lock-fill text-primary me-2"></i>
                Account Information
            </h5>

            <Form.Group className="mb-3">
                <Form.Label>Username *</Form.Label>
                <InputGroup>
                    <InputGroup.Text>👤</InputGroup.Text>
                    <BootstrapFormControl
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter your username"
                        isInvalid={!!errors.username}
                    />
                </InputGroup>
                {errors.username && (
                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password *</Form.Label>
                <InputGroup>
                    <InputGroup.Text>🔒</InputGroup.Text>
                    <BootstrapFormControl
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        isInvalid={!!errors.password}
                    />
                    <InputGroup.Text>👁️</InputGroup.Text>
                </InputGroup>
                {errors.password && (
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Confirm Password *</Form.Label>
                <InputGroup>
                    <InputGroup.Text>🔒</InputGroup.Text>
                    <BootstrapFormControl
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        isInvalid={!!errors.confirmPassword}
                    />
                    <InputGroup.Text>👁️</InputGroup.Text>
                </InputGroup>
                {errors.confirmPassword && (
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Secret Question *</Form.Label>
                <InputGroup>
                    <InputGroup.Text>❓</InputGroup.Text>
                    <Form.Select
                        name="secretQuestion"
                        value={formData.secretQuestion}
                        onChange={handleInputChange}
                        isInvalid={!!errors.secretQuestion}
                    >
                        <option value="">Select a secret question</option>
                        {secretQuestions.map((question, index) => (
                            <option key={index} value={question}>{question}</option>
                        ))}
                    </Form.Select>
                </InputGroup>
                {errors.secretQuestion && (
                    <Form.Control.Feedback type="invalid">{errors.secretQuestion}</Form.Control.Feedback>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Answer *</Form.Label>
                <InputGroup>
                    <InputGroup.Text>🔑</InputGroup.Text>
                    <BootstrapFormControl
                        type="text"
                        name="answer"
                        value={formData.answer}
                        onChange={handleInputChange}
                        placeholder="Enter your answer"
                        isInvalid={!!errors.answer}
                    />
                </InputGroup>
                {errors.answer && (
                    <Form.Control.Feedback type="invalid">{errors.answer}</Form.Control.Feedback>
                )}
            </Form.Group>
        </div>
    );

    const renderAddressStep = () => (
        <div>
            <h5 className="mb-3">
                <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                Address Information
            </h5>

            <Form.Group className="mb-3">
                <Form.Label>Street *</Form.Label>
                <BootstrapFormControl
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Enter your street address"
                    isInvalid={!!errors.street}
                />
                {errors.street && (
                    <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
                )}
            </Form.Group>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>City *</Form.Label>
                        <BootstrapFormControl
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Enter your city"
                            isInvalid={!!errors.city}
                        />
                        {errors.city && (
                            <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>State *</Form.Label>
                        <BootstrapFormControl
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="Enter your state/province"
                            isInvalid={!!errors.state}
                        />
                        {errors.state && (
                            <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Zip Code *</Form.Label>
                        <BootstrapFormControl
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            placeholder="Enter your zip/postal code"
                            isInvalid={!!errors.zipCode}
                        />
                        {errors.zipCode && (
                            <Form.Control.Feedback type="invalid">{errors.zipCode}</Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Country *</Form.Label>
                        <Form.Select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            isInvalid={!!errors.country}
                        >
                            <option value="">Select a country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </Form.Select>
                        {errors.country && (
                            <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                        )}
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 0:
                return renderAboutStep();
            case 1:
                return renderAccountStep();
            case 2:
                return renderAddressStep();
            default:
                return renderAboutStep();
        }
    };

    if (!show) {
        return (
            <div className="text-center p-4">
                <Button variant="primary" onClick={() => setShow(true)}>
                    Open Profile Wizard
                </Button>
            </div>
        );
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <i className="bi bi-person-circle text-primary me-2"></i>
                    Build Your Profile
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Progress</span>
                        <span className="text-primary fw-bold">{Math.round(progress)}%</span>
                    </div>
                    <ProgressBar now={progress} variant="primary" />
                </div>

                {/* Step Navigation */}
                <Nav variant="tabs" className="mb-4">
                    {steps.map((step, index) => (
                        <Nav.Item key={index}>
                            <Nav.Link
                                active={index === currentStep}
                                onClick={() => setCurrentStep(index)}
                                className={index === currentStep ? 'text-primary' : 'text-muted'}
                            >
                                {step}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                </Nav>

                {/* Current Step Content */}
                {renderCurrentStep()}
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                >
                    Previous
                </Button>
                {currentStep === steps.length - 1 ? (
                    <Button variant="success" onClick={handleFinish}>
                        Finish
                    </Button>
                ) : (
                    <Button variant="primary" onClick={handleNext}>
                        Next
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileWizard;