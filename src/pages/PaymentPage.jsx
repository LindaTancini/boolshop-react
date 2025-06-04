import React, { useContext, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import CartContext from "../contexts/CartContext";
import PaymentContext from "../contexts/paymentContext";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";
import OrderSummary from "../components/OrderSummary";
import axios from "axios";
import Toast from "../components/Toast";

const PaymentPage = () => {
  const { payment, setPayment } = useContext(PaymentContext);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discountResult, setDiscountResult] = useState(null);
  const [discountLoading, setDiscountLoading] = useState(false);
  const [discountError, setDiscountError] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Stato per bloccare riapplicazione
  const [lastAppliedCode, setLastAppliedCode] = useState("");

  // Costanti dal .env
  const FREE_SHIPPING_THRESHOLD = Number(import.meta.env.VITE_FREE_SHIPPING_THRESHOLD) || 50;
  const STANDARD_SHIPPING_COST = Number(import.meta.env.VITE_STANDARD_SHIPPING_COST) || 5;

  // Calcolo totale ordine e spedizione
  const orderTotal = cart.reduce((sum, c) => sum + Number(c.price) * (c.quantity || 1), 0);
  const shippingCost = orderTotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;

  // Applica sconto se presente
  const appliedShipping = discountResult && discountResult.valid && discountResult.newShippingCost !== undefined ? discountResult.newShippingCost : shippingCost;
  const appliedTotal = discountResult && discountResult.valid && discountResult.newTotal !== undefined ? discountResult.newTotal + appliedShipping : orderTotal + shippingCost;

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
      const response = await axios.post("http://localhost:3000/api/payment/create-checkout-session", { cart, payment, shippingCost, discountResult });
      window.location.href = response.data.url;
    } catch (err) {
      console.error(err);
      setToastType("danger");
      setToastMessage("Errore durante il pagamento.");
      setToastVisible(true);
      setLoading(false);
    }
  }


  // Funzione per inviare il codice sconto al backend
  const handleDiscountCheck = async (e) => {
    e.preventDefault();
    if (discountResult && discountResult.valid && discountResult.type && discountCode === lastAppliedCode) {
      setDiscountError("Questo codice è già stato applicato.");
      setToastType("warning");
      setToastMessage("Questo codice è già stato applicato.");
      setToastVisible(true);
      return;
    }
    setDiscountLoading(true);
    setDiscountError("");
    setDiscountResult(null);
    try {
      const res = await axios.post(`http://localhost:3000/api/discount/check`, {
        code: discountCode,
        orderTotal,
        shippingCost,
      });
      setDiscountResult({ ...res.data, code: discountCode });
      if (res.data.valid) {
        setLastAppliedCode(discountCode);
        setToastType("success");
        setToastMessage(res.data.message);
      } else {
        setToastType("danger");
        setToastMessage(res.data.message);
      }
      setToastVisible(true);
    } catch (err) {
      setDiscountError("Errore nella verifica del codice sconto");
      setToastType("danger");
      setToastMessage("Errore nella verifica del codice sconto");
      setToastVisible(true);
    } finally {
      setDiscountLoading(false);
    }
  };

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
            <OrderSummary
              cart={cart}
              orderTotal={orderTotal}
              shippingCost={appliedShipping}
              total={appliedTotal}
              discountResult={discountResult}
            />
            <form className="mt-3" onSubmit={handleDiscountCheck} autoComplete="off">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Codice sconto"
                  value={discountCode}
                  onChange={e => setDiscountCode(e.target.value)}
                  disabled={discountLoading || (discountResult && discountResult.valid && discountCode === lastAppliedCode)}
                />
                <button className="btn btn-outline-secondary" type="submit" disabled={discountLoading || !discountCode || (discountResult && discountResult.valid && discountCode === lastAppliedCode)}>
                  {discountLoading ? "Verifica..." : "Applica"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <Toast
          message={toastMessage}
          type={toastType}
          show={toastVisible}
          onClose={() => setToastVisible(false)}
        />
        <form onSubmit={confirmOrder} className="mt-4">
          <div className="d-flex justify-content-center">
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
