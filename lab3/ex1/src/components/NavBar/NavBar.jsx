import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, InputGroup, Dropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiSearch, BiUser, BiLock, BiHeart } from 'react-icons/bi';

const NavBar = () => {
  const [quickSearch, setQuickSearch] = useState('');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    // Handle quick search functionality
    console.log('Quick search:', quickSearch);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">MovieHub</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          
          <Form className="d-flex me-3" onSubmit={handleQuickSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Quick search..."
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                style={{ width: '200px' }}
              />
              <Button variant="outline-light" type="submit">
                <BiSearch />
              </Button>
            </InputGroup>
          </Form>

          <Nav className="ms-auto">
            <Dropdown className="me-2">
              <Dropdown.Toggle variant="outline-light" id="dropdown-accounts">
                <BiUser className="me-1" />
                Accounts
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#manage-profiles">Manage Your Profiles</Dropdown.Item>
                <Dropdown.Item as={Link} to="/account">Build your Account</Dropdown.Item>
                <Dropdown.Item href="#change-password">Change Password</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            <Button variant="outline-light" className="me-2">
              <BiLock className="me-1" />
              Login
            </Button>
            
            <Button variant="outline-light">
              <BiHeart className="me-1" />
              Favourites
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
