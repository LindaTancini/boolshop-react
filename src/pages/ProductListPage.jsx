import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ContextLoader from "../contexts/contextLoader";
import ContextError from "../contexts/contextError";

function ProductListPage() {
  const [albums, setAlbums] = useState([]);
  // const [query, setQuery] = useState('');
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState([]);
  const api = "http://127.0.0.1:3000/api/album/";

  const { setIsLoading } = useContext(ContextLoader);
  const { setIsError } = useContext(ContextError);

  function searchAlbum(e) {
    e.preventDefault();
    getAlbums();
  }

  function getAlbums() {
    setIsLoading(true);
    axios
      .get(api, {
        params: {
          search,
          filter,
        },
      })
      .then((res) => {
        setAlbums(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(getAlbums, [filter, search]);

  return (
    <>
      <form onSubmit={searchAlbum} className="mb-4 d-flex justify-content-end">
        <div className="input-group w-50">
          <input
            id="searchAlbum"
            type="text"
            className="form-control"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Cerca un CD o un Vinile..."
            aria-label="Search cd or vinyl"
          />
          <button className="btn btn-outline-danger" type="submit">
            Cerca
          </button>
        </div>
      </form>
      <div className="d-flex justify-content-end mb-4">
        <div className="w-50">
          <label htmlFor="filterAlbum" className="form-label fw-semibold">
            Filtra per
          </label>
          <select
            id="filterAlbum"
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">---</option>
            <option>ordine crescente per nome</option>
            <option>ordine decrescente per nome</option>
            <option>i più vecchi</option>
            <option>i più nuovi</option>
          </select>
        </div>
      </div>
      <div className="row">
        {albums.map((album) => (
          <div className="col-12 col-md-4 gy-3" key={album.id}>
            <Link to={`/album/${album.slug}`} className="text-decoration-none">
              <div className="card g-3 h-100 ">
                <img
                  src={album.imagePath}
                  className="card-img-top img-fluid rounded img-filter-album"
                  alt={album.name}
                />
                <div className="card-body">
                  <p className="card-text">
                    Titolo: <strong>{album.name}</strong>
                    {/* Artista: <strong>{album.artist.name}</strong> */}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductListPage;
