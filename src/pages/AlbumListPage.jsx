import { useState, useEffect } from 'react';
import { FilterProvider, useFilter } from '../contexts/FilterContext';
import useAlbums from '../hooks/useAlbums';
import useGenres from '../hooks/useGenres';
import useArtists from '../hooks/useArtists';
import usePriceRange from '../hooks/usePriceRange';
import FormatSelect from '../components/filters/FormatSelect';
import GenreSelect from '../components/filters/GenreSelect';
import ArtistSelect from '../components/filters/ArtistSelect';
import PriceRangeFilter from '../components/filters/PriceRangeFilter';
import SearchInput from '../components/filters/SearchInput';
import AlbumGrid from '../components/albums/AlbumGrid';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigate, useLocation } from "react-router-dom";

// Componente principale per la pagina di listing album (tutti, cd, vinili)
function AlbumListPageContent({ format = '' }) {
  // Custom hook per fetch degli album dal backend (con supporto a filtri e loading/error globali)
  const { albums, loading, error } = useAlbums(format);
  // Custom hook per fetch generi e artisti (dati per i select)
  const genres = useGenres();
  const artists = useArtists();
  // Custom hook per ottenere il range di prezzo (slider)
  const minMaxPrice = usePriceRange();
  // Stato e azioni filtri dal context centralizzato (FilterContext)
  const {
    filter, setFilter,                 // ordinamento
    search, setSearch,                 // ricerca testuale
    selectedFormat, setSelectedFormat, // filtro formato
    selectedGenre, setSelectedGenre,   // filtro genere
    selectedArtist, setSelectedArtist, // filtro artista
    priceRange, setPriceRange          // filtro prezzo (slider)
  } = useFilter();
  // Stato locale per la lista filtrata (aggiornata istantaneamente tranne che per la ricerca testuale)
  const [filtered, setFiltered] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelectedFormat(params.get("format") || "");
    setSelectedGenre(params.get("genre") || "");
    setSelectedArtist(params.get("artist") || "");
    setPriceRange(params.get("price-range").split(',') ?? "");
    setSearch(params.get("search") || "");
    setFilter(params.get("filter") || "");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedFormat) params.set("format", selectedFormat);
    if (selectedGenre) params.set("genre", selectedGenre);
    if (selectedArtist) params.set("artist", selectedArtist);
    if (priceRange) params.set("price-range", priceRange);
    if (search) params.set("search", search);
    if (filter) params.set("filter", filter);
    navigate({ search: params.toString() }, { replace: true });
  }, [selectedFormat, selectedGenre, selectedArtist, priceRange, search, filter]);

  // Funzione di filtraggio locale: applica tutti i filtri istantanei (formato, genere, artista, prezzo, ordinamento)
  // La ricerca testuale viene applicata solo al submit
  function filterAlbums(searchText = '') {
    return albums
      .filter(album => {
        // Ogni filtro ha il suo select e viene applicato istantaneamente
        const matchFormat = selectedFormat ? album.format === selectedFormat : true;
        const matchGenre = selectedGenre ? album.genre.name === selectedGenre : true;
        const matchArtist = selectedArtist ? album.artist.name === selectedArtist : true;
        // Lo slider prezzo applica il filtro solo su rilascio (evento change)
        const matchPrice = Number(album.price) >= priceRange[0] && Number(album.price) <= priceRange[1];
        // La ricerca testuale viene applicata solo al submit
        const matchSearch = searchText
          ? album.name.toLowerCase().includes(searchText.toLowerCase()) ||
          album.artist.name.toLowerCase().includes(searchText.toLowerCase()) ||
          album.genre.name.toLowerCase().includes(searchText.toLowerCase())
          : true;
        return matchFormat && matchGenre && matchArtist && matchPrice && matchSearch;
      })
      .sort((a, b) => {
        // Ordinamento istantaneo
        if (filter === 'Alfabetio, A-Z') return a.name.localeCompare(b.name);
        if (filter === 'Alfabetio, Z-A') return b.name.localeCompare(a.name);
        if (filter === 'Data, Dal Più Nuovo') return new Date(b.date) - new Date(a.date);
        if (filter === 'Data, Dal Più Vecchio') return new Date(a.date) - new Date(b.date);
        return 0;
      });
  }

  // Aggiorna la lista filtrata ogni volta che cambia un filtro (eccetto ricerca testuale)
  useEffect(() => {
    setFiltered(filterAlbums(''));
    // eslint-disable-next-line
  }, [albums, filter, selectedFormat, selectedGenre, selectedArtist, priceRange]);

  // Applica la ricerca testuale solo al submit (UX professionale)
  function handleSearchSubmit(e) {
    e.preventDefault();
    setFiltered(filterAlbums(search));
  }

  if (error) return <ErrorMessage />;

  return (
    <>
      {/* Filtri principali: ogni filtro è un componente atomico e riutilizzabile */}
      <div className="mb-4 row align-items-end g-2">
        <div className="col-md-2">
          {/* Select formato: aggiorna istantaneamente il filtro */}
          <FormatSelect formats={[...new Set(albums.map(a => a.format))]} value={selectedFormat} onChange={e => setSelectedFormat(e.target.value)} />
        </div>
        <div className="col-md-2">
          {/* Select genere: aggiorna istantaneamente il filtro */}
          <GenreSelect genres={genres} value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)} />
        </div>
        <div className="col-md-2">
          {/* Select artista: aggiorna istantaneamente il filtro */}
          <ArtistSelect artists={artists} value={selectedArtist} onChange={e => setSelectedArtist(e.target.value)} />
        </div>
        <div className="col-md-3">
          {/* Slider prezzo: applica il filtro solo su rilascio (UX ottimale) */}
          <PriceRangeFilter min={minMaxPrice[0]} max={minMaxPrice[1]} value={priceRange} onChange={setPriceRange} />
        </div>
        <div className="col-md-3">
          {/* Ricerca testuale: applica il filtro solo al submit */}
          <SearchInput value={search} onChange={e => setSearch(e.target.value)} onSubmit={handleSearchSubmit} />
        </div>
      </div>
      {/* Ordinamento: select istantaneo */}
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
      {/* Griglia album filtrati: UI modulare e riutilizzabile */}
      <AlbumGrid albums={filtered} />
    </>
  );
}

export default function AlbumListPage({ format = '' }) {
  return (
    <FilterProvider>
      <AlbumListPageContent format={format} />
    </FilterProvider>
  );
}
