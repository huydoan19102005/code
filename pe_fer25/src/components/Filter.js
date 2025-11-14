import { Card, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useExpenses } from '../context/ExpensesContext';

const Filter = () => {
  const { expenses, selectedCategory, setSelectedCategory } = useExpenses();
  const { user } = useAuth();

  // Get unique categories for current user
  const userExpenses = expenses.filter(
    (exp) => exp.userId === user?.id?.toString()
  );
  const categories = ['All categories', ...new Set(userExpenses.map((exp) => exp.category))];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Filter</Card.Title>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default Filter;

