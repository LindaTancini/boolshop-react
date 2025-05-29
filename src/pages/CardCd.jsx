import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from "react";
import ContextLoader from "../contexts/contextLoader";
import ContextError from "../contexts/contextError";

function CardCd() {
  const [albums, setAlbums] = useState([]);


  const { setIsLoading } = useContext(ContextLoader);
  const { setIsError } = useContext(ContextError);

  function getAlbums() {
    setIsLoading(true);
    axios.get('http://127.0.0.1:3000/api/album/filter/cd')
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

  useEffect(getAlbums, []);
  console.log(albums)

  return (
    <>
      <div className="row">
        {albums.map(album => (
          <div className="col-12 col-md-4 gy-3" key={album.id}>
            <div className="card g-3 h-100">
              <img src={album.imagePath} className="card-img-top img-fluid rounded img-filter-album" alt={album.name}/>
                <div className="card-body">
                  <p className="card-text">
                    Titolo: <strong>{album.name}</strong>
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

export default CardCd;
