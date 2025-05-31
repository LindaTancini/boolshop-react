import AlbumCard from './AlbumCard';

export default function AlbumGrid({ albums, cart, setCart, wish, setWish }) {
  if (!albums.length) return <div className="text-center py-5">Nessun album trovato.</div>;
  return (
    <div className="row">
      {albums.map(album => (
        <AlbumCard key={album.id} album={album} cart={cart} setCart={setCart} wish={wish} setWish={setWish}/>
      ))}
    </div>
  );
}
