import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ContextLoader from '../contexts/contextLoader';
import ContextError from '../contexts/contextError';

export default function useArtists() {
  const [artists, setArtists] = useState([]);
  const { setIsLoading } = useContext(ContextLoader);
  const { setIsError } = useContext(ContextError);
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://127.0.0.1:3000/api/artists')
      .then(res => setArtists(res.data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);
  return artists;
}
