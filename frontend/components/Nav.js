import React from 'react';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';

export default function Nav() {
  return (
    <Col className="Nav" md={2} as="nav">
      <h1>
        <Link href="/">
          <a>Fusic</a>
        </Link>
      </h1>
      <ul>
        <li>Home</li>
        <li>Search</li>
      </ul>
    </Col>
  );
}
