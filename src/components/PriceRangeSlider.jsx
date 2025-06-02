import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Slider per selezione range di prezzo.
 * @param {number} min - Prezzo minimo
 * @param {number} max - Prezzo massimo
 * @param {[number, number]} value - Range selezionato
 * @param {function} onChange - Callback per cambio valore
 */
export default function PriceRangeSlider({ min, max, value, onChange }) {
  const handleChange = useCallback((vals) => {
    onChange(vals);
  }, [onChange]);

  return (
    <div>
      <div className='d-flex justify-content-center'>
        <input
          className="form-control form-control-sm filter-slider-price mb-2 price-input-min"
          type="number"
          aria-label="Prezzo minimo"
          value={value[0]}
          min={min}
          max={value[1]}
          step={0.01}
          onChange={e => {
            const v = Number(e.target.value);
            if (!isNaN(v)) onChange([v, value[1]]);
          }}
        />
        <span className="mx-2">-</span>
        <input
          className="form-control form-control-sm filter-slider-price mb-2 price-input-max"
          type="number"
          aria-label="Prezzo massimo"
          value={value[1]}
          min={value[0]}
          max={max}
          step={0.01}
          onChange={e => {
            const v = Number(e.target.value);
            if (!isNaN(v)) onChange([value[0], v]);
          }}
        />
      </div>
      <div className="slider-container">
        <Slider
          range
          min={min}
          max={max}
          step={0.01}
          value={value}
          onChange={handleChange}
          allowCross={false}
        />
      </div>
    </div>
  );
}

PriceRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
};
