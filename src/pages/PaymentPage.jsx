import React, { useContext, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import CartContext from "../contexts/CartContext";
import PaymentContext from "../contexts/paymentContext";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";
import OrderSummary from "../components/OrderSummary";

const PaymentPage = () => {
  const { payment, setPayment } = useContext(PaymentContext);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // costanti dal .env
  const FREE_SHIPPING_THRESHOLD = Number(import.meta.env.VITE_FREE_SHIPPING_THRESHOLD) || 50;
  const STANDARD_SHIPPING_COST = Number(import.meta.env.VITE_STANDARD_SHIPPING_COST) || 5;

  // Calcolo totale ordine e spedizione
  const orderTotal = cart.reduce((sum, c) => sum + Number(c.price) * (c.quantity || 1), 0);
  const shippingCost = orderTotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
  const total = orderTotal + shippingCost;

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAIL_USER_ID);
  }, []);

  function handleForm(e) {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  }

  const sendOrderEmails = async () => {
    const order_id = Math.floor(Math.random() * 1000000);
    const orders = cart.map(item => ({
      name: item.name,
      units: item.quantity || 1,
      price: (Number(item.price) * (item.quantity || 1)).toFixed(2),
    }));
    const cost = {
      shipping: shippingCost.toFixed(2),
      tax: "0.00",
      total: total.toFixed(2),
    };
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
          <button className="btn btn-orange mt-3" onClick={() => navigate("/")}>Torna allo shop</button>
        </div>
      </div>
    );
  }

  const cardRequired = payment.metodo === "Credit Card" && (!cardNumber || !cardName || !expiry || !cvv);

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-lg bg-album-details-shadow mx-auto" style={{ maxWidth: 800 }}>
        <h2 className="mb-4 text-center fw-bold text-orange text-shadow-orange">Checkout</h2>
        <form onSubmit={confirmOrder}>
          <div className="row">
            <div className="col-md-6">
              <PaymentForm
                payment={payment}
                handleForm={handleForm}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                cardName={cardName}
                setCardName={setCardName}
                expiry={expiry}
                setExpiry={setExpiry}
                cvv={cvv}
                setCvv={setCvv}
              />
            </div>
            <div className="col-md-6">
              <OrderSummary cart={cart} orderTotal={orderTotal} shippingCost={shippingCost} total={total} />
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

export default PaymentPage;
