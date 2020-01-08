import React from 'react';
import PropTypes from 'prop-types';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import firebase from '../firebase';
import 'firebase/firestore';

function Radio({ radioId }) {
  const [radio, loading, error] = useDocumentData(
    firebase
      .firestore()
      .collection('radios')
      .doc(radioId)
  );

  if (error) throw error;
  if (loading) return <div>Loading...</div>;

  if (!radio) return <div>404</div>;

  return <pre>{JSON.stringify(radio, null, 2)}</pre>;
}

Radio.propTypes = {
  radioId: PropTypes.string.isRequired,
};

export default function RadioWrapper({ radioId }) {
  return <Radio radioId={radioId} />;
}
