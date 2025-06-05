// frontend/src/pages/SuccessPage.jsx
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CartContext from "../contexts/CartContext";
import emailjs from "@emailjs/browser";
import axios from "axios";

export default function SuccessPage() {
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { search } = useLocation();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const sendOrderEmails = async () => {
      const params = new URLSearchParams(search);
      const sessionId = params.get("session_id");

      if (!sessionId) {
        finalize("Pagamento avvenuto con successo! Verrai reindirizzato alla home a breve.");
        return;
      }

      try {
        const { data: session } = await axios.get(
          `http://localhost:3000/api/payment/session?session_id=${sessionId}`
        );

        const customer = session.customer_details || {};
        const [nome = "", cognome = ""] = (customer.name || " ").split(" ", 2);
        const emailData = {
          email: customer.email || "",
          order_id: sessionId,
          orders: session.line_items.data
            .map((item) => `• ${item.description} (x${item.quantity}) - €${(item.amount_subtotal / 100).toFixed(2)}`)
            .join("\n"),
          cost_shipping: (session.total_details.amount_shipping / 100).toFixed(2),
          cost_tax: (session.total_details.amount_tax / 100).toFixed(2),
          cost_total: (session.amount_total / 100).toFixed(2),
          nome,
          cognome,
          indirizzo: [customer.address?.line1 || "", customer.address?.line2 || ""].filter(Boolean).join(", "),
          cap: customer.address?.postal_code || "",
          city: customer.address?.city || "",
          country: customer.address?.country || "",
          telefono: customer.phone || "",
          metodo: session.payment_method_types[0] || "",
        };

        emailjs.init(import.meta.env.VITE_EMAIL_USER_ID);

        await Promise.all([
          emailjs.send(
            import.meta.env.VITE_EMAIL_SERVICE_ID,
            import.meta.env.VITE_EMAIL_SERVICE_TEMPLATE,
            emailData,
            import.meta.env.VITE_EMAIL_USER_ID
          ),
          emailjs.send(
            import.meta.env.VITE_EMAIL_SERVICE_ID,
            import.meta.env.VITE_EMAIL_SERVICE_TEMPLATE,
            {
              ...emailData,
              email: import.meta.env.VITE_OWNER_EMAIL,
              user_email: emailData.email,
            },
            import.meta.env.VITE_EMAIL_USER_ID
          )
        ]);

        finalize("Pagamento avvenuto con successo! Verrai reindirizzato alla home a breve.");
      } catch (err) {
        console.error("Errore invio email:", err);
        finalize("Si è verificato un errore. Verrai reindirizzato alla home.", true);
      }
    };

    const finalize = (msg, error = false) => {
      setCart([]);
      setStatus(error ? "error" : "success");
      setMessage(msg);
      setTimeout(() => navigate("/"), 3000);
    };

    sendOrderEmails();
  }, [search]);

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ height: "70vh" }}
    >
      {status === "loading" && (
        <div className="text-center">
          <div className="spinner-border text-orange mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-orange">Elaborazione in corso...</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center">
          <h2 className="text-orange mb-3">✔️ Pagamento avvenuto con successo!</h2>
          <p className="text-muted">{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <h2 className="text-danger mb-3">❌ Errore</h2>
          <p className="text-muted">{message}</p>
        </div>
      )}
    </div>
  );
}