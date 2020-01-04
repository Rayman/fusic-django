import React from 'react';
import Button from 'react-bootstrap/Button';

import { useAuthState } from 'react-firebase-hooks/auth';
import 'firebase/auth';

import firebase from '../firebase';

import './NavBar.css';

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

  let loginLogoutButton = null;
  if (!loading) {
    loginLogoutButton = user ? (
      <Button className="float-right" variant="link" onClick={logout}>
        Logout
      </Button>
    ) : (
      <Button className="float-right" variant="link" onClick={login}>
        Login
      </Button>
    );
  }

  return <div className="NavBar">{loginLogoutButton}</div>;
}
