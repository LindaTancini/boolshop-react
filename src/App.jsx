//Importazioni
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import HomePage from "./pages/HomePage";
import AlbumListPage from "./pages/AlbumListPage";
import CartPage from "./pages/CartPage";
import ArtistsPage from "./pages/ArtistsPage";
import AnArtistPage from "./pages/AnArtistPage";
import { useState } from "react";
import ContextLoader from "./contexts/contextLoader";
import ContextError from "./contexts/contextError";
import AlbumDetails from "./pages/AlbumDetails";
import CartContext from "./contexts/CartContext";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  return (
    <ContextError.Provider value={{ isError, setIsError }}>
      <ContextLoader.Provider value={{ isLoading, setIsLoading }}>
        <CartContext.Provider value={{ cart, setCart }}>
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
            </Routes>
          </Router>
        </CartContext.Provider>
      </ContextLoader.Provider>
    </ContextError.Provider>
  );
}

export default App;
