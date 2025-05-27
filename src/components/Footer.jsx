import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-dark text-white py-3 mt-auto text-center">
            <div className="container">
                <p className="mb-0">
                    Tutti i diritti riservati.
                    <Link to="/privacy" className="text-white ms-2 text-decoration-none">Privacy Policy</Link>
                </p>
            </div>
        </footer>
    );
}

export default Footer;