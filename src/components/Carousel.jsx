//Importazioni
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Carousel({ albums }) {
  const navigate = useNavigate();
  //Funzione per avere più album nella slide del carosello
  const moreAlbums = [];
  for (let i = 0; i < albums.length; i += 3) {
    moreAlbums.push(albums.slice(i, i + 3));
  }
  return (
    <div className="container my-5">
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {moreAlbums.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`carousel-item ${groupIndex === 0 ? "active" : ""}`}
            >
              <div className="row justify-content-center g-3">
                {group.map((album) => (
                  <div key={album.id} className="col-12 col-sm-6 col-md-4 p-2">
                    <Link
                      to={`/album/${album.slug}`}
                      className="text-decoration-none"
                    >
                      <img
                        src={album.imagePath}
                        className="img-fluid rounded img-contain-carousel img-hover-effect"
                        alt={album.title}
                      />
                    </Link>
                    <div className="text-black p-3 mt-2 rounded text-center">
                      <h5>{album.title}</h5>
                      <p className="album-price">{album.price} €</p>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => navigate(`/album/${album.slug}`)}
                      >
                        Più Dettagli
                      </button>
                    </div>
                  </div>
                ))}
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
