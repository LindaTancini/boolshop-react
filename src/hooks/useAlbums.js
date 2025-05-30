import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ContextLoader from '../contexts/contextLoader';
import ContextError from '../contexts/contextError';

export default function useAlbums(format = '', filter = {}) {
  // Stato locale per lista album, loading, errori
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // Context globali per loading/error (UI globale)
  const { setIsLoading } = useContext(ContextLoader);
  const { setIsError } = useContext(ContextError);

  useEffect(() => {
    setLoading(true);
    setIsLoading(true);
    let url = 'http://127.0.0.1:3000/api/album';
    if (format) url += `/filter/${format}`; // Se richiesto, filtro per formato
    // Passa eventuali filtri aggiuntivi come query string
    const params = { ...filter };
    axios.get(url, { params })
      .then(res => {
        setAlbums(res.data); // Aggiorna lista album
        setError(false);
      })
      .catch(() => {
        setError(true); // Gestione errori locali e globali
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, [format, JSON.stringify(filter)]);

  // Ritorna stato e dati per il componente chiamante
  return { albums, loading, error };
}
