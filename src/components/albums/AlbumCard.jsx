import { Link } from "react-router-dom";
import { useEffect } from "react";
export default function AlbumCard({ album, cart, setCart, wish, setWish }) {
  function addToCart() {
    setCart([...cart, album]);
    console.log(cart);
  }

  function addToWish(){
    const wishElementExist = wish.find(w => w.id === album.id);
    console.log(wishElementExist);
    if (wishElementExist) {
      wish = wish.filter((w) => w.id !== album.id);
      setWish(wish);
    }else{
      setWish([...wish, album]);
    }
  }

  useEffect(() => {
    localStorage.setItem(album.slug, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(album.slug, JSON.stringify(wish));
  }, [wish]);

  return (
    <div className="col-12 col-md-4 gy-3">
      <Link to={`/album/${album.slug}`} className="text-decoration-none">
        <div className="card custom-album-card h-100 p-3">
          <img
            src={album.imagePath}
            className="card-img-top img-fluid rounded img-filter-album"
            alt={album.name}
          />
          <div className="card-body">
            <p className="card-text mb-1">
              <span className="fw-semibold text-orange">Titolo:</span>{" "}
              {album.name}
            </p>
            <p className="card-text mb-1">
              <span className="fw-semibold text-orange">Artista:</span>{" "}
              {album.artist.name}
            </p>
            <p className="card-text mb-1">
              <span className="fw-semibold text-orange">Genere:</span>{" "}
              {album.genre.name}
            </p>
            <p className="card-text mb-1 album-price">
              <span className="fw-semibold text-orange">Prezzo:</span>{" "}
              {album.price} €
            </p>
            <p className="card-text mb-3">
              <span className="fw-semibold text-orange">Data di uscita:</span>{" "}
              {new Date(album.date).toLocaleDateString("it-IT")}
            </p>
            <div className="d-flex justify-content-end gap-3 align-items-center">
              <button
                type="button"
                title="Aggiungi al carrello"
                className="btn cart-button-card"
                onClick={addToCart}
              >
                <i className="bi bi-cart-plus text-orange"></i>
              </button>
              <button
                className="btn wishlist-button-card"
                title="Aggiungi alla wishlist"
                onClick={addToWish}
              >
                <i className="fas fa-heart text-orange"></i>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
