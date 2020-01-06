import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RadioList from '../components/RadioList';
import AddRadio from '../components/AddRadio';
import NavBar from '../components/NavBar';
import Nav from '../components/Nav';

export default function Home() {
  return (
    <>
      <Container fluid>
        <Row>
          <Nav />
          <Col>
            <NavBar />

            <h1>
              Hello <AddRadio />
            </h1>
            <RadioList />
          </Col>
        </Row>
      </Container>
    </>
  );
}
