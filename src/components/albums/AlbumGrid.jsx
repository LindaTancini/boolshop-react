import PropTypes from "prop-types";
import AlbumCard from "./AlbumCard";

/**
 * Griglia di card album.
 * @param {Array} albums - Lista album
 * @param {Array} cart - Carrello
 * @param {function} setCart - Setter carrello
 * @param {Array} wish - Wishlist
 * @param {function} setWish - Setter wishlist
 */
export default function AlbumGrid({
  albums,
  cart,
  setCart,
  wish,
  setWish,
  viewMode,
}) {
  if (!albums.length)
    return <div className="text-center py-5">Nessun album trovato.</div>;
  const isGrid = viewMode === "grid";
  return (
    <div className={isGrid ? "row" : "list-group"}>
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          cart={cart}
          setCart={setCart}
          wish={wish}
          setWish={setWish}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}

AlbumGrid.propTypes = {
  albums: PropTypes.array.isRequired,
  cart: PropTypes.array.isRequired,
  setCart: PropTypes.func.isRequired,
  wish: PropTypes.array.isRequired,
  setWish: PropTypes.func.isRequired,
  viewMode: PropTypes.string.isRequired,
};
