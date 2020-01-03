import React from 'react';
import Head from 'next/head';
import RadioList from '../components/RadioList';

function NoSSR({ children }) {
  return typeof window !== `undefined` ? children : null;
}

const Home = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>

    <h1>Hello</h1>
    <NoSSR>
      <RadioList />
    </NoSSR>
  </>
);

export default Home;
