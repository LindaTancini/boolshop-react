//Importazioni
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import HomePage from "./components/HomePage";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import GenresPage from "./pages/GenresPage";
import ArtistsPage from "./pages/ArtistsPage";
import AnArtistPage from "./pages/AnArtistPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
        <Route path="/artists" element={<DefaultLayout />}>
          <Route index element={<ArtistsPage />} />
          <Route path=":slug" element={<AnArtistPage />} />
        </Route>
        <Route path="/genres" element={<DefaultLayout />}>
          <Route index element={<GenresPage />} />
          <Route path=":slug" />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
