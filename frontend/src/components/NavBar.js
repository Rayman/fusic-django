import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { FaUser, FaLock } from 'react-icons/fa';

import NoSSR from '../components/NoSSR';
import { login, logout } from './api';
import { useAuthState } from './hooks';

import './NavBar.css';

function LoginModal({ show, onClose }) {
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));
    login(data)
      .then(result => {
        setErrors({});
        onClose();
      })
      .catch(err => {
        if (err.response.status === 400) {
          const { email, password } = err.response.data;
          setErrors({ email, password });
        } else {
          setErrors({ message: err.message });
        }
      });
  }

  return (
    <Modal show={show} onHide={onClose} size="sm">
      <Modal.Header closeButton>
        <Modal.Title className="ml-auto">Member login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {errors.message && <Alert variant="danger">{errors.message}</Alert>}

          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Button variant="success" block type="submit">
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
  function handleLogout() {
    logout().then(result => {
      console.log('result', result);
    });
  }

  return (
    <Button className="float-right" variant="link" onClick={handleLogout}>
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
