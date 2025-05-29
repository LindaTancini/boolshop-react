//Importazioni
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function CarouselBis({ albums }) {
  const navigate = useNavigate();
  return (
    <div className="container my-5">
      <div
        id="carouselExample-bis"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {albums.map((album, index) => (
            <div
              key={album.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div className="d-flex justify-content-center">
                <Link to={`/album/${album.slug}`} className="text-decoration-none">
                  <img
                    src={album.imagePath}
                    className="img-fluid rounded img-contain"
                    alt={album.title}
                  />
                </Link>
              </div>
              <div className="text-black  p-3 mt-2 rounded w-100 text-center">
                <h5>{album.title}</h5>
                <p>{album.price} €</p>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(`/album/${album.slug}`)}
                >
                  Più Dettagli
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample-bis"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample-bis"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default CarouselBis;
