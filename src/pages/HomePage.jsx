import Carousel from "../components/Carousel";
import CarouselBis from "../components/CarouselBis";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ContextLoader from "../contexts/contextLoader";
import ContextError from "../contexts/contextError";

function HomePage() {
    const [albums, setAlbums] = useState([]);
    const api = "http://127.0.0.1:3000/api/album";

    const { setIsLoading } = useContext(ContextLoader);
    const { setIsError } = useContext(ContextError);

    function getAlbums() {
        setIsLoading(true);
        axios.get(api)
            .then(res => {
                setAlbums(res.data);

            })
            .catch(err => {
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
        <ul>
            {albums.map((album) => (<li key={album.id}>
                <p>{album.title}</p>
                <p>{album.price}€</p>
            </li>
            ))}
        </ul>

            <h2 className="text-center">Gli album più venduti</h2>
            <Carousel albums={albums}/>
            <h2 className="text-center">Gli ultimi arrivi</h2>
            <CarouselBis />
        </>

    )
}

export default HomePage;