import React from "react";
import { Modal, Button } from "react-bootstrap";

const ImageModal = ({ show, handleClose, image }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{image.caption}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={image.src} alt={image.caption} className="img-fluid" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;
