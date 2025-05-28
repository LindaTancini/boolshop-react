import Carousel from "../components/Carousel";
import CarouselBis from "../components/CarouselBis";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ContextLoader from "../contexts/contextLoader";
import ContextError from "../contexts/contextError";

function HomePage() {
  const [albums, setAlbums] = useState([]);
  const api = "http://127.0.0.1:3000/api/album";

  const filterAlbumsLowCost = albums.filter(
    (album) => parseFloat(album.price) <= 20
  );
  const filterAlbumsMoreBuy = albums.filter(
    (album) => Date.parse(album.date) < Date.now()
  );
  console.log("Costo più basso: ", filterAlbumsLowCost);
  console.log("Più recenti: ", filterAlbumsMoreBuy);

  const { setIsLoading } = useContext(ContextLoader);
  const { setIsError } = useContext(ContextError);

  function getAlbums() {
    setIsLoading(true);
    axios
      .get(api)
      .then((res) => {
        setAlbums(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(getAlbums, []);
  console.log(albums);
  return (
    <>
      <h2 className="text-center">Album meno costosi:</h2>
      <Carousel albums={albums} />
      <h2 className="text-center">Album più recenti:</h2>
      <CarouselBis albums={albums} />
    </>
  );
}

export default HomePage;
