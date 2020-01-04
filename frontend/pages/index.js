import React from 'react';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RadioList from '../components/RadioList';
import AddRadio from '../components/AddRadio';
import NavBar from '../components/NavBar';
import Nav from '../components/Nav';
import NoSSR from '../components/NoSSR';

export default function Home() {
  return (
    <>
      <Head>
        <title>Fusic</title>
      </Head>

      <Container fluid>
        <Row>
          <Nav />
          <Col>
            <NoSSR>
              <NavBar />
            </NoSSR>

            <h1>
              Hello <AddRadio />
            </h1>
            <NoSSR>
              <RadioList />
            </NoSSR>
          </Col>
        </Row>
      </Container>
    </>
  );
}
