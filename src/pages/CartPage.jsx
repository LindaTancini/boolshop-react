import { useContext, useState } from "react";
import CartContext from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";
import PropTypes from 'prop-types';

/**
 * Pagina carrello. Mostra lista prodotti, modifica quantità, rimozione.
 */
function CartPage() {
  const { cart, setCart } = useContext(CartContext);
  const [toastVisible, setToastVisible] = useState(false);

  const removeItemCart = (indexToRemove) => {
    setCart((cart) => cart.filter((_, index) => index !== indexToRemove));
    setToastVisible(true);
  };
  //Logica totale ordine
  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1),
    0
  );

  // Gestione modifica quantità
  const handleQuantityChange = (index, value) => {
    const newCart = cart.map((item, i) =>
      i === index
        ? {
          ...item,
          quantity: Math.max(
            1,
            Math.min(item.maxQuantity || item.quantityDisponibile || 99, Number(value))
          ),
        }
        : item
    );
    setCart(newCart);
  };

  return (
    <>
      <div className="container py-5">
        <h2 className="text-orange text-shadow-orange text-center mb-4">
          Il tuo Carrello
        </h2>

        {cart.length === 0 ? (
          <p className="text-center">Il carrello è vuoto.</p>
        ) : (
          <>
            <ul className="list-group mb-4">
              {cart.map((c, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex align-items-center justify-content-between bg-album-details-shadow mb-3"
                >
                  <div className="d-flex align-items-center">
                    {c.imagePath && (
                      <img
                        className="img-cart me-3"
                        src={c.imagePath}
                        alt={c.name}
                      />
                    )}
                    <div>
                      <h6 className="mb-1 text-orange">{c.name}</h6>
                      <p className="album-price mb-0">€ {c.price}</p>
                      {/* Selettore quantità */}
                      <div className="d-flex align-items-center mt-2">
                        <label
                          htmlFor={`cart-qty-${i}`}
                          className="me-2 mb-0"
                        >
                          Quantità:
                        </label>
                        <input
                          id={`cart-qty-${i}`}
                          type="number"
                          min={1}
                          max={c.quantity || 99}
                          value={c.quantity || 1}
                          onChange={(e) =>
                            handleQuantityChange(i, e.target.value)
                          }
                          className="form-control w-auto d-inline-block cart-quantity-input"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => removeItemCart(i)}
                  >
                    Rimuovi
                  </button>
                </li>
              ))}
            </ul>

            <div className="text-center mt-4">
              <h4 className="text-orange text-shadow-orange mb-3">
                Totale: € {total.toFixed(2)}
              </h4>
              <Link to="/payment" className="search-button-filter">
                Procedi al pagamento
              </Link>
            </div>
          </>
        )}
      </div>

      <Toast
        message="Elemento rimosso dal carrello!"
        type="success"
        show={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </>
  );
}

CartPage.propTypes = {};

export default CartPage;
