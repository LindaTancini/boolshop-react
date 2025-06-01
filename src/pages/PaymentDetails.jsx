import { useContext } from "react";
import PaymentContext from "../contexts/paymentContext";
import CartContext from "../contexts/CartContext";

const PaymentDetails = () => {
    const { payment } = useContext(PaymentContext);
    const {cart} = useContext(CartContext)
    function confirmOrder(){

    }

    return <>
    <div className="bg-light d-flex justify-content-center align-items-center w-50 h-50 text-dark">
        <div>
            <h2>{payment.nome} {payment.cognome}</h2>
            <p>{payment.indirizzo}</p>
            <h3>Riepilogo prodotti</h3>
            <ul>
                    {cart.map((c, i) => <li key={i}>
                        <h4>{c.name}</h4>
                        <p>{c.price}€</p>
                    </li>)}
            </ul>
            <button onClick={confirmOrder}>Confirm</button>
        </div>
    </div>
    </>
}

export default PaymentDetails;