import PropTypes from 'prop-types';

export default function NoSSR({ children }) {
  return typeof window !== 'undefined' ? children : null;
}

NoSSR.propTypes = {
  children: PropTypes.node.isRequired,
};
