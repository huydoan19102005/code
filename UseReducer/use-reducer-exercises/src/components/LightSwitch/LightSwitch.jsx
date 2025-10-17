import React, { useReducer } from 'react';
import Button from 'react-bootstrap/Button';

const lightReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE':
            return { isLightOn: !state.isLightOn };
        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
};

function LightSwitch() {
    const [state, dispatch] = useReducer(lightReducer, { isLightOn: false });

    const containerStyle = {
        textAlign: 'center',
        padding: '50px',
        borderRadius: '20px',
        background: state.isLightOn
            ? 'linear-gradient(135deg, #fff9c4, #fff59d)'
            : 'linear-gradient(135deg, #2c3e50, #34495e)',
        color: state.isLightOn ? '#000' : '#ecf0f1',
        transition: 'all 0.5s ease-in-out',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ marginBottom: 20 }}>💡 Công Tắc Đèn Thông Minh</h2>
            <p style={{ fontSize: '28px', fontWeight: '600', marginBottom: '20px' }}>
                Trạng thái: {state.isLightOn ? '🔆 Bật Sáng' : '🌙 Tắt Đèn'}
            </p>
            <Button
                onClick={() => dispatch({ type: 'TOGGLE' })}
                style={{
                    padding: '12px 30px',
                    fontSize: '18px',
                    borderRadius: '30px',
                    background: state.isLightOn ? '#e74c3c' : '#2ecc71',
                    border: 'none',
                    transition: '0.3s',
                }}
            >
                {state.isLightOn ? 'Tắt Ngay 🔴' : 'Bật Đèn 🟢'}
            </Button>
        </div>
    );
}

export default LightSwitch;
