//Importazioni
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  //Variabili di stato
  const [isOpen, setIsOpen] = useState(false);
  //Con Prev cambio lo stato in base al valore attuale
  const toggleMenu = () => setIsOpen((prev) => !prev);
  //Setto inizialmente il valore in false per poi cambiarlo all'onclick
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar navbar-expand-sm navbar-dark bg-header-violet shadow-sm">
      <div className="container">
        {/* LOGO */}
        <Link className="navbar-brand fw-bold fs-4 text-white" to="/">
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
            <li className="nav-item">
              <NavLink
                className="nav-link text-white d-flex align-items-center gap-1"
                to="/cart"
                onClick={closeMenu}
              >
                <i className="bi bi-cart"></i> CARRELLO
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-white d-flex align-items-center gap-1"
                to="/products?price-range=0%2C100"
                onClick={closeMenu}
              >
                <i className="bi bi-search"></i> CERCA
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-white d-flex align-items-center gap-1"
                to="/wishlist"
                onClick={closeMenu}
              >
                <i className="bi bi-heart"></i> WISHLIST
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
