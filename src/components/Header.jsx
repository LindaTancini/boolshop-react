import { Link, NavLink } from 'react-router-dom';

function Header() {
    return (
        <header className="navbar navbar-expand-sm navbar-light bg-danger">
            <div className="container">
                <Link className="navbar-brand" to="/">BOOLSHOP</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/products">PRODOTTI</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/cart">CARRELLO</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;