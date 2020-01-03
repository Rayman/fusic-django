import firebase from 'firebase/app';

if (typeof window !== 'undefined') {
  console.log('firebase.initializeApp');
  firebase.initializeApp({
    apiKey: 'AIzaSyA1RHS7iJUNqzz4I-paWSK-t60dbU72HWk',
    authDomain: 'fusic-firebase.firebaseapp.com',
    projectId: 'fusic-firebase',
  });
}

export default firebase;
