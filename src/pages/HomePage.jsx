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
    (album) => parseFloat(album.price) <= 13
  );

  let data_specifica = new Date(2020, 1, 1);
  const filterAlbumsMoreBuy = albums.filter(
    (album) => Date.parse(album.date) > Date.parse(data_specifica)
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
      <h2 className="text-center">Album più venduti:</h2>
          <Carousel albums={filterAlbumsLowCost} />
      <h2 className="text-center">Album più recenti:</h2>
          <CarouselBis albums={filterAlbumsMoreBuy} />
    </>
  );
}

export default HomePage;
