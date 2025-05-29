import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const AnArtistPage = () => {
    const { slug } = useParams();
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (slug) {
            axios.get(`http://127.0.0.1:3000/api/artists/${slug}`)
                .then(response => {
                    setArtist(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    if (err.response) {
                        setError(`Errore: ${err.response.status} - ${err.response.data.message || 'Errore del server'}`);
                    } else if (err.request) {
                        setError("Errore di rete: Nessuna risposta dal server.");
                    } else {
                        setError(`Errore: ${err.message}`);
                    }
                    setLoading(false);
                });
        }
    }, [slug]);

    if (loading) {
        return <div>Caricamento informazioni artista</div>;
    }

    if (error) {
        return <div className="alert alert-danger" role="alert">{error}</div>;
    }

    // Formattazione della data di nascita
    const birthDate = artist.birth_date ? new Date(artist.birth_date).toLocaleDateString() : 'N/D';

    return (
        <div className="container mt-4">
            <h1 className="mb-4">{artist.name}</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Informazioni Artista</h5>
                    <p className="card-text">
                        <strong>Data di Nascita:</strong> {birthDate}
                    </p>
                    <p className="card-text">
                        <strong>Biografia:</strong> {artist.biography}
                    </p>
                </div>
            </div>
            <Link to="/artists" className="btn btn-primary mt-4">Torna all'elenco artisti</Link>
        </div>
    );
};

export default AnArtistPage;