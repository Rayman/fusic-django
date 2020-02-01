import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useStaticQuery, graphql } from 'gatsby';

import Nav from './Nav';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Container fluid>
      <Row>
        <Nav />
        <Col>
          <NavBar />
          <main>{children}</main>
        </Col>
      </Row>
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
