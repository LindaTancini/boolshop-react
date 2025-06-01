import { useContext } from "react";
import PaymentContext from "../contexts/paymentContext";
import CartContext from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const PaymentDetails = () => {
    const { payment } = useContext(PaymentContext);
    const {cart, setCart} = useContext(CartContext);
    const navigate = useNavigate();

    function confirmOrder(){
        alert('Ordine effettuato con successo!');
        navigate('/');
        setCart([]);
    }

    console.log(cart);
    return <>
    <div className="bg-light d-flex justify-content-center align-items-center w-50 h-50 text-dark">
        <div>
            <h2>{payment.nome} {payment.cognome}</h2>
            <p>{payment.indirizzo}</p>
            <h3>Riepilogo prodotti</h3>
            {/* <ul>
                    {cart.map((c, i) => <li key={i}>
                        <h4>{c.name}</h4>
                        <p>{c.price}€</p>
                    </li>)}
            </ul> */}
                <ul className="list-group mb-4">
                    {cart.map((c, i) => (
                        <li
                            key={i}
                            className="list-group-item d-flex align-items-center justify-content-between bg-album-details-shadow mb-3"
                        >
                            <div className="d-flex align-items-center">
                                {c.imagePath && (
                                    <img
                                        className="img-cart me-3"
                                        src={c.imagePath}
                                        alt={c.name}
                                    />
                                )}
                                <div>
                                    <h6 className="mb-1 text-orange"> {c.name}</h6>
                                    <p className="album-price mb-0">€ {c.price}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            <button onClick={confirmOrder}>Confirm</button>
        </div>
    </div>
    </>
}

export default PaymentDetails;