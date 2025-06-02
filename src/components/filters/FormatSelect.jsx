import PropTypes from 'prop-types';

/**
 * Select per filtro formato.
 * @param {Array} formats - Lista formati
 * @param {string} value - Valore selezionato
 * @param {function} onChange - Callback per cambio valore
 */
export default function FormatSelect({ formats, value, onChange }) {
  return (
    <select className="form-select" value={value} onChange={onChange}>
      <option value="">Tutti i formati</option>
      {formats.map(f => (
        <option key={f} value={f}>{f}</option>
      ))}
    </select>
  );
}

FormatSelect.propTypes = {
  formats: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
