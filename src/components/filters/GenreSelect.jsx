export default function GenreSelect({ genres, value, onChange }) {
  return (
    <select className="form-select" value={value} onChange={onChange}>
      <option value="">Tutti i generi</option>
      {genres.map(g => (
        <option key={g.slug} value={g.name}>{g.name}</option>
      ))}
    </select>
  );
}
