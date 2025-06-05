import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


const AnArtistPage = () => {
    const navigate = useNavigate();
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

    const imageUrl = artist.image_url ? `http://127.0.0.1:3000/${artist.image_url}` : '';

    return (
        <div className="container mt-4">
            <h1 className="mb-4">{artist.name}</h1>
            <div className="custom-artist-card card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Informazioni Artista</h5>
                    <img src={imageUrl} className="img-fluid mb-3" alt={artist.name} />
                    <p className="card-text">
                        <strong>Data di Nascita:</strong> {birthDate}
                    </p>
                    <p className="card-text">
                        <strong>Biografia:</strong> {artist.biography}
                    </p>
                </div>
            </div>
            <button
                className="button-orange-outline"
                onClick={() => navigate("/artists")}
            >Torna all'elenco artisti
            </button>
        </div>
    );
};

export default AnArtistPage;