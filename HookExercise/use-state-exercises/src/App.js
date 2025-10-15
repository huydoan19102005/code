// src/App.js
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import SearchItem from './components/SearchItem';
import AccountSearch from './components/AccountSearch';
import RegisterForm from './components/RegisterForm';

function Home() {
  return (
    <Container className="py-4">
      <h1 className="mb-3">useState Exercises</h1>
      <p>Select an exercise from the navbar.</p>
      <ul>
        <li><Link to="/counter">Exercise 1 – Counter</Link></li>
        <li><Link to="/light">Exercise 2 – Light Switch</Link></li>
        <li><Link to="/login1">Exercise 3 – LoginForm (2 states)</Link></li>
        <li><Link to="/login2">Exercise 4 – LoginForm2 (object state)</Link></li>
        <li><Link to="/search">Exercise 5 – SearchItem</Link></li>
        <li><Link to="/account-search">Exercise 6 – Account Search</Link></li>
        <li><Link to="/register">Exercise 7 – Register Form</Link></li>
      </ul>
    </Container>
  );
}

export default function App() {
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">useState</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/counter">Counter</Nav.Link>
              <Nav.Link as={Link} to="/light">Light</Nav.Link>
              <Nav.Link as={Link} to="/login1">LoginForm</Nav.Link>
              <Nav.Link as={Link} to="/login2">LoginForm2</Nav.Link>
              <Nav.Link as={Link} to="/search">SearchItem</Nav.Link>
              <Nav.Link as={Link} to="/account-search">Account Search</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<CounterComponent />} />
        <Route path="/light" element={<LightSwitch />} />
        <Route path="/login1" element={<LoginForm />} />
        <Route path="/login2" element={<LoginForm2 />} />
        <Route path="/search" element={<SearchItem />} />
        <Route path="/account-search" element={<AccountSearch />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
}
