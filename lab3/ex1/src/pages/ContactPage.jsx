import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const ContactPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h2 className="mb-0">Contact Us</h2>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h4>Get in Touch</h4>
                  <p>
                    Have questions about MovieHub? We'd love to hear from you.
                    Send us a message and we'll respond as soon as possible.
                  </p>
                  <div className="mb-3">
                    <strong>Email:</strong> contact@moviehub.com
                  </div>
                  <div className="mb-3">
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </div>
                  <div className="mb-3">
                    <strong>Address:</strong><br />
                    123 Movie Street<br />
                    Entertainment City, EC 12345
                  </div>
                </Col>
                <Col md={6}>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Your name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="your.email@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control type="text" placeholder="Subject" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Message</Form.Label>
                      <Form.Control as="textarea" rows={4} placeholder="Your message" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Send Message
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
