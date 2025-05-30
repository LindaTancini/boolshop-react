import PriceRangeSlider from '../PriceRangeSlider';

export default function PriceRangeFilter({ min, max, value, onChange }) {
  return (
    <PriceRangeSlider min={min} max={max} value={value} onChange={onChange} />
  );
}
