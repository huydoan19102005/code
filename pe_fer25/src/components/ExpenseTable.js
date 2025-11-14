import { Card, Table, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useExpenses } from '../context/ExpensesContext';

const ExpenseTable = () => {
  const { expenses, selectedCategory, deleteExpense, setEditingExpense, fetchExpenses } = useExpenses();
  const { user } = useAuth();

  // Filter expenses by selected category
  const filteredExpenses =
    selectedCategory === 'All categories'
      ? expenses.filter((exp) => exp.userId === user.id.toString())
      : expenses.filter(
          (exp) => exp.userId === user.id.toString() && exp.category === selectedCategory
        );

  // Format date from YYYY-MM-DD to DD-MM-YYYY
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  };

  // Format amount as VND
  const formatVND = (amount) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('vi-VN').format(numAmount) + ' ₫';
  };

  const handleEdit = (expenseId) => {
    setEditingExpense(expenseId);
  };

  const handleDelete = async (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(expenseId);
      fetchExpenses(user.id);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Expense Management</Card.Title>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No expenses found
                </td>
              </tr>
            ) : (
              filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.name}</td>
                  <td>{formatVND(expense.amount)}</td>
                  <td>{expense.category}</td>
                  <td>{formatDate(expense.date)}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(expense.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ExpenseTable;

