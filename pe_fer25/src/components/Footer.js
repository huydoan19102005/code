import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="mt-5 py-4 bg-light">
      <Container>
        <Row>
          <Col className="text-start">
            <p className="mb-0">© 2025 PersonalBudget Demo</p>
          </Col>
          <Col className="text-end">
            <p className="mb-0">Built with React, Redux Toolkit & JSON Server</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

