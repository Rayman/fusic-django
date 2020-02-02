import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Media from 'react-bootstrap/Media';
import { FaPlus, FaPlay } from 'react-icons/fa';

import { useRadio, search } from './hooks';

function AddButton() {
  const [show, setShow] = useState(false);
  const [results, setResults] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function onSearch(e) {
    e.preventDefault();

    const { q } = Object.fromEntries(new FormData(e.target.form));
    search(q).then(videos => {
      setResults(videos);
    });
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

          {results.map(song => (
            <Media>
              <img
                width={64}
                height={64}
                className="mr-3"
                src="holder.js/64x64"
                alt="Generic placeholder"
              />
              <Media.Body>
                <h5>{song.name}</h5>
                <p>20k views</p>
              </Media.Body>
            </Media>
          ))}
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

function Radio({ radioId }) {
  const { data: radio, error } = useRadio(radioId);

  if (error) throw error;
  if (!radio) return <div>Loading...</div>;

  return (
    <>
      <h1>Bla</h1>
      <p>Created by {radio.owner}</p>
      <Button variant="success">
        <FaPlay /> Play
      </Button>
      <AddButton />
      <pre>{JSON.stringify(radio, null, 2)}</pre>
      {/* TODO: list of songs */}
    </>
  );
}

Radio.propTypes = {
  radioId: PropTypes.string.isRequired,
};

export default function RadioWrapper({ radioId }) {
  return <Radio radioId={radioId} />;
}
