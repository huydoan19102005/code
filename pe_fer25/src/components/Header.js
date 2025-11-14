import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          🌱 PersonalBudget
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Item className="d-flex align-items-center me-3">
            <span>Signed in as {user?.fullName}</span>
          </Nav.Item>
          <Nav.Item>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

