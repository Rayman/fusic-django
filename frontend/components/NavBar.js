import React from 'react';
import Button from 'react-bootstrap/Button';

import { useAuthState } from 'react-firebase-hooks/auth';
import 'firebase/auth';

import firebase from '../firebase';

export default function NavBar() {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (error) throw error;

  function login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  function logout() {
    firebase.auth().signOut();
  }

  if (loading) return null;

  console.log('gooooo', user);

  return user ? (
    <Button variant="link" onClick={logout}>
      Logout
    </Button>
  ) : (
    <Button variant="link" onClick={login}>
      Login
    </Button>
  );
}
