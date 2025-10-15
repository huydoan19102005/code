// src/components/LoginForm2.jsx
import React, { useState } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';

export default function LoginForm2() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [show, setShow] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const usernameInvalid = user.username.trim() === '';
  const passwordInvalid = user.password.trim() === '';

  const onSubmit = (e) => {
    e.preventDefault();
    if (!usernameInvalid && !passwordInvalid) {
      setShow(true);
    }
  };

  const closeModal = () => {
    setShow(false);
    setUser({ username: '', password: '' });
  };

  return (
    <Card className="m-3">
      <Card.Body>
        <Card.Title>Exercise 4 – LoginForm2 (object state)</Card.Title>
        <Form onSubmit={onSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={user.username}
              onChange={onChange}
              isInvalid={usernameInvalid}
              placeholder="Enter username"
            />
            <Form.Control.Feedback type="invalid">
              Username is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={user.password}
              onChange={onChange}
              isInvalid={passwordInvalid}
              placeholder="Enter password"
            />
            <Form.Control.Feedback type="invalid">
              Password is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit">Login</Button>
        </Form>

        <Modal show={show} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Welcome, <strong>{user.username}</strong>!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
}
