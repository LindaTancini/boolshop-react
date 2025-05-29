import { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from "react";
import ContextLoader from "../contexts/contextLoader";
import ContextError from "../contexts/contextError";

function CardVinyl() {
  const [albums, setAlbums] = useState([]);
  const [search, setSearch] = useState([]);

  const { setIsLoading } = useContext(ContextLoader);
  const { setIsError } = useContext(ContextError);

  let api = 'http://127.0.0.1:3000/api/album/filter/vinyl';

  function searchAlbum(e) {
    e.preventDefault();
    getAlbums();
  }

  function getAlbums() {
    setIsLoading(true);
    axios
      .get(api, {
        params: {
          search
        }
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

  useEffect(getAlbums, [search]);
  console.log(albums)

  return (
    <>
      <form onSubmit={searchAlbum}>
        <label htmlFor="searchAlbum" />
        <input type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="album to search..."
        />
        <button className="btn btn-outline-danger mx-2" type="submit">Search</button>
      </form>

      <div className="row">
        {albums.map(album => (
          <div className="col-12 col-md-4 gy-3" key={album.id}>
            <div className="card g-3 h-100">
              <img src={album.imagePath} className="card-img-top img-fluid rounded img-filter-album" alt={album.title} />
              <div className="card-body">
                <p className="card-text">
                  Titolo: <strong>{album.title}</strong>
                  {/* Artista: <strong>{album.artist.name}</strong> */}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CardVinyl;
