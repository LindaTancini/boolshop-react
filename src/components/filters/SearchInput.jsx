export default function SearchInput({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="input-group mb-2">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder="Cerca album, artista o genere..."
        aria-label="Cerca album, artista o genere"
      />
      <button
        className="btn btn-outline-danger search-button-filter"
        type="submit"
      >
        Cerca
      </button>
    </form>
  );
}
