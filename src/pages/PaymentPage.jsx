import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import PaymentContext from "../contexts/paymentContext";

const PaymentPage = ()=>{

    const{ setCart} = useContext(CartContext);

    const {payment, setPayment} = useContext(PaymentContext);

    const navigate = useNavigate();
    function HandleForm(e){
        const {name, value} = e.target;
        
        setPayment((payment) => ({
            ...payment,
            [name]: value
        }));
    }

    function handlePayment(e){
        e.preventDefault();
        setCart([]);
        navigate("/payment/details");
        console.log("pagamento avvenuto con successo")
    }

    return <>
        <form onSubmit={handlePayment}>
            <div>
                <label htmlFor="nome">Name:</label>
                <input type="text" name="nome" value={payment.nome} onChange={HandleForm} required/>
            </div>
            <div>
                <label htmlFor="cognome">Cognome:</label>
                <input type="text" name="cognome" value={payment.cognome} onChange={HandleForm} required/>
            </div>
            <div>
                <label htmlFor="indirizzo">Indirizzo:</label>
                <input type="text" name="indirizzo" value={payment.indirizzo} onChange={HandleForm} required/>
            </div>

            <button>Dettagli ordine</button>
        </form>
    </>
}

export default PaymentPage;