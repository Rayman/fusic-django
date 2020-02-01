import React from 'react';
import { Router } from '@reach/router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavBar from '../components/NavBar';
import Nav from '../components/Nav';
import Radio from '../components/Radio';
import NoSSR from '../components/NoSSR';

export default function Home() {
  return (
    <>
      <Container fluid>
        <Row>
          <Nav />
          <Col>
            <NoSSR>
              <NavBar />
            </NoSSR>

            <Router>
              <Radio path="/radios/:radioId" />
            </Router>
          </Col>
        </Row>
      </Container>
    </>
  );
}
