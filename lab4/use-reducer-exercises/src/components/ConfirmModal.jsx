// tạo confirmModal dùng useReducer áp dụng cho registrationForm và loginForm
import React, { useReducer } from "react";
import { Modal, Button } from "react-bootstrap";
function ConfirmModal({ show, title, message, onConfirm, onCancel }) {
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ConfirmModal;
