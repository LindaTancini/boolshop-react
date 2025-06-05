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
        setCart([]);
        setStatus("success");
        setMessage("Pagamento avvenuto con successo! Verrai reindirizzato alla home a breve.");
        setTimeout(() => navigate("/"), 3000);
        return;
      }

      try {
        const { data: session } = await axios.get(
          `http://localhost:3000/api/payment/session?session_id=${sessionId}`
        );

        const customer = session.customer_details || {};
        const customerName = customer.name || "";
        const [nome = "", cognome = ""] = customerName.split(" ", 2);
        const customerEmail = customer.email || "";
        const customerPhone = customer.phone || "";
        const addressObj = customer.address || {};
        const indirizzo = [addressObj.line1 || "", addressObj.line2 || ""].filter(Boolean).join(", ");
        const cap = addressObj.postal_code || "";
        const city = addressObj.city || "";
        const country = addressObj.country || "";

        const items = session.line_items.data.map((item) => ({
          name: item.description || item.price?.product?.name || "Prodotto",
          quantity: item.quantity,
          price: ((item.amount_total || 0) / 100).toFixed(2),
        }));

        const ordersString = items
          .map((item) => `• ${item.name} (x${item.units}) - €${item.price}`)
          .join("\n");

        const cost_shipping = session.total_details?.amount_shipping
          ? (session.total_details.amount_shipping / 100).toFixed(2)
          : "0.00";
        const cost_tax = session.total_details?.amount_tax
          ? (session.total_details.amount_tax / 100).toFixed(2)
          : "0.00";
        const cost_total = (session.amount_total / 100).toFixed(2);

        emailjs.init(import.meta.env.VITE_EMAIL_USER_ID);

        await emailjs.send(
          import.meta.env.VITE_EMAIL_SERVICE_ID,
          import.meta.env.VITE_EMAIL_SERVICE_TEMPLATE,
          {
            email: customerEmail,
            order_id: sessionId,
            orders: ordersString,
            cost_shipping,
            cost_tax,
            cost_total,
            nome,
            cognome,
            indirizzo,
            cap,
            city,
            country,
            telefono: customerPhone,
            metodo: session.payment_method_types[0] || "",
          },
          import.meta.env.VITE_EMAIL_USER_ID
        );

        await emailjs.send(
          import.meta.env.VITE_EMAIL_SERVICE_ID,
          import.meta.env.VITE_EMAIL_SERVICE_TEMPLATE,
          {
            email: import.meta.env.VITE_OWNER_EMAIL,
            order_id: sessionId,
            orders: ordersString,
            cost_shipping,
            cost_tax,
            cost_total,
            nome,
            cognome,
            indirizzo,
            cap,
            city,
            country,
            telefono: customerPhone,
            metodo: session.payment_method_types[0] || "",
            user_email: customerEmail,
          },
          import.meta.env.VITE_EMAIL_USER_ID
        );

        console.log("Dati email inviati:", {
          orders: ordersString,
          cost_shipping,
          cost_tax,
          cost_total,
          nome,
          cognome,
          indirizzo,
          cap,
          city,
          country,
          telefono: customerPhone,
        });

        setCart([]);
        setStatus("success");
        setMessage("Pagamento avvenuto con successo! Verrai reindirizzato alla home a breve.");
        setTimeout(() => navigate("/"), 3000);
      } catch (err) {
        console.error("Errore invio email:", err);
        setCart([]);
        setStatus("error");
        setMessage("Si è verificato un errore. Verrai reindirizzato alla home.");
        setTimeout(() => navigate("/"), 3000);
      }
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