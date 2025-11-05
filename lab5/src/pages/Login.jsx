import React, { useReducer, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Alert, Toast, ToastContainer } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthDispatch, useAuthState } from '../contexts/AuthContext';

const initialState = {
  username: '',
  password: '',
  errors: {
    username: '',
    password: ''
  },
  serverError: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: ''
        }
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      };
    case 'SET_SERVER_ERROR':
      return {
        ...state,
        serverError: action.error
      };
    case 'VALIDATE':
      const errors = {};
      if (!state.username.trim()) {
        errors.username = 'Vui lòng nhập tên đăng nhập';
      }
      if (!state.password.trim()) {
        errors.password = 'Vui lòng nhập mật khẩu';
      }
      return {
        ...state,
        errors
      };
    default:
      return state;
  }
};

const Login = () => {
  const { user, loading } = useAuthState();
  const { login } = useAuthDispatch();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    variant: 'success'
  });

  if (user) return <Navigate to="/movies" replace />;

  const showToast = (message, variant) => {
    setToast({
      show: true,
      message,
      variant
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'VALIDATE' });

    if (!state.username.trim() || !state.password.trim()) {
      return;
    }

    const res = await login(state.username, state.password);
    if (res.success) {
      showToast('Đăng nhập thành công! Đang chuyển hướng...', 'success');
      setTimeout(() => {
        navigate('/movies');
      }, 1500);
    } else {
      showToast(res.message || 'Đăng nhập thất bại', 'danger');
      dispatch({ type: 'SET_SERVER_ERROR', error: res.message || 'Đăng nhập thất bại' });
    }
  };

  const handleChange = (field) => (e) => {
    dispatch({ type: 'SET_FIELD', field, value: e.target.value });
  };

  return (
    <Container className="mt-5">
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ zIndex: 1 }}
      >
        <Toast
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          delay={3000}
          autohide
          bg={toast.variant}
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">
              {toast.variant === 'success' ? 'Thành công' : 'Lỗi'}
            </strong>
          </Toast.Header>
          <Toast.Body className={toast.variant === 'success' ? 'text-white' : ''}>
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Row className="justify-content-center">
        <Col md={5}>
          <Card>
            <Card.Body>
              <Card.Title>Đăng nhập</Card.Title>
              {state.serverError && <Alert variant="danger" className="mt-2">{state.serverError}</Alert>}
              <Form className="mt-3" onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Tên đăng nhập</Form.Label>
                  <Form.Control
                    value={state.username}
                    onChange={handleChange('username')}
                    isInvalid={!!state.errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    value={state.password}
                    onChange={handleChange('password')}
                    isInvalid={!!state.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {state.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-grid">
                  <Button type="submit" variant="primary" disabled={loading}>Đăng nhập</Button>
                </div>
              </Form>
              <div className="mt-3 small text-muted">Demo: admin/admin123, user/user123</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;