import React, { useReducer } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';
import ToastComponent from './ToastComponent';

// Initial state for the registration form
const initialState = {
  formData: {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  errors: {},
  showToast: false,
  showModal: false,
};

// Reducer function to handle form state
function registrationReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value
        },
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      };

    case "SET_ERRORS":
      return { ...state, errors: action.payload };

    case "SHOW_TOAST":
      return { ...state, showToast: true };

    case "HIDE_TOAST":
      return { ...state, showToast: false };

    case "SHOW_MODAL":
      return { ...state, showModal: true };

    case "HIDE_MODAL":
      return {
        ...state,
        showModal: false,
        formData: { username: '', email: '', password: '', confirmPassword: '' },
        errors: {}
      };

    case "RESET_FORM":
      return {
        ...state,
        formData: { username: '', email: '', password: '', confirmPassword: '' },
        errors: {}
      };

    default:
      return state;
  }
}

function RegistrationForm() {
  const [state, dispatch] = useReducer(registrationReducer, initialState);
  const { formData, errors, showToast, showModal } = state;

  // Validation functions
  const validateUsername = (username) => {
    if (username.trim().length < 3) return 'Username phải có ít nhất 3 ký tự';
    if (username !== username.trim()) return 'Username không được có khoảng trắng đầu/cuối';
    if (!/^[a-zA-Z0-9._]+$/.test(username)) return 'Username chỉ được chứa chữ, số, _ hoặc .';
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Email không đúng định dạng';
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 8) return 'Password phải có ít nhất 8 ký tự';
    if (!/(?=.*[a-z])/.test(password)) return 'Password phải có ít nhất 1 chữ thường';
    if (!/(?=.*[A-Z])/.test(password)) return 'Password phải có ít nhất 1 chữ hoa';
    if (!/(?=.*\d)/.test(password)) return 'Password phải có ít nhất 1 chữ số';
    if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(password))
      return 'Password phải có ít nhất 1 ký tự đặc biệt';
    return '';
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) return 'Confirm password không khớp với password';
    return '';
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';
    switch (name) {
      case 'username':
        error = validateUsername(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        if (formData.confirmPassword) {
          const confirmError = validateConfirmPassword(value, formData.confirmPassword);
          dispatch({
            type: "SET_FIELD",
            field: 'confirmPassword',
            value: formData.confirmPassword,
            error: confirmError
          });
        }
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(formData.password, value);
        break;
      default:
        break;
    }

    dispatch({
      type: "SET_FIELD",
      field: name,
      value,
      error
    });
  };

  // Kiểm tra form có hợp lệ không
  const isFormValid = () => {
    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);

    return !usernameError && !emailError && !passwordError && !confirmPasswordError &&
      formData.username && formData.email && formData.password && formData.confirmPassword;
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
    };

    dispatch({ type: "SET_ERRORS", payload: newErrors });

    if (isFormValid()) {
      console.log("Form is valid, showing toast and modal");
      dispatch({ type: "SHOW_TOAST" });
      setTimeout(() => dispatch({ type: "SHOW_MODAL" }), 100);
    }
  };

  // Xử lý cancel - reset form
  const handleCancel = () => dispatch({ type: "RESET_FORM" });

  // Đóng modal
  const handleCloseModal = () => dispatch({ type: "HIDE_MODAL" });

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h3 className="text-center">Đăng Ký Tài Khoản</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    placeholder="Nhập username (≥3 ký tự, chỉ chữ, số, _, .)"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="Nhập email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Nhập password (≥8 ký tự, có chữ hoa, thường, số, ký tự đặc biệt)"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPassword}
                    placeholder="Nhập lại password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button variant="secondary" onClick={handleCancel} className="me-md-2">
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={!isFormValid()}>
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast Notification */}
      <ToastComponent
        show={showToast}
        onClose={() => dispatch({ type: "HIDE_TOAST" })}
        title="🎉 Thành công!"
        message="Đăng ký tài khoản thành công!"
        bg="success"
        delay={5000}
        position="top-center"
        showCloseButton={true}
      />

      {/* Confirm Modal */}
      <ConfirmModal show={showModal} onHide={handleCloseModal} formData={formData} />
    </Container>
  );
}

export default RegistrationForm;
