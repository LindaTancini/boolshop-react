const FREE_SHIPPING_THRESHOLD = Number(import.meta.env.VITE_FREE_SHIPPING_THRESHOLD) || 50;

const OrderSummary = ({ cart, orderTotal, shippingCost, total }) => (
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
                Totale: <span className="fw-bold">€ {(Number(c.price) * (c.quantity || 1)).toFixed(2)}</span>
              </p>
              <p className="mb-0">Quantità: <span className="fw-bold">{c.quantity || 1}</span></p>
            </div>
          </div>
        </li>
      ))}
    </ul>
    <div className="d-flex justify-content-between align-items-center mb-2">
      <span className="fw-bold">Ordine:</span>
      <span className="fw-bold text-orange fs-6">€ {orderTotal.toFixed(2)}</span>
    </div>
    <div className="d-flex justify-content-between align-items-center mb-2">
      <span className="fw-bold">Spedizione:</span>
      <span className="fw-bold text-orange fs-6">
        {orderTotal >= FREE_SHIPPING_THRESHOLD ? "GRATIS" : `€ ${shippingCost.toFixed(2)}`}
      </span>
    </div>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <span className="fw-bold">Totale:</span>
      <span className="fw-bold text-orange fs-5">
        € {total.toFixed(2)}
      </span>
    </div>
  </>
);

export default OrderSummary;
