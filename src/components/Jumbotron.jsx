// Importazioni
import { useNavigate } from "react-router-dom";

function Jumbotron() {
  const navigate = useNavigate();

  return (
    <div className="jumbotron-modify text-white d-flex flex-column justify-content-center align-items-center text-center">
      <div className="container py-0">
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
  );
}

export default Jumbotron;
