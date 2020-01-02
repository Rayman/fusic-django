import firebase from 'firebase/app';
import 'firebase/firestore';

if (typeof window !== 'undefined') {
  console.log('firebase.initializeApp');
  firebase.initializeApp({
    apiKey: 'AIzaSyA1RHS7iJUNqzz4I-paWSK-t60dbU72HWk',
    // authDomain: '### FIREBASE AUTH DOMAIN ###',
    projectId: 'fusic-firebase',
  });
}

export default firebase;
