//Importazioni
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import HomePage from "./pages/HomePage";
import AlbumListPage from "./pages/AlbumListPage";
import CartPage from "./pages/CartPage";
import GenresPage from "./pages/GenresPage";
import ArtistsPage from "./pages/ArtistsPage";
import AnArtistPage from "./pages/AnArtistPage";
import { useState } from "react";
import ContextLoader from "./contexts/contextLoader";
import ContextError from "./contexts/contextError";
import AlbumDetails from "./pages/AlbumDetails";
import AnGenrePage from "./pages/AnGenrePage";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <ContextError.Provider value={{ isError, setIsError }}>
      <ContextLoader.Provider value={{ isLoading, setIsLoading }}>
        <Router>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<AlbumListPage />} />
              <Route path="album/:slug" element={<AlbumDetails />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
            <Route path="/artists" element={<DefaultLayout />}>
              <Route index element={<ArtistsPage />} />
              <Route path=":slug" element={<AnArtistPage />} />
            </Route>
            <Route path="/genres" element={<DefaultLayout />}>
              <Route index element={<GenresPage />} />
              <Route path="/genres/:slug" element={<AnGenrePage />} />
              <Route path=":slug" />
            </Route>
          </Routes>
        </Router>
      </ContextLoader.Provider>
    </ContextError.Provider>
  );
}

export default App;
