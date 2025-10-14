import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { BiMap } from 'react-icons/bi';

const AddressForm = ({ formData, setFormData, errors, setErrors, onPrevious, onFinish }) => {
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
        <BiMap className="me-2" style={{ fontSize: '24px' }} />
        <h4 className="mb-0">Address</h4>
      </div>
      
      <Row>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Street *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street address"
              value={formData.street || ''}
              onChange={(e) => handleInputChange('street', e.target.value)}
              isInvalid={!!errors.street}
            />
            <Form.Control.Feedback type="invalid">
              {errors.street}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>City *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={formData.city || ''}
              onChange={(e) => handleInputChange('city', e.target.value)}
              isInvalid={!!errors.city}
            />
            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Country *</Form.Label>
            <Form.Select
              value={formData.country || ''}
              onChange={(e) => handleInputChange('country', e.target.value)}
              isInvalid={!!errors.country}
            >
              <option value="">Select Country</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="Japan">Japan</option>
              <option value="South Korea">South Korea</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Other">Other</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.country}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Zip Code *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter zip code"
              value={formData.zipCode || ''}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              isInvalid={!!errors.zipCode}
            />
            <Form.Control.Feedback type="invalid">
              {errors.zipCode}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={onPrevious}>
          Previous
        </Button>
        <Button variant="success" onClick={onFinish}>
          Finish
        </Button>
      </div>
    </div>
  );
};

export default AddressForm;
