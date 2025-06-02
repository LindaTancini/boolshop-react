import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Hook per ottenere il range di prezzo minimo/massimo dagli album.
 * @returns {[number, number]} Array [min, max]
 */
export default function usePriceRange() {
  const [range, setRange] = useState([0, 100]); // Stato locale: [min, max]
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/api/album/price-range')
      .then(res => {
        // Parsing e fallback se la risposta non è valida
        let min = Number(res.data?.minPrice);
        let max = Number(res.data?.maxPrice);
        if (isNaN(min) || isNaN(max)) {
          setRange([0, 100]);
        } else {
          setRange([min, max]);
        }
      })
      .catch(() => setRange([0, 100])); // In caso di errore, fallback
  }, []);
  return range;
}
