import { useContext } from "react";
import WishContext from "../contexts/WhishContext";
import CartContext from "../contexts/CartContext";

/**
 * Pagina wishlist. Mostra lista desideri e azioni su prodotti.
 */
const WishListPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const { wish, setWish } = useContext(WishContext);

  function removeItemWish(indexToRemove) {
    setWish((wish) => wish.filter((_, index) => index !== indexToRemove));
  }

  function addToCart(index) {
    setCart([...cart, wish[index]]);
    console.log(cart);
    removeItemWish(index);
  }

  return (
    <div className="container my-5">
      <div
        className="card p-4 shadow-lg bg-album-details-shadow mx-auto wishlist-card"
      >
        <h2 className="mb-4 text-center fw-bold text-orange text-shadow-orange">
          Lista Desideri
        </h2>

        <ul className="list-group mb-4">
          {wish.length === 0 ? (
            <li className="list-group-item text-center text-muted">
              La tua wishlist è vuota
            </li>
          ) : (
            wish.map((w, i) => (
              <li
                key={i}
                className="list-group-item d-flex align-items-center justify-content-between bg-album-details-shadow mb-3 rounded"
              >
                <div className="d-flex align-items-center">
                  {w.imagePath && (
                    <img
                      className="img-cart img-cart me-3 rounded"
                      src={w.imagePath}
                      alt={w.name}
                    />
                  )}
                  <div>
                    <h6 className="mb-1 text-orange">{w.name}</h6>
                    <p className="album-price mb-0">€ {w.price}</p>
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeItemWish(i)}
                  >
                    Rimuovi
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => addToCart(i)}
                  >
                    Aggiungi al carrello
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

WishListPage.propTypes = {};

export default WishListPage;
