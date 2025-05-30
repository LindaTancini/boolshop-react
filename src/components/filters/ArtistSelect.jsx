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
