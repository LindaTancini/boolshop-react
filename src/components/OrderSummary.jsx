// Soglia e costo standard di spedizione presi dalle env
const FREE_SHIPPING_THRESHOLD = Number(import.meta.env.VITE_FREE_SHIPPING_THRESHOLD) || 50;
const STANDARD_SHIPPING_COST = Number(import.meta.env.VITE_STANDARD_SHIPPING_COST) || 5;

const OrderSummary = ({ cart, orderTotal, shippingCost, total, discountResult }) => {
  // Calcolo del costo di spedizione “originale” (prima di eventuale sconto)
  const originalShipping = orderTotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;

  // Totale “originale” senza sconto: ordine + spedizione
  const originalGrandTotal = orderTotal + originalShipping;

  // Calcolo importo sconto: differenza fra originale e (newTotal + newShippingCost)
  const discountAmount = (
    discountResult &&
    discountResult.valid &&
    typeof discountResult.newTotal === "number" &&
    typeof discountResult.newShippingCost === "number"
  )
    ? originalGrandTotal - (discountResult.newTotal + discountResult.newShippingCost)
    : 0;

  // Se discountAmount > 0, significa che c’è uno sconto effettivo
  const hasDiscount = discountAmount > 0;

  // Formattatore valuta (due decimali + “€”)
  const fmt = (x) => `${x.toFixed(2)} €`;

  return (
    <>
      <h5 className="fw-bold text-orange mb-3 text-center">Riepilogo ordine</h5>

      {/* Elenco articoli */}
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
                  Totale:{" "}
                  <span className="fw-bold">
                    {fmt(Number(c.price) * (c.quantity || 1))}
                  </span>
                </p>
                <p className="mb-0">
                  Quantità: <span className="fw-bold">{c.quantity || 1}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Subtotale ordine */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="fw-bold">Ordine:</span>
        <span className="fw-bold text-orange fs-6">{fmt(orderTotal)}</span>
      </div>

      {/* Riga “Sconto” (solo se hasDiscount) */}
      {hasDiscount && (
        <div className="d-flex justify-content-between align-items-center mb-2 bg-success bg-opacity-10 rounded px-2 py-1 border border-success">
          <span className="fw-bold text-success">Sconto:</span>
          <span className="fw-bold text-success fs-6">
            -{fmt(discountAmount)}
          </span>
        </div>
      )}

      {/* Spedizione: barrata + nuovo valore se cambia, altrimenti normale */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="fw-bold">Spedizione:</span>

        {hasDiscount && typeof discountResult.newShippingCost === "number" && discountResult.newShippingCost !== originalShipping ? (
          <>
            <span className="text-decoration-line-through text-muted">
              {originalShipping === 0 ? "GRATIS" : fmt(originalShipping)}
            </span>
            <span className="ms-2 fw-bold text-orange fs-6">
              {discountResult.newShippingCost === 0 ? "GRATIS" : fmt(discountResult.newShippingCost)}
            </span>
          </>
        ) : (
          <span className="fw-bold text-orange fs-6">
            {originalShipping === 0 ? "GRATIS" : fmt(originalShipping)}
          </span>
        )}
      </div>

      <hr />

      {/* Totale complessivo: barrato + nuovo se hasDiscount, altrimenti solo originale */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="fw-bold">Totale:</span>
        {hasDiscount ? (
          <>
            <span className="text-decoration-line-through text-muted">
              {fmt(originalGrandTotal)}
            </span>
            <span className="ms-2 fw-bold text-orange fs-5">
              {fmt(total)}
            </span>
          </>
        ) : (
          <span className="fw-bold text-orange fs-5">
            {fmt(originalGrandTotal)}
          </span>
        )}
      </div>
    </>
  );
};

export default OrderSummary;