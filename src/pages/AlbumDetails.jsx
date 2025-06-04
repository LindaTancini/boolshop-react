//Importazioni
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ContextLoader from "../contexts/contextLoader";
import ContextError from "../contexts/contextError";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CartContext from "../contexts/CartContext";
import WishContext from "../contexts/WhishContext";
import Toast from "../components/Toast";

/**
 * Pagina di dettaglio album.
 * Mostra dettagli, selettore quantità, aggiunta a carrello/wishlist.
 */
function AlbumDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const api = `http://127.0.0.1:3000/api/album/${slug}`;
  const [toastVisible, setToastVisible] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { setIsLoading } = useContext(ContextLoader);
  const { setIsError } = useContext(ContextError);
  const { cart, setCart } = useContext(CartContext);
  let { wish, setWish } = useContext(WishContext);
  function addToCart() {
    const existingIndex = cart.findIndex((c) => c.id === album.id);
    let newCart;
    if (existingIndex !== -1) {
      newCart = cart.map((c, index) =>
        index === existingIndex
          ? { ...c, quantity: c.quantity + selectedQuantity }
          : c
      );
    } else {
      newCart = [...cart, { ...album, quantity: selectedQuantity }];
    }
    setCart(newCart);
    setToastVisible(true);
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(api)
      .then((res) => {
        setAlbum(res.data);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  function addToWish(e) {
    // e.stopPropagation();
    e.preventDefault();
    // const existingIndex = cart.findIndex((c) => c.id === album.id);
    let newWish;

    // if (existingIndex !== -1) {
    //   newWish = wish.map((w, index) =>
    //     index === existingIndex ? { ...w, quantity: w.quantity + 1 } : c
    //   );
    // } else {
    newWish = [...wish, album];
    // }

    setWish(newWish);
    // setToastMessage("Elemento aggiunto alla wishlist!");
    setToastVisible(true);
    // const wishElementExist = wish.find((w) => w.id === album.id);
    // console.log(wishElementExist);
    // if (wishElementExist) {
    //   setWish(wish.filter((w) => w.id !== album.id));
    //   setToastMessage("Elemento rimosso dalla wishlist!");
    // } else {
    //   setWish([...wish, album]);
    //   setToastMessage("Elemento aggiunto alla wishlist!");
    // }
    // setToastVisible(true);
  }
  // function addToWish() {
  //   const wishElementExist = wish.find((w) => w.id === album.id);
  //   console.log(wishElementExist);
  //   if (wishElementExist) {
  //     wish = wish.filter((w) => w.id !== album.id);
  //     setWish(wish);
  //   } else {
  //     setWish([...wish, album]);
  //   }
  // }

  useEffect(() => {
    localStorage.setItem(slug, JSON.stringify(wish));
  }, [wish]);

  if (!album) {
    return <p>Caricamento...</p>;
  }

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4 text-center fw-bold text-orange text-shadow-orange">
          {album.title}
        </h2>

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-4 text-center p-4 rounded shadow-lg bg-album-details-shadow">
          {album.imagePath && (
            <img
              src={album.imagePath}
              alt={album.title}
              className="img-fluid rounded shadow-sm img-contain"
            />
          )}

          <div className="text-center text-md-start">
            <p className="fs-5 mb-3">
              <span className="album-detail-label">Prezzo:</span> {album.price}€
            </p>
            <p className="fs-5 mb-3">
              <span className="album-detail-label">Artista:</span>
              {album.artist.name}
            </p>
            <p className="fs-5 mb-3">
              <span className="album-detail-label">Genere:</span>
              {album.genre.name}
            </p>
            <p className="fs-5 mb-3">
              <span className="album-detail-label">Quantità disponibile:</span>
              {album.quantity}
            </p>
            <p className="fs-5 mb-3">
              <span className="album-detail-label">Formato:</span>
              {album.format}
            </p>
            <p className="fs-5 mb-4">
              <span className="album-detail-label">Data di rilascio:</span>
              {new Date(album.date).toLocaleDateString("it-IT")}
            </p>

            {/* Selettore quantità */}
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantità:
              </label>
              <input
                id="quantity"
                type="number"
                min={1}
                max={album.quantity}
                value={selectedQuantity}
                onChange={(e) =>
                  setSelectedQuantity(
                    Math.max(
                      1,
                      Math.min(album.quantity, Number(e.target.value))
                    )
                  )
                }
                className="form-control w-auto d-inline-block ms-2 album-quantity-input"
              />
            </div>

            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                title="Aggiungi al carrello"
                className="button-orange-outline"
                onClick={addToCart}
              >
                Aggiungi al carrello
              </button>
              <button
                className="btn btn-outline-danger rounded-circle wishlist-button"
                title="Aggiungi alla wishlist"
                onClick={addToWish}
              >
                <i className="fas fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          className="button-orange-outline"
          onClick={() => navigate("/products")}
        >
          Torna al negozio
        </button>
      </div>
      <Toast
        message="Elemento aggiunto al carrello!"
        type="success"
        show={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </>
  );
}

AlbumDetails.propTypes = {};

export default AlbumDetails;
