import 'nouislider/dist/nouislider.css';
import noUiSlider from 'nouislider';
import { useEffect, useRef } from 'react';

export default function PriceRangeSlider({ min, max, value, onChange }) {
  const sliderRef = useRef(null);
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;
    if (!noUiSlider) return;
    if (sliderRef.current.noUiSlider) {
      sliderRef.current.noUiSlider.destroy();
    }
    noUiSlider.create(sliderRef.current, {
      start: value,
      connect: true,
      range: { min, max },
      step: 1,
      tooltips: [true, true],
      format: {
        to: v => Number(v).toFixed(2),
        from: v => Number(v)
      }
    });
    // Aggiorna solo quando l'utente rilascia lo slider (evento 'change')
    sliderRef.current.noUiSlider.on('change', (values) => {
      minInputRef.current.value = values[0];
      maxInputRef.current.value = values[1];
      onChange([Number(values[0]), Number(values[1])]);
    });
    // Aggiorna i tooltip e input in tempo reale (ma non applica il filtro)
    sliderRef.current.noUiSlider.on('update', (values) => {
      minInputRef.current.value = values[0];
      maxInputRef.current.value = values[1];
    });
    // Aggiorna slider se value cambia da fuori
    sliderRef.current.noUiSlider.set(value);
    // eslint-disable-next-line
  }, [min, max]);

  return (
    <div className="gf-block-content">
      <div className="gf-range-inputs mb-2">
        <input
          className="gf-range-min form-control form-control-sm"
          ref={minInputRef}
          type="text"
          aria-label="Prezzo minimo"
          defaultValue={value[0]}
          onBlur={e => sliderRef.current.noUiSlider.set([e.target.value, null])}
          style={{ width: 70, display: 'inline-block' }}
        />
        <span className="gf-range-split mx-2">-</span>
        <input
          className="gf-range-max form-control form-control-sm"
          ref={maxInputRef}
          type="text"
          aria-label="Prezzo massimo"
          defaultValue={value[1]}
          onBlur={e => sliderRef.current.noUiSlider.set([null, e.target.value])}
          style={{ width: 70, display: 'inline-block' }}
        />
      </div>
      <div ref={sliderRef} className="gf-range-slider" style={{ margin: '0 10px' }}></div>
    </div>
  );
}
