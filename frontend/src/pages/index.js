import React from 'react';

import RadioList from '../components/RadioList';
import AddRadio from '../components/AddRadio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>
        Latest Radios <AddRadio />
      </h1>
      <RadioList />
      <h1>Latest Playlists</h1>
      ...
    </Layout>
  );
}
