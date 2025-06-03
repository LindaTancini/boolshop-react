import React, { useContext, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import CartContext from "../contexts/CartContext";
import PaymentContext from "../contexts/paymentContext";
import { useNavigate } from "react-router-dom";
import _default from "@emailjs/browser";

const PaymentPage = () => {
  const { payment, setPayment } = useContext(PaymentContext);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Campi carta di credito (solo se serve)
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const total = cart.reduce((sum, c) => sum + Number(c.price), 0);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAIL_USER_ID);
  }, []);

  function handleForm(e) {
    const { name, value } = e.target;
    setPayment((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  console.log(payment);

  const sendOrderEmails = async () => {
    // Prepara i dati per il template
    const order_id = Math.floor(Math.random() * 1000000); // oppure genera come preferisci
    const orders = cart.map(item => ({
      name: item.name,
      units: item.quantity || 1,
      price: (Number(item.price) * (item.quantity || 1)).toFixed(2),
    }));
    const cost = {
      shipping: "0.00", // Modifica se hai il costo spedizione
      tax: "0.00",      // Modifica se hai le tasse
      total: total.toFixed(2),
    };

    // Email all'utente
    await emailjs.send(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_SERVICE_TEMPLATE,
      {
        email: payment.email,
        order_id,
        orders,
        cost,
        nome: payment.nome,
        cognome: payment.cognome,
        indirizzo: payment.indirizzo,
        telefono: payment.telefono,
        metodo: payment.metodo,
      },
      import.meta.env.VITE_EMAIL_USER_ID
    );
    // Email al proprietario
    await emailjs.send(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_SERVICE_TEMPLATE,
      {
        email: import.meta.env.VITE_OWNER_EMAIL,
        order_id,
        orders,
        cost,
        nome: payment.nome,
        cognome: payment.cognome,
        indirizzo: payment.indirizzo,
        telefono: payment.telefono,
        metodo: payment.metodo,
        user_email: payment.email,
      },
      import.meta.env.VITE_EMAIL_USER_ID
    );
  };

  async function confirmOrder(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await sendOrderEmails();
      alert("Ordine effettuato con successo!");
      setCart([]);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Errore nell'invio dell'email. Riprova.");
      setLoading(false);
    }
  }

  if (!cart.length) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning text-center">
          Il tuo carrello è vuoto. <br />
          <button className="btn btn-orange mt-3" onClick={() => navigate("/")}>
            Torna allo shop
          </button>
        </div>
      </div>
    );
  }

  // Serve validazione extra per la carta?
  const cardRequired =
    payment.metodo === "Credit Card" &&
    (!cardNumber || !cardName || !expiry || !cvv);

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-lg bg-album-details-shadow mx-auto" style={{ maxWidth: 800 }}>
        <h2 className="mb-4 text-center fw-bold text-orange text-shadow-orange">
          Checkout
        </h2>
        <form onSubmit={confirmOrder}>
          <div className="row">
            {/* Dati spedizione e pagamento */}
            <div className="col-md-6">
              <h5 className="mb-3">Dati per la spedizione</h5>
              <div className="mb-3">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  name="nome"
                  placeholder="Mario"
                  value={payment.nome || ""}
                  onChange={handleForm}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cognome">Cognome</label>
                <input
                  type="text"
                  className="form-control"
                  id="cognome"
                  name="cognome"
                  placeholder="Rossi"
                  value={payment.cognome || ""}
                  onChange={handleForm}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="mario.rossi@email.com"
                  value={payment.email || ""}
                  onChange={handleForm}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telefono">Telefono</label>
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  placeholder="3331234567"
                  value={payment.telefono || ""}
                  onChange={handleForm}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="indirizzo">Indirizzo</label>
                <input
                  type="text"
                  className="form-control"
                  id="indirizzo"
                  name="indirizzo"
                  placeholder="Via Roma 123"
                  value={payment.indirizzo || ""}
                  onChange={handleForm}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="cap">CAP</label>
                <input
                  type="text"
                  className="form-control"
                  id="cap"
                  name="cap"
                  placeholder="10023"
                  value={payment.cap || ""}
                  onChange={handleForm}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="città">Città</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="Milano"
                  value={payment.city || ""}
                  onChange={handleForm}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="metodo">Metodo di pagamento</label>
                <select
                  className="form-select"
                  id="metodo"
                  name="metodo"
                  value={payment.metodo || ""}
                  onChange={handleForm}
                  required
                >
                  <option value="">Seleziona un metodo</option>
                  <option value="Credit Card">Carta di credito</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Cash on Delivery">Contrassegno</option>
                </select>
              </div>
              {/* Se serve, mostra i campi carta */}
              {payment.metodo === "Credit Card" && (
                <div className="border rounded p-3 mb-4 ">
                  <h6 className="mb-3">Dati carta di credito</h6>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Numero della carta"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      required
                      maxLength={19}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nome sulla carta"
                      value={cardName}
                      onChange={e => setCardName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="row mb-2">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="MM/AA"
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                        required
                        maxLength={5}
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CVV"
                        value={cvv}
                        onChange={e => setCvv(e.target.value)}
                        required
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Riepilogo ordine */}
            <div className="col-md-6">
              <OrderSummary cart={cart} total={total} />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-orange btn-lg fw-bold px-5"
              type="submit"
              disabled={
                loading ||
                !payment.nome ||
                !payment.cognome ||
                !payment.email ||
                !payment.indirizzo ||
                !payment.metodo ||
                cardRequired
              }
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Elaborazione...
                </>
              ) : (
                "Conferma ordine"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Riepilogo ordine sempre visibile
function OrderSummary({ cart, total }) {
  return (
    <>
      <h5 className="fw-bold text-orange mb-3 text-center">Riepilogo ordine</h5>
      <ul className="list-group mb-4">
        {cart.map((c, i) => (
          <li
            key={i}
            className="list-group-item d-flex align-items-center justify-content-between bg-album-details-shadow mb-3 rounded"
          >
            <div className="d-flex align-items-center">
              {c.imagePath && (
                <img
                  className="img-cart me-3 rounded"
                  src={c.imagePath}
                  alt={c.name}
                  style={{ width: 80, height: 80, objectFit: "cover" }}
                />
              )}
              <div>
                <h4 className="mb-1 text-orange fw-bold">{c.name}</h4>
                <p className="album-price mb-0">
                  Totale: <span >€ {(Number(c.price) * (c.quantity || 1)).toFixed(2)}</span>
                </p>
                <p className="mb-0">Quantità: <span className="fw-bold">{c.quantity || 1}</span></p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="fw-bold">Totale:</span>
        <span className="fw-bold text-orange fs-5">
          € {total.toFixed(2)}
        </span>
      </div>
    </>
  );
}

export default PaymentPage;
