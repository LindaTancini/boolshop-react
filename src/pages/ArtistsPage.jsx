import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ContextLoader from "../contexts/contextLoader";
import ContextError from "../contexts/contextError";

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState([]);

  const api = "http://127.0.0.1:3000/api/artists";
  const { setIsLoading } = useContext(ContextLoader);
  const { setIsError } = useContext(ContextError);

  function searchArtist(e) {
    e.preventDefault();
    getArtists();
  }

  function getArtists() {
    setIsLoading(true);
    setIsError(false);

    axios
      .get(api, {
        params: {
          search,
        },
      })
      .then((res) => {
        setArtists(res.data);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(getArtists, [search]);

  // if (!artists.length) return <p>Caricamento...</p>;

  return (
    <div>
      <form onSubmit={searchArtist} className="mb-4 d-flex justify-content-end mt-4">
        <div className="input-group w-50">
          <input
            id="searchAlbum"
            type="text"
            className="form-control"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Cerca un Artista..."
            aria-label="Search Artist"
          />
          <button className="btn btn-outline-danger" type="submit">
            Cerca
          </button>
        </div>
      </form>
      <h1>Elenco Artisti</h1>
      <ul className="list-group ">
        {artists.map((artist) => (
          <li
            key={artist.id}
            className="list-group-item d-flex justify-content-between align-items-center  artists"
          >
            <Link
              to={`/artists/${artist.slug}`}
              className="no-link-color text-decoration-none fw-bold"
            >
              {artist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistsPage;
