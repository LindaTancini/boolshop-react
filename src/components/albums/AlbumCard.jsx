import { Link } from 'react-router-dom';

export default function AlbumCard({ album }) {
  return (
    <div className="col-12 col-md-4 gy-3">
      <Link to={`/album/${album.slug}`} className="text-decoration-none">
        <div className="card g-3 h-100 p-2">
          <img
            src={album.imagePath}
            className="card-img-top img-fluid rounded img-filter-album"
            alt={album.name}
          />
          <div className="card-body">
            <p className="card-text mb-1">
              <span className="fw-semibold">Titolo:</span> {album.name}
            </p>
            <p className="card-text mb-1">
              <span className="fw-semibold">Artista:</span> {album.artist.name}
            </p>
            <p className="card-text mb-1">
              <span className="fw-semibold">Genere:</span> {album.genre.name}
            </p>
            <p className="card-text mb-1">
              <span className="fw-semibold">Prezzo:</span> {album.price} €
            </p>
            <p className="card-text mb-1">
              <span className="fw-semibold">Data:</span> {new Date(album.date).toLocaleDateString('it-IT')}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
