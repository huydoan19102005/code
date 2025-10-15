// src/components/SearchItem.jsx
import React, { useMemo, useState } from 'react';
import { Card, Form, InputGroup, ListGroup } from 'react-bootstrap';

const data = [
  { id: 1, name: 'Apple Juice', price: 30 },
  { id: 2, name: 'Banana Smoothie', price: 40 },
  { id: 3, name: 'Cappuccino', price: 50 },
  { id: 4, name: 'Donut', price: 20 },
  { id: 5, name: 'Espresso', price: 45 },
];

export default function SearchItem() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return data;
    return data.filter(x => x.name.toLowerCase().includes(term));
  }, [searchTerm]);

  return (
    <Card className="m-3">
      <Card.Body>
        <Card.Title>Exercise 5 – SearchItem</Card.Title>

        <InputGroup className="mb-3">
          <InputGroup.Text>Search</InputGroup.Text>
          <Form.Control
            placeholder="Type to filter by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        {filtered.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ListGroup>
            {filtered.map(item => (
              <ListGroup.Item key={item.id}>
                {item.name} — ${item.price}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
}
