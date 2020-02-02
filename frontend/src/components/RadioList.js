import React from 'react';
import { Link } from 'gatsby';

import NoSSR from './NoSSR';
import { useRadioList } from './hooks';

function RadioList() {
  const { data: radios, error } = useRadioList();
  if (error) throw error;
  if (!radios) return <div>Loading...</div>;

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
