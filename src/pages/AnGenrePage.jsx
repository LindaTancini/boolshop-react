//Importazioni
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ContextLoader from "../contexts/contextLoader";
import ContextError from "../contexts/contextError";

function AnGenrePage() {
  const { slug } = useParams();
  const api = `http://127.0.0.1:3000/api/genres/${slug}`;
  const [genre, setGenre] = useState(null);
  const { setIsLoading } = useContext(ContextLoader);
  const { setIsError } = useContext(ContextError);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(api)
      .then((res) => {
        setGenre(res.data);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  if (!genre) return <p>Caricamento...</p>;

  return (
    <div>
      <h2>{genre.name}</h2>
      <p>{genre.description}</p>
    </div>
  );
}

export default AnGenrePage;
