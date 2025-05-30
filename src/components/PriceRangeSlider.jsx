import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { useCallback } from 'react';

export default function PriceRangeSlider({ min, max, value, onChange }) {
  const handleChange = useCallback((vals) => {
    onChange(vals);
  }, [onChange]);

  return (
    <div>
      <div>
        <input
          className="form-control form-control-sm"
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
          style={{ width: 70, display: 'inline-block' }}
        />
        <span className="mx-2">-</span>
        <input
          className="form-control form-control-sm"
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
          style={{ width: 70, display: 'inline-block' }}
        />
      </div>
      <div style={{ margin: '0 10px' }}>
        <Slider
          range
          min={min}
          max={max}
          step={0.01}
          value={value}
          onChange={handleChange}
          allowCross={false}
          styles={{
            track: { backgroundColor: '#f78f45' },
            rail: { backgroundColor: '#323a6d' },
            handle: { backgroundColor: '#f78f45', borderColor: '#fff' }
          }}
        />
      </div>
    </div>
  );
}
