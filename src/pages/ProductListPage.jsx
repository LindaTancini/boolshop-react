import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ContextLoader from "../contexts/contextLoader";
import ContextError from "../contexts/contextError";

function ProductListPage() {

    const [albums, setAlbums] = useState([]);
    // const [query, setQuery] = useState('');
    const [search, setSearch] = useState([]);
    const api = "http://127.0.0.1:3000/api/album/";

    const { setIsLoading } = useContext(ContextLoader);
    const { setIsError } = useContext(ContextError);

    function searchAlbum(e){
        e.preventDefault();
        getAlbums();
    }

    function getAlbums() {
        setIsLoading(true);
        axios
            .get(api, {
                params: {
                    search
                }
            })
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

    useEffect(getAlbums, [search]);

    return <>

        <form onSubmit={searchAlbum}>
            <label htmlFor="searchAlbum" />
            <input type="text"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="album to search..."
            />
            <button className="btn btn-outline-danger mx-2" type="submit">Search</button>
        </form>
        <div>
            {albums.map(album => <div key={album.id}>
                <p>{album.title}</p>
            </div>)}
        </div>
    </>
}

export default ProductListPage;