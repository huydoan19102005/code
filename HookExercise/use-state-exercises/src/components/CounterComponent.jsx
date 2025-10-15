// src/components/CounterComponent.jsx
import React, { useState } from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';

export default function CounterComponent() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(0);

  return (
    <Card className="m-3">
      <Card.Body>
        <Card.Title>Exercise 1 – Counter</Card.Title>
        <h2 className="my-3">Count: {count}</h2>
        <ButtonGroup>
          <Button onClick={increment}>+1</Button>
          <Button variant="secondary" onClick={decrement}>-1</Button>
          <Button variant="outline-danger" onClick={reset}>Reset</Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}
