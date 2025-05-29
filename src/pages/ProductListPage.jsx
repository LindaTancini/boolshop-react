import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import ContextLoader from "../contexts/contextLoader";
import ContextError from "../contexts/contextError";

function ProductListPage() {

    const [albums, setAlbums] = useState([]);
    // const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState([]);
    const api = "http://127.0.0.1:3000/api/album/";

    const { setIsLoading } = useContext(ContextLoader);
    const { setIsError } = useContext(ContextError);

    function searchAlbum(e) {
        e.preventDefault();
        getAlbums();
    }

    function getAlbums() {
        setIsLoading(true);
        axios
            .get(api, {
                params: {
                    search,
                    filter
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

    useEffect(getAlbums, [filter, search]);

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
            <label htmlFor="filterAlbum">Filtra per</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="">---</option>
                <option>ordine crescente per nome</option>
                <option>ordine decrescente per nome</option>
                <option>i più vecchi</option>
                <option>i più nuovi</option>
            </select>
        </div>
        <div className="row">
            {albums.map(album => (
                <div className="col-12 col-md-4 gy-3" key={album.id}>
                    <Link to={`/album/${album.slug}`} className="text-decoration-none">
                        <div className="card g-3 h-100 ">
                            <img src={album.imagePath} className="card-img-top img-fluid rounded img-filter-album" alt={album.name} />
                            <div className="card-body">
                                <p className="card-text">
                                    Titolo: <strong>{album.name}</strong>
                                    {/* Artista: <strong>{album.artist.name}</strong> */}
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    </>
}

export default ProductListPage;