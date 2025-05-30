import AlbumCard from './AlbumCard';

export default function AlbumGrid({ albums }) {
  if (!albums.length) return <div className="text-center py-5">Nessun album trovato.</div>;
  return (
    <div className="row">
      {albums.map(album => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}
