import React from "react";

const PaymentForm = ({ payment, handleForm, cardNumber, setCardNumber, cardName, setCardName, expiry, setExpiry, cvv, setCvv }) => (
  <>
    <h5 className="mb-3">Dati per la spedizione</h5>
    <div className="mb-3">
      <label htmlFor="nome">Nome</label>
      <input type="text" className="form-control" id="nome" name="nome" placeholder="Mario" value={payment.nome || ""} onChange={handleForm} required />
    </div>
    <div className="mb-3">
      <label htmlFor="cognome">Cognome</label>
      <input type="text" className="form-control" id="cognome" name="cognome" placeholder="Rossi" value={payment.cognome || ""} onChange={handleForm} required />
    </div>
    <div className="mb-3">
      <label htmlFor="email">Email</label>
      <input type="text" className="form-control" id="email" name="email" placeholder="mario.rossi@email.com" value={payment.email || ""} onChange={handleForm} required />
    </div>
    <div className="mb-3">
      <label htmlFor="telefono">Telefono</label>
      <input type="text" className="form-control" id="telefono" name="telefono" placeholder="3331234567" value={payment.telefono || ""} onChange={handleForm} />
    </div>
    <div className="mb-3">
      <label htmlFor="indirizzo">Indirizzo</label>
      <input type="text" className="form-control" id="indirizzo" name="indirizzo" placeholder="Via Roma 123" value={payment.indirizzo || ""} onChange={handleForm} required />
    </div>
    <div className="mb-3">
      <label htmlFor="cap">CAP</label>
      <input type="text" className="form-control" id="cap" name="cap" placeholder="10023" value={payment.cap || ""} onChange={handleForm} required />
    </div>
    <div className="mb-3">
      <label htmlFor="città">Città</label>
      <input type="text" className="form-control" id="city" name="city" placeholder="Milano" value={payment.city || ""} onChange={handleForm} required />
    </div>
    <div className="mb-4">
      <label htmlFor="metodo">Metodo di pagamento</label>
      <select className="form-select" id="metodo" name="metodo" value={payment.metodo || ""} onChange={handleForm} required>
        <option value="">Seleziona un metodo</option>
        <option value="Credit Card">Carta di credito</option>
        <option value="PayPal">PayPal</option>
        <option value="Cash on Delivery">Contrassegno</option>
      </select>
    </div>
    {payment.metodo === "Credit Card" && (
      <div className="border rounded p-3 mb-4 ">
        <h6 className="mb-3">Dati carta di credito</h6>
        <div className="mb-2">
          <input type="text" className="form-control" placeholder="Numero della carta" value={cardNumber} onChange={e => setCardNumber(e.target.value)} required maxLength={19} />
        </div>
        <div className="mb-2">
          <input type="text" className="form-control" placeholder="Nome sulla carta" value={cardName} onChange={e => setCardName(e.target.value)} required />
        </div>
        <div className="row mb-2">
          <div className="col">
            <input type="text" className="form-control" placeholder="MM/AA" value={expiry} onChange={e => setExpiry(e.target.value)} required maxLength={5} />
          </div>
          <div className="col">
            <input type="text" className="form-control" placeholder="CVV" value={cvv} onChange={e => setCvv(e.target.value)} required maxLength={4} />
          </div>
        </div>
      </div>
    )}
  </>
);

export default PaymentForm;
