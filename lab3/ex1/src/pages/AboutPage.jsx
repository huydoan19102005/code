import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h2 className="mb-0">About MovieHub</h2>
            </Card.Header>
            <Card.Body>
              <p className="lead">
                Welcome to MovieHub, your ultimate destination for discovering and exploring movies!
              </p>
              <p>
                MovieHub is a comprehensive movie platform that allows you to browse through a vast collection of films,
                filter them by various criteria, and manage your personal movie preferences. Whether you're looking for
                the latest blockbusters or classic films, we've got you covered.
              </p>
              <h4>Features:</h4>
              <ul>
                <li>Browse movies by genre, year, and duration</li>
                <li>Search movies by title and description</li>
                <li>Sort movies by various criteria</li>
                <li>Add movies to your favorites</li>
                <li>View detailed movie information</li>
                <li>Create and manage your profile</li>
              </ul>
              <p>
                Our platform is designed to provide you with the best movie discovery experience,
                helping you find your next favorite film with ease.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
