import { useState, useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import CartContext from "../contexts/CartContext";
import { openCartOffcanvas } from "./cartUtils";

function Header() {
  // Variabili di stato
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { cart, setCart } = useContext(CartContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Toggle del menu mobile
  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Gestione submit della ricerca
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchValue)}`);
    setShowSearch(false);
    setSearchValue("");
  };

  // Rimuove un elemento dal carrello
  const removeItemCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Cambia la quantità di un elemento nel carrello (con vincoli min/max)
  const handleQuantityChange = (index, value) => {
    const newCart = cart.map((item, i) =>
      i === index
        ? {
          ...item,
          quantity: Math.max(
            1,
            Math.min(
              item.maxQuantity || item.quantityDisponibile || 99,
              Number(value)
            )
          ),
        }
        : item
    );
    setCart(newCart);
  };

  return (
    <>
      <header
        className={`navbar navbar-expand-sm navbar-dark bg-header-violet w-100 p-0${showSearch ? " expanded-header" : ""
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

                <li className="nav-item">
                  <NavLink
                    className="nav-link text-white d-flex align-items-center gap-1"
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openCartOffcanvas();
                      closeMenu();
                    }}
                  >
                    <div className="position-relative">
                      <i className="bi bi-cart"></i>
                      {cart.length > 0 && (
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                          style={{ fontSize: "0.6rem" }}
                        >
                          {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                        </span>
                      )}
                    </div>
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

                {location.pathname !== "/products" && (
                  <li className="nav-item">
                    <NavLink
                      className={`nav-link text-white d-flex align-items-center gap-1${showSearch ? " text-orange" : ""
                        }`}
                      to="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowSearch((s) => !s);
                      }}
                    >
                      <i
                        className={`bi bi-search${showSearch ? " text-orange" : ""
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

      {/* Barra di ricerca (visibile solo quando showSearch è true e non siamo su /products) */}
      <div
        className={`search-bar-outer${showSearch && location.pathname !== "/products"
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
            className={`d-flex justify-content-between align-items-center py-2 search-bar-form w-100${showSearch && location.pathname !== "/products"
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

      {/* Offcanvas del carrello */}
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
          {Array.isArray(cart) && cart.length === 0 ? (
            <p className="text-center text-muted">Il carrello è vuoto.</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                  {Array.isArray(cart) && cart.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item bg-light rounded shadow-sm mb-3"
                  >
                    <div className="d-flex align-items-start gap-3">
                      {item.imagePath && (
                        <img
                          src={item.imagePath}
                          alt={item.name}
                          className="img-cart rounded"
                        />
                      )}

                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <strong className="text-orange">{item.name}</strong>
                          <span className="fw-bold text-orange">
                            € {(item.price * (item.quantity || 1)).toFixed(2)}
                          </span>
                        </div>

                        <div className="d-flex align-items-center gap-2 mt-2">
                          <label
                            htmlFor={`cart-qty-${index}`}
                            className="mb-0 small"
                          >
                            Quantità:
                          </label>
                          <input
                            id={`cart-qty-${index}`}
                            type="number"
                            min={1}
                            max={
                              item.maxQuantity || item.quantityDisponibile || 99
                            }
                            value={item.quantity || 1}
                            onChange={(e) =>
                              handleQuantityChange(index, e.target.value)
                            }
                            className="form-control form-control-sm w-auto"
                          />
                          <button
                            className="btn btn-sm btn-outline-danger ms-auto"
                            onClick={() => removeItemCart(index)}
                            title="Rimuovi"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <hr />

              <div className="d-flex justify-content-between fw-bold text-orange text-shadow-orange mb-3 fs-5">
                <span>Totale:</span>
                <span>
                  €
                    {(Array.isArray(cart) ? cart : [])
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
