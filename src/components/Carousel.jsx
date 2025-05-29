//Importazioni
import { useNavigate } from "react-router-dom";

function Carousel({ albums }) {
  const navigate = useNavigate();
  console.log(albums);
  return (
    <div className="container my-5">
      <div
        id="carouselExample"
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
                <img
                  src={album.imagePath}
                  className="img-fluid rounded"
                  alt={album.title}
                />
              </div>
              <div className="text-black  p-3 mt-2 rounded w-100 text-center">
                <h5>{album.title}</h5>
                <p>{album.price} €</p>
                <button
                  type="button"
                  class="btn btn-outline-secondary"
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
          data-bs-target="#carouselExample"
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
          data-bs-target="#carouselExample"
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

export default Carousel;
