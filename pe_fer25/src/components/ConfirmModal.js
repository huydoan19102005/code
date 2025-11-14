import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ show, title, message, onConfirm, onHide, variant = 'primary' }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant={variant} onClick={onConfirm}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;

