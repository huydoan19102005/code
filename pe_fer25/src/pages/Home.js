import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TotalExpenses from '../components/TotalExpenses';
import Filter from '../components/Filter';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import { fetchExpenses } from '../store/expensesSlice';
import { loadUserFromStorage } from '../store/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Load user from storage on mount
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated && !user) {
      navigate('/login');
      return;
    }

    // Fetch expenses for the current user
    if (user?.id) {
      dispatch(fetchExpenses(user.id));
    }
  }, [dispatch, navigate, user, isAuthenticated]);

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

