import PropTypes from 'prop-types';

/**
 * Messaggio di errore generico.
 * @param {string} message - Testo errore
 */
export default function ErrorMessage({ message = 'Si è verificato un errore.' }) {
  return <div className="alert alert-danger text-center my-4">{message}</div>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};
