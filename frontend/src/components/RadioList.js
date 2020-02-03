import React from 'react';
import { Link } from 'gatsby';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import NoSSR from './NoSSR';
import { useRadioList } from './hooks';

function RadioList() {
  const { data, error } = useRadioList({ limit: 5 });
  if (error) throw error;
  if (!data) return <div>Loading...</div>;

  const { results: radios } = data;
  return (
    <CardDeck>
      {radios.map(radio => (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://picsum.photos/100" />
          <Card.Body>
            <Card.Title>
              <Link to={'/radios/' + radio.id} className="stretched-link">
                {radio.name}
              </Link>
            </Card.Title>
            <Card.Text>30 songs, 2 followers</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </CardDeck>
  );

  return (
    <ul>
      {radios.map(radio => (
        <li key={radio.id}>
          <Link to={'/radios/' + radio.id}>{radio.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function RadioListWrapper() {
  return (
    <NoSSR>
      <RadioList />
    </NoSSR>
  );
}
