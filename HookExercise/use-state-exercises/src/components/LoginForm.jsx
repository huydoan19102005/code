// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const usernameInvalid = username.trim() === '';
  const passwordInvalid = password.trim() === '';

  const onSubmit = (e) => {
    e.preventDefault();
    if (!usernameInvalid && !passwordInvalid) {
      setShow(true);
    }
  };

  const closeModal = () => {
    setShow(false);
    setUsername('');
    setPassword('');
  };

  return (
    <Card className="m-3">
      <Card.Body>
        <Card.Title>Exercise 3 – LoginForm</Card.Title>
        <Form onSubmit={onSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Welcome, <strong>{username}</strong>!
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
