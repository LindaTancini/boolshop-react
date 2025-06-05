// Importazioni
import { useNavigate } from "react-router-dom";

function Jumbotron() {
  const navigate = useNavigate();

  return (
    <>
      <div className="annuncio bg-dark d-flex align-items-center justify-content-center">
        <p className="text-white mb-0">
          <strong>CODICE: FISSO5</strong> per avere subito 5€ di sconto ||
          Spedizione gratuita oltre 50 €
        </p>
      </div>
      <div className="jumbotron-modify text-white d-flex flex-column justify-content-center align-items-center text-center">
        <div className="container py-0 mt-5">
          <h1 className="display-4 fw-bold">Benvenuto nel nostro negozio !</h1>
          <p className="lead">
            Scopri le ultime novità, i più venduti e approfitta delle nostre
            offerte speciali.
          </p>
          <button
            className="btn btn-light btn-lg mt-3"
            onClick={() => navigate("/products")}
          >
            Sfoglia Tutti gli Album
          </button>
        </div>
      </div>
    </>
  );
}

export default Jumbotron;
