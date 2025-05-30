import React from "react";
import { useFilter } from "../contexts/FilterContext";

export default function AlbumSortBar() {
  const { filter, setFilter } = useFilter();
  return (
    <div className="d-flex justify-content-end align-items-center mb-4 gap-2">
      <span className="fw-semibold">Ordina per:</span>
      <select
        id="filterAlbum"
        className="form-select w-auto d-inline-block"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      >
        <option value="">Predefinito</option>
        <option>Alfabetio, A-Z</option>
        <option>Alfabetio, Z-A</option>
        <option>Data, Dal Più Nuovo</option>
        <option>Data, Dal Più Vecchio</option>
      </select>
    </div>
  );
}

// Legacy file, replaced by select in AlbumListPage. Safe to delete.
