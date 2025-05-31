//Importazioni
import { useParams } from "react-router-dom";
import ContextLoader from "../contexts/contextLoader";
import ContextError from "../contexts/contextError";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CartContext from "../contexts/CartContext";
import WishContext from "../contexts/WhishContext";

function AlbumDetails() {

  const { slug } = useParams();
  const [album, setAlbum] = useState(null);
  const api = `http://127.0.0.1:3000/api/album/${slug}`;
  const { setIsLoading } = useContext(ContextLoader);
  const { setIsError } = useContext(ContextError);
  const { cart, setCart } = useContext(CartContext);
  const { wish, setWish} = useContext(WishContext);
  function addToCart() {
    setCart([...cart, album]);
    console.log(cart);
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

  function addToWish() {
    const wishElementExist = wish.find(w => w.id === album.id);
    console.log(wishElementExist);
    if (wishElementExist) {
      const newWish = wish.filter((w) => w.id !== album.id);
      console.log(newWish);
      setWish(newWish);
    } else {
      setWish([...wish, album]);
    }
  }

  useEffect(() => {
    localStorage.setItem(slug, JSON.stringify(wish));
  }, [wish]);

  useEffect(() => {
    localStorage.setItem(slug, JSON.stringify(cart));
  }, [cart]);

  if (!album) {
    return <p>Caricamento...</p>;
  }

  return (
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
            <span className="album-detail-label">Prezzo:</span> {album.price} €
          </p>
          <p className="fs-5 mb-3">
            <span className="album-detail-label">Artista:</span>{" "}
            {album.artist.name}
          </p>
          <p className="fs-5 mb-3">
            <span className="album-detail-label">Genere:</span>{" "}
            {album.genre.name}
          </p>
          <p className="fs-5 mb-3">
            <span className="album-detail-label">Quantità disponibile:</span>{" "}
            {album.quantity}
          </p>
          <p className="fs-5 mb-3">
            <span className="album-detail-label">Formato:</span> {album.format}
          </p>
          <p className="fs-5 mb-4">
            <span className="album-detail-label">Data di rilascio:</span>{" "}
            {new Date(album.date).toLocaleDateString("it-IT")}
          </p>

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
  );
}

export default AlbumDetails;
