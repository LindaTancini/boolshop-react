import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PaymentContext from "../contexts/paymentContext";

const PaymentPage = () => {
  const { payment, setPayment } = useContext(PaymentContext);

  const navigate = useNavigate();
  function HandleForm(e) {
    const { name, value } = e.target;

    setPayment((payment) => ({
      ...payment,
      [name]: value,
    }));
  }

  function handlePayment(e) {
    e.preventDefault();
    navigate("/payment/details");
    console.log("pagamento avvenuto con successo");
  }

  return (
    <>
      <div className="container my-5">
        <div
          className="card p-4 shadow-lg bg-album-details-shadow mx-auto"
          style={{ maxWidth: "700px" }}
        >
          <h2 className="mb-4 text-center fw-bold text-orange text-shadow-orange">
            Dati per la spedizione
          </h2>

          <form onSubmit={handlePayment}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  name="nome"
                  placeholder="Mario"
                  value={payment.nome}
                  onChange={HandleForm}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="cognome">Cognome</label>
                <input
                  type="text"
                  className="form-control"
                  id="cognome"
                  name="cognome"
                  placeholder="Rossi"
                  value={payment.cognome}
                  onChange={HandleForm}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="mario.rossi@email.com"
                  value={payment.email}
                  onChange={HandleForm}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="telefono">Telefono</label>
                <input
                  type="tel"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  placeholder="3331234567"
                  value={payment.telefono}
                  onChange={HandleForm}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="indirizzo">Indirizzo</label>
              <input
                type="text"
                className="form-control"
                id="indirizzo"
                name="indirizzo"
                placeholder="Via Roma 123"
                value={payment.indirizzo}
                onChange={HandleForm}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="metodoPagamento">Metodo di pagamento</label>
              <select
                className="form-select"
                id="metodoPagamento"
                name="metodoPagamento"
                value={payment.metodoPagamento}
                onChange={HandleForm}
                required
              >
                <option value="">Seleziona un metodo</option>
                <option value="carta">Carta di credito</option>
                <option value="paypal">PayPal</option>
                <option value="contrassegno">Contrassegno</option>
              </select>
            </div>

            <button
              className="btn btn-orange btn-lg w-100 fw-bold"
              type="submit"
            >
              Procedi al pagamento
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
