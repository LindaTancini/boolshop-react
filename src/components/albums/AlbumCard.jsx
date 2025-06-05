import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Toast from "../Toast";
import { openCartOffcanvas } from "../cartUtils";
import CartContext from "../../contexts/CartContext";

/**
 * Card singolo album con azioni carrello/wishlist.
 * @param {Object} album - Dati album
 * @param {Array} cart - Carrello
 * @param {function} setCart - Setter carrello
 * @param {Array} wish - Wishlist
 * @param {function} setWish - Setter wishlist
 */
export default function AlbumCard({
  album,
  wish,
  setWish,
  viewMode = "grid",
}) {
  const isList = viewMode === "list";
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const {cart, setCart} = useContext(CartContext);

  function addToCart(e) {
    e.preventDefault();

    const existingIndex = (Array.isArray(cart) ? cart : []).findIndex((c) => c.id === album.id);
    let newCart;

    if (existingIndex !== -1) {
      newCart = (Array.isArray(cart) ? cart : []).map((c, index) =>
        index === existingIndex ? { ...c, quantity: c.quantity + 1 } : c
      );
    } else {
      newCart = (Array.isArray(cart) ? [...cart, { ...album, quantity: 1 }] : []);
    }

    setCart(newCart);
    openCartOffcanvas();
    // setToastMessage("Elemento aggiunto al carrello!");
    // setToastVisible(true);
  }

  useEffect(() => {
    localStorage.setItem(album.slug, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(album.slug, JSON.stringify(wish));
  }, [wish]);

  const isInCart = (Array.isArray(cart) ? cart : []).some((c) => c.id === album.id); 
  const isInWish = (Array.isArray(wish) ? wish : []).some((w) => w.id === album.id);

  function addToWish(e) {
    e.preventDefault();
    if (isInWish) {
      setWish(wish.filter((w) => w.id !== album.id));
      setToastMessage("Elemento rimosso dalla wishlist!");
    } else {
      setWish([...wish, album]);
      setToastMessage("Elemento aggiunto alla wishlist!");
    }
    setToastVisible(true);
  }

  return (
    <div className={`gy-3 ${isList ? "col-12 mb-3" : "col-12 col-md-4"}`}>
      <Link to={`/album/${album.slug}`} className="text-decoration-none">
        <div
          className={`card custom-album-card ${isList
            ? "flex-row align-items-center p-2 small-card-list"
            : "h-100 p-3"
            }`}
        >
          <img
            src={album.imagePath}
            className={`img-fluid rounded img-filter-album ${isList ? "me-3 album-list-small" : "card-img-top"
              }`}
            alt={album.name}
          />
          <div className={`card-body ${isList ? "py-1 px-2 small-font" : ""}`}>
            <p className="card-text mb-1">
              <span className="fw-semibold text-orange">Titolo: </span>
              {album.name}
            </p>
            <p className="card-text mb-1">
              <span className="fw-semibold text-orange">Artista: </span>
              {album.artist.name}
            </p>
            <p className="card-text mb-1">
              <span className="fw-semibold text-orange">Genere: </span>
              {album.genre.name}
            </p>
            <p className="card-text mb-1">
              <span className="fw-semibold text-orange">Formato: </span>
              {album.format}
            </p>
            {!isList && (
              <p className="card-text mb-3">
                <span className="fw-semibold text-orange">Data di uscita:</span>
                {new Date(album.date).toLocaleDateString("it-IT")}
              </p>
            )}
            <p className="card-text mb-1 album-price">
              <span className="fw-semibold text-orange">Prezzo: </span>
              {album.price} €
            </p>

            <div
              className={`d-flex ${isList ? "gap-4 mt-2" : "justify-content-between gap-3"
                }`}
            >
              <button
                type="button"
                title="Aggiungi al carrello"
                className="btn cart-button-card"
                onClick={addToCart}
              >
                <i className={`bi bi-cart-plus icon-responsive ${isInCart ? "text-success" : "text-orange"}`}></i>
              </button>
              <button
                className="btn wishlist-button-card"
                title={isInWish ? "Rimuovi dalla wishlist" : "Aggiungi alla wishlist"}
                onClick={addToWish}
              >
                <i className={`bi ${isInWish ? "bi-suit-heart-fill" : "bi-suit-heart"} icon-responsive ${isInWish ? "text-danger" : "text-orange"}`}></i>
              </button>
            </div>
          </div>
        </div>
      </Link>

      <Toast
        message={toastMessage}
        type="success"
        show={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}

AlbumCard.propTypes = {
  album: PropTypes.object.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  wish: PropTypes.array.isRequired,
  setWish: PropTypes.func.isRequired,
  viewMode: PropTypes.string,
};
