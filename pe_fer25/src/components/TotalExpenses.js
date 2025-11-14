import { Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useExpenses } from '../context/ExpensesContext';

const TotalExpenses = () => {
  const { expenses, selectedCategory } = useExpenses();
  const { user } = useAuth();

  // Filter expenses by current user first
  const userExpenses = expenses.filter(
    (exp) => exp.userId === user?.id?.toString()
  );

  // Filter expenses by selected category
  const filteredExpenses =
    selectedCategory === 'All categories'
      ? userExpenses
      : userExpenses.filter((exp) => exp.category === selectedCategory);

  // Calculate total
  const total = filteredExpenses.reduce((sum, exp) => {
    const amount = typeof exp.amount === 'string' ? parseFloat(exp.amount) : exp.amount;
    return sum + (amount || 0);
  }, 0);

  // Format as VND
  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Total of Expenses</Card.Title>
        <Card.Text style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          {formatVND(total)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default TotalExpenses;

