import React, { useState } from 'react';
import Head from 'next/head';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import firebase from '../components/firebase';
import RadioList from '../components/RadioList';

function NoSSR({ children }) {
  return typeof window !== `undefined` ? children : null;
}

function Home() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onCreate(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(event.target));

    // Add a new document with a generated id.
    firebase
      .firestore()
      .collection('radios')
      .add(data)
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <h1>
        Hello{' '}
        <Button variant="success" onClick={handleShow}>
          +
        </Button>
      </h1>
      <NoSSR>
        <RadioList />

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
              <Button variant="primary" type="submit">
                Create
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </NoSSR>
    </>
  );
}

export default Home;
