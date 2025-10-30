
import React, { useMemo, useState } from 'react';
import { Card, Col, Form, InputGroup, Row } from 'react-bootstrap';

const accounts = [
  { id: 1, username: 'Thông', password: '******', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
  { id: 2, username: 'Teò', password: '******', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
  { id: 3, username: 'hiếu', password: '******', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
  { id: 4, username: 'Bảo', password: '******', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
  { id: 5, username: 'trinh', password: '******', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' },
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
