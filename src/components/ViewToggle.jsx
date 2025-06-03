function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div className="d-flex justify-content-end align-items-center gap-2 mb-3">
      <button
        className={`btn btn-sm ${
          viewMode === "grid" ? "search-button-filter" : "button-orange-outline"
        }`}
        onClick={() => setViewMode("grid")}
        title="Griglia"
      >
        <i className="bi bi-grid"></i>
      </button>
      <button
        className={`btn btn-sm ${
          viewMode === "list" ? "search-button-filter" : "button-orange-outline"
        }`}
        onClick={() => setViewMode("list")}
        title="Lista"
      >
        <i className="bi bi-list"></i>
      </button>
    </div>
  );
}

export default ViewToggle;
