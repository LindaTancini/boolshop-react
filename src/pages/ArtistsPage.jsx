import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ContextLoader from "../contexts/contextLoader";
import ContextError from "../contexts/contextError";

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const api = "http://127.0.0.1:3000/api/artists";
  const { setIsLoading } = useContext(ContextLoader);
  const { setIsError } = useContext(ContextError);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    axios
      .get(api)
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
  }, [api]);

  if (!artists.length) return <p>Caricamento...</p>;

  return (
    <div>
      <h1>Elenco Artisti</h1>
      <ul className="list-group">
        {artists.map((artist) => (
          <li
            key={artist.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <Link
              to={`/artists/${artist.slug}`}
              className="text-decoration-none text-primary fw-bold"
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
