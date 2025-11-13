import { Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../store/expensesSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const { expenses, selectedCategory } = useSelector((state) => state.expenses);
  const { user } = useSelector((state) => state.auth);

  // Get unique categories for current user
  const userExpenses = expenses.filter(
    (exp) => exp.userId === user?.id?.toString()
  );
  const categories = ['All categories', ...new Set(userExpenses.map((exp) => exp.category))];

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value));
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

