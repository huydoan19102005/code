import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthDispatch, useAuthState } from '../contexts/AuthContext';

const Header = () => {
  const { user } = useAuthState();
  const { logout } = useAuthDispatch();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/movies">Movie Manager</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <span>Xin chào, <strong>{user.name}</strong></span>
                <Button variant="outline-danger" size="sm" onClick={logout}>Đăng xuất</Button>
              </>
            ) : (
              <Button as={Link} to="/login" variant="primary" size="sm">Đăng nhập</Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

