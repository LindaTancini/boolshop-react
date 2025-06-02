import PropTypes from 'prop-types';
import PriceRangeSlider from '../PriceRangeSlider';

/**
 * Wrapper per slider di prezzo.
 * @param {number} min - Prezzo minimo
 * @param {number} max - Prezzo massimo
 * @param {[number, number]} value - Range selezionato
 * @param {function} onChange - Callback per cambio valore
 */
export default function PriceRangeFilter({ min, max, value, onChange }) {
  return (
    <PriceRangeSlider min={min} max={max} value={value} onChange={onChange} />
  );
}

PriceRangeFilter.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
};
