import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-footer-violet text-white py-4  mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-12 text-center text-md-start">
            <ul className="list-unstyled ">
              <li>
                <Link to="/" className="ms-2 text-decoration-none text-white">
                  BOOLSHOP
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="ms-2 text-decoration-none text-white"
                >
                  Prodotti
                </Link>
              </li>
              <li>
                <Link
                  to="/artists"
                  className="ms-2 text-decoration-none text-white"
                >
                  Artisti
                </Link>
              </li>
              <li>
                <Link
                  to="/genres"
                  className="ms-2 text-decoration-none text-white"
                >
                  Generi
                </Link>
              </li>
              <li>
                <Link
                  to="/Cart"
                  className="ms-2 text-decoration-none text-white"
                >
                  Carrello
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-6 text-center col-sm-12">
            <p className="mb-1">
              © 2025
              <Link to="/" className="ms-2 text-decoration-none text-black">
                BOOLSHOP
              </Link>
            </p>
            <p className="mb-1">Partita IVA, CF e R.I.: 00123456789</p>
            <p className="mb-1">Cap. Soc. 1.000.000,00 €</p>
            <p className="mb-1">
              Per qualsiasi necessità contattaci a questo indirizzo di posta
              elettronica
            </p>
            <p className="mb-1 ">
              <a href="#" className="text-decoration-none text-black">
                boolshop@boolando.it
              </a>
            </p>
          </div>

          <div className="col-md-3 text-md-end text-center col-12">
            <h5>Seguici sui social</h5>
            <div className="d-flex justify-content-md-end justify-content-center">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="text-light me-2"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                className="text-light me-2"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="text-light me-2"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://it.linkedin.com/"
                target="_blank"
                className="text-light me-2"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href="https://it.pinterest.com/"
                target="_blank"
                className="text-light me-2"
              >
                <i className="fa-brands fa-pinterest"></i>
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                className="text-light me-2"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                className="text-light"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
