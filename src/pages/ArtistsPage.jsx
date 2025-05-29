import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ArtistsPage = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        axios.get('http://127.0.0.1:3000/api/artists')
            .then(response => {

                setArtists(response.data);
            })
            .catch(err => {

                if (err.response) {
                    setError(`Errore: ${err.response.status} - ${err.response.data.message || 'Errore del server'}`);
                } else if (err.request) {
                    setError("Errore di rete: Nessuna risposta dal server.");
                } else {
                    setError(`Errore: ${err.message}`);
                }
            })
            .finally(() => {

                setLoading(false);
            });
    }, []);
    if (loading) {
        return <div>Caricamento artisti</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Errore: {error}</div>;
    }

    return (
        <div>
            <h1>Elenco Artisti</h1>
            <ul className="list-group">
                {artists.map((artist) => (
                    <li key={artist.id} className="list-group-item d-flex justify-content-between align-items-center">

                        <Link to={`/artists/${artist.slug}`} className="text-decoration-none text-primary fw-bold">

                            {artist.name}
                        </Link>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default ArtistsPage;