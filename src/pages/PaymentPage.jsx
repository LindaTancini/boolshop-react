import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {

    const { setCart } = useContext(CartContext);

    const [payment, setPayment] = useState({
        nome: "",
        cognome: "",
        indirizzo: ""
    })

    const navigate = useNavigate();
    function HandleForm(e) {
        const { name, value } = e.target;

        setPayment((payment) => ({
            ...payment,
            [name]: value
        }));
    }

    function handlePayment(e) {
        e.preventDefault();
        setCart([]);
        navigate("/payment/details");
        console.log("pagamento avvenuto con successo")
    }

    return <>
        <div className="container my-4">

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
                    />
                </div>

                <hr className="mb-4" />
                <button
                    className="btn btn-primary btn-lg w-100"
                    type="submit"
                >
                    Procedi al Pagamento
                </button>
            </form>
        </div>
    </>
}

export default PaymentPage;