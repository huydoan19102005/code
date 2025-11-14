import { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useExpenses } from '../context/ExpensesContext';

const AddExpenseForm = () => {
  const { user } = useAuth();
  const { expenses, editingExpense, addExpense, updateExpense, setEditingExpense, fetchExpenses } = useExpenses();

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: '',
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setIsEditing(true);
      const expense = expenses.find((exp) => exp.id === editingExpense);
      if (expense) {
        // Format date from YYYY-MM-DD to DD/MM/YYYY
        const dateParts = expense.date.split('-');
        const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
        
        setFormData({
          name: expense.name,
          amount: expense.amount.toString(),
          category: expense.category,
          date: formattedDate,
        });
      }
    } else {
      setIsEditing(false);
      setFormData({
        name: '',
        amount: '',
        category: '',
        date: '',
      });
    }
  }, [editingExpense, expenses]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a valid number greater than 0';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDateToISO = (dateStr) => {
    // Convert DD/MM/YYYY to YYYY-MM-DD
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const expenseData = {
      userId: user.id.toString(),
      name: formData.name.trim(),
      amount: parseFloat(formData.amount),
      category: formData.category.trim(),
      date: formatDateToISO(formData.date),
    };

    try {
      if (isEditing && editingExpense) {
        await updateExpense(editingExpense, expenseData);
        setEditingExpense(null);
      } else {
        await addExpense(expenseData);
      }
      fetchExpenses(user.id);
      
      // Reset form
      setFormData({
        name: '',
        amount: '',
        category: '',
        date: '',
      });
      setErrors({});
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      amount: '',
      category: '',
      date: '',
    });
    setErrors({});
    setIsEditing(false);
    setEditingExpense(null);
  };

  // Get unique categories from existing expenses
  const availableCategories = ['Entertainment', 'Food', 'Mua sắm', 'Utilities'];
  const expenseCategories = [...new Set(expenses.map((exp) => exp.category))];
  const allCategories = [...new Set([...availableCategories, ...expenseCategories])];

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{isEditing ? 'Edit Expense' : 'Add Expense'}</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter expense name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              isInvalid={!!errors.name}
            />
            {errors.name && (
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              isInvalid={!!errors.amount}
              min="0"
              step="0.01"
            />
            {errors.amount && (
              <Form.Control.Feedback type="invalid">
                {errors.amount}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              isInvalid={!!errors.category}
            >
              <option value="">Select category</option>
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
            {errors.category && (
              <Form.Control.Feedback type="invalid">
                {errors.category}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="dd/MM/yyyy"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              isInvalid={!!errors.date}
            />
            {errors.date && (
              <Form.Control.Feedback type="invalid">
                {errors.date}
              </Form.Control.Feedback>
            )}
            <Form.Text className="text-muted">Format: DD/MM/YYYY</Form.Text>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="secondary" type="button" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="primary" type="submit">
              {isEditing ? 'Save' : 'Add expense'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddExpenseForm;

