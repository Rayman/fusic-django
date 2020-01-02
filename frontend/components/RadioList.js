import React from 'react';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import firebase from './firebase';

export default function RadioList() {
  const [snapshot, loading, error] = useCollectionOnce(
    firebase.firestore().collection('radios')
  );
  console.log(snapshot, loading, error);
  return (
    <ul>
      <li>hoi</li>
    </ul>
  );
}
