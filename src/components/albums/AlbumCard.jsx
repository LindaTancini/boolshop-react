import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Toast from "../Toast";

/**
 * Card singolo album con azioni carrello/wishlist.
 * @param {Object} album - Dati album
 * @param {Array} cart - Carrello
 * @param {function} setCart - Setter carrello
 * @param {Array} wish - Wishlist
 * @param {function} setWish - Setter wishlist
 */
export default function AlbumCard({ album, cart, setCart, wish, setWish }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function addToCart(e) {
    // e.stopPropagation();
    e.preventDefault();
    const existingIndex = cart.findIndex((c) => c.id === album.id);
    let newCart;

    if (existingIndex !== -1) {
      newCart = cart.map((c, index) =>
        index === existingIndex ? { ...c, quantity: c.quantity + 1 } : c
      );
    } else {
      newCart = [...cart, { ...album, quantity: 1 }];
    }

    setCart(newCart);
    setToastMessage("Elemento aggiunto al carrello!");
    setToastVisible(true);
  }

  function addToWish(e) {
    // e.stopPropagation();
    e.preventDefault();
    // const existingIndex = cart.findIndex((c) => c.id === album.id);
    let newWish;

    // if (existingIndex !== -1) {
    //   newWish = wish.map((w, index) =>
    //     index === existingIndex ? { ...w, quantity: w.quantity + 1 } : c
    //   );
    // } else {
      newWish = [...wish, album];
    // }

    setWish(newWish);
    setToastMessage("Elemento aggiunto alla wishlist!");
    setToastVisible(true);
    // const wishElementExist = wish.find((w) => w.id === album.id);
    // console.log(wishElementExist);
    // if (wishElementExist) {
    //   setWish(wish.filter((w) => w.id !== album.id));
    //   setToastMessage("Elemento rimosso dalla wishlist!");
    // } else {
    //   setWish([...wish, album]);
    //   setToastMessage("Elemento aggiunto alla wishlist!");
    // }
    // setToastVisible(true);
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
              <span className="fw-semibold text-orange">Titolo:</span>
              {album.name}
            </p>
            <p className="card-text mb-1">
              <span className="fw-semibold text-orange">Artista:</span>
              {album.artist.name}
            </p>
            <p className="card-text mb-1">
              <span className="fw-semibold text-orange">Genere:</span>
              {album.genre.name}
            </p>

            <p className="card-text mb-1">
              <span className="fw-semibold text-orange">Formato:</span>
              {album.format}
            </p>

            <p className="card-text mb-1 album-price">
              <span className="fw-semibold text-orange">Prezzo:</span>
              {album.price} €
            </p>
            <p className="card-text mb-3">
              <span className="fw-semibold text-orange">Data di uscita:</span>
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
};
