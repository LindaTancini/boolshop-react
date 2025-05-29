//Importazioni
import { useParams } from "react-router-dom";

function AlbumDetails() {
  const { id } = useParams();

  return (
    <div className="container mt-5">
      <h2>Dettagli Album : {id}</h2>
    </div>
  );
}

export default AlbumDetails;
