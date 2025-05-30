export default function SearchInput({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="input-group">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder="Cerca album, artista o genere..."
        aria-label="Cerca album, artista o genere"
      />
      <button className="btn btn-danger" type="submit">Cerca</button>
    </form>
  );
}
