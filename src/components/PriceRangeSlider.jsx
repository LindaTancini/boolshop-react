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
      <div className="slider-container mb-2">
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
      <div className='d-flex justify-content-between'>
        <input
          className="slider-range-min form-control form-control-sm filter-slider-price mb-2 price-input-min"
          type="text"
          inputmode="numeric"
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
        <span className="mx-2"><b>€</b></span>
        <span className="mx-2"><b>-</b></span>
        <input
          className="slider-range-max form-control form-control-sm filter-slider-price mb-2 price-input-max"
          type="text"
          inputmode="numeric"
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
        <span className="mx-2"><b>€</b></span>
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
