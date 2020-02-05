import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Container from 'react-bootstrap/Container';
import { FaPlus, FaPlay, FaThumbsUp } from 'react-icons/fa';

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

function UpVote() {
  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip>Bla</Tooltip>}
    >
      <img
        width={32}
        height={32}
        className="align-self-end mr-3"
        src="https://picsum.photos/32"
      />
    </OverlayTrigger>
  );
}

function Radio({ radioId }) {
  const { data: radio, error } = useRadio(radioId);

  if (error) throw error;
  if (!radio) return <div>Loading...</div>;

  return (
    <>
      <Media className="mb-3">
        <img
          width={200}
          height={200}
          className="align-self-end mr-3"
          src="https://picsum.photos/200"
        />
        <Media.Body className="align-self-end">
          <h2 className="h4">Radio</h2>
          <h1>{radio.name}</h1>
          <p>Created by {radio.owner}, 100 songs, 6 hours</p>

          <p className="mb-0">
            <Button variant="success">
              <FaPlay /> Play
            </Button>
            <AddSongButton radioId={radio.id} />
          </p>
        </Media.Body>
      </Media>

      <Container>
        <ListGroup variant="flush">
          {radio.songs.map(song => (
            <ListGroup.Item className="d-flex justify-content-between">
              <div className="flex-grow-1">{song.name}</div>

              <UpVote />

              <Button>
                <FaThumbsUp />
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
}

Radio.propTypes = {
  radioId: PropTypes.string.isRequired,
};

export default function RadioWrapper({ radioId }) {
  return <Radio radioId={radioId} />;
}
