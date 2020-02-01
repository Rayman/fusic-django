import React from 'react';
import { Link } from 'gatsby';

import NoSSR from '../components/NoSSR';

function RadioList() {
  const [radios, loading, error] = [null, true, false]; // TODO: api call

  if (error) throw error;
  if (loading) return <div>Loading...</div>;

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
