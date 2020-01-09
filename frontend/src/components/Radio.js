import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  useDocumentData,
  useCollectionData,
} from 'react-firebase-hooks/firestore';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { FaPlus, FaPlay } from 'react-icons/fa';

import firebase from '../firebase';
import 'firebase/firestore';

function AddButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onSearch(e) {
    e.preventDefault();

    const data = {
      ...Object.fromEntries(new FormData(e.target.form)),
      // owner: firebase.auth().currentUser.uid,
      // created: firebase.firestore.FieldValue.serverTimestamp(),
    };
    console.log('Add a new song:', data);
  }

  return (
    <>
      <Button onClick={handleShow}>
        <FaPlus /> Add a song
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add a song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup>
              <Form.Control type="search" name="q" placeholder="Search..." />
              <InputGroup.Append>
                <Button onClick={onSearch}>Search</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function SongList({ songQuery }) {
  const [songs, loading, error] = useCollectionData(songQuery);
  console.log('radio query', songQuery, songs, loading, error);
  return <pre>{JSON.stringify(songs)}</pre>;
}

function Radio({ radioId }) {
  const [radio, loading, error] = useDocumentData(
    firebase
      .firestore()
      .collection('radios')
      .doc(radioId)
  );

  if (error) throw error;
  if (loading) return <div>Loading...</div>;

  if (!radio) return <div>404</div>;
  return (
    <>
      <h1>Bla</h1>
      <p>Created by {radio.owner}</p>
      <Button variant="success">
        <FaPlay /> Play
      </Button>
      <AddButton />
      <pre>{JSON.stringify(radio, null, 2)}</pre>
      <SongList
        songQuery={firebase
          .firestore()
          .collection('radios')
          .doc(radioId).collection('songs')}
      />
    </>
  );
}

Radio.propTypes = {
  radioId: PropTypes.string.isRequired,
};

export default function RadioWrapper({ radioId }) {
  return <Radio radioId={radioId} />;
}
