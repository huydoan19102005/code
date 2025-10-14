import React, { useState } from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { BiLock, BiUser } from 'react-icons/bi';

const AccountForm = ({ formData, setFormData, errors, setErrors }) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <BiLock className="me-2" style={{ fontSize: '24px' }} />
        <h4 className="mb-0">Account</h4>
      </div>
      
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Username *</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <BiUser />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={formData.username || ''}
                onChange={(e) => handleInputChange('username', e.target.value)}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Password *</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <BiLock />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={formData.password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password *</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <BiLock />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword || ''}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Secret Question *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter secret question"
              value={formData.secretQuestion || ''}
              onChange={(e) => handleInputChange('secretQuestion', e.target.value)}
              isInvalid={!!errors.secretQuestion}
            />
            <Form.Control.Feedback type="invalid">
              {errors.secretQuestion}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Answer *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter answer to secret question"
              value={formData.answer || ''}
              onChange={(e) => handleInputChange('answer', e.target.value)}
              isInvalid={!!errors.answer}
            />
            <Form.Control.Feedback type="invalid">
              {errors.answer}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default AccountForm;
