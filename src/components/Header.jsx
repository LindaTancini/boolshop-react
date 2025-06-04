//Importazioni
import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

function Header() {
  //Variabili di stato
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // Stato per mostrare input
  const [searchValue, setSearchValue] = useState("");
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
      <header className={`navbar navbar-expand-sm navbar-dark bg-header-violet w-100 p-0${showSearch ? " expanded-header" : ""} no-box-shadow header-fixed`}
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center w-100">
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
                    <i className="bi bi-cart"></i>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white d-flex align-items-center gap-1"
                    to="/wishlist"
                    onClick={closeMenu}
                  >
                    <i className="bi bi-heart"></i>
                  </NavLink>
                </li>

                {location.pathname !== '/products' && (
                  <li className="nav-item">
                    <NavLink
                      className={`nav-link text-white d-flex align-items-center gap-1${showSearch ? ' text-orange' : ''}`}
                      to="#"
                      onClick={e => {
                        e.preventDefault();
                        setShowSearch(s => !s);
                      }}
                    >
                      <i className={`bi bi-search${showSearch ? ' text-orange' : ''}`}></i>
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
        className={`search-bar-outer${showSearch && location.pathname !== '/products' ? ' show search-bar-animated' : ''}`}
        aria-hidden={!(showSearch && location.pathname !== '/products')}
        tabIndex={showSearch && location.pathname !== '/products' ? 0 : -1}
        style={{ pointerEvents: showSearch && location.pathname !== '/products' ? 'auto' : 'none' }}
      >
        <div className="container">
          <form onSubmit={handleSearchSubmit} className={`d-flex justify-content-between align-items-center py-2 search-bar-form w-100${showSearch && location.pathname !== '/products' ? ' search-bar-form-visible' : ''}`}>
            <input
              type="text"
              className="form-control search-bar-input"
              placeholder="Cerca..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              autoFocus={showSearch && location.pathname !== '/products'}
              tabIndex={showSearch && location.pathname !== '/products' ? 0 : -1}
            />
            <button className="btn btn-outline-danger search-button-filter btn-search-bar" type="submit">
              Cerca
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Header;
