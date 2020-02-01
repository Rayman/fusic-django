import React from 'react';
import Col from 'react-bootstrap/Col';
import { Link } from 'gatsby';
import { useStaticQuery, graphql } from 'gatsby';

export default function Nav() {
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
    <Col className="Nav" md={2} as="nav">
      <h1>
        <Link to="/">{data.site.siteMetadata.title} </Link>
      </h1>
      <ul>
        <li>Home</li>
        <li>Search</li>
      </ul>
    </Col>
  );
}
