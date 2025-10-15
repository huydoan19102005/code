// src/components/AccountSearch.jsx
import React, { useMemo, useState } from 'react';
import { Card, Col, Form, InputGroup, Row } from 'react-bootstrap';

const accounts = [
  { id: 1, username: 'alice', password: '******', avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: 2, username: 'bob', password: '******', avatar: 'https://i.pravatar.cc/100?img=2' },
  { id: 3, username: 'charlie', password: '******', avatar: 'https://i.pravatar.cc/100?img=3' },
  { id: 4, username: 'dave', password: '******', avatar: 'https://i.pravatar.cc/100?img=4' },
  { id: 5, username: 'eve', password: '******', avatar: 'https://i.pravatar.cc/100?img=5' },
];

export default function AccountSearch() {
  const [term, setTerm] = useState('');

  const filtered = useMemo(() => {
    const t = term.trim().toLowerCase();
    if (!t) return accounts;
    return accounts.filter(acc => acc.username.toLowerCase().includes(t));
  }, [term]);

  return (
    <Card className="m-3 p-3">
      <Card.Title>Exercise 6 – Account Search by Username</Card.Title>

      <InputGroup className="mb-3">
        <InputGroup.Text>Search</InputGroup.Text>
        <Form.Control
          placeholder="Type username..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </InputGroup>

      {filtered.length === 0 ? <p>No results found.</p> : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
          {filtered.map(acc => (
            <Col key={acc.id}>
              <Card className="h-100">
                <Card.Img variant="top" src={acc.avatar} alt={acc.username} />
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">#{acc.id}</Card.Subtitle>
                  <Card.Text className="mb-1"><strong>{acc.username}</strong></Card.Text>
                  <Card.Text>Password: {acc.password}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Card>
  );
}
