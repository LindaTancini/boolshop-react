import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-dark text-white py-3 mt-auto text-center">
            <div className="container">
                <p className="mb-1">
                    © 2025
                    <Link to="/" className="ms-2 text-decoration-none text-danger">BOOLSHOP</Link>
                </p>
                <p className="mb-1">
                    Partita IVA, CF e R.I.: 00123456789
                </p>
                <p className="mb-1">
                    Cap. Soc. 1.000.000,00 €
                </p>
                <p className="mb-1">
                    Per qualsiasi necessità contattaci a questo indirizzo di posta elettronica
                </p>
                <p className="mb-1 ">
                    <a href="#" className='text-decoration-none text-danger'>
                        boolshop@boolando.it
                    </a>
                </p>

            </div>
        </footer>
    );
}

export default Footer;