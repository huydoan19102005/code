import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useExpenses } from '../context/ExpensesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TotalExpenses from '../components/TotalExpenses';
import Filter from '../components/Filter';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseTable from '../components/ExpenseTable';

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { fetchExpenses } = useExpenses();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated && !user) {
      navigate('/login');
      return;
    }

    // Fetch expenses for the current user
    if (user?.id) {
      fetchExpenses(user.id);
    }
  }, [navigate, user, isAuthenticated, fetchExpenses]);

  if (!isAuthenticated && !user) {
    return null;
  }

  return (
    <div>
      <Header />
      <Container>
        <Row className="mb-4">
          <Col md={4}>
            <TotalExpenses />
          </Col>
          <Col md={4}>
            <Filter />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <AddExpenseForm />
          </Col>
          <Col md={6}>
            <ExpenseTable />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
