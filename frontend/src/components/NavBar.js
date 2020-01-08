import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from '../firebase';
import 'firebase/auth';

import './NavBar.css';

function LoginLogoutButton() {
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
  else {
    return user ? (
      <Button className="float-right" variant="link" onClick={logout}>
        Logout
      </Button>
    ) : (
      <Button className="float-right" variant="link" onClick={login}>
        Login
      </Button>
    );
  }
}

export default function NavBar() {
  return (
    <div className="NavBar">
      <LoginLogoutButton />
    </div>
  );
}
