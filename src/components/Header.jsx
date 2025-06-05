//Importazioni
import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../contexts/CartContext";

function Header() {
  //Variabili di stato
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // Stato per mostrare input
  const [searchValue, setSearchValue] = useState("");
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  //Con Prev cambio lo stato in base al valore attuale
  const toggleMenu = () => setIsOpen((prev) => !prev);
  //Setto inizialmente il valore in false per poi cambiarlo all'onclick
  const closeMenu = () => setIsOpen(false);

  const handleSearchClick = (e) => {
    e.preventDefault();
    setShowSearch((prev) => !prev);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchValue)}`);
    setShowSearch(false);
    setSearchValue("");
  };

  return (
    <>
      <header
        className={`navbar navbar-expand-sm navbar-dark bg-header-violet w-100 p-0${
          showSearch ? " expanded-header" : ""
        } no-box-shadow header-fixed`}
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center w-100">
            {/* LOGO */}
            <Link
              className="navbar-brand fw-bold fs-4 text-white d-flex align-items-center"
              to="/"
            >
              <div className="img-logo-container">
                <img
                  src="/logo/note_musicali.png"
                  alt="Logo"
                  className="w-100"
                />
              </div>
              BOOLSHOP
            </Link>
            {/* TOGGLE RESPONSIVE MOBILE */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            {/* NAVBAR */}
            <div
              className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
              id="navbarNav"
            >
              <ul className="navbar-nav ms-auto align-items-center">
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white d-flex align-items-center gap-1"
                    to="/products"
                    onClick={closeMenu}
                  >
                    <i className="bi bi-shop"></i> NEGOZIO
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white d-flex align-items-center gap-1"
                    to="/artists"
                    onClick={closeMenu}
                  >
                    <i className="bi bi-mic"></i> ARTISTI
                  </NavLink>
                </li>
                <NavLink
                  className="nav-link text-white d-flex align-items-center gap-1"
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    const offcanvas = new bootstrap.Offcanvas("#cartOffcanvas");
                    offcanvas.show();
                    closeMenu();
                  }}
                >
                  <i className="bi bi-cart"></i>
                </NavLink>

                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white d-flex align-items-center gap-1"
                    to="/wishlist"
                    onClick={closeMenu}
                  >
                    <i className="bi bi-heart"></i>
                  </NavLink>
                </li>

                {location.pathname !== "/products" && (
                  <li className="nav-item">
                    <NavLink
                      className={`nav-link text-white d-flex align-items-center gap-1${
                        showSearch ? " text-orange" : ""
                      }`}
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowSearch((s) => !s);
                      }}
                    >
                      <i
                        className={`bi bi-search${
                          showSearch ? " text-orange" : ""
                        }`}
                      ></i>
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
      {/* Mostra la barra di ricerca solo se showSearch è true e non siamo su /products */}
      <div
        className={`search-bar-outer${
          showSearch && location.pathname !== "/products"
            ? " show search-bar-animated"
            : ""
        } mt-3`}
        aria-hidden={!(showSearch && location.pathname !== "/products")}
        tabIndex={showSearch && location.pathname !== "/products" ? 0 : -1}
        style={{
          pointerEvents:
            showSearch && location.pathname !== "/products" ? "auto" : "none",
        }}
      >
        <div className="container">
          <form
            onSubmit={handleSearchSubmit}
            className={`d-flex justify-content-between align-items-center py-2 search-bar-form w-100${
              showSearch && location.pathname !== "/products"
                ? " search-bar-form-visible"
                : ""
            }`}
          >
            <input
              type="text"
              className="form-control search-bar-input"
              placeholder="Cerca..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              autoFocus={showSearch && location.pathname !== "/products"}
              tabIndex={
                showSearch && location.pathname !== "/products" ? 0 : -1
              }
            />
            <button
              className="btn btn-outline-danger search-button-filter btn-search-bar"
              type="submit"
            >
              Cerca
            </button>
          </form>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end offcanvas-wider"
        tabIndex="-1"
        id="cartOffcanvas"
        aria-labelledby="cartOffcanvasLabel"
      >
        <div className="offcanvas-header bg-header-violet text-white">
          <h5
            className="offcanvas-title fw-bold text-shadow-orange"
            id="cartOffcanvasLabel"
          >
            Il tuo carrello
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Chiudi"
          ></button>
        </div>
        <div className="offcanvas-body">
          {cart.length === 0 ? (
            <p className="text-center text-muted">Il carrello è vuoto.</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center mb-2"
                  >
                    <div className="d-flex align-items-center gap-2">
                      {item.imagePath && (
                        <img
                          src={item.imagePath}
                          alt={item.name}
                          className="img-cart"
                        />
                      )}
                      <div>
                        <strong className="text-orange">{item.name}</strong>
                        <div className="small text-muted">
                          Quantità: {item.quantity || 1}
                        </div>
                      </div>
                    </div>
                    <div className="fw-bold text-orange">
                      € {(item.price * (item.quantity || 1)).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
              <hr />
              <div className="d-flex justify-content-between fw-bold text-orange text-shadow-orange mb-3 fs-5">
                <span>Totale:</span>
                <span>
                  €
                  {cart
                    .reduce(
                      (sum, item) =>
                        sum + parseFloat(item.price) * (item.quantity || 1),
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <button
                className="btn button-orange-outline w-100 fw-bold"
                data-bs-dismiss="offcanvas"
                onClick={() => navigate("/cart")}
              >
                Vai al carrello
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
