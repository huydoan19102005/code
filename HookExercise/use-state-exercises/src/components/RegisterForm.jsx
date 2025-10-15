// src/components/RegisterForm.jsx
import React, { useMemo, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row, Toast, ToastContainer } from 'react-bootstrap';
import { isStrongPassword, isValidEmail, isValidUsername } from '../utils/validation';

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const usernameOk = isValidUsername(form.username);
  const emailOk = isValidEmail(form.email.trim());
  const passwordOk = isStrongPassword(form.password);
  const confirmOk = form.confirm === form.password && form.password.length > 0;

  const allOk = usernameOk && emailOk && passwordOk && confirmOk;

  const submit = (e) => {
    e.preventDefault();
    if (!allOk) return;
    setShowToast(true);
    setShowModal(true);
  };

  const cancel = () => {
    setForm({ username: '', email: '', password: '', confirm: '' });
  };

  const feedback = useMemo(() => ({
    username: usernameOk ? null : 'Username must be ≥ 3 and only letters/digits/_/.',
    email: emailOk ? null : 'Invalid email address.',
    password: passwordOk ? null : 'Password ≥ 8 with upper, lower, digit, special.',
    confirm: confirmOk ? null : 'Confirm must match password.'
  }), [usernameOk, emailOk, passwordOk, confirmOk]);

  return (
    <Card className="m-3 p-3">
      <Card.Title>Exercise 7 – Register Form</Card.Title>
      <Form onSubmit={submit} noValidate>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={form.username}
                onChange={onChange}
                isInvalid={!!feedback.username}
                placeholder="Enter username"
              />
              <Form.Control.Feedback type="invalid">
                {feedback.username}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                isInvalid={!!feedback.email}
                placeholder="you@example.com"
              />
              <Form.Control.Feedback type="invalid">
                {feedback.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                isInvalid={!!feedback.password}
                placeholder="Enter strong password"
              />
              <Form.Control.Feedback type="invalid">
                {feedback.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={onChange}
                isInvalid={!!feedback.confirm}
                placeholder="Re-enter password"
              />
              <Form.Control.Feedback type="invalid">
                {feedback.confirm}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex gap-2">
          <Button type="submit" disabled={!allOk}>Submit</Button>
          <Button variant="outline-secondary" type="button" onClick={cancel}>Cancel</Button>
        </div>
      </Form>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast bg="success" onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Submitted</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submitted Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Username:</strong> {form.username}</p>
          <p><strong>Email:</strong> {form.email}</p>
        </Modal.Body>
      </Modal>
    </Card>
  );
}
