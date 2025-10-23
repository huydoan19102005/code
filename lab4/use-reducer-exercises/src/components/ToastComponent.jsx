import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function ToastComponent({
    show,
    onClose,
    title,
    message,
    bg = 'success',
    delay = 5000,
    position = 'top-end',
    showCloseButton = true
}) {
    return (
        <ToastContainer
            position={position}
            className="p-3"
            style={{
                position: 'fixed',
                top: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10000
            }}
        >
            <Toast
                show={show}
                onClose={onClose}
                delay={delay}
                autohide
                bg={bg}
                style={{ minWidth: '300px' }}
            >
                <Toast.Header closeButton={showCloseButton}>
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body className="text-white">
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default ToastComponent;