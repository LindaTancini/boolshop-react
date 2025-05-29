import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import ContextLoader from "../contexts/contextLoader";
import ContextError from "../contexts/contextError";
import { Link } from "react-router-dom";

function CardCd() {
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState([]);
  const [filter, setFilter] = useState("");

  const { setIsLoading } = useContext(ContextLoader);
  const { setIsError } = useContext(ContextError);

  let api = "http://127.0.0.1:3000/api/album/filter/cd";

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
  console.log(albums);

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
            placeholder="Cerca un CD..."
            aria-label="Search CD"
          />
          <button className="btn btn-outline-secondary" type="submit">
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
              <div className="card g-3 h-100 p-2">
                <img
                  src={album.imagePath}
                  className="card-img-top img-fluid rounded img-filter-album "
                  alt={album.name}
                />
                <div className="card-body">
                  <p className="card-text">
                    Titolo: <strong>{album.name}</strong>
                  </p>
                  <p className="card-text">
                    Artista: <strong>{album.artist.name}</strong>
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

export default CardCd;
