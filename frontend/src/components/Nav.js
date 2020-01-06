import React from 'react';
import Col from 'react-bootstrap/Col';
import { Link } from 'gatsby';

export default function Nav() {
  return (
    <Col className="Nav" md={2} as="nav">
      <h1>
        <Link to="/">Fusic</Link>
      </h1>
      <ul>
        <li>Home</li>
        <li>Search</li>
      </ul>
    </Col>
  );
}
