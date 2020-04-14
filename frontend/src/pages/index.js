import React from 'react';

import RadioList from '../components/RadioList';
import AddRadio from '../components/AddRadio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { useAuthState } from '../components/hooks';

export default function Home() {
  const [user, _, error] = useAuthState();
  if (error) throw error;
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Latest Radios {user && <AddRadio />}</h1>
      <RadioList />
      <h1>Latest Playlists</h1>
      ...
    </Layout>
  );
}
