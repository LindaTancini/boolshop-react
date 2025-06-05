// frontend/src/pages/CartPage.jsx
import { useContext, useState } from "react";
import CartContext from "../contexts/CartContext";
import axios from "axios";
import Toast from "../components/Toast";

function CartPage() {
  const { cart, setCart } = useContext(CartContext);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [loading, setLoading] = useState(false);

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const removeItemCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
    showToast("Elemento rimosso dal carrello!", "success");
  };

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1),
    0
  );

  const handleProceedToCheckout = async () => {
    if (cart.length === 0) {
      showToast("Il carrello è vuoto.", "warning");
      return;
    }

    setLoading(true);
    try {
      const shippingCost = total > import.meta.env.VITE_FREE_SHIPPING_THRESHOLD ? 0 : import.meta.env.VITE_STANDARD_SHIPPING_COST;
      const response = await axios.post(
        "http://localhost:3000/api/payment/create-checkout-session",
        {
          cart,
          payment: {},
          shippingCost,
          discountResult: {},
        }
      );
      window.location.href = response.data.url;
    } catch (err) {
      showToast("Errore durante il pagamento. Riprova più tardi.", "danger");
      setLoading(false);
    }
  };

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
                      <div className="d-flex align-items-center mt-2">
                        <label htmlFor={`cart-qty-${i}`} className="me-2 mb-0">
                          Quantità:
                        </label>
                        <input
                          id={`cart-qty-${i}`}
                          type="number"
                          min={1}
                          max={c.maxQuantity || c.quantityDisponibile || 99}
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
              <button
                className="btn button-orange-outline btn-lg fw-bold px-5"
                onClick={handleProceedToCheckout}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Sto preparando Stripe...
                  </>
                ) : (
                  "Procedi al pagamento"
                )}
              </button>
            </div>
          </>
        )}
      </div>

      <Toast
        message={toastMessage}
        type={toastType}
        show={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </>
  );
}

export default CartPage;