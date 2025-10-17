import React, { useReducer } from 'react';
import Button from 'react-bootstrap/Button';

const counterReducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
        case 'reset':
            return 0;
        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
};

function CounterComponent() {
    const [count, dispatch] = useReducer(counterReducer, 0);

    return (
        <div
            style={{
                textAlign: 'center',
                padding: '40px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #74ebd5, #ACB6E5)',
                color: '#2c3e50',
                boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            }}
        >
            <h2 style={{ fontWeight: '700', marginBottom: '15px' }}>🧮 Bộ Đếm Đa Năng</h2>
            <p
                style={{
                    fontSize: '50px',
                    fontWeight: 'bold',
                    marginBottom: '30px',
                    color: count >= 0 ? '#2c3e50' : 'red',
                    transition: 'all 0.2s ease',
                }}
            >
                {count}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <Button
                    onClick={() => dispatch({ type: 'increment' })}
                    style={{ background: '#27ae60', border: 'none', fontWeight: '600' }}
                >
                    +1
                </Button>
                <Button
                    onClick={() => dispatch({ type: 'decrement' })}
                    style={{ background: '#f39c12', border: 'none', fontWeight: '600' }}
                >
                    -1
                </Button>
                <Button
                    onClick={() => dispatch({ type: 'reset' })}
                    style={{ background: '#c0392b', border: 'none', fontWeight: '600' }}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}

export default CounterComponent;
