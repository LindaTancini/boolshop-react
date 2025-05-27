import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="navbar navbar-expand-sm navbar-dark bg-header-blue shadow-sm">
      <div className="container">
        {/* LOGO */}
        <Link className="navbar-brand fw-bold fs-4 text-white " to="/">
          BOOLSHOP
        </Link>
        {/* TOGGLE RESPONSIVE MOBILE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* NAVBAR */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink
                className="nav-link text-white d-flex align-items-center gap-1"
                to="/products"
              >
                <i className="bi bi-basket"></i> PRODOTTI
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-white d-flex align-items-center gap-1"
                to="/cart"
              >
                <i className="bi bi-cart"></i> CARRELLO
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
