import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import { FaPlus, FaPlay } from 'react-icons/fa';

import { useRadio, upVote } from './hooks';
import SearchModal from './SearchModal';

function AddSongButton({ radioId }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSelect = songId => {
    upVote(radioId, songId);
  };

  return (
    <>
      <Button onClick={handleShow}>
        <FaPlus /> Add a song
      </Button>
      <SearchModal show={show} onClose={handleClose} onSelect={handleSelect} />
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
      <AddSongButton radioId={radio.id} />
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
