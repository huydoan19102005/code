//ConfirmModal.jsx được dùng để hiển thị một modal xác nhận hành động
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ 
    show, 
    title, 
    message, 
    onConfirm, 
    onHide,
    confirmText = "Xác nhận",
    confirmVariant = "primary",
    cancelText = "Hủy"
}) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                {cancelText && (
                    <Button variant="secondary" onClick={onHide}>
                        {cancelText}
                    </Button>
                )}
                <Button variant={confirmVariant} onClick={onConfirm}>
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmModal;
