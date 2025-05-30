import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ContextLoader from '../contexts/contextLoader';
import ContextError from '../contexts/contextError';

export default function useGenres() {
  const [genres, setGenres] = useState([]);
  const { setIsLoading } = useContext(ContextLoader);
  const { setIsError } = useContext(ContextError);
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://127.0.0.1:3000/api/genres')
      .then(res => setGenres(res.data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);
  return genres;
}
