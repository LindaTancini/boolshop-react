import { useContext } from "react";
import PaymentContext from "../contexts/paymentContext";
import CartContext from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const PaymentDetails = () => {
  const { payment } = useContext(PaymentContext);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  function confirmOrder() {
    alert("Ordine effettuato con successo!");
    navigate("/");
    setCart([]);
  }

  console.log(cart);
  return (
    <>
      <div className="container my-5">
        <div className="card p-4 shadow-lg bg-album-details-shadow mx-auto">
          <h2 className="mb-4 text-center fw-bold text-orange text-shadow-orange">
            {payment.nome} {payment.cognome}
          </h2>
          <p className="text-center mb-4">{payment.indirizzo}</p>

          <h3 className="fw-bold text-orange mb-3 text-center">
            Riepilogo prodotti
          </h3>
          <ul className="list-group mb-4">
            {cart.map((c, i) => (
              <li
                key={i}
                className="list-group-item d-flex align-items-center justify-content-between bg-album-details-shadow mb-3 rounded"
              >
                <div className="d-flex align-items-center">
                  {c.imagePath && (
                    <img
                      className="img-cart img-cart me-3 rounded"
                      src={c.imagePath}
                      alt={c.name}
                    />
                  )}
                  <div>
                    <h6 className="mb-1 text-orange">{c.name}</h6>
                    <p className="album-price mb-0">€ {c.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-orange fw-bold px-4 py-2"
              onClick={confirmOrder}
            >
              Conferma ordine
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
