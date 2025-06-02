import PropTypes from 'prop-types';

/**
 * Input di ricerca testuale per album, artista o genere.
 * @param {string} value - Valore attuale dell'input
 * @param {function} onChange - Callback per cambio valore
 * @param {function} onSubmit - Callback per submit
 */
export default function SearchInput({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="input-group mb-2">
      <input
        type="text"
        className="form-control color-input"
        value={value}
        onChange={onChange}
        placeholder="Cerca album, artista o genere..."
        aria-label="Cerca album, artista o genere"
      />
      <button
        className="btn btn-outline-danger search-button-filter"
        type="submit"
      >
        Cerca
      </button>
    </form>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
