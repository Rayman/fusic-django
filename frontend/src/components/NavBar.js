import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';

import NoSSR from '../components/NoSSR';
import { useAuthState } from './hooks';

import './NavBar.css';

function LoginModal({ show, onClose }) {
  return (
    <Modal show={show} onHide={onClose} size="sm">
      <Modal.Header closeButton>
        <Modal.Title className="ml-auto">Member login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">
                  <FaUser />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="email" placeholder="Email" />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="password" placeholder="Password" />
            </InputGroup>
          </Form.Group>

          <Button variant="success" block>
            Login
          </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="link" block size="sm">
          Forgot password?
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function LoginButton() {
  const [show, setShow] = useState(false);

  function login() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  return (
    <>
      <Button className="float-right" variant="link" onClick={login}>
        Login
      </Button>
      <LoginModal show={show} onClose={handleClose} />
    </>
  );
}

function LogoutButton() {
  function logout() {
    // TODO: logout
  }

  return (
    <Button className="float-right" variant="link" onClick={logout}>
      Logout
    </Button>
  );
}

function LoginLogoutButton() {
  const [user, loading, error] = useAuthState();

  if (error) throw error;
  if (loading) return null;
  return user ? <LogoutButton /> : <LoginButton />;
}

export default function NavBar() {
  return (
    <div className="NavBar">
      <NoSSR>
        <LoginLogoutButton />
      </NoSSR>
    </div>
  );
}
