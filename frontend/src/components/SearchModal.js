import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Media from 'react-bootstrap/Media';
import { FaPlus } from 'react-icons/fa';

import { search } from './api';

export default function SearchModal({ show, onClose, onSelect }) {
  const [results, setResults] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    const { q } = Object.fromEntries(new FormData(e.target));
    search(q).then(videos => {
      setResults(videos);
    });
  }

  function handleSelect(songId) {
    onSelect(songId);
  }

  return (
    <>
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add a song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control type="search" name="q" placeholder="Search..." />
              <InputGroup.Append>
                <Button type="submit">Search</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>

          <div className="mt-3">
            {results.map(song => (
              <Media key={song.id}>
                <img
                  width={64}
                  height={64}
                  className="mr-3"
                  src={song.thumbnail}
                  alt="Generic placeholder"
                />
                <Media.Body>
                  <h5>{song.name}</h5>
                  <p>20k views</p>
                </Media.Body>
                <Button variant="success" onClick={() => handleSelect(song.id)}>
                  <FaPlus />
                </Button>
              </Media>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
