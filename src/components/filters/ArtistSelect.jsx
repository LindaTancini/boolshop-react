import PropTypes from 'prop-types';

/**
 * Select per filtro artista.
 * @param {Array} artists - Lista artisti
 * @param {string} value - Valore selezionato
 * @param {function} onChange - Callback per cambio valore
 */
export default function ArtistSelect({ artists, value, onChange }) {
  return (
    <select className="form-select" value={value} onChange={onChange}>
      <option value="">Tutti gli artisti</option>
      {artists.map(a => (
        <option key={a.slug} value={a.name}>{a.name}</option>
      ))}
    </select>
  );
}

ArtistSelect.propTypes = {
  artists: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
