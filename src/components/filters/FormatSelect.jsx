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
