import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import DefaultLayout from "./layout/DefaultLayout";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              {" "}
              <HomePage />{" "}
            </DefaultLayout>
          }
        />
        <Route
          path="/products"
          element={
            <DefaultLayout>
              <ProductListPage />
            </DefaultLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <DefaultLayout>
              <CartPage />
            </DefaultLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
