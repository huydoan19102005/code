// src/components/LightSwitch.jsx
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

export default function LightSwitch() {
  const [isLightOn, setIsLightOn] = useState(false);
  const toggle = () => setIsLightOn(v => !v);

  return (
    <Card className="m-3">
      <Card.Body>
        <Card.Title>Exercise 2 – Light Switch</Card.Title>
        <p className="mb-3">Light is <strong>{isLightOn ? 'ON' : 'OFF'}</strong></p>
        <Button
          onClick={toggle}
          variant={isLightOn ? 'success' : 'danger'}
        >
          {isLightOn ? 'Turn Off' : 'Turn On'}
        </Button>
      </Card.Body>
    </Card>
  );
}
