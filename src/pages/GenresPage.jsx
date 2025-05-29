//Importazioni
import { useContext, useEffect, useState } from "react";
import ContextLoader from "../contexts/contextLoader";
import ContextError from "../contexts/contextError";
import axios from "axios";
import { Link } from "react-router-dom";

function GenresPage() {
  const [genre, setGenre] = useState([]);
  const api = "http://127.0.0.1:3000/api/genres";
  const { setIsLoading } = useContext(ContextLoader);
  const { setIsError } = useContext(ContextError);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(api)
      .then((res) => {
        console.log(res.data);
        setGenre(res.data);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">
        <i className="bi bi-music-note-list"></i> Generi musicali:
      </h3>
      <div className="row g-4">
        {genre.map((element) => (
          <div key={element.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Link
              to={`/genres/${element.slug}`}
              className="card h-100 text-decoration-none text-dark shadow-sm"
            >
              <div className="card-body d-flex flex-column align-items-center">
                <div className=" d-flex justify-content-center align-items-center mb-3">
                  <i className="bi bi-music-note text-primary fs-3"></i>
                </div>
                <h5 className="card-title text-center">{element.name}</h5>
                <p className="card-text text-center text-muted">
                  {element.description}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GenresPage;
