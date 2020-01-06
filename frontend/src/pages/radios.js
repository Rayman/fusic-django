import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavBar from '../components/NavBar';
import Nav from '../components/Nav';
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

            <h1>Hello</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}
