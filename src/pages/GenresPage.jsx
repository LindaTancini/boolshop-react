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
    <>
      <div>
        <h3>Generi musicali:</h3>
        <ul className="list-group">
          {genre.map((element) => (
            <li
              key={element.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <Link
                to={`/genres/${element.slug}`}
                className="text-decoration-none text-primary fw-bold"
              >
                {element.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default GenresPage;
