import PropTypes from 'prop-types';

export default function GenreSelect({ genres, value, onChange }) {
  return (
    <select className="form-select" value={value} onChange={onChange}>
      <option value="">Tutti i generi</option>
      {genres.map(g => (
        <option key={g.slug} value={g.name}>{g.name}</option>
      ))}
    </select>
  );
}

/**
 * Select per filtro genere.
 * @param {Array} genres - Lista generi
 * @param {string} value - Valore selezionato
 * @param {function} onChange - Callback per cambio valore
 */
GenreSelect.propTypes = {
  genres: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
