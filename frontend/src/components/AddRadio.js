import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { createRadio } from './hooks';

export default function AddRadio() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  function onCreate(e) {
    e.preventDefault();

    const data = {
      ...Object.fromEntries(new FormData(e.target)),
    };

    setLoading(true);
    createRadio(data).then(() => {
      setLoading(false);
      setShow(false);
    });
  }

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        +
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={onCreate}>
          <Modal.Header closeButton>
            <Modal.Title>New Radio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Radio name:</Form.Label>
              <Form.Control name="name" placeholder="Name" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
