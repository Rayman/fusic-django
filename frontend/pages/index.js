import React from 'react';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import RadioList from '../components/RadioList';
import AddRadio from '../components/AddRadio';
import NavBar from '../components/NavBar';

function NoSSR({ children }) {
  return typeof window !== `undefined` ? children : null;
}

function Nav() {
  return (
    <Col className="Nav" md={2} as="nav">
      <h1>Fusic</h1>
      <ul>
        <li>Home</li>
        <li>Search</li>
      </ul>
    </Col>
  );
}

function Home() {
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

export default Home;
